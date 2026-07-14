import React from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../seo/SEO';
import { ArrowLeft, CheckCircle2, ShieldAlert, Cpu, Layers, MessageSquare, AlertCircle } from 'lucide-react';

const INDUSTRIES_DETAIL = {
    'healthcare': {
        title: 'Custom Healthcare Software Solutions',
        tag: 'Healthcare & Biotech',
        desc: 'HIPAA-compliant doctor portals, patient intake dashboards, and real-time medical warehouse inventory ERP databases.',
        keywords: 'AI Development Company, SaaS Development Company, ERP Development Company, CRM Development Company',
        summary: 'Deep IT Labs engineers secure, encrypted medical platforms designed to coordinate doctors, patients, and healthcare networks efficiently.',
        challenge: 'Healthcare systems handle complex patient charts, dynamic appointments, and drug inventories. Legacy portals lack security sanitizations, fail mobile compliance, and have slow load times, resulting in patient booking dropouts and inventory tracking issues.',
        solutions: [
            { name: 'Patient Portal CRM', desc: 'Secure channels for virtual scheduling, dynamic intakes, and digital prescription tracking.' },
            { name: 'HIPAA-Compliant Database Core', desc: 'Strict access control logs, automated encryption routines, and secure client-side tokens.' },
            { name: 'Clinic Inventory ERP', desc: 'Real-time medical supply tracking and automated purchase order triggers to prevent deficit events.' }
        ],
        results: [
            '100% HIPAA and secure data compliance frameworks.',
            'Reduced doctor appointment scheduling lag by 60% with synchronized calendars.',
            'Unified patient records across 5 distinct clinics into a single cloud dashboard.'
        ]
    },
    'construction': {
        title: 'Custom Construction ERP & Dispatch Portals',
        tag: 'Construction & Real Estate',
        desc: 'B2B site inventory tracking databases, field contractor sheets, live scheduling, and material invoice auditors.',
        keywords: 'ERP Development Company, CRM Development Company, Custom Software Development, Software Company in Nashik',
        summary: 'Deep IT Labs constructs operational construction management software, letting dispatchers check routes, warehouse managers track inventory, and sales teams access unified contractor records.',
        challenge: 'Construction sites operate with disconnected spreadsheets for labor payroll, equipment rental timelines, and material supply runs, resulting in massive shipping delays, double billing, and labor invoice discrepancies.',
        solutions: [
            { name: 'Material Tracking ERP', desc: 'Consolidated audits tracing steel, concrete, and equipment usage across all remote active yards.' },
            { name: 'Geofenced Contractor Portal', desc: 'Mobile-responsive worker geofencing to log on-site presence, simplifying allowances calculation.' },
            { name: 'dispatch & Scheduling Hub', desc: 'A live tracking dashboard utilizing map APIs, route planning, and SMS dispatch feeds.' }
        ],
        results: [
            'Zero data sync mismatches between inventory logs and procurement dispatch.',
            'Reduced heavy machine downtime by 30% via synchronized rental tracking charts.',
            'Boosted site supervisor coordination efficiency by 35% within 3 months.'
        ]
    },
    'education': {
        title: 'Custom LMS & EdTech Platform Architectures',
        tag: 'Education & Academies',
        desc: 'Multi-role student dashboards, course libraries, database progress tracking, and secure subscription setups.',
        keywords: 'MERN Stack Development, React Development Company, Node.js Development Company, SaaS Development Company',
        summary: 'Deep IT Labs builds multi-tenant educational portals providing video streams, interactive reviews, and Stripe payment checkouts.',
        challenge: 'Traditional e-learning setups lack interactive student-teacher reviews, leading to dropouts. Video loading is slow on mobile viewports, and handling seat subscriptions requires complex billing webhooks.',
        solutions: [
            { name: 'Student Learning Dashboard', desc: 'High-speed React interfaces displaying course pipelines, test scores, and video chapters.' },
            { name: 'Mentor Review Console', desc: 'Dedicated portal for teachers to grade submissions, write feedback, and send inbox notifications.' },
            { name: 'automated Stripe Billing', desc: 'Multi-tier seat subscriptions, coupon systems, and secure webhook logs.' }
        ],
        results: [
            'Increased active course progress completion rates by 45% using interactive review tools.',
            'Sub-200ms initial video rendering speeds optimized for mobile browsers.',
            'Unified billing and courses databases into a secure platform serving 25k+ students.'
        ]
    },
    'retail': {
        title: 'Headless Commerce & Inventory ERP Solutions',
        tag: 'Retail & Headless Commerce',
        desc: 'Custom POS portals, high-speed headless checkouts, central warehouse panels, and customer support databases.',
        keywords: 'SaaS Development Company, Custom Software Development, Web Development Company Nashik, IT Company Nashik',
        summary: 'We build headless checkout systems, inventory administration panels, and automated shipping workflows for retail brands.',
        challenge: 'Generic e-commerce platforms struggle with slow load speeds and inflexible checkout rules. Synchronizing warehouse item balances with online retail stores requires custom real-time event triggers.',
        solutions: [
            { name: 'Headless React Checkout', desc: 'Fast, client-side store catalog rendering for high user conversions.', },
            { name: 'Warehouse Inventory ERP', desc: 'Automated triggers updating catalog stock counts as soon as items leave warehouse locations.', },
            { name: 'customer Loyalty CRM', desc: 'Central database tracking client purchases, support issues, and discount rules.' }
        ],
        results: [
            'Sub-second page transitions increasing checkout conversions by 20%.',
            'Synchronized inventory tracking across 3 warehouses in real-time.',
            'Automated 50% of shipping label prints and order routing procedures.'
        ]
    }
};

