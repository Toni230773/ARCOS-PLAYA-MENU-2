import React from 'react';

interface SectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  className?: string;
  children: React.ReactNode;
  dark?: boolean;
}

const Section: React.FC<SectionProps> = ({ id, title, subtitle, className = '', children, dark = false }) => {
  return (
    <section 
      id={id} 
      className={`py-20 px-6 md:px-12 lg:px-24 ${dark ? 'bg-slate-50' : 'bg-white'} ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {title && (
              <h2 className="text-3xl md:text-5xl font-serif text-blue-900 mb-4 tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full mb-4"></div>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;
