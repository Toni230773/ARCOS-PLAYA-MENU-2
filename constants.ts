import { Language, Translation, GalleryItem, BlogPost, Activity } from './types';
import { Utensils, Waves, Sun, MapPin, Music } from 'lucide-react';

export const TRANSLATIONS: Record<Language, Translation> = {
  en: {
    nav: { home: 'Home', food: 'Food & Drink', entertainment: 'Entertainment', photos: 'Gallery', blog: 'Blog', contact: 'Contact' },
    hero: { title: 'Apartamentos Arcos Playa', subtitle: 'Your perfect stay on the Mediterranean coast', cta_book: 'Book Now', cta_explore: 'Explore' },
    sections: { 
      about: 'Experience the ultimate relaxation with our luxury beachfront apartments.',
      food_title: 'Taste the Mediterranean', 
      entertainment_title: 'Leisure & Fun', 
      gallery_title: 'Our Gallery', 
      blog_title: 'Travel Journal', 
      contact_title: 'Get in Touch',
      ai_title: 'AI Concierge',
      ai_desc: 'Ask our AI assistant for personalized itineraries or local tips!'
    },
    contact: { name: 'Name', email: 'Email', message: 'Message', send: 'Send Request' }
  },
  es: {
    nav: { home: 'Inicio', food: 'Gastronomía', entertainment: 'Ocio', photos: 'Galería', blog: 'Blog', contact: 'Contacto' },
    hero: { title: 'Apartamentos Arcos Playa', subtitle: 'Tu estancia perfecta en la costa mediterránea', cta_book: 'Reservar', cta_explore: 'Explorar' },
    sections: { 
      about: 'Vive la máxima relajación con nuestros apartamentos de lujo frente al mar.',
      food_title: 'Saborea el Mediterráneo', 
      entertainment_title: 'Ocio y Diversión', 
      gallery_title: 'Nuestra Galería', 
      blog_title: 'Diario de Viaje', 
      contact_title: 'Contáctanos',
      ai_title: 'Conserje IA',
      ai_desc: '¡Pide a nuestro asistente IA itinerarios personalizados o consejos locales!'
    },
    contact: { name: 'Nombre', email: 'Correo', message: 'Mensaje', send: 'Enviar Solicitud' }
  },
  fr: {
    nav: { home: 'Accueil', food: 'Gastronomie', entertainment: 'Loisirs', photos: 'Galerie', blog: 'Blog', contact: 'Contact' },
    hero: { title: 'Apartamentos Arcos Playa', subtitle: 'Votre séjour parfait sur la côte méditerranéenne', cta_book: 'Réserver', cta_explore: 'Explorer' },
    sections: { 
      about: 'Découvrez la relaxation ultime avec nos appartements de luxe en bord de mer.',
      food_title: 'Goûtez la Méditerranée', 
      entertainment_title: 'Loisirs et Plaisir', 
      gallery_title: 'Notre Galerie', 
      blog_title: 'Journal de Voyage', 
      contact_title: 'Contactez-nous',
      ai_title: 'Concierge IA',
      ai_desc: 'Demandez à notre assistant IA des itinéraires personnalisés !'
    },
    contact: { name: 'Nom', email: 'Email', message: 'Message', send: 'Envoyer' }
  },
  de: {
    nav: { home: 'Startseite', food: 'Essen & Trinken', entertainment: 'Unterhaltung', photos: 'Galerie', blog: 'Blog', contact: 'Kontakt' },
    hero: { title: 'Apartamentos Arcos Playa', subtitle: 'Ihr perfekter Aufenthalt an der Mittelmeerküste', cta_book: 'Buchen', cta_explore: 'Entdecken' },
    sections: { 
      about: 'Erleben Sie ultimative Entspannung in unseren luxuriösen Apartments am Strand.',
      food_title: 'Schmecken Sie das Mittelmeer', 
      entertainment_title: 'Freizeit & Spaß', 
      gallery_title: 'Unsere Galerie', 
      blog_title: 'Reisetagebuch', 
      contact_title: 'Kontaktieren Sie uns',
      ai_title: 'KI-Concierge',
      ai_desc: 'Fragen Sie unseren KI-Assistenten nach persönlichen Reiserouten!'
    },
    contact: { name: 'Name', email: 'E-Mail', message: 'Nachricht', send: 'Senden' }
  },
  it: {
    nav: { home: 'Home', food: 'Cibo e Bevande', entertainment: 'Intrattenimento', photos: 'Galleria', blog: 'Blog', contact: 'Contatto' },
    hero: { title: 'Apartamentos Arcos Playa', subtitle: 'Il tuo soggiorno perfetto sulla costa mediterranea', cta_book: 'Prenota Ora', cta_explore: 'Esplora' },
    sections: { 
      about: 'Vivi il massimo relax con i nostri appartamenti di lusso fronte mare.',
      food_title: 'Assapora il Mediterraneo', 
      entertainment_title: 'Svago e Divertimento', 
      gallery_title: 'La Nostra Galleria', 
      blog_title: 'Diario di Viaggio', 
      contact_title: 'Contattaci',
      ai_title: 'Concierge IA',
      ai_desc: 'Chiedi al nostro assistente IA itinerari personalizzati!'
    },
    contact: { name: 'Nome', email: 'Email', message: 'Messaggio', send: 'Invia' }
  }
};

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: 1, url: 'https://picsum.photos/800/600?random=1', category: 'apartments', title: 'Sea View Balcony' },
  { id: 2, url: 'https://picsum.photos/800/601?random=2', category: 'beach', title: 'Private Beach Access' },
  { id: 3, url: 'https://picsum.photos/800/602?random=3', category: 'food', title: 'Local Paella' },
  { id: 4, url: 'https://picsum.photos/800/603?random=4', category: 'apartments', title: 'Master Bedroom' },
  { id: 5, url: 'https://picsum.photos/800/604?random=5', category: 'city', title: 'Historic Town Center' },
  { id: 6, url: 'https://picsum.photos/800/605?random=6', category: 'food', title: 'Fresh Seafood' },
];

export const BLOG_POSTS: BlogPost[] = [
  { id: 1, title: 'Top 5 Hidden Coves Nearby', excerpt: 'Discover the secret beaches that only locals know about...', date: 'June 15, 2024', image: 'https://picsum.photos/600/400?random=10', category: 'Guide' },
  { id: 2, title: 'A Taste of Local Wine', excerpt: 'Exploring the vineyards just a 30-minute drive from Arcos Playa.', date: 'May 22, 2024', image: 'https://picsum.photos/600/400?random=11', category: 'Culture' },
  { id: 3, title: 'Summer Festivals 2024', excerpt: 'Don\'t miss the vibrant nightlife and street festivals this summer.', date: 'April 10, 2024', image: 'https://picsum.photos/600/400?random=12', category: 'Events' },
];

export const ACTIVITIES: Activity[] = [
  { id: 1, title: 'Beach Yoga', description: 'Morning sessions on the sand.', icon: 'Sun' },
  { id: 2, title: 'Water Sports', description: 'Kayak and paddle surf rentals.', icon: 'Waves' },
  { id: 3, title: 'Gastronomy Tours', description: 'Taste the best local tapas.', icon: 'Utensils' },
  { id: 4, title: 'Hiking Trails', description: 'Explore the coastal paths.', icon: 'MapPin' },
];
