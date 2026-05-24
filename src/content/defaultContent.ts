/**
 * DEFAULT SITE CONTENT — the single source of truth for every image and video
 * on the site, pre-filled with the existing paths. The CMS loads this on first
 * run (seeds Supabase with it), then lets you edit/upload to override any slot.
 *
 * Every path here points at /public. Anything you haven't uploaded yet will
 * simply render a branded placeholder (never a broken-image icon).
 */

export interface MediaItem {
  /** Public path or Supabase URL of the asset. Empty string = not set yet. */
  src: string;
  /** Optional alt / caption text. */
  alt?: string;
}

export interface PortfolioCampaign {
  id: number;
  title: string;
  client: string;
  category: 'creative' | 'print' | 'pos';
  featured?: boolean;
  description: string;
  images: MediaItem[];
}

export interface SiteContent {
  version: number;
  branding: {
    logoDark: MediaItem;   // shown on light backgrounds ("The Link logo.png")
    logoLight: MediaItem;  // shown on dark backgrounds ("the link logo white.png")
    favicon: MediaItem;
    ogImage: MediaItem;    // social share image
  };
  hero: {
    image: MediaItem;
  };
  slideshow: {
    images: MediaItem[];
  };
  about: {
    ceoPhoto: MediaItem;
  };
  showreel: {
    videos: MediaItem[];   // empty = section hides the video player gracefully
  };
  multilingual: {
    slides: MultilingualSlide[];
  };
  portfolio: PortfolioCampaign[];
}

export interface MultilingualSlide {
  src: string;
  lang: string;
  title: string;
  market: string;
}

