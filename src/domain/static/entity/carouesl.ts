import { DualLanguageText } from 'src/domain/content/entity/dual-language.entity';
import { File } from 'src/domain/file/entity/file.entity';

export class Carousel {
  id: string;
  title: DualLanguageText;
  description: DualLanguageText;
  below_text: DualLanguageText;
  image: File;
  link: string;
  index: number;
}
