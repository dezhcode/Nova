export type CopilotMode = 'smart' | 'reasoning' | 'search' | 'chat';

export type TaskStatus = 'pending' | 'running' | 'completed' | 'failed' | 'blocked';

export type AgentNodeStatus = 'pending' | 'running' | 'completed' | 'failed';

export type ViewTab = 'chat' | 'plan' | 'tree' | 'files' | 'diff' | 'preview' | 'terminal';

export type DeviceViewport = 'desktop' | 'tablet' | 'mobile';

export interface ProjectFile {
  path: string;
  name: string;
  content: string;
  language: 'typescript' | 'tsx' | 'javascript' | 'jsx' | 'css' | 'json' | 'html' | 'markdown';
  isModified?: boolean;
  originalContent?: string;
  size?: number;
}

export interface PlanStep {
  id: string;
  title: string;
  completed: boolean;
}

export interface PlanTask {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  duration?: string;
  steps: PlanStep[];
  relatedFiles?: string[];
  error?: string;
}

export interface AgentNode {
  id: string;
  title: string;
  description: string;
  status: AgentNodeStatus;
  parentId?: string;
  children?: string[];
  duration?: string;
  relatedFiles?: string[];
  logs?: string[];
  error?: string;
  timestamp: string;
}

export interface ActivityEntry {
  id: string;
  timestamp: string;
  type: 'analyze' | 'plan' | 'read' | 'write' | 'patch' | 'command' | 'verify' | 'error' | 'success';
  message: string;
  detail?: string;
  file?: string;
  durationMs?: number;
}

export interface DiffLine {
  type: 'add' | 'remove' | 'normal';
  oldLineNumber?: number;
  newLineNumber?: number;
  content: string;
}

export interface FileDiff {
  filePath: string;
  oldContent: string;
  newContent: string;
  linesAdded: number;
  linesRemoved: number;
  lines: DiffLine[];
  status: 'pending' | 'accepted' | 'rejected';
}

export interface AgentQuestion {
  id: string;
  question: string;
  options: string[];
  selectedOption?: string;
  context?: string;
}

export interface ProjectVersion {
  id: string;
  versionNumber: number;
  title: string;
  description: string;
  timestamp: string;
  files: ProjectFile[];
  changeCount: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent' | 'system';
  content: string;
  timestamp: string;
  mode?: CopilotMode;
  attachedFiles?: string[];
  toolCalls?: {
    name: string;
    params: Record<string, any>;
    result?: string;
  }[];
  question?: AgentQuestion;
  planPreview?: PlanTask[];
  suggestedActions?: string[];
}
