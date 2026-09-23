import React from 'react';
import {
  ListTodo,
  CheckCircle2,
  Circle,
  AlertCircle,
  Clock,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { PlanTask, TaskStatus } from '../../types/agent';

interface PlanPanelProps {
  tasks: PlanTask[];
  onSelectFile?: (filePath: string) => void;
}

export const PlanPanel: React.FC<PlanPanelProps> = ({ tasks, onSelectFile }) => {
  const completedCount = tasks.filter((t) => t.status === 'completed').length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const getStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#B7FF2A]/10 text-[#B7FF2A] border border-[#B7FF2A]/30 text-[10px] font-mono uppercase font-semibold">
            <CheckCircle2 className="w-3 h-3" /> Done
          </span>
        );
      case 'running':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30 text-[10px] font-mono uppercase font-semibold animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-ping" /> Active
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#FF4A4A]/10 text-[#FF4A4A] border border-[#FF4A4A]/30 text-[10px] font-mono uppercase font-semibold">
            <AlertCircle className="w-3 h-3" /> Failed
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#1D1F1B] text-[#70746A] border border-[#2A2D27] text-[10px] font-mono uppercase font-semibold">
            <Circle className="w-3 h-3" /> Queued
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#111210] overflow-hidden">
      {/* Top Header with Progress Bar */}
      <div className="p-4 bg-[#171815] border-b border-[#2A2D27] shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <ListTodo className="w-4 h-4 text-[#B7FF2A]" />
            <span className="font-mono text-xs font-semibold text-[#F2F3ED] uppercase tracking-wider">
              Project Execution Plan
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#A3A69B]">
            <span>{completedCount}/{tasks.length} Completed</span>
            <span className="text-[#B7FF2A] font-bold">({progressPercent}%)</span>
          </div>
        </div>

        {/* Linear Progress Bar */}
        <div className="w-full h-1.5 bg-[#111210] rounded-full overflow-hidden border border-[#2A2D27]">
          <div
            className="h-full bg-[#B7FF2A] transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Task List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {tasks.map((task, idx) => (
          <div
            key={task.id}
            className={`p-4 rounded-xl border transition-all ${
              task.status === 'running'
                ? 'bg-[#1D1F1B] border-[#B7FF2A] shadow-[0_0_15px_rgba(183,255,42,0.08)]'
                : 'bg-[#171815] border-[#2A2D27]'
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#70746A]">0{idx + 1}</span>
                <h4 className="text-xs sm:text-sm font-semibold text-[#F2F3ED]">{task.title}</h4>
              </div>
              {getStatusBadge(task.status)}
            </div>

            <p className="text-xs text-[#A3A69B] mb-3 leading-relaxed">{task.description}</p>

            {/* Checklist items */}
            {task.steps && task.steps.length > 0 && (
              <div className="space-y-1.5 pt-2 border-t border-[#2A2D27] font-mono text-[11px]">
                {task.steps.map((step) => (
                  <div key={step.id} className="flex items-center gap-2 text-[#A3A69B]">
                    {step.completed ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#B7FF2A] shrink-0" />
                    ) : (
                      <Circle className="w-3.5 h-3.5 text-[#70746A] shrink-0" />
                    )}
                    <span className={step.completed ? 'text-[#F2F3ED] line-through decoration-[#70746A]' : ''}>
                      {step.title}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
