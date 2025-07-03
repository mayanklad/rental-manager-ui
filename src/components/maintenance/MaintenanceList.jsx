import clsx from 'clsx'
import Button from '~/components/ui/Button'

const statusColors = {
  OPEN: 'bg-yellow-100 text-yellow-800',
  IN_PROGRESS: 'bg-blue-100 text-blue-800',
  RESOLVED: 'bg-green-100 text-green-800',
}

export default function MaintenanceList({ requests, onEdit, onStatusChange, onDelete }) {

  const isOverdue = (date, days = 7) => {
    if (!date) return false

    const createdAt = new Date(date).getTime()
    const cutoff = Date.now() - days * 24 * 60 * 60 * 1000

    return createdAt < cutoff
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {requests.map((r) => {
        const overdue = r.status !== 'RESOLVED' && isOverdue(r.created_at)

        return (
          <div
            key={r.id}
            className={clsx(
              'bg-white dark:bg-gray-800 p-4 rounded-xl shadow space-y-2 flex flex-col h-full',
              overdue && 'ring-2 ring-red-400'
            )}
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              {/* <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {r.propertyName || `Property #${r.property_id}`}
              </h3> */}
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                {r.propertyName || `Property #${r.property_id}`}
                {overdue && (
                  <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                    Overdue
                  </span>
                )}
              </h3>

              <select
                value={r.status}
                onChange={(e) => onStatusChange(r, e.target.value)}
                className={clsx(
                  'text-sm font-medium rounded-full appearance-none focus:outline-none',
                  'transition-colors duration-200 border-none',
                  statusColors[r.status]
                )}
              >
                <option value="OPEN" className="bg-yellow-100 text-yellow-800">Open</option>
                <option value="IN_PROGRESS" className="bg-blue-100 text-blue-800">In Progress</option>
                <option value="RESOLVED" className="bg-green-100 text-green-800">Resolved</option>
              </select>
            </div>

            {/* Title */}
            <p className="font-medium text-gray-900 dark:text-gray-100">{r.title}</p>

            {/* Description */}
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
              {r.description}
            </p>

            {/* Footer */}
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 pt-2 mt-auto">
              <span>{r.tenantName || `Tenant #${r.tenant_id}`}</span>
              <span>{new Date(r.created_at).toLocaleDateString()}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-3">
              <Button label="Edit" type="secondary" onClick={() => onEdit(r)}>Edit</Button>
              <Button label="Delete" type="danger" onClick={() => onDelete(r.id)}>Delete</Button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
