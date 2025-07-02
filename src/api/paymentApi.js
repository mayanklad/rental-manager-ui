import axios from '~/api/axiosInstance'

const MAPPING = '/rentPayment'

// Get all payments
export const getAllPayments = async () => {
  try {
    const response = await axios.get(MAPPING)
    return response.data
  } catch (error) {
    console.error('Error fetching payments', error)
    throw error
  }
}

// Get a payment by ID
export const getPaymentById = async (id) => {
  try {
    const response = await axios.get(`${MAPPING}/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching payment with id ${id}`, error)
    throw error
  }
}

// Create a new payment
export const createPayment = async (paymentData) => {
  try {
    const response = await axios.post(MAPPING, paymentData)
    return response.data
  } catch (error) {
    console.error('Error creating payment', error)
    throw error
  }
}

// Update an existing payment
export const updatePayment = async (id, paymentData) => {
  try {
    const response = await axios.put(`${MAPPING}/${id}`, paymentData)
    return response.data
  } catch (error) {
    console.error(`Error updating payment with id ${id}`, error)
    throw error
  }
}

// Delete a payment
export const deletePayment = async (id) => {
  try {
    await axios.delete(`${MAPPING}/${id}`)
  } catch (error) {
    console.error(`Error deleting payment with id ${id}`, error)
    throw error
  }
}
