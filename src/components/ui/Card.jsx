export default function Card({ children }) {
  return (
    <div className="bg-surface shadow-md rounded-xl p-6 dark:bg-gray-800">
      {children}
    </div>
  )
}
