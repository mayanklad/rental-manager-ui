import { useEffect, useState } from 'react'
import { getAllTenants, createTenant } from '~/api/tenantApi'
import { createLease } from '~/api/leaseApi'
import TenantList from '~/components/tenant/TenantList'
import TenantForm from '~/components/tenant/TenantForm'
import AssignLeaseModal from '~/components/tenant/AssignLeaseModal'

export default function Tenants() {
  const [tenants, setTenants] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [selectedTenant, setSelectedTenant] = useState(null)
  const [showLeaseModal, setShowLeaseModal] = useState(false)

  const fetchTenants = async () => {
    const data = await getAllTenants()
    console.log('Fetched tenants:', data)
    setTenants(data)
  }

  useEffect(() => {
    fetchTenants()
  }, [])

  const handleCreateTenant = async (formData) => {
    await createTenant(formData)
    setShowForm(false)
    fetchTenants()
  }

  const handleLeaseAssign = async (leaseData) => {
    await createLease({ ...leaseData, tenant_id: selectedTenant.id })
    setShowLeaseModal(false)
    setSelectedTenant(null)
    fetchTenants()
  }

  return (
    <div className="space-y-10">
      {/* Heading */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Manage Tenants
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition"
        >
          Add Tenant
        </button>
      </div>

      {/* Tenant List */}
      <TenantList
        tenants={tenants}
        onAssignLease={(tenant) => {
          setSelectedTenant(tenant)
          setShowLeaseModal(true)
        }}
      />

      {/* Tenant Form */}
      {showForm && (
        <TenantForm
          onCancel={() => setShowForm(false)}
          onSave={handleCreateTenant}
        />
      )}

      {/* Lease Assignment Modal */}
      {showLeaseModal && selectedTenant && (
        <AssignLeaseModal
          tenant={selectedTenant}
          onClose={() => {
            setShowLeaseModal(false)
            setSelectedTenant(null)
          }}
          onAssign={handleLeaseAssign}
        />
      )}
    </div>
  )
}
