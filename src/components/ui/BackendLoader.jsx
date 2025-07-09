import { useEffect, useState } from 'react'
import { isBackendUp } from '~/api/healthApi'

export default function BackendLoader({ children }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false

    const poll = async () => {
      const up = await isBackendUp()
      console.debug('Backend is up:', up)
      
      if (up && !cancelled) setReady(true)
      else if (!cancelled) setTimeout(poll, 2000)
    }

    poll()
    return () => { cancelled = true }
  }, [])

  if (ready) return children

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-gray-950 z-50">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-6">
        Gently waking the server from its nap... Hang tight!
      </h2>

      <div className="w-56 h-2 bg-gray-200 dark:bg-gray-800 overflow-hidden rounded">
        <div className="h-full bg-blue-600 dark:bg-blue-400 animate-loading-bar" />
      </div>
    </div>
  )
}
