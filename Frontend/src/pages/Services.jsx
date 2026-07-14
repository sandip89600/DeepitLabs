import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../seo/SEO';
import {
    Code,
    Layers,
    Shield,
    Smartphone,
    Database,
    Cloud,
    Check,
    HelpCircle,
    ChevronDown,
    ArrowRight,
    Sparkles
} from 'lucide-react';

const SERVICES_DATA = [
    {
        title: 'Custom Software Development',
        icon: Code,
        color: 'text-indigo-400',
        bg: 'bg-indigo-500/10',
        desc: 'Custom software systems designed to match specific operational workflows, following clean code architectural patterns.',
        features: ['Domain-Driven Design (DDD)', 'Microservice Architectures', 'Automated Testing Coverage']
    },
    {
        title: 'MERN Stack Development',
        icon: Layers,
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        desc: 'High-performance single page and server-side applications built using MongoDB, Express, React, and Node.js.',
        features: ['Optimized Mongoose Schemas', 'State Management (Zustand/Redux)', 'Stateless JWT Security']
    },
    {
        title: 'Enterprise Web Applications',
        icon: Shield,
        color: 'text-purple-400',
        bg: 'bg-purple-500/10',
        desc: 'Secure, centralized web portals integrating role-based access control, analytics pipelines, and workflow automation.',
        features: ['SAML / OpenID SSO Login', 'Detailed System Audit Logs', 'Data Aggregation & Export']
    },
    {
        title: 'Mobile App Development',
        icon: Smartphone,
        color: 'text-blue-400',
        bg: 'bg-blue-500/10',
        desc: 'Native-performance cross-platform mobile apps for iOS and Android featuring secure offline-first local storage.',
        features: ['React Native & Flutter Engines', 'Offline Database Sync', 'Biometric App Authentication']
    },
    {
        title: 'API Engineering & Gateways',
        icon: Database,
        color: 'text-cyan-400',
        bg: 'bg-cyan-500/10',
        desc: 'Secure API gateways engineered with payload compression, request sanitization, and third-party Webhook sync.',
        features: ['OpenAPI / Swagger Specs', 'JWT Stateless Auth Protocols', 'IP Rate Throttling Limits']
    },
    {
        title: 'Cloud Infrastructure & DevOps',
        icon: Cloud,
        color: 'text-pink-400',
        bg: 'bg-pink-500/10',
        desc: 'High-availability cloud deployments with automated continuous deployment pipelines and live server scaling.',
        features: ['Infrastructure as Code (IaC)', 'CI/CD Pipeline Builds', 'Docker & Kubernetes Clustering']
    }
];

const FAQS = [
    { q: 'How are custom project architectures planned?', a: 'Every project begins with a discovery session. Our technical leads design the system architecture, select the database schemas (e.g. SQL vs MongoDB), and formulate development sprints.' },
    { q: 'How is code quality and security verified?', a: 'We run automated lint checks, write extensive unit tests, verify query inputs to prevent database injections, and deploy stateless verification guards for session protection.' },
    { q: 'Can we transition from legacy systems to custom web apps?', a: 'Yes. We specialize in migratability. We construct API bridges, extract legacy databases, sanitize datasets, and deploy modern applications with zero system downtime.' }
];

