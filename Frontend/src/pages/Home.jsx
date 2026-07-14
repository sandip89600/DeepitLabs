import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../seo/SEO';
import { useCMSConfig } from '../services/cms';

const Home = () => {
    const { data: cms } = useCMSConfig();

    // Accordion state for FAQs
    const [faqOpen, setFaqOpen] = useState(null);

    // Active slide step for workflow process slider
    const [activeStep, setActiveStep] = useState(0);

    const toggleFaq = (index) => {
        setFaqOpen(faqOpen === index ? null : index);
    };

    const handleMouseMove = (e) => {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const degX = (y / (rect.height / 2)) * -12; // tilt angle
        const degY = (x / (rect.width / 2)) * 12;  // tilt angle
        el.style.transform = `rotateX(${degX}deg) rotateY(${degY}deg)`;
        el.style.transition = 'transform 0.1s ease-out';
    };

    const handleMouseLeave = (e) => {
        const el = e.currentTarget;
        el.style.transform = 'rotateX(0deg) rotateY(0deg)';
        el.style.transition = 'transform 0.5s ease-out';
    };

    const heroTitle = cms?.heroTitle || 'Engineering Premium Custom Web Applications';
    const heroDesc = cms?.heroDesc || 'Deep IT Labs builds production-ready software solutions, high-speed dashboards, and custom SaaS platforms designed exactly for your scale.';

    const stats = cms?.stats || [
        { value: '150+', label: 'Projects Completed' },
        { value: '98%', label: 'Client Retention' },
        { value: '15+', label: 'Years Experience' },
        { value: '40+', label: 'Core Developers' }
    ];

    const services = cms?.services || [
        {
            title: 'MERN Stack Applications',
            desc: 'Custom engineered web applications utilizing React, Node.js, Express, and MongoDB for fast, scalable solutions.',
            icon: '💻'
        },
        {
            title: 'Custom CRM & ERP Platforms',
            desc: 'Custom workforce administration software, CRM, and ERP modules tailored to optimize your workflow.',
            icon: '🏢'
        },
        {
            title: 'Dashboards & Admin Panels',
            desc: 'High-speed, responsive dashboards presenting real-time business aggregations and data metrics.',
            icon: '📊'
        },
        {
            title: 'Enterprise API Development',
            desc: 'Safe, microservices-driven RESTful APIs and integrations developed using industry-standard architectures.',
            icon: '🔗'
        },
        {
            title: 'Mobile App Engineering',
            desc: 'Seamless hybrid and native mobile apps built using React Native and Flutter for iOS and Android platforms.',
            icon: '📱'
        },
        {
            title: 'UI/UX Design Studio',
            desc: 'Visual mockups, wireframing, and premium product designs built with high focus on human-centered interaction.',
            icon: '🎨'
        }
    ];

    const steps = [
        { num: '01', title: 'Requirement Analysis', desc: 'We align on scope, deliverables, and technical architecture.', img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80' },
        { num: '02', title: 'UI/UX Prototyping', desc: 'Our design studio shapes wireframes and interactive mockups.', img: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80' },
        { num: '03', title: 'Agile Coding Cycles', desc: 'Engineers construct code in iterations with regular demo reviews.', img: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80' },
        { num: '04', title: 'QA & Vulnerability Tests', desc: 'Rigorous unit, integration, and security checks are completed.', img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80' },
        { num: '05', title: 'Deployment & Support', desc: 'Launching on secure cloud clusters with 24/7 logging monitoring.', img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80' }
    ];

    const faqs = [
        { q: 'What industries does Deep IT Labs specialize in?', a: 'We specialize in SaaS platforms, Fintech, Healthcare systems, Admin Dashboards, CRM/ERP integrations, and E-commerce platforms.' },
        { q: 'How do you handle project management?', a: 'We use the Agile Scrum framework, organizing weekly sprints, providing staging environments for updates, and maintaining Slack/Teams channels.' },
        { q: 'Can you work with our existing technical team?', a: 'Yes! We commonly co-develop alongside in-house technical teams, offering specialized support in MERN development, cloud setups, or custom migrations.' }
    ];

    const testimonials = [
        {
            name: 'Sarah Jenkins',
            role: 'CTO',
            company: 'Fintech Flow',
            avatar: 'SJ',
            content: 'Deep IT Labs engineered our core transactions dashboard. The MERN stack architecture they delivered is highly secure, fully sanitized, and responsive. Absolutely outstanding architectural standards.',
            rating: 5,
            borderColor: 'group-hover:border-violet-500/30',
            glowColor: 'group-hover:shadow-violet-500/10'
        },
        {
            name: 'David Chen',
            role: 'Founder',
            company: 'HealthSync',
            avatar: 'DC',
            content: 'The custom CRM platform built by Deep IT Labs has doubled our operations speed. Their Agile sprints and Slack-aligned updates kept us in the loop the entire time. Highly recommended.',
            rating: 5,
            borderColor: 'group-hover:border-cyan-500/30',
            glowColor: 'group-hover:shadow-cyan-500/10'
        },
        {
            name: 'Amara Okafor',
            role: 'Product Lead',
            company: 'SaaSify',
            avatar: 'AO',
            content: 'Their database and API security setup is bulletproof. The team is collaborative, highly technical, and completely eliminated our technical debt. A top-tier development agency!',
            rating: 5,
            borderColor: 'group-hover:border-emerald-500/30',
            glowColor: 'group-hover:shadow-emerald-500/10'
        }
    ];

    return (
        <div className="bg-[#06070D] text-white min-h-screen">
            <SEO
                title="Deep IT Labs | MERN Stack, AI & SaaS Development Company"
                description="Deep IT Labs is an enterprise software development company specializing in MERN Stack Development, SaaS platforms, ERP, CRM, and AI Solutions. Partner with a premier Custom Software Development company."
                keywords="Deep IT Labs, DeepITLabs, Deep IT Labs Nashik, Deep IT Labs India, MERN Stack Development, React Development Company, Node.js Development Company, ERP Development Company, CRM Development Company, AI Development Company, SaaS Development Company, Custom Software Development, Software Company in Nashik, Web Development Company Nashik, IT Company Nashik, MERN Developer Nashik, AI Search Optimization"
                url="https://www.deepitlabs.in"
                image="https://www.deepitlabs.in/og-image.png"
            />
            {/* Hero Section — layered circuit/grid background */}
            <section className="relative overflow-hidden py-28 md:py-36 px-6 md:px-12">
                {/* Background layer 1: fine grid */}
                <div
                    className="absolute inset-0 opacity-[0.07]"
                    style={{
                        backgroundImage:
                            'linear-gradient(to right, #8B7CFF 1px, transparent 1px), linear-gradient(to bottom, #8B7CFF 1px, transparent 1px)',
                        backgroundSize: '56px 56px',
                        maskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black 40%, transparent 90%)',
                        WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black 40%, transparent 90%)'
                    }}
                />

                {/* Background layer 2: circuit-trace SVG, sits behind content, faint */}
                <svg
                    className="absolute inset-0 w-full h-full opacity-[0.16] pointer-events-none"
                    preserveAspectRatio="xMidYMid slice"
                    viewBox="0 0 1200 600"
                    fill="none"
                >
                    <g stroke="#6D5AE0" strokeWidth="1">
                        <path d="M0 120 H260 V40 H520" />
                        <path d="M1200 90 H940 V200 H700 V70" />
                        <path d="M0 480 H180 V560 H460" />
                        <path d="M1200 520 H960 V420 H760 V500" />
                        <path d="M520 40 V0" />
                        <path d="M700 70 V0" />
                        <path d="M460 560 V600" />
                        <path d="M760 500 V600" />
                    </g>
                    <g fill="#2DD4BF">
                        <circle cx="260" cy="120" r="4" />
                        <circle cx="520" cy="40" r="4" />
                        <circle cx="940" cy="90" r="4" />
                        <circle cx="700" cy="200" r="4" />
                        <circle cx="180" cy="480" r="4" />
                        <circle cx="460" cy="560" r="4" />
                        <circle cx="960" cy="520" r="4" />
                        <circle cx="760" cy="420" r="4" />
                    </g>
                </svg>

                {/* Background layer 3: dual glow, violet + cyan, gives depth and color richness */}
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(124,92,252,0.22)_0%,transparent_70%)] blur-2xl" />
                <div className="absolute top-20 right-0 w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(45,212,191,0.16)_0%,transparent_70%)] blur-2xl" />

                <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-center lg:text-left">
                    <div className="lg:col-span-7 flex flex-col gap-6 relative z-20">
                        <span className="inline-flex items-center gap-2 self-center lg:self-start bg-violet-500/10 text-violet-300 text-xs font-mono font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full border border-violet-500/25">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                            Enterprise Software Engineering
                        </span>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                            {heroTitle}
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                            {heroDesc}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-4">
                            <Link to="/contact" className="bg-violet-600 hover:bg-violet-500 text-white font-semibold px-8 py-3.5 rounded-lg shadow-lg shadow-violet-500/25 transition-all text-base text-center">
                                Start Your Project
                            </Link>
                            <Link to="/portfolio" className="bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white font-semibold px-8 py-3.5 rounded-lg transition-all text-base backdrop-blur-sm text-center">
                                View Case Studies
                            </Link>
                        </div>
                    </div>

                    {/* 3D Interactive Right Column */}
                    <div className="lg:col-span-5 flex justify-center items-center relative z-20">
                        {/* 3D Wrapper */}
                        <div className="relative w-full max-w-[400px] h-[380px]" style={{ perspective: '1200px' }}>
                            {/* Card Body */}
                            <div 
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                className="relative w-full h-full rounded-2xl bg-gradient-to-br from-violet-600/10 via-slate-950/90 to-cyan-500/10 border border-white/10 p-6 flex flex-col justify-between shadow-2xl backdrop-blur-md select-none"
                                style={{ 
                                    transformStyle: 'preserve-3d',
                                    transition: 'transform 0.5s ease-out'
                                }}
                            >
                                {/* Glow behind card */}
                                <div className="absolute inset-0 rounded-2xl bg-indigo-500/5 blur-xl pointer-events-none" style={{ transform: 'translateZ(-20px)' }} />
                                
                                {/* Header / Logo Layer */}
                                <div className="flex justify-between items-center" style={{ transform: 'translateZ(40px)' }}>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/70" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                                        <div className="w-3 h-3 rounded-full bg-green-500/70" />
                                    </div>
                                    <span className="text-[10px] font-mono text-slate-500 tracking-wider">deepitlabs.in</span>
                                </div>
                                
                                {/* Server Activity Layer */}
                                <div 
                                    className="my-4 bg-slate-900/60 border border-white/5 rounded-xl p-4 flex flex-col gap-3 justify-center h-[180px]"
                                    style={{ transform: 'translateZ(30px)' }}
                                >
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-slate-400 font-mono">Server Load</span>
                                        <span className="text-emerald-400 font-bold font-mono">99.9% Uptime</span>
                                    </div>
                                    
                                    {/* Simulated charts */}
                                    <div className="flex items-end gap-1.5 h-16 pt-2">
                                        <div className="w-full bg-violet-500/20 rounded-t h-[40%] animate-pulse" />
                                        <div className="w-full bg-violet-500/40 rounded-t h-[60%]" />
                                        <div className="w-full bg-violet-500/30 rounded-t h-[50%]" />
                                        <div className="w-full bg-cyan-500/40 rounded-t h-[75%] animate-pulse" />
                                        <div className="w-full bg-cyan-500/60 rounded-t h-[90%]" />
                                        <div className="w-full bg-emerald-500/50 rounded-t h-[80%]" />
                                        <div className="w-full bg-indigo-500/40 rounded-t h-[65%]" />
                                    </div>
                                    
                                    <div className="flex justify-between items-center text-[10px] text-slate-500 border-t border-white/5 pt-2">
                                        <span>US-EAST-1</span>
                                        <span>Response: 14ms</span>
                                    </div>
                                </div>
                                
                                {/* Bottom Info Layer */}
                                <div className="flex justify-between items-center" style={{ transform: 'translateZ(20px)' }}>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Active Requests</span>
                                        <span className="text-base font-bold text-white tracking-wide">4,812 / sec</span>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30 animate-pulse">
                                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                                    </div>
                                </div>
                                
                                {/* 3D Floating Pill 1 */}
                                <div 
                                    className="absolute -top-6 -left-8 bg-slate-950/95 border border-violet-500/30 text-violet-300 text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-2xl"
                                    style={{ transform: 'translateZ(60px)' }}
                                >
                                    <span className="text-lg">🛡️</span>
                                    <span>Secure Vault</span>
                                </div>
                                
                                {/* 3D Floating Pill 2 */}
                                <div 
                                    className="absolute -bottom-6 -right-8 bg-slate-950/95 border border-cyan-500/30 text-cyan-300 text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-2xl"
                                    style={{ transform: 'translateZ(80px)' }}
                                >
                                    <span className="text-lg">⚡</span>
                                    <span>High Speed</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics */}
            <section className="border-y border-white/5 bg-[#06070D] py-12 px-6 md:px-12">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="flex flex-col gap-1">
                            <span className="text-3xl md:text-5xl font-extrabold bg-gradient-to-br from-white to-violet-300 bg-clip-text text-transparent">
                                {stat.value}
                            </span>
                            <span className="text-gray-500 text-sm font-medium">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Services Section */}
            <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="text-center mb-16 flex flex-col gap-3">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our Core Services</h2>
                    <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
                        From cloud architecture to design mockups, we engineer digital products with speed, security, and responsive layouts.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div 
                            key={index} 
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            className="group bg-white/[0.03] border border-white/5 p-8 rounded-xl hover:border-violet-500/40 hover:bg-white/[0.05] transition-all duration-300 cursor-default"
                            style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
                        >
                            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/15 to-cyan-500/10 text-2xl mb-5 group-hover:from-violet-500/25 group-hover:to-cyan-500/20 transition-all" style={{ transform: 'translateZ(20px)' }}>
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3" style={{ transform: 'translateZ(15px)' }}>{service.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed" style={{ transform: 'translateZ(10px)' }}>{service.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Process Section - Interactive Slider */}
            <section className="py-24 bg-white/[0.02] border-y border-white/5 px-6 md:px-12 relative overflow-hidden">
                {/* Background glow behind slider */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
                
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16 flex flex-col gap-3">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-semibold">Our Workflow</span>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our Development Process</h2>
                        <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
                            An optimized roadmap ensuring maximum quality controls from inception to production deployment.
                        </p>
                    </div>

                    {/* Slider Main View - Flyer Slider with Background Image */}
                    <div 
                        className="relative rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden min-h-[300px] flex flex-col justify-between group border border-white/10 transition-all duration-500 bg-slate-900"
                        style={{
                            backgroundImage: `url(${steps[activeStep].img})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        {/* Dark gradient overlay for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-slate-950/40 group-hover:via-slate-950/80 transition-all duration-300 pointer-events-none" />

                        {/* Top Indicator bar */}
                        <div className="flex gap-2 w-full mb-8 relative z-10">
                            {steps.map((_, idx) => (
                                <div 
                                    key={idx} 
                                    onClick={() => setActiveStep(idx)}
                                    className="flex-1 h-1 rounded-full cursor-pointer overflow-hidden bg-white/20"
                                >
                                    <div 
                                        className={`h-full rounded-full bg-indigo-400 transition-all duration-300 ${
                                            idx === activeStep ? 'w-full' : idx < activeStep ? 'w-full opacity-30' : 'w-0'
                                        }`}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Active Slide Content */}
                        <div className="space-y-3 relative z-10 animate-in fade-in slide-in-from-left-5 duration-300">
                            <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full w-fit block">
                                Stage {steps[activeStep].num}
                            </span>
                            <h3 className="text-2xl md:text-3xl font-black text-white leading-tight">{steps[activeStep].title}</h3>
                            <p className="text-slate-300 text-xs md:text-sm leading-relaxed max-w-2xl">{steps[activeStep].desc}</p>
                        </div>

                        {/* Navigation controls */}
                        <div className="flex justify-between items-center mt-12 relative z-10">
                            {/* Dot selectors */}
                            <div className="flex gap-2">
                                {steps.map((_, idx) => (
                                    <button 
                                        key={idx}
                                        onClick={() => setActiveStep(idx)}
                                        className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                                            idx === activeStep ? 'bg-white w-5' : 'bg-white/40 hover:bg-white/60'
                                        }`}
                                    />
                                ))}
                            </div>
                            
                            {/* Arrow actions */}
                            <div className="flex gap-2.5">
                                <button 
                                    onClick={() => setActiveStep(prev => (prev === 0 ? steps.length - 1 : prev - 1))}
                                    className="w-9 h-9 rounded-lg border border-white/10 bg-slate-950/70 hover:bg-slate-900 text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 text-sm"
                                >
                                    ←
                                </button>
                                <button 
                                    onClick={() => setActiveStep(prev => (prev === steps.length - 1 ? 0 : prev + 1))}
                                    className="w-9 h-9 rounded-lg border border-white/10 bg-slate-950/70 hover:bg-slate-900 text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 text-sm"
                                >
                                    →
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Reviews / Testimonials Section */}
            <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
                <div className="text-center mb-16 flex flex-col gap-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400/80">Testimonials</span>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">What Our Clients Say</h2>
                    <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
                        Hear from the founders, CTOs, and product leaders who build their premium software ecosystems with Deep IT Labs.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, index) => (
                        <div 
                            key={index} 
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            className={`group bg-white/[0.02] border border-white/5 p-8 rounded-2xl flex flex-col justify-between hover:bg-white/[0.04] transition-all duration-300 backdrop-blur-sm cursor-default ${t.borderColor} ${t.glowColor}`}
                            style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
                        >
                            <div className="flex flex-col gap-4">
                                {/* Stars */}
                                <div className="flex gap-1" style={{ transform: 'translateZ(15px)' }}>
                                    {[...Array(t.rating)].map((_, i) => (
                                        <span key={i} className="text-yellow-500 text-sm">★</span>
                                    ))}
                                </div>
                                
                                {/* Content */}
                                <p 
                                    className="text-slate-400 text-sm leading-relaxed"
                                    style={{ transform: 'translateZ(10px)' }}
                                >
                                    "{t.content}"
                                </p>
                            </div>

                            {/* Reviewer Meta */}
                            <div className="flex items-center gap-4 mt-6 border-t border-white/5 pt-4" style={{ transform: 'translateZ(20px)' }}>
                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-sm text-slate-300 select-none">
                                    {t.avatar}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold text-white">{t.name}</span>
                                    <span className="text-[10px] text-slate-500">{t.role}, {t.company}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQs */}
            <section className="py-24 px-6 md:px-12 max-w-3xl mx-auto border-t border-white/5">
                <div className="text-center mb-16 flex flex-col gap-3">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Frequently Asked Questions</h2>
                    <p className="text-gray-400 text-sm md:text-base">
                        Get answers to common queries regarding working with Deep IT Labs.
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    {faqs.map((faq, idx) => (
                        <div key={idx} className="bg-white/[0.03] border border-white/5 rounded-lg overflow-hidden">
                            <button
                                onClick={() => toggleFaq(idx)}
                                className="w-full text-left px-6 py-4 flex justify-between items-center text-sm md:text-base font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-inset"
                            >
                                <span>{faq.q}</span>
                                <span className="text-cyan-400 font-bold text-lg leading-none">{faqOpen === idx ? '−' : '+'}</span>
                            </button>
                            {faqOpen === idx && (
                                <div className="px-6 pb-5 pt-1 text-gray-400 text-xs md:text-sm border-t border-white/5 leading-relaxed">
                                    {faq.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="relative overflow-hidden bg-gradient-to-r from-violet-950/50 via-[#0B0E1A] to-cyan-950/30 border border-white/10 p-12 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
                    <div className="absolute -right-10 -top-10 w-56 h-56 rounded-full bg-cyan-500/10 blur-3xl" />
                    <div className="relative flex flex-col gap-2">
                        <h2 className="text-2xl md:text-3xl font-bold">Have a custom software concept?</h2>
                        <p className="text-gray-400 max-w-lg text-sm">
                            Connect with our tech leads today to scope your architecture and get a cost-estimation estimate.
                        </p>
                    </div>
                    <Link to="/contact" className="relative bg-white hover:bg-gray-100 text-[#06070D] font-bold px-8 py-3.5 rounded-lg shadow-xl shadow-violet-500/10 transition-all text-base shrink-0">
                        Get Free Estimation
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;