import React, { useState, useCallback } from 'react';
import StatsPanel from './StatsPanel';
import AuditTimeline from './AuditTimeline';
import LiveLog from './LiveLog';
import GlobalMap from './GlobalMap';
import GeminiQuery from './GeminiQuery';
import { AUDIT_STEPS_DATA, INITIAL_LOGS } from '../constants';
import { AuditStep, LogEntry, LogLevel } from '../types';
import { executeAuditStep } from '../services/geminiService';

const Dashboard: React.FC = () => {
  const [steps, setSteps] = useState<AuditStep[]>(AUDIT_STEPS_DATA);
  const [logs, setLogs] = useState<LogEntry[]>(
    INITIAL_LOGS.map(log => ({ ...log, timestamp: Date.now() }))
  );
  
  const addLog = useCallback((level: LogLevel, message: string) => {
    setLogs(prev => [...prev, { timestamp: Date.now(), level, message }]);
  }, []);

  const handleInitiateStep = useCallback(async (id: string) => {
    const stepIndex = steps.findIndex(s => s.id === id);
    if (stepIndex === -1) return;

    const stepToRun = steps[stepIndex];
    
    setSteps(prev => prev.map(s => s.id === id ? { ...s, status: 'IN_PROGRESS' } : s));
    addLog('INFO', `Initiating Audit Step: ${stepToRun.title}`);

    try {
        const resultJson = await executeAuditStep(stepToRun);
        const result = JSON.parse(resultJson);

        result.logs.forEach((log: {level: LogLevel, message: string}) => {
            addLog(log.level, log.message);
        });
        addLog('INFO', `Step Summary: ${result.summary}`);

        setSteps(prev => prev.map(s => s.id === id ? { ...s, status: result.status } : s));
        addLog('INFO', `Audit Step "${stepToRun.title}" completed with status: ${result.status}.`);

    } catch (error) {
        console.error("Failed to execute audit step:", error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        addLog('CRITICAL', `Execution failed for step "${stepToRun.title}": ${errorMessage}`);
        setSteps(prev => prev.map(s => s.id === id ? { ...s, status: 'FLAGGED' } : s));
    }
  }, [steps, addLog]);

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="lg:col-span-4">
        <StatsPanel />
      </div>
      <div className="md:col-span-2 lg:col-span-1 row-span-2">
        <AuditTimeline steps={steps} onInitiateStep={handleInitiateStep} />
      </div>
      <div className="md:col-span-2 lg:col-span-2 h-96">
         <GlobalMap />
      </div>
      <div className="lg:col-span-1 h-96">
        <LiveLog log={logs} />
      </div>
      <div className="md:col-span-2 lg:col-span-4">
        <GeminiQuery />
      </div>
    </main>
  );
};

export default Dashboard;
