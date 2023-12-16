import { DualLanguageText } from 'src/domain/content/entity/dual-language.entity';

export class FAQItem {
  id: string;
  question: DualLanguageText;
  answer: DualLanguageText;
}
