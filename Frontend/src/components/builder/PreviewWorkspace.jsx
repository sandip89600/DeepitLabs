import React from 'react';
import { useBuilderStore } from '../../store/builderStore';
import { 
    Play, 
    Code2, 
    Terminal, 
    Monitor, 
    Tablet, 
    Smartphone, 
    FileCode, 
    Check, 
    Copy,
    Save
} from 'lucide-react';

export default function PreviewWorkspace() {
    const { 
        viewMode, 
        setViewMode, 
        viewport, 
        setViewport, 
        fileTree, 
        activeFilePath, 
        setActiveFilePath, 
        updateFileContent,
        buildLogs,
        saveProject,
        isSaved,
        projectTitle
    } = useBuilderStore();

    const [isCopied, setIsCopied] = React.useState(false);

    const activeCode = fileTree[activeFilePath] || '';

    const handleCopyCode = () => {
        navigator.clipboard.writeText(activeCode);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="flex flex-col h-full bg-slate-950 overflow-hidden select-none">
            {/* Workspace Header Toolbar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-900 bg-slate-950/80 backdrop-blur-md">
                {/* Workspace Tabs: Live Preview | Code Editor | Console Logs */}
                <div className="flex gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800/80">
                    <button
                        onClick={() => setViewMode('preview')}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            viewMode === 'preview'
                                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                                : 'text-slate-400 hover:text-slate-200'
                        }`}
                    >
                        <Play className="w-3.5 h-3.5" /> Live Preview
                    </button>

                    <button
                        onClick={() => setViewMode('code')}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            viewMode === 'code'
                                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                                : 'text-slate-400 hover:text-slate-200'
                        }`}
                    >
                        <Code2 className="w-3.5 h-3.5" /> Code Editor
                    </button>

                    <button
                        onClick={() => setViewMode('console')}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            viewMode === 'console'
                                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                                : 'text-slate-400 hover:text-slate-200'
                        }`}
                    >
                        <Terminal className="w-3.5 h-3.5" /> Console ({buildLogs.length})
                    </button>
                </div>

                {/* Viewport controls (Only active in Preview mode) */}
                {viewMode === 'preview' && (
                    <div className="flex items-center gap-2">
                        <div className="flex gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800/80">
                            <button
                                onClick={() => setViewport('desktop')}
                                className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                                    viewport === 'desktop' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'
                                }`}
                                title="Desktop View"
                            >
                                <Monitor className="w-3.5 h-3.5" />
                            </button>
                            <button
                                onClick={() => setViewport('tablet')}
                                className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                                    viewport === 'tablet' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'
                                }`}
                                title="Tablet View (768px)"
                            >
                                <Tablet className="w-3.5 h-3.5" />
                            </button>
                            <button
                                onClick={() => setViewport('mobile')}
                                className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                                    viewport === 'mobile' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'
                                }`}
                                title="Mobile View (375px)"
                            >
                                <Smartphone className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Code actions (Copy / Save) */}
                {viewMode === 'code' && (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleCopyCode}
                            className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
                        >
                            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{isCopied ? 'Copied' : 'Copy'}</span>
                        </button>
                        <button
                            onClick={saveProject}
                            disabled={isSaved}
                            className="flex items-center gap-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
                        >
                            <Save className="w-3.5 h-3.5" />
                            <span>{isSaved ? 'Saved' : 'Save Changes'}</span>
                        </button>
                    </div>
                )}
            </div>

            {/* TAB CONTENT AREA */}
            <div className="flex-1 overflow-hidden relative">
                {/* 1. LIVE PREVIEW MODE */}
                {viewMode === 'preview' && (
                    <div className="w-full h-full bg-slate-950 flex items-center justify-center p-4 overflow-auto">
                        <div
                            className={`bg-slate-950 border border-slate-800/80 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 flex flex-col ${
                                viewport === 'desktop'
                                    ? 'w-full h-full'
                                    : viewport === 'tablet'
                                    ? 'w-[768px] h-[95%]'
                                    : 'w-[375px] h-[95%]'
                            }`}
                        >
                            {/* Browser Address bar mockup */}
                            <div className="bg-slate-900/80 border-b border-slate-800 px-4 py-2 flex items-center justify-between text-xs text-slate-400 font-mono">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                                    <span className="text-[11px] text-slate-500 ml-2">https://localhost:5173</span>
                                </div>
                                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-500/20">
                                    HMR Live
                                </span>
                            </div>

                            {/* Rendered Application Screen */}
                            <div className="flex-1 bg-slate-950 overflow-y-auto p-6 select-text font-sans">
                                <div className="max-w-4xl mx-auto space-y-6">
                                    <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-3xl space-y-4">
                                        <div className="flex justify-between items-center">
                                            <h2 className="text-lg font-black text-white">{projectTitle}</h2>
                                            <span className="text-[10px] bg-indigo-600/20 text-indigo-300 font-bold px-2.5 py-1 rounded-full border border-indigo-500/30">
                                                Active AI Output
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-400 leading-relaxed">
                                            Interactive preview container synchronized with code editor. Changes made in the chat prompt or code editor auto-update in real time.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-2xl">
                                            <span className="text-[10px] uppercase font-bold text-slate-500">Node Status</span>
                                            <p className="text-xl font-black text-white mt-1">Online</p>
                                        </div>
                                        <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-2xl">
                                            <span className="text-[10px] uppercase font-bold text-slate-500">Latency</span>
                                            <p className="text-xl font-black text-emerald-400 mt-1">12ms</p>
                                        </div>
                                        <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-2xl">
                                            <span className="text-[10px] uppercase font-bold text-slate-500">Database</span>
                                            <p className="text-xl font-black text-indigo-400 mt-1">Postgres Connected</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 2. CODE EDITOR MODE */}
                {viewMode === 'code' && (
                    <div className="flex h-full bg-slate-950">
                        {/* File Tree Navigation Sidebar */}
                        <div className="w-56 border-r border-slate-900 bg-slate-950/90 p-3 space-y-2">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block px-2">
                                Project Explorer
                            </span>
                            <div className="space-y-1">
                                {Object.keys(fileTree).map((filePath) => (
                                    <button
                                        key={filePath}
                                        onClick={() => setActiveFilePath(filePath)}
                                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-left transition-colors cursor-pointer ${
                                            activeFilePath === filePath
                                                ? 'bg-indigo-600/15 border border-indigo-500/30 text-indigo-300 font-bold'
                                                : 'text-slate-400 hover:text-white hover:bg-slate-900'
                                        }`}
                                    >
                                        <FileCode className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                                        <span className="truncate">{filePath}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Code Editor View */}
                        <div className="flex-1 flex flex-col bg-[#0d1117] select-text">
                            <div className="px-4 py-2 bg-slate-900/80 border-b border-slate-800/80 text-xs font-mono text-slate-400 flex items-center gap-2">
                                <FileCode className="w-3.5 h-3.5 text-indigo-400" />
                                <span>{activeFilePath}</span>
                            </div>
                            <textarea
                                value={activeCode}
                                onChange={(e) => updateFileContent(activeFilePath, e.target.value)}
                                className="flex-1 bg-slate-950 p-4 font-mono text-xs text-slate-200 focus:outline-none resize-none leading-relaxed selection:bg-indigo-600/30"
                                spellCheck={false}
                            />
                        </div>
                    </div>
                )}

                {/* 3. CONSOLE LOGS MODE */}
                {viewMode === 'console' && (
                    <div className="h-full bg-slate-950 p-4 font-mono text-xs overflow-y-auto select-text space-y-2">
                        <div className="flex justify-between items-center text-slate-500 border-b border-slate-900 pb-2 mb-2">
                            <span>DeepitLabs Agent Execution Terminal</span>
                            <span>{buildLogs.length} events logged</span>
                        </div>
                        {buildLogs.map((log, i) => (
                            <div key={i} className="flex gap-3 text-slate-300">
                                <span className="text-slate-600 select-none">{i + 1}</span>
                                <span className={log.includes('Error') ? 'text-rose-400 font-semibold' : log.includes('Build completed') ? 'text-emerald-400 font-semibold' : 'text-slate-300'}>
                                    {log}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
