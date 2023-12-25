import { DualLanguageText } from 'src/domain/content/entity/dual-language.entity';
import { FAQItem } from 'src/domain/faq/entity/faq-item.entity';

export class FAQContent {
  content: DualLanguageText;
  faq_list: FAQItem[];
}
