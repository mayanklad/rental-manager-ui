import Button from '~/components/ui/Button'

export default function LeaseList({ leases, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {leases.map((lease) => (
        <div
          key={lease.id}
          className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow space-y-2"
        >
          <h2 className="text-lg font-semibold">Lease ID: {lease.id}</h2>
          <p className="text-sm text-gray-500">Property ID: {lease.property_id}</p>
          <p className="text-sm text-gray-500">Rent Amount: ${lease.rent_amount}</p>
          <p className="text-sm text-gray-500">Tenant IDs: {lease.tenant_ids.join(', ')}</p>
          <p className="text-sm text-gray-500">Start Date: {lease.start_date}</p>
          <p className="text-sm text-gray-500">End Date: {lease.end_date}</p>
          <div className="flex gap-2 pt-2">
            <Button label="Edit" type="secondary" onClick={() => onEdit(lease)}>Edit</Button>
            <Button label="Delete" type="danger" onClick={() => onDelete(lease.id)}>Delete</Button>
          </div>
        </div>
      ))}
    </div>
  )
}
