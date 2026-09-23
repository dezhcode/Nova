import React from 'react';
import { HelpCircle, Check } from 'lucide-react';
import { AgentQuestion } from '../../types/agent';

interface QuestionCardProps {
  question: AgentQuestion;
  onSelectOption: (option: string) => void;
  disabled?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onSelectOption,
  disabled,
}) => {
  return (
    <div className="my-3 p-3.5 rounded-xl bg-[#1D1F1B] border border-[#2A2D27] text-xs">
      <div className="flex items-center gap-2 text-[#B7FF2A] font-medium mb-1.5">
        <HelpCircle className="w-3.5 h-3.5" />
        <span className="font-mono text-[11px] uppercase tracking-wider">Clarification Needed</span>
      </div>
      <p className="text-[#F2F3ED] font-medium mb-3">{question.question}</p>

      <div className="flex flex-wrap gap-2">
        {question.options.map((opt, i) => {
          const isSelected = question.selectedOption === opt;
          return (
            <button
              key={i}
              disabled={disabled || !!question.selectedOption}
              onClick={() => onSelectOption(opt)}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-[#B7FF2A] text-[#111210] font-semibold shadow-[0_0_10px_rgba(183,255,42,0.2)]'
                  : 'bg-[#171815] border border-[#2A2D27] text-[#A3A69B] hover:text-[#F2F3ED] hover:border-[#70746A]'
              } ${disabled || question.selectedOption ? 'cursor-default' : 'cursor-pointer'}`}
            >
              {isSelected && <Check className="w-3 h-3" />}
              <span>{opt}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
