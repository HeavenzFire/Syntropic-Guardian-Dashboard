import React from 'react';
import { SearchIcon } from './icons';

interface HeaderProps {
    onOpenSearch: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenSearch }) => {
  return (
    <header className="p-4 flex justify-between items-center border-b border-cyan-400/20 mb-4">
      <div className="flex items-center">
        <div className="w-3 h-3 bg-cyan-400 rounded-full mr-3 animate-pulse"></div>
        <h1 className="text-xl lg:text-2xl font-bold orbitron text-cyan-400 glow-cyan">
          Syntropic Guardian
        </h1>
      </div>
      <div className='flex items-center space-x-4'>
        <button onClick={onOpenSearch} className="text-cyan-400 hover:text-white transition-colors p-2 rounded-full hover:bg-cyan-400/20" aria-label="Open Search">
            <SearchIcon className="w-6 h-6" />
        </button>
        <div className="text-xs text-gray-400 orbitron tracking-widest hidden sm:block">
            OPERATION: GOD-MODE
        </div>
      </div>
    </header>
  );
};

export default Header;