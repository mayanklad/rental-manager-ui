import { useEffect, useState } from 'react'
import {
  getAllPayments,
  createPayment,
  updatePayment,
  deletePayment,
} from '~/api/paymentApi'
import PaymentList from '~/components/payment/PaymentList'
import PaymentForm from '~/components/payment/PaymentForm'
import Button from '~/components/ui/Button'

export default function Payments() {

  const [payments, setPayments] = useState([])
  const [editingPayment, setEditingPayment] = useState(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchPayments()
  }, [])

  const fetchPayments = async () => {
    const data = await getAllPayments()
    setPayments(data)
  }

  const handleSave = async (formData) => {
    if (editingPayment) {
      await updatePayment(editingPayment.id, formData)
    } else {
      await createPayment(formData)
    }
    setShowForm(false)
    setEditingPayment(null)
    fetchPayments()
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this payment?")) {
      await deletePayment(id)
      fetchPayments()
    }
  }

  return (
    <div className="space-y-8">
      {/* Heading */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary-700 dark:text-primary-300">
          Manage Rent Payments
        </h1>
        <Button label="Add Payment" onClick={() => setShowForm(true)}>Add Payment</Button>
      </div>

      <PaymentList
        payments={payments}
        onEdit={(payment) => {
          setEditingPayment(payment)
          setShowForm(true)
        }}
        onDelete={handleDelete}
      />

      {showForm && (
        <PaymentForm
          initialData={editingPayment}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false)
            setEditingPayment(null)
          }}
        />
      )}
    </div>
  )
}
