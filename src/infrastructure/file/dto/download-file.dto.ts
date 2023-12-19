import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export default class DownloadFileResponse {
    @ApiProperty()
    @IsString()
      data: string = '';
}
