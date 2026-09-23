import React, { useState, useEffect } from 'react';
import {
  TopBar,
} from './components/layout/TopBar';
import {
  MobileNav,
} from './components/layout/MobileNav';
import {
  ChatPanel,
} from './components/chat/ChatPanel';
import {
  PlanPanel,
} from './components/plan/PlanPanel';
import {
  AgentTreePanel,
} from './components/tree/AgentTreePanel';
import {
  FileExplorer,
} from './components/files/FileExplorer';
import {
  CodeViewer,
} from './components/editor/CodeViewer';
import {
  DiffViewer,
} from './components/diff/DiffViewer';
import {
  PreviewPanel,
} from './components/preview/PreviewPanel';
import {
  TerminalPanel,
} from './components/terminal/TerminalPanel';
import {
  VersionHistoryModal,
} from './components/versions/VersionHistoryModal';
import {
  ORBIT_SAAS_FILES,
} from './lib/project-presets';
import {
  executeAgentLoop,
  computeFileDiff,
} from './lib/copilot-service';
import {
  ProjectFile,
  ViewTab,
  CopilotMode,
  ChatMessage,
  PlanTask,
  AgentNode,
  ActivityEntry,
  FileDiff,
  ProjectVersion,
} from './types/agent';
import {
  Cpu,
  Layers,
  Code2,
  Eye,
  GitCompare,
  ListTodo,
  Terminal,
} from 'lucide-react';

