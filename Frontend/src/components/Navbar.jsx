import React, { useState, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useCMSConfig } from '../services/cms';

// Navigation bar integrating public marketing pages with secure portal session controllers
const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { data: cms } = useCMSConfig();
    const brandName = cms?.brandName || 'Deep IT Labs';
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const publicLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Services', path: '/services' },
        { name: 'Portfolio', path: '/portfolio' },
        { name: 'Blog', path: '/blog' }
    ];

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const activeStyle = ({ isActive }) => 
        `text-sm font-semibold transition-all duration-300 ${
            isActive ? 'text-indigo-400 font-bold' : 'text-gray-300 hover:text-white'
        }`;

    return (
        <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-900 px-6 md:px-12 py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Brand Logo */}
                <Link to="/" className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-indigo-400 bg-clip-text text-transparent">
                    {brandName}
                </Link>

                {/* Desktop Links (Marketing + Portal Controls) */}
                <div className="hidden md:flex items-center gap-8">
                    {publicLinks.map((link) => (
                        <NavLink key={link.name} to={link.path} className={activeStyle}>
                            {link.name}
                        </NavLink>
                    ))}

                    {/* Check if user is logged into portal */}
                    {user ? (
                        <>
                            <NavLink to="/dashboard" className={activeStyle}>Dashboard</NavLink>
                            
                            {/* Admin or Mentor navigation routes */}
                            {(user.role === 'admin' || user.role === 'mentor') && (
                                <NavLink to="/admin-panel" className={activeStyle}>Admin Panel</NavLink>
                            )}

                            <NavLink to="/settings" className={activeStyle}>Settings</NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink to="/contact" className={activeStyle}>Contact</NavLink>
                            <Link to="/login" className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4.5 py-2.5 rounded-lg shadow-lg shadow-indigo-500/10 transition-all">
                                Login / Sign Up
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Actions Container */}
                <div className="flex md:hidden items-center gap-4">
                    {!user && (
                        <Link 
                            to="/login" 
                            className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg shadow-indigo-500/10 transition-all"
                        >
                            Login / Sign Up
                        </Link>
                    )}

                    {/* Mobile Menu Toggle Button */}
                    <button 
                        onClick={() => setIsOpen(!isOpen)} 
                        className="text-gray-300 hover:text-white focus:outline-none cursor-pointer"
                        aria-label="Toggle navigation menu"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Sidebar overlay */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-slate-950/95 border-b border-slate-900 px-6 py-6 flex flex-col gap-4">
                    {publicLinks.map((link) => (
                        <NavLink 
                            key={link.name} 
                            to={link.path} 
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) => 
                                `text-base font-semibold py-1.5 transition-all ${
                                    isActive ? 'text-indigo-400' : 'text-gray-300'
                                }`
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}
                    
                    {user ? (
                        <>
                            <NavLink 
                                to="/dashboard" 
                                onClick={() => setIsOpen(false)}
                                className="text-base font-semibold py-1.5 text-gray-300"
                            >
                                Dashboard
                            </NavLink>
                            {(user.role === 'admin' || user.role === 'mentor') && (
                                <NavLink 
                                    to="/admin-panel" 
                                    onClick={() => setIsOpen(false)}
                                    className="text-base font-semibold py-1.5 text-gray-300"
                                >
                                    Admin Panel
                                </NavLink>
                            )}
                            <NavLink 
                                to="/settings" 
                                onClick={() => setIsOpen(false)}
                                className="text-base font-semibold py-1.5 text-gray-300"
                            >
                                Settings
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <Link 
                                to="/contact" 
                                onClick={() => setIsOpen(false)}
                                className="text-base font-semibold py-1.5 text-gray-300"
                            >
                                Contact
                            </Link>
                            <Link 
                                to="/login" 
                                onClick={() => setIsOpen(false)}
                                className="bg-indigo-600 hover:bg-indigo-500 text-white text-center font-semibold py-3 rounded-lg mt-2 transition-all"
                            >
                                Login / Sign Up
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
