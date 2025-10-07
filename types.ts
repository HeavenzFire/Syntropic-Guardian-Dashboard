export type AuditStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETE' | 'FLAGGED';

export interface AuditStep {
  id: string;
  title: string;
  description: string;
  status: AuditStatus;
  metric: string;
}

export interface Stat {
  label: string;
  value: number;
  unit?: string;
}

export interface LogEntry {
    timestamp: string;
    level: 'INFO' | 'WARN' | 'CRITICAL' | 'USER';
    message: string;
}

export interface AiAuditResponse {
    summary: string;
    // FIX: Wrapped the object type in parentheses to correctly define an array of objects.
    logs: (Omit<LogEntry, 'timestamp' | 'level'> & { level: 'INFO' | 'WARN' | 'CRITICAL' })[];
    status: 'COMPLETE' | 'FLAGGED';
}
