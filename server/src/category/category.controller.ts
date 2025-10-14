import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CategoryDto } from './dto/category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

    @Get()
    async getItems() {
      return await this.categoryService.getAll()
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.categoryService.getCategoryById(id);
    }

    @Get('url/:query')
    findByUrl(@Param('query') url: string) {
      return this.categoryService.getCategoryByUrl(url);
    }
  
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @Post()
    create(@Body() dto: CategoryDto) {
      
      return this.categoryService.create(dto);
    }
  
    @Put(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    update(@Param('id') id: string, @Body() dto: CategoryDto) {
      return this.categoryService.update(id, dto);
    }
  
    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    remove(@Param('id') id: string) {
      return this.categoryService.delete(id);
    }
}
