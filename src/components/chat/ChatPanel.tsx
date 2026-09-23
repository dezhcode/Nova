import React, { useRef, useEffect } from 'react';
import { Cpu, Terminal, Sparkles, Activity } from 'lucide-react';
import { ChatMessage, ProjectFile, CopilotMode, ActivityEntry } from '../../types/agent';
import { MessageItem } from './MessageItem';
import { Composer } from './Composer';

interface ChatPanelProps {
  messages: ChatMessage[];
  isAgentRunning: boolean;
  onSendMessage: (prompt: string, attachedFiles?: string[]) => void;
  onStopAgent?: () => void;
  copilotMode: CopilotMode;
  files: ProjectFile[];
  activities: ActivityEntry[];
  onSelectQuestionOption?: (questionId: string, option: string) => void;
  onSelectAction?: (actionText: string) => void;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({
  messages,
  isAgentRunning,
  onSendMessage,
  onStopAgent,
  copilotMode,
  files,
  activities,
  onSelectQuestionOption,
  onSelectAction,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, activities]);

  const latestActivity = activities.length > 0 ? activities[activities.length - 1] : null;

  return (
    <div className="flex flex-col h-full bg-[#111210] relative overflow-hidden">
      {/* Live Agent Activity Bar (Sticky top of chat) */}
      {isAgentRunning && latestActivity && (
        <div className="bg-[#171815] border-b border-[#2A2D27] px-4 py-2.5 flex items-center justify-between text-xs font-mono select-none animate-fadeIn">
          <div className="flex items-center gap-2 text-[#B7FF2A] truncate">
            <span className="w-2 h-2 rounded-full bg-[#B7FF2A] animate-ping shrink-0" />
            <span className="truncate">{latestActivity.message}</span>
          </div>
          {latestActivity.file && (
            <span className="text-[10px] text-[#70746A] truncate max-w-[120px] shrink-0">
              {latestActivity.file}
            </span>
          )}
        </div>
      )}

      {/* Messages Scroll Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <MessageItem
            key={msg.id}
            message={msg}
            onSelectQuestionOption={onSelectQuestionOption}
            onSelectAction={onSelectAction}
          />
        ))}

        {isAgentRunning && (
          <div className="p-3.5 rounded-xl bg-[#1D1F1B]/40 border border-[#2A2D27] w-full flex items-center gap-3 text-xs font-mono text-[#A3A69B]">
            <div className="w-4 h-4 rounded border-2 border-[#B7FF2A] border-t-transparent animate-spin" />
            <span>Copilot agent processing workspace changes...</span>
          </div>
        )}
      </div>

      {/* Composer Input */}
      <Composer
        onSendMessage={onSendMessage}
        isAgentRunning={isAgentRunning}
        onStopAgent={onStopAgent}
        copilotMode={copilotMode}
        files={files}
      />
    </div>
  );
};
