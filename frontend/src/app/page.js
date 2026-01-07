'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-100">
        <div className="w-8 h-8 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="max-w-xl text-center">
          <div className="w-14 h-14 mx-auto mb-12 rounded-xl bg-zinc-900 flex items-center justify-center shadow-lg shadow-zinc-900/10">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold text-zinc-900 mb-5 tracking-tight leading-tight">
            Welcome to TaskFlow
          </h1>

          <p className="text-lg text-zinc-500 mb-14 max-w-md mx-auto leading-relaxed">
            A secure, scalable task management application. Organize your tasks, boost your productivity.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="px-8 py-3.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-medium transition-all duration-200 shadow-md shadow-zinc-900/10 hover:shadow-lg hover:shadow-zinc-900/15 hover:-translate-y-0.5"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-8 py-3.5 rounded-lg bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-700 font-medium transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white border-t border-zinc-200">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider text-center mb-12">Why TaskFlow</p>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto rounded-lg bg-zinc-100 flex items-center justify-center mb-5 border border-zinc-200">
                <svg className="w-5 h-5 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-zinc-900 mb-2">Secure</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">JWT authentication with encrypted passwords for maximum security.</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 mx-auto rounded-lg bg-zinc-100 flex items-center justify-center mb-5 border border-zinc-200">
                <svg className="w-5 h-5 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-zinc-900 mb-2">Fast</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">Optimized performance with efficient database queries.</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 mx-auto rounded-lg bg-zinc-100 flex items-center justify-center mb-5 border border-zinc-200">
                <svg className="w-5 h-5 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-zinc-900 mb-2">Scalable</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">Built with modular architecture ready for production.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-zinc-50 border-t border-zinc-200 py-6">
        <p className="text-center text-zinc-400 text-xs">Built with precision and care</p>
      </div>
    </div>
  );
}
