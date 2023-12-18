import { File } from 'src/domain/file/entity/file.entity';

export class ProductImage {
  url: File;
  thumbnail: File;
  is_primary: boolean;
}
