import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ImageFileValidationPipe implements PipeTransform {
  transform(value: any) {
    const validMimTypes = [
      'image/png',
      'image/webp',
      'image/jpeg',
      'image/jpg',
    ];

    if (validMimTypes.includes(value.mimetype)) {
      return value;
    }

    throw new BadRequestException();
  }
}
