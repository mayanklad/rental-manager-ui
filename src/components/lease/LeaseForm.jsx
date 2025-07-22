import React, { useState, useEffect } from 'react'
import { getAllProperties } from '~/api/propertyApi'
import { getAllTenants } from '~/api/tenantApi'

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
  const [tenants, setTenants] = useState([])
  const [loadingTenants, setLoadingTenants] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setLoadingProperties(true)
    getAllProperties()
      .then(setProperties)
      .finally(() => setLoadingProperties(false))

    setLoadingTenants(true)
    getAllTenants()
      .then(setTenants)
      .finally(() => setLoadingTenants(false))
  }, [])

  useEffect(() => {
    if (lease) {
      setFormData({
        start_date: lease.start_date || '',
        end_date: lease.end_date || '',
        rent_amount: lease.rent_amount || '',
        property_id: lease.property_id || (lease.property?.id || ''),
        tenant_ids: lease.tenant_ids || [],
      })
    }
  }, [lease])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((f) => ({ ...f, [name]: value }))
  }

  const handleTenantCheckbox = (e) => {
    const { checked, value } = e.target
    const id = parseInt(value)
    setFormData((prev) => {
      const tenant_ids = checked
        ? [...prev.tenant_ids, id]
        : prev.tenant_ids.filter((tid) => tid !== id)
      return { ...prev, tenant_ids }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      const payload = {
        ...formData,
        rent_amount: parseFloat(formData.rent_amount),
      }
      await onSave(payload)
    } catch (err) {
      alert('Error saving lease: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 p-4 flex items-center justify-center bg-black bg-opacity-50">
      <form
        onSubmit={handleSubmit}
        className="p-6 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {lease ? 'Edit Lease' : 'Add Lease'}
        </h2>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block font-medium text-gray-700 dark:text-gray-300">
              Start Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="start_date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium text-gray-700 dark:text-gray-300">
              End Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="end_date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium text-gray-700 dark:text-gray-300">
              Rent Amount ($) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="rent_amount"
              name="rent_amount"
              value={formData.rent_amount}
              onChange={handleChange}
              min="0"
              step="1"
              required
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium text-gray-700 dark:text-gray-300">
              Property <span className="text-red-500">*</span>
            </label>
            {loadingProperties ? (
              <p>Loading properties...</p>
            ) : (
              <select
                id="property_id"
                name="property_id"
                value={formData.property_id}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              >
                <option value="">-- Select Property --</option>
                {properties.map((property) => (
                  <option key={property.id} value={property.id}>
                    {property.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="space-y-2">
            <label className="block font-medium text-gray-700 dark:text-gray-300">
              Tenants <span className="text-red-500">*</span>
            </label>
            {loadingTenants ? (
              <p>Loading tenants...</p>
            ) : (
              <div className="p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-auto bg-gray-50 dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600">
                {tenants.map((tenant) => (
                  <label key={tenant.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      value={tenant.id}
                      checked={formData.tenant_ids.includes(tenant.id)}
                      onChange={handleTenantCheckbox}
                      className="cursor-pointer border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                    />
                    {tenant.full_name}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

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
