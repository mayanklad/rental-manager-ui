import axios from '~/api/axiosInstance'

const MAPPING = '/property'

// Get all properties
export const getAllProperties = async () => {
  try {
    const response = await axios.get(MAPPING)
    return response.data
  } catch (error) {
    console.error('Error fetching properties', error)
    throw error
  }
}

// Get a property by ID
export const getPropertyById = async (id) => {
  try {
    const response = await axios.get(`${MAPPING}/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching property with id ${id}`, error)
    throw error
  }
}

// Create a new property
export const createProperty = async (propertyData) => {
  try {
    const response = await axios.post(MAPPING, propertyData)
    return response.data
  } catch (error) {
    console.error('Error creating property', error)
    throw error
  }
}

// Update an existing property
export const updateProperty = async (id, propertyData) => {
  try {
    const response = await axios.put(`${MAPPING}/${id}`, propertyData)
    return response.data
  } catch (error) {
    console.error(`Error updating property with id ${id}`, error)
    throw error
  }
}

// Delete a property
export const deleteProperty = async (id) => {
  try {
    await axios.delete(`${MAPPING}/${id}`)
  } catch (error) {
    console.error(`Error deleting property with id ${id}`, error)
    throw error
  }
}
