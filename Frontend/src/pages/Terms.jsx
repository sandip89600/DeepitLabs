import React from 'react';

const Terms = () => {
    return (
        <div className="bg-slate-950 text-white min-h-screen py-16 px-6 md:px-12">
            <div className="max-w-3xl mx-auto flex flex-col gap-6">
                <h1 className="text-3xl font-extrabold border-b border-slate-900 pb-4">Terms and Conditions</h1>
                <p className="text-gray-400 text-sm">Last updated: June 30, 2026</p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Welcome to the website of Deep IT Labs. By accessing this site, you agree to comply with and be bound by these Terms and Conditions.
                </p>
                <h3 className="text-lg font-bold mt-4">1. Use of Site</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                    The content, services, and course curriculum stats displayed on this website are owned exclusively by Deep IT Labs. Unauthorized reuse, scraping, or distribution of material is prohibited.
                </p>
                <h3 className="text-lg font-bold mt-4">2. Service Scope</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Custom software estimations provided via consultation calls represent structural estimates and do not constitute a binding development contract until SLA scopes are signed.
                </p>
            </div>
        </div>
    );
};

export default Terms;
