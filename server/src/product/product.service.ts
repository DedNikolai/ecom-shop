import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ProductDto } from './dto/product.dto';
import { ProductListQueryDto } from './dto/product-list.query.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) {}
    
    async create(dto : ProductDto) {
        const product = await this.prisma.product.create({
            data: {
              title: dto.title,
              metaTitle: dto.metaTitle,
              description: dto.description,
              metaDescription: dto.metaDescription,
              mainPhoto: dto.mainPhoto,
              photos: dto.photos,
              sortOrder: dto.sortOrder,
              price: dto.price,
              categories: {
                connect: dto.categories.map((id) => ({ id })),
              },
            },
          });

        return product
    }
    
    async getById(id: string) {
        const product = await this.prisma.product.findUnique({
          where: { id },
          include: {
            categories: {
              select: {
                id: true,
                title: true,
                photo: true,
              },
              orderBy: { sortOrder: 'asc' }, // необов’язково
            },
          },
        });
      
        if (!product) throw new NotFoundException('Product not found');
        return product;
    }

    
    
    async getAll({ page = 1, limit = 20, categoryId, title }: ProductListQueryDto) {
        const where: Prisma.ProductWhereInput = {};
    
        if (categoryId) {
          where.categories = { some: { id: categoryId } };
        }

        if (title) {
          where.title = {
            contains: title,
            mode: 'insensitive',
          };
        }

        const skip = (page - 1) * limit;
    
        const [items, total] = await this.prisma.$transaction([
          this.prisma.product.findMany({
            where,
            include: {
              categories: {
                select: { id: true, title: true, photo: true },
                orderBy: { sortOrder: 'asc' },
              },
            },
            orderBy: { createdAt: 'desc' }, 
            skip,
            take: limit,
          }),
          this.prisma.product.count({ where }),
        ]);
    
        const pages = Math.ceil(total / limit) || 1;
    
        return {
          items,
          meta: {
            total,
            page,
            limit,
            pages,
            hasNext: page < pages,
            hasPrev: page > 1,
          },
        };
    }

    
    async update(id: string, dto: ProductDto) {
        const product = await this.prisma.product.update({
            where: {id},
            data: {
                title: dto.title,
                metaTitle: dto.metaTitle,
                description: dto.description,
                metaDescription: dto.metaDescription,
                mainPhoto: dto.mainPhoto,
                photos: dto.photos,
                sortOrder: dto.sortOrder,
                price: dto.price,
                categories: {
                  connect: dto.categories.map((id) => ({ id })),
                },
            },
        })
    
        return [product];
    }
    
    async delete(id: string) {
        const product = await this.prisma.product.delete({
            where: {id}
        })
    
        if (!product) {
            throw new NotFoundException('Product not found')  
        }
    
        return {status: true}
    }
}
