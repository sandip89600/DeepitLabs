import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="bg-slate-950 text-white min-h-screen flex justify-center items-center px-6 text-center">
            <div className="flex flex-col gap-6 max-w-md">
                <span className="text-8xl font-black text-indigo-500/20">404</span>
                <h1 className="text-3xl font-extrabold">Page Not Found</h1>
                <p className="text-gray-400 text-sm leading-relaxed">
                    The software page you are looking for has been moved, archived, or is currently undergoing an API refactor.
                </p>
                <Link to="/" className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-lg shadow-lg shadow-indigo-500/20 transition-all text-sm mt-4">
                    Back to Homepage
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
