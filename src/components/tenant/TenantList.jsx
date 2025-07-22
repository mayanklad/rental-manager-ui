export default function TenantList({ tenants, onAssignLease }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tenants.map((tenant) => (
        <div
          key={tenant.id}
          className="h-full p-6 flex flex-col space-y-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-transform hover:scale-102"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {tenant.full_name}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            <span className="font-medium text-gray-700 dark:text-gray-300">Email:</span> {tenant.email}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            <span className="font-medium text-gray-700 dark:text-gray-300">Phone:</span> {tenant.phone}
          </p>

          {Array.isArray(tenant.lease_ids) && tenant.lease_ids.length > 0 ? (
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-medium text-gray-700 dark:text-gray-300">Lease IDs:</span> {tenant.lease_ids.join(', ')}
            </p>
          ) : (
            <p className="italic text-red-500">No lease assigned</p>
          )}

          <div className="flex gap-4 mt-auto pt-4">
            <button
              onClick={() => onAssignLease(tenant)}
              className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition"
            >
              Assign Lease
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