const Services = () => {
    const [faqOpenIdx, setFaqOpenIdx] = useState(null);

    const toggleFaq = (idx) => {
        setFaqOpenIdx(faqOpenIdx === idx ? null : idx);
    };

    return (
        <div className="bg-[#030408] text-white min-h-screen relative py-16 overflow-hidden">
            <SEO
                title="MERN Stack, AI & SaaS Development Services | Deep IT Labs India"
                description="Deep IT Labs is an AI Development Company and SaaS Development Company. We offer MERN Stack Development, custom ERP/CRM platforms, and premium custom software development services."
                keywords="MERN Stack Development, React Development Company, Node.js Development Company, ERP Development Company, CRM Development Company, AI Development Company, SaaS Development Company, Custom Software Development, Deep IT Labs, DeepITLabs, Deep IT Labs Nashik, Deep IT Labs India"
                url="https://www.deepitlabs.in/services"
            />

            {/* Subtle background glow highlights */}
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.03)_0%,transparent_70%)] blur-3xl pointer-events-none" />

            <div className="max-w-6xl mx-auto px-5 md:px-10 space-y-24 relative z-10">

                {/* ─── 1. Header Section ─── */}
                <div className="text-center max-w-2xl mx-auto space-y-4 pt-8">
                    <span className="inline-flex items-center gap-1.5 text-[9px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
                        <Sparkles className="w-3.5 h-3.5" /> What We Deliver
                    </span>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-none">Services We Deliver</h1>
                    <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                        Custom software systems designed by veteran technical leads, following clean code architectures and security best practices.
                    </p>
                </div>

                {/* ─── 2. Services Grid (3 Columns) ─── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {SERVICES_DATA.map((s, idx) => (
                        <div 
                            key={idx} 
                            className="bg-[#090A10]/60 border border-white/5 p-6 rounded-2xl flex flex-col justify-between hover:border-indigo-500/30 transition-all duration-300 backdrop-blur-md hover:bg-slate-900/10 group min-h-[300px]"
                        >
                            <div className="space-y-4">
                                <div className={`p-3 rounded-xl ${s.bg} text-white w-fit`}>
                                    <s.icon className={`w-5 h-5 ${s.color}`} />
                                </div>
                                <h3 className="text-base font-extrabold text-white">{s.title}</h3>
                                <p className="text-slate-400 text-xs leading-relaxed">{s.desc}</p>
                            </div>

                            <div className="space-y-4 mt-6 pt-4 border-t border-white/5">
                                <ul className="space-y-1.5">
                                    {s.features.map((feat, fIdx) => (
                                        <li key={fIdx} className="flex items-center gap-2 text-[10px] text-slate-350">
                                            <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" /> {feat}
                                        </li>
                                    ))}
                                </ul>
                                <Link 
                                    to="/contact" 
                                    className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-bold"
                                >
                                    Consult Architect <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ─── 3. FAQ Accordion ─── */}
                <div className="space-y-8 max-w-3xl mx-auto">
                    <div className="text-center space-y-2">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-indigo-400 font-bold">Frequently Asked Questions</span>
                        <h2 className="text-xl md:text-2xl font-black text-white">General Information</h2>
                    </div>

                    <div className="divide-y divide-white/5 border-y border-white/5 bg-[#090A10]/20 rounded-2xl p-4">
                        {FAQS.map((faq, idx) => {
                            const isOpen = faqOpenIdx === idx;
                            return (
                                <div key={idx} className="py-4 first:pt-0 last:pb-0">
                                    <button
                                        onClick={() => toggleFaq(idx)}
                                        className="w-full flex justify-between items-center text-left py-2 text-xs md:text-sm font-bold text-white hover:text-indigo-400 transition-colors cursor-pointer"
                                    >
                                        <span className="flex items-center gap-2">
                                            <HelpCircle className="w-4 h-4 text-indigo-400" /> {faq.q}
                                        </span>
                                        <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                    {isOpen && (
                                        <div className="pl-6 pt-2 pb-1 text-slate-400 text-xs leading-relaxed animate-in slide-in-from-top-2 duration-200">
                                            {faq.a}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ─── 4. Final Consultation Callout ─── */}
                <div className="bg-gradient-to-br from-indigo-950/20 to-slate-900/40 border border-indigo-500/20 rounded-2xl p-8 text-center space-y-6 max-w-3xl mx-auto">
                    <h3 className="text-lg md:text-2xl font-extrabold text-white">Require a Custom Enterprise Application?</h3>
                    <p className="text-slate-400 text-xs md:text-sm leading-relaxed max-w-lg mx-auto">
                        We build CRM, ERP, and dashboard integrations matching your company metrics. Get in touch to schedule an architecture alignment call.
                    </p>
                    <Link 
                        to="/contact" 
                        className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-6 py-3.5 rounded-xl transition-all cursor-pointer shadow-lg shadow-indigo-500/20"
                    >
                        Consult Our Architects <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default Services;
