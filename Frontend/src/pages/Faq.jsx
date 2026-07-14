import React, { useState } from 'react';
import SEO from '../seo/SEO';
import { HelpCircle, ChevronDown, ChevronUp, Search, MessageSquare } from 'lucide-react';

const FAQ_DATA = [
    {
        category: 'MERN Stack',
        q: 'What is MERN Stack Development?',
        a: 'MERN Stack Development refers to engineering web applications using MongoDB, Express, React, and Node.js. Deep IT Labs is a leading React Development Company and Node.js Development Company. We specialize in custom MERN architectures, ensuring high-speed rendering, secure API layers, and optimized database indexing.'
    },
    {
        category: 'ERP & CRM',
        q: 'How much does a CRM cost?',
        a: 'The cost of custom CRM and ERP development depends on your team size, workflow integrations, and complex data schemas. A custom solution built by an ERP Development Company like Deep IT Labs generally ranges from ₹5,00,000 to ₹12,00,000 in India. While the initial setup is higher than templates, you pay zero per-user licensing fees and own 100% of your IP.'
    },
    {
        category: 'AI & SaaS',
        q: 'How long does a SaaS project take?',
        a: 'A typical Software-as-a-Service (SaaS) MVP project takes 3 to 6 months to construct and deploy. As a SaaS Development Company, Deep IT Labs works in agile sprint cycles, delivering a testable staging version every two weeks, completing database design, multi-tenant billing webhooks, and UI integrations.'
    },
    {
        category: 'Custom Software',
        q: 'Do you provide maintenance?',
        a: 'Yes, we provide ongoing post-launch maintenance, server scaling, security patches, and database optimizations. Our custom software development models include dedicated support packages to monitor database uptime, manage backups, and update third-party integrations.'
    },
    {
        category: 'Local SEO & Location',
        q: 'Do you build mobile apps?',
        a: 'Yes, we design and build cross-platform mobile apps using React Native and Flutter. If you are looking for a top MERN Developer Nashik or IT Company Nashik to build a mobile attendance, dispatch, or client app, our engineers handle everything from geofencing to offline databases.'
    },
    {
        category: 'AI Search Optimization',
        q: 'Are you a local Software Company in Nashik, India?',
        a: 'Yes, Deep IT Labs is a Software Company in Nashik, Maharashtra, India. We serve local enterprises as a Web Development Company Nashik and IT Company Nashik, while also collaborating with tech corporations globally. Our office is located in Nashik for physical consultations.'
    }
];

