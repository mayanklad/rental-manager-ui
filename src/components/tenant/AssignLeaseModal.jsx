import React, { useState, useEffect } from 'react'
import { getAllLeases, createLease, updateLease } from '~/api/leaseApi'

export default function AssignLeaseModal({ tenant, onClose }) {
  const [leases, setLeases] = useState([])
  const [loadingLeases, setLoadingLeases] = useState(false)
  const [selectedLeaseId, setSelectedLeaseId] = useState('')
  const [isCreatingNew, setIsCreatingNew] = useState(false)

  // New lease form state
  const [rent, setRent] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [propertyId, setPropertyId] = useState('')

  const fetchLeases = async () => {
    setLoadingLeases(true)
    try {
      const data = await getAllLeases()
      setLeases(data)
    } catch (error) {
      console.error('Failed to fetch leases', error)
    }
    setLoadingLeases(false)
  }

  useEffect(() => {
    fetchLeases()
  }, [])

  const handleAssignExisting = async () => {
    if (!selectedLeaseId) {
      alert('Please select a lease to assign')
      return
    }
    try {
      const lease = leases.find((l) => l.id === selectedLeaseId)
      if (!lease) {
        alert('Selected lease not found')
        return
      }
      const updatedTenantIds = lease.tenant_ids
        ? [...new Set([...lease.tenant_ids, tenant.id])]
        : [tenant.id]
      await updateLease(selectedLeaseId, { ...lease, tenant_ids: updatedTenantIds })
      alert('Lease assigned successfully')
      onClose()
    } catch (error) {
      console.error(error)
      alert('Failed to assign lease')
    }
  }

  const handleCreateNew = async () => {
    if (!propertyId || !rent || !startDate || !endDate) {
      alert('Please fill all required fields for new lease')
      return
    }
    try {
      const newLease = {
        property_id: propertyId,
        tenant_ids: [tenant.id],
        start_date: startDate,
        end_date: endDate,
        rent_amount: parseFloat(rent),
      }
      await createLease(newLease)
      alert('New lease created and assigned successfully')
      onClose()
    } catch (error) {
      console.error(error)
      alert('Failed to create lease')
    }
  }

  return (
    <div className="fixed inset-0 z-50 p-4 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg p-6 max-h-[90vh] overflow-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg space-y-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Assign or Create Lease for{' '}
          <span className="italic">{tenant.full_name}</span>
        </h3>

        <div className="flex gap-2 border-b border-gray-300 dark:border-gray-600 pb-2 mb-4">
          <button
            onClick={() => setIsCreatingNew(false)}
            className={`flex-1 py-2 rounded-md font-medium transition ${
              !isCreatingNew
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Assign Existing
          </button>
          <button
            onClick={() => setIsCreatingNew(true)}
            className={`flex-1 py-2 rounded-md font-medium transition ${
              isCreatingNew
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Create New
          </button>
        </div>

        {!isCreatingNew ? (
          <>
            <select
              value={selectedLeaseId}
              onChange={(e) => setSelectedLeaseId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              disabled={loadingLeases}
            >
              <option value="">-- Select Lease --</option>
              {leases.map((lease) => (
                <option key={lease.id} value={lease.id}>
                  Lease #{lease.id} – Property: {lease.property_id}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-white transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignExisting}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition"
              >
                Assign Lease
              </button>
            </div>
          </>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleCreateNew()
            }}
            className="space-y-4"
          >
            <div>
              <label htmlFor="propertyId" className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
                Property ID <span className="text-red-500">*</span>
              </label>
              <input
                id="propertyId"
                type="text"
                value={propertyId}
                onChange={(e) => setPropertyId(e.target.value)}
                placeholder="Enter Property ID"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            <div>
              <label htmlFor="rent" className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
                Monthly Rent <span className="text-red-500">*</span>
              </label>
              <input
                id="rent"
                type="number"
                step="0.01"
                value={rent}
                onChange={(e) => setRent(e.target.value)}
                placeholder="$1000.00"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            <div>
              <label htmlFor="startDate" className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            <div>
              <label htmlFor="endDate" className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
                End Date <span className="text-red-500">*</span>
              </label>
              <input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-white transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition"
              >
                Create Lease
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
