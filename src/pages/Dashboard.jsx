export default function Dashboard() {
  return (
    <div className="space-y-10">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Overview & Quick Actions
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Properties", value: "12" },
          { label: "Active Tenants", value: "8" },
          { label: "Pending Payments", value: "$2,350" },
          { label: "Open Requests", value: "3" },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
            <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          {["Add Property", "Add Tenant", "Log Payment", "Create Request"].map(
            (action, index) => (
              <button
                key={index}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition"
              >
                {action}
              </button>
            )
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Recent Activity
        </h2>
        <ul className="space-y-2 leading-relaxed text-gray-700 dark:text-gray-300">
          <li>✅ Lease created for John Doe</li>
          <li>💸 Rent payment logged - $1,200</li>
          <li>🛠 Maintenance request submitted for Unit 204</li>
          <li>🏠 New property listed: Maple Heights</li>
        </ul>
      </div>
    </div>
  )
}
