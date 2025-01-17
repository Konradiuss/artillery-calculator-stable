import React from 'react';
import ArtilleryCalculator from './components/ArtilleryCalculator';
import { LanguageProvider } from './contexts/LanguageContext';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#0A0A0A] py-8 relative">
        <div className="fixed inset-0 z-0 overflow-hidden">
          <img 
            src="/ammolay1.gif" 
            alt="" 
            className="w-full h-full object-cover opacity-70"
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <ArtilleryCalculator />
        </div>
      </div>
    </LanguageProvider>
  );
}

export default App;