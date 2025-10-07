import React from 'react';
import Card from './Card';
import { SpeakerWaveIcon } from './icons';
import { OUTREACH_TARGETS } from '../constants';

const OutreachProtocol: React.FC = () => {
  const protocolSteps = [
    "Craft Press Release: Summarize Guardian findings and calls to action.",
    "Leverage Directories: Use services like EIN Presswire for mass distribution.",
    "Partner with Orgs: Collaborate with UNICEF or Save the Children for joint releases.",
    "Execute & Follow-Up: Send via encrypted channels and track via SecureTransparency.",
    "Measure Victory: Target 50+ stories, $50K+ donations, 10M+ reach."
  ];

  return (
    <Card title="Outreach Protocol: Media Amplification" icon={<SpeakerWaveIcon className="w-6 h-6" />}>
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <h3 className="font-bold orbitron text-cyan-300 mb-2">Protocol Steps:</h3>
          <ol className="list-decimal list-inside text-sm space-y-1 text-gray-300">
            {protocolSteps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>

        <div className="flex-grow overflow-auto scrollbar-thin max-h-80">
          <h3 className="font-bold orbitron text-cyan-300 mb-2">Key Global News Contacts:</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-cyan-400/30 text-cyan-300 sticky top-0 bg-[#0a192f]/50 backdrop-blur-sm">
                <tr>
                  <th className="p-2">Outlet/Agency</th>
                  <th className="p-2">Region/Coverage</th>
                  <th className="p-2">Contact</th>
                  <th className="p-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                {OUTREACH_TARGETS.map((target, index) => (
                  <tr key={index} className="border-b border-cyan-400/20 hover:bg-cyan-900/20">
                    <td className="p-2 font-semibold">{target.outlet}</td>
                    <td className="p-2 text-gray-400">{target.region}</td>
                    <td className="p-2 text-gray-400">{target.contact}</td>
                    <td className="p-2 text-gray-400">{target.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OutreachProtocol;
