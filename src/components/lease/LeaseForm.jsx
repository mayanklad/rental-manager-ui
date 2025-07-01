import React, { useState, useEffect } from 'react'
import { getAllProperties } from '~/api/propertyApi'
import { getAllTenants } from '~/api/tenantApi'
import { createLease, updateLease } from '~/api/leaseApi'

export default function LeaseForm({ lease, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    start_date: '',
    end_date: '',
    rent_amount: '',
    property_id: '',
    tenant_ids: [],
  })
  const [properties, setProperties] = useState([])
  const [loadingProperties, setLoadingProperties] = useState(false)
  const [selectedpropertyId, setSelectedPropertyId] = useState('')
  const [tenants, setTenants] = useState([])
  const [loadingTenants, setLoadingTenants] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setLoadingProperties(true)
    getAllProperties()
      .then((data) => {
        setProperties(data)
      })
      .finally(() => setLoadingProperties(false))

    setLoadingTenants(true)
    getAllTenants()
      .then((data) => {
        setTenants(data)
      })
      .finally(() => setLoadingTenants(false))
  }, [])

  useEffect(() => {
    if (lease) {
      setFormData({
        start_date: lease.start_date || '',
        end_date: lease.end_date || '',
        rent_amount: lease.rent_amount || '',
        property_id: lease.property_id || (lease.property?.id || ''),
      })
    }
  }, [lease])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      if (lease && lease.id) {
        await updateLease(lease.id, formData)
      } else {
        await createLease(formData)
      }
      onSave()
    } catch (error) {
      alert('Error saving lease: ' + error.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">{lease ? 'Edit Lease' : 'New Lease'}</h2>

      <label className="block mb-2">
        Start Date
        <input
          type="date"
          name="start_date"
          value={formData.start_date}
          onChange={handleChange}
          required
          className="block w-full mt-1 border rounded px-3 py-2"
        />
      </label>

      <label className="block mb-2">
        End Date
        <input
          type="date"
          name="end_date"
          value={formData.end_date}
          onChange={handleChange}
          required
          className="block w-full mt-1 border rounded px-3 py-2"
        />
      </label>

      <label className="block mb-2">
        Rent Amount ($)
        <input
          type="number"
          name="rent_amount"
          value={formData.rent_amount}
          onChange={handleChange}
          min="0"
          step="0.01"
          required
          className="block w-full mt-1 border rounded px-3 py-2"
        />
      </label>

      <label className="block mb-2">
        Property
        {loadingProperties ? (
          <p>Loading properties...</p>
        ) : (
          <select
            name="property_id"
            value={formData.property_id}
            onChange={handleChange}
            // value={selectedpropertyId}
            // onChange={(e) => setSelectedPropertyId(e.target.value)}
            required
            className="block w-full mt-1 border rounded px-3 py-2"
          >
            <option value="">-- Select Property --</option>
            {properties.map((property) => (
              <option key={property.id} value={property.id}>
                {property.name}
              </option>
            ))}
          </select>
        )}
      </label>

      <label className="block mb-2">
        Tenants
        {loadingTenants ? (
          <p>Loading tenants...</p>
        ) : (
          <div className="mt-2 space-y-2">
            {tenants.map((tenant) => (
              <label key={tenant.id} className="block">
                <input
                  type="checkbox"
                  name="tenant_ids"
                  value={tenant.id}
                  checked={formData.tenant_ids.includes(tenant.id)}
                  onChange={(e) => {
                    const { checked, value } = e.target
                    const id = parseInt(value) // or value if it is a string
                    const newTenantIds = checked
                      ? [...formData.tenant_ids, id]
                      : formData.tenant_ids.filter((tid) => tid !== id)
                    setFormData((prev) => ({
                      ...prev,
                      tenant_ids: newTenantIds,
                    }))
                  }}
                  className="mr-2"
                />
                {tenant.full_name}
              </label>
            ))}
          </div>
        )}
      </label>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  )
}