export const defaultContent: SiteContent = {
  version: 1,
  branding: {
    logoDark: { src: '/The Link logo.png', alt: 'The Link Advertising' },
    logoLight: { src: '/the link logo white.png', alt: 'The Link Advertising' },
    favicon: { src: '/favicon.png', alt: 'The Link favicon' },
    ogImage: { src: '/the-link-og.jpg', alt: 'The Link Advertising' },
  },
  hero: {
    image: { src: '/Untitled-1.png', alt: 'The Link Advertising' },
  },
  slideshow: {
    images: [
      { src: '/slideshow/1.webp', alt: '' },
      { src: '/slideshow/2.webp', alt: '' },
      { src: '/slideshow/4.webp', alt: '' },
      { src: '/slideshow/5.webp', alt: '' },
      { src: '/slideshow/8.webp', alt: '' },
    ],
  },
  about: {
    ceoPhoto: {
      src: '/image.png',
      alt: 'Syed Ahmed Ul Hassan, CEO and Global Tech and Creative Head',
    },
  },
  multilingual: {
    slides: [
      { src: '/russian.png', lang: 'Russian', title: 'Electric Launch Campaign', market: 'Russia' },
      { src: '/Gemini_Generated_Image_ixm98sixm98sixm9 copy copy copy.png', lang: 'German', title: 'Emirates Comfort Campaign', market: 'Germany' },
      { src: '/Toyota Brakes Arabic copy copy copy copy.png', lang: 'Arabic', title: 'Toyota Brake Pads Campaign', market: 'Saudi Arabia' },
    ],
  },
  showreel: {
    videos: [
      { src: '/videos/showreel-1.mp4', alt: 'Showreel 01' },
      { src: '/videos/showreel-2.mp4', alt: 'Showreel 02' },
      { src: '/videos/showreel-3.mp4', alt: 'Showreel 03' },
    ],
  },
  portfolio: [
    {
      id: 12, title: 'Red Bull "Crazier Than Reality" Campaign', client: 'Red Bull',
      category: 'creative', featured: true,
      description: '"If you see something crazier than reality, it\'s either AI or Red Bull." A globally featured campaign pairing jaw-dropping extreme sports photography with the brand\'s iconic irreverence.',
      images: [
        { src: '/Redbull Campaign/Redbull1.png' }, { src: '/Redbull Campaign/Redbull2.png' },
        { src: '/Redbull Campaign/Redbull3.png' }, { src: '/Redbull Campaign/Redbull4.png' },
        { src: '/Redbull Campaign/Redbull5.png' },
      ],
    },
    {
      id: 8, title: 'Volkswagen Precision Campaign', client: 'Volkswagen',
      category: 'print', featured: true,
      description: "A precision-led print campaign placing the VW badge against the world's most enduring structures, the Parthenon, the Great Pyramid, and Incan stonework, to communicate engineering that stands the test of time.",
      images: [
        { src: '/Wolkswagon Precision Campaign/1.png' }, { src: '/Wolkswagon Precision Campaign/2.png' },
        { src: '/Wolkswagon Precision Campaign/3.png' },
      ],
    },
    {
      id: 7, title: 'AlBaik Saudi Founding Day Campaign', client: 'AlBaik',
      category: 'creative', featured: true,
      description: 'AlBaik Saudi Founding Day campaign featuring outdoor murals, heritage street placements, and bold cultural visual identity.',
      images: [
        { src: '/Super Crisp with the name of AlBaik Campaign/Untitled-1.png' },
        { src: '/Super Crisp with the name of AlBaik Campaign/Untitled-1_copy.png' },
        { src: '/Super Crisp with the name of AlBaik Campaign/Book.png' },
        { src: '/Super Crisp with the name of AlBaik Campaign/horse.png' },
        { src: '/Super Crisp with the name of AlBaik Campaign/shop.png' },
      ],
    },
    {
      id: 1, title: 'Almarai Saudi National Day Campaign', client: 'Almarai',
      category: 'creative', featured: true,
      description: 'Saudi National Day campaign featuring traditional cultural elements, heritage murals, and Times Square billboard.',
      images: [
        { src: '/Almarai Saudi National Day Campaign/1.webp' }, { src: '/Almarai Saudi National Day Campaign/2.webp' },
        { src: '/Almarai Saudi National Day Campaign/3.webp' }, { src: '/Almarai Saudi National Day Campaign/4.webp' },
        { src: '/Almarai Saudi National Day Campaign/5.webp' },
      ],
    },
    {
      id: 2, title: 'Super Crisp Mixed Campaigns', client: 'Super Crisp',
      category: 'creative',
      description: 'Multi-campaign portfolio including cricket sports marketing, seasonal celebrations, and 43-year anniversary.',
      images: [
        { src: '/Super Crisp Mixed Campaigns/1.webp' }, { src: '/Super Crisp Mixed Campaigns/2.webp' },
        { src: '/Super Crisp Mixed Campaigns/3.webp' }, { src: '/Super Crisp Mixed Campaigns/4.webp' },
      ],
    },
    {
      id: 3, title: 'Volvo Electric Vehicle Launch', client: 'Volvo, Saudi Arabia and Russia',
      category: 'creative',
      description: 'Multi-market EV launch campaign for Saudi Arabia and Russia with dramatic cityscape billboard executions.',
      images: [
        { src: '/1.webp' }, { src: '/2.webp' }, { src: '/3.webp' }, { src: '/4.webp' },
        { src: '/5.webp' }, { src: '/russian.png' }, { src: '/russian copy.png' },
      ],
    },
    {
      id: 4, title: 'Emirates Comfort Campaign', client: 'Emirates Airlines',
      category: 'creative',
      description: 'German market airline comfort campaign showcasing premium travel experience.',
      images: [
        { src: '/Gemini_Generated_Image_ixm98sixm98sixm9 copy copy copy.png' },
        { src: '/Gemini_Generated_Image_ixm98sixm98sixm9 copy copy.png' },
        { src: '/Gemini_Generated_Image_ixm98sixm98sixm9 copy.png' },
        { src: '/Gemini_Generated_Image_ixm98sixm98sixm9.png' },
      ],
    },
    {
      id: 5, title: 'Petromin Autocare Campaigns', client: 'Petromin Autocare',
      category: 'creative',
      description: 'Multilingual automotive service campaigns for Arabic and English markets featuring Toyota repair services.',
      images: [
        { src: '/Toyota Brake Pads Campaign/1.webp' }, { src: '/Toyota Brake Pads Campaign/2.webp' },
        { src: '/Toyota Brake Pads Campaign/3.webp' }, { src: '/Toyota Brake Pads Campaign/4.webp' },
        { src: '/Toyota Brake Pads Campaign/5.webp' },
      ],
    },
    {
      id: 6, title: 'Automotive Campaign', client: 'Yousuf Naghi Motors',
      category: 'creative',
      description: 'Complete brand campaign for automotive market entry.',
      images: [
        { src: '/Automotive Campaign/1.png' }, { src: '/Automotive Campaign/2.png' },
        { src: '/Automotive Campaign/Final.png' }, { src: '/Automotive Campaign/Final_Arabic.png' },
      ],
    },
    {
      id: 10, title: 'Jaguar Rebrand Campaign', client: 'Jaguar',
      category: 'creative',
      description: 'Comprehensive Jaguar rebrand concept with custom logo redesign, electric vehicle campaign visuals, branded merchandise mockups including helmets and bags, and futuristic key visual compositions.',
      images: [
        { src: '/Jaguar Campaign/kv.png' }, { src: '/Jaguar Campaign/kv_2.png' }, { src: '/Jaguar Campaign/Kv_3.png' },
        { src: '/Jaguar Campaign/helmet.png' }, { src: '/Jaguar Campaign/helmetw3.png' }, { src: '/Jaguar Campaign/bag.png' },
        { src: '/Jaguar Campaign/Comparison.png' }, { src: '/Jaguar Campaign/Improved_logo.png' },
        { src: '/Jaguar Campaign/Jaguar_logo.png' }, { src: '/Jaguar Campaign/Label.png' }, { src: '/Jaguar Campaign/logo_2.png' },
      ],
    },
    {
      id: 9, title: 'Intel Inside Campaign', client: 'Intel',
      category: 'creative',
      description: 'Humorous "Without Intel Inside" concept campaign revealing the human effort hidden behind everyday smart machines: ATMs, vending machines, recycling kiosks, and coffee dispensers.',
      images: [
        { src: '/Intel Campaign/1.png' }, { src: '/Intel Campaign/2.png' },
        { src: '/Intel Campaign/3.png' }, { src: '/Intel Campaign/4.png' },
      ],
    },
    {
      id: 11, title: 'JazzCash Brand Campaign', client: 'JazzCash',
      category: 'creative',
      description: 'Full brand identity and campaign for JazzCash, including logo design, social media posts, OOH mockups, and branded merchandise such as T-shirts, tote bags, credit cards, and envelope stationery.',
      images: [
        { src: '/Jazz Cash Campaign/Accessibility.png' }, { src: '/Jazz Cash Campaign/Arrow.png' },
        { src: '/Jazz Cash Campaign/Bag.png' }, { src: '/Jazz Cash Campaign/Cash_Flow.png' },
        { src: '/Jazz Cash Campaign/Convenience.png' }, { src: '/Jazz Cash Campaign/Credit_Card.png' },
        { src: '/Jazz Cash Campaign/Envelope.png' }, { src: '/Jazz Cash Campaign/innovation.png' },
        { src: '/Jazz Cash Campaign/Letter_C_and_J.png' }, { src: '/Jazz Cash Campaign/Logo.png' },
        { src: '/Jazz Cash Campaign/Mockup.png' }, { src: '/Jazz Cash Campaign/Post_1.png' },
        { src: '/Jazz Cash Campaign/Post_design_white.png' }, { src: '/Jazz Cash Campaign/Shirt.png' },
      ],
    },
  ],
};
