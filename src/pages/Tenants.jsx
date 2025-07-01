import { useEffect, useState } from 'react'
import { getAllTenants, createTenant } from '~/api/tenantApi'
import { createLease } from '~/api/leaseApi'
import TenantList from '~/components/tenant/TenantList'
import TenantForm from '~/components/tenant/TenantForm'
import AssignLeaseModal from '~/components/tenant/AssignLeaseModal'
import Button from '~/components/ui/Button'

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
    <div className='space-y-8'>
      {/* Heading */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary-700 dark:text-primary-300">
          Manage Tenants
        </h1>
        <Button label="Add Tenant" onClick={() => setShowForm(true)}>Add Tenant</Button>
      </div>


      <TenantList
        tenants={tenants}
        onAssignLease={(tenant) => {
          setSelectedTenant(tenant)
          setShowLeaseModal(true)
        }}
      />


      {showForm && (
        <TenantForm
          onCancel={() => setShowForm(false)}
          onSave={handleCreateTenant}
        />
      )}


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
