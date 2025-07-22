import { useEffect, useState } from 'react'
import {
  getAllLeases,
  createLease,
  updateLease,
  deleteLease,
} from '~/api/leaseApi'
import LeaseList from '~/components/lease/LeaseList'
import LeaseForm from '~/components/lease/LeaseForm'

export default function Leases() {
  const [leases, setLeases] = useState([])
  const [editingLease, setEditingLease] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const fetchLeases = async () => {
    const data = await getAllLeases()
    setLeases(data)
  }

  useEffect(() => {
    fetchLeases()
  }, [])

  const handleSave = async (formData) => {
    if (editingLease) {
      await updateLease(editingLease.id, formData)
    } else {
      await createLease(formData)
    }
    setShowForm(false)
    setEditingLease(null)
    fetchLeases()
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this lease?')) {
      await deleteLease(id)
      fetchLeases()
    }
  }

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Manage Leases
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition"
        >
          Add Lease
        </button>
      </div>

      <LeaseList
        leases={leases}
        onEdit={(lease) => {
          setEditingLease(lease)
          setShowForm(true)
        }}
        onDelete={handleDelete}
      />

      {showForm && (
        <LeaseForm
          lease={editingLease}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false)
            setEditingLease(null)
          }}
        />
      )}
    </div>
  )
}
