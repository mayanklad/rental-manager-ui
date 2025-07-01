import Button from '~/components/ui/Button'

export default function LeaseList({ leases, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {leases.map((prop) => (
        <div
          key={prop.id}
          className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow space-y-2"
        >
          <h2 className="text-lg font-semibold">{prop.id}</h2>
          <p className="text-sm text-gray-500">Property ID: {prop.property_id}</p>
          <p className="text-sm text-gray-500">Rent Amount: ${prop.rent_amount}</p>
          <p className="text-sm text-gray-500">Tenant IDs: {prop.tenant_ids.join(', ')}</p>
          <p className="text-sm text-gray-500">Start Date: {prop.start_date}</p>
          <p className="text-sm text-gray-500">End Date: {prop.end_date}</p>
          <div className="flex gap-2 pt-2">
            <Button label="Edit" type="secondary" onClick={() => onEdit(prop)}>Edit</Button>
            <Button label="Delete" type="danger" onClick={() => onDelete(prop.id)}>Delete</Button>
          </div>
        </div>
      ))}
    </div>
  )
}
