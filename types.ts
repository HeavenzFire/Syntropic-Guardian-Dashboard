export type AuditStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETE' | 'FLAGGED';

export interface AuditStep {
  id: string;
  title: string;
  description: string;
  status: AuditStatus;
  metric: string;
}

export type LogLevel = 'INFO' | 'WARN' | 'CRITICAL' | 'USER';

export interface LogEntry {
  timestamp: number;
  level: LogLevel;
  message: string;
}

export interface Stat {
    label: string;
    value: number;
}

export interface OutreachTarget {
  outlet: string;
  region: string;
  contact: string;
  notes: string;
}

export interface SearchResult {
    category: string;
    title: string;
    content: string;
    source: any;
}