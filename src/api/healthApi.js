import axios from 'axios'

export const isBackendUp = async () => {
  
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? ''
  console.debug('Checking backend health at:', BACKEND_URL)

  try {
    const res = await axios.get(`${BACKEND_URL}/actuator/health`, { timeout: 5000 })
    return res.status === 200 && (res.data?.status ?? 'UP') === 'UP'
  } catch {
    return false
  }
}
