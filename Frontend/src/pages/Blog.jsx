import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../seo/SEO';

const Blog = () => {
    const [search, setSearch] = useState('');

    const posts = [
        {
            title: 'MERN Stack Development Cost in India: A Full Guide',
            slug: 'mern-stack-development-cost-india',
            desc: 'Understand the budgeting, developer hourly rates, database design costs, and infrastructure setup parameters for deploying MERN stack apps in India in 2026.',
            author: 'Deep IT Consulting',
            date: 'July 14, 2026',
            readTime: '7 min read',
            tag: 'MERN Stack',
            icon: '💰'
        },
        {
            title: 'ERP vs CRM: Key Differences for Modern Business Scaling',
            slug: 'erp-vs-crm',
            desc: 'A structural comparison between Enterprise Resource Planning (ERP) and Customer Relationship Management (CRM) tools. Learn which one to build first to maximize operations.',
            author: 'Deep IT Enterprise Lead',
            date: 'July 10, 2026',
            readTime: '5 min read',
            tag: 'ERP & CRM',
            icon: '🏢'
        },
        {
            title: 'Why Modern Businesses Need Custom SaaS Products',
            slug: 'saas-development-guide',
            desc: 'Generic tools have limitations. Explore how a tailored SaaS ecosystem drives operational leverage, custom subscription monetization, and deep platform analytics.',
            author: 'Senior Software Architect',
            date: 'July 05, 2026',
            readTime: '6 min read',
            tag: 'SaaS',
            icon: '⚡'
        },
        {
            title: 'React vs Next.js: Architectural Insights for Engineering Leads',
            slug: 'react-vs-nextjs',
            desc: 'An in-depth technical analysis comparing Single Page React Apps with server-side rendered Next.js frameworks, examining caching, SEO crawler optimization, and load speed metrics.',
            author: 'React Lead Architect',
            date: 'June 30, 2026',
            readTime: '9 min read',
            tag: 'Frontend',
            icon: '⚛️'
        },
        {
            title: 'AI Automation for Businesses: Streamlining Workflows in 2026',
            slug: 'ai-automation-for-business',
            desc: 'Discover how integrating custom LLM agents and semantic databases directly into internal CRM platforms automates 60% of manual scheduling and document sorting tasks.',
            author: 'AI Automation Team',
            date: 'June 25, 2026',
            readTime: '8 min read',
            tag: 'AI Solutions',
            icon: '🤖'
        },
        {
            title: 'Express 5 vs Express 4: Resolving Read-only Query Getters',
            slug: '',
            desc: 'A comprehensive guide on managing query objects in Express 5, detailing why traditional middlewares throw property errors and how to safely run in-place sanitizations.',
            author: 'Deep IT Tech Lead',
            date: 'June 22, 2026',
            readTime: '6 min read',
            tag: 'Node.js',
            icon: '⚙️'
        },
        {
            title: 'NoSQL query injections: Defense Strategies in MongoDB & Mongoose',
            slug: '',
            desc: 'Explore how hackers target Mongoose collections using query operators, and how to write custom recursive filters to protect your databases.',
            author: 'Deep IT Security Team',
            date: 'June 20, 2026',
            readTime: '8 min read',
            tag: 'Security',
            icon: '🛡️'
        },
        {
            title: 'Scaling Upload pipelines using Memory Buffers and Cloudinary Streams',
            slug: '',
            desc: 'Avoid writing heavy files on local disks. Learn how to parse multipart payloads in memory using Multer and stream them directly to Cloudinary.',
            author: 'Senior Systems Engineer',
            date: 'May 15, 2026',
            readTime: '5 min read',
            tag: 'Performance',
            icon: '☁️'
        }
    ];

    // Filter posts based on search input
    const filteredPosts = posts.filter(post => 
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.tag.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="bg-slate-950 text-white min-h-screen py-16 px-6 md:px-12">
            <SEO
                title="Tech Insights & Engineering Journal | Deep IT Labs"
                description="Technical tutorials, software guides, and lessons written by senior developers. Learn about MERN Stack Development, React, Node.js optimization, and modern web application security."
                keywords="Deep IT Labs, DeepITLabs, MERN Stack Development, React Development Company, Node.js Development Company, Custom Software Development, Software Company in Nashik"
                url="https://www.deepitlabs.in/blog"
            />
            <div className="max-w-7xl mx-auto">
                
                {/* Header */}
                <div className="text-center mb-16 flex flex-col gap-4">
                    <span className="text-indigo-400 text-sm font-semibold tracking-wider uppercase">Deep IT Labs Journal</span>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Tech Insights & Architecture</h1>
                    <p className="text-gray-400 max-w-xl mx-auto text-base">
                        Deep technical articles, guides, and lessons written by our senior developers and architects.
                    </p>
                    <div className="max-w-md mx-auto w-full mt-4">
                        <input 
                            type="text"
                            placeholder="Search articles by title or tag..."
                            className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 w-full"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {filteredPosts.length === 0 ? (
                        <div className="col-span-3 text-center text-gray-500 py-12">
                            No articles found matching your query.
                        </div>
                    ) : (
                        filteredPosts.map((post, idx) => (
                            <div key={idx} className="bg-slate-900/30 border border-slate-900 rounded-xl overflow-hidden hover:border-indigo-500/30 transition-all duration-300 flex flex-col justify-between p-6">
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="bg-indigo-500/10 text-indigo-400 text-xs font-semibold px-2.5 py-1 rounded">
                                            {post.tag}
                                        </span>
                                        <span className="text-xs text-gray-500">{post.readTime}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-3 hover:text-indigo-400 transition-colors">
                                        {post.slug ? (
                                            <Link to={`/blog/${post.slug}`} className="hover:underline">
                                                {post.title}
                                            </Link>
                                        ) : (
                                            post.title
                                        )}
                                    </h3>
                                    <p className="text-gray-400 text-xs leading-relaxed mb-6">
                                        {post.desc}
                                    </p>
                                </div>

                                <div className="border-t border-slate-900/80 pt-4 flex justify-between items-center text-xxs text-gray-500">
                                    <span>By: <strong>{post.author}</strong></span>
                                    <span>{post.date}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>

            </div>
        </div>
    );
};

export default Blog;
