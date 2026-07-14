import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../seo/SEO';
import { useCMSConfig } from '../services/cms';

// Premium About Page with geometric grid background, glowing radial spots, and 3D tilting glassmorphic cards
const About = () => {
    const { data: cms } = useCMSConfig();

    const handleMouseMove = (e) => {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const degX = (y / (rect.height / 2)) * -10; // Max 10 deg tilt
        const degY = (x / (rect.width / 2)) * 10;  // Max 10 deg tilt
        el.style.transform = `rotateX(${degX}deg) rotateY(${degY}deg)`;
        el.style.transition = 'transform 0.1s ease-out';
    };

    const handleMouseLeave = (e) => {
        const el = e.currentTarget;
        el.style.transform = 'rotateX(0deg) rotateY(0deg)';
        el.style.transition = 'transform 0.5s ease-out';
    };

    const aboutMission = cms?.aboutMission || 'To empower companies with customized, secure, and production-ready digital products. We eliminate technical debt by writing modular, scalable architectures and performing strict validation logic before deployment.';
    const aboutVision = cms?.aboutVision || 'To become a global leader in bespoke web engineering and MERN stack systems. We aim to bridge the gap between design vision and database persistence with clean software engineering.';

    const localValues = cms?.aboutValues || [
        { 
            title: 'Quality First', 
            desc: 'We deliver clean, scalable, and optimized code that complies with standard architectural patterns.', 
            icon: '🏆'
        },
        { 
            title: 'Data Security', 
            desc: 'Vulnerability shielding, encryption, and parameter sanitization are engineered directly in the root logic.', 
            icon: '🛡️'
        },
        { 
            title: 'Agile Cycles', 
            desc: 'Weekly iterations, live stage reviews, and direct Slack communication keep us fully aligned.', 
            icon: '🤝'
        },
        { 
            title: 'Client Focus', 
            desc: 'Every feature is modeled to solve a real business problem, optimizing workflows and conversions.', 
            icon: '🎯'
        }
    ];

    const stylesMap = {
        0: { borderColor: 'group-hover:border-violet-500/40', glowColor: 'group-hover:shadow-violet-500/10', badgeBg: 'bg-violet-500/10', badgeText: 'text-violet-400' },
        1: { borderColor: 'group-hover:border-emerald-500/40', glowColor: 'group-hover:shadow-emerald-500/10', badgeBg: 'bg-emerald-500/10', badgeText: 'text-emerald-400' },
        2: { borderColor: 'group-hover:border-cyan-500/40', glowColor: 'group-hover:shadow-cyan-500/10', badgeBg: 'bg-cyan-500/10', badgeText: 'text-cyan-400' },
        3: { borderColor: 'group-hover:border-amber-500/40', glowColor: 'group-hover:shadow-amber-500/10', badgeBg: 'bg-amber-500/10', badgeText: 'text-amber-400' }
    };

    const values = localValues.map((v, i) => ({
        ...v,
        ...(stylesMap[i] || stylesMap[i % 4])
    }));

    return (
        <div className="relative bg-[#06070D] text-white min-h-screen py-20 px-6 md:px-12 overflow-hidden">
            <SEO
                title="About Deep IT Labs | Software Company in Nashik"
                description="Learn more about the software architects behind Deep IT Labs, a premier Software Company in Nashik, India specializing in MERN Stack, custom SaaS, and AI Development."
                keywords="Deep IT Labs, DeepITLabs, Deep IT Labs Nashik, Deep IT Labs India, Software Company in Nashik, IT Company Nashik, MERN Developer Nashik, Custom Software Development"
                url="https://www.deepitlabs.in/about"
            />

            {/* Background layer 1: grid overlay */}
            <div 
                className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(to right, #8B7CFF 1px, transparent 1px), linear-gradient(to bottom, #8B7CFF 1px, transparent 1px)',
                    backgroundSize: '56px 56px',
                }}
            />

            {/* Background layer 2: Glowing ambient meshes */}
            <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(139,124,255,0.15)_0%,transparent_70%)] blur-3xl pointer-events-none" />
            <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(45,212,191,0.12)_0%,transparent_70%)] blur-3xl pointer-events-none" />

            <div className="relative max-w-5xl mx-auto flex flex-col gap-20 z-10">
                
                {/* Introduction Banner */}
                <div className="flex flex-col gap-6 text-center md:text-left md:flex-row items-center justify-between">
                    <div className="flex flex-col gap-4 max-w-2xl">
                        <span className="inline-flex items-center gap-1.5 self-center md:self-start bg-indigo-500/10 text-indigo-300 text-[10px] font-mono font-semibold uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-indigo-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                            Our Brand Narrative
                        </span>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white to-violet-300 bg-clip-text text-transparent">
                            Deep IT Labs
                        </h1>
                        <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-3xl">
                            Deep IT Labs was founded by senior full-stack software architects with the vision of building premium web applications, bespoke CRM platforms, and database ecosystems that operate at scale. We serve corporate partners and startups globally.
                        </p>
                    </div>
                </div>

                {/* Mission & Vision Split Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ perspective: '1000px' }}>
                    
                    {/* Mission Card */}
                    <div 
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        className="group bg-white/[0.02] border border-white/5 p-8 rounded-2xl flex flex-col gap-4 shadow-xl hover:border-violet-500/30 transition-all duration-300 backdrop-blur-sm"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        <h3 
                            className="text-xl font-bold text-white flex items-center gap-3"
                            style={{ transform: 'translateZ(20px)' }}
                        >
                            <span className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center border border-violet-500/20 text-xl">🚀</span>
                            Our Mission
                        </h3>
                        <p 
                            className="text-slate-400 text-sm leading-relaxed"
                            style={{ transform: 'translateZ(10px)' }}
                        >
                            {aboutMission}
                        </p>
                    </div>

                    {/* Vision Card */}
                    <div 
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        className="group bg-white/[0.02] border border-white/5 p-8 rounded-2xl flex flex-col gap-4 shadow-xl hover:border-cyan-500/30 transition-all duration-300 backdrop-blur-sm"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        <h3 
                            className="text-xl font-bold text-white flex items-center gap-3"
                            style={{ transform: 'translateZ(20px)' }}
                        >
                            <span className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 text-xl">👁️</span>
                            Our Vision
                        </h3>
                        <p 
                            className="text-slate-400 text-sm leading-relaxed"
                            style={{ transform: 'translateZ(10px)' }}
                        >
                            {aboutVision}
                        </p>
                    </div>
                </div>

                {/* Core Values Section */}
                <div className="flex flex-col gap-12">
                    <div className="text-center flex flex-col gap-3">
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Our Core Values</h2>
                        <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
                            The architectural pillars that define our agency and drive our daily dev cycles.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {values.map((v, index) => (
                            <div 
                                key={index} 
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                className={`group bg-white/[0.02] border border-white/5 p-6 rounded-2xl text-center flex flex-col items-center gap-3 shadow-lg transition-all duration-300 backdrop-blur-sm ${v.borderColor} ${v.glowColor}`}
                                style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
                            >
                                <div 
                                    className={`w-12 h-12 rounded-xl ${v.badgeBg} ${v.badgeText} border border-white/5 flex items-center justify-center text-2xl transition-all duration-300`}
                                    style={{ transform: 'translateZ(25px)' }}
                                >
                                    {v.icon}
                                </div>
                                <h4 
                                    className="text-base font-bold text-white tracking-wide"
                                    style={{ transform: 'translateZ(15px)' }}
                                >
                                    {v.title}
                                </h4>
                                <p 
                                    className="text-slate-500 text-xs leading-relaxed"
                                    style={{ transform: 'translateZ(10px)' }}
                                >
                                    {v.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Call To Action */}
                <div className="text-center py-6">
                    <Link 
                        to="/contact" 
                        className="inline-flex items-center justify-center bg-violet-600 hover:bg-violet-500 text-white font-semibold px-8 py-3.5 rounded-lg shadow-lg shadow-violet-500/25 transition-all text-base"
                    >
                        Work With Us
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default About;
