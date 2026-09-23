import React, { useState } from 'react';
import {
  GitCompare,
  Check,
  X,
  RotateCcw,
  FileCode,
  CheckCheck,
  Eye,
} from 'lucide-react';
import { FileDiff } from '../../types/agent';

interface DiffViewerProps {
  diffs: FileDiff[];
  onAcceptDiff: (filePath: string) => void;
  onRejectDiff: (filePath: string) => void;
  onAcceptAll: () => void;
  onViewFile: (filePath: string) => void;
}

export const DiffViewer: React.FC<DiffViewerProps> = ({
  diffs,
  onAcceptDiff,
  onRejectDiff,
  onAcceptAll,
  onViewFile,
}) => {
  const [selectedFilePath, setSelectedFilePath] = useState<string>(diffs[0]?.filePath || '');

  const activeDiff = diffs.find((d) => d.filePath === selectedFilePath) || diffs[0];

  const totalAdded = diffs.reduce((sum, d) => sum + d.linesAdded, 0);
  const totalRemoved = diffs.reduce((sum, d) => sum + d.linesRemoved, 0);

  if (diffs.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[#111210] text-[#70746A] font-mono text-xs p-6 h-full">
        <GitCompare className="w-8 h-8 text-[#2A2D27] mb-2" />
        <span>No pending code diffs in workspace.</span>
        <span className="text-[11px] text-[#A3A69B] mt-1">Prompt Forge to modify files or components.</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#111210] overflow-hidden font-mono text-xs">
      {/* Top Header */}
      <div className="h-12 px-4 border-b border-[#2A2D27] bg-[#171815] flex items-center justify-between shrink-0 select-none">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <GitCompare className="w-4 h-4 text-[#B7FF2A]" />
            <span className="font-semibold text-[#F2F3ED] uppercase tracking-wider text-xs">
              Changes &amp; Patches
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px]">
            <span className="text-[#A3A69B]">{diffs.length} files modified</span>
            <span className="text-[#B7FF2A]">+{totalAdded}</span>
            <span className="text-[#FF4A4A]">-{totalRemoved}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onAcceptAll}
            className="px-3 py-1.5 rounded-lg bg-[#B7FF2A] text-[#111210] font-bold text-xs hover:bg-[#89C900] transition-colors flex items-center gap-1.5 shadow-[0_0_10px_rgba(183,255,42,0.15)]"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Accept All Changes</span>
          </button>
        </div>
      </div>

      {/* Main Diff Area */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left: Files with pending patches */}
        <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-[#2A2D27] bg-[#141512] overflow-y-auto p-2 space-y-1 shrink-0">
          <div className="px-2 py-1 text-[10px] text-[#70746A] uppercase font-bold">Modified Files</div>
          {diffs.map((diff) => {
            const isSelected = diff.filePath === activeDiff?.filePath;
            return (
              <div
                key={diff.filePath}
                onClick={() => setSelectedFilePath(diff.filePath)}
                className={`p-2 rounded cursor-pointer transition-colors flex items-center justify-between ${
                  isSelected
                    ? 'bg-[#1D1F1B] text-[#B7FF2A] border border-[#2A2D27]'
                    : 'text-[#A3A69B] hover:bg-[#171815] hover:text-[#F2F3ED]'
                }`}
              >
                <div className="flex items-center gap-1.5 truncate">
                  <FileCode className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{diff.filePath}</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] shrink-0 font-mono">
                  <span className="text-[#B7FF2A]">+{diff.linesAdded}</span>
                  <span className="text-[#FF4A4A]">-{diff.linesRemoved}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Patch Diff Content */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#111210]">
          {activeDiff ? (
            <>
              {/* File Diff Action Header */}
              <div className="h-10 px-4 border-b border-[#2A2D27] bg-[#171815] flex items-center justify-between shrink-0">
                <span className="font-semibold text-[#F2F3ED] truncate">{activeDiff.filePath}</span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onViewFile(activeDiff.filePath)}
                    className="px-2.5 py-1 rounded bg-[#1D1F1B] border border-[#2A2D27] text-[#A3A69B] hover:text-[#F2F3ED] text-[11px] flex items-center gap-1"
                  >
                    <Eye className="w-3 h-3" />
                    <span>View File</span>
                  </button>

                  <button
                    onClick={() => onRejectDiff(activeDiff.filePath)}
                    className="px-2.5 py-1 rounded bg-[#FF4A4A]/10 border border-[#FF4A4A]/30 text-[#FF4A4A] hover:bg-[#FF4A4A]/20 text-[11px] flex items-center gap-1"
                  >
                    <X className="w-3 h-3" />
                    <span>Reject</span>
                  </button>

                  <button
                    onClick={() => onAcceptDiff(activeDiff.filePath)}
                    className="px-2.5 py-1 rounded bg-[#B7FF2A] text-[#111210] font-bold text-[11px] hover:bg-[#89C900] flex items-center gap-1"
                  >
                    <Check className="w-3 h-3" />
                    <span>Accept</span>
                  </button>
                </div>
              </div>

              {/* Diff Lines Table */}
              <div className="flex-1 overflow-auto p-2 font-mono text-xs leading-6">
                {activeDiff.lines.map((line, idx) => {
                  const isAdd = line.type === 'add';
                  const isRemove = line.type === 'remove';

                  return (
                    <div
                      key={idx}
                      className={`flex items-start px-2 py-0.5 rounded-sm ${
                        isAdd
                          ? 'bg-[#B7FF2A]/10 text-[#B7FF2A] border-l-2 border-[#B7FF2A]'
                          : isRemove
                          ? 'bg-[#FF4A4A]/10 text-[#FF4A4A] border-l-2 border-[#FF4A4A]'
                          : 'text-[#A3A69B]'
                      }`}
                    >
                      <div className="w-8 text-right pr-2 text-[#70746A] select-none text-[10px]">
                        {line.oldLineNumber || ''}
                      </div>
                      <div className="w-8 text-right pr-2 text-[#70746A] select-none text-[10px]">
                        {line.newLineNumber || ''}
                      </div>
                      <div className="w-4 select-none text-center font-bold">
                        {isAdd ? '+' : isRemove ? '-' : ' '}
                      </div>
                      <div className="flex-1 whitespace-pre overflow-x-auto">{line.content}</div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-[#70746A]">
              Select a file on the left to inspect diff.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
