import React, { useState } from 'react';
import SEO from '../seo/SEO';
import { 
    Cpu, 
    BarChart3, 
    CheckCircle2, 
    Calendar,
    Briefcase,
    Users
} from 'lucide-react';

const CASE_STUDIES_DATA = [
    {
        id: 'mern-analytics',
        title: 'Enterprise Analytics Dashboard Migration',
        subtitle: 'Scalable MERN Stack Development for Real-Time Financial Aggregations',
        client: 'Apex Fintech Solutions',
        industry: 'Fintech & Analytics',
        duration: '6 Months',
        teamSize: '8 Engineers',
        metric: '99.99%',
        metricLabel: 'API Availability',
        tags: ['MERN Stack Development', 'React Development Company', 'Node.js', 'MongoDB Atlas'],
        summary: 'How Deep IT Labs, a premier React Development Company and Node.js Development Company, re-engineered a legacy financial reporting tool into a high-performance dashboard serving 500k+ daily queries.',
        challenge: 'The client’s legacy reporting system suffered from slow loading speeds (12s average loading time) and frequent connection timeouts during peak hours. Complex aggregation pipelines on massive MongoDB collections were locking up databases and blocking user requests.',
        solution: 'Our senior developers designed a decoupled MERN Stack architecture. We built a customized data aggregation pipeline in Node.js, utilizing Redis memory caches for read-heavy operations, and optimized MongoDB index trees. The user interface was built using React 19 with virtualized list rendering to process thousands of transactions smoothly.',
        architecture: [
            { title: 'Frontend Layer', desc: 'React 19, custom hooks for stale-while-revalidate data queries, tailwind utility layout.' },
            { title: 'Backend Services', desc: 'Express API routing with strict JSON payload sanitization and Rate Limiting middlewares.' },
            { title: 'Database Optimization', desc: 'MongoDB compound indexing on compound shard keys and decoupled data aggregation streams.' }
        ],
        results: [
            'Reduced dashboard loading times from 12 seconds to 350ms (a 97% improvement).',
            'Sustained 500k+ daily database calls with 99.99% system uptime.',
            'Decreased infrastructure overhead costs by 40% through server-side caching.'
        ]
    },
    {
        id: 'ai-saas',
        title: 'CognitiveSupport: AI Customer Service Platform',
        subtitle: 'AI Development Company & SaaS Development Company Integration',
        client: 'Cognitive Support Inc.',
        industry: 'Customer Support SaaS',
        duration: '8 Months',
        teamSize: '6 Engineers',
        metric: '72%',
        metricLabel: 'Support Ticket Reduction',
        tags: ['AI Development Company', 'SaaS Development Company', 'React', 'Python LLMs'],
        summary: 'Deep IT Labs built a custom AI-driven multi-tenant SaaS platform integrating natural language processing, semantic search, and ticket routing for enterprise clients.',
        challenge: 'Scaling support desks was becoming financially unsustainable for the client. They needed a SaaS product that could automatically digest company docs and resolve 70%+ of customer tickets using generative AI before routing to humans.',
        solution: 'As a top-tier SaaS Development Company, we structured a multi-tenant cloud application. We implemented semantic search vector pipelines to parse doc repositories and fetch relevant context. The LLM microservice replies to customer queries, while a React dashboard handles live agent routing and admin configuration.',
        architecture: [
            { title: 'Multi-Tenant SaaS Routing', desc: 'Subdomain isolation and separate MongoDB tenant partitions for complete enterprise data isolation.' },
            { title: 'AI Orchestration Pipeline', desc: 'FastAPI service integrating vector embeddings with an LLM agent framework.' },
            { title: 'Real-time WebSocket Layer', desc: 'Socket.io channels for zero-latency communication and handovers between AI and live support agents.' }
        ],
        results: [
            'Successfully resolved 72% of general customer support queries automatically.',
            'Scaled to support 2,000 active enterprise organizations with complete data privacy.',
            'Achieved sub-100ms socket updates for seamless agent-customer chat transitions.'
        ]
    },
    {
        id: 'custom-erp-crm',
        title: 'OmniChannel Supply Chain ERP & CRM',
        subtitle: 'Enterprise-Scale ERP Development Company & CRM Development Company Solutions',
        client: 'LogiGlobal Transports',
        industry: 'Logistics & Warehousing',
        duration: '10 Months',
        teamSize: '12 Engineers',
        metric: '+35%',
        metricLabel: 'Operational Efficiency',
        tags: ['ERP Development Company', 'CRM Development Company', 'Custom Software Development'],
        summary: 'Deep IT Labs delivered a custom, integrated ERP and CRM ecosystem optimizing supply chains, dispatch operations, and client communication workflows for a logistics company.',
        challenge: 'The client was utilizing three disconnected software products to manage customer pipelines, warehouse stock, and dispatch scheduling, resulting in massive human errors, double bookings, and data inconsistencies.',
        solution: 'We executed a custom software development strategy, consolidating their operations into one unified ERP & CRM portal. The web platform is optimized for mobile browser access, letting dispatchers check routes, warehouse managers track inventory live, and sales teams access unified customer records.',
        architecture: [
            { title: 'Unified Data Core', desc: 'Centralized database with automated event triggers and transaction rollbacks to prevent scheduling collisions.' },
            { title: 'Responsive Dispatcher Hub', desc: 'A real-time dispatch dashboard featuring leaflet map APIs, route planning, and automated text messaging.' },
            { title: 'Secure Admin Permissions', desc: 'Strict Role-Based Access Control (RBAC) ensuring employees access only their specific departmental portals.' }
        ],
        results: [
            'Eliminated data sync errors entirely by unifying ERP and CRM databases.',
            'Reduced dispatch scheduling operations time by 55%.',
            'Boosted overall warehouse dispatch efficiency by 35% within 90 days of rollout.'
        ]
    }
];

