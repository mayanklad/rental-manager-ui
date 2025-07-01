import axios from '~/api/axiosInstance'

const MAPPING = '/tenant'

// Get all tenants
export const getAllTenants = async () => {
  try {
    const response = await axios.get(MAPPING)
    return response.data
  } catch (error) {
    console.error('Error fetching tenants', error)
    throw error
  }
}

// Get a tenant by ID
export const getTenantById = async (id) => {
  try {
    const response = await axios.get(`${MAPPING}/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching tenant with id ${id}`, error)
    throw error
  }
}

// Create a new tenant
export const createTenant = async (tenantData) => {
  try {
    const response = await axios.post(MAPPING, tenantData)
    return response.data
  } catch (error) {
    console.error('Error creating tenant', error)
    throw error
  }
}

// Update an existing tenant
export const updateTenant = async (id, tenantData) => {
  try {
    const response = await axios.put(`${MAPPING}/${id}`, tenantData)
    return response.data
  } catch (error) {
    console.error(`Error updating tenant with id ${id}`, error)
    throw error
  }
}

// Delete a tenant
export const deleteTenant = async (id) => {
  try {
    await axios.delete(`${MAPPING}/${id}`)
  } catch (error) {
    console.error(`Error deleting tenant with id ${id}`, error)
    throw error
  }
}
