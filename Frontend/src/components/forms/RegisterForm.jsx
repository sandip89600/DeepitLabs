import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AuthContext } from '../../context/AuthContext';
import { useNotificationsStore } from '../../store/notificationsStore';
import { useNavigate } from 'react-router-dom';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Define registration validation rules
const registerSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    age: z.preprocess(
        (val) => (val === '' ? undefined : parseInt(val, 10)), 
        z.number({ invalid_type_error: 'Age must be a number' }).min(10, { message: 'Must be at least 10 years old' })
    ),
    role: z.enum(['user', 'mentor', 'admin'])
});

/**
 * RegisterForm component styled with Tailwind v4, utilizing Zod validator maps.
 */
const RegisterForm = () => {
    const { register: signUp } = useContext(AuthContext);
    const { addNotification } = useNotificationsStore();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: { role: 'user' }
    });

    const onSubmit = async (data) => {
        setLoading(true);
        const res = await signUp(data.name, data.email, data.password, data.role, data.age);
        setLoading(false);

        if (res.success) {
            addNotification('Registration successful! Welcome to the portal.', 'success');
            navigate('/dashboard');
        } else {
            addNotification(res.error || 'Failed to create account', 'error');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
            <Input
                label="Full Name"
                id="name"
                placeholder="John Doe"
                error={errors.name?.message}
                {...register('name')}
            />
            <Input
                label="Email Address"
                id="email"
                type="email"
                placeholder="name@email.com"
                error={errors.email?.message}
                {...register('email')}
            />
            <Input
                label="Password"
                id="password"
                type="password"
                placeholder="Minimum 6 characters"
                error={errors.password?.message}
                {...register('password')}
            />
            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="Age"
                    id="age"
                    type="number"
                    placeholder="18"
                    error={errors.age?.message}
                    {...register('age')}
                />
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="role" className="text-xs font-semibold text-gray-400">Portal Role</label>
                    <select
                        id="role"
                        className="bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg px-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 w-full transition-all"
                        {...register('role')}
                    >
                        <option value="user">Student (User)</option>
                        <option value="mentor">Senior Mentor</option>
                        <option value="admin">Administrator</option>
                    </select>
                </div>
            </div>
            <Button type="submit" loading={loading} className="w-full mt-2">
                Sign Up
            </Button>
        </form>
    );
};

export default RegisterForm;
