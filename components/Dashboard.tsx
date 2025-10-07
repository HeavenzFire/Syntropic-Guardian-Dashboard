import React, { useState } from 'react';
import Card from './Card';
import GlobalMap from './GlobalMap';
import AuditTimeline from './AuditTimeline';
import StatsPanel from './StatsPanel';
import LiveLog from './LiveLog';
import GeminiQuery from './GeminiQuery';
import { AUDIT_STEPS_DATA, INITIAL_LOGS } from '../constants';
import { AuditStep, LogEntry, AiAuditResponse } from '../types';
import { executeAuditStep } from '../services/geminiService';

const Dashboard: React.FC = () => {
  const [auditSteps, setAuditSteps] = useState<AuditStep[]>(AUDIT_STEPS_DATA);
  const [logEntries, setLogEntries] = useState<LogEntry[]>(
    INITIAL_LOGS.map(log => ({ ...log, timestamp: new Date().toISOString() }))
  );

  const addLogEntry = (level: LogEntry['level'], message: string) => {
    setLogEntries(prev => [...prev, { level, message, timestamp: new Date().toISOString() }]);
  };

  const handleInitiateStep = async (stepId: string) => {
    const stepIndex = auditSteps.findIndex(s => s.id === stepId);
    if (stepIndex === -1) return;
    
    const stepToRun = auditSteps[stepIndex];

    setAuditSteps(prev => prev.map(s => s.id === stepId ? { ...s, status: 'IN_PROGRESS' } : s));
    addLogEntry('USER', `User initiated: ${stepToRun.title}`);

    try {
        const resultJson = await executeAuditStep(stepToRun);
        const result: AiAuditResponse = JSON.parse(resultJson.trim());

        result.logs.forEach((log, i) => {
            setTimeout(() => {
                addLogEntry(log.level, log.message);
            }, (i + 1) * 500);
        });

        setTimeout(() => {
            setAuditSteps(prev => prev.map(s => s.id === stepId ? { ...s, status: result.status } : s));
            addLogEntry('INFO', `Step "${stepToRun.title}" completed with status: ${result.status}. Summary: ${result.summary}`);
        }, (result.logs.length + 1) * 500);

    } catch (error) {
        console.error("Failed to execute audit step:", error);
        setAuditSteps(prev => prev.map(s => s.id === stepId ? { ...s, status: 'FLAGGED' } : s));
        addLogEntry('CRITICAL', `Execution failed for step "${stepToRun.title}". Please review logs.`);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
      <div className="lg:col-span-12">
        <StatsPanel />
      </div>

      <div className="lg:col-span-8 h-[500px]">
        <GlobalMap />
      </div>

      <div className="lg:col-span-4 h-[500px]">
        <LiveLog log={logEntries} />
      </div>
      
      <div className="lg:col-span-5">
        <AuditTimeline 
          steps={auditSteps} 
          onInitiateStep={handleInitiateStep} 
        />
      </div>

      <div className="lg:col-span-7">
        <GeminiQuery />
      </div>
    </div>
  );
};

export default Dashboard;