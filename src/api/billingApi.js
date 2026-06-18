import api from './axios'

export const createBillApi     = (data) => api.post('/admin/bills', data)
export const getDashboardApi   = ()     => api.get('/admin/dashboard')
export const resetDashboardApi = ()     => api.post('/admin/dashboard/reset')
export const getTodayBillsApi  = ()     => api.get('/admin/bills/today')
export const getAllBillsApi     = ()     => api.get('/admin/bills/all')
export const deleteBillApi     = (id)   => api.delete(`/admin/bills/${id}`)