import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="p-4 border-b border-cyan-400/20 flex justify-between items-center">
      <div className="flex items-center">
        <img src="https://picsum.photos/40/40?grayscale" alt="SG Logo" className="h-10 w-10 rounded-full mr-4 border-2 border-cyan-400/50" />
        <h1 className="text-2xl md:text-3xl font-bold orbitron glow-cyan">
          SYNTR<span className="text-fuchsia-400 glow-fuchsia">O</span>PIC GUARDIAN
        </h1>
      </div>
      <div className="hidden md:flex items-center space-x-4 text-sm">
        <div className="flex items-center">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="ml-2 text-green-400">SYSTEM ONLINE</span>
        </div>
        <span className="text-gray-500">|</span>
        <span className="text-yellow-400">AWAITING COMMAND</span>
      </div>
    </header>
  );
};

export default Header;