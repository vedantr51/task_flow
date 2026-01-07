'use client';

import { useState, useEffect, useCallback } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import Navbar from '@/components/Navbar';
import ProfileCard from '@/components/ProfileCard';
import TaskCard from '@/components/TaskCard';
import TaskModal from '@/components/TaskModal';
import ConfirmModal from '@/components/ConfirmModal';
import Select from '@/components/Select';
import { useAuth } from '@/context/AuthContext';
import tasksApi from '@/api/tasks';

export default function DashboardPage() {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const fetchTasks = useCallback(async () => {
        try {
            setLoading(true);
            const params = {};
            if (searchQuery) params.search = searchQuery;
            if (statusFilter) params.status = statusFilter;

            const response = await tasksApi.getAll(params);
            setTasks(response.data);
            setError('');
        } catch (err) {
            setError('Failed to fetch tasks');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [searchQuery, statusFilter]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleCreateTask = () => {
        setEditingTask(null);
        setIsModalOpen(true);
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    const handleDeleteClick = (taskId) => {
        setTaskToDelete(taskId);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!taskToDelete) return;

        setIsDeleting(true);
        try {
            await tasksApi.delete(taskToDelete);
            setTasks(tasks.filter(t => t._id !== taskToDelete));
            setDeleteModalOpen(false);
            setTaskToDelete(null);
        } catch (err) {
            setError('Failed to delete task');
            console.error(err);
        } finally {
            setIsDeleting(false);
        }
    };

    const handleCancelDelete = () => {
        setDeleteModalOpen(false);
        setTaskToDelete(null);
    };

    const handleSubmitTask = async (data) => {
        setIsSubmitting(true);
        try {
            if (editingTask) {
                const response = await tasksApi.update(editingTask._id, data);
                setTasks(tasks.map(t => t._id === editingTask._id ? response.data : t));
            } else {
                const response = await tasksApi.create(data);
                setTasks([response.data, ...tasks]);
            }
            setIsModalOpen(false);
            setEditingTask(null);
        } catch (err) {
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const taskStats = {
        total: tasks.length,
        pending: tasks.filter(t => t.status === 'pending').length,
        completed: tasks.filter(t => t.status === 'completed').length
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-zinc-100 flex flex-col">
                <Navbar />

                <main className="flex-1 w-full px-6 py-10">
                    <div className="mb-10">
                        <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">
                            Welcome back, {user?.name}
                        </h1>
                        <p className="text-zinc-500 mt-1.5">Here&apos;s an overview of your tasks</p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 h-full">
                        <div className="space-y-6 lg:sticky lg:top-8 lg:self-start">
                            <ProfileCard user={user} />

                            <div className="bg-white rounded-xl border border-zinc-200/80 p-6 shadow-sm shadow-zinc-900/5">
                                <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-5">Statistics</h3>
                                <div className="space-y-1">
                                    <div className="flex items-center justify-between py-3 border-b border-zinc-100">
                                        <span className="text-zinc-600 text-sm">Total Tasks</span>
                                        <span className="text-lg font-semibold text-zinc-900 tabular-nums">{taskStats.total}</span>
                                    </div>
                                    <div className="flex items-center justify-between py-3 border-b border-zinc-100">
                                        <span className="text-zinc-600 text-sm">Pending</span>
                                        <span className="text-lg font-semibold text-zinc-400 tabular-nums">{taskStats.pending}</span>
                                    </div>
                                    <div className="flex items-center justify-between py-3">
                                        <span className="text-zinc-600 text-sm">Completed</span>
                                        <span className="text-lg font-semibold text-zinc-900 tabular-nums">{taskStats.completed}</span>
                                    </div>

                                    {taskStats.total > 0 && (
                                        <div className="pt-4 mt-2">
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="text-zinc-400 text-xs uppercase tracking-wide">Progress</span>
                                                <span className="text-zinc-900 text-sm font-medium tabular-nums">{Math.round((taskStats.completed / taskStats.total) * 100)}%</span>
                                            </div>
                                            <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-zinc-900 rounded-full transition-all duration-500"
                                                    style={{ width: `${(taskStats.completed / taskStats.total) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-2 space-y-6 flex flex-col">
                            <div className="bg-white rounded-xl border border-zinc-200/80 p-4 shadow-sm shadow-zinc-900/5">
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <div className="flex-1 relative">
                                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        <input
                                            type="text"
                                            placeholder="Search tasks..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-11 pr-4 py-2.5 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:bg-white focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all duration-200 text-sm"
                                        />
                                    </div>

                                    <Select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        placeholder="All Status"
                                        options={[
                                            { value: '', label: 'All Status' },
                                            { value: 'pending', label: 'Pending' },
                                            { value: 'completed', label: 'Completed' }
                                        ]}
                                        className="min-w-[140px]"
                                    />

                                    <button
                                        onClick={handleCreateTask}
                                        className="px-5 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-medium transition-all duration-200 flex items-center gap-2 text-sm shadow-sm hover:shadow-md hover:-translate-y-0.5"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        <span className="hidden sm:inline">New Task</span>
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3 flex-1">
                                {error && (
                                    <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200">
                                        <p className="text-zinc-700 text-sm">{error}</p>
                                    </div>
                                )}

                                {loading ? (
                                    <div className="flex items-center justify-center py-20">
                                        <div className="w-7 h-7 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                ) : tasks.length === 0 ? (
                                    <div className="bg-white rounded-xl border border-zinc-200/80 p-16 text-center shadow-sm shadow-zinc-900/5">
                                        <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-zinc-100 flex items-center justify-center border border-zinc-200">
                                            <svg className="w-7 h-7 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                        </div>
                                        <p className="text-zinc-500 font-medium">No tasks found</p>
                                        <p className="text-zinc-400 text-sm mt-2">Create your first task to get started</p>
                                    </div>
                                ) : (
                                    tasks.map(task => (
                                        <TaskCard
                                            key={task._id}
                                            task={task}
                                            onEdit={handleEditTask}
                                            onDelete={handleDeleteClick}
                                        />
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </main>

                <TaskModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setEditingTask(null);
                    }}
                    onSubmit={handleSubmitTask}
                    task={editingTask}
                    isLoading={isSubmitting}
                />

                <ConfirmModal
                    isOpen={deleteModalOpen}
                    onClose={handleCancelDelete}
                    onConfirm={handleConfirmDelete}
                    title="Delete Task"
                    message="Are you sure you want to delete this task? This action cannot be undone."
                    confirmText="Delete"
                    cancelText="Cancel"
                    isLoading={isDeleting}
                    variant="danger"
                />
            </div>
        </ProtectedRoute>
    );
}
