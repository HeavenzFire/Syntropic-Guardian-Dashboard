import React, { useState, useEffect } from 'react';
import { SearchIcon } from './icons';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-start justify-center p-8 z-50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-gray-800 rounded-lg p-4 w-full max-w-2xl shadow-2xl shadow-cyan-500/10" onClick={e => e.stopPropagation()}>
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search system logs, intel reports, or entities..."
            className="w-full bg-black/30 border border-cyan-400/30 rounded-md p-3 pl-10 text-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            autoFocus
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400">
            <SearchIcon className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4 h-64 overflow-y-auto">
          {/* Search results would go here */}
          <p className="text-gray-500 text-center p-8">Enter a query to begin search.</p>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
