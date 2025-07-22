export default function LeaseList({ leases, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {leases.map((lease) => (
        <div
          key={lease.id}
          className="h-full p-6 flex flex-col space-y-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-transform hover:scale-102"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Lease #{lease.id}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            <span className="font-medium text-gray-700 dark:text-gray-300">Property ID:</span> {lease.property_id}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            <span className="font-medium text-gray-700 dark:text-gray-300">Rent:</span> ${lease.rent_amount.toFixed(2)}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            <span className="font-medium text-gray-700 dark:text-gray-300">Tenants:</span> {lease.tenant_ids.join(', ') || 'None'}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            <span className="font-medium text-gray-700 dark:text-gray-300">Start:</span> {lease.start_date}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            <span className="font-medium text-gray-700 dark:text-gray-300">End:</span> {lease.end_date}
          </p>

          <div className="flex gap-4 pt-4 mt-auto">
            <button
              onClick={() => onEdit(lease)}
              className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(lease.id)}
              className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
