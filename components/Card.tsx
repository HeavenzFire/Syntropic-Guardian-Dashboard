
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  icon?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, className = '', title, icon }) => {
  return (
    <div className={`card rounded-lg p-4 flex flex-col ${className}`}>
      {title && (
        <div className="flex items-center mb-4">
          {icon && <div className="mr-3 text-cyan-400">{icon}</div>}
          <h2 className="text-lg orbitron font-bold text-cyan-400 glow-cyan flex-grow">{title}</h2>
        </div>
      )}
      <div className="flex-grow">{children}</div>
    </div>
  );
};

export default Card;
