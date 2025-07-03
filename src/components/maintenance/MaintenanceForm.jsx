import { useEffect, useState } from 'react'
import { getAllProperties } from '~/api/propertyApi'
import { getAllTenants } from '~/api/tenantApi'
import Button from '~/components/ui/Button'

export default function MaintenanceForm({ initialData, onSave, onCancel }) {
  
  const [formData, setFormData] = useState(
    initialData ||
    {
      tenant_id: '',
      property_id: '',
      title: '',
      description: '',
      status: '',
  })
  
  const [properties, setProperties] = useState([])
  const [tenants, setTenants] = useState([])

  useEffect(() => {
    getAllProperties().then((data) => setProperties(data))
    getAllTenants().then((data) => setTenants(data))
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4"
    >
      <h2 className="text-xl font-bold">
        {initialData ? 'Edit Maintenance Request' : 'New Maintenance Request'}
      </h2>

      <label className="block mb-2">
        Property
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
      </label>

      <label className="block mb-2">
        Tenant
        <select
          name="tenant_id"
          value={formData.tenant_id}
          onChange={handleChange}
          // value={selectedtenantId}
          // onChange={(e) => setSelectedTenantId(e.target.value)}
          required
          className="block w-full mt-1 border rounded px-3 py-2"
        >
          <option value="">-- Select Tenant --</option>
          {tenants.map((tenant) => (
            <option key={tenant.id} value={tenant.id}>
              {tenant.full_name}
            </option>
          ))}
        </select>
      </label>

      <label className='block mb-2'>
        Title
        <input
          type='text'
          name='title'
          value={formData.title}
          onChange={handleChange}
          required
          className='block mt-1 w-full border px-3 py-2 rounded'
        />
      </label>

      <label className='block mb-2'>
        Description
        <textarea
          name='description'
          value={formData.description}
          onChange={handleChange}
          required
          className='block mt-1 w-full border px-3 py-2 rounded resize-y'
        />
      </label>

      <label className='block mb-2'>
        Status
        <select
          name='status'
          value={formData.status}
          onChange={handleChange}
          required
          className='block mt-1 w-full border px-3 py-2 rounded'
        >
          <option value="">-- Select Status --</option>
          <option key='OPEN' value='OPEN'>Open</option>
          <option key='IN_PROGRESS' value='IN_PROGRESS'>In Progress</option>
          <option key='RESOLVED' value='RESOLVED'>Resolved</option>
        </select>
      </label>

      <div className='flex gap-4 pt-4'>
        <Button
          label='Cancel'
          type='ghost'
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button label='Save'>Save</Button>
      </div>
    </form>
  )
}
