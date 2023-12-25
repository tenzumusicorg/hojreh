import { DualLanguageText } from 'src/domain/content/entity/dual-language.entity';

export class FooterSocialMedia {
  instagram: string;
  telegram: string;
  twitter: string;
  youtube: string;
  aparat: string;
  linkedin: string;
}

export class FooterContent {
  address: DualLanguageText;
  call_numbers: string;
  social_media: FooterSocialMedia;
}
