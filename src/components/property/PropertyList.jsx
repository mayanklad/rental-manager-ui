import Button from '~/components/ui/Button'

export default function PropertyList({ properties, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {properties.map((prop) => (
        <div
          key={prop.id}
          className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow space-y-2"
        >
          <h2 className="text-lg font-semibold">{prop.name}</h2>
          <p className="text-sm text-gray-500">Address: {prop.address}</p>
          <p className="text-sm text-gray-500">Type: {prop.type}</p>
          <p className="text-sm text-gray-500">Description: {prop.description}</p>
          <div className="flex gap-2 pt-2">
            <Button label="Edit" type="secondary" onClick={() => onEdit(prop)}>Edit</Button>
            <Button label="Delete" type="danger" onClick={() => onDelete(prop.id)}>Delete</Button>
          </div>
        </div>
      ))}
    </div>
  )
}
