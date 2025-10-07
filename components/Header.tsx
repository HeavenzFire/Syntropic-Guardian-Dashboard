import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="p-4 flex justify-between items-center border-b border-cyan-400/20 mb-4">
      <div className="flex items-center">
        <div className="w-3 h-3 bg-cyan-400 rounded-full mr-3 animate-pulse"></div>
        <h1 className="text-xl lg:text-2xl font-bold orbitron text-cyan-400 glow-cyan">
          Syntropic Guardian
        </h1>
      </div>
      <div className="text-xs text-gray-400 orbitron tracking-widest">
        OPERATION: GOD-MODE
      </div>
    </header>
  );
};

export default Header;
