export type Language = 'en' | 'es' | 'fr' | 'de' | 'it';

export interface Translation {
  nav: {
    home: string;
    food: string;
    entertainment: string;
    photos: string;
    blog: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta_book: string;
    cta_explore: string;
  };
  sections: {
    about: string;
    food_title: string;
    entertainment_title: string;
    gallery_title: string;
    blog_title: string;
    contact_title: string;
    ai_title: string;
    ai_desc: string;
  };
  contact: {
    name: string;
    email: string;
    message: string;
    send: string;
  };
}

export interface GalleryItem {
  id: number;
  url: string;
  category: 'apartments' | 'beach' | 'food' | 'city';
  title: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
}

export interface Activity {
  id: number;
  title: string;
  description: string;
  icon: string;
}
