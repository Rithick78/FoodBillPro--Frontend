import api from './axios'

export const loginApi = (credentials) => api.post('/auth/login', credentials)