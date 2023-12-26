import { DualLanguageText } from 'src/domain/content/entity/dual-language.entity';
import { File } from 'src/domain/file/entity/file.entity';

export class Banner {
  id: string;
  name: string;
  title: DualLanguageText;
  description: DualLanguageText;
  image: File;
  link: string;
}
