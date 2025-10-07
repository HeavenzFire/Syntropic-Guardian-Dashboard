
import React, { useState } from 'react';
import Card from './Card';
import { getAiAnalysis } from '../services/geminiService';
import { BrainCircuitIcon } from './icons';

const GeminiQuery: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    setIsLoading(true);
    setResponse('');
    setError(null);

    try {
      const result = await getAiAnalysis(query);
      setResponse(result);
    } catch (err) {
      setError('Failed to get analysis from AI Core.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const sampleQueries = [
    "Analyze trafficking patterns in the Horn of Africa.",
    "Correlate Sentinel-2 data with known RSF movements.",
    "Suggest countermeasures for deepfake-based sextortion.",
  ];

  return (
    <Card title="AI Core Interface" icon={<BrainCircuitIcon className="w-6 h-6" />}>
      <div className="flex flex-col h-full">
        <p className="text-sm text-gray-400 mb-2">Engage the Syntropic Guardian AI for tactical analysis.</p>
        <div className="text-xs mb-4 text-gray-500">
            <p>Sample Queries:</p>
            <ul className="list-disc list-inside">
                {sampleQueries.map(q => (
                    <li key={q}><button onClick={() => setQuery(q)} className="text-left hover:text-cyan-300">{q}</button></li>
                ))}
            </ul>
        </div>
        <form onSubmit={handleSubmit} className="mb-4">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your query..."
            rows={3}
            className="w-full bg-black/30 border border-cyan-400/30 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="w-full mt-2 px-4 py-2 bg-cyan-600/50 border border-cyan-400 text-white rounded-md hover:bg-cyan-500/70 disabled:bg-gray-600/50 disabled:cursor-not-allowed transition orbitron"
          >
            {isLoading ? 'ANALYZING...' : 'ENGAGE AI CORE'}
          </button>
        </form>
        <div className="flex-grow bg-black/40 p-3 rounded-md min-h-[100px] overflow-y-auto scrollbar-thin">
          {isLoading && <p className="text-yellow-400 animate-pulse">Awaiting response from AI Core...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {response && (
             <p className="text-sm whitespace-pre-wrap font-mono">{response}</p>
          )}
          {!isLoading && !response && !error && (
            <p className="text-gray-500 text-sm">Response will appear here.</p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default GeminiQuery;
