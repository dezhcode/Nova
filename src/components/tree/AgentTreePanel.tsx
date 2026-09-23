import React, { useState } from 'react';
import {
  Layers,
  CheckCircle2,
  Circle,
  Clock,
  AlertCircle,
  FileCode,
  Terminal,
  ChevronRight,
  ChevronDown,
  Info,
} from 'lucide-react';
import { AgentNode, AgentNodeStatus } from '../../types/agent';

interface AgentTreePanelProps {
  nodes: AgentNode[];
  onSelectFile?: (filePath: string) => void;
}

export const AgentTreePanel: React.FC<AgentTreePanelProps> = ({
  nodes,
  onSelectFile,
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(nodes[0]?.id || '');
  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  const getStatusIcon = (status: AgentNodeStatus) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-[#B7FF2A] shrink-0" />;
      case 'running':
        return (
          <div className="w-4 h-4 rounded-full border-2 border-[#B7FF2A] border-t-transparent animate-spin shrink-0" />
        );
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-[#FF4A4A] shrink-0" />;
      case 'pending':
      default:
        return <Circle className="w-4 h-4 text-[#70746A] shrink-0" />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#111210] overflow-hidden">
      {/* Top Header */}
      <div className="h-12 border-b border-[#2A2D27] px-4 flex items-center justify-between shrink-0 bg-[#171815]">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#B7FF2A]" />
          <span className="font-mono text-xs font-semibold text-[#F2F3ED] uppercase tracking-wider">
            Agent Workflow Tree
          </span>
        </div>
        <span className="text-[11px] font-mono text-[#A3A69B]">
          {nodes.filter((n) => n.status === 'completed').length}/{nodes.length} Stages Passed
        </span>
      </div>

      {/* Main Split Body */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left / Top: Tree Graph */}
        <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r border-[#2A2D27] overflow-y-auto p-4 space-y-3">
          <div className="text-[11px] font-mono uppercase text-[#70746A] font-bold mb-2">
            Pipeline Execution Graph
          </div>

          <div className="relative pl-3 space-y-4 before:absolute before:left-5 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#2A2D27]">
            {nodes.map((node, index) => {
              const isSelected = selectedNode?.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`relative flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#1D1F1B] border-[#B7FF2A] shadow-[0_0_15px_rgba(183,255,42,0.1)]'
                      : 'bg-[#171815] border-[#2A2D27] hover:border-[#70746A]'
                  }`}
                >
                  <div className="mt-0.5 z-10 bg-[#171815] rounded-full p-0.5">
                    {getStatusIcon(node.status)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold font-mono text-[#F2F3ED] truncate">
                        {node.title}
                      </span>
                      {node.duration && (
                        <span className="text-[10px] font-mono text-[#70746A] flex items-center gap-1 shrink-0">
                          <Clock className="w-3 h-3" />
                          {node.duration}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#A3A69B] mt-0.5 line-clamp-1">{node.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right / Bottom: Node Inspector & Execution Logs */}
        <div className="w-full md:w-1/2 flex flex-col overflow-hidden bg-[#141512]">
          {selectedNode ? (
            <div className="flex-1 flex flex-col p-4 overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-[#2A2D27] mb-4">
                <div>
                  <h3 className="text-sm font-mono font-bold text-[#F2F3ED]">{selectedNode.title}</h3>
                  <p className="text-xs text-[#A3A69B] mt-0.5">{selectedNode.description}</p>
                </div>
                <span
                  className={`px-2 py-0.5 text-[10px] font-mono uppercase font-semibold rounded border ${
                    selectedNode.status === 'completed'
                      ? 'bg-[#B7FF2A]/10 text-[#B7FF2A] border-[#B7FF2A]/30'
                      : selectedNode.status === 'running'
                      ? 'bg-[#38BDF8]/10 text-[#38BDF8] border-[#38BDF8]/30 animate-pulse'
                      : 'bg-[#2A2D27] text-[#70746A] border-[#3D4137]'
                  }`}
                >
                  {selectedNode.status}
                </span>
              </div>

              {/* Execution Diagnostics Logs */}
              <div className="mb-4">
                <div className="text-[11px] font-mono uppercase text-[#70746A] font-bold mb-2 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-[#B7FF2A]" />
                  <span>Execution Diagnostics</span>
                </div>
                <div className="bg-[#111210] border border-[#2A2D27] rounded-lg p-3 font-mono text-[11px] space-y-1.5">
                  {selectedNode.logs && selectedNode.logs.length > 0 ? (
                    selectedNode.logs.map((log, i) => (
                      <div key={i} className="flex items-start gap-2 text-[#A3A69B]">
                        <span className="text-[#B7FF2A] select-none">&gt;</span>
                        <span>{log}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-[#70746A] italic">No diagnostics generated for this stage yet.</div>
                  )}
                </div>
              </div>

              {/* Related Files */}
              {selectedNode.relatedFiles && selectedNode.relatedFiles.length > 0 && (
                <div>
                  <div className="text-[11px] font-mono uppercase text-[#70746A] font-bold mb-2 flex items-center gap-1.5">
                    <FileCode className="w-3.5 h-3.5 text-[#B7FF2A]" />
                    <span>Associated Workspace Files</span>
                  </div>
                  <div className="space-y-1">
                    {selectedNode.relatedFiles.map((file, i) => (
                      <button
                        key={i}
                        onClick={() => onSelectFile && onSelectFile(file)}
                        className="w-full text-left px-2.5 py-1.5 rounded-md bg-[#171815] border border-[#2A2D27] hover:border-[#B7FF2A]/50 text-xs font-mono text-[#F2F3ED] flex items-center justify-between"
                      >
                        <span>{file}</span>
                        <ChevronRight className="w-3 h-3 text-[#70746A]" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-xs font-mono text-[#70746A]">
              Select a stage to inspect execution trace.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
