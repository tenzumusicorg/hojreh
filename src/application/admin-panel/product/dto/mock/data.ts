import { Types } from 'mongoose';

const product_data = {
  name: 'Jackson Pro Series Limited Edition San Dimas SD22 JB',
  seo_name: {
    fa: 'Jackson Pro Series Limited Edition San Dimas SD22 JB خرید گیتار',
    en: 'San Dimas SD22 JB',
  },
  category: {
    id: new Types.ObjectId(),
    name: {
      fa: 'گیتار',
      en: 'Guitar',
    },
  },
  subcategory: {
    id: new Types.ObjectId(),
    name: {
      fa: 'گیتار الکتریک',
      en: 'Electric Guitar',
    },
  },

  tags: [
    {
      id: new Types.ObjectId(),
      name: {
        fa: 'گیتار الکتریک',
        en: 'Electric Guitar',
      },
    },
    {
      id: new Types.ObjectId(),
      name: {
        fa: 'گیتار الکتریک',
        en: 'Electric Guitar',
      },
    },
  ],

  brand: {
    id: new Types.ObjectId(),
    name: {
      fa: 'گیبسون',
      en: 'Gibson',
    },
    logo: 'https://tenzu-images.s3.ir-thr-at1.arvanstorage.com/c3b1f1e3-4a78-40f6-8c28-e72ac24042da.webp',
  },
  model: {
    id: new Types.ObjectId(),
    name: {
      fa: 'لس پاول',
      en: 'Les Paul',
    },
  },
  rating: {
    stars: 8,
    score: '3.7',
    total_ratings: 1379,
  },

  images: [
    {
      url: 'https://tenzu-images.s3.ir-thr-at1.arvanstorage.com/6b54661f-9d82-44a2-8fbc-af96752905f5.png',
      thumbnail:
        'https://tenzu-images.s3.ir-thr-at1.arvanstorage.com/56a78b90-85cc-4b71-a452-2a5d13594bad.webp',
    },
    {
      url: 'https://tenzu-images.s3.ir-thr-at1.arvanstorage.com/6b54661f-9d82-44a2-8fbc-af96752905f5.png',
      thumbnail:
        'https://tenzu-images.s3.ir-thr-at1.arvanstorage.com/56a78b90-85cc-4b71-a452-2a5d13594bad.webp',
    },
  ],

  pricing: {
    price_to_pay: 17000000,
    price: 20000000,
    call_to_buy: true,
    sale: {
      is_on_sale: false,
      off_percent: 0,
    },
    is_used: true,
  },
  availability: {
    is_available: true,
    total_count: 3,
  },
  product_group: [
    {
      title: {
        fa: 'یه نوع دیگه',
        en: 'Other varient',
      },
      id: new Types.ObjectId(),
      slug: 'this-is-test-product-slug-that-works',
      thumbnail:
        'https://tenzu-images.s3.ir-thr-at1.arvanstorage.com/56a78b90-85cc-4b71-a452-2a5d13594bad.webp',
    },
    {
      title: {
        fa: ' ۲ یه نوع دیگه',
        en: 'Other varient 2',
      },
      id: new Types.ObjectId(),
      slug: 'this-is-test-product-slug-that-works',
      thumbnail:
        'https://tenzu-images.s3.ir-thr-at1.arvanstorage.com/56a78b90-85cc-4b71-a452-2a5d13594bad.webp',
    },
  ],
  videos: [
    {
      title: {
        fa: 'چطور گیتار بنوازیم؟؟',
        en: 'How to play a guitar?',
      },
      thumbnail:
        'https://tenzu-images.s3.ir-thr-at1.arvanstorage.com/56a78b90-85cc-4b71-a452-2a5d13594bad.webp',
      length: 8290,
      url: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
      category: 'demo',
    },
    {
      title: {
        fa: 'چطور گیتار بنوازیم؟؟',
        en: 'How to play a guitar?',
      },
      thumbnail:
        'https://tenzu-images.s3.ir-thr-at1.arvanstorage.com/56a78b90-85cc-4b71-a452-2a5d13594bad.webp',
      length: 8290,
      url: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
      category: 'review',
    },
    {
      title: {
        fa: 'چطور گیتار بنوازیم؟؟',
        en: 'How to play a guitar?',
      },
      thumbnail:
        'https://tenzu-images.s3.ir-thr-at1.arvanstorage.com/56a78b90-85cc-4b71-a452-2a5d13594bad.webp',
      length: 8290,
      url: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
      category: 'other',
    },
  ],
  features: [
    {
      fa: 'بدنه ساخته شده از جنس Flame Maple',
      en: 'Full-hollow body design',
    },
    {
      fa: 'بدنه ساخته شده از جندسته ساخته شده از ترکیب ماهوگانی و میپل',
      en: 'flamed maple top with ƒ holes',
    },
    {
      fa: 'فرت‌بورد ساخته شده از جنس Ebony',
      en: 'Ebony fingerboard',
    },
    {
      fa: 'دارای دو پیکاپ خاص Super Custom 58 از نوع هامباکر',
      en: 'pair of Ibanez Super 58 humbucking pickups',
    },
  ],
  description: {
    fa: 'گیتار AF-155 شرکت آیبانز، با بدنه ساخته شده از جنس Flame Maple و استایل ساخت HollowBody، می‌تواند صدایی گرم و پرحجم را در اختیار نوازنده قرار دهد. با توجه به استفاده از پیکاپ‌های مخصوص Super 58 Custom هامباکر در این گیتار، نوازنده می‌توان صدای Low-End بسیار پرحجم و گرمی را از گیتار دریافت کرده و فرکانس‌های High-End صدای وی نیز، از شدت و کوبش مناسبی برخوردار هستند. بخش Neck این گیتار نیز از ترکیب چوب میپل و ماهاگونی تشکیل شده است. ترکیب این دو چوب با کیفیت با فرت‌بورد ساخته شده از Ebony، لذت نواختن این گیتار را دوچندان می‌کند.',
    en: 'The AF155 features a full-hollow body design, a flamed maple top with ƒ holes and cream multi-binding on flamed maple back and sides, a single Venetian cutaway mated to set-in mahogany and maple neck with a 20-fret ebony fingerboard. Components include a pair of Ibanez Super 58 humbucking pickups and individual volume and tone controls, a bakelite pickguard with flamed maple veneer, Sure Grip III knobs, and Gotoh tuning machines.',
  },
  properties: [
    {
      title: {
        fa: 'مشخصات کلی',
        en: 'General',
      },
      icon: 'string',
      items: [
        {
          fa: {
            prop: 'تعداد سیم',
            value: '6',
          },
          en: {
            prop: 'Number of Pickup(s)',
            value: '2',
          },
        },
        {
          fa: {
            prop: 'تعداد سیم',
            value: '6',
          },
          en: {
            prop: 'Number of Pickup(s)',
            value: '2',
          },
        },
        {
          fa: {
            prop: 'تعداد سیم',
            value: '6',
          },
          en: {
            prop: 'Number of Pickup(s)',
            value: '2',
          },
        },
        {
          fa: {
            prop: 'تعداد سیم',
            value: '6',
          },
          en: {
            prop: 'Number of Pickup(s)',
            value: '2',
          },
        },
      ],
    },
  ],
  related_products: [
    {
      name: {
        fa: 'Guitar Les Paul 2',
        en: 'Guitar Les Paul 2',
      },
      subcategory: {
        id: new Types.ObjectId(),
        name: {
          fa: 'گیتار الکتریک',
          en: 'Electric Guitar',
        },
      },
      id: new Types.ObjectId(),
      slug: 'this-is-test-product-slug-that-works',
      thumbnail:
        'https://tenzu-images.s3.ir-thr-at1.arvanstorage.com/56a78b90-85cc-4b71-a452-2a5d13594bad.webp',
      pricing: {
        price_to_pay: 17000000,
        price: 20000000,
        sale: {
          is_on_sale: false,
          off_percent: 0,
        },
        is_used: true,
      },
    },
  ],
};

