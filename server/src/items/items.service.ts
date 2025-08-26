import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ItemDto } from './dto/item.dto';

@Injectable()
export class ItemsService {
    constructor(private readonly prisma: PrismaService) {}
    
    async findAll() {
        return await this.prisma.item.findMany({ orderBy: { createdAt: 'desc' } });
    }
    
    async findOne(id: string) {
        const item = await this.prisma.item.findUnique({ where: { id } });
        if (!item) throw new NotFoundException('Item not found');
        return item;
    }  
      
    async create(dto: ItemDto) {
        return await this.prisma.item.create({
          data: { title: dto.title, price: dto.price },
        });
    }
    
    async update(id: string, dto: ItemDto) {
        try {
          return await this.prisma.item.update({
            where: { id },
            data: { ...dto },
          });
        } catch {
          throw new NotFoundException('Item not found');
        }
    }

    async remove(id: string) {
        try {
          return await this.prisma.item.delete({ where: { id } });
        } catch {
          throw new NotFoundException('Item not found');
        }
    }
}
