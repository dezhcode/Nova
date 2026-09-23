import React from 'react';
import { Cpu, ListTodo, Layers, Code2, Eye, GitCompare } from 'lucide-react';
import { ViewTab } from '../../types/agent';

interface MobileNavProps {
  activeTab: ViewTab;
  setActiveTab: (tab: ViewTab) => void;
  changeCount: number;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  activeTab,
  setActiveTab,
  changeCount,
}) => {
  const tabs: { id: ViewTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'chat', label: 'Agent', icon: <Cpu className="w-4 h-4" /> },
    { id: 'plan', label: 'Plan', icon: <ListTodo className="w-4 h-4" /> },
    { id: 'tree', label: 'Tree', icon: <Layers className="w-4 h-4" /> },
    { id: 'files', label: 'Files', icon: <Code2 className="w-4 h-4" /> },
    { id: 'diff', label: 'Diff', icon: <GitCompare className="w-4 h-4" />, badge: changeCount },
    { id: 'preview', label: 'Preview', icon: <Eye className="w-4 h-4" /> },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 h-14 bg-[#171815] border-t border-[#2A2D27] flex items-center justify-around px-2 z-40 select-none safe-area-pb">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center gap-1 py-1 px-2.5 rounded-lg transition-colors relative ${
              isActive ? 'text-[#B7FF2A]' : 'text-[#70746A] hover:text-[#A3A69B]'
            }`}
          >
            <div className="relative">
              {tab.icon}
              {tab.badge && tab.badge > 0 ? (
                <span className="absolute -top-1 -right-2 w-3.5 h-3.5 rounded-full bg-[#B7FF2A] text-[#111210] font-mono text-[8px] font-bold flex items-center justify-center">
                  {tab.badge}
                </span>
              ) : null}
            </div>
            <span className="text-[10px] font-medium tracking-tight">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};
