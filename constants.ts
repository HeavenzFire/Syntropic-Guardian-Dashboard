import { AuditStep, LogEntry, Stat } from './types';

export const AUDIT_STEPS_DATA: AuditStep[] = [
  {
    id: 'data-ingestion',
    title: 'Satellite Data Ingestion',
    description: 'Access Sentinel-2/Maxar imagery to map trafficking routes.',
    status: 'PENDING',
    metric: 'Map 10 high-risk zones',
  },
  {
    id: 'vuln-scan',
    title: 'Vulnerability Scanning',
    description: 'Run OpenVAS/Nmap on platforms hosting illicit content.',
    status: 'PENDING',
    metric: 'Patch or flag 10 critical endpoints',
  },
  {
    id: 'pattern-analysis',
    title: 'Pattern Analysis & Simulation',
    description: 'Model global trafficking patterns with Stuart-Landau Oscillator.',
    status: 'PENDING',
    metric: 'Flag 15 actionable leads for INTERPOL',
  },
  {
    id: 'escalation',
    title: 'Exposure & Escalation',
    description: 'Compile tamper-proof reports and distribute to agencies.',
    status: 'PENDING',
    metric: 'Trigger 5+ investigations',
  },
  {
    id: 'prevention',
    title: 'Prevention & Sanctification',
    description: 'Fund protection SOPs and develop SEQA-encrypted child ID database.',
    status: 'PENDING',
    metric: 'Deploy database to 10 camps',
  },
];

export const INITIAL_STATS: Stat[] = [
    { label: 'Children Protected', value: 2000 },
    { label: 'Networks Exposed', value: 30 },
    { label: 'Vulnerabilities Patched', value: 10 },
    { label: 'Funds Raised (USD)', value: 10000 }
];

export const INITIAL_LOGS: Omit<LogEntry, 'timestamp'>[] = [
  { level: 'INFO', message: 'Syntropic Guardian System Initialized. Awaiting command.' },
  { level: 'INFO', message: 'Moral imperatives loaded: Sanctify and guard all life.' },
];