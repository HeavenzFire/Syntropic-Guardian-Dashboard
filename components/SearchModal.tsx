
import React, { useState, useEffect, useMemo } from 'react';
import { SearchIcon } from './icons';
import { AuditStep, LogEntry, Stat, OutreachTarget, SearchResult } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  auditSteps: AuditStep[];
  logEntries: LogEntry[];
  stats: Stat[];
  aiResponse: string;
  outreachTargets: OutreachTarget[];
}

const escapeRegExp = (string: string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
};

const HighlightedText: React.FC<{ text: string; highlight: string }> = ({ text, highlight }) => {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }
  const safeHighlight = escapeRegExp(highlight);
  const regex = new RegExp(`(${safeHighlight})`, 'gi');
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={i} className="bg-cyan-400/30 text-cyan-200">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </span>
  );
};

const SearchModal: React.FC<SearchModalProps> = ({ 
    isOpen, 
    onClose, 
    auditSteps,
    logEntries,
    stats,
    aiResponse,
    outreachTargets 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return [];
    
    const term = searchTerm.toLowerCase();
    const results: SearchResult[] = [];

    // Search Audit Steps
    auditSteps.forEach(step => {
        if (step.title.toLowerCase().includes(term) || step.description.toLowerCase().includes(term)) {
            results.push({ category: 'Audit Protocol', title: step.title, content: step.description, source: step });
        }
    });

    // Search Logs
    logEntries.forEach(log => {
        if (log.message.toLowerCase().includes(term)) {
            results.push({ category: 'System Log', title: `[${log.level}] Log Entry`, content: log.message, source: log });
        }
    });

    // Search Stats
    stats.forEach(stat => {
        if (stat.label.toLowerCase().includes(term)) {
            results.push({ category: 'Dashboard Stats', title: stat.label, content: `Current Value: ${stat.value}`, source: stat });
        }
    });

    // Search AI Response
    if (aiResponse.toLowerCase().includes(term)) {
        results.push({ category: 'AI Core Intel', title: 'Tactical Analysis Report', content: aiResponse, source: aiResponse });
    }

    // Search Outreach Targets
    outreachTargets.forEach(target => {
        if (target.outlet.toLowerCase().includes(term) || target.notes.toLowerCase().includes(term)) {
            results.push({ category: 'Outreach Protocol', title: target.outlet, content: target.notes, source: target });
        }
    });

    return results;
  }, [searchTerm, auditSteps, logEntries, stats, aiResponse, outreachTargets]);

  const groupedResults = useMemo(() => {
    return searchResults.reduce((acc, result) => {
        (acc[result.category] = acc[result.category] || []).push(result);
        return acc;
    }, {} as Record<string, SearchResult[]>);
  }, [searchResults]);
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-start justify-center p-4 sm:p-8 z-50 backdrop-blur-sm" onClick={onClose}>
      <div className="card rounded-lg p-4 w-full max-w-2xl shadow-2xl shadow-cyan-500/10" onClick={e => e.stopPropagation()}>
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
        <div className="mt-4 h-[60vh] overflow-y-auto scrollbar-thin">
            {searchTerm.trim().length > 0 ? (
                Object.keys(groupedResults).length > 0 ? (
                    Object.entries(groupedResults).map(([category, results]) => (
                        <div key={category} className="mb-4">
                            <h3 className="text-cyan-400 orbitron text-sm font-bold border-b border-cyan-400/20 pb-1 mb-2">{category}</h3>
                            <ul className="space-y-2">
                                {results.map((result, index) => (
                                    <li key={`${category}-${index}`} className="p-2 bg-black/20 rounded-md text-sm">
                                        <p className="font-bold text-gray-200"><HighlightedText text={result.title} highlight={searchTerm} /></p>
                                        <p className="text-gray-400 truncate"><HighlightedText text={result.content} highlight={searchTerm} /></p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center p-8">No results found for "{searchTerm}".</p>
                )
            ) : (
                <p className="text-gray-500 text-center p-8">Enter a query to begin global search.</p>
            )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
