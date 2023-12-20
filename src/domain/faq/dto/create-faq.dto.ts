import { DualLanguageText } from 'src/domain/content/entity/dual-language.entity';

export class CreateFaqDto {
  question: DualLanguageText;
  answer: DualLanguageText;
}