const CaseStudies = () => {
    const [selectedId, setSelectedId] = useState(CASE_STUDIES_DATA[0].id);
    const activeStudy = CASE_STUDIES_DATA.find(item => item.id === selectedId) || CASE_STUDIES_DATA[0];

    // JSON-LD Structured Data for AIO / SEO
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Deep IT Labs Case Studies",
        "description": "Read in-depth case studies by Deep IT Labs, a premier software development, MERN Stack, AI, and SaaS development company.",
        "itemListElement": CASE_STUDIES_DATA.map((study, idx) => ({
            "@type": "ListItem",
            "position": idx + 1,
            "item": {
                "@type": "CreativeWork",
                "name": study.title,
                "headline": study.subtitle,
                "alternativeHeadline": study.summary,
                "author": {
                    "@type": "Organization",
                    "name": "Deep IT Labs",
                    "url": "https://www.deepitlabs.in"
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "Deep IT Labs",
                    "logo": "https://www.deepitlabs.in/logo.png"
                },
                "genre": study.industry,
                "description": study.challenge
            }
        }))
    };

    return (
        <div className="relative bg-[#06070D] text-white min-h-screen py-20 px-6 md:px-12 overflow-hidden">
            <SEO
                title="Case Studies & Architecture | Deep IT Labs India"
                description="Explore real-world software engineering case studies. Learn how Deep IT Labs, a leading Custom Software Development company, builds custom ERP, CRM, MERN Stack, and AI SaaS applications."
                keywords="Deep IT Labs, DeepITLabs, Deep IT Labs Nashik, Deep IT Labs India, MERN Stack Development, React Development Company, Node.js Development Company, ERP Development Company, CRM Development Company, AI Development Company, SaaS Development Company, Custom Software Development, Software Company in Nashik, Web Development Company Nashik, IT Company Nashik, MERN Developer Nashik"
                url="https://www.deepitlabs.in/case-studies"
            >
                <script type="application/ld+json">
                    {JSON.stringify(schemaData)}
                </script>
            </SEO>

            {/* Background elements */}
            <div 
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(to right, #8B7CFF 1px, transparent 1px), linear-gradient(to bottom, #8B7CFF 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                }}
            />
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.06)_0%,transparent_75%)] blur-3xl pointer-events-none" />
            <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(139,124,255,0.05)_0%,transparent_75%)] blur-3xl pointer-events-none" />

            <div className="relative max-w-7xl mx-auto z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <span className="inline-flex items-center gap-1.5 bg-indigo-500/10 text-indigo-300 text-[10px] font-mono font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-indigo-500/20">
                        <Briefcase className="w-3.5 h-3.5" /> Proven Engineering Excellence
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white to-violet-300 bg-clip-text text-transparent">
                        Technical Case Studies
                    </h1>
                    <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                        Deep IT Labs is a professional <strong className="text-indigo-300">Custom Software Development</strong> agency and <strong className="text-indigo-300">IT Company Nashik</strong>. 
                        We build highly scalable software architectures for clients in India and globally. Explore our real-world projects below.
                    </p>
                </div>

                {/* Tab Navigation */}
                <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-16">
                    {CASE_STUDIES_DATA.map((study) => (
                        <button
                            key={study.id}
                            onClick={() => setSelectedId(study.id)}
                            className={`px-5 py-3 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 border cursor-pointer ${
                                selectedId === study.id
                                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                                    : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                            }`}
                        >
                            {study.title}
                        </button>
                    ))}
                </div>

                {/* Active Case Study Detail Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
                    
                    {/* Left: Summary and Statistics Card */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-slate-900/40 border border-slate-900 rounded-3xl p-8 backdrop-blur-xl space-y-6">
                            <div>
                                <span className="text-indigo-400 text-[10px] font-mono uppercase tracking-wider block mb-2">Project Client</span>
                                <h3 className="text-xl font-bold text-white">{activeStudy.client}</h3>
                                <p className="text-slate-400 text-xs mt-1">{activeStudy.industry}</p>
                            </div>

                            <hr className="border-slate-800/80" />

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <span className="text-slate-500 text-[10px] font-mono uppercase block mb-1">Duration</span>
                                    <span className="text-sm font-semibold text-white flex items-center gap-1.5">
                                        <Calendar className="w-3.5 h-3.5 text-indigo-400" /> {activeStudy.duration}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-slate-500 text-[10px] font-mono uppercase block mb-1">Team Size</span>
                                    <span className="text-sm font-semibold text-white flex items-center gap-1.5">
                                        <Users className="w-3.5 h-3.5 text-indigo-400" /> {activeStudy.teamSize}
                                    </span>
                                </div>
                            </div>

                            <hr className="border-slate-800/80" />

                            {/* Large Metric Display */}
                            <div className="bg-indigo-950/20 border border-indigo-900/30 rounded-2xl p-6 text-center">
                                <span className="text-indigo-400 text-4xl font-extrabold block mb-1">
                                    {activeStudy.metric}
                                </span>
                                <span className="text-slate-400 text-xs font-medium uppercase tracking-wider block">
                                    {activeStudy.metricLabel}
                                </span>
                            </div>

                            {/* Technologies Used */}
                            <div className="space-y-3">
                                <span className="text-slate-500 text-[10px] font-mono uppercase block">Core Competencies</span>
                                <div className="flex flex-wrap gap-2">
                                    {activeStudy.tags.map((tag) => (
                                        <span key={tag} className="bg-slate-950 border border-slate-800 text-indigo-300 text-[11px] px-3 py-1.5 rounded-lg font-medium">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Technical Narrative */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Title and Summary */}
                        <div className="space-y-4">
                            <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
                                {activeStudy.subtitle}
                            </h2>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                {activeStudy.summary}
                            </p>
                        </div>

                        {/* Challenge Section */}
                        <div className="bg-slate-900/20 border border-slate-900/80 rounded-2xl p-6 md:p-8 space-y-4">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-red-500 rounded-full" /> The Technical Challenge
                            </h3>
                            <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                                {activeStudy.challenge}
                            </p>
                        </div>

                        {/* Solution Section */}
                        <div className="bg-slate-900/20 border border-slate-900/80 rounded-2xl p-6 md:p-8 space-y-4">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-emerald-500 rounded-full" /> Engineered Solution
                            </h3>
                            <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                                {activeStudy.solution}
                            </p>
                        </div>

                        {/* Architecture breakdown */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <Cpu className="w-5 h-5 text-indigo-400" /> Architecture Breakdown
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {activeStudy.architecture.map((arch, idx) => (
                                    <div key={idx} className="bg-slate-900/30 border border-slate-900 rounded-xl p-5 space-y-2">
                                        <h4 className="text-sm font-semibold text-white flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> {arch.title}
                                        </h4>
                                        <p className="text-slate-400 text-xxs leading-relaxed">
                                            {arch.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Results list */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <BarChart3 className="w-5 h-5 text-indigo-400" /> Business & Technical Outcomes
                            </h3>
                            <div className="space-y-3">
                                {activeStudy.results.map((result, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" />
                                        <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                                            {result}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CaseStudies;
