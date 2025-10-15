import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductListQueryDto } from './dto/product-list.query.dto';
import { ProductDto } from './dto/product.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAll(@Query() query: ProductListQueryDto) {
    return this.productService.getAll(query);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.productService.getById(id);
  }

  @Get('url/:query')
  getByUrl(@Param('query') query: string) {
    return this.productService.getByUrl(query);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post()
  create(@Body() dto: ProductDto) {
    return this.productService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  update(@Param('id') id: string, @Body() dto: ProductDto) {
    return this.productService.update(id, dto);
  }
  
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.productService.delete(id);
 }
}


