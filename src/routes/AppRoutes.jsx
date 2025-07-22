import { Route, Routes, Navigate } from 'react-router-dom'
import Layout from '~/layouts/Layout'
import Dashboard from '~/pages/Dashboard'
import Properties from '~/pages/Properties'
import Tenants from '~/pages/Tenants'
import Leases from '~/pages/Leases'
import Payments from '~/pages/Payments'
import Maintenance from '~/pages/Maintenance'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/tenants" element={<Tenants />} />
        <Route path="/leases" element={<Leases />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  )
}
