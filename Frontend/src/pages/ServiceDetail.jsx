import React from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../seo/SEO';
import { ArrowLeft, CheckCircle2, Shield, Settings, Code, Terminal, Activity, AlertCircle } from 'lucide-react';

const SERVICES_DETAIL = {
    'web-development': {
        title: 'Custom Web Development Services',
        tag: 'Bespoke Web Applications',
        desc: 'Construct high-speed, SEO-optimized, mobile-responsive custom websites and portals tailored to rank and convert in 2026.',
        keywords: 'Web Development Company Nashik, Custom Software Development, Software Company in Nashik',
        summary: 'Deep IT Labs designs and codes premium websites, administrative portals, and headless CMS frameworks with micro-animations and custom styling systems.',
        blueprint: 'We bypass template limitations by engineering layouts utilizing modern standards like Vite, Tailwind, and React. All assets are compressed, scripts are lazy-loaded, and static metadata headers are customized to deliver sub-second performance.',
        tech: ['HTML5 & CSS3', 'React / Next.js', 'Vite & ESBuild', 'Tailwind CSS', 'Headless CMS', 'SEO Optimization'],
        features: [
            { name: 'Responsive Design Studio', desc: 'Interfaces built with precise CSS breakpoints to look perfect on desktops, tablets, and phones.' },
            { name: 'Headless CMS Integrations', desc: 'Decoupled admin content dashboards letting your team update copywriting without touching code files.' },
            { name: 'Core Web Vitals Boost', desc: 'Optimization of Cumulative Layout Shift (CLS) and Largest Contentful Paint (LCP) for Google ranking.' }
        ],
        results: [
            'Achieved sub-500ms First Contentful Paint (FCP) on core marketing sites.',
            'Increased search engine index rates by 70% with semantic HTML5 tags.',
            'Doubled visitor conversion ratios through intuitive navigation and visual hierarchies.'
        ]
    },
    'mern-development': {
        title: 'MERN Stack Development Solutions',
        tag: 'Full-Stack JS Applications',
        desc: 'Scalable web platforms engineered using MongoDB database pipelines, Express routers, React interfaces, and Node.js backend clusters.',
        keywords: 'MERN Stack Development, React Development Company, Node.js Development Company, MERN Developer Nashik',
        summary: 'We deliver unified JavaScript ecosystems with real-time operations, safe JWT authentications, and compound database indexes.',
        blueprint: 'We construct full-stack MERN products by decoupling the React frontend client from the Express/Node.js API servers. Database clusters run on dedicated MongoDB Atlas systems with automated event loops and sanitization schemas.',
        tech: ['React 19 & Zustand', 'Node.js & Express 5', 'MongoDB Atlas', 'Redis Caching', 'JSON Web Tokens', 'Mongoose ODM'],
        features: [
            { name: 'Decoupled API Architectures', desc: 'Highly secure, RESTful backend microservices separating layout layers from core system logic.' },
            { name: 'MongoDB Schema Optimization', desc: 'Compound database indexing and aggregation pipelines tailored to prevent read/write locks.' },
            { name: 'Zustand State Containers', desc: 'Lightweight client state management keeping page rerenders to an absolute minimum.' }
        ],
        results: [
            'Sustained 500k+ daily database calls with 99.99% system uptime.',
            'Reduced server response latency from 2s to 120ms through Redis caching.',
            'Delivered custom MERN dashboards to global clients with zero database lockouts.'
        ]
    },
    'erp-development': {
        title: 'Enterprise ERP System Development',
        tag: 'Operations & Management',
        desc: 'Custom Enterprise Resource Planning (ERP) databases, supply chain controls, raw material logs, and dispatch map scheduling.',
        keywords: 'ERP Development Company, Custom Software Development, Software Company in Nashik, IT Company Nashik',
        summary: 'Deep IT Labs engineers unified ERP ecosystems, consolidating dispatching, material scheduling, inventory levels, and automated invoicing.',
        blueprint: 'Our custom ERP development builds localized data structures, role permissions (RBAC), and transactional database triggers to guarantee that material flows and dispatch entries run without scheduling collisions.',
        tech: ['React / Express', 'MongoDB / SQL', 'MapBox & Geolocation', 'Automated Invoicing APIs', 'Role-Based Access Control', 'Node-Mailer'],
        features: [
            { name: 'Supply Chain Tracking', desc: 'Audit trails tracking raw resources from initial shipping dispatch down to local warehouse storage.' },
            { name: 'Dispatcher Map Boards', desc: 'Real-time dispatch controls routing site deliveries, scheduling fleet runs, and logging driver times.' },
            { name: 'Role Permission Logs', desc: 'Granular admin rules restricting resource reports to procurement leads and billing coordinators.' }
        ],
        results: [
            'Eliminated inventory discrepancies entirely across multiple storage hubs.',
            'Reduced scheduler dispatch routing workloads by 50% via maps API integrations.',
            'Boosted team resource alignment efficiency by 35% within 90 days.'
        ]
    },
    'crm-development': {
        title: 'Bespoke CRM Software Engineering',
        tag: 'Sales & Customer Portals',
        desc: 'Customer Relationship Management (CRM) lead dashboards, secure client support systems, and automated email/WhatsApp integrations.',
        keywords: 'CRM Development Company, Custom Software Development, Web Development Company Nashik, IT Company Nashik',
        summary: 'We build tailored CRM platforms to capture sales opportunities, track client interactions, and streamline support desks.',
        blueprint: 'We integrate custom CRM dashboards directly with your communication systems. Leads from email, forms, and messaging portals compile into a unified database, notifying agents and tracking client histories securely.',
        tech: ['React Client', 'Node.js Express', 'MongoDB Atlas', 'Stripe Payments', 'Twilio API', 'SendGrid Integration'],
        features: [
            { name: 'Sales Pipeline Consoles', desc: 'Drag-and-drop opportunity cards tracking client progress from cold lead to active partner.' },
            { name: 'Unified Support Desks', desc: 'Consolidated customer messaging queues logging conversations, support levels, and response histories.' },
            { name: 'Webhook Notifications', desc: 'Real-time alert integrations pushing leads directly to Slack channels and agent dashboards.' }
        ],
        results: [
            'Zero sales leads lost by replacing spreadsheets with centralized databases.',
            'Reduced support ticket resolution times by 40% with unified customer dashboards.',
            'Improved overall conversion metrics by 25% with automated tracking loops.'
        ]
    },
    'ai-development': {
        title: 'Custom AI & SaaS Integration Services',
        tag: 'Artificial Intelligence Solutions',
        desc: 'Deploy custom Large Language Model (LLM) agents, semantic vector databases, and multi-tenant billing SaaS products.',
        keywords: 'AI Development Company, SaaS Development Company, Custom Software Development, IT Company Nashik',
        summary: 'Deep IT Labs integrates modern NLP frameworks, builds cognitive agents, and compiles multi-tenant SaaS dashboards.',
        blueprint: 'We deploy secure AI integrations by hosting private vector databases and connecting them to generative agent pipelines. We build multi-tenant SaaS wrappers handling subscription metrics, client isolation, and billing APIs.',
        tech: ['FastAPI & Node.js', 'LangChain / LLMs', 'Pinecone / Qdrant Vector DBs', 'React 19 Frontend', 'Stripe Billing Webhooks', 'Docker Containers'],
        features: [
            { name: 'Semantic Retrieval (RAG)', desc: 'Knowledge databases search systems parsing thousands of PDFs and documents in milliseconds.' },
            { name: 'Multi-Tenant SaaS Controls', desc: 'Secure database tenant routing isolating client documents, user seats, and custom configurations.' },
            { name: 'Automated Agent Workflows', desc: 'Background workers that parse customer intake forms, update CRM states, and dispatch updates.' }
        ],
        results: [
            'Automatically resolved 70%+ of simple support tickets with cognitive retrieval.',
            'Scaled multi-tenant SaaS frameworks supporting 1,000+ distinct businesses.',
            'Achieved sub-100ms vector index queries for high-speed agent interactions.'
        ]
    }
};

