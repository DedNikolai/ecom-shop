import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService) {}

    async create(dto : CategoryDto) {
        const createdCategory = await this.prisma.category.create({
            data: {...dto}
        })

        return createdCategory;
    }

    async getCategoryById(id: string) {
        const category = await this.prisma.category.findUnique({
            where: {id}
        })

        if (!category) {
            throw new NotFoundException('Category not found')
        }

        return category;
    }

    async getAll() {
        const category = await this.prisma.category.findMany({})

        return category;
    }

    async update(id: string, dto: CategoryDto) {
        const category = await this.prisma.category.update({
            where: {id},
            data: {...dto}
        })

        return category;
    }

    async delete(id: string) {
        const category = await this.prisma.category.delete({
            where: {id}
        })

        if (!category) {
            throw new NotFoundException('Category not found')  
        }

        return {status: true}
    }
}
