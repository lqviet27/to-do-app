import axios from 'axios';

export const API_URL = process.env.REACT_APP_TO_DO_API_URL;

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const authApi = {
    logIn: (data) => api.post('/auth/login', data),
    signUp: (data) => api.post('/auth/register', data),
}

export const taskApi = {
    getTasks: (userId) => api.get(`/tasks/user/${userId}`), 
    getTasksByCategory: (cateId) => api.get(`/tasks/category/${cateId}`),
    createTask: (data) => api.post('/tasks/create', data),
    toggleTaskStatus: (taskId) => api.put(`/tasks/toggle/${taskId}`),
    updateTask: (taskId, data) => api.put(`/tasks/update/${taskId}`, data),
    deleteTask: (taskId) => api.delete(`/tasks/delete/${taskId}`),
}

export const categoryApi = {
    getCategories: (userId) => api.get(`/categories/user/${userId}`),
    createCategory: (data) => api.post('/categories/create', data),
    updateCategory: (cateId, data) => api.put(`/categories/update/${cateId}`, data),
    deleteCategory: (cateId) => api.delete(`/categories/delete/${cateId}`),
}

export const userApi = {
    updateUser: (userId, data) => api.put(`/users/update/${userId}`, data),
    changePassword: (userId, data) => api.put(`/users/cp/${userId}`, data),
    resetPassword: (userId) => api.put(`/users/rp/${userId}`),
}