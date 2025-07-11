import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
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

export default function DashboardLayout() {

  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  
  const activeNavItem = navItems.find(item => 
    item.path === location.pathname ||
    (item.path !== "/" && location.pathname.startsWith(item.path))
  )
  
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className={`bg-white dark:bg-gray-900 shadow-lg w-64 p-4 space-y-4 fixed z-20 inset-y-0 left-0 transform md:translate-x-0 transition-transform duration-200 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} md:relative`}>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-bold text-primary-600">Rental Manager</h1>
          <button className="md:hidden" onClick={() => setIsOpen(false)}><X /></button>
        </div>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block px-3 py-2 rounded text-sm font-medium ${isActive ? "bg-primary-100 text-primary-700" : "text-gray-600 hover:bg-gray-100"}`
            }
            end
          >
            {item.label}
          </NavLink>
        ))}
      </aside>

      <div className="flex-1 flex flex-col">{/* md:ml-64">*/}
        {/* Mobile Topbar */}
        <header className="bg-white dark:bg-gray-800 shadow px-4 py-3 flex items-center justify-between md:hidden">
          <button onClick={() => setIsOpen(true)}><Menu /></button>
          <h2 className="text-lg font-semibold">
            {activeNavItem ? activeNavItem.label : "Dashboard"}
          </h2>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-background dark:bg-gray-900 text-gray-800 dark:text-gray-100 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
