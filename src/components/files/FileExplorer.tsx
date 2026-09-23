import React, { useState } from 'react';
import {
  Folder,
  FolderOpen,
  FileCode,
  FileText,
  FileJson,
  Plus,
  Trash2,
  Edit2,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';
import { ProjectFile } from '../../types/agent';

interface FileExplorerProps {
  files: ProjectFile[];
  activeFilePath: string;
  onSelectFile: (path: string) => void;
  onCreateFile: (path: string) => void;
  onDeleteFile: (path: string) => void;
}

export const FileExplorer: React.FC<FileExplorerProps> = ({
  files,
  activeFilePath,
  onSelectFile,
  onCreateFile,
  onDeleteFile,
}) => {
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    src: true,
    'src/components': true,
    'src/app': true,
    'src/styles': true,
  });
  const [isCreating, setIsCreating] = useState(false);
  const [newFilePath, setNewFilePath] = useState('');

  const toggleFolder = (folderPath: string) => {
    setOpenFolders((prev) => ({ ...prev, [folderPath]: !prev[folderPath] }));
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFilePath.trim()) return;
    onCreateFile(newFilePath.trim());
    setNewFilePath('');
    setIsCreating(false);
  };

  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith('.tsx') || fileName.endsWith('.ts') || fileName.endsWith('.jsx') || fileName.endsWith('.js')) {
      return <FileCode className="w-3.5 h-3.5 text-[#38BDF8]" />;
    }
    if (fileName.endsWith('.json')) {
      return <FileJson className="w-3.5 h-3.5 text-[#FFB800]" />;
    }
    if (fileName.endsWith('.css')) {
      return <FileCode className="w-3.5 h-3.5 text-[#B7FF2A]" />;
    }
    return <FileText className="w-3.5 h-3.5 text-[#A3A69B]" />;
  };

  return (
    <div className="flex flex-col h-full bg-[#141512] border-r border-[#2A2D27] select-none text-xs font-mono">
      {/* Explorer Header */}
      <div className="h-10 px-3 border-b border-[#2A2D27] flex items-center justify-between bg-[#171815]">
        <span className="text-[11px] font-bold text-[#A3A69B] uppercase tracking-wider">
          Workspace Files
        </span>
        <button
          onClick={() => setIsCreating(true)}
          title="New File"
          className="p-1 rounded hover:bg-[#2A2D27] text-[#A3A69B] hover:text-[#B7FF2A] transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* New File Inline Form */}
      {isCreating && (
        <form onSubmit={handleCreateSubmit} className="p-2 border-b border-[#2A2D27] bg-[#111210]">
          <input
            type="text"
            value={newFilePath}
            onChange={(e) => setNewFilePath(e.target.value)}
            placeholder="src/components/New.tsx"
            autoFocus
            className="w-full bg-[#1D1F1B] border border-[#B7FF2A]/50 rounded px-2 py-1 text-xs text-[#F2F3ED] outline-none font-mono"
          />
          <div className="flex justify-end gap-1 mt-1.5">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-2 py-0.5 text-[10px] text-[#70746A] hover:text-[#F2F3ED]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-2 py-0.5 text-[10px] bg-[#B7FF2A] text-[#111210] font-bold rounded"
            >
              Add
            </button>
          </div>
        </form>
      )}

      {/* Files List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {files.map((file) => {
          const isActive = file.path === activeFilePath;
          return (
            <div
              key={file.path}
              onClick={() => onSelectFile(file.path)}
              className={`group flex items-center justify-between px-2 py-1.5 rounded cursor-pointer transition-colors ${
                isActive
                  ? 'bg-[#1D1F1B] text-[#B7FF2A] font-semibold border border-[#2A2D27]'
                  : 'text-[#A3A69B] hover:bg-[#171815] hover:text-[#F2F3ED]'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                {getFileIcon(file.name)}
                <span className="truncate">{file.path}</span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {file.isModified && (
                  <span
                    title="Modified by Agent"
                    className="w-2 h-2 rounded-full bg-[#B7FF2A]"
                  />
                )}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm(`Delete ${file.path}?`)) {
                      onDeleteFile(file.path);
                    }
                  }}
                  className="opacity-0 group-hover:opacity-100 p-0.5 hover:text-[#FF4A4A] transition-opacity"
                  title="Delete File"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
