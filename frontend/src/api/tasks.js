import api from '@/lib/axios';

export const tasksApi = {
    create: async (data) => {
        const response = await api.post('/tasks', data);
        return response.data;
    },

    getAll: async (params = {}) => {
        const response = await api.get('/tasks', { params });
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/tasks/${id}`);
        return response.data;
    },

    update: async (id, data) => {
        const response = await api.put(`/tasks/${id}`, data);
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`/tasks/${id}`);
        return response.data;
    }
};

export default tasksApi;
