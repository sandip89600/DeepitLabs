import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useBuilderStore, AVAILABLE_MODELS } from '../store/builderStore';
import AgentChatPanel from '../components/builder/AgentChatPanel';
import PreviewWorkspace from '../components/builder/PreviewWorkspace';
import DeployModal from '../components/builder/DeployModal';
import { 
    Rocket, 
    CheckCircle2, 
    Clock, 
    ArrowLeft, 
    Cpu
} from 'lucide-react';

export default function BuilderLayout() {
    const { 
        projectTitle, 
        setProjectTitle, 
        isSaved, 
        setDeployModalOpen, 
        selectedModel,
        projectType
    } = useBuilderStore();

    const activeModel = AVAILABLE_MODELS.find(m => m.id === selectedModel) || AVAILABLE_MODELS[0];

    return (
        <div className="flex flex-col h-screen bg-slate-950 text-white font-sans overflow-hidden select-none">
            <Helmet>
                <title>{projectTitle} | AI Build Studio | DeepIT Labs</title>
            </Helmet>

            {/* TOP BAR NAVIGATION */}
            <header className="h-14 bg-slate-950 border-b border-slate-900 px-4 md:px-6 flex items-center justify-between shrink-0">
                {/* Left: Back Arrow + Logo + Project Title */}
                <div className="flex items-center gap-4">
                    <Link 
                        to="/dashboard" 
                        className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all cursor-pointer"
                        title="Back to Dashboard"
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </Link>

                    <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 font-bold text-xs">
                            AI
                        </div>
                        <span className="text-xs font-black tracking-tight bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent hidden sm:inline">
                            DeepIT Labs
                        </span>
                    </div>

                    <div className="h-4 w-[1px] bg-slate-800 hidden sm:block" />

                    {/* Editable Project Title Input */}
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={projectTitle}
                            onChange={(e) => setProjectTitle(e.target.value)}
                            className="bg-transparent hover:bg-slate-900/60 focus:bg-slate-900 border border-transparent focus:border-slate-800 rounded-lg px-2.5 py-1 text-xs font-bold text-white focus:outline-none transition-all w-44 sm:w-64"
                        />
                        <span className="text-[10px] text-slate-500 uppercase font-mono px-2 py-0.5 bg-slate-900 border border-slate-800 rounded">
                            {projectType}
                        </span>
                    </div>
                </div>

                {/* Right: Active Model Badge + Save Indicator + Deploy Button */}
                <div className="flex items-center gap-3">
                    {/* Model Engine Indicator */}
                    <div className="hidden md:flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
                        <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                        <span className="font-semibold text-[11px]">{activeModel.name}</span>
                    </div>

                    {/* Save State Indicator */}
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                        {isSaved ? (
                            <span className="flex items-center gap-1 text-emerald-400">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Saved
                            </span>
                        ) : (
                            <span className="flex items-center gap-1 text-amber-400">
                                <Clock className="w-3.5 h-3.5 animate-spin" /> Unsaved
                            </span>
                        )}
                    </div>

                    {/* Deploy Live Button */}
                    <button
                        onClick={() => setDeployModalOpen(true)}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-lg shadow-indigo-600/20 cursor-pointer"
                    >
                        <Rocket className="w-3.5 h-3.5" />
                        <span>Deploy Live</span>
                    </button>
                </div>
            </header>

            {/* MAIN WORKSPACE 30% / 70% SPLIT GRID */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
                {/* 30% LEFT PANEL: AI Agent Chat Interface */}
                <div className="lg:col-span-4 h-full overflow-hidden">
                    <AgentChatPanel />
                </div>

                {/* 70% RIGHT PANEL: Live Sandbox Preview, Code Editor, Console */}
                <div className="lg:col-span-8 h-full overflow-hidden">
                    <PreviewWorkspace />
                </div>
            </div>

            {/* Deploy Modal Overlay */}
            <DeployModal />
        </div>
    );
}
