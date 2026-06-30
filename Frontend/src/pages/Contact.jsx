import React from 'react';
import ContactForm from '../components/forms/ContactForm';
import { Helmet } from 'react-helmet-async';

/**
 * Public Contact Page.
 * Displays company coordinates and renders our validated ContactForm.
 */
const Contact = () => {
    return (
        <div className="bg-slate-950 text-white min-h-screen py-16 px-6 md:px-12">
            <Helmet>
                <title>Contact Our Engineers | Deep IT Labs</title>
                <meta name="description" content="Reach out to the Deep IT Labs development team to consult on custom SaaS, ERP/CRM development, or API engineering." />
            </Helmet>
            
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                
                {/* Left Column: Contact details */}
                <div className="flex flex-col gap-8 justify-center">
                    <div className="flex flex-col gap-4">
                        <span className="text-indigo-400 text-sm font-semibold tracking-wider uppercase">Contact Our Team</span>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Let's Construct Something Big</h1>
                        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                            Have a SaaS concept, customized CRM blueprint, or REST API migration? Get in touch to schedule a free 30-minute architecture consulting call with our technical leads.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 text-sm text-slate-400">
                        <div className="flex items-center gap-4">
                            <span className="text-2xl" aria-hidden="true">📧</span>
                            <div>
                                <p className="font-semibold text-white">General Inquiry</p>
                                <p>info@deepitlabs.com</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-2xl" aria-hidden="true">📞</span>
                            <div>
                                <p className="font-semibold text-white">Direct Line</p>
                                <p>+1 (555) 019-2834</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-2xl" aria-hidden="true">🏢</span>
                            <div>
                                <p className="font-semibold text-white">Headquarters</p>
                                <p>Silicon Valley Plaza, San Jose, CA</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Inquiry Form Card */}
                <div className="bg-slate-900/40 border border-slate-900 p-8 rounded-2xl">
                    <h3 className="text-xl font-bold mb-2">Request Consultation</h3>
                    <p className="text-xs text-slate-500 mb-6">Fill in details and get a tailored price-estimation analysis.</p>
                    
                    <ContactForm />
                </div>

            </div>
        </div>
    );
};

export default Contact;
