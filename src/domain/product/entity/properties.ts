import { DualLanguageTextModel } from 'src/domain/content/schema/dual-language.schema';

export class PropertyItemModel {
  prop: string;
  value: string;
}

export class PropertiesItemDualLanguage {
  fa: PropertyItemModel;
  en: PropertyItemModel;
}

export class Properties {
  title: DualLanguageTextModel;
  icon: string;
  items: Array<PropertiesItemDualLanguage>;
}
