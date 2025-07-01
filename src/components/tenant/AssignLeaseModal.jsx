import React, { useState, useEffect } from 'react'
import { getAllLeases, createLease, updateLease } from '~/api/leaseApi'

export default function AssignLeaseModal({ tenant, onClose }) {
  const [leases, setLeases] = useState([])
  const [loadingLeases, setLoadingLeases] = useState(false)
  const [selectedLeaseId, setSelectedLeaseId] = useState('')
  const [isCreatingNew, setIsCreatingNew] = useState(false)

  // For new lease creation form
  const [rent, setRent] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [propertyId, setPropertyId] = useState('')

  const fetchLeases = async () => {
    const data = await getAllLeases()
    console.log('Fetched leases:', data)
    setLeases(data)
  }

  useEffect(() => {
      setLoadingLeases(true)
      try {
        fetchLeases()
      } catch (error) {
        console.error('Failed to fetch leases', error)
      }
      setLoadingLeases(false)
  }, [])

  const handleAssignExisting = async () => {
    if (!selectedLeaseId) {
      alert('Please select a lease to assign')
      return
    }
    try {
      // Backend API should handle assigning tenant to lease
      // We'll assume updateLease merges tenantIds
      const lease = leases.find((l) => l.id == selectedLeaseId)
      if (!lease) {
        alert('Selected lease not found')
        return
      }
      const updatedTenantIds = lease.tenant_ids
        ? [...lease.tenant_ids, tenant.id]
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded shadow-lg w-full max-w-lg p-6 overflow-auto max-h-[90vh]">
        <h3 className="text-xl font-semibold mb-4">
          Assign or Create Lease for <span className="italic">{tenant.name}</span>
        </h3>

        <div className="mb-4">
          <button
            onClick={() => setIsCreatingNew(false)}
            className={`px-4 py-2 rounded-l ${
              !isCreatingNew ? 'bg-blue-600 text-white' : 'bg-gray-300'
            }`}
          >
            Assign Existing Lease
          </button>
          <button
            onClick={() => setIsCreatingNew(true)}
            className={`px-4 py-2 rounded-r ${
              isCreatingNew ? 'bg-blue-600 text-white' : 'bg-gray-300'
            }`}
          >
            Create New Lease
          </button>
        </div>

        {!isCreatingNew && (
          <div>
            {loadingLeases ? (
              <p>Loading leases...</p>
            ) : (
              <select
                value={selectedLeaseId}
                onChange={(e) => setSelectedLeaseId(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">-- Select Lease --</option>
                {leases.map((lease) => (
                  <option key={lease.id} value={lease.id}>
                    Lease #{lease.id} - Property: {lease.property_id}{/* {lease.property?.name || lease.propertyId} */}
                  </option>
                ))}
              </select>
            )}

            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignExisting}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Assign Lease
              </button>
            </div>
          </div>
        )}

        {isCreatingNew && (
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleCreateNew()
              }}
              className="space-y-4"
            >
              <div>
                <label className="block font-semibold mb-1" htmlFor="propertyId">
                  Property ID *
                </label>
                <input
                  id="propertyId"
                  type="text"
                  value={propertyId}
                  onChange={(e) => setPropertyId(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Enter property ID"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1" htmlFor="rent">
                  Rent *
                </label>
                <input
                  id="rent"
                  type="number"
                  step="0.01"
                  value={rent}
                  onChange={(e) => setRent(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Monthly rent amount"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1" htmlFor="startDate">
                  Start Date *
                </label>
                <input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1" htmlFor="endDate">
                  End Date *
                </label>
                <input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                >
                  Create Lease
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
