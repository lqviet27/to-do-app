import axios from 'axios';

export const API_URL = process.env.REACT_APP_TO_DO_API_URL;

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const authApi = {
    singIn: (data) => api.post('/auth/signin', data),
    signUp: (data) => api.post('/auth/signup', data),
}

export const taskApi = {
    // getTasks : (data) => api.get('/tasks', data),
    // getTasks: (data) => api.get('/tasks', { params: data }), 
    getTasks: (userId) => api.get(`/tasks/user/${userId}`), 
    createTask: (data) => api.post('/tasks/create', data),
    toggleTaskStatus: (taskId) => api.put(`/tasks/toggle/${taskId}`),
}

export const categoryApi = {
    getCategories: (userId) => api.get(`/categories/user/${userId}`),
}