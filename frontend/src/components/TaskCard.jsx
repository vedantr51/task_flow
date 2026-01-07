'use client';

export default function TaskCard({ task, onEdit, onDelete }) {
    const isCompleted = task.status === 'completed';

    return (
        <div className={`bg-white rounded-lg border border-zinc-200/80 p-5 transition-all duration-200 group shadow-sm shadow-zinc-900/5 hover:shadow-md hover:shadow-zinc-900/5 ${isCompleted ? 'border-l-[3px] border-l-zinc-900' : 'border-l-[3px] border-l-zinc-300'}`}>
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                        <h3 className={`text-base font-medium truncate ${isCompleted ? 'text-zinc-900' : 'text-zinc-700'}`}>{task.title}</h3>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${isCompleted ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-500 border border-zinc-200'}`}>
                            {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                        </span>
                    </div>

                    {task.description && (
                        <p className="text-zinc-500 text-sm line-clamp-2 mb-3 leading-relaxed">{task.description}</p>
                    )}

                    <p className="text-zinc-400 text-xs">
                        {new Date(task.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </p>
                </div>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                        onClick={() => onEdit(task)}
                        className="p-2 rounded-lg hover:bg-zinc-100 text-zinc-400 hover:text-zinc-600 transition-colors duration-200"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </button>
                    <button
                        onClick={() => onDelete(task._id)}
                        className="p-2 rounded-lg hover:bg-zinc-100 text-zinc-400 hover:text-zinc-600 transition-colors duration-200"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
