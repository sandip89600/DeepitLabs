import React from 'react';
import RegisterForm from '../components/forms/RegisterForm';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

/**
 * Client Portal Registration Page.
 * Delegates form logic to RegisterForm and injects metadata for SEO.
 */
const Register = () => {
    return (
        <div className="relative min-h-[85vh] flex items-center justify-center px-4 bg-[#06070D] py-12 overflow-hidden">
            <Helmet>
                <title>Create Portal Account | Deep IT Labs</title>
                <meta name="description" content="Register an account on Deep IT Labs to access software source codes, roadmap downloads, and client services." />
            </Helmet>

            {/* Background: same fine grid + dual glow language as Home, kept subtle so the form stays the focus */}
            <div
                className="absolute inset-0 opacity-[0.06] pointer-events-none"
                style={{
                    backgroundImage:
                        'linear-gradient(to right, #8B7CFF 1px, transparent 1px), linear-gradient(to bottom, #8B7CFF 1px, transparent 1px)',
                    backgroundSize: '56px 56px',
                    maskImage: 'radial-gradient(ellipse 60% 60% at 50% 40%, black 30%, transparent 85%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 40%, black 30%, transparent 85%)'
                }}
            />
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,rgba(124,92,252,0.18)_0%,transparent_70%)] blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 right-10 w-[320px] h-[320px] rounded-full bg-[radial-gradient(circle,rgba(45,212,191,0.14)_0%,transparent_70%)] blur-2xl pointer-events-none" />

            <div className="relative w-full max-w-md bg-white/[0.03] border border-white/10 rounded-2xl p-8 shadow-2xl shadow-black/40 backdrop-blur-sm">
                {/* Thin gradient accent bar — small signature touch instead of a generic border */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-violet-400/60 to-transparent" />

                <div className="text-center mb-8 flex flex-col gap-2">
                    <span className="self-center text-[10px] font-mono uppercase tracking-widest text-cyan-400/80 mb-1">
                        Client Portal
                    </span>
                    <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-violet-300 bg-clip-text text-transparent">
                        Create Account
                    </h2>
                    <p className="text-sm text-slate-400">Join the Deep IT Labs training ecosystem</p>
                </div>

                <RegisterForm />

                <div className="text-center mt-6 text-xs text-slate-500">
                    <p>
                        Already have an account?{' '}
                        <Link to="/login" className="text-violet-300 hover:text-cyan-300 transition-colors hover:underline">
                            Sign in here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;