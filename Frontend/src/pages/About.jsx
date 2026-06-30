import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    const values = [
        { title: 'Quality First', desc: 'We deliver clean, scalable, and optimized code that complies with standard architectural patterns.', icon: '🏆' },
        { title: 'Data Security', desc: 'Vulnerability shielding, encryption, and parameter sanitization are engineered directly in the root logic.', icon: '🛡️' },
        { title: 'Agile & Collaborative', desc: 'Weekly iterations, live stage reviews, and direct Slack communication keep us fully aligned.', icon: '🤝' },
        { title: 'Client Centricity', desc: 'Every feature is modeled to solve a real business problem, optimizing workflows and conversions.', icon: '🎯' }
    ];

    return (
        <div className="bg-slate-950 text-white min-h-screen py-16 px-6 md:px-12">
            <div className="max-w-5xl mx-auto flex flex-col gap-16">
                
                {/* Introduction Banner */}
                <div className="flex flex-col gap-6 text-center md:text-left md:flex-row items-center justify-between">
                    <div className="flex flex-col gap-4 max-w-2xl">
                        <span className="text-indigo-400 text-sm font-semibold tracking-wider uppercase">Our Brand Narrative</span>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white to-indigo-400 bg-clip-text text-transparent">
                            Deep IT Labs
                        </h1>
                        <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                            Deep IT Labs was founded by senior full-stack software architects with the vision of building premium web applications, bespoke CRM platforms, and database ecosystems that operate at scale. We serve corporate partners and startups globally.
                        </p>
                    </div>
                </div>

                {/* Mission & Vision Split Card */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-slate-900/40 border border-slate-900 p-8 rounded-xl flex flex-col gap-4">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <span className="text-2xl">🚀</span> Our Mission
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            To empower companies with customized, secure, and production-ready digital products. We eliminate technical debt by writing modular, scalable architectures and performing strict validation logic before deployment.
                        </p>
                    </div>
                    <div className="bg-slate-900/40 border border-slate-900 p-8 rounded-xl flex flex-col gap-4">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <span className="text-2xl">👁️</span> Our Vision
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            To become a global leader in bespoke web engineering and MERN stack systems. We aim to bridge the gap between design vision and database persistence with clean software engineering.
                        </p>
                    </div>
                </div>

                {/* Core Values Section */}
                <div className="flex flex-col gap-12">
                    <div className="text-center flex flex-col gap-3">
                        <h2 className="text-2xl md:text-3xl font-bold">Our Core Values</h2>
                        <p className="text-gray-500 text-sm max-w-md mx-auto">
                            The architectural pillars that define our agency and drive our daily dev cycles.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {values.map((v, index) => (
                            <div key={index} className="bg-slate-900/20 border border-slate-900 p-6 rounded-xl text-center">
                                <div className="text-3xl mb-3">{v.icon}</div>
                                <h4 className="text-base font-bold text-white mb-2">{v.title}</h4>
                                <p className="text-gray-500 text-xs leading-relaxed">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Call To Action */}
                <div className="text-center py-8">
                    <Link to="/contact" className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3 rounded-lg shadow-lg shadow-indigo-500/20 transition-all">
                        Work With Us
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default About;
