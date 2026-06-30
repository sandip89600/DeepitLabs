import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AuthContext } from '../../context/AuthContext';
import { useNotificationsStore } from '../../store/notificationsStore';
import { useNavigate } from 'react-router-dom';
import Input from '../ui/Input';
import Button from '../ui/Button';

// 1. Define strict Zod validation schema
const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' })
});

/**
 * LoginForm component utilizing React Hook Form and Zod validators.
 */
const LoginForm = () => {
    const { login } = useContext(AuthContext);
    const { addNotification } = useNotificationsStore();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // 2. Setup React Hook Form hooks
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data) => {
        setLoading(true);
        const res = await login(data.email, data.password);
        setLoading(false);

        if (res.success) {
            addNotification('Login successful! Welcome back.', 'success');
            if (res.role === 'admin' || res.role === 'mentor') {
                navigate('/admin-panel');
            } else {
                navigate('/dashboard');
            }
        } else {
            addNotification(res.error || 'Invalid credentials', 'error');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
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
                placeholder="••••••••"
                error={errors.password?.message}
                {...register('password')}
            />
            <Button type="submit" loading={loading} className="w-full mt-2">
                Sign In
            </Button>
        </form>
    );
};

export default LoginForm;
