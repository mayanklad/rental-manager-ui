import axios from '~/api/axiosInstance'

const MAPPING = '/lease'

// Get all leases
export const getAllLeases = async () => {
  try {
    const response = await axios.get(MAPPING)
    return response.data
  } catch (error) {
    console.error('Error fetching leases', error)
    throw error
  }
}

// Get a lease by ID
export const getLeaseById = async (id) => {
  try {
    const response = await axios.get(`${MAPPING}/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching lease with id ${id}`, error)
    throw error
  }
}

// Create a new lease
export const createLease = async (leaseData) => {
  try {
    const response = await axios.post(MAPPING, leaseData)
    return response.data
  } catch (error) {
    console.error('Error creating lease', error)
    throw error
  }
}

// Update an existing lease
export const updateLease = async (id, leaseData) => {
  try {
    const response = await axios.put(`${MAPPING}/${id}`, leaseData)
    return response.data
  } catch (error) {
    console.error(`Error updating lease with id ${id}`, error)
    throw error
  }
}

// Delete a lease
export const deleteLease = async (id) => {
  try {
    await axios.delete(`${MAPPING}/${id}`)
  } catch (error) {
    console.error(`Error deleting lease with id ${id}`, error)
    throw error
  }
}
