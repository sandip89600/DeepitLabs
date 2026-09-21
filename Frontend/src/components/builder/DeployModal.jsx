import React from 'react';
import { useBuilderStore } from '../../store/builderStore';
import { 
    Globe, 
    Rocket, 
    X, 
    CheckCircle2, 
    ExternalLink, 
    Sparkles,
    Copy,
    Check
} from 'lucide-react';

export default function DeployModal() {
    const { 
        isDeployModalOpen, 
        setDeployModalOpen, 
        projectTitle, 
        deployProject, 
        isDeploying, 
        deployUrl, 
        deployLogs 
    } = useBuilderStore();

    const [isCopied, setIsCopied] = React.useState(false);
    const [customDomain, setCustomDomain] = React.useState('');

    if (!isDeployModalOpen) return null;

    const slug = projectTitle.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const defaultUrl = deployUrl || `https://${slug}.deepitlabs.app`;

    const handleCopyUrl = () => {
        navigator.clipboard.writeText(defaultUrl);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                onClick={() => setDeployModalOpen(false)}
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Dialog */}
            <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                            <Rocket className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                                Production Deployment <Sparkles className="w-4 h-4 text-amber-400" />
                            </h3>
                            <p className="text-xs text-slate-400">Deploy your AI-built application live with SSL certification.</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setDeployModalOpen(false)}
                        className="text-slate-500 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Live Subdomain Box */}
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                            <Globe className="w-3.5 h-3.5 text-indigo-400" /> Subdomain Route
                        </span>
                        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-500/20">
                            Free Wildcard SSL
                        </span>
                    </div>

                    <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white">
                        <span className="truncate">{defaultUrl}</span>
                        <button
                            onClick={handleCopyUrl}
                            className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
                        >
                            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                    </div>
                </div>

                {/* Custom Domain Settings (Pro Tier) */}
                <div className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-2xl space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Connect Custom Domain</span>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={customDomain}
                            onChange={(e) => setCustomDomain(e.target.value)}
                            placeholder="e.g. app.yourcompany.com"
                            className="flex-1 bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                        />
                        <button className="bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 px-3 py-2 rounded-xl transition-all cursor-pointer">
                            Connect
                        </button>
                    </div>
                </div>

                {/* Deployment Logs Stream */}
                {deployLogs.length > 0 && (
                    <div className="p-3 bg-slate-950 border border-slate-900 rounded-2xl text-[11px] font-mono space-y-1 max-h-28 overflow-y-auto">
                        {deployLogs.map((log, i) => (
                            <div key={i} className="text-emerald-400 flex items-center gap-1.5">
                                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                                <span>{log}</span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-2">
                    <button
                        onClick={() => setDeployModalOpen(false)}
                        className="bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                    >
                        Close
                    </button>

                    {deployUrl ? (
                        <a
                            href={deployUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-emerald-600/20 cursor-pointer"
                        >
                            <ExternalLink className="w-3.5 h-3.5" /> View Live Site
                        </a>
                    ) : (
                        <button
                            onClick={deployProject}
                            disabled={isDeploying}
                            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-600/20 cursor-pointer disabled:cursor-not-allowed"
                        >
                            {isDeploying ? (
                                <>
                                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span>Deploying...</span>
                                </>
                            ) : (
                                <>
                                    <Rocket className="w-3.5 h-3.5" />
                                    <span>Deploy Production</span>
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
