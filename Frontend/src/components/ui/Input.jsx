import React, { forwardRef } from 'react';

/**
 * Accessible Custom Input Component.
 * Supports React Hook Form refs, error message aria announcements, and validation borders.
 */
const Input = forwardRef(({
    label,
    id,
    type = 'text',
    error = '',
    className = '',
    ...props
}, ref) => {
    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            {label && (
                <label htmlFor={id} className="text-xs font-semibold text-gray-400">
                    {label}
                </label>
            )}
            <input
                ref={ref}
                type={type}
                id={id}
                aria-invalid={!!error}
                aria-describedby={error ? `${id}-error` : undefined}
                className={`bg-slate-950 border rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 w-full transition-all ${
                    error ? 'border-rose-500' : 'border-slate-800 focus:border-indigo-500'
                }`}
                {...props}
            />
            {error && (
                <span 
                    id={`${id}-error`} 
                    className="text-xs text-rose-500 font-medium" 
                    role="alert"
                >
                    {error}
                </span>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
