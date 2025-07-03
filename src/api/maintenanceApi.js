import axios from '~/api/axiosInstance'

const MAPPING = '/maintenanceRequest'

// Get all maintenances
export const getAllMaintenances = async () => {
  try {
    const response = await axios.get(MAPPING)
    return response.data
  } catch (error) {
    console.error('Error fetching maintenances', error)
    throw error
  }
}

// Get a maintenance by ID
export const getMaintenanceById = async (id) => {
  try {
    const response = await axios.get(`${MAPPING}/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching maintenance with id ${id}`, error)
    throw error
  }
}

// Create a new maintenance
export const createMaintenance = async (maintenanceData) => {
  try {
    const response = await axios.post(MAPPING, maintenanceData)
    return response.data
  } catch (error) {
    console.error('Error creating maintenance', error)
    throw error
  }
}

// Update an existing maintenance
export const updateMaintenance = async (id, maintenanceData) => {
  try {
    const response = await axios.put(`${MAPPING}/${id}`, maintenanceData)
    return response.data
  } catch (error) {
    console.error(`Error updating maintenance with id ${id}`, error)
    throw error
  }
}

// Delete a maintenance
export const deleteMaintenance = async (id) => {
  try {
    await axios.delete(`${MAPPING}/${id}`)
  } catch (error) {
    console.error(`Error deleting maintenance with id ${id}`, error)
    throw error
  }
}
