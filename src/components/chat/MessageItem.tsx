import React, { useState } from 'react';
import {
  Cpu,
  User,
  Check,
  Copy,
  Terminal,
  FileCode,
  Wrench,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { ChatMessage } from '../../types/agent';
import { QuestionCard } from './QuestionCard';

interface MessageItemProps {
  message: ChatMessage;
  onSelectQuestionOption?: (questionId: string, option: string) => void;
  onSelectAction?: (actionText: string) => void;
}

export const MessageItem: React.FC<MessageItemProps> = ({
  message,
  onSelectQuestionOption,
  onSelectAction,
}) => {
  const [copied, setCopied] = useState(false);
  const [showToolCalls, setShowToolCalls] = useState(false);

  const isUser = message.sender === 'user';
  const isAgent = message.sender === 'agent';

  const copyContent = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`p-4 rounded-xl border transition-all text-xs sm:text-sm leading-relaxed ${
        isUser
          ? 'bg-[#171815] border-[#2A2D27] ml-auto max-w-[88%] text-[#F2F3ED]'
          : 'bg-[#1D1F1B]/70 border-[#2A2D27] mr-auto w-full text-[#F2F3ED]'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-2 select-none">
        <div className="flex items-center gap-2">
          <div
            className={`w-5 h-5 rounded-md flex items-center justify-center ${
              isUser
                ? 'bg-[#2A2D27] text-[#A3A69B]'
                : 'bg-[#B7FF2A]/10 text-[#B7FF2A] border border-[#B7FF2A]/20'
            }`}
          >
            {isUser ? <User className="w-3 h-3" /> : <Cpu className="w-3 h-3" />}
          </div>
          <span className="font-mono text-xs font-semibold text-[#A3A69B]">
            {isUser ? 'You' : `Forge (${message.mode?.toUpperCase() || 'COPILOT'})`}
          </span>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-mono text-[#70746A]">
          <span>{message.timestamp}</span>
          <button
            onClick={copyContent}
            title="Copy message"
            className="p-1 rounded hover:text-[#F2F3ED] transition-colors"
          >
            {copied ? <Check className="w-3 h-3 text-[#B7FF2A]" /> : <Copy className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="whitespace-pre-wrap font-sans text-[#F2F3ED] text-xs sm:text-[13px] leading-relaxed">
        {message.content}
      </div>

      {/* Attached Files Mention */}
      {message.attachedFiles && message.attachedFiles.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {message.attachedFiles.map((file, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#111210] border border-[#2A2D27] text-[11px] font-mono text-[#A3A69B]"
            >
              <FileCode className="w-3 h-3 text-[#B7FF2A]" />
              <span>{file}</span>
            </span>
          ))}
        </div>
      )}

      {/* Question Card */}
      {message.question && onSelectQuestionOption && (
        <QuestionCard
          question={message.question}
          onSelectOption={(opt) => onSelectQuestionOption(message.question!.id, opt)}
        />
      )}

      {/* Collapsible Tool Calls */}
      {message.toolCalls && message.toolCalls.length > 0 && (
        <div className="mt-3 border-t border-[#2A2D27] pt-2">
          <button
            onClick={() => setShowToolCalls(!showToolCalls)}
            className="flex items-center gap-1.5 text-[11px] font-mono text-[#A3A69B] hover:text-[#F2F3ED] transition-colors"
          >
            <Wrench className="w-3 h-3 text-[#B7FF2A]" />
            <span>{message.toolCalls.length} Tool Executions</span>
            {showToolCalls ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          {showToolCalls && (
            <div className="mt-2 space-y-1.5 pl-2 border-l border-[#2A2D27]">
              {message.toolCalls.map((tc, idx) => (
                <div key={idx} className="p-2 rounded bg-[#111210] border border-[#2A2D27] text-[11px] font-mono">
                  <div className="text-[#B7FF2A] font-semibold">{tc.name}</div>
                  <div className="text-[#70746A] truncate">{JSON.stringify(tc.params)}</div>
                  {tc.result && <div className="text-[#A3A69B] mt-1 text-[10px]">{tc.result}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Suggested Follow-up Actions */}
      {message.suggestedActions && message.suggestedActions.length > 0 && onSelectAction && (
        <div className="flex flex-wrap gap-2 mt-3 pt-2 border-t border-[#2A2D27]">
          {message.suggestedActions.map((action, i) => (
            <button
              key={i}
              onClick={() => onSelectAction(action)}
              className="px-2.5 py-1 rounded-md bg-[#171815] border border-[#2A2D27] text-[11px] font-mono text-[#A3A69B] hover:text-[#B7FF2A] hover:border-[#B7FF2A]/40 transition-colors"
            >
              + {action}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
