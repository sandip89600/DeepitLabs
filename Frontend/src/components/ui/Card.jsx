import React from 'react';

/**
 * Reusable Card container styled with Tailwind v4 dark aesthetics.
 */
const Card = ({ children, title, subtitle, className = '', ...props }) => {
    return (
        <div 
            className={`bg-slate-900/40 border border-slate-900 rounded-2xl p-8 shadow-xl ${className}`} 
            {...props}
        >
            {(title || subtitle) && (
                <div className="mb-6 flex flex-col gap-1.5">
                    {title && <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>}
                    {subtitle && <p className="text-xs text-slate-400 leading-relaxed">{subtitle}</p>}
                </div>
            )}
            <div>
                {children}
            </div>
        </div>
    );
};

export default Card;
