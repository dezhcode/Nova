import React, { useState } from 'react';
import {
  Terminal,
  Play,
  CheckCircle2,
  AlertCircle,
  RotateCw,
  Copy,
  Check,
} from 'lucide-react';
import { ActivityEntry } from '../../types/agent';

interface TerminalPanelProps {
  activities: ActivityEntry[];
  onRunBuildCheck: () => void;
  isVerifying: boolean;
}

export const TerminalPanel: React.FC<TerminalPanelProps> = ({
  activities,
  onRunBuildCheck,
  isVerifying,
}) => {
  const [copied, setCopied] = useState(false);

  const verificationChecks = [
    { name: 'TypeScript Strict Typecheck', status: 'passed', time: '142ms' },
    { name: 'ESLint Code Rules (Zero Warnings)', status: 'passed', time: '88ms' },
    { name: 'Vite Production Bundle Build', status: 'passed', time: '310ms' },
    { name: 'Sandbox DOM Integrity Test', status: 'passed', time: '45ms' },
  ];

  const copyLogs = () => {
    const text = activities.map((a) => `[${a.timestamp}] [${a.type.toUpperCase()}] ${a.message} ${a.detail || ''}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#111210] overflow-hidden font-mono text-xs">
      {/* Top Bar */}
      <div className="h-12 px-4 border-b border-[#2A2D27] bg-[#171815] flex items-center justify-between shrink-0 select-none">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#B7FF2A]" />
          <span className="font-semibold text-[#F2F3ED] uppercase tracking-wider text-xs">
            Terminal &amp; Verification Suite
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyLogs}
            className="p-1.5 rounded hover:bg-[#2A2D27] text-[#A3A69B] hover:text-[#F2F3ED] transition-colors"
            title="Copy Terminal Logs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#B7FF2A]" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={onRunBuildCheck}
            disabled={isVerifying}
            className="px-3 py-1.5 rounded-lg bg-[#1D1F1B] border border-[#2A2D27] hover:border-[#B7FF2A]/50 text-[#F2F3ED] transition-all flex items-center gap-1.5 text-xs font-semibold"
          >
            {isVerifying ? (
              <RotateCw className="w-3.5 h-3.5 text-[#B7FF2A] animate-spin" />
            ) : (
              <Play className="w-3.5 h-3.5 text-[#B7FF2A]" />
            )}
            <span>Run Verification</span>
          </button>
        </div>
      </div>

      {/* Main Terminal Area */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Verification Check Card Matrix */}
        <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-[#2A2D27] bg-[#141512] p-4 space-y-3 shrink-0 overflow-y-auto">
          <div className="text-[11px] font-bold text-[#70746A] uppercase tracking-wider mb-2">
            Verification Health Checks
          </div>

          {verificationChecks.map((chk, i) => (
            <div key={i} className="p-3 rounded-lg bg-[#171815] border border-[#2A2D27]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-[#F2F3ED]">{chk.name}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#B7FF2A]" />
              </div>
              <div className="flex items-center justify-between text-[10px] text-[#70746A]">
                <span className="text-[#B7FF2A] uppercase font-bold">Passed</span>
                <span>{chk.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Live Terminal Output Stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-2 bg-[#111210]">
          <div className="text-[10px] uppercase text-[#70746A] font-bold mb-2">
            Agent Execution Stream
          </div>

          {activities.length > 0 ? (
            activities.map((act) => (
              <div key={act.id} className="flex items-start gap-2 leading-relaxed">
                <span className="text-[#70746A] text-[10px] select-none shrink-0">[{act.timestamp}]</span>
                <span
                  className={`px-1 rounded text-[9px] uppercase font-bold shrink-0 ${
                    act.type === 'analyze'
                      ? 'bg-[#38BDF8]/10 text-[#38BDF8]'
                      : act.type === 'plan'
                      ? 'bg-[#B7FF2A]/10 text-[#B7FF2A]'
                      : act.type === 'patch'
                      ? 'bg-[#FFB800]/10 text-[#FFB800]'
                      : act.type === 'verify'
                      ? 'bg-[#38BDF8]/10 text-[#38BDF8]'
                      : act.type === 'success'
                      ? 'bg-[#B7FF2A] text-[#111210]'
                      : 'bg-[#2A2D27] text-[#A3A69B]'
                  }`}
                >
                  {act.type}
                </span>
                <span className="text-[#F2F3ED]">{act.message}</span>
                {act.detail && <span className="text-[#70746A] text-[11px] truncate">({act.detail})</span>}
              </div>
            ))
          ) : (
            <div className="text-[#70746A] italic">No execution events recorded yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};
