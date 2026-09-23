import React from 'react';
import {
  Layers,
  GitBranch,
  Play,
  RotateCcw,
  CheckCircle2,
  Terminal,
  Code2,
  GitCompare,
  Eye,
  ListTodo,
  Cpu,
  Download,
  Share2,
} from 'lucide-react';
import { ViewTab, CopilotMode } from '../../types/agent';

interface TopBarProps {
  projectName: string;
  activeTab: ViewTab;
  setActiveTab: (tab: ViewTab) => void;
  copilotMode: CopilotMode;
  setCopilotMode: (mode: CopilotMode) => void;
  isAgentRunning: boolean;
  changeCount: number;
  onUndoLastChange: () => void;
  onOpenVersions: () => void;
  onExport: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  projectName,
  activeTab,
  setActiveTab,
  copilotMode,
  setCopilotMode,
  isAgentRunning,
  changeCount,
  onUndoLastChange,
  onOpenVersions,
  onExport,
}) => {
  const modes: { id: CopilotMode; label: string }[] = [
    { id: 'smart', label: 'Smart' },
    { id: 'reasoning', label: 'Reasoning' },
    { id: 'search', label: 'Search' },
    { id: 'chat', label: 'Fast' },
  ];

  return (
    <header className="h-14 border-b border-[#2A2D27] bg-[#171815] px-3 sm:px-4 flex items-center justify-between select-none z-30 shrink-0">
      {/* Left: Brand & Project */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#1D1F1B] border border-[#2A2D27] flex items-center justify-center shadow-[0_0_10px_rgba(183,255,42,0.15)]">
            <svg className="w-4 h-4 text-[#B7FF2A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>
          <span className="font-bold text-sm tracking-wider text-[#F2F3ED] uppercase font-mono">FORGE</span>
        </div>

        <div className="h-4 w-[1px] bg-[#2A2D27] hidden sm:block" />

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-[#F2F3ED] truncate max-w-[120px] sm:max-w-[180px]">{projectName}</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#1D1F1B] text-[#A3A69B] border border-[#2A2D27] hidden md:inline-flex">
            React 19
          </span>
        </div>
      </div>

      {/* Center: Desktop Navigation Tabs */}
      <nav className="hidden lg:flex items-center p-1 bg-[#111210] rounded-lg border border-[#2A2D27] gap-1">
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-all ${
            activeTab === 'chat'
              ? 'bg-[#1D1F1B] text-[#B7FF2A] border border-[#2A2D27] shadow-sm'
              : 'text-[#A3A69B] hover:text-[#F2F3ED]'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>Agent</span>
        </button>

        <button
          onClick={() => setActiveTab('plan')}
          className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-all ${
            activeTab === 'plan'
              ? 'bg-[#1D1F1B] text-[#B7FF2A] border border-[#2A2D27] shadow-sm'
              : 'text-[#A3A69B] hover:text-[#F2F3ED]'
          }`}
        >
          <ListTodo className="w-3.5 h-3.5" />
          <span>Plan</span>
        </button>

        <button
          onClick={() => setActiveTab('tree')}
          className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-all ${
            activeTab === 'tree'
              ? 'bg-[#1D1F1B] text-[#B7FF2A] border border-[#2A2D27] shadow-sm'
              : 'text-[#A3A69B] hover:text-[#F2F3ED]'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Workflow Tree</span>
        </button>

        <button
          onClick={() => setActiveTab('files')}
          className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-all ${
            activeTab === 'files'
              ? 'bg-[#1D1F1B] text-[#B7FF2A] border border-[#2A2D27] shadow-sm'
              : 'text-[#A3A69B] hover:text-[#F2F3ED]'
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>Files</span>
        </button>

        <button
          onClick={() => setActiveTab('diff')}
          className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-all relative ${
            activeTab === 'diff'
              ? 'bg-[#1D1F1B] text-[#B7FF2A] border border-[#2A2D27] shadow-sm'
              : 'text-[#A3A69B] hover:text-[#F2F3ED]'
          }`}
        >
          <GitCompare className="w-3.5 h-3.5" />
          <span>Diff</span>
          {changeCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-[#B7FF2A] text-[#111210] font-mono text-[9px] font-bold flex items-center justify-center">
              {changeCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('preview')}
          className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-all ${
            activeTab === 'preview'
              ? 'bg-[#1D1F1B] text-[#B7FF2A] border border-[#2A2D27] shadow-sm'
              : 'text-[#A3A69B] hover:text-[#F2F3ED]'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Preview</span>
        </button>

        <button
          onClick={() => setActiveTab('terminal')}
          className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-all ${
            activeTab === 'terminal'
              ? 'bg-[#1D1F1B] text-[#B7FF2A] border border-[#2A2D27] shadow-sm'
              : 'text-[#A3A69B] hover:text-[#F2F3ED]'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>Terminal</span>
        </button>
      </nav>

      {/* Right: Copilot Engine Selector & Actions */}
      <div className="flex items-center gap-2">
        {/* Copilot Mode dropdown */}
        <div className="flex items-center gap-1 bg-[#111210] p-0.5 rounded-lg border border-[#2A2D27]">
          <div className="px-2 py-1 flex items-center gap-1.5 text-[11px] font-mono text-[#A3A69B] border-r border-[#2A2D27]">
            <span className={`w-2 h-2 rounded-full ${isAgentRunning ? 'bg-[#B7FF2A] animate-ping' : 'bg-[#70746A]'}`} />
            <span className="hidden sm:inline">Copilot:</span>
          </div>
          <select
            value={copilotMode}
            onChange={(e) => setCopilotMode(e.target.value as CopilotMode)}
            className="bg-transparent text-[11px] font-mono text-[#B7FF2A] px-2 py-1 outline-none cursor-pointer"
          >
            {modes.map((m) => (
              <option key={m.id} value={m.id} className="bg-[#171815] text-[#F2F3ED]">
                {m.label}
              </option>
            ))}
          </select>
        </div>

        {/* Undo button */}
        <button
          onClick={onUndoLastChange}
          disabled={changeCount === 0 || isAgentRunning}
          title="Revert last modification"
          className="p-1.5 rounded-lg bg-[#171815] border border-[#2A2D27] text-[#A3A69B] hover:text-[#F2F3ED] hover:border-[#70746A] disabled:opacity-40 disabled:pointer-events-none transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Version History */}
        <button
          onClick={onOpenVersions}
          title="Version Snapshots"
          className="p-1.5 rounded-lg bg-[#171815] border border-[#2A2D27] text-[#A3A69B] hover:text-[#F2F3ED] hover:border-[#70746A] transition-colors"
        >
          <GitBranch className="w-4 h-4" />
        </button>

        {/* Export / Download Project */}
        <button
          onClick={onExport}
          title="Export Project Files"
          className="p-1.5 rounded-lg bg-[#171815] border border-[#2A2D27] text-[#A3A69B] hover:text-[#F2F3ED] hover:border-[#70746A] transition-colors hidden sm:inline-flex"
        >
          <Download className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
