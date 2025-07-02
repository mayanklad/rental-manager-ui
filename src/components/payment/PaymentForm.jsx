import { useState, useEffect } from 'react'
import { getAllLeases }  from '~/api/leaseApi'
import Button from '~/components/ui/Button'

export default function PaymentForm({ initialData, onSave, onCancel }) {

  const [leases, setLeases] = useState([])
  const [formData, setFormData] = useState(
    initialData || { lease_id: "", payment_date: "", amount: "", status: "done" }
  )

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  const fetchLeases = async () => {
    const data = await getAllLeases()
    setLeases(data)
  }

  useEffect(() => {
    fetchLeases()
  }, [])

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4'
    >
      <h2 className="text-xl font-bold">
        {initialData ? "Edit Payment" : "New Payment"}
      </h2>

      <div>
        <label className='block text-sm font-medium'>Lease</label>
        <select
          name='lease_id'
          value={formData.lease_id}
          onChange={handleChange}
          required
          className='mt-1 w-full px-3 py-2 border rounded-lg'
        >
          <option value=''>-- Select Lease --</option>
          {leases.map((l) => (
            <option key={l.id} value={l.id}>
              Lease: {l.id} • Property: {l.property_id} • Tenants: {l.tenant_ids.join(', ')}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className='block text-sm font-medium'>Payment Date</label>
        <input
          type='date'
          name='payment_date'
          value={formData.payment_date}
          onChange={handleChange}
          required
          className='mt-1 w-full px-3 py-2 border rounded-lg'
        />
      </div>
      <div>
        <label className='block text-sm font-medium'>Amount ($)</label>
        <input
          type='number'
          name='amount'
          min='0'
          step='1'
          value={formData.amount}
          onChange={handleChange}
          required
          className='mt-1 w-full px-3 py-2 border rounded-lg'
        />
      </div>
      {/* <div>
      <label className='block text-sm font-medium'>Status</label>
        <select
          name='status'
          value={formData.status}
          onChange={handleChange}
          className='mt-1 w-full px-3 py-2 border rounded-lg'
        >
          <option value='PAID'>Paid</option>
          <option value='LATE'>Late</option>
          <option value='MISSED'>Missed</option>
        </select>
      </div> */}

      <div className="flex gap-4 pt-4">
        <Button label="Save">Save</Button>
        <Button label="Cancel" type="ghost" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  )
}
