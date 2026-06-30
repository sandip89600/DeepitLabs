import React from 'react';

const Privacy = () => {
    return (
        <div className="bg-slate-950 text-white min-h-screen py-16 px-6 md:px-12">
            <div className="max-w-3xl mx-auto flex flex-col gap-6">
                <h1 className="text-3xl font-extrabold border-b border-slate-900 pb-4">Privacy Policy</h1>
                <p className="text-gray-400 text-sm">Last updated: June 30, 2026</p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    At Deep IT Labs, we prioritize user privacy. This policy outlines the kinds of information we collect and compile, and how we handle data security during your sessions.
                </p>
                <h3 className="text-lg font-bold mt-4">1. Information We Collect</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                    We collect email addresses when you submit project inquiries or subscribe to newsletters. In custom dashboard settings, we collect avatar image buffers upload data securely using Cloudinary.
                </p>
                <h3 className="text-lg font-bold mt-4">2. Security Best Practices</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Your database credentials and tokens are protected using encryption and environment-level isolation. Session sessions utilize JWT token verifications, and input inputs are recursively sanitized to prevent NoSQL/XSS scripts.
                </p>
            </div>
        </div>
    );
};

export default Privacy;
