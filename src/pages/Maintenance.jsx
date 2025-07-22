import { useEffect, useState } from 'react'
import MaintenanceList from '~/components/maintenance/MaintenanceList'
import MaintenanceForm from '~/components/maintenance/MaintenanceForm'
import {
  getAllMaintenances,
  createMaintenance,
  updateMaintenance,
  deleteMaintenance,
} from '~/api/maintenanceApi'

export default function Maintenance() {
  const [requests, setRequests] = useState([])
  const [editingRequest, setEditingRequest] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const fetchRequests = async () => {
    const data = await getAllMaintenances()
    setRequests(data)
  }

  useEffect(() => {
    fetchRequests()
  }, [])

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

  const handleStatusChange = async (request, status) => {
    const updatedRequest = { ...request, status }
    await updateMaintenance(request.id, updatedRequest)
    fetchRequests()
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this maintenance request?')) {
      await deleteMaintenance(id)
      fetchRequests()
    }
  }

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Manage Maintenance Requests
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition"
        >
          Add Request
        </button>
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
