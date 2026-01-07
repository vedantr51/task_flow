'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

const registerSchema = z.object({
    name: z.string()
        .min(1, 'Name is required')
        .max(50, 'Name cannot be more than 50 characters'),
    email: z.string()
        .min(1, 'Email is required')
        .email('Please enter a valid email'),
    password: z.string()
        .min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string()
        .min(1, 'Please confirm your password')
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
});

export default function RegisterPage() {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { register: registerUser } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(registerSchema)
    });

    const onSubmit = async (data) => {
        setError('');
        setIsLoading(true);
        try {
            await registerUser(data.name, data.email, data.password);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-100 flex items-center justify-center px-6 py-12">
            <div className="w-full max-w-sm">
                <div className="text-center mb-10">
                    <Link href="/" className="inline-block">
                        <div className="w-12 h-12 mx-auto mb-8 rounded-xl bg-zinc-900 flex items-center justify-center shadow-lg shadow-zinc-900/10">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                        </div>
                    </Link>
                    <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">Create an account</h1>
                    <p className="text-zinc-500 mt-2 text-sm">Join TaskFlow and start organizing</p>
                </div>

                <div className="bg-white rounded-xl border border-zinc-200/80 p-8 shadow-sm shadow-zinc-900/5">
                    {error && (
                        <div className="mb-6 p-4 rounded-lg bg-zinc-50 border border-zinc-200">
                            <p className="text-zinc-700 text-sm">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-2">Name</label>
                            <input
                                {...register('name')}
                                type="text"
                                placeholder="John Doe"
                                className="w-full px-4 py-3 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:bg-white focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all duration-200"
                            />
                            {errors.name && (
                                <p className="mt-2 text-sm text-zinc-500">{errors.name.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-2">Email</label>
                            <input
                                {...register('email')}
                                type="email"
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:bg-white focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all duration-200"
                            />
                            {errors.email && (
                                <p className="mt-2 text-sm text-zinc-500">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-2">Password</label>
                            <input
                                {...register('password')}
                                type="password"
                                placeholder="••••••••"
                                className="w-full px-4 py-3 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:bg-white focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all duration-200"
                            />
                            {errors.password && (
                                <p className="mt-2 text-sm text-zinc-500">{errors.password.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-2">Confirm Password</label>
                            <input
                                {...register('confirmPassword')}
                                type="password"
                                placeholder="••••••••"
                                className="w-full px-4 py-3 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:bg-white focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all duration-200"
                            />
                            {errors.confirmPassword && (
                                <p className="mt-2 text-sm text-zinc-500">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md hover:-translate-y-0.5"
                        >
                            {isLoading ? 'Creating account...' : 'Create Account'}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-zinc-100 text-center">
                        <p className="text-zinc-500 text-sm">
                            Already have an account?{' '}
                            <Link href="/login" className="text-zinc-900 hover:underline font-medium">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
