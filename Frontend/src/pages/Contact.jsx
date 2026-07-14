import React from 'react';
import ContactForm from '../components/forms/ContactForm';
import SEO from '../seo/SEO';
import { useCMSConfig } from '../services/cms';

/**
 * Public Contact Page.
 * Displays company coordinates and renders our validated ContactForm.
 */
const Contact = () => {
    const { data: cms } = useCMSConfig();
    const email = cms?.contactEmail || 'info@deepitlabs.in';
    const phone = cms?.contactPhone || '+91 7058222107';
    const headquarters = cms?.headquarters || 'Nashik, Maharashtra, India';

    return (
        <div className="bg-slate-950 text-white min-h-screen py-16 px-6 md:px-12">
            <SEO
                title="Contact Us | Deep IT Labs India - Software Company in Nashik"
                description="Reach out to the Deep IT Labs software development team. Consult on custom SaaS, ERP/CRM, MERN stack, or AI development. We are a leading IT Company in Nashik."
                keywords="Deep IT Labs, DeepITLabs, Deep IT Labs Nashik, Deep IT Labs India, Software Company in Nashik, Web Development Company Nashik, IT Company Nashik, MERN Developer Nashik, Custom Software Development"
                url="https://www.deepitlabs.in/contact"
            />
            
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
                                <p>{email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-2xl" aria-hidden="true">📞</span>
                            <div>
                                <p className="font-semibold text-white">Direct Line</p>
                                <p>{phone}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-2xl" aria-hidden="true">🏢</span>
                            <div>
                                <p className="font-semibold text-white">Headquarters</p>
                                <p>{headquarters}</p>
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
