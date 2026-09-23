import React from 'react';
import {
  GitBranch,
  X,
  RotateCcw,
  Clock,
  FileCode,
  Check,
} from 'lucide-react';
import { ProjectVersion } from '../../types/agent';

interface VersionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  versions: ProjectVersion[];
  onRestoreVersion: (versionId: string) => void;
}

export const VersionHistoryModal: React.FC<VersionHistoryModalProps> = ({
  isOpen,
  onClose,
  versions,
  onRestoreVersion,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 font-mono select-none">
      <div className="bg-[#171815] border border-[#2A2D27] rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="p-4 border-b border-[#2A2D27] flex items-center justify-between bg-[#1D1F1B]">
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-[#B7FF2A]" />
            <span className="font-bold text-sm text-[#F2F3ED] uppercase tracking-wider">
              Version Snapshots &amp; Revert
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[#70746A] hover:text-[#F2F3ED] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Versions Timeline List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {versions.map((ver, idx) => (
            <div
              key={ver.id}
              className="p-3.5 rounded-xl bg-[#141512] border border-[#2A2D27] flex items-start justify-between gap-3 hover:border-[#70746A] transition-colors"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded bg-[#1D1F1B] border border-[#2A2D27] text-xs font-bold text-[#B7FF2A]">
                    v{ver.versionNumber}
                  </span>
                  <span className="text-xs font-semibold text-[#F2F3ED]">{ver.title}</span>
                  {idx === 0 && (
                    <span className="text-[9px] uppercase font-bold px-1.5 py-0.2 rounded bg-[#B7FF2A]/10 text-[#B7FF2A] border border-[#B7FF2A]/30">
                      Current
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-[#A3A69B] mb-2">{ver.description}</p>

                <div className="flex items-center gap-3 text-[10px] text-[#70746A]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {ver.timestamp}
                  </span>
                  <span className="flex items-center gap-1">
                    <FileCode className="w-3 h-3" />
                    {ver.files.length} files
                  </span>
                </div>
              </div>

              {idx !== 0 && (
                <button
                  onClick={() => {
                    onRestoreVersion(ver.id);
                    onClose();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#1D1F1B] border border-[#2A2D27] text-[#F2F3ED] hover:text-[#B7FF2A] hover:border-[#B7FF2A]/50 text-xs flex items-center gap-1.5 shrink-0 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Restore</span>
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#2A2D27] bg-[#141512] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#1D1F1B] border border-[#2A2D27] text-xs text-[#A3A69B] hover:text-[#F2F3ED]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
