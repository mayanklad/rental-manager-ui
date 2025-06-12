export default function Button({ children, type = "primary", ...props }) {
  const base = "px-4 py-2 rounded font-medium transition"
  const variants = {
    primary: "bg-primary-600 text-white hover:bg-primary-700",
    secondary: "bg-secondary-500 text-white hover:bg-secondary-600",
    danger: "bg-danger text-white hover:bg-red-600",
    ghost: "border border-gray-300 text-gray-700 hover:bg-gray-100",
  }

  return (
    <button 
      className={`${base} ${variants[type]}`} 
      {...props}
    >
      {children}
    </button>
  )
}
