import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadScope } from './type/upload.scope';


@Injectable()
export class FileService {
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
