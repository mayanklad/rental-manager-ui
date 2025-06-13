import { useState } from 'react'
import Button from '~/components/ui/Button'

export default function PropertyForm({ initialData, onSave, onCancel }) {
  const [formData, setFormData] = useState(
    initialData || { name: "", address: "", type: "", description: "" }
  )

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
        {initialData ? "Edit Property" : "New Property"}
      </h2>

      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 w-full px-3 py-2 border rounded-lg"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Address</label>
        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          className="mt-1 w-full px-3 py-2 border rounded-lg"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Type</label>
        <input
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
          className="mt-1 w-full px-3 py-2 border rounded-lg"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="mt-1 w-full px-3 py-2 border rounded-lg"
        />
      </div>

      <div className="flex gap-4 pt-4">
        <Button label="Save">Save</Button>
        <Button label="Cancel" type="ghost" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  )
}
