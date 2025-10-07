import { AuditStep, LogEntry, Stat, OutreachTarget } from './types';

export const AUDIT_STEPS_DATA: AuditStep[] = [
  {
    id: 'predictive-intelligence',
    title: 'Predictive Intelligence',
    description: 'Expand satellite coverage to 20+ regions (incl. SE Asia & S. America). Integrate quantum-resistant crypto & near-real-time Starlink feeds to predict emerging threats.',
    status: 'PENDING',
    metric: 'Map 20 zones & 250 nodes across 5 regions',
  },
  {
    id: 'systemic-erosion',
    title: 'Systemic Erosion',
    description: 'Deploy IWF dark web crawlers and Elliptic Monero tracing to dismantle illicit financial networks. Target supply chain blind spots in artisanal mining sectors.',
    status: 'PENDING',
    metric: 'Shut down 15 platforms & freeze 10 crypto accounts',
  },
  {
    id: 'disruptive-intervention',
    title: 'Disruptive Intervention',
    description: 'Escalate 50+ high-coherence leads to INTERPOL. Partner with UN Peacekeeping for ground ops and fund local NGOs for post-rescue psychosocial support.',
    status: 'PENDING',
    metric: 'Initiate 20+ investigations leading to 15 rescues & 10 arrests',
  },
  {
    id: 'global-collaboration',
    title: 'Global Collaboration',
    description: 'Forge alliances with local NGOs, Big Tech (Google/Microsoft Content Safety APIs), and lobby for policy reform. Translate all outreach materials for localized impact.',
    status: 'PENDING',
    metric: 'Establish 25 new alliances & secure 100+ media stories',
  },
  {
    id: 'proactive-prevention',
    title: 'Proactive Prevention',
    description: 'Deploy SEQA-encrypted ID database to 50 camps via Starlink. Fund digital literacy programs and scale trauma healing audio via global radio partnerships.',
    status: 'PENDING',
    metric: 'Shield 50,000 children & raise $100K via crowdfunding',
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

export const OUTREACH_TARGETS: OutreachTarget[] = [
  { outlet: 'Associated Press (AP)', region: 'Global (190+ countries)', contact: 'Phone: +1-212-621-1500', notes: 'Supplies to newspapers/TV worldwide. Use secure tip line.' },
  { outlet: 'Reuters', region: 'Global', contact: 'Website: reuters.com', notes: 'Strong on tech/AI exploitation stories.' },
  { outlet: 'Agence France-Presse (AFP)', region: 'Global (150+ countries)', contact: 'Website: afp.com/en/contact', notes: 'Focus on humanitarian crises like Sudan.' },
  { outlet: 'BBC News', region: 'International', contact: 'Email: newsonline@bbc.co.uk', notes: 'Global perspective; use tips form for child rights stories.' },
  { outlet: 'Al Jazeera', region: 'Middle East/Global', contact: 'Email: america@aljazeera.net', notes: 'Strong on Arab/African crises; relevant for Sudan.' },
  { outlet: 'CNN', region: 'Global', contact: 'Website: cnn.com/tips', notes: 'Pitch via secure form for exploitation exposés.' },
  { outlet: 'CBS News (60 Minutes)', region: 'National/International', contact: 'Email: 60m@cbsnews.com', notes: 'Investigative focus; ideal for deep dives.' }
];

export const INITIAL_AI_RESPONSE = `### Comprehensive Assessment of Current Plan

The Syntropic Guardian’s architecture integrates satellite tech (Sentinel-1/2, Maxar, Planet Labs), AI/ML (Thorn’s Safer Predict, Stuart-Landau Oscillator), SEQA-encrypted pipelines, and global media outreach via wire services (AP, Reuters, AFP). Below, we review each pillar for completeness, identifying potential oversights and mitigation strategies.

**1. Predictive Intelligence**
- **Status**: 12 high-risk zones mapped, exceeding targets. Stuart-Landau modeling at 0.82 coherence.
- **Gaps**: Underrepresented regions (SE Asia, S. America), emerging tech threats (quantum computing), real-time lag.
- **Mitigation**: Expand coverage to 20+ regions, integrate quantum-resistant crypto, deploy Starlink for low-latency feeds.

**2. Disruptive Intervention**
- **Status**: 15 leads escalated to INTERPOL, 5 investigations triggered.
- **Gaps**: Local law enforcement gaps, post-rescue victim support shortfalls, investigation scalability.
- **Mitigation**: Partner with UN Peacekeeping, fund World Vision for psychosocial support, scale to 20+ investigations.

**3. Systemic Erosion**
- **Status**: 12 platform vulnerabilities flagged.
- **Gaps**: Dark web resilience, complex crypto payment networks (Monero), supply chain blind spots.
- **Mitigation**: Deploy IWF dark web crawlers, use Elliptic for Monero tracing, partner with Global Witness for mining audits.

**4. Global Collaboration**
- **Status**: Alliances with NCMEC, Thorn, UNODC.
- **Gaps**: Exclusion of local/regional NGOs, government resistance, limited Big Tech engagement.
- **Mitigation**: Fund local NGOs (e.g., Sudan Mutual Aid), lobby via WeProtect, partner with Google/Microsoft Content Safety APIs.

**5. Proactive Prevention**
- **Status**: SEQA-encrypted ID database deployed to 10 camps.
- **Gaps**: Limited educational reach, tech accessibility in rural areas, unscaled trauma healing.
- **Mitigation**: Fund Save the Children for digital literacy, deploy Starlink to camps, scale healing audio via BBC World Service.

### Additional Oversights and Fortifications
- **Cultural Sensitivity**: Localize all materials via UNICEF partnerships.
- **Funding Sustainability**: Crowdfund $100K via GoFundMe.
- **Cybersecurity Risks**: Implement zero-trust architecture.
- **Media Saturation**: Target 1,000+ regional outlets via Feedspot.`;