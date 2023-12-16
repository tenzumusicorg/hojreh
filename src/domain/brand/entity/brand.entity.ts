import { DescriptionItem } from 'src/domain/content/entity/description-item.entity';
import { DualLanguageText } from 'src/domain/content/entity/dual-language.entity';
import { FAQItem } from 'src/domain/faq/entity/faq-item.entity';
import { File } from 'src/domain/file/entity/file.entity';

export class Brand {
  id: string;
  logo: File;
  name: DualLanguageText;
  descriptions: Array<DescriptionItem>;
  faq_list: FAQItem[];
}
