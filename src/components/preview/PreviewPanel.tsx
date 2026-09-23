import React, { useState } from 'react';
import {
  Monitor,
  Tablet,
  Smartphone,
  RotateCw,
  ExternalLink,
  ShieldCheck,
  Terminal,
  Layers,
  Sparkles,
} from 'lucide-react';
import { ProjectFile, DeviceViewport } from '../../types/agent';

interface PreviewPanelProps {
  files: ProjectFile[];
  projectName: string;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({ files, projectName }) => {
  const [viewport, setViewport] = useState<DeviceViewport>('desktop');
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeTab, setActiveTab] = useState<'preview' | 'console'>('preview');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  // Extract dynamic values from code files for live hot updates
  const heroFile = files.find((f) => f.path.includes('Hero.tsx'))?.content || '';
  const navbarFile = files.find((f) => f.path.includes('Navbar.tsx'))?.content || '';

  // Extract hero headline or fallback
  const headlineMatch = heroFile.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  const headlineText = headlineMatch ? headlineMatch[1].replace(/<[^>]+>/g, '').trim() : 'Ship infrastructure at the speed of thought.';

  // Extract badge text or fallback
  const badgeMatch = heroFile.match(/animate-ping[^>]*>[\s\S]*?<\/span>([\s\S]*?)<\/div>/);
  const badgeText = badgeMatch ? badgeMatch[1].replace(/<[^>]+>/g, '').trim() : 'Autonomous Cloud Orchestration Engine';

  // Extract nav version or fallback
  const navVersionMatch = navbarFile.match(/<span className="[^"]*font-mono[^"]*">([^<]+)<\/span>/);
  const navVersionText = navVersionMatch ? navVersionMatch[1] : 'v2.4';

