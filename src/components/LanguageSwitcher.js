import React from 'react';
import { Globe } from 'lucide-react';
import { useUser } from '../context/UserContext';

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useUser();

  const languages = [
    { code: 'hindi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'english', name: 'English', flag: '🇺🇸' },
    { code: 'marathi', name: 'मराठी', flag: '🇮🇳' },
    { code: 'gujarati', name: 'ગુજરાતી', flag: '🇮🇳' }
  ];

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
        <Globe className="w-5 h-5" />
        <span className="hidden sm:inline">
          {languages.find(lang => lang.code === language)?.flag} {languages.find(lang => lang.code === language)?.name}
        </span>
      </button>
      
      <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="p-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-sm font-medium transition-all ${
                language === lang.code
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.name}</span>
              {language === lang.code && (
                <div className="ml-auto w-2 h-2 bg-green-500 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
