import { ProjectFile } from '../types/agent';

export interface ProjectPreset {
  id: string;
  name: string;
  tagline: string;
  category: string;
  files: ProjectFile[];
}

export const ORBIT_SAAS_FILES: ProjectFile[] = [
  {
    path: 'src/app/page.tsx',
    name: 'page.tsx',
    language: 'tsx',
    content: `import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Metrics from '../components/Metrics';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';

export default function OrbitLanding() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <main className="min-h-screen bg-[#111210] text-[#F2F3ED] selection:bg-[#B7FF2A]/20 selection:text-[#B7FF2A]">
      <Navbar />
      <Hero />
      <Metrics />
      <Features />
      <Pricing billingCycle={billingCycle} setBillingCycle={setBillingCycle} />
      <Footer />
    </main>
  );
}`,
  },
  {
    path: 'src/components/Navbar.tsx',
    name: 'Navbar.tsx',
    language: 'tsx',
    content: `import React, { useState } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#2A2D27] bg-[#111210]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#1D1F1B] border border-[#2A2D27] flex items-center justify-center">
            <svg className="w-5 h-5 text-[#B7FF2A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9" />
              <path d="M3.6 9h16.8M3.6 15h16.8" />
            </svg>
          </div>
          <span className="font-semibold text-lg tracking-tight text-[#F2F3ED]">ORBIT</span>
          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#1D1F1B] text-[#B7FF2A] border border-[#2A2D27]">v2.4</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm text-[#A3A69B]">
          <a href="#features" className="hover:text-[#F2F3ED] transition-colors">Features</a>
          <a href="#architecture" className="hover:text-[#F2F3ED] transition-colors">Architecture</a>
          <a href="#pricing" className="hover:text-[#F2F3ED] transition-colors">Pricing</a>
          <a href="#docs" className="hover:text-[#F2F3ED] transition-colors">Documentation</a>
        </nav>

        <div className="flex items-center gap-3">
          <button className="hidden sm:inline-flex px-3.5 py-1.5 text-xs font-medium text-[#A3A69B] hover:text-[#F2F3ED] transition-colors">
            Sign In
          </button>
          <button className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-[#B7FF2A] text-[#111210] hover:bg-[#89C900] transition-colors">
            Start Free Trial
          </button>
        </div>
      </div>
    </header>
  );
}`,
  },
  {
    path: 'src/components/Hero.tsx',
    name: 'Hero.tsx',
    language: 'tsx',
    content: `import React from 'react';

export default function Hero() {
  return (
    <section className="relative pt-20 pb-16 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171815] border border-[#2A2D27] text-xs font-mono text-[#A3A69B] mb-6">
          <span className="w-2 h-2 rounded-full bg-[#B7FF2A] animate-ping" />
          Autonomous Cloud Orchestration Engine
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#F2F3ED] mb-6 leading-tight">
          Ship infrastructure at the speed of thought.
        </h1>

        <p className="text-base sm:text-lg text-[#A3A69B] max-w-2xl mx-auto mb-8 font-light">
          Orbit continuously verifies, tests, and deploys full-stack microservices without cognitive overload or manual pipeline glue.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#B7FF2A] text-[#111210] font-semibold text-sm hover:bg-[#89C900] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(183,255,42,0.2)]">
            <span>Deploy First Cluster</span>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>

          <button className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#171815] border border-[#2A2D27] text-[#F2F3ED] font-medium text-sm hover:border-[#70746A] transition-colors flex items-center justify-center gap-2">
            <svg className="w-4 h-4 text-[#A3A69B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polygon points="10 8 16 12 10 16 10 8"/>
            </svg>
            <span>View 2-Min Architecture Demo</span>
          </button>
        </div>
      </div>
    </section>
  );
}`,
  },
  {
    path: 'src/components/Metrics.tsx',
    name: 'Metrics.tsx',
    language: 'tsx',
    content: `import React from 'react';

export default function Metrics() {
  const stats = [
    { label: 'Latency P99', value: '< 8ms', change: '-42% vs baseline' },
    { label: 'Pipeline Throughput', value: '45,000 req/s', change: 'Zero drop rate' },
    { label: 'Autonomous Recovery', value: '99.99%', change: 'Self-healing mesh' },
    { label: 'Cold Start Speed', value: '14ms', change: 'Instant provision' },
  ];

  return (
    <section className="py-12 border-y border-[#2A2D27] bg-[#171815]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((s, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#1D1F1B]/60 border border-[#2A2D27]">
              <div className="text-xs font-mono text-[#70746A] uppercase tracking-wider mb-1">{s.label}</div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-[#F2F3ED] mb-1">{s.value}</div>
              <div className="text-xs text-[#B7FF2A] font-mono">{s.change}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`,
  },
  {
    path: 'src/components/Features.tsx',
    name: 'Features.tsx',
    language: 'tsx',
    content: `import React, { useState } from 'react';

export default function Features() {
  const [activeTab, setActiveTab] = useState(0);

  const features = [
    {
      title: 'Zero-Config Isolation',
      desc: 'Each build step runs in microVMs with immutable cryptographic guarantees.',
      badge: 'Security',
    },
    {
      title: 'Deterministic Patching',
      desc: 'Synthesizes targeted diffs without overwriting unrelated application state.',
      badge: 'Compiler',
    },
    {
      title: 'Continuous Verification',
      desc: 'Autonomous typecheck, lint, and runtime preview before merging to production.',
      badge: 'Testing',
    },
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono uppercase text-[#B7FF2A] tracking-wider">Engine Capabilities</span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F2F3ED] mt-2 mb-4">
          Built for teams who measure lead time in seconds.
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div
            key={i}
            onClick={() => setActiveTab(i)}
            className={\`p-6 rounded-xl border transition-all cursor-pointer \${
              activeTab === i
                ? 'bg-[#1D1F1B] border-[#B7FF2A] shadow-[0_0_15px_rgba(183,255,42,0.1)]'
                : 'bg-[#171815] border-[#2A2D27] hover:border-[#70746A]'
            }\`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-[#111210] text-[#B7FF2A] border border-[#2A2D27]">
                {f.badge}
              </span>
              <span className="text-xs font-mono text-[#70746A]">0{i + 1}</span>
            </div>
            <h3 className="text-lg font-semibold text-[#F2F3ED] mb-2">{f.title}</h3>
            <p className="text-sm text-[#A3A69B] leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}`,
  },
  {
    path: 'src/components/Pricing.tsx',
    name: 'Pricing.tsx',
    language: 'tsx',
    content: `import React from 'react';

interface PricingProps {
  billingCycle: 'monthly' | 'yearly';
  setBillingCycle: (cycle: 'monthly' | 'yearly') => void;
}

export default function Pricing({ billingCycle, setBillingCycle }: PricingProps) {
  const plans = [
    {
      name: 'Developer',
      price: billingCycle === 'monthly' ? '$29' : '$24',
      period: '/ month',
      desc: 'Ideal for solo developers building fast prototypes.',
      features: ['Up to 5 concurrent sandboxes', '100 Copilot agent runs / mo', 'Community discord support', 'Standard preview URLs'],
      highlight: false,
    },
    {
      name: 'Team Pro',
      price: billingCycle === 'monthly' ? '$89' : '$72',
      period: '/ month per seat',
      desc: 'For software engineering teams shipping production features.',
      features: ['Unlimited microVM sandboxes', 'Unlimited agent workflow runs', 'Custom domains & SSL', 'GitHub Enterprise sync', 'Priority execution lane'],
      highlight: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      desc: 'Dedicated clusters, VPC peering, and custom SLA.',
      features: ['Dedicated isolated compute', 'Custom security audits', '24/7 dedicated SRE support', 'On-premise deployment option'],
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto border-t border-[#2A2D27]">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl font-bold text-[#F2F3ED] mb-3">Transparent Compute Pricing</h2>
        <p className="text-sm text-[#A3A69B]">Scale effortlessly with no surprise egress bills.</p>

        <div className="inline-flex items-center mt-6 p-1 rounded-lg bg-[#171815] border border-[#2A2D27]">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={\`px-4 py-1.5 text-xs font-medium rounded-md transition-colors \${
              billingCycle === 'monthly' ? 'bg-[#1D1F1B] text-[#B7FF2A] border border-[#2A2D27]' : 'text-[#A3A69B]'
            }\`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={\`px-4 py-1.5 text-xs font-medium rounded-md transition-colors \${
              billingCycle === 'yearly' ? 'bg-[#1D1F1B] text-[#B7FF2A] border border-[#2A2D27]' : 'text-[#A3A69B]'
            }\`}
          >
            Yearly (20% off)
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((p, i) => (
          <div
            key={i}
            className={\`rounded-2xl p-8 flex flex-col justify-between border \${
              p.highlight
                ? 'bg-[#1D1F1B] border-[#B7FF2A] ring-1 ring-[#B7FF2A]/50 shadow-[0_0_30px_rgba(183,255,42,0.08)]'
                : 'bg-[#171815] border-[#2A2D27]'
            }\`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#F2F3ED]">{p.name}</h3>
                {p.highlight && (
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#B7FF2A] text-[#111210] font-bold">
                    Popular
                  </span>
                )}
              </div>
              <p className="text-xs text-[#A3A69B] mb-6">{p.desc}</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold font-mono text-[#F2F3ED]">{p.price}</span>
                <span className="text-xs text-[#70746A]">{p.period}</span>
              </div>
              <ul className="space-y-3 mb-8 text-xs text-[#A3A69B]">
                {p.features.map((f, fi) => (
                  <li key={fi} className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#B7FF2A] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              className={\`w-full py-2.5 rounded-lg text-xs font-semibold transition-all \${
                p.highlight
                  ? 'bg-[#B7FF2A] text-[#111210] hover:bg-[#89C900]'
                  : 'bg-[#1D1F1B] border border-[#2A2D27] text-[#F2F3ED] hover:border-[#70746A]'
              }\`}
            >
              Get Started
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}`,
  },
  {
    path: 'src/components/Footer.tsx',
    name: 'Footer.tsx',
    language: 'tsx',
    content: `import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-[#2A2D27] bg-[#111210] py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#70746A]">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded bg-[#1D1F1B] border border-[#2A2D27] flex items-center justify-center">
            <svg className="w-3 h-3 text-[#B7FF2A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9" />
            </svg>
          </div>
          <span>ORBIT INC. © 2026. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#privacy" className="hover:text-[#A3A69B] transition-colors">Privacy</a>
          <a href="#terms" className="hover:text-[#A3A69B] transition-colors">Terms</a>
          <a href="#status" className="hover:text-[#B7FF2A] transition-colors flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF2A]" />
            Systems Operational
          </a>
        </div>
      </div>
    </footer>
  );
}`,
  },
  {
    path: 'src/styles/globals.css',
    name: 'globals.css',
    language: 'css',
    content: `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --orbit-accent: #B7FF2A;
  --orbit-bg: #111210;
}`,
  },
  {
    path: 'package.json',
    name: 'package.json',
    language: 'json',
    content: `{
  "name": "orbit-saas-platform",
  "version": "2.4.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "lucide-react": "^0.546.0"
  }
}`,
  },
  {
    path: 'README.md',
    name: 'README.md',
    language: 'markdown',
    content: `# Orbit SaaS Platform

Modern high-performance infrastructure orchestration landing page and control plane interface.

## Tech Stack
- React 19 + TypeScript
- Tailwind CSS
- Phosphor Neon Theme (#B7FF2A)
- Lucide Vector Icons (Zero Emojis)
`,
  },
];

export const INITIAL_PRESETS: ProjectPreset[] = [
  {
    id: 'orbit-saas',
    name: 'Orbit SaaS',
    tagline: 'Autonomous Cloud Orchestration Landing Page',
    category: 'SaaS Platform',
    files: ORBIT_SAAS_FILES,
  },
  {
    id: 'devfolio',
    name: 'DevFolio Matrix',
    tagline: 'Technical Developer Portfolio with Terminal Sandbox',
    category: 'Portfolio',
    files: [
      {
        path: 'src/app/page.tsx',
        name: 'page.tsx',
        language: 'tsx',
        content: `import React from 'react';

export default function DevFolio() {
  return (
    <div className="min-h-screen bg-[#111210] text-[#F2F3ED] p-8 font-mono">
      <h1 className="text-3xl font-bold text-[#B7FF2A] mb-4">DEV.ENGINEER // KERNEL</h1>
      <p className="text-sm text-[#A3A69B]">Distributed Systems, AI Agents & Compiler Architecture.</p>
    </div>
  );
}`,
      },
      {
        path: 'package.json',
        name: 'package.json',
        language: 'json',
        content: `{\n  "name": "devfolio-matrix",\n  "version": "1.0.0"\n}`,
      },
    ],
  },
];
