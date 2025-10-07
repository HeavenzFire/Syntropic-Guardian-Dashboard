import React, { useEffect } from 'react';
import StatsPanel from './StatsPanel';
import AuditTimeline from './AuditTimeline';
import LiveLog from './LiveLog';
import GlobalMap from './GlobalMap';
import GeminiQuery from './GeminiQuery';
import OutreachProtocol from './OutreachProtocol';
import { AuditStep, LogEntry } from '../types';

interface DashboardProps {
  steps: AuditStep[];
  logs: LogEntry[];
  onInitiateStep: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ steps, logs, onInitiateStep }) => {
  useEffect(() => {
    const isStepInProgress = steps.some(s => s.status === 'IN_PROGRESS');
    if (isStepInProgress) {
        return; 
    }

    const nextStep = steps.find(s => s.status === 'PENDING');
    if (nextStep) {
        const timer = setTimeout(() => {
            onInitiateStep(nextStep.id);
        }, 3000); 

        return () => clearTimeout(timer);
    }
  }, [steps, onInitiateStep]);


  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="lg:col-span-4">
        <StatsPanel />
      </div>
      <div className="md:col-span-2 lg:col-span-1 row-span-2">
        <AuditTimeline steps={steps} />
      </div>
      <div className="md:col-span-2 lg:col-span-2 h-96">
         <GlobalMap />
      </div>
      <div className="lg:col-span-1 h-96">
        <LiveLog log={logs} />
      </div>
      <div className="md:col-span-2 lg:col-span-2">
        <GeminiQuery />
      </div>
      <div className="md:col-span-2 lg:col-span-2">
        <OutreachProtocol />
      </div>
    </main>
  );
};

export default Dashboard;