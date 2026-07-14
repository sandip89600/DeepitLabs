import React from 'react';
import { Link } from 'react-router-dom';
import { useCMSConfig } from '../services/cms';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const { data: cms } = useCMSConfig();
    const brandName = cms?.brandName || 'Deep IT Labs';
    const email = cms?.contactEmail || 'info@deepitlabs.in';
    const phone = cms?.contactPhone || '+91 7058222107';

    return (
        <footer className="bg-slate-950 border-t border-slate-900 text-gray-400 py-16 px-6 md:px-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                {/* Column 1: Company Profile */}
                <div className="flex flex-col gap-4">
                    <Link to="/" className="text-xl font-bold tracking-tight text-white bg-gradient-to-r from-white to-indigo-400 bg-clip-text text-transparent">
                        {brandName}
                    </Link>
                    <p className="text-sm leading-relaxed text-gray-400">
                        A premium software development agency engineering custom cloud software, MERN applications, CRM/ERP platforms, and modern SaaS products for global clients.
                    </p>
                    <div className="text-sm text-gray-500">
                        <p>{email}</p>
                        <p>{phone}</p>
                    </div>
                </div>

                {/* Column 2: Our Services */}
                <div className="flex flex-col gap-3">
                    <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-2">Our Services</h4>
                    <Link to="/services" className="text-sm hover:text-white transition-all">Website Development</Link>
                    <Link to="/services" className="text-sm hover:text-white transition-all">MERN Stack Solutions</Link>
                    <Link to="/services" className="text-sm hover:text-white transition-all">Custom ERP/CRM systems</Link>
                    <Link to="/services" className="text-sm hover:text-white transition-all">Mobile App Engineering</Link>
                    <Link to="/services" className="text-sm hover:text-white transition-all">UI/UX Design Studio</Link>
                </div>

                {/* Column 3: Useful Links */}
                <div className="flex flex-col gap-3">
                    <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-2">Useful Links</h4>
                    <Link to="/about" className="text-sm hover:text-white transition-all">About Us</Link>
                    <Link to="/portfolio" className="text-sm hover:text-white transition-all">Our Portfolio</Link>
                    <Link to="/case-studies" className="text-sm hover:text-white transition-all">Technical Case Studies</Link>
                    <Link to="/blog" className="text-sm hover:text-white transition-all">Latest Tech Blog</Link>
                    <Link to="/faq" className="text-sm hover:text-white transition-all">FAQ</Link>
                    <Link to="/privacy" className="text-sm hover:text-white transition-all">Privacy Policy</Link>
                    <Link to="/terms" className="text-sm hover:text-white transition-all">Terms & Conditions</Link>
                </div>

                {/* Column 4: Newsletter */}
                <div className="flex flex-col gap-4">
                    <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-2">Stay Connected</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Subscribe to our newsletter for insights on modern technology trends and agency news.
                    </p>
                    <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 w-full"
                        />
                        <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all">
                            Send
                        </button>
                    </form>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="max-w-7xl mx-auto border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                <p>&copy; {currentYear} Deep IT Labs. All rights reserved.</p>
                <div className="flex gap-6">
                    <Link to="/privacy" className="hover:text-gray-300">Privacy</Link>
                    <Link to="/terms" className="hover:text-gray-300">Terms</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
