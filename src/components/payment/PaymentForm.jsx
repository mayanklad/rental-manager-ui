import { useState, useEffect } from 'react'
import { getAllLeases } from '~/api/leaseApi'

export default function PaymentForm({ initialData, onSave, onCancel }) {
  const [leases, setLeases] = useState([])
  const [formData, setFormData] = useState(
    initialData || {
      lease_id: '',
      payment_date: '',
      amount: '',
      status: 'done',
    }
  )

  useEffect(() => {
    const fetchLeases = async () => {
      const data = await getAllLeases()
      setLeases(data)
    }
    fetchLeases()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 z-50 p-4 flex items-center justify-center bg-black bg-opacity-50">
      <form
        onSubmit={handleSubmit}
        className="p-6 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {initialData ? 'Edit Payment' : 'New Payment'}
        </h2>

        <div className="space-y-4">
          {/* Lease Selection */}
          <div className="space-y-2">
            <label className="block font-medium text-gray-700 dark:text-gray-300">
              Lease <span className="text-red-500">*</span>
            </label>
            <select
              name="lease_id"
              id="lease_id"
              value={formData.lease_id}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            >
              <option value="">-- Select Lease --</option>
              {leases.map((l) => (
                <option key={l.id} value={l.id}>
                  Lease #{l.id} • Property: {l.property_id} • Tenants: {l.tenant_ids.join(', ')}
                </option>
              ))}
            </select>
          </div>

          {/* Payment Date */}
          <div className="space-y-2">
            <label className="block font-medium text-gray-700 dark:text-gray-300">
              Payment Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="payment_date"
              id="payment_date"
              value={formData.payment_date}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            />
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <label className="block font-medium text-gray-700 dark:text-gray-300">
              Amount ($) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="amount"
              id="amount"
              min="0"
              step="1"
              value={formData.amount}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6 justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md dark:bg-gray-700 dark:text-white transition hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md dark:bg-indigo-500 transition hover:bg-indigo-700 dark:hover:bg-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}
