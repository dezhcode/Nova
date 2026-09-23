import React, { useState } from 'react';
import {
  Copy,
  Check,
  Search,
  Save,
  FileCode,
  Sparkles,
  Undo,
} from 'lucide-react';
import { ProjectFile } from '../../types/agent';

interface CodeViewerProps {
  file: ProjectFile | null;
  onUpdateContent: (filePath: string, content: string) => void;
  onRevertFile?: (filePath: string) => void;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({
  file,
  onUpdateContent,
  onRevertFile,
}) => {
  const [copied, setCopied] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  if (!file) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[#111210] text-[#70746A] font-mono text-xs p-6">
        <FileCode className="w-8 h-8 text-[#2A2D27] mb-2" />
        <span>Select a file from the workspace to inspect code.</span>
      </div>
    );
  }

  const lines = file.content.split('\n');

  const copyCode = () => {
    navigator.clipboard.writeText(file.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#111210] overflow-hidden font-mono text-xs">
      {/* Editor Top Bar */}
      <div className="h-10 px-4 border-b border-[#2A2D27] bg-[#171815] flex items-center justify-between shrink-0 select-none">
        <div className="flex items-center gap-2 truncate">
          <FileCode className="w-4 h-4 text-[#B7FF2A]" />
          <span className="font-semibold text-[#F2F3ED] truncate">{file.path}</span>
          {file.isModified && (
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-[#B7FF2A]/10 text-[#B7FF2A] border border-[#B7FF2A]/30">
              Modified
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {file.isModified && onRevertFile && (
            <button
              onClick={() => onRevertFile(file.path)}
              title="Revert changes in this file"
              className="px-2 py-1 rounded bg-[#1D1F1B] border border-[#2A2D27] text-[#A3A69B] hover:text-[#F2F3ED] transition-colors flex items-center gap-1 text-[11px]"
            >
              <Undo className="w-3 h-3" />
              <span>Revert</span>
            </button>
          )}

          <button
            onClick={() => setShowSearch(!showSearch)}
            title="Search inside file"
            className="p-1.5 rounded hover:bg-[#2A2D27] text-[#A3A69B] hover:text-[#F2F3ED] transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={copyCode}
            title="Copy file contents"
            className="p-1.5 rounded hover:bg-[#2A2D27] text-[#A3A69B] hover:text-[#F2F3ED] transition-colors flex items-center gap-1"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#B7FF2A]" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Search Input */}
      {showSearch && (
        <div className="px-4 py-2 border-b border-[#2A2D27] bg-[#141512] flex items-center gap-2">
          <Search className="w-3.5 h-3.5 text-[#70746A]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search code..."
            className="w-full bg-transparent text-xs text-[#F2F3ED] outline-none font-mono"
            autoFocus
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-[#70746A] hover:text-[#F2F3ED] text-[10px]"
            >
              Clear
            </button>
          )}
        </div>
      )}

      {/* Code Area with Line Numbers & Editable Textarea */}
      <div className="flex-1 overflow-auto flex text-xs leading-relaxed bg-[#111210]">
        {/* Line Numbers */}
        <div className="w-12 py-3 bg-[#141512] border-r border-[#2A2D27] select-none text-right pr-3 text-[#70746A] shrink-0 font-mono">
          {lines.map((_, i) => (
            <div key={i} className="leading-6">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Editable Source Code */}
        <div className="flex-1 relative">
          <textarea
            value={file.content}
            onChange={(e) => onUpdateContent(file.path, e.target.value)}
            spellCheck={false}
            className="w-full h-full p-3 bg-transparent text-[#F2F3ED] outline-none resize-none font-mono leading-6 whitespace-pre tab-4 selection:bg-[#B7FF2A]/20 selection:text-[#B7FF2A]"
          />
        </div>
      </div>

      {/* Bottom Status Info */}
      <div className="h-6 px-4 border-t border-[#2A2D27] bg-[#171815] flex items-center justify-between text-[10px] text-[#70746A] select-none">
        <div className="flex items-center gap-3">
          <span>{lines.length} lines</span>
          <span>{file.language.toUpperCase()}</span>
          <span>UTF-8</span>
        </div>
        <div>
          <span>Workspace Synced</span>
        </div>
      </div>
    </div>
  );
};
