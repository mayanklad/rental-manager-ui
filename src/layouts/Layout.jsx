import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { path: "/", label: "Dashboard" },
  { path: "/properties", label: "Properties" },
  { path: "/tenants", label: "Tenants" },
  { path: "/leases", label: "Leases" },
  { path: "/payments", label: "Payments" },
  { path: "/maintenance", label: "Maintenance" },
]

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const activeNavItem = navItems.find(item =>
    item.path === location.pathname ||
    (item.path !== "/" && location.pathname.startsWith(item.path))
  )

  return (
    <div className="flex h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-20 w-64 p-6 space-y-6
          transform bg-gray-100 dark:bg-gray-800 shadow-md
          transition-transform duration-200 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:translate-x-0
        `}
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 select-none">
            Rental Manager
          </h1>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden p-1 text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col space-y-2">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md font-medium transition
                ${
                  isActive
                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500 dark:text-white'
                    : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Topbar */}
        <header className="md:hidden flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <button
            onClick={() => setIsOpen(true)}
            className="p-1 text-gray-700 dark:text-gray-300 hover:text-indigo-600 transition"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h2 className="text-lg font-medium select-none text-gray-900 dark:text-gray-100">
            {activeNavItem ? activeNavItem.label : "Dashboard"}
          </h2>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-8 bg-gray-50 dark:bg-gray-950">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
