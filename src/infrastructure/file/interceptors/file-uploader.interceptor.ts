import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import FileService from '../file.service';

@Injectable()
export default class FileUploaderInterceptor implements NestInterceptor {
  constructor(private readonly fileService: FileService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const { file } = request;

    let uploadUrl = await this.fileService.uploadFile({
      file: file.buffer,
      key: file.originalname,
      bucket: this.fileService.getS3Bucket(),
      ACL: 'public-read',
      type: file.mimetype,
    });
    request.body.upload_url = uploadUrl;

    return next.handle().pipe();
  }
}
