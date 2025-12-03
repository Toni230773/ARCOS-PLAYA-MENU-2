import React, { useState } from 'react';
import { generateConciergeResponse } from '../services/geminiService';
import { Sparkles, Send, X } from 'lucide-react';
import { Language } from '../types';

interface Props {
  language: Language;
  title: string;
  desc: string;
}

const AiConcierge: React.FC<Props> = ({ language, title, desc }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResponse('');
    
    try {
      const result = await generateConciergeResponse(query, language);
      setResponse(result);
    } catch (e) {
      setResponse("Sorry, I'm having trouble connecting to the concierge service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-blue-900 text-white p-4 rounded-full shadow-xl hover:bg-blue-800 transition-all hover:scale-105 group"
        aria-label="Open AI Concierge"
      >
        <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6 pointer-events-none">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm pointer-events-auto" onClick={() => setIsOpen(false)}></div>
          
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl pointer-events-auto transform transition-all flex flex-col max-h-[80vh]">
            {/* Header */}
            <div className="bg-blue-900 p-4 rounded-t-2xl flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <h3 className="font-serif text-lg">{title}</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto flex-1">
              {!response && !loading && (
                <div className="text-center text-slate-500 py-8">
                  <p className="mb-2 text-3xl">🛎️</p>
                  <p>{desc}</p>
                </div>
              )}

              {loading && (
                <div className="flex justify-center py-8">
                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div>
                </div>
              )}

              {response && (
                <div className="bg-blue-50 p-4 rounded-lg text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                  {response}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-100 flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
                placeholder="Ask for recommendations..."
                className="flex-1 px-4 py-2 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button 
                onClick={handleAsk}
                disabled={loading || !query.trim()}
                className="bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600 disabled:opacity-50 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AiConcierge;
