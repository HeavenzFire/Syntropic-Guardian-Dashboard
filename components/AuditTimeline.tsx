import React from 'react';
import { AuditStep, AuditStatus } from '../types';
import Card from './Card';
import { ShieldCheckIcon } from './icons';

const getStatusStyles = (status: AuditStatus) => {
    switch (status) {
        case 'PENDING':
            return { icon: '■', color: 'text-gray-500', bar: 'bg-gray-500' };
        case 'IN_PROGRESS':
            return { icon: '►', color: 'text-yellow-400 animate-pulse', bar: 'bg-yellow-400' };
        case 'COMPLETE':
            return { icon: '✔', color: 'text-green-400', bar: 'bg-green-400' };
        case 'FLAGGED':
            return { icon: '!', color: 'text-red-500 animate-pulse', bar: 'bg-red-500' };
        default:
            return { icon: '■', color: 'text-gray-500', bar: 'bg-gray-500' };
    }
};

interface AuditStepItemProps {
    step: AuditStep;
    isLast: boolean;
    onInitiate: (id: string) => void;
    canInitiate: boolean;
}

const AuditStepItem: React.FC<AuditStepItemProps> = ({ step, isLast, onInitiate, canInitiate }) => {
    const { icon, color, bar } = getStatusStyles(step.status);
    return (
        <div className="flex">
            <div className="flex flex-col items-center mr-4">
                <div>
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-lg ${color}`}>
                       {icon}
                    </div>
                </div>
                {!isLast && <div className={`w-px h-full ${bar}`}></div>}
            </div>
            <div className="pb-8 flex-grow">
                <p className={`mb-1 text-md font-bold ${color}`}>{step.title}</p>
                <p className="text-sm text-gray-400">{step.description}</p>
                <p className="text-xs text-cyan-300 mt-1">Metric: {step.metric}</p>
                 {step.status === 'PENDING' && canInitiate && (
                    <button
                        onClick={() => onInitiate(step.id)}
                        className="mt-2 px-3 py-1 text-xs bg-cyan-600/50 border border-cyan-400 text-white rounded-md hover:bg-cyan-500/70 transition orbitron"
                    >
                        INITIATE
                    </button>
                )}
                {step.status === 'IN_PROGRESS' && (
                     <div className="mt-2 text-yellow-400 text-xs flex items-center orbitron">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        EXECUTING...
                    </div>
                )}
            </div>
        </div>
    );
}

interface AuditTimelineProps {
    steps: AuditStep[];
    onInitiateStep: (id: string) => void;
}

const AuditTimeline: React.FC<AuditTimelineProps> = ({ steps, onInitiateStep }) => {
    const firstPendingIndex = steps.findIndex(step => step.status === 'PENDING');
    
    return (
        <Card title="Audit Protocol" icon={<ShieldCheckIcon className="w-6 h-6" />}>
            <div>
                {steps.map((step, index) => (
                    <AuditStepItem 
                        key={step.id} 
                        step={step} 
                        isLast={index === steps.length - 1}
                        onInitiate={onInitiateStep}
                        canInitiate={index === firstPendingIndex}
                    />
                ))}
            </div>
        </Card>
    );
};

export default AuditTimeline;