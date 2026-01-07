'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Select from '@/components/Select';

const taskSchema = z.object({
    title: z.string()
        .min(1, 'Title is required')
        .max(100, 'Title cannot be more than 100 characters'),
    description: z.string()
        .max(500, 'Description cannot be more than 500 characters')
        .optional(),
    status: z.enum(['pending', 'completed'])
});

export default function TaskModal({ isOpen, onClose, onSubmit, task = null, isLoading }) {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            title: '',
            description: '',
            status: 'pending'
        }
    });

    useEffect(() => {
        if (task) {
            reset({
                title: task.title,
                description: task.description || '',
                status: task.status
            });
        } else {
            reset({
                title: '',
                description: '',
                status: 'pending'
            });
        }
    }, [task, reset]);

    const handleFormSubmit = async (data) => {
        await onSubmit(data);
        reset();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-zinc-900/25" onClick={onClose}></div>

            <div className="relative w-full max-w-md bg-white rounded-xl border border-zinc-200/80 shadow-2xl shadow-zinc-900/10">
                <div className="p-6 border-b border-zinc-100">
                    <h2 className="text-lg font-semibold text-zinc-900">
                        {task ? 'Edit Task' : 'Create New Task'}
                    </h2>
                    <p className="text-zinc-500 text-sm mt-1">
                        {task ? 'Update your task details below' : 'Fill in the details to create a new task'}
                    </p>
                </div>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-2">Title *</label>
                        <input
                            {...register('title')}
                            type="text"
                            placeholder="Enter task title"
                            className="w-full px-4 py-3 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:bg-white focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all duration-200"
                        />
                        {errors.title && (
                            <p className="mt-2 text-sm text-zinc-500">{errors.title.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-2">Description</label>
                        <textarea
                            {...register('description')}
                            rows={3}
                            placeholder="Enter task description (optional)"
                            className="w-full px-4 py-3 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:bg-white focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all duration-200 resize-none"
                        />
                        {errors.description && (
                            <p className="mt-2 text-sm text-zinc-500">{errors.description.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-2">Status</label>
                        <Select
                            value={watch('status')}
                            onChange={(e) => setValue('status', e.target.value)}
                            options={[
                                { value: 'pending', label: 'Pending' },
                                { value: 'completed', label: 'Completed' }
                            ]}
                            className="w-full"
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 rounded-lg bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-700 font-medium transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 px-4 py-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                        >
                            {isLoading ? 'Saving...' : (task ? 'Update' : 'Create')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
