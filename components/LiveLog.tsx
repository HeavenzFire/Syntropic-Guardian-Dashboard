import React, { useEffect, useRef } from 'react';
import { LogEntry } from '../types';
import Card from './Card';
import { TerminalIcon } from './icons';

interface LiveLogProps {
    log: LogEntry[];
}

const LiveLog: React.FC<LiveLogProps> = ({ log }) => {
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [log]);

  const getLevelColor = (level: LogEntry['level']) => {
    switch (level) {
      case 'INFO': return 'text-cyan-400';
      case 'WARN': return 'text-yellow-400';
      case 'CRITICAL': return 'text-red-500 animate-pulse';
      case 'USER': return 'text-fuchsia-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <Card title="System Activity Log" icon={<TerminalIcon className="w-6 h-6" />} className="h-full">
      <div ref={logContainerRef} className="h-full overflow-y-auto pr-2 scrollbar-thin">
        {log.map((entry, index) => (
          <div key={index} className="text-xs mb-2 font-mono">
            <span className="text-gray-500">{new Date(entry.timestamp).toLocaleTimeString()}</span>
            <span className={`ml-2 font-bold ${getLevelColor(entry.level)}`}>[{entry.level}]</span>
            <span className="ml-2 text-gray-300">{entry.message}</span>
          </div>
        ))}
         <div className="w-2 h-4 bg-cyan-400 animate-pulse mt-2"></div>
      </div>
    </Card>
  );
};

export default LiveLog;