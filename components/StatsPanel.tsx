
import React, { useState, useEffect } from 'react';
import Card from './Card';
import { INITIAL_STATS } from '../constants';

const useCountUp = (end: number, duration: number = 2000) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const startTimestamp = Date.now();
        
        const step = (now: number) => {
            const elapsed = now - startTimestamp;
            const progress = Math.min(elapsed / duration, 1);
            const currentCount = Math.floor(progress * (end - start) + start);
            setCount(currentCount);

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                setCount(end);
            }
        };
        
        requestAnimationFrame(step);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [end, duration]);

    return count;
};

const StatCard: React.FC<{ label: string, value: number, unit?: string }> = ({ label, value, unit }) => {
    const animatedValue = useCountUp(value);
    return (
        <div className="flex-1 text-center p-2">
            <h3 className="text-sm text-cyan-300 mb-1">{label}</h3>
            <p className="text-2xl lg:text-3xl font-bold orbitron text-white">
                {unit === '$' ? unit : ''}{animatedValue.toLocaleString()}{unit !== '$' ? unit : ''}
            </p>
        </div>
    );
};

const StatsPanel: React.FC = () => {
    return (
        <Card className="!p-0">
            <div className="flex flex-wrap justify-around">
                {INITIAL_STATS.map((stat, index) => (
                    <React.Fragment key={stat.label}>
                        <StatCard label={stat.label} value={stat.value} unit={stat.label.includes('USD') ? '$' : undefined} />
                        {index < INITIAL_STATS.length - 1 && <div className="w-px bg-cyan-400/20 my-4 hidden md:block"></div>}
                    </React.Fragment>
                ))}
            </div>
        </Card>
    );
};

export default StatsPanel;
