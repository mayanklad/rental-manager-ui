import { useEffect, useState } from 'react'
import { isBackendUp } from '~/api/healthApi'

export default function BackendLoader({ children }) {
  const [ready, setReady] = useState(false)

  const messages = [
    "Gently waking the server from its nap... Hang tight!",
    "Our server hit snooze - waking it up now!",
    "Server's stretching and getting ready... Hang in there!",
    "The server is rubbing its eyes... Almost there!",
    "Fetching coffee for the server... One moment!",
    "Bringing the backend back from dreamland...",
    "Boots are lacing up... Server coming online.",
    "It's not you - the server just needed a power nap. Please wait!",
    "The server seems to be snoozing again... Trying to wake it!",
    "Server is stretching after a nap - please hold on!",
    "Just nudging the server awake... Give it a moment.",
    "Looks like the server fell asleep - waking it up now!",
    "The server is waking up slowly... Thanks for being patient!",
    "Server needs a sec to shake off the nap.",
    "Server's grabbing its coffee - please wait!",
    "Zzz... oh wait, it's waking up now!",
  ]

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
    <div className="fixed inset-0 flex flex-col items-center justify-center px-4 text-center bg-white dark:bg-gray-900 z-50">
      <h2 className="text-lg sm:text-xl md:text-2xl font-medium mb-6 text-gray-700 dark:text-gray-200">
        {messages[Math.floor(Math.random() * messages.length)]}
      </h2>

      <div className="w-full max-w-xs h-2 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
        <div className="h-full bg-indigo-600 dark:bg-indigo-500 animate-loading-bar" />
      </div>
    </div>
  )
}
