import React, { useState } from 'react';

const Blog = () => {
    const [search, setSearch] = useState('');

    const posts = [
        {
            title: 'Express 5 vs Express 4: Resolving Read-only Query Getters',
            desc: 'A comprehensive guide on managing query objects in Express 5, detailing why traditional middlewares throw property errors and how to safely run in-place sanitizations.',
            author: 'Deep IT Tech Lead',
            date: 'June 28, 2026',
            readTime: '6 min read',
            tag: 'Node.js',
            icon: '⚙️'
        },
        {
            title: 'NoSQL query injections: Defense Strategies in MongoDB & Mongoose',
            desc: 'Explore how hackers target Mongoose collections using query operators, and how to write custom recursive filters to protect your databases.',
            author: 'Deep IT Security Team',
            date: 'June 20, 2026',
            readTime: '8 min read',
            tag: 'Security',
            icon: '🛡️'
        },
        {
            title: 'Scaling Upload pipelines using Memory Buffers and Cloudinary Streams',
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
                                    <h3 className="text-lg font-bold text-white mb-3 hover:text-indigo-400 transition-colors cursor-pointer">
                                        {post.title}
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
