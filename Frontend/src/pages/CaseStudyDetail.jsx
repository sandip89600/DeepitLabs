import React from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../seo/SEO';
import { ArrowLeft, CheckCircle2, Cpu, FileText, Database, Shield, Zap, AlertCircle } from 'lucide-react';

const CASE_STUDIES_DETAIL = {
    'haajari-app': {
        title: 'Haajari App: Attendance Tracking Mobile App',
        client: 'Local Nashik Contractors',
        industry: 'Field Worker Attendance & Operations',
        metric: '98%',
        metricLabel: 'Payroll Processing Accuracy',
        tag: 'Mobile App & MERN',
        keywords: 'MERN Developer Nashik, Software Company in Nashik, Web Development Company Nashik, IT Company Nashik',
        desc: 'How Deep IT Labs engineered a custom attendance tracking ecosystem with geolocation fences, offline database sync, and real-time dashboard analytics for regional businesses.',
        challenge: 'Local contracting agencies struggled to track workers scattered across multiple remote construction locations. Traditional biometric devices were offline, and manual paper spreadsheets led to payroll fraud, double entries, and massive administrative overhead.',
        stack: ['React Native', 'Node.js', 'Express', 'MongoDB Atlas', 'Redis', 'Geofencing APIs'],
        solution: 'We built Haajari App—a lightweight React Native application with offline SQLite databases. The app locks worker attendance log-ins to designated coordinates using geofencing. On-site sync runs immediately upon connection. On the server side, a Node.js API aggregates punches, calculating payroll, overtime, and field allowances instantly.',
        results: [
            'Eliminated payroll time fraud completely using strict GPS geofencing.',
            'Reduced payroll processing time from 4 days to 15 minutes (a 99.7% administration drop).',
            'Sustained 5,000+ daily worker punches across 40 distinct building sites with zero lag.'
        ]
    },
    'deepitlabs-platform': {
        title: 'DeepITLabs Platform: Unified Learning Dashboard',
        client: 'Deep IT Academy',
        industry: 'EdTech & Professional Training',
        metric: '25K+',
        metricLabel: 'Students Trained',
        tag: 'SaaS & MERN Stack',
        keywords: 'MERN Stack Development, React Development Company, Node.js Development Company, Custom Software Development',
        desc: 'Deep IT Labs built a multi-tenant academy platform providing course modules, mentor review systems, secure payments, and database monitoring tools.',
        challenge: 'Operating a local coding academy required coordinating student enrollments, video lectures, coding challenges, payments, and teacher assignments. Scattered tools resulted in student dropouts and inconsistent feedback cycles.',
        stack: ['React 19', 'Zustand', 'Mongoose', 'Express', 'Vimeo API', 'Stripe Payments'],
        solution: 'As a top React Development Company, we structured a clean multi-role dashboard. Students access interactive learning sheets, watch secure streamed video components, and submit code tasks. Mentors review code within an admin portal with syntax highlighting. Payments are automated using multi-tier subscription models.',
        results: [
            'Boosted course completion rates by 45% through interactive review tools.',
            'Unified billing, reviews, and learning libraries into one single platform.',
            'Scaled database connections to support thousands of active students simultaneously.'
        ]
    },
    'construction-management-system': {
        title: 'B2B Construction Management System',
        client: 'Vanguard Builders India',
        industry: 'Construction & Real Estate',
        metric: '+35%',
        metricLabel: 'Site Coordination Efficiency',
        tag: 'ERP & Custom Software',
        keywords: 'ERP Development Company, CRM Development Company, Custom Software Development, Software Company in Nashik',
        desc: 'Deep IT Labs engineered an enterprise ERP dashboard for construction companies to control raw material invoices, labor logs, equipment scheduling, and contractor billing.',
        challenge: 'Managing massive building projects across India without real-time coordination meant site engineers had to physically report material deficits or equipment rentals, resulting in delivery halts, project delays, and budget breaches.',
        stack: ['Node.js', 'MongoDB', 'React', 'AWS S3', 'Node-Mailer', 'Chart.js'],
        solution: 'We executed a custom ERP development strategy, constructing a mobile-responsive site control portal. Supervisors upload stock audits, rent heavy machinery, and request material dispatch approvals. The system alerts procurement leads instantly with automated invoices, mapping costs against project budgets.',
        results: [
            'Reduced heavy machinery downtime by 30% through predictive scheduling.',
            'Prevented budget overruns with real-time material price trackers.',
            'Improved cross-department site collaboration efficiency by 35%.'
        ]
    }
};

