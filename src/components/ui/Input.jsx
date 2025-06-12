export default function Input({ label, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm text-gray-600">{label}</label>}
      <input
        className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
        {...props}
      />
    </div>
  )
}
