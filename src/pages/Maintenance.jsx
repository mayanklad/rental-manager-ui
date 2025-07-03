import { useEffect, useState } from 'react'
import MaintenanceList from '~/components/maintenance/MaintenanceList'
import MaintenanceForm from '~/components/maintenance/MaintenanceForm'
import {
  getAllMaintenances,
  createMaintenance,
  updateMaintenance,
  deleteMaintenance
} from '~/api/maintenanceApi'
import Button from '~/components/ui/Button'

export default function Maintenance() {
  const [requests, setRequests] = useState([])
  const [editingRequest, setEditingRequest] = useState(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    const data = await getAllMaintenances()
    setRequests(data)
  }

  const handleSave = async (formData) => {
    if (editingRequest) {
      await updateMaintenance(editingRequest.id, formData)
    } else {
      await createMaintenance(formData)
    }
    setShowForm(false)
    setEditingRequest(null)
    fetchRequests()
  }

  const handleStatusChange = async (data, status) => {
    data.status = status
    await updateMaintenance(data.id, data)
    fetchRequests()
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this maintenance request?")) {
      await deleteMaintenance(id)
      fetchRequests()
    }
  }


  return (
    <div className="space-y-8">
      {/* Heading */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary-700 dark:text-primary-300">
          Manage Maintenance Requests
        </h1>
        <Button label="Add Request" onClick={() => setShowForm(true)}>Add Request</Button>
      </div>

      <MaintenanceList
        requests={requests}
        onEdit={(request) => {
          setEditingRequest(request)
          setShowForm(true)
        }}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />

      {showForm && (
        <MaintenanceForm
          initialData={editingRequest}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false)
            setEditingRequest(null)
          }}
        />
      )}
    </div>
  )
}
