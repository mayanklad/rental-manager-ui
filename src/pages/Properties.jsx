import { useEffect, useState } from 'react'
import {
  getAllProperties,
  createProperty,
  updateProperty,
  deleteProperty,
} from '~/api/propertyApi'
import PropertyList from '~/components/property/PropertyList'
import PropertyForm from '~/components/property/PropertyForm'
import Button from '~/components/ui/Button'

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
    <div className="space-y-8">
      {/* Heading */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary-700 dark:text-primary-300">
          Manage Properties
        </h1>
        <Button label="Add Property" onClick={() => setShowForm(true)}>Add Property</Button>
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
