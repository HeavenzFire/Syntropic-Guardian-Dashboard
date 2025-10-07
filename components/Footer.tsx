
import React from 'react';

const Footer: React.FC = () => {
  const links = [
    { name: 'NCMEC CyberTipline', url: 'https://missingkids.org/cybertipline' },
    { name: 'Thorn', url: 'https://thorn.org' },
    { name: 'UNICEF', url: 'https://unicef.org' },
    { name: 'HeavenzFire/SecureTransparency', url: 'https://github.com/HeavenzFire' },
  ];

  return (
    <footer className="p-4 mt-8 border-t border-cyan-400/20 text-center text-xs text-gray-400">
      <p className="mb-2">Operation God Mode Syntropic Guardian | Sanctify all life—entropy falls!</p>
      <div className="flex justify-center space-x-4">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors"
          >
            {link.name}
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
