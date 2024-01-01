import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import ShortUniqueId from 'short-unique-id';
import { extname } from 'path';
import { ObjectCannedACL } from '@aws-sdk/client-s3';

const uuid = new ShortUniqueId({ length: 8 });

export class UploadFileDto {
  key: string;
  file: Buffer;
  ACL: ObjectCannedACL = 'public-read';
  type: string;
  constructor(buffer: Buffer, name: string, mimType: string) {
    this.key = setKey(name);
    this.file = buffer;
    this.ACL = 'public-read';
    this.type = mimType;
  }
}

function setKey(fileName: string) {
  const ext = extname(fileName).toLowerCase();
  return `${uuid.randomUUID()}-${Date.now()}${ext}`;
}

export default class UploadFileResponse {
  @ApiProperty({
    example: 'https://app.s3.ir-thr-at1.arvanstorage.com/d3dnasda53mvs',
  })
  @IsString()
  url: string = '';

  @ApiProperty({
    example: 31.421,
  })
  size: number;

  @ApiProperty({
    example: 'img/jpeg',
  })
  mim_type: string;
}
export class UploadFilesResponse {
  @ApiProperty({
    type: UploadFileResponse,
    isArray: true,
  })
  @IsString()
  items: Array<UploadFileResponse>;
}
