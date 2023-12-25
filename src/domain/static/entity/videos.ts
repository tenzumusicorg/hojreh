import { DualLanguageText } from 'src/domain/content/entity/dual-language.entity';

export class Video {
  id: string;
  title: DualLanguageText;
  category: DualLanguageText;
  cover: string;
  link: string;
  duration: string;
  category_link: string;
}
