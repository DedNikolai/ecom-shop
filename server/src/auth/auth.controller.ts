import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { GetUser } from './decorators/get-user.decorator';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import type { Response } from 'express';

const isProd = process.env.NODE_ENV === 'production';
const accessOpts = { httpOnly: true, secure: isProd, sameSite: 'lax' as const, path: '/', maxAge: 15*60*1000 };
const refreshOpts = { httpOnly: true, secure: isProd, sameSite: 'lax' as const, path: '/', maxAge: 7*24*60*60*1000 };

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterDto, @Res({passthrough: true}) res: Response) {
    const { accessToken, refreshToken, user } = await this.authService.register(dto);
    // res.cookie('access_token', accessToken, accessOpts);
    // res.cookie('refresh_token', refreshToken, refreshOpts);
    return user;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken, user} = await this.authService.login(dto);
    res.cookie('access_token', accessToken, accessOpts);
    res.cookie('refresh_token', refreshToken, refreshOpts);
    return user;
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async logout(@GetUser('userId') userId: string, @Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token', { ...accessOpts, maxAge: undefined });
    res.clearCookie('refresh_token', { ...refreshOpts, maxAge: undefined });
    return this.authService.logout(userId);
  }

  @Post('refresh')
  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  async refresh(
    @GetUser('userId') userId: string,
    @GetUser('token') token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.refresh(userId, token);
    res.cookie('access_token', accessToken, accessOpts);
    res.cookie('refresh_token', refreshToken, refreshOpts);
    return { ok: true };
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async getme(@GetUser('userId') userId: string) {
    return await this.authService.getMe(userId);
  }
}