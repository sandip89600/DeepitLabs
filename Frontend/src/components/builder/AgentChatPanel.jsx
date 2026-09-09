import React, { useState, useRef, useEffect } from 'react';
import { useBuilderStore, AVAILABLE_MODELS, PROJECT_TYPES } from '../../store/builderStore';
import { 
    Send, 
    Sparkles, 
    Bot, 
    User, 
    CheckCircle2, 
    Clock, 
    ChevronDown, 
    Cpu, 
    CornerDownLeft,
    Wrench
} from 'lucide-react';

const PRESET_PROMPTS = [
    'Build a SaaS analytics dashboard with dark theme & Stripe metrics',
    'High-converting landing page with hero CTA, pricing table & FAQ',
    'Custom CRM workflow automation for customer onboarding',
    'UI/UX wireframe design prototype with interactive cards'
];

export default function AgentChatPanel() {
    const { 
        selectedModel, 
        setSelectedModel, 
        projectType, 
        setProjectType, 
        messages, 
        sendMessage, 
        isBuilding 
    } = useBuilderStore();

    const [inputPrompt, setInputPrompt] = useState('');
    const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
    const messagesEndRef = useRef(null);

    const activeModel = AVAILABLE_MODELS.find(m => m.id === selectedModel) || AVAILABLE_MODELS[0];

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isBuilding]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputPrompt.trim() || isBuilding) return;
        sendMessage(inputPrompt);
        setInputPrompt('');
    };

    const handlePresetClick = (prompt) => {
        if (isBuilding) return;
        sendMessage(prompt);
    };

    return (
        <div className="flex flex-col h-full bg-slate-950 border-r border-slate-900 overflow-hidden select-none">
            {/* Header: AI Model Selector & Project Type Pills */}
            <div className="p-4 border-b border-slate-900 bg-slate-950/80 backdrop-blur-md space-y-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-indigo-400" />
                        <span className="text-xs font-bold text-white uppercase tracking-wider">AI Agent Engine</span>
                    </div>

                    {/* AI Model Dropdown Selector */}
                    <div className="relative">
                        <button
                            onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${activeModel.badgeColor}`}
                        >
                            <span>{activeModel.icon}</span>
                            <span>{activeModel.name}</span>
                            <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                        </button>

                        {isModelDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 py-1 overflow-hidden animate-in fade-in zoom-in-95">
                                <div className="px-3 py-2 border-b border-slate-800 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                                    Select AI Model Provider
                                </div>
                                {AVAILABLE_MODELS.map((model) => (
                                    <button
                                        key={model.id}
                                        onClick={() => {
                                            setSelectedModel(model.id);
                                            setIsModelDropdownOpen(false);
                                        }}
                                        className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors hover:bg-slate-800/60 ${
                                            selectedModel === model.id ? 'bg-indigo-600/10 text-indigo-300 font-bold' : 'text-slate-300'
                                        }`}
                                    >
                                        <span className="flex items-center gap-2">
                                            <span>{model.icon}</span>
                                            <span>{model.name}</span>
                                        </span>
                                        <span className="text-[9px] text-slate-500 font-mono">{model.provider}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Project Type Selectors (Web App, Website, Workflow, Design Mode) */}
                <div className="grid grid-cols-4 gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800/80">
                    {PROJECT_TYPES.map((type) => (
                        <button
                            key={type.id}
                            onClick={() => setProjectType(type.id)}
                            className={`flex flex-col items-center justify-center py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                                projectType === type.id
                                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                                    : 'text-slate-400 hover:text-slate-200'
                            }`}
                            title={type.desc}
                        >
                            <span className="text-xs">{type.icon}</span>
                            <span>{type.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Chat Message Trajectory */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-slate-800 select-text">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex gap-3 text-xs ${
                            msg.role === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                    >
                        {msg.role === 'assistant' && (
                            <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-indigo-500/20 mt-0.5">
                                <Bot className="w-4 h-4" />
                            </div>
                        )}

                        <div className={`space-y-2 max-w-[85%] ${
                            msg.role === 'user'
                                ? 'bg-indigo-600 text-white px-4 py-3 rounded-2xl rounded-tr-sm shadow-md shadow-indigo-600/10'
                                : 'bg-slate-900/80 border border-slate-800/80 text-slate-200 p-4 rounded-2xl rounded-tl-sm backdrop-blur-md'
                        }`}>
                            <div className="flex justify-between items-center gap-4 text-[10px] text-slate-400 border-b border-slate-800/50 pb-1.5 mb-1.5">
                                <span className="font-bold flex items-center gap-1 text-indigo-400">
                                    {msg.role === 'user' ? 'You' : msg.model || activeModel.name}
                                </span>
                                <span className="font-mono text-[9px] opacity-70">{msg.timestamp}</span>
                            </div>

                            <p className="whitespace-pre-wrap leading-relaxed select-text">{msg.content}</p>

                            {/* Plan Reasoning Box */}
                            {msg.plan && (
                                <div className="mt-3 p-3 bg-slate-955 border border-slate-800 rounded-xl space-y-2">
                                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                        <span className="flex items-center gap-1 text-amber-400">
                                            <Wrench className="w-3 h-3" /> Agent Step Plan
                                        </span>
                                        <span>{msg.status?.toUpperCase()}</span>
                                    </div>
                                    <div className="space-y-1.5">
                                        {msg.plan.map((item) => (
                                            <div key={item.step} className="flex items-center gap-2 text-[11px]">
                                                {item.status === 'done' ? (
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                                ) : item.status === 'in-progress' ? (
                                                    <span className="w-3.5 h-3.5 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin shrink-0" />
                                                ) : (
                                                    <Clock className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                                                )}
                                                <span className={item.status === 'done' ? 'text-slate-300' : item.status === 'in-progress' ? 'text-indigo-300 font-semibold' : 'text-slate-500'}>
                                                    {item.step}. {item.text}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {msg.role === 'user' && (
                            <div className="w-7 h-7 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                                <User className="w-4 h-4" />
                            </div>
                        )}
                    </div>
                ))}

                {isBuilding && (
                    <div className="flex gap-3 text-xs">
                        <div className="w-7 h-7 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 animate-pulse">
                            <Bot className="w-4 h-4" />
                        </div>
                        <div className="bg-slate-900/80 border border-indigo-500/30 text-indigo-300 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-2">
                            <span className="w-3 h-3 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
                            <span>Building code via <strong>{activeModel.name}</strong>...</span>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Quick Preset Chips */}
            <div className="p-3 border-t border-slate-900/80 bg-slate-950">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" /> Starter Prompts
                </p>
                <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {PRESET_PROMPTS.map((prompt, i) => (
                        <button
                            key={i}
                            onClick={() => handlePresetClick(prompt)}
                            disabled={isBuilding}
                            className="whitespace-nowrap bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-[10px] px-2.5 py-1.5 rounded-lg transition-all cursor-pointer disabled:opacity-50"
                        >
                            {prompt.slice(0, 32)}...
                        </button>
                    ))}
                </div>
            </div>

            {/* Prompt Input Form */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-slate-900 bg-slate-950">
                <div className="relative flex items-center bg-slate-900 border border-slate-800 focus-within:border-indigo-500 rounded-2xl px-4 py-2.5 transition-all">
                    <input
                        type="text"
                        value={inputPrompt}
                        onChange={(e) => setInputPrompt(e.target.value)}
                        placeholder={`Describe your app for ${activeModel.name}...`}
                        disabled={isBuilding}
                        className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none pr-10"
                    />
                    <button
                        type="submit"
                        disabled={!inputPrompt.trim() || isBuilding}
                        className="absolute right-2 p-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white rounded-xl transition-all cursor-pointer disabled:cursor-not-allowed shadow-md shadow-indigo-600/20"
                    >
                        <Send className="w-3.5 h-3.5" />
                    </button>
                </div>
                <div className="flex justify-between items-center mt-2 px-1 text-[10px] text-slate-500 font-mono">
                    <span>Press Enter to send</span>
                    <span className="flex items-center gap-1">
                        <CornerDownLeft className="w-3 h-3" /> {activeModel.name}
                    </span>
                </div>
            </form>
        </div>
    );
}
