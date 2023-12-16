import { DescriptionItem } from 'src/domain/content/entity/description-item.entity';
import { DualLanguageText } from 'src/domain/content/entity/dual-language.entity';
import { FAQItem } from 'src/domain/faq/entity/faq-item.entity';
import { File } from 'src/domain/file/entity/file.entity';

export class Category {
  id: string;
  title: DualLanguageText;
  seo_title: DualLanguageText;
  seo_description: DualLanguageText;
  faq_title: DualLanguageText;
  thumbnail: File;
  banner: File;
  descriptions: Array<DescriptionItem>;
  faq_list: Array<FAQItem>;
}