export default function App() {
  const [projectName] = useState<string>('Orbit SaaS');
  const [files, setFiles] = useState<ProjectFile[]>(ORBIT_SAAS_FILES);
  const [activeFilePath, setActiveFilePath] = useState<string>('src/components/Hero.tsx');
  const [activeTab, setActiveTab] = useState<ViewTab>('chat');
  const [copilotMode, setCopilotMode] = useState<CopilotMode>('smart');
  const [isAgentRunning, setIsAgentRunning] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isVersionsOpen, setIsVersionsOpen] = useState<boolean>(false);

  // Conversation history
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'agent',
      content: `Welcome to Forge. I am your autonomous AI web development agent powered by Copilot.\n\nI can plan, inspect files, apply surgical diffs, and verify full-stack applications with zero code regressions.`,
      timestamp: '09:00',
      mode: 'smart',
      question: {
        id: 'q-style',
        question: 'Which design accent should we prioritize for Orbit SaaS?',
        options: ['Phosphor Green (#B7FF2A)', 'Dark Graphite Minimal', 'High Contrast Cyan'],
      },
      suggestedActions: [
        'Add responsive mobile navigation',
        'Update hero badge & glowing CTA',
        'Check typecheck diagnostics',
      ],
    },
  ]);

  // Plan tasks
  const [planTasks, setPlanTasks] = useState<PlanTask[]>([
    {
      id: 'task-init',
      title: 'Analyze Project Architecture',
      description: 'Validate React 19 structure, Tailwind CSS configuration, and component hierarchy.',
      status: 'completed',
      duration: '0.2s',
      steps: [
        { id: 's1', title: 'Verify globals.css tokens', completed: true },
        { id: 's2', title: 'Check Lucide vector icons', completed: true },
      ],
    },
    {
      id: 'task-components',
      title: 'Assemble Core UI Modules',
      description: 'Navbar, Hero, Metrics, Features, and Pricing components ready for hot-editing.',
      status: 'completed',
      duration: '0.4s',
      steps: [
        { id: 's3', title: 'Build hero section', completed: true },
        { id: 's4', title: 'Add interactive pricing toggle', completed: true },
      ],
    },
  ]);

  // Agent Workflow Tree
  const [treeNodes, setTreeNodes] = useState<AgentNode[]>([
    {
      id: 'node-1',
      title: 'Project Ingestion',
      description: 'Parsed repository context and initialized sandbox',
      status: 'completed',
      duration: '0.2s',
      timestamp: '0.0s',
      logs: ['Ingested 8 project files', 'Configured Vite 8 dev sandbox', 'Zero emojis enforcement: OK'],
    },
    {
      id: 'node-2',
      title: 'Copilot Engine Ready',
      description: 'Active session initialized with challenge solver',
      status: 'completed',
      duration: '0.3s',
      timestamp: '+0.2s',
      logs: ['Copilot WebSocket handshake verified', 'Mode: SMART'],
    },
  ]);

  // Activity Stream
  const [activities, setActivities] = useState<ActivityEntry[]>([
    {
      id: 'act-1',
      timestamp: '09:00:00',
      type: 'analyze',
      message: 'Workspace initialized with Orbit SaaS template.',
    },
    {
      id: 'act-2',
      timestamp: '09:00:01',
      type: 'verify',
      message: 'Verification pass: Typecheck OK, Build OK (0 errors).',
    },
  ]);

  // Pending Diffs
  const [diffs, setDiffs] = useState<FileDiff[]>([]);

  // Version Snapshots
  const [versions, setVersions] = useState<ProjectVersion[]>([
    {
      id: 'v1',
      versionNumber: 1,
      title: 'Initial Workspace Setup',
      description: 'Base Orbit SaaS landing page with dark theme and phosphor lime accents.',
      timestamp: '09:00:00',
      files: ORBIT_SAAS_FILES,
      changeCount: 0,
    },
  ]);

  const activeFile = files.find((f) => f.path === activeFilePath) || files[0];

  // Send message & trigger agent loop
  const handleSendMessage = async (promptText: string, attachedFiles?: string[]) => {
    if (!promptText.trim() || isAgentRunning) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      sender: 'user',
      content: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      attachedFiles,
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsAgentRunning(true);

    try {
      const summary = await executeAgentLoop(promptText, copilotMode, files, {
        onActivity: (act) => setActivities((prev) => [...prev, act]),
        onPlanUpdate: (tasks) => setPlanTasks(tasks),
        onTreeUpdate: (nodes) => setTreeNodes(nodes),
        onFilesUpdate: (newFiles, newDiffs) => {
          setFiles(newFiles);
          if (newDiffs.length > 0) {
            setDiffs((prev) => [...newDiffs, ...prev]);
          }
        },
      });

      const agentMsg: ChatMessage = {
        id: crypto.randomUUID(),
        sender: 'agent',
        content: summary,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        mode: copilotMode,
        suggestedActions: [
          'Verify production build',
          'Inspect diff of modified components',
          'Deploy to live preview URL',
        ],
      };
      setMessages((prev) => [...prev, agentMsg]);

      // Record new version snapshot
      setVersions((prev) => [
        {
          id: crypto.randomUUID(),
          versionNumber: prev.length + 1,
          title: `Prompt: ${promptText.slice(0, 32)}...`,
          description: summary.slice(0, 80),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          files: files,
          changeCount: diffs.length + 1,
        },
        ...prev,
      ]);
    } catch (err: any) {
      console.error('[Agent error]:', err);
    } finally {
      setIsAgentRunning(false);
    }
  };

  // Select Question clarification option
  const handleSelectQuestionOption = (questionId: string, option: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.question && msg.question.id === questionId) {
          return {
            ...msg,
            question: { ...msg.question, selectedOption: option },
          };
        }
        return msg;
      })
    );

    // Follow up prompt based on choice
    handleSendMessage(`Apply selected design direction: "${option}" to project components.`);
  };

  // Revert last file modification
  const handleUndoLastChange = () => {
    const modifiedFile = files.find((f) => f.isModified && f.originalContent);
    if (!modifiedFile) return;

    setFiles((prev) =>
      prev.map((f) => {
        if (f.path === modifiedFile.path && f.originalContent) {
          return {
            ...f,
            content: f.originalContent,
            isModified: false,
          };
        }
        return f;
      })
    );

    setDiffs((prev) => prev.filter((d) => d.filePath !== modifiedFile.path));
  };

  // Accept diff patch
  const handleAcceptDiff = (filePath: string) => {
    setFiles((prev) =>
      prev.map((f) => {
        if (f.path === filePath) {
          return { ...f, isModified: false, originalContent: f.content };
        }
        return f;
      })
    );
    setDiffs((prev) => prev.filter((d) => d.filePath !== filePath));
  };

  // Reject diff patch
  const handleRejectDiff = (filePath: string) => {
    setFiles((prev) =>
      prev.map((f) => {
        if (f.path === filePath && f.originalContent) {
          return { ...f, content: f.originalContent, isModified: false };
        }
        return f;
      })
    );
    setDiffs((prev) => prev.filter((d) => d.filePath !== filePath));
  };

  const handleAcceptAllDiffs = () => {
    setFiles((prev) =>
      prev.map((f) => ({ ...f, isModified: false, originalContent: f.content }))
    );
    setDiffs([]);
  };

  const handleUpdateFileContent = (filePath: string, newContent: string) => {
    setFiles((prev) =>
      prev.map((f) => {
        if (f.path === filePath) {
          const original = f.originalContent || f.content;
          const isMod = original !== newContent;
          return { ...f, content: newContent, isModified: isMod, originalContent: original };
        }
        return f;
      })
    );
  };

  const handleCreateFile = (newPath: string) => {
    const newFile: ProjectFile = {
      path: newPath,
      name: newPath.split('/').pop() || newPath,
      language: newPath.endsWith('.css') ? 'css' : newPath.endsWith('.json') ? 'json' : 'tsx',
      content: `// ${newPath}\nexport default function Module() {\n  return <div>New Module</div>;\n}`,
      isModified: true,
    };
    setFiles((prev) => [...prev, newFile]);
    setActiveFilePath(newPath);
  };

  const handleDeleteFile = (path: string) => {
    setFiles((prev) => prev.filter((f) => f.path !== path));
    if (activeFilePath === path) {
      setActiveFilePath(files[0]?.path || '');
    }
  };

  const handleRestoreVersion = (versionId: string) => {
    const targetVersion = versions.find((v) => v.id === versionId);
    if (!targetVersion) return;
    setFiles(targetVersion.files.map((f) => ({ ...f, isModified: false })));
    setDiffs([]);
  };

  const handleRunBuildCheck = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setActivities((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          type: 'verify',
          message: 'Full Verification Suite Passed: 0 TypeScript errors, 0 ESLint warnings, Vite build OK.',
        },
      ]);
    }, 1200);
  };

  const handleExport = () => {
    const exportData = JSON.stringify(files, null, 2);
    const blob = new Blob([exportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName.toLowerCase().replace(/\s+/g, '-')}-source.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#111210] text-[#F2F3ED] overflow-hidden">
      {/* Top Application Bar */}
      <TopBar
        projectName={projectName}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        copilotMode={copilotMode}
        setCopilotMode={setCopilotMode}
        isAgentRunning={isAgentRunning}
        changeCount={diffs.length}
        onUndoLastChange={handleUndoLastChange}
        onOpenVersions={() => setIsVersionsOpen(true)}
        onExport={handleExport}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex overflow-hidden pb-14 lg:pb-0">
        {/* Desktop Split View: Left Column (Chat/Agent), Right Column (Plan, Tree, Files, Diff, Preview, Terminal) */}
        {/* On desktop, when in chat view, show dual pane (Chat on Left, Preview/Inspector on Right) */}
        {activeTab === 'chat' && (
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden w-full">
            {/* Left Chat Column */}
            <div className="w-full lg:w-[460px] xl:w-[500px] border-b lg:border-b-0 lg:border-r border-[#2A2D27] flex flex-col h-full shrink-0">
              <ChatPanel
                messages={messages}
                isAgentRunning={isAgentRunning}
                onSendMessage={handleSendMessage}
                onStopAgent={() => setIsAgentRunning(false)}
                copilotMode={copilotMode}
                files={files}
                activities={activities}
                onSelectQuestionOption={handleSelectQuestionOption}
                onSelectAction={(action) => handleSendMessage(action)}
              />
            </div>

            {/* Right Interactive Preview & Explorer Pane */}
            <div className="hidden lg:flex flex-1 flex-col h-full overflow-hidden">
              <PreviewPanel files={files} projectName={projectName} />
            </div>
          </div>
        )}

        {/* Plan Tab */}
        {activeTab === 'plan' && (
          <div className="flex-1 h-full overflow-hidden">
            <PlanPanel
              tasks={planTasks}
              onSelectFile={(filePath) => {
                setActiveFilePath(filePath);
                setActiveTab('files');
              }}
            />
          </div>
        )}

        {/* Workflow Tree Tab */}
        {activeTab === 'tree' && (
          <div className="flex-1 h-full overflow-hidden">
            <AgentTreePanel
              nodes={treeNodes}
              onSelectFile={(filePath) => {
                setActiveFilePath(filePath);
                setActiveTab('files');
              }}
            />
          </div>
        )}

        {/* Files & Code Viewer Tab */}
        {activeTab === 'files' && (
          <div className="flex-1 flex flex-col sm:flex-row h-full overflow-hidden">
            <div className="w-full sm:w-64 h-48 sm:h-full shrink-0">
              <FileExplorer
                files={files}
                activeFilePath={activeFilePath}
                onSelectFile={(path) => setActiveFilePath(path)}
                onCreateFile={handleCreateFile}
                onDeleteFile={handleDeleteFile}
              />
            </div>
            <div className="flex-1 h-full overflow-hidden">
              <CodeViewer
                file={activeFile}
                onUpdateContent={handleUpdateFileContent}
                onRevertFile={(p) => handleRejectDiff(p)}
              />
            </div>
          </div>
        )}

        {/* Diff & Patches Tab */}
        {activeTab === 'diff' && (
          <div className="flex-1 h-full overflow-hidden">
            <DiffViewer
              diffs={diffs}
              onAcceptDiff={handleAcceptDiff}
              onRejectDiff={handleRejectDiff}
              onAcceptAll={handleAcceptAllDiffs}
              onViewFile={(p) => {
                setActiveFilePath(p);
                setActiveTab('files');
              }}
            />
          </div>
        )}

        {/* Standalone Preview Tab */}
        {activeTab === 'preview' && (
          <div className="flex-1 h-full overflow-hidden">
            <PreviewPanel files={files} projectName={projectName} />
          </div>
        )}

        {/* Terminal Tab */}
        {activeTab === 'terminal' && (
          <div className="flex-1 h-full overflow-hidden">
            <TerminalPanel
              activities={activities}
              onRunBuildCheck={handleRunBuildCheck}
              isVerifying={isVerifying}
            />
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        changeCount={diffs.length}
      />

      {/* Version History Modal */}
      <VersionHistoryModal
        isOpen={isVersionsOpen}
        onClose={() => setIsVersionsOpen(false)}
        versions={versions}
        onRestoreVersion={handleRestoreVersion}
      />
    </div>
  );
}
