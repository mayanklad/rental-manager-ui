import clsx from 'clsx'

const statusClasses = {
  OPEN: 'bg-yellow-200 text-yellow-800',
  IN_PROGRESS: 'bg-blue-200 text-blue-800',
  RESOLVED: 'bg-green-200 text-green-800',
}

export default function MaintenanceList({ requests, onEdit, onStatusChange, onDelete }) {
  const isOverdue = (date, days = 7) => {
    if (!date) return false
    const createdAt = new Date(date).getTime()
    const cutoff = Date.now() - days * 24 * 60 * 60 * 1000
    return createdAt < cutoff
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {requests.map((r) => {
        const overdue = r.status !== 'RESOLVED' && isOverdue(r.created_at)

        return (
          <div
            key={r.id}
            className="relative flex flex-col h-full p-6 space-y-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-transform hover:scale-102"
          >
            {/* Status Ribbon */}
            <div
              className={clsx(
                'absolute top-0 right-0 rounded-bl-lg rounded-tr-lg px-3 py-1 text-sm font-semibold uppercase',
                statusClasses[r.status] || 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-200'
              )}
            >
              {r.status.replace('_', ' ')}
            </div>

            {/* Header */}
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {r.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {r.propertyName || `Property #${r.property_id}`}
            </p>

            {/* Details */}
            <p className="grid grid-cols-2 gap-3">
              <p className="text-gray-600 dark:text-gray-400">
                <span className="font-medium text-gray-700 dark:text-gray-300">Tenant:</span> {r.tenant_id}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <span className="font-medium text-gray-700 dark:text-gray-300">Created:</span> {new Date(r.created_at).toLocaleDateString()}
              </p>
              <p className="col-span-full text-gray-600 dark:text-gray-400">
                <span className="font-medium text-gray-700 dark:text-gray-300">Description</span>
                <p>
                {r.description}
                </p>
              </p>
            </p>

            {/* Overdue badge */}
            {overdue && (
              <div className="px-3 py-1 w-fit rounded-md bg-red-100 font-semibold text-red-700">
                ⚠ Overdue
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4 pt-4 mt-auto">
              {/* Uncomment if status change dropdown is needed */}
              {/*
              <select
                value={r.status}
                onChange={(e) => onStatusChange(r, e.target.value)}
                className="text-sm rounded border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="OPEN">Open</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="RESOLVED">Resolved</option>
              </select>
              */}
              <button
                onClick={() => onEdit(r)}
                className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(r.id)}
                className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
