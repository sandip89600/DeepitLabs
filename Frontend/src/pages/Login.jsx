import React from 'react';
import LoginForm from '../components/forms/LoginForm';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

/**
 * Client Portal Login Page.
 * Delegates form logic to LoginForm and injects metadata for SEO.
 */
const Login = () => {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 bg-slate-950">
            <Helmet>
                <title>Portal Login | Deep IT Labs</title>
                <meta name="description" content="Sign in to your Deep IT Labs client dashboard to review project files, invoices, and roadmap tasks." />
            </Helmet>
            
            <div className="w-full max-w-md bg-slate-900/40 border border-slate-900 rounded-2xl p-8 shadow-xl">
                <div className="text-center mb-8 flex flex-col gap-2">
                    <h2 className="text-2xl font-bold tracking-tight text-white">Welcome Back</h2>
                    <p className="text-sm text-slate-400">Log in to access your client dashboard</p>
                </div>
                
                <LoginForm />
                
                <div className="text-center mt-6 text-xs text-slate-500">
                    <p>Don't have an account? <Link to="/register" className="text-indigo-400 hover:underline">Register here</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
