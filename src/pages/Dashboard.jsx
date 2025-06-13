import Button from '~/components/ui/Button'
import Card from '~/components/ui/Card'

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold text-primary-700 dark:text-primary-300">
          Dashboard
        </h1>
        <p className="text-gray-500 dark:text-gray-400">Overview & Quick Actions</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <p className="text-sm font-medium">Total Properties</p>
          <p className="text-2xl font-bold mt-1">12</p>
        </Card>
        <Card>
          <p className="text-sm font-medium">Active Tenants</p>
          <p className="text-2xl font-bold mt-1">8</p>
        </Card>
        <Card>
          <p className="text-sm font-medium">Pending Payments</p>
          <p className="text-2xl font-bold mt-1">$2,350</p>
        </Card>
        <Card>
          <p className="text-sm font-medium">Open Requests</p>
          <p className="text-2xl font-bold mt-1">3</p>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-4">
          <Button>Add Property</Button>
          <Button>Add Tenant</Button>
          <Button>Log Payment</Button>
          <Button>Create Request</Button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Recent Activity
        </h2>
        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
          <li>✅ Lease created for John Doe</li>
          <li>💸 Rent payment logged - $1,200</li>
          <li>🛠 Maintenance request submitted for Unit 204</li>
          <li>🏠 New property listed: Maple Heights</li>
        </ul>
      </div>
    </div>
  )
}