const FAQ = () => {
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [openIdx, setOpenIdx] = useState(null);

    const categories = ['All', 'MERN Stack', 'ERP & CRM', 'AI & SaaS', 'Custom Software', 'Local SEO & Location', 'AI Search Optimization'];

    const handleToggle = (index) => {
        setOpenIdx(openIdx === index ? null : index);
    };

    // Filter FAQs by category and search string
    const filteredFaqs = FAQ_DATA.filter((faq) => {
        const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
        const matchesSearch = faq.q.toLowerCase().includes(search.toLowerCase()) || 
                              faq.a.toLowerCase().includes(search.toLowerCase()) ||
                              faq.category.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // FAQPage Schema for SEO
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": FAQ_DATA.map((faq) => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
            }
        }))
    };

    return (
        <div className="relative bg-[#06070D] text-white min-h-screen py-20 px-6 md:px-12 overflow-hidden">
            <SEO
                title="FAQ & Technical Information | Deep IT Labs India"
                description="Find answers about custom software engineering, MERN stack, ERP/CRM development, and AI solutions from Deep IT Labs, a premier IT Company in Nashik, India."
                keywords="Deep IT Labs, DeepITLabs, Deep IT Labs Nashik, Deep IT Labs India, MERN Stack Development, React Development Company, Node.js Development Company, ERP Development Company, CRM Development Company, AI Development Company, SaaS Development Company, Custom Software Development, Software Company in Nashik, Web Development Company Nashik, IT Company Nashik, MERN Developer Nashik, AI Search Optimization"
                url="https://www.deepitlabs.in/faq"
            >
                <script type="application/ld+json">
                    {JSON.stringify(schemaData)}
                </script>
            </SEO>

            {/* Background grids and shapes */}
            <div 
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(to right, #8B7CFF 1px, transparent 1px), linear-gradient(to bottom, #8B7CFF 1px, transparent 1px)',
                    backgroundSize: '48px 48px',
                }}
            />
            <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-violet-500/5 blur-3xl pointer-events-none" />

            <div className="relative max-w-4xl mx-auto z-10 space-y-12">
                
                {/* Header */}
                <div className="text-center space-y-4">
                    <span className="inline-flex items-center gap-1.5 bg-indigo-500/10 text-indigo-300 text-[10px] font-mono font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-indigo-500/20">
                        <HelpCircle className="w-3.5 h-3.5" /> Technical Helpdesk
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white to-violet-300 bg-clip-text text-transparent">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                        Got questions about our tech stack, custom workflows, pricing models, or capabilities? 
                        Explore our categorized FAQ designed for both traditional search and AI search crawlers.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="relative max-w-md mx-auto w-full">
                    <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-500" />
                    <input 
                        type="text"
                        placeholder="Search answers, keywords, services..."
                        className="bg-slate-900/60 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 w-full transition-all"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Category Toggles */}
                <div className="flex flex-wrap justify-center gap-2">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => {
                                setSelectedCategory(cat);
                                setOpenIdx(null); // Reset accordion on filter
                            }}
                            className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                                (selectedCategory === cat || (cat === 'Local SEO & Location' && selectedCategory === 'Local SEO & Location'))
                                    ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                                    : 'bg-slate-900/40 border-slate-900 text-slate-400 hover:border-slate-800 hover:text-white'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Accordion FAQ List */}
                <div className="space-y-4">
                    {filteredFaqs.length === 0 ? (
                        <div className="bg-slate-900/20 border border-slate-900 rounded-2xl py-12 text-center text-slate-500 text-sm">
                            No FAQs match your search criteria. Try a different term or check a different category.
                        </div>
                    ) : (
                        filteredFaqs.map((faq, index) => {
                            const isOpen = openIdx === index;
                            return (
                                <div 
                                    key={index}
                                    className="bg-slate-900/30 border border-slate-900 hover:border-indigo-500/20 rounded-2xl overflow-hidden transition-all duration-300"
                                >
                                    <button
                                        onClick={() => handleToggle(index)}
                                        className="w-full text-left px-6 py-5 flex justify-between items-center gap-4 cursor-pointer focus:outline-none"
                                    >
                                        <div className="space-y-1">
                                            <span className="text-[10px] text-indigo-400 font-mono font-bold uppercase tracking-wider">
                                                {faq.category}
                                            </span>
                                            <h3 className="text-sm md:text-base font-bold text-white pr-4">
                                                {faq.q}
                                            </h3>
                                        </div>
                                        <div>
                                            {isOpen ? (
                                                <ChevronUp className="h-5 w-5 text-indigo-400 shrink-0" />
                                            ) : (
                                                <ChevronDown className="h-5 w-5 text-slate-500 shrink-0" />
                                            )}
                                        </div>
                                    </button>

                                    {/* Collapsible Content */}
                                    <div 
                                        className={`transition-all duration-300 ease-in-out overflow-hidden ${
                                            isOpen ? 'max-h-[500px] border-t border-slate-900/80' : 'max-h-0'
                                        }`}
                                    >
                                        <div className="px-6 py-5 text-xs md:text-sm text-slate-400 leading-relaxed bg-slate-900/10">
                                            {faq.a}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Call To Action */}
                <div className="bg-gradient-to-r from-indigo-950/20 to-violet-950/20 border border-indigo-900/30 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left mt-8">
                    <div className="space-y-2">
                        <h4 className="text-lg font-bold text-white flex items-center justify-center md:justify-start gap-2">
                            <MessageSquare className="w-5 h-5 text-indigo-400" /> Still Have Questions?
                        </h4>
                        <p className="text-slate-400 text-xs md:text-sm leading-relaxed max-w-xl">
                            Our engineering leads can guide you on MERN architectures, secure database pipelines, or custom enterprise solutions during a free consultation call.
                        </p>
                    </div>
                    <a 
                        href="/contact" 
                        className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-6 py-3.5 rounded-xl shrink-0 shadow-lg shadow-indigo-500/15 transition-all"
                    >
                        Schedule Free Consult
                    </a>
                </div>

            </div>
        </div>
    );
};

export default FAQ;
