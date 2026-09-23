import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowUp,
  Paperclip,
  AtSign,
  Square,
  Sparkles,
  Command,
} from 'lucide-react';
import { CopilotMode, ProjectFile } from '../../types/agent';

interface ComposerProps {
  onSendMessage: (prompt: string, attachedFiles?: string[]) => void;
  isAgentRunning: boolean;
  onStopAgent?: () => void;
  copilotMode: CopilotMode;
  files: ProjectFile[];
}

export const Composer: React.FC<ComposerProps> = ({
  onSendMessage,
  isAgentRunning,
  onStopAgent,
  copilotMode,
  files,
}) => {
  const [prompt, setPrompt] = useState('');
  const [showFileMenu, setShowFileMenu] = useState(false);
  const [selectedFileMentions, setSelectedFileMentions] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const quickPrompts = [
    'Refine header & add phosphor glowing CTA',
    'Add interactive pricing calculator',
    'Optimize mobile layout for 375px viewport',
    'Run build diagnostic & verify types',
  ];

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim() || isAgentRunning) return;
    onSendMessage(prompt.trim(), selectedFileMentions);
    setPrompt('');
    setSelectedFileMentions([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const addFileMention = (fileName: string) => {
    if (!selectedFileMentions.includes(fileName)) {
      setSelectedFileMentions([...selectedFileMentions, fileName]);
    }
    setShowFileMenu(false);
    textareaRef.current?.focus();
  };

  return (
    <div className="p-3 sm:p-4 bg-[#171815] border-t border-[#2A2D27] shrink-0">
      {/* Quick Prompts Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-[11px] font-mono select-none">
        <span className="text-[#70746A] shrink-0 flex items-center gap-1 text-[10px] uppercase">
          <Command className="w-3 h-3 text-[#B7FF2A]" /> Quick:
        </span>
        {quickPrompts.map((qp, i) => (
          <button
            key={i}
            type="button"
            disabled={isAgentRunning}
            onClick={() => {
              setPrompt(qp);
              textareaRef.current?.focus();
            }}
            className="shrink-0 px-2.5 py-1 rounded-md bg-[#1D1F1B] border border-[#2A2D27] text-[#A3A69B] hover:text-[#F2F3ED] hover:border-[#70746A] transition-colors"
          >
            {qp}
          </button>
        ))}
      </div>

      {/* Selected File Badges */}
      {selectedFileMentions.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-2">
          {selectedFileMentions.map((f, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#1D1F1B] border border-[#B7FF2A]/30 text-[11px] font-mono text-[#B7FF2A]"
            >
              <AtSign className="w-3 h-3" />
              <span>{f}</span>
              <button
                type="button"
                onClick={() => setSelectedFileMentions(selectedFileMentions.filter((x) => x !== f))}
                className="text-[#70746A] hover:text-[#F2F3ED] ml-1"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Main Composer Box */}
      <div className="relative rounded-xl bg-[#111210] border border-[#2A2D27] focus-within:border-[#B7FF2A]/50 focus-within:ring-1 focus-within:ring-[#B7FF2A]/30 transition-all p-2.5">
        <textarea
          ref={textareaRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Forge to build, change components, or fix bugs..."
          disabled={isAgentRunning}
          rows={2}
          className="w-full bg-transparent text-xs sm:text-sm text-[#F2F3ED] placeholder-[#70746A] resize-none outline-none font-sans leading-relaxed"
        />

        {/* Bottom Bar inside Composer */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#2A2D27]">
          <div className="flex items-center gap-1">
            {/* Attach / Mention @ File */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowFileMenu(!showFileMenu)}
                disabled={isAgentRunning}
                className="p-1.5 rounded-md text-[#A3A69B] hover:text-[#F2F3ED] hover:bg-[#1D1F1B] transition-colors flex items-center gap-1 text-xs font-mono"
                title="Mention File"
              >
                <AtSign className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px]">Files</span>
              </button>

              {showFileMenu && (
                <div className="absolute bottom-full left-0 mb-2 w-56 bg-[#1D1F1B] border border-[#2A2D27] rounded-xl shadow-xl p-1 z-50 text-xs font-mono">
                  <div className="px-2 py-1 text-[10px] text-[#70746A] uppercase font-bold">Select File Target</div>
                  <div className="max-h-40 overflow-y-auto">
                    {files.map((file) => (
                      <button
                        key={file.path}
                        type="button"
                        onClick={() => addFileMention(file.path)}
                        className="w-full text-left px-2 py-1.5 rounded hover:bg-[#2A2D27] text-[#F2F3ED] truncate flex items-center justify-between"
                      >
                        <span className="truncate">{file.path}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1D1F1B] text-[#70746A] border border-[#2A2D27] hidden sm:inline-block">
              {copilotMode.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isAgentRunning ? (
              <button
                type="button"
                onClick={onStopAgent}
                className="px-3 py-1.5 rounded-lg bg-[#FF4A4A]/20 border border-[#FF4A4A]/50 text-[#FF4A4A] text-xs font-mono font-medium flex items-center gap-1.5 hover:bg-[#FF4A4A]/30 transition-colors"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>Stop</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleSubmit()}
                disabled={!prompt.trim()}
                className="p-2 rounded-lg bg-[#B7FF2A] text-[#111210] hover:bg-[#89C900] disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center justify-center shadow-[0_0_12px_rgba(183,255,42,0.2)]"
              >
                <ArrowUp className="w-4 h-4 stroke-[2.5]" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
