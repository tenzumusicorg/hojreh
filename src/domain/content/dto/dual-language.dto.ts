import { IsNotEmpty, IsString } from 'class-validator';

export class DualLanguageTextDto {
  @IsString()
  @IsNotEmpty()
  en: string;

  @IsString()
  @IsNotEmpty()
  fa: string;
}
