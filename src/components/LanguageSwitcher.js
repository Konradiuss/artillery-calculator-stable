import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (

    <div className="flex items-center gap-2 p-2 border-2 border-[#4A3C2E] rounded-lg bg-[#1A1614]/50">
      <button
        onClick={() => setLanguage('en')}
        className={`px-2 py-1 rounded transition-colors duration-200 ${
          language === 'en' 
            ? 'bg-[#4A3C2E] text-[#8B7355] font-bold' 
            : 'bg-[#2E2420] text-[#8B7355] hover:bg-[#3E342E] hover:text-[#8B7355]'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('ua')}
        className={`px-2 py-1 rounded transition-colors duration-200 ${
          language === 'ua'
            ? 'bg-[#4A3C2E] text-[#8B7355] font-bold'
            : 'bg-[#2E2420] text-[#8B7355] hover:bg-[#3E342E] hover:text-[#8B7355]'
        }`}
      >
        UA
      </button>
      <button
        onClick={() => setLanguage('ru')}
        className={`px-2 py-1 rounded transition-colors duration-200 ${
          language === 'ru'
            ? 'bg-[#4A3C2E] text-[#8B7355] font-bold'
            : 'bg-[#2E2420] text-[#8B7355] hover:bg-[#3E342E] hover:text-[#8B7355]'
        }`}
      >
        RU
      </button>
    </div>
  );
};

export default LanguageSwitcher;