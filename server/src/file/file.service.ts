import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadScope } from './type/upload.scope';
import path from 'path';
import * as fs from 'fs';

type Scope = "category" | "products";


@Injectable()
export class FileService {
  private resolveUploadsDir(): string {
    // 1) server/uploads
    let root = path.resolve(process.cwd(), 'uploads');
    if (!fs.existsSync(root)) {
      // 2) ../uploads (коли сервер запускається з папки server)
      root = path.resolve(process.cwd(), '..', 'uploads');
    }
    return root;
  }

  private scopeDir(scope: Scope): string {
    // у тебе папки називаються `category` та `product` (судячи з дерева)
    const map: Record<Scope, string> = {
      category: 'images/category',
      products: 'images/product', // якщо папка саме "product", а не "products"
    };
    return map[scope];
  }

  listImages(scope: Scope): string[] {
    const uploadsRoot = this.resolveUploadsDir();
    const relative = this.scopeDir(scope);
    if (!relative) throw new BadRequestException('Invalid scope');

    const dir = path.join(uploadsRoot, relative);
    if (!fs.existsSync(dir)) return [];

    const files = fs
      .readdirSync(dir)
      .filter((f) => /\.(png|jpe?g|webp|gif|avif)$/i.test(f));

    // const base = process.env.PUBLIC_FILES_URL || `http://localhost:3001`;
    // Повертаємо URL, які реально відкриваються в браузері
    return files.map((name) => `uploads/${relative}/${name}`);
  }

  validateScope(scope: string): asserts scope is UploadScope {
        if (!Object.values(UploadScope).includes(scope as UploadScope)) {
          throw new BadRequestException('Invalid scope. Use "category" or "product"');
        }
  }
    
  buildRelativePath(scope: UploadScope, filename: string) {
        return `uploads/images/${scope}/${filename}`;
  }
   
  buildPublicUrl(host: string, scope: UploadScope, filename: string) {
        return `${host}/uploads/images/${scope}/${filename}`;
  }
}
