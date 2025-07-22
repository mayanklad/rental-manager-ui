import { useEffect, useState } from 'react'
import {
  getAllPayments,
  createPayment,
  updatePayment,
  deletePayment,
} from '~/api/paymentApi'
import PaymentList from '~/components/payment/PaymentList'
import PaymentForm from '~/components/payment/PaymentForm'

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
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Manage Rent Payments
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition"
        >
          Add Payment
        </button>
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
