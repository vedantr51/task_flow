'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-white border-b border-zinc-200/80">
            <div className="w-full px-6">
                <div className="flex items-center justify-between h-14">
                    <Link href="/dashboard" className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center shadow-sm">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                        </div>
                        <span className="text-base font-semibold text-zinc-900">TaskFlow</span>
                    </Link>

                    {user && (
                        <div className="flex items-center gap-5">
                            <div className="hidden sm:flex items-center gap-3">
                                <div className="w-7 h-7 rounded-full bg-zinc-900 flex items-center justify-center">
                                    <span className="text-xs font-medium text-white">
                                        {user.name?.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <span className="text-zinc-600 text-sm">{user.name}</span>
                            </div>

                            <div className="h-4 w-px bg-zinc-200 hidden sm:block"></div>

                            <button
                                onClick={logout}
                                className="text-zinc-500 hover:text-zinc-900 text-sm font-medium transition-colors duration-200"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
