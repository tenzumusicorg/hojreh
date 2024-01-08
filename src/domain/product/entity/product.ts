import { DualLanguageText } from 'src/domain/content/entity/dual-language.entity';
import { Rating } from './rate';
import { Properties } from './properties';
import { Feature } from './feature';
import { ProductColor } from './color';
import { ProductAvailability } from './availability';
import { Price } from './price';
import { ProductImage } from './product-image';
import { ProductVideo } from './product-video';

export class Product {
  id: string;
  name: string;
  seo_name: DualLanguageText;
  category: string;
  subcategory: string;
  tags: Array<string>;
  brand: string;
  model_id: string;
  rating: Rating;
  images: Array<ProductImage>;
  price: Price;
  custom_id: string;
  availability: ProductAvailability;
  color: ProductColor;
  product_group: string;
  videos: Array<ProductVideo>;
  features: Array<Feature>;
  description: DualLanguageText;
  admin_preferred_related_products: Array<string>;
  properties: Array<Properties>;
  createdAt: Date;
  updatedAt: Date;
  last_update: Date;
  updated_by: string;
  is_draft: boolean;
  is_published: boolean;
}
