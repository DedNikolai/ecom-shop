import {
  BadRequestException, Controller, Post, Param, UseInterceptors,
  UploadedFiles, Req,
  UseGuards,
  Get
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { mkdirSync } from 'fs';
import { extname } from 'path';
import { randomUUID } from 'crypto';
import type { Request } from 'express';
import { FileService } from './file.service';
import { UploadScope } from './type/upload.scope';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Scope } from 'eslint';

@Controller('file')
export class FileController {
  constructor(private readonly uploadsService: FileService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get("images/:scope")
  async list(@Param('scope') scope: 'category' | 'products',) {
    return this.uploadsService.listImages(scope);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post('upload/images/:scope')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: (req, _file, cb) => {
          const scope = (req.params.scope as string)?.toLowerCase();
          if (!Object.values(UploadScope).includes(scope as UploadScope)) {
            return cb(new BadRequestException('Invalid scope. Use "category" or "product"'), '');
          }
          const dest = `uploads/images/${scope}`;
          mkdirSync(dest, { recursive: true });
          cb(null, dest);
        },
        filename: (_req, file, cb) => {
          const name = `${Date.now()}-${randomUUID()}${extname(file.originalname).toLowerCase()}`;
          cb(null, name);
        },
      }),
      fileFilter: (_req, file, cb) => {
        if (!/\/(jpeg|jpg|png|webp)$/i.test(file.mimetype)) {
          return cb(new BadRequestException('Allowed types: jpg, jpeg, png, webp'), false);
        }
        cb(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, 
      },
    }),
  )
  async uploadImages(
    @Param('scope') scopeParam: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req: Request,
  ) {
    const scope = scopeParam.toLowerCase() as UploadScope;
    this.uploadsService.validateScope(scope);

    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }

    const host = `${req.protocol}://${req.get('host')}`;
    const items = files.map((f) => {
      const path = this.uploadsService.buildRelativePath(scope, f.filename);
      const url = this.uploadsService.buildPublicUrl(host, scope, f.filename);
      return {
        filename: f.originalname,
        storedAs: f.filename,
        path,
        url,
        size: f.size,
        mimetype: f.mimetype,
      };
    });

    // Єдиний формат відповіді: масив + корисні поля для single
    return {
      scope,
      count: items.length,
      paths: items.map(i => i.path),
      urls: items.map(i => i.url),
      ...(items.length === 1 ? {
        path: items[0].path,
        url: items[0].url,
        filename: items[0].storedAs,
      } : {}),
      items,
    };
  }

  async 
}
