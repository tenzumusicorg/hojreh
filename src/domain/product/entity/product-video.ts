import { DualLanguageText } from 'src/domain/content/entity/dual-language.entity';

export class ProductVideo {
  title: DualLanguageText;
  thumbnail: string;
  length: number;
  url: string;
  category: DualLanguageText;
}
