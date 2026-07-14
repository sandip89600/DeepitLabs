import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../seo/SEO';
import { Sparkles, HeartPulse, Building2, GraduationCap, ShoppingBag, ArrowRight } from 'lucide-react';

const INDUSTRIES_DATA = [
    {
        slug: 'healthcare',
        title: 'Healthcare & Biotech',
        desc: 'HIPAA-compliant patient portals, doctor scheduling dashboards, dynamic medical inventory databases, and real-time biometric integrations.',
        icon: HeartPulse,
        color: 'from-emerald-500/20 to-teal-500/20',
        borderColor: 'hover:border-emerald-500/30',
        iconColor: 'text-emerald-400'
    },
    {
        slug: 'construction',
        title: 'Construction & Real Estate',
        desc: 'Mobile contractor punch applications, structural material invoice auditors, project Gantt planners, and real-time inventory management ERPs.',
        icon: Building2,
        color: 'from-amber-500/20 to-orange-500/20',
        borderColor: 'hover:border-amber-500/30',
        iconColor: 'text-amber-400'
    },
    {
        slug: 'education',
        title: 'Education & Academies',
        desc: 'Multi-role student dashboards, video lecture management systems, secure subscription modules, and automated mentor grading panels.',
        icon: GraduationCap,
        color: 'from-indigo-500/20 to-violet-500/20',
        borderColor: 'hover:border-indigo-500/30',
        iconColor: 'text-indigo-400'
    },
    {
        slug: 'retail',
        title: 'Retail & Headless Commerce',
        desc: 'Tailored POS systems, high-speed headless checkout pipelines, central warehouse tracking panels, and customer support databases.',
        icon: ShoppingBag,
        color: 'from-rose-500/20 to-pink-500/20',
        borderColor: 'hover:border-rose-500/30',
        iconColor: 'text-rose-400'
    }
];

const Industries = () => {
    return (
        <div className="relative bg-[#06070D] text-white min-h-screen py-20 px-6 md:px-12 overflow-hidden">
            <SEO 
                title="Industries We Serve | Custom Software Solutions | Deep IT Labs India"
                description="We build tailored ERP, CRM, and SaaS architectures for Healthcare, Construction, EdTech, and Retail businesses. Partner with a top Software Company in Nashik."
                keywords="Deep IT Labs, DeepITLabs, Deep IT Labs Nashik, Custom Software Development, Software Company in Nashik, Web Development Company Nashik, IT Company Nashik"
                url="https://www.deepitlabs.in/industries"
            />

            {/* Background elements */}
            <div 
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(to right, #8B7CFF 1px, transparent 1px), linear-gradient(to bottom, #8B7CFF 1px, transparent 1px)',
                    backgroundSize: '44px 44px',
                }}
            />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.05)_0%,transparent_75%)] blur-3xl pointer-events-none" />

            <div className="relative max-w-6xl mx-auto z-10 space-y-16">
                
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto space-y-4">
                    <span className="inline-flex items-center gap-1.5 bg-indigo-500/10 text-indigo-300 text-[10px] font-mono font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-indigo-500/20">
                        <Sparkles className="w-3.5 h-3.5" /> Tailored Domain Expertise
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white to-violet-300 bg-clip-text text-transparent">
                        Industries We Empower
                    </h1>
                    <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                        Every industry faces unique workflow barriers. We design, code, and deploy custom software database portals, CRM frameworks, and secure SaaS ecosystems tailored exactly to your industry guidelines.
                    </p>
                </div>

                {/* Industries Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {INDUSTRIES_DATA.map((ind) => {
                        const IconComponent = ind.icon;
                        return (
                            <div 
                                key={ind.slug}
                                className={`group rounded-3xl bg-slate-900/30 border border-slate-900 ${ind.borderColor} p-8 flex flex-col justify-between gap-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5`}
                            >
                                <div className="space-y-4">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${ind.color} flex items-center justify-center border border-slate-800`}>
                                        <IconComponent className={`w-6 h-6 ${ind.iconColor}`} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                                        {ind.title}
                                    </h3>
                                    <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                                        {ind.desc}
                                    </p>
                                </div>

                                <Link 
                                    to={`/industries/${ind.slug}`}
                                    className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-white transition group/btn mt-2 cursor-pointer"
                                >
                                    Explore Industry Software <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                </Link>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom consult banner */}
                <div className="bg-slate-900/20 border border-slate-900 rounded-3xl p-8 text-center max-w-3xl mx-auto space-y-4">
                    <h3 className="text-xl font-bold">Need a Custom Software Solution?</h3>
                    <p className="text-slate-400 text-xs md:text-sm">
                        Consult with our software engineering team to outline a custom ERP, CRM, or client portal for your business.
                    </p>
                    <Link 
                        to="/contact" 
                        className="inline-flex bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-6 py-3 rounded-xl transition-all"
                    >
                        Schedule Architecture Call
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default Industries;