const comment_data = {
  pagination: {
    page: 1,
    per_page: 10,
    available_sorting: ['Likes', 'Bought', 'New'],
    total_pages: 23,
    total_items: 900
  },
  comments: [
    {
      id: new Types.ObjectId(),
      user: {
        name: 'Moody mousavi',
        avatar:
          'https://tenzu-images.s3.ir-thr-at1.arvanstorage.com/56a78b90-85cc-4b71-a452-2a5d13594bad.webp',
        purchased_before: true,
      },
      title: 'بهترین گیتاریه که به عمرم دیدم! 🔥',
      body: 'Best guitar i’ve ever seen in my life! thank you tenzu music 😍🔥',
      likes: 23,
      dis_likes: 1,
      rating: {
        stars: 4,
        score: 1.3,
      },
      date: `${Date.now()}`,
    },
    {
      id: new Types.ObjectId(),
      user: {
        name: 'Mohammad Shobeiri',
        avatar:
          'https://tenzu-images.s3.ir-thr-at1.arvanstorage.com/56a78b90-85cc-4b71-a452-2a5d13594bad.webp',
        purchased_before: false,
      },
      title: 'AWESOME',
      body: 'Very clean 💯',
      likes: 3,
      dis_likes: 12,
      rating: {
        stars: 3,
        score: 2.3,
      },
      date:`${Date.now()}`,
    },
  ],

  ratings: {
    total_rates: 323,
    total_score: 3.2,
    total_stars: 8,
    one_star: 1,
    two_star: 32,
    three_star: 43,
    four_star: 40,
    five_star: 30,
  }
};

export { product_data as ProductMockData, comment_data as CommentsMockData };
