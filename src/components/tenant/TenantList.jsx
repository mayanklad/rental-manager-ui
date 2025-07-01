import Button from '~/components/ui/Button'

export default function TenantList({ tenants, onAssignLease }) {
  return (
    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {tenants.map((tenant) => (
        <div 
          key={tenant.id} 
          className='bg-white dark:bg-gray-800 p-4 rounded-xl shadow space-y-2 flex flex-col h-full'>
          <h2 className='text-lg font-semibold'>{tenant.full_name}</h2>
          <p className='text-sm text-gray-500'>{tenant.email}</p>
          <p className='text-sm text-gray-500'>Phone: {tenant.phone}</p>

          {Array.isArray(tenant.lease_ids) && tenant.lease_ids.length > 0 ? (
            // tenant.lease_ids.map((leaseId, index) => (
            //   <div key={leaseId} className='text-sm text-green-500 pt-2'>
            //     Lease ID: {leaseId}
            //     {/* Lease: ${tenant.lease.rentAmount}/month for {tenant.lease.durationMonths} months */}
            //   </div>
            // ))
            <p className="text-sm text-green-500">Lease IDs: {tenant.lease_ids.join(', ')}</p>
          ) : (
            <p className='text-sm text-red-500'>No lease assigned</p>
          )}

          <div className='mt-auto pt-3'>
            <Button label='Assign Lease' onClick={() => onAssignLease(tenant)}>Assign Lease</Button>
          </div>
        </div>
      ))}
    </div>
  )
}