  const getViewportWidth = () => {
    switch (viewport) {
      case 'mobile':
        return 'max-w-[375px]';
      case 'tablet':
        return 'max-w-[768px]';
      case 'desktop':
      default:
        return 'w-full';
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#111210] overflow-hidden select-none">
      {/* Top Preview Controls Bar */}
      <div className="h-12 px-4 border-b border-[#2A2D27] bg-[#171815] flex items-center justify-between shrink-0">
        {/* Device Mode Switcher */}
        <div className="flex items-center gap-1 bg-[#111210] p-1 rounded-lg border border-[#2A2D27]">
          <button
            onClick={() => setViewport('desktop')}
            title="Desktop (100%)"
            className={`p-1.5 rounded-md transition-colors ${
              viewport === 'desktop' ? 'bg-[#1D1F1B] text-[#B7FF2A]' : 'text-[#70746A] hover:text-[#A3A69B]'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setViewport('tablet')}
            title="Tablet (768px)"
            className={`p-1.5 rounded-md transition-colors ${
              viewport === 'tablet' ? 'bg-[#1D1F1B] text-[#B7FF2A]' : 'text-[#70746A] hover:text-[#A3A69B]'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setViewport('mobile')}
            title="Mobile (375px)"
            className={`p-1.5 rounded-md transition-colors ${
              viewport === 'mobile' ? 'bg-[#1D1F1B] text-[#B7FF2A]' : 'text-[#70746A] hover:text-[#A3A69B]'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Address URL Simulation */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg bg-[#111210] border border-[#2A2D27] text-xs font-mono text-[#A3A69B] max-w-sm w-full mx-4">
          <ShieldCheck className="w-3.5 h-3.5 text-[#B7FF2A] shrink-0" />
          <span className="truncate">https://{projectName.toLowerCase().replace(/\s+/g, '-')}.forge.app</span>
        </div>

        {/* Actions & Console Tabs */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab(activeTab === 'preview' ? 'console' : 'preview')}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono border transition-colors flex items-center gap-1.5 ${
              activeTab === 'console'
                ? 'bg-[#1D1F1B] text-[#B7FF2A] border-[#B7FF2A]/40'
                : 'bg-[#171815] text-[#A3A69B] border-[#2A2D27]'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Console</span>
          </button>

          <button
            onClick={() => setRefreshKey((k) => k + 1)}
            title="Reload Sandbox"
            className="p-1.5 rounded-lg bg-[#171815] border border-[#2A2D27] text-[#A3A69B] hover:text-[#F2F3ED] transition-colors"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Preview Container */}
      <div className="flex-1 bg-[#0D0E0C] overflow-auto flex items-start justify-center p-2 sm:p-4">
        {activeTab === 'preview' ? (
          <div
            key={refreshKey}
            className={`transition-all duration-300 bg-[#111210] border border-[#2A2D27] shadow-2xl rounded-xl overflow-hidden flex flex-col min-h-[600px] ${getViewportWidth()}`}
          >
            {/* Embedded Live Web App View (Orbit SaaS) */}
            <div className="w-full text-[#F2F3ED] font-sans antialiased selection:bg-[#B7FF2A]/20 selection:text-[#B7FF2A]">
              {/* Navbar Component */}
              <header className="sticky top-0 z-30 w-full border-b border-[#2A2D27] bg-[#111210]/95 backdrop-blur-md px-4 sm:px-6 h-14 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded bg-[#1D1F1B] border border-[#2A2D27] flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-[#B7FF2A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M3.6 9h16.8M3.6 15h16.8" />
                    </svg>
                  </div>
                  <span className="font-bold text-sm tracking-tight text-[#F2F3ED] font-mono">ORBIT</span>
                  <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded bg-[#1D1F1B] text-[#B7FF2A] border border-[#2A2D27]">
                    {navVersionText}
                  </span>
                </div>

                <div className="hidden sm:flex items-center gap-5 text-xs text-[#A3A69B]">
                  <span className="hover:text-[#F2F3ED] cursor-pointer">Features</span>
                  <span className="hover:text-[#F2F3ED] cursor-pointer">Architecture</span>
                  <span className="hover:text-[#F2F3ED] cursor-pointer">Pricing</span>
                </div>

                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 rounded bg-[#B7FF2A] text-[#111210] font-semibold text-xs hover:bg-[#89C900] transition-colors">
                    Deploy
                  </button>
                </div>
              </header>

              {/* Hero Component */}
              <section className="relative pt-12 pb-10 px-4 sm:px-6 text-center border-b border-[#2A2D27]">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171815] border border-[#2A2D27] text-[11px] font-mono text-[#A3A69B] mb-5">
                  <span className="w-2 h-2 rounded-full bg-[#B7FF2A] animate-ping" />
                  <span>{badgeText}</span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#F2F3ED] mb-4 max-w-2xl mx-auto leading-tight">
                  {headlineText}
                </h1>

                <p className="text-xs sm:text-sm text-[#A3A69B] max-w-xl mx-auto mb-6">
                  Continuously verifies, tests, and deploys full-stack microservices without manual pipeline friction.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button className="px-5 py-2 rounded-lg bg-[#B7FF2A] text-[#111210] font-bold text-xs hover:bg-[#89C900] transition-all shadow-[0_0_15px_rgba(183,255,42,0.2)]">
                    Deploy Cluster
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-[#171815] border border-[#2A2D27] text-xs font-medium text-[#F2F3ED] hover:border-[#70746A]">
                    View Architecture
                  </button>
                </div>
              </section>

              {/* Metrics Grid */}
              <section className="p-4 sm:p-6 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#171815]/40 border-b border-[#2A2D27]">
                <div className="p-3 rounded-lg bg-[#1D1F1B] border border-[#2A2D27]">
                  <div className="text-[10px] font-mono text-[#70746A] uppercase">Latency</div>
                  <div className="text-lg font-bold font-mono text-[#F2F3ED]">&lt; 8ms</div>
                  <div className="text-[10px] text-[#B7FF2A] font-mono">-42% vs base</div>
                </div>
                <div className="p-3 rounded-lg bg-[#1D1F1B] border border-[#2A2D27]">
                  <div className="text-[10px] font-mono text-[#70746A] uppercase">Throughput</div>
                  <div className="text-lg font-bold font-mono text-[#F2F3ED]">45k req/s</div>
                  <div className="text-[10px] text-[#B7FF2A] font-mono">0 drop rate</div>
                </div>
                <div className="p-3 rounded-lg bg-[#1D1F1B] border border-[#2A2D27]">
                  <div className="text-[10px] font-mono text-[#70746A] uppercase">Recovery</div>
                  <div className="text-lg font-bold font-mono text-[#F2F3ED]">99.99%</div>
                  <div className="text-[10px] text-[#B7FF2A] font-mono">Self-healing</div>
                </div>
                <div className="p-3 rounded-lg bg-[#1D1F1B] border border-[#2A2D27]">
                  <div className="text-[10px] font-mono text-[#70746A] uppercase">Cold Start</div>
                  <div className="text-lg font-bold font-mono text-[#F2F3ED]">14ms</div>
                  <div className="text-[10px] text-[#B7FF2A] font-mono">Instant boot</div>
                </div>
              </section>

              {/* Interactive Pricing Component */}
              <section className="p-6 text-center">
                <h3 className="text-base font-bold text-[#F2F3ED] mb-1">Interactive Compute Plans</h3>
                <div className="inline-flex items-center my-3 p-0.5 rounded-lg bg-[#171815] border border-[#2A2D27]">
                  <button
                    onClick={() => setBillingCycle('monthly')}
                    className={`px-3 py-1 text-xs font-mono rounded-md transition-colors ${
                      billingCycle === 'monthly' ? 'bg-[#1D1F1B] text-[#B7FF2A]' : 'text-[#70746A]'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingCycle('yearly')}
                    className={`px-3 py-1 text-xs font-mono rounded-md transition-colors ${
                      billingCycle === 'yearly' ? 'bg-[#1D1F1B] text-[#B7FF2A]' : 'text-[#70746A]'
                    }`}
                  >
                    Yearly (-20%)
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 text-left mt-2">
                  <div className="p-4 rounded-xl bg-[#171815] border border-[#2A2D27]">
                    <div className="text-xs font-semibold text-[#F2F3ED]">Developer</div>
                    <div className="text-2xl font-bold font-mono text-[#F2F3ED] my-1">
                      {billingCycle === 'monthly' ? '$29' : '$24'}
                      <span className="text-xs text-[#70746A] font-normal"> / mo</span>
                    </div>
                    <div className="text-[11px] text-[#A3A69B]">For solo devs and quick prototypes.</div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#1D1F1B] border border-[#B7FF2A] ring-1 ring-[#B7FF2A]/40">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#F2F3ED]">Team Pro</span>
                      <span className="text-[9px] font-mono px-1.5 rounded bg-[#B7FF2A] text-[#111210] font-bold">
                        POPULAR
                      </span>
                    </div>
                    <div className="text-2xl font-bold font-mono text-[#F2F3ED] my-1">
                      {billingCycle === 'monthly' ? '$89' : '$72'}
                      <span className="text-xs text-[#70746A] font-normal"> / mo</span>
                    </div>
                    <div className="text-[11px] text-[#A3A69B]">Unlimited sandboxes &amp; agent runs.</div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        ) : (
          <div className="w-full h-full p-4 bg-[#141512] rounded-xl border border-[#2A2D27] font-mono text-xs overflow-y-auto space-y-2">
            <div className="text-[10px] uppercase text-[#70746A] font-bold">Sandbox Console Output</div>
            <div className="text-[#38BDF8]">[vite] hot update /src/components/Hero.tsx</div>
            <div className="text-[#B7FF2A]">[vite] page reloaded in 42ms</div>
            <div className="text-[#A3A69B]">[react-dom] mounted root component tree successfully</div>
            <div className="text-[#B7FF2A]">[forge-verify] 0 errors, 0 runtime warnings</div>
          </div>
        )}
      </div>
    </div>
  );
};
