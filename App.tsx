import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import SearchModal from './components/SearchModal';
import { AUDIT_STEPS_DATA, INITIAL_LOGS, INITIAL_STATS, INITIAL_AI_RESPONSE, OUTREACH_TARGETS } from './constants';
import { AuditStep, LogEntry, LogLevel } from './types';
import { executeAuditStep } from './services/geminiService';

function App() {
  const [steps, setSteps] = useState<AuditStep[]>(AUDIT_STEPS_DATA);
  const [logs, setLogs] = useState<LogEntry[]>(
    INITIAL_LOGS.map(log => ({ ...log, timestamp: Date.now() }))
  );
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const addLog = useCallback((level: LogLevel, message: string) => {
    setLogs(prev => [...prev.slice(-200), { timestamp: Date.now(), level, message }]); // Keep last 200 logs
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
    <>
      <div className="min-h-screen flex flex-col">
        <div className="container mx-auto p-4 flex-grow">
          <Header onOpenSearch={() => setIsSearchOpen(true)} />
          <Dashboard 
            steps={steps}
            logs={logs}
            onInitiateStep={handleInitiateStep}
          />
        </div>
        <Footer />
      </div>
      <SearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        auditSteps={steps}
        logEntries={logs}
        stats={INITIAL_STATS}
        aiResponse={INITIAL_AI_RESPONSE}
        outreachTargets={OUTREACH_TARGETS}
      />
    </>
  );
}

export default App;