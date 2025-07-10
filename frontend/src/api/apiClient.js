import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_FOR_CLIENT_URL,
  headers: { 'Content-Type': 'application/json' },
})

// inject the token from localStorage:
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default apiClient
