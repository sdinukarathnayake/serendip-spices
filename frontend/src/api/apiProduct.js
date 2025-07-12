import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_FOR_PRODUCT_URL,
  headers: { 'Content-Type': 'application/json' },
})

// token name
const TOKEN_KEY = import.meta.env.VITE_TOKEN_STORAGE_KEY

apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export { TOKEN_KEY }
export default apiClient