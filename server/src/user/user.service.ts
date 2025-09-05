import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async findByEmail(email: string) {
        return await this.prisma.user.findUnique({ where: { email } });
    }
    
    async findByPhoneNumber(phone: string) {
        return await this.prisma.user.findUnique({ where: { phone } });
    }

    async create(data: { firstName: string; lastName: string; email: string; password: string; role?: UserRole, phone: string }) {
        return await this.prisma.user.create({ data });
    }

    async updateHashedRt(userId: string, hashedRt: string | null) {
        return await this.prisma.user.update({ where: { id: userId }, data: { hashedRt } });
    }

    async findById(id: string) {
        const user = await this.prisma.user.findUnique({ where: { id } });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    async incrementTokenVersion(userId: string) {
        return await this.prisma.user.update({
          where: { id: userId },
          data: { tokenVersion: { increment: 1 } },
        });
      }
      
}
