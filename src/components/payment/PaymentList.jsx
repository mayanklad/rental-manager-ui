import Button from '~/components/ui/Button'

export default function PaymentList({ payments, onEdit, onDelete }) {

  return (
    <div className="overflow-x-auto shadow-md rounded-xl bg-white dark:bg-gray-800">
      <table className="min-w-full text-center">
        <thead className="bg-gray-100 dark:bg-gray-700 rounded-t-xl text-lg font-semibold">
          <tr className='border-b border-gray-200 dark:border-gray-600'>
            <th className="px-4 py-3 text-gray-700">ID</th>
            <th className="px-4 py-3 text-gray-700">Date</th>
            <th className="px-4 py-3 text-gray-700">Lease / Property</th>
            <th className="px-4 py-3 text-gray-700">Tenants</th>
            <th className="px-4 py-3 text-gray-700">Amount ($)</th>
            <th className="px-4 py-3 text-gray-700 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200 dark:divide-gray-600'>
          {payments.map((p) => {
            return (
              <tr
                key={p.id}
                className='bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors '
              >
                <td className="px-4 py-3">{p.id}</td>
                <td className="px-4 py-3">{p.payment_date}</td>
                <td className="px-4 py-3">
                  #{p.lease_id} • {p.property_id || 'Property'}
                </td>
                <td className="px-4 py-3">{p.tenant_ids || 'All tenants'}</td>
                <td className="px-4 py-3">{p.amount.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Button
                      label="Edit"
                      type="secondary"
                      onClick={() => onEdit(p)}
                    >
                      Edit
                    </Button>
                    <Button
                      label="Delete"
                      type="danger"
                      onClick={() => onDelete(p.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
