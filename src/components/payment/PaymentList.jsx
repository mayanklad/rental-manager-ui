export default function PaymentList({ payments, onEdit, onDelete }) {
  return (
    <table className="min-w-full text-left bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-transform hover:scale-102">
      <thead className="uppercase text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700">
        <tr>
          <th className="px-4 py-3">ID</th>
          <th className="px-4 py-3">Date</th>
          <th className="px-4 py-3">Lease / Property</th>
          <th className="px-4 py-3">Tenants</th>
          <th className="px-4 py-3">Amount ($)</th>
          <th className="px-4 py-3 text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
        {payments.map((p) => (
          <tr
            key={p.id}
            className="transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <td className="px-4 py-3">{p.id}</td>
            <td className="px-4 py-3">{p.payment_date}</td>
            <td className="px-4 py-3">
              #{p.lease_id} • {p.property_id || 'Property'}
            </td>
            <td className="px-4 py-3">{p.tenant_ids || 'All tenants'}</td>
            <td className="px-4 py-3">$ {p.amount.toFixed(2)}</td>
            <td className="px-4 py-3 flex justify-end gap-4">
              <button
                onClick={() => onEdit(p)}
                className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(p.id)}
                className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
