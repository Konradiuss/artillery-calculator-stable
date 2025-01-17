
import React, { createContext, useState, useContext } from 'react';
import { translations } from '../locales/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {

  const [language, setLanguage] = useState(() => {
    const savedLang = localStorage.getItem('language');
  
    return savedLang && ['en', 'ua', 'ru'].includes(savedLang) ? savedLang : 'en';
  });

 
  const handleSetLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);