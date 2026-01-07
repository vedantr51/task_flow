'use client';

export default function ProfileCard({ user }) {
    if (!user) return null;

    return (
        <div className="bg-white rounded-xl border border-zinc-200/80 p-6 shadow-sm shadow-zinc-900/5">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center">
                    <span className="text-lg font-medium text-white">
                        {user.name?.charAt(0).toUpperCase()}
                    </span>
                </div>
                <div>
                    <h2 className="text-base font-semibold text-zinc-900">{user.name}</h2>
                    <p className="text-zinc-500 text-sm">{user.email}</p>
                </div>
            </div>

            <div className="mt-6 pt-6 border-t border-zinc-100">
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-zinc-50 rounded-lg p-4 border border-zinc-100">
                        <p className="text-zinc-400 text-xs uppercase tracking-wide mb-1">Member Since</p>
                        <p className="text-zinc-900 font-medium text-sm">
                            {new Date(user.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </p>
                    </div>
                    <div className="bg-zinc-50 rounded-lg p-4 border border-zinc-100">
                        <p className="text-zinc-400 text-xs uppercase tracking-wide mb-1">Status</p>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-zinc-900"></div>
                            <p className="text-zinc-900 font-medium text-sm">Active</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
