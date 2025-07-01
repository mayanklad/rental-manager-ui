import { useEffect, useState } from 'react'
import {
  getAllLeases,
  createLease,
  updateLease,
  deleteLease,
} from '~/api/leaseApi'
import LeaseList from '~/components/lease/LeaseList'
import LeaseForm from '~/components/lease/LeaseForm'
import Button from '~/components/ui/Button'

export default function Leases() {
  const [leases, setLeases] = useState([])
  const [editingLease, setEditingLease] = useState(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchLeases()
  }, [])

  const fetchLeases = async () => {
    const data = await getAllLeases()
    setLeases(data)
  }

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
    if (window.confirm("Are you sure you want to delete this lease?")) {
      await deleteLease(id)
      fetchLeases()
    }
  }

  return (
    <div className="space-y-8">
      {/* Heading */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary-700 dark:text-primary-300">
          Manage Leases
        </h1>
        <Button label="Add Lease" onClick={() => setShowForm(true)}>Add Lease</Button>
      </div>

      <LeaseList
        leases={leases}
        onEdit={(prop) => {
          setEditingLease(prop)
          setShowForm(true)
        }}
        onDelete={handleDelete}
      />

      {showForm && (
        <LeaseForm
          initialData={editingLease}
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
