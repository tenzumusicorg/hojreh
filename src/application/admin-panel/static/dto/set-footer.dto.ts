import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { DualLanguageTextDto } from 'src/domain/content/dto/dual-language.dto';

export class FooterSocialMediaDto {
  @ApiProperty({
    required: true,
    example: 'https://instagram.com/tenzu',
  })
  @IsString()
  @IsOptional()
  instagram: string;

  @ApiProperty({
    required: true,
    example: 'https://telegram.com/tenzu',
  })
  @IsString()
  @IsOptional()
  telegram: string;

  @ApiProperty({
    required: true,
    example: 'https://twitter.com/tenzu',
  })
  @IsString()
  @IsOptional()
  twitter: string;

  @ApiProperty({
    required: true,
    example: 'https://youtube.com/tenzu',
  })
  @IsString()
  @IsOptional()
  youtube: string;

  @ApiProperty({
    required: true,
    example: 'https://aparat.com/tenzu',
  })
  @IsString()
  @IsOptional()
  aparat: string;

  @ApiProperty({
    required: true,
    example: 'https://linkedin.com/tenzu',
  })
  @IsString()
  @IsOptional()
  linkedin: string;
}

export default class SetFooterContentDto {
  @ApiProperty({
    type: DualLanguageTextDto,
    example: {
      fa: 'تهرانو فرمانیه...',
      en: ' Tehran, Farmanie..',
    },
  })
  @ValidateNested()
  @Type(() => DualLanguageTextDto)
  @IsNotEmpty()
  address: DualLanguageTextDto;

  @ApiProperty({
    required: true,
    example: '۰۲۱-۱۱۰',
  })
  @IsString()
  @IsNotEmpty()
  call_numbers: string;

  @ApiProperty({
    required: true,
    type: FooterSocialMediaDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => FooterSocialMediaDto)
  social_media: FooterSocialMediaDto;
}

export class SetFooterContentResDto {
  @ApiProperty({
    example: {
      en: 'data updated successfully',
      fa: 'اطلاعات با موفقیت بروزرسانی شد',
    },
  })
  message = {
    en: 'data updated successfully',
    fa: 'اطلاعات با موفقیت بروزرسانی شد',
  };
}
