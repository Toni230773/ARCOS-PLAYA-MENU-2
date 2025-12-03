import React from 'react';
import { Language } from '../types';

interface Props {
  current: Language;
  onChange: (lang: Language) => void;
  isScrolled: boolean;
}

const LanguageSwitch: React.FC<Props> = ({ current, onChange, isScrolled }) => {
  const languages: Language[] = ['en', 'es', 'fr', 'de', 'it'];

  return (
    <div className="flex items-center space-x-1">
      {languages.map((lang) => (
        <button
          key={lang}
          onClick={() => onChange(lang)}
          className={`uppercase text-xs font-bold px-2 py-1 rounded transition-colors duration-300
            ${current === lang 
              ? 'bg-yellow-500 text-white' 
              : isScrolled ? 'text-slate-600 hover:text-blue-600' : 'text-white/80 hover:text-white'
            }`}
        >
          {lang}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitch;
