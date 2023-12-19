import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import S3Service from './s3.service';
import { ConfigService } from '@nestjs/config';
import { UploadFileDto } from './dto/upload-file.dto';
import { ConfigValues } from '../config/app.configuration';

@Injectable()
export default class FileService {
  constructor(
    private s3Service: S3Service,
    private configService: ConfigService,
  ) {}

  async initBucket() {
    const s3Bucket = this.configService.get<string>(ConfigValues.S3_BUCKET);
    if (!s3Bucket) {
      throw Error('bucket not set in envs');
    }
    const bucketIsExists = await this.s3Service.checkBucket(s3Bucket);
    if (!bucketIsExists) {
      await this.s3Service.createBucket(s3Bucket);
    }
  }

  async checkFileExists(url: string) {
    const s3Bucket = this.getS3Bucket();
    const key = this.getKeyFromUrl(url);
    try {
      const response = await this.s3Service.getObject(key, s3Bucket);
      return true;
    } catch (err) {
      console.log(err);
      throw new NotFoundException('file with given url not found');
    }
  }

  async uploadFile(request: UploadFileDto) {
    const s3Baseurl = this.getS3BaseUrl();
    try {
      let res = await this.s3Service.createObject(
        request.key,
        request.file,
        request.bucket,
        request.ACL,
        request.type,
      );
      const url = `https://${request.bucket}.${s3Baseurl}/${request.key}`;
      return url;
    } catch (err) {
      throw new InternalServerErrorException('error with uploading file');
    }
  }

  async getFileDetail(
    url: string,
  ): Promise<{ mimType: string; size: number; url: string } | null> {
    const s3Bucket = this.getS3Bucket();
    const s3Baseurl = this.getS3BaseUrl();
    const key = this.getKeyFromUrl(url);
    try {
      const response = await this.s3Service.getObject(key, s3Bucket);
      if (!!response) {
        const url = `https://${s3Bucket}.${s3Baseurl}/${key}`;
        return {
          url,
          size: response.ContentLength!,
          mimType: response.ContentType!,
        };
      } else {
        return null;
      }
    } catch (err) {
      return null;
    }
  }

  getKeyFromUrl(url: string) {
    const parts = url.split('/');
    return parts[parts.length - 1];
  }

  formatFileSize(bytes: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString());
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
  }

  private getS3BaseUrl(): string {
    const s3Endpoint = this.configService.get<string>(ConfigValues.S3_ENDPOINT);
    if (!s3Endpoint) {
      throw Error('s3 endpoint not set in envs');
    }
    return s3Endpoint.split('https://')[1];
  }
  getS3Bucket() {
    const s3Bucket = this.configService.get<string>(ConfigValues.S3_BUCKET);
    if (!s3Bucket) {
      throw Error('bucket not set in envs');
    }
    return s3Bucket;
  }
}
