import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import { UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

type Tokens = { accessToken: string; refreshToken: string };

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwt: JwtService,
        private cfg: ConfigService,
      ) {}

     async register(dto: RegisterDto): Promise<Tokens> {
        const exists = await this.userService.findByEmail(dto.email);
    
        if (exists) throw new ForbiddenException('Email in use');
    
        const hash = await bcrypt.hash(dto.password, 10);
        const user = await this.userService.create({
          firstName: dto.firstName,
          lastName: dto.lastName,
          email: dto.email,
          password: hash,
          phone: dto.phone,
          role: dto.role ?? UserRole.USER,
        });   
        
        const tokens = await this.signTokens(user.id, user.email, user.role, user.tokenVersion);
        // збережемо хеш refresh
        const rtHash = await bcrypt.hash(tokens.refreshToken, 10);
        await this.userService.updateHashedRt(user.id, rtHash);
        return tokens;    

    }

    async login(dto: LoginDto): Promise<Tokens> {
        const user = await this.userService.findByEmail(dto.email);
        if (!user) throw new UnauthorizedException('Invalid credentials');
    
        const ok = await bcrypt.compare(dto.password, user.password);
        if (!ok) throw new UnauthorizedException('Invalid credentials');
    
        const tokens = await this.signTokens(user.id, user.email, user.role, user.tokenVersion);
        const rtHash = await bcrypt.hash(tokens.refreshToken, 10);
        await this.userService.updateHashedRt(user.id, rtHash);

        return tokens;
    }

    async logout(userId: string) {
        await this.userService.updateHashedRt(userId, null);
        await this.userService.incrementTokenVersion(userId);
        return { ok: true };
    }

    async refresh(userId: string, refreshToken: string): Promise<Tokens> {
        const user = await this.userService.findById(userId);
        if (!user || !user.hashedRt) throw new UnauthorizedException();
    
        const valid = await bcrypt.compare(refreshToken, user.hashedRt);
        if (!valid) throw new UnauthorizedException();
    
        const tokens = await this.signTokens(user.id, user.email, user.role, user.tokenVersion);
        const rtHash = await bcrypt.hash(tokens.refreshToken, 10);
        await this.userService.updateHashedRt(user.id, rtHash);
        return tokens;
    }    

    private async signTokens(userId: string, email: string, role: UserRole, version: number): Promise<Tokens> {
        const accessToken = await this.jwt.signAsync(
          { userId, email, role, version },
          {
            secret: this.cfg.get<string>('JWT_ACCESS_SECRET'),
            expiresIn: this.cfg.get<string>('JWT_ACCESS_TTL') || '15m',
          },
        );
        const refreshToken = await this.jwt.signAsync(
          { userId, email, role },
          {
            secret: this.cfg.get<string>('JWT_REFRESH_SECRET'),
            expiresIn: this.cfg.get<string>('JWT_REFRESH_TTL') || '7d',
          },
        );
       return { accessToken, refreshToken};
    }    
}
