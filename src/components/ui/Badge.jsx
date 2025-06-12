export default function Badge({ label, color = "primary" }) {
  const base = "px-2 py-1 text-xs font-semibold rounded-full"
  const colors = {
    primary: "bg-primary-100 text-primary-700",
    success: "bg-green-100 text-green-700",
    danger: "bg-red-100 text-red-700",
    neutral: "bg-gray-100 text-gray-700",
  }

  return (
    <span className={`${base} ${colors[color]}`}>
      {label}
    </span>
  )
}
