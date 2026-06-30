import React from 'react';

/**
 * Accessible Custom Button Component.
 * Supports loading states, sizes, variants, and keyboard focus states.
 */
const Button = ({
    children,
    type = 'button',
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    className = '',
    ...props
}) => {
    const baseStyle = "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";
    
    const variants = {
        primary: "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/15",
        secondary: "bg-slate-900 border border-slate-800 hover:bg-slate-800 text-gray-300 hover:text-white",
        danger: "bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-500/15"
    };

    const sizes = {
        sm: "text-xs px-4 py-2",
        md: "text-sm px-5 py-2.5",
        lg: "text-base px-6 py-3"
    };

    return (
        <button
            type={type}
            disabled={disabled || loading}
            className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {loading ? (
                <div className="flex items-center gap-2" aria-hidden="true">
                    <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                    <span>Loading...</span>
                </div>
            ) : children}
        </button>
    );
};

export default Button;
