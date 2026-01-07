'use client';

export default function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title = 'Confirm Action',
    message = 'Are you sure you want to proceed?',
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    isLoading = false,
    variant = 'danger'
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div
                className="absolute inset-0 bg-zinc-900/25 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            <div className="relative w-full max-w-sm bg-white rounded-xl border border-zinc-200/80 shadow-2xl shadow-zinc-900/10 animate-in">
                <div className="p-6 pb-4">
                    <div className="flex items-start gap-4">
                        <div className={`
                            w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                            ${variant === 'danger'
                                ? 'bg-zinc-900'
                                : 'bg-zinc-100 border border-zinc-200'
                            }
                        `}>
                            {variant === 'danger' ? (
                                <svg
                                    className="w-5 h-5 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="w-5 h-5 text-zinc-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            )}
                        </div>

                        <div className="flex-1 min-w-0">
                            <h3 className="text-base font-semibold text-zinc-900">
                                {title}
                            </h3>
                            <p className="text-sm text-zinc-500 mt-1 leading-relaxed">
                                {message}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 p-6 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isLoading}
                        className="flex-1 px-4 py-2.5 rounded-lg bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-700 font-medium text-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {cancelText}
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isLoading}
                        className={`
                            flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 
                            disabled:opacity-50 disabled:cursor-not-allowed
                            ${variant === 'danger'
                                ? 'bg-zinc-900 hover:bg-zinc-800 text-white shadow-sm hover:shadow-md'
                                : 'bg-zinc-900 hover:bg-zinc-800 text-white shadow-sm hover:shadow-md'
                            }
                        `}
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Deleting...
                            </span>
                        ) : confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