const CaseStudyDetail = () => {
    const { slug } = useParams();
    const study = CASE_STUDIES_DETAIL[slug];

    if (!study) {
        return (
            <div className="bg-slate-950 text-white min-h-screen py-24 px-6 text-center space-y-4">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
                <h1 className="text-2xl font-bold">Case Study Not Found</h1>
                <p className="text-slate-400">The project case study you are looking for does not exist or has been relocated.</p>
                <Link to="/case-studies" className="inline-flex items-center gap-2 text-indigo-400 hover:text-white transition font-semibold">
                    <ArrowLeft className="w-4 h-4" /> Back to Case Studies
                </Link>
            </div>
        );
    }

    // Dynamic schema for the individual case study
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "CaseStudy",
        "name": study.title,
        "description": study.desc,
        "about": {
            "@type": "Thing",
            "name": study.industry
        },
        "author": {
            "@type": "Organization",
            "name": "Deep IT Labs",
            "url": "https://www.deepitlabs.in"
        },
        "client": {
            "@type": "Organization",
            "name": study.client
        }
    };

    return (
        <div className="relative bg-[#06070D] text-white min-h-screen py-20 px-6 md:px-12 overflow-hidden">
            <SEO 
                title={`${study.title} | Deep IT Labs`}
                description={study.desc}
                keywords={`${study.keywords}, ${study.tag}, Case Study, Deep IT Labs`}
                url={`https://www.deepitlabs.in/case-studies/${slug}`}
            >
                <script type="application/ld+json">
                    {JSON.stringify(schemaData)}
                </script>
            </SEO>

            {/* Background details */}
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.04)_0%,transparent_70%)] blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 left-10 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(139,124,255,0.04)_0%,transparent_70%)] blur-3xl pointer-events-none" />

            <div className="relative max-w-4xl mx-auto z-10 space-y-10">
                
                {/* Back button */}
                <Link to="/case-studies" className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-400 transition text-xs font-semibold uppercase tracking-wider">
                    <ArrowLeft className="w-4 h-4" /> Back to Case Studies
                </Link>

                {/* Title Section */}
                <div className="space-y-4">
                    <span className="bg-indigo-500/10 text-indigo-400 text-xs font-semibold px-3 py-1.5 rounded-lg border border-indigo-500/15">
                        {study.tag}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight text-white mt-4">
                        {study.title}
                    </h1>
                    <p className="text-slate-400 text-base md:text-lg">
                        {study.desc}
                    </p>
                </div>

                {/* Specs and Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-6">
                        <span className="text-slate-500 text-[10px] uppercase font-mono block mb-1">Industry Partner</span>
                        <span className="text-sm font-semibold text-white">{study.client}</span>
                        <p className="text-[11px] text-slate-500 mt-0.5">{study.industry}</p>
                    </div>
                    <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-6">
                        <span className="text-slate-500 text-[10px] uppercase font-mono block mb-1">Key Performance Metric</span>
                        <span className="text-xl font-bold text-indigo-400 block">{study.metric}</span>
                        <span className="text-[11px] text-slate-500">{study.metricLabel}</span>
                    </div>
                    <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-6">
                        <span className="text-slate-500 text-[10px] uppercase font-mono block mb-1">Core Tech Stack</span>
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                            {study.stack.slice(0, 3).map((item) => (
                                <span key={item} className="bg-slate-950 text-indigo-300 text-[9px] px-2 py-1 rounded border border-slate-800">
                                    {item}
                                </span>
                            ))}
                            {study.stack.length > 3 && (
                                <span className="text-[9px] text-slate-500 self-center">+{study.stack.length - 3} more</span>
                            )}
                        </div>
                    </div>
                </div>

                <hr className="border-slate-900" />

                {/* Detailed Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* Left details */}
                    <div className="md:col-span-2 space-y-8">
                        <section className="space-y-3">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <FileText className="w-5 h-5 text-indigo-400" /> Project Background & Challenges
                            </h2>
                            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                                {study.challenge}
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <Cpu className="w-5 h-5 text-indigo-400" /> Our Engineered Solution
                            </h2>
                            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                                {study.solution}
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <Zap className="w-5 h-5 text-indigo-400" /> Results & Impact
                            </h2>
                            <div className="space-y-3">
                                {study.results.map((res, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" />
                                        <p className="text-slate-300 text-sm">{res}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Tech Specs list */}
                    <div className="md:col-span-1">
                        <div className="bg-slate-900/20 border border-slate-900 rounded-2xl p-6 sticky top-24 space-y-6">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                <Database className="w-4 h-4 text-indigo-400" /> Full Tech Stack
                            </h3>
                            <ul className="space-y-2.5 text-xs text-slate-300">
                                {study.stack.map((item) => (
                                    <li key={item} className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> {item}
                                    </li>
                                ))}
                            </ul>

                            <hr className="border-slate-800" />

                            <div className="space-y-3">
                                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-indigo-400" /> Security Standards
                                </h4>
                                <p className="text-[11px] text-slate-500 leading-relaxed">
                                    All data points are encrypted in transit and at rest. Strict RBAC policies govern APIs to protect tenant assets.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default CaseStudyDetail;