const IndustryDetail = () => {
    const { slug } = useParams();
    const industry = INDUSTRIES_DETAIL[slug];

    if (!industry) {
        return (
            <div className="bg-slate-950 text-white min-h-screen py-24 px-6 text-center space-y-4">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
                <h1 className="text-2xl font-bold">Industry Sector Not Found</h1>
                <p className="text-slate-400">The sector you are looking for does not exist or has been relocated.</p>
                <Link to="/industries" className="inline-flex items-center gap-2 text-indigo-400 hover:text-white transition font-semibold">
                    <ArrowLeft className="w-4 h-4" /> Back to Industries
                </Link>
            </div>
        );
    }

    return (
        <div className="relative bg-[#06070D] text-white min-h-screen py-20 px-6 md:px-12 overflow-hidden">
            <SEO 
                title={`${industry.title} | Deep IT Labs`}
                description={industry.desc}
                keywords={`${industry.keywords}, ${industry.tag}, Custom Software`}
                url={`https://www.deepitlabs.in/industries/${slug}`}
            />

            {/* Background elements */}
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.04)_0%,transparent_70%)] blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 left-10 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(139,124,255,0.04)_0%,transparent_70%)] blur-3xl pointer-events-none" />

            <div className="relative max-w-4xl mx-auto z-10 space-y-10">
                
                {/* Back button */}
                <Link to="/industries" className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-400 transition text-xs font-semibold uppercase tracking-wider">
                    <ArrowLeft className="w-4 h-4" /> Back to Sectors
                </Link>

                {/* Title Section */}
                <div className="space-y-4">
                    <span className="bg-indigo-500/10 text-indigo-400 text-xs font-semibold px-3 py-1.5 rounded-lg border border-indigo-500/15">
                        {industry.tag}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight text-white mt-4">
                        {industry.title}
                    </h1>
                    <p className="text-slate-400 text-base md:text-lg">
                        {industry.summary}
                    </p>
                </div>

                <hr className="border-slate-900" />

                {/* Grid layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* Left: Challenge and Solutions */}
                    <div className="md:col-span-2 space-y-8">
                        <section className="bg-slate-900/20 border border-slate-900/80 rounded-2xl p-6 md:p-8 space-y-4">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <ShieldAlert className="w-5 h-5 text-red-400" /> The Industry Challenge
                            </h3>
                            <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                                {industry.challenge}
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <Layers className="w-5 h-5 text-indigo-400" /> Tailored Tech Modules We Deploy
                            </h3>
                            <div className="grid grid-cols-1 gap-4">
                                {industry.solutions.map((sol, index) => (
                                    <div key={index} className="bg-slate-900/30 border border-slate-900 rounded-xl p-5 space-y-2">
                                        <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                                            <span className="w-1.5 h-4 bg-indigo-500 rounded" /> {sol.name}
                                        </h4>
                                        <p className="text-slate-400 text-xs leading-relaxed">
                                            {sol.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right: Key outcomes card */}
                    <div className="md:col-span-1">
                        <div className="bg-slate-900/40 border border-slate-900 rounded-3xl p-6 space-y-6">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                <Cpu className="w-4 h-4 text-indigo-400" /> Verified Outcomes
                            </h3>
                            <div className="space-y-4">
                                {industry.results.map((res, idx) => (
                                    <div key={idx} className="flex items-start gap-2.5">
                                        <CheckCircle2 className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                                        <p className="text-slate-300 text-xs leading-relaxed">{res}</p>
                                    </div>
                                ))}
                            </div>

                            <hr className="border-slate-800" />

                            <div className="space-y-3">
                                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                    <MessageSquare className="w-4 h-4 text-indigo-400" /> Sector Consulting
                                </h4>
                                <p className="text-[11px] text-slate-500 leading-relaxed">
                                    Talk directly to an engineering lead who understands the compliance, database speed, and user experience standards of your industry.
                                </p>
                                <Link 
                                    to="/contact" 
                                    className="block text-center bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold py-2.5 rounded-xl transition"
                                >
                                    Consult Lead
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default IndustryDetail;