const ServiceDetail = () => {
    const { serviceSlug } = useParams();
    const service = SERVICES_DETAIL[serviceSlug];

    if (!service) {
        return (
            <div className="bg-slate-950 text-white min-h-screen py-24 px-6 text-center space-y-4">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
                <h1 className="text-2xl font-bold">Service Not Found</h1>
                <p className="text-slate-400">The service vertical you are looking for does not exist or has been relocated.</p>
                <Link to="/services" className="inline-flex items-center gap-2 text-indigo-400 hover:text-white transition font-semibold">
                    <ArrowLeft className="w-4 h-4" /> Back to Services
                </Link>
            </div>
        );
    }

    return (
        <div className="relative bg-[#06070D] text-white min-h-screen py-20 px-6 md:px-12 overflow-hidden">
            <SEO 
                title={`${service.title} | Deep IT Labs India`}
                description={service.desc}
                keywords={`${service.keywords}, ${service.tag}, Deep IT Labs`}
                url={`https://www.deepitlabs.in/services/${serviceSlug}`}
            />

            {/* Background elements */}
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.04)_0%,transparent_70%)] blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 left-10 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(139,124,255,0.04)_0%,transparent_70%)] blur-3xl pointer-events-none" />

            <div className="relative max-w-4xl mx-auto z-10 space-y-10">
                
                {/* Back button */}
                <Link to="/services" className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-400 transition text-xs font-semibold uppercase tracking-wider">
                    <ArrowLeft className="w-4 h-4" /> Back to Services
                </Link>

                {/* Title Section */}
                <div className="space-y-4">
                    <span className="bg-indigo-500/10 text-indigo-400 text-xs font-semibold px-3 py-1.5 rounded-lg border border-indigo-500/15">
                        {service.tag}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight text-white mt-4">
                        {service.title}
                    </h1>
                    <p className="text-slate-400 text-base md:text-lg">
                        {service.summary}
                    </p>
                </div>

                <hr className="border-slate-900" />

                {/* Main details grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* Left: Blueprint and Features */}
                    <div className="md:col-span-2 space-y-8">
                        <section className="space-y-3">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <Terminal className="w-5 h-5 text-indigo-400" /> Technical Blueprint
                            </h2>
                            <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                                {service.blueprint}
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <Code className="w-5 h-5 text-indigo-400" /> Core Features We Deliver
                            </h2>
                            <div className="grid grid-cols-1 gap-4">
                                {service.features.map((feat, index) => (
                                    <div key={index} className="bg-slate-900/30 border border-slate-900 rounded-xl p-5 space-y-2">
                                        <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                                            <span className="w-1.5 h-4 bg-indigo-500 rounded" /> {feat.name}
                                        </h4>
                                        <p className="text-slate-400 text-xs leading-relaxed">
                                            {feat.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right: Tech Specs and Outcomes */}
                    <div className="md:col-span-1">
                        <div className="bg-slate-900/40 border border-slate-900 rounded-3xl p-6 space-y-6">
                            
                            {/* Tech stack */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                    <Settings className="w-4 h-4 text-indigo-400" /> Technology Tools
                                </h3>
                                <div className="flex flex-wrap gap-1.5">
                                    {service.tech.map((item) => (
                                        <span key={item} className="bg-slate-950 text-indigo-300 text-[10px] px-2.5 py-1.5 rounded border border-slate-800 font-mono">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <hr className="border-slate-800" />

                            {/* Outcomes */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                    <Activity className="w-4 h-4 text-indigo-400" /> Service Metrics
                                </h3>
                                <div className="space-y-3.5">
                                    {service.results.map((res, idx) => (
                                        <div key={idx} className="flex items-start gap-2.5">
                                            <CheckCircle2 className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                                            <p className="text-slate-300 text-xs leading-relaxed">{res}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <hr className="border-slate-800" />

                            <div className="space-y-3">
                                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-indigo-400" /> Quality Assurance
                                </h4>
                                <p className="text-[11px] text-slate-500 leading-relaxed">
                                    All codes pass rigorous unit, integration, and security checks before launch, ensuring stable scaling.
                                </p>
                                <Link 
                                    to="/contact" 
                                    className="block text-center bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold py-2.5 rounded-xl transition"
                                >
                                    Schedule Consult
                                </Link>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default ServiceDetail;
