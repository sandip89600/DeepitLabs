import React from 'react';
import { Link } from 'react-router-dom';
import { useCMSConfig } from '../services/cms';

const Services = () => {
    const { data: cms } = useCMSConfig();
    
    const rawList = cms?.services || [
        {
            title: 'MERN Stack Development',
            desc: 'Custom structured SPA and SSR web applications built using React.js for client interfaces, Express/Node.js for routing controller services, and MongoDB Atlas for database persistence.',
            features: ['Vite & Webpack bundles', 'Stateless JWT Session Verification', 'Optimized Mongoose Schemas', 'State Management (Redux/Context API)']
        },
        {
            title: 'Custom CRM & ERP Systems',
            desc: 'Tailored administrative systems built to manage personnel directories, client pipelines, transactional reporting, inventory management, and workforce assignments.',
            features: ['Roles & Permissions Gates', 'File Uploads & Cloud Storage', 'Database Aggregations Stats', 'Client Action Audit Logs']
        },
        {
            title: 'API Engineering & Cloud Joins',
            desc: 'Secure, scalable API design incorporating request body validation and parameter sanitization to protect against database query injections.',
            features: ['OpenAPI / Swagger Specs', 'Gzip Payload Compressions', 'IP Rate Throttling Limits', 'Third-Party Webhook Integrations']
        },
        {
            title: 'UI/UX Prototyping Studio',
            desc: 'Highly detailed design cycles converting abstract business concepts into visually premium user interfaces with custom HSL styling frameworks.',
            features: ['Figma Wireframing', 'Responsive UI Layout Systems', 'Micro-Animations Design', 'Human-Centered Interactions']
        }
    ];

    const list = rawList.map(s => ({
        ...s,
        features: s.features || [
            'Dynamic real-time dashboard tracking',
            'Modular microservice architectural style',
            'Full database integration support'
        ]
    }));

    return (
        <div className="bg-slate-950 text-white min-h-screen py-16 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-20 flex flex-col gap-4">
                    <span className="text-indigo-400 text-sm font-semibold tracking-wider uppercase">Our Core Competencies</span>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Services We Deliver</h1>
                    <p className="text-gray-400 max-w-xl mx-auto text-base">
                        Custom software systems designed by veteran technical leads, following clean code architectures and security best practices.
                    </p>
                </div>

                {/* Services List Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                    {list.map((service, index) => (
                        <div key={index} className="bg-slate-900/30 border border-slate-900 p-10 rounded-2xl flex flex-col justify-between hover:border-indigo-500/30 transition-all duration-300">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6">{service.desc}</p>
                                <ul className="flex flex-col gap-2.5 mb-8">
                                    {service.features.map((feat, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-xs text-gray-300">
                                            <span className="text-indigo-400 font-bold">✓</span> {feat}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <Link to="/contact" className="text-indigo-400 hover:text-indigo-300 text-sm font-semibold inline-flex items-center gap-1.5 self-start">
                                Request details <span className="text-base">&rarr;</span>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Final Callout */}
                <div className="bg-slate-900/10 border border-slate-900 rounded-xl p-10 text-center max-w-3xl mx-auto">
                    <h3 className="text-xl font-bold mb-3">Require a Custom Enterprise Application?</h3>
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                        We build CRM, ERP, and dashboard integrations matching your company metrics. Get in touch to schedule an architecture alignment call.
                    </p>
                    <Link to="/contact" className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-2.5 rounded-lg shadow-lg shadow-indigo-500/20 transition-all">
                        Consult Our Architects
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Services;
