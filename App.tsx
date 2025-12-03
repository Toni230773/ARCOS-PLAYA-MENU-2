import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, MapPin, Phone, Mail, Instagram, Facebook, Star, ArrowRight, Camera, Upload } from 'lucide-react';
import { TRANSLATIONS, GALLERY_ITEMS, BLOG_POSTS, ACTIVITIES } from './constants';
import { Language, GalleryItem } from './types';
import Section from './components/Section';
import LanguageSwitch from './components/LanguageSwitch';
import AiConcierge from './components/AiConcierge';

function App() {
  const [lang, setLang] = useState<Language>('en');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeGalleryFilter, setActiveGalleryFilter] = useState<GalleryItem['category'] | 'all'>('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // -- Content State --
  const [heroImage, setHeroImage] = useState('https://picsum.photos/1920/1080?random=100');
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(GALLERY_ITEMS);
  const [blogPosts, setBlogPosts] = useState(BLOG_POSTS);
  const [mapImage, setMapImage] = useState('https://picsum.photos/1200/400?grayscale');
  
  const [foodItems, setFoodItems] = useState([
    { id: 1, image: 'https://picsum.photos/600/400?random=21', title: 'La Terraza del Mar', desc: 'Fresh seafood right on the beach front. Famous for their lobster paella.' },
    { id: 2, image: 'https://picsum.photos/600/400?random=22', title: 'El Olivo', desc: 'Authentic Mediterranean tapas in a rustic garden setting.' },
    { id: 3, image: 'https://picsum.photos/600/400?random=23', title: 'Sunset Lounge', desc: 'The best cocktails with a panoramic view of the coastline.' }
  ]);

  // File input refs for global actions
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  // Helper: Generic File Handler
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      callback(url);
    }
  };

  // -- Update Handlers --

  const handleGalleryAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(event, (url) => {
      const newItem: GalleryItem = {
        id: Date.now(),
        url: url,
        category: 'apartments',
        title: 'Uploaded Photo'
      };
      setGalleryItems([newItem, ...galleryItems]);
    });
  };

  const handleGalleryUpdate = (id: number, url: string) => {
    setGalleryItems(items => items.map(item => item.id === id ? { ...item, url } : item));
  };

  const handleFoodUpdate = (id: number, url: string) => {
    setFoodItems(items => items.map(item => item.id === id ? { ...item, image: url } : item));
  };

  const handleBlogUpdate = (id: number, url: string) => {
    setBlogPosts(posts => posts.map(post => post.id === id ? { ...post, image: url } : post));
  };

  const filteredGallery = activeGalleryFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeGalleryFilter);

  // Reusable "Change Photo" Button Component
  const ChangePhotoButton = ({ onChange }: { onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
    <div 
      className="absolute bottom-3 right-3 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      onClick={(e) => e.stopPropagation()}
    >
      <label className="cursor-pointer bg-white/90 hover:bg-white text-slate-800 px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2 text-xs font-bold backdrop-blur-sm transition-transform hover:scale-105">
        <Camera className="w-4 h-4" />
        <span className="hidden sm:inline">Change Photo</span>
        <input type="file" onChange={onChange} accept="image/*" className="hidden" />
      </label>
    </div>
  );

  return (
    <div className="font-sans text-slate-800 bg-white selection:bg-yellow-200 selection:text-yellow-900">
      
      {/* Navigation */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className={`text-2xl font-serif font-bold tracking-tighter ${isScrolled ? 'text-blue-900' : 'text-white'}`}>
              ARCOS PLAYA
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollTo('home')} className={`text-sm font-medium hover:text-yellow-500 transition-colors ${isScrolled ? 'text-slate-600' : 'text-white'}`}>{t.nav.home}</button>
            <button onClick={() => scrollTo('food')} className={`text-sm font-medium hover:text-yellow-500 transition-colors ${isScrolled ? 'text-slate-600' : 'text-white'}`}>{t.nav.food}</button>
            <button onClick={() => scrollTo('entertainment')} className={`text-sm font-medium hover:text-yellow-500 transition-colors ${isScrolled ? 'text-slate-600' : 'text-white'}`}>{t.nav.entertainment}</button>
            <button onClick={() => scrollTo('gallery')} className={`text-sm font-medium hover:text-yellow-500 transition-colors ${isScrolled ? 'text-slate-600' : 'text-white'}`}>{t.nav.photos}</button>
            <button onClick={() => scrollTo('blog')} className={`text-sm font-medium hover:text-yellow-500 transition-colors ${isScrolled ? 'text-slate-600' : 'text-white'}`}>{t.nav.blog}</button>
            <button onClick={() => scrollTo('contact')} className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${isScrolled ? 'bg-blue-900 text-white hover:bg-blue-800' : 'bg-white text-blue-900 hover:bg-slate-100'}`}>{t.nav.contact}</button>
            
            <div className="border-l border-white/20 pl-4 ml-2">
              <LanguageSwitch current={lang} onChange={setLang} isScrolled={isScrolled} />
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <LanguageSwitch current={lang} onChange={setLang} isScrolled={isScrolled} />
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`${isScrolled ? 'text-slate-800' : 'text-white'}`}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl flex flex-col p-6 gap-4">
             {['home', 'food', 'entertainment', 'gallery', 'blog', 'contact'].map((item) => (
                <button 
                  key={item}
                  onClick={() => scrollTo(item)} 
                  className="text-left text-lg font-medium text-slate-700 py-2 border-b border-slate-50 last:border-0 capitalize"
                >
                  {t.nav[item as keyof typeof t.nav]}
                </button>
             ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div id="home" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden group">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage}
            alt="Mediterranean Beach" 
            className="w-full h-full object-cover transition-opacity duration-700"
          />
          <div className="absolute inset-0 bg-blue-900/30 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>

        {/* Change Cover Button (Bottom Right) */}
        <ChangePhotoButton onChange={(e) => handleFileSelect(e, setHeroImage)} />

        <div className="relative z-10 text-center text-white px-6 max-w-4xl animate-fade-in-up">
          <p className="text-yellow-400 font-medium tracking-widest uppercase text-sm md:text-base mb-4">Est. 2024</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 tracking-tight leading-tight">
            {t.hero.title}
          </h1>
          <p className="text-lg md:text-2xl font-light text-slate-100 mb-10 max-w-2xl mx-auto">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => scrollTo('contact')} className="px-8 py-4 bg-yellow-500 text-white font-bold rounded-none hover:bg-yellow-400 transition-all text-sm tracking-wide uppercase shadow-lg">
              {t.hero.cta_book}
            </button>
            <button onClick={() => scrollTo('gallery')} className="px-8 py-4 bg-transparent border border-white text-white font-bold rounded-none hover:bg-white hover:text-blue-900 transition-all text-sm tracking-wide uppercase">
              {t.hero.cta_explore}
            </button>
          </div>
        </div>
      </div>

      {/* About Brief */}
      <div className="bg-white py-16 px-6 text-center">
        <p className="max-w-3xl mx-auto text-xl md:text-2xl text-slate-600 font-serif leading-relaxed">
          {t.sections.about}
        </p>
        <div className="flex justify-center gap-1 mt-8 text-yellow-500">
          <Star fill="currentColor" size={20} />
          <Star fill="currentColor" size={20} />
          <Star fill="currentColor" size={20} />
          <Star fill="currentColor" size={20} />
          <Star fill="currentColor" size={20} />
        </div>
      </div>

      {/* Food & Drink */}
      <Section id="food" title={t.sections.food_title} dark>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {foodItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
              <div className="h-48 overflow-hidden relative group">
                <img src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={item.title} />
                <ChangePhotoButton onChange={(e) => handleFileSelect(e, (url) => handleFoodUpdate(item.id, url))} />
              </div>
              <div className="p-6">
                <span className="text-xs font-bold text-blue-500 uppercase tracking-wider">Restaurant</span>
                <h3 className="text-xl font-serif font-bold text-slate-800 mt-2 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm mb-4">{item.desc}</p>
                <a href="#" className="inline-flex items-center text-sm font-bold text-blue-900 hover:text-yellow-600 transition-colors">
                  View Menu <ArrowRight size={16} className="ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Entertainment */}
      <Section id="entertainment" title={t.sections.entertainment_title}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ACTIVITIES.map((act) => (
            <div key={act.id} className="border border-slate-100 p-8 rounded-2xl text-center hover:border-yellow-200 hover:bg-yellow-50 transition-colors group">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-white group-hover:text-yellow-500 transition-colors">
                <Star className="w-8 h-8" /> 
              </div>
              <h3 className="font-serif font-bold text-lg mb-2">{act.title}</h3>
              <p className="text-slate-500 text-sm">{act.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Gallery */}
      <Section id="gallery" title={t.sections.gallery_title} dark>
        {/* Filter Buttons */}
        <div className="flex flex-col items-center gap-8 mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {['all', 'apartments', 'beach', 'food', 'city'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveGalleryFilter(cat as any)}
                className={`px-6 py-2 rounded-full text-sm uppercase tracking-wider transition-all ${
                  activeGalleryFilter === cat 
                  ? 'bg-blue-900 text-white shadow-lg' 
                  : 'bg-white text-slate-500 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="w-full max-w-xs border-t border-slate-200 pt-6 flex justify-center">
            <button 
              onClick={() => galleryInputRef.current?.click()}
              className="flex items-center gap-2 text-slate-500 hover:text-blue-900 font-bold text-sm transition-colors group"
            >
              <div className="bg-slate-100 p-2 rounded-full group-hover:bg-blue-100 transition-colors">
                <Upload className="w-4 h-4" />
              </div>
              <span>Upload New Photo</span>
            </button>
            <input 
              type="file" 
              ref={galleryInputRef}
              onChange={handleGalleryAdd}
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredGallery.map((item) => (
            <div 
              key={item.id} 
              className="break-inside-avoid relative group cursor-pointer rounded-lg overflow-hidden"
              onClick={() => setSelectedImage(item.url)}
            >
              <img src={item.url} alt={item.title} className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110" />
              
              {/* Overlay with Title */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                <span className="text-white font-serif text-lg tracking-wide">{item.title}</span>
              </div>

              {/* Change Photo Button - Needs pointer-events-auto because parent overlay has pointer-events-none */}
              <div className="pointer-events-auto">
                 <ChangePhotoButton onChange={(e) => handleFileSelect(e, (url) => handleGalleryUpdate(item.id, url))} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button className="absolute top-6 right-6 text-white p-2 hover:bg-white/10 rounded-full">
            <X size={32} />
          </button>
          <img src={selectedImage} alt="Full screen" className="max-w-full max-h-[90vh] shadow-2xl rounded-sm" />
        </div>
      )}

      {/* Blog */}
      <Section id="blog" title={t.sections.blog_title}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {blogPosts.map((post) => (
            <div key={post.id} className="group">
              <div className="relative overflow-hidden rounded-xl mb-6 group">
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md z-10 pointer-events-none">
                  {post.category}
                </div>
                <img src={post.image} alt={post.title} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                <ChangePhotoButton onChange={(e) => handleFileSelect(e, (url) => handleBlogUpdate(post.id, url))} />
              </div>
              <div className="text-sm text-slate-400 mb-2">{post.date}</div>
              <h3 className="text-xl font-serif font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                {post.excerpt}
              </p>
              <a href="#" className="inline-block border-b border-yellow-500 pb-1 text-sm font-bold text-slate-800 hover:text-yellow-600 transition-colors">
                Read Article
              </a>
            </div>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" title={t.sections.contact_title} dark>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl overflow-hidden shadow-xl">
          
          {/* Info Side */}
          <div className="bg-blue-900 text-white p-12 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-serif font-bold mb-6">Contact Info</h3>
              <p className="text-blue-200 mb-8 leading-relaxed">
                Ready for your Mediterranean escape? Contact us directly for the best rates and personalized offers.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-white/10 rounded-lg"><MapPin className="text-yellow-400" /></div>
                  <div>
                    <p className="font-bold">Address</p>
                    <p className="text-blue-200 text-sm">Paseo Marítimo 45, 03590<br/>Altea, Alicante, Spain</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-white/10 rounded-lg"><Phone className="text-yellow-400" /></div>
                  <div>
                    <p className="font-bold">Phone</p>
                    <p className="text-blue-200 text-sm">+34 965 000 000</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-white/10 rounded-lg"><Mail className="text-yellow-400" /></div>
                  <div>
                    <p className="font-bold">Email</p>
                    <p className="text-blue-200 text-sm">reservations@arcosplaya.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 flex gap-4">
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><Instagram size={20} /></a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><Facebook size={20} /></a>
            </div>
          </div>

          {/* Form Side */}
          <div className="p-12">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">{t.contact.name}</label>
                <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">{t.contact.email}</label>
                <input type="email" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">{t.contact.message}</label>
                <textarea rows={4} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"></textarea>
              </div>
              <button className="w-full py-4 bg-blue-900 text-white font-bold rounded-lg hover:bg-blue-800 transition-colors shadow-lg">
                {t.contact.send}
              </button>
            </form>
          </div>
        </div>
        
        {/* Map Integration Placeholder */}
        <div className="mt-12 w-full h-64 bg-slate-200 rounded-xl overflow-hidden relative group">
          <img src={mapImage} className="w-full h-full object-cover opacity-50 group-hover:opacity-75 transition-opacity" alt="Map Location" />
          <ChangePhotoButton onChange={(e) => handleFileSelect(e, setMapImage)} />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <button className="bg-white px-6 py-2 rounded-full shadow-md text-sm font-bold text-slate-700 flex items-center gap-2 hover:scale-105 transition-transform pointer-events-auto">
              <MapPin size={16} /> Open in Google Maps
            </button>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-serif font-bold text-white tracking-tighter">
            ARCOS PLAYA
          </div>
          <div className="text-sm">
            © 2024 Apartamentos Arcos Playa. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm font-medium">
             <a href="#" className="hover:text-white transition-colors">Privacy</a>
             <a href="#" className="hover:text-white transition-colors">Terms</a>
             <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </footer>

      {/* AI Concierge Component */}
      <AiConcierge 
        language={lang} 
        title={t.sections.ai_title}
        desc={t.sections.ai_desc}
      />

    </div>
  );
}

export default App;