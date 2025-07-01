import { useState } from 'react'
import Button from '~/components/ui/Button'

export default function TenantForm({ onSave, initialData = {}, onCancel }) {
// const [formData, setFormData] = useState({
//   full_name: '',
//   email: '',
//   phone: '',
// })
const [formData, setFormData] = useState({
  full_name: initialData.full_name || '',
  email: initialData.email || '',
  phone: initialData.phone || '',
})

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
        className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4'
    >
      <h2 className='text-xl font-bold'>Add Tenant</h2>

      <input
        name='full_name'
        placeholder='Full Name'
        value={formData.full_name}
        onChange={handleChange}
        className='w-full px-3 py-2 border rounded-lg'
        required
      />
      <input
        name='email'
        placeholder='Email'
        type='email'
        value={formData.email}
        onChange={handleChange}
        className='w-full px-3 py-2 border rounded-lg'
        required
      />
      <input
        name='phone'
        placeholder='Phone'
        value={formData.phone}
        onChange={handleChange}
        className='w-full px-3 py-2 border rounded-lg'
      />

      <div className='flex gap-4 pt-4'>
        <Button label="Save">Save</Button>
        <Button label="Cancel" type="ghost" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  )
}
