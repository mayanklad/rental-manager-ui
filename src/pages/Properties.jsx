import { useEffect, useState } from 'react'
import {
  getAllProperties,
  createProperty,
  updateProperty,
  deleteProperty,
} from '~/api/propertyApi'
import PropertyList from '~/components/property/PropertyList'
import PropertyForm from '~/components/property/PropertyForm'

export default function Properties() {
  const [properties, setProperties] = useState([])
  const [editingProperty, setEditingProperty] = useState(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    const data = await getAllProperties()
    setProperties(data)
  }

  const handleSave = async (formData) => {
    if (editingProperty) {
      await updateProperty(editingProperty.id, formData)
    } else {
      await createProperty(formData)
    }
    setShowForm(false)
    setEditingProperty(null)
    fetchProperties()
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      await deleteProperty(id)
      fetchProperties()
    }
  }

  return (
    <div className="space-y-10">
      {/* Heading */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Manage Properties
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition"
        >
          Add Property
        </button>
      </div>

      <PropertyList
        properties={properties}
        onEdit={(prop) => {
          setEditingProperty(prop)
          setShowForm(true)
        }}
        onDelete={handleDelete}
      />

      {showForm && (
        <PropertyForm
          initialData={editingProperty}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false)
            setEditingProperty(null)
          }}
        />
      )}
    </div>
  )
}
