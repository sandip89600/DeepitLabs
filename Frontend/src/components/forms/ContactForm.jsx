import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNotificationsStore } from '../../store/notificationsStore';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Define contact form validation schema
const contactSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
    email: z.string().email({ message: 'Invalid email address' }),
    service: z.string(),
    budget: z.string(),
    message: z.string().min(10, { message: 'Message must be at least 10 characters' })
});

/**
 * ContactForm component utilizing React Hook Form + Zod resolvers.
 */
const ContactForm = () => {
    const { addNotification } = useNotificationsStore();
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(contactSchema),
        defaultValues: { service: 'web-dev', budget: '10k-25k' }
    });

    const onSubmit = (data) => {
        setLoading(true);
        setTimeout(() => {
            addNotification('Inquiry sent successfully! Our technical leads will connect with you within 24 hours.', 'success');
            reset();
            setLoading(false);
        }, 1500);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
            <Input
                label="Your Name"
                id="name"
                placeholder="John Doe"
                error={errors.name?.message}
                {...register('name')}
            />
            <Input
                label="Email Address"
                id="email"
                type="email"
                placeholder="john@example.com"
                error={errors.email?.message}
                {...register('email')}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="service" className="text-xs font-semibold text-gray-400">Required Service</label>
                    <select
                        id="service"
                        className="bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg px-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 w-full transition-all"
                        {...register('service')}
                    >
                        <option value="web-dev">Web Development</option>
                        <option value="saas">Custom SaaS Platform</option>
                        <option value="erp-crm">CRM / ERP Systems</option>
                        <option value="api-design">API Engineering</option>
                        <option value="ui-ux">UI/UX Prototyping</option>
                    </select>
                </div>
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="budget" className="text-xs font-semibold text-gray-400">Project Budget</label>
                    <select
                        id="budget"
                        className="bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg px-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 w-full transition-all"
                        {...register('budget')}
                    >
                        <option value="5k-10k">$5k - $10k</option>
                        <option value="10k-25k">$10k - $25k</option>
                        <option value="25k-50k">$25k - $50k</option>
                        <option value="50k+">$50k +</option>
                    </select>
                </div>
            </div>
            <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-xs font-semibold text-gray-400">Project Summary</label>
                <textarea
                    id="message"
                    placeholder="Tell us about the scope, timeline, and requirements..."
                    rows="4"
                    className={`bg-slate-950 border rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 w-full transition-all ${
                        errors.message ? 'border-rose-500' : 'border-slate-800 focus:border-indigo-500'
                    }`}
                    {...register('message')}
                />
                {errors.message && (
                    <span className="text-xs text-rose-500 font-medium" role="alert">
                        {errors.message.message}
                    </span>
                )}
            </div>
            <Button type="submit" loading={loading} className="w-full mt-2">
                Send Inquiry
            </Button>
        </form>
    );
};

export default ContactForm;
