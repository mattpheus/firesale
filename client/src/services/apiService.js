import axios from 'axios'
const BASE_URL = 'http://localhost:3001'

const JWT_TOKEN = localStorage.getItem('token')

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${JWT_TOKEN}`,
    'Access-Control-Allow-Origin': '*'
  }
})

export const login = async (data) => {
  try {
    const response = await api.post('/auth/login', data)
    const { token, user } = response.data

    localStorage.setItem('token', token)
    localStorage.setItem('userId', user.id)
    return user
  }
  catch (error) {
    throw error
  }
}

// export const userHome = async () => {
//   try {
//     const response = await api.get('/products')
//     const { user } = response.data

//     return user
//   }
//   catch (e) {
//     throw e
//   }
// }

export const getProducts = async () => {
  try {
    const response = await api.get('/products')
    console.log('getproduct',response.data)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getProductById = async (productId) => {
  try {
    const response = await api.get(`/products/${productId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateProduct = async (id, data) => {
  try {
    const response = await api.put(`/products/${id}`, data)
    return response
  } catch (error) {
    throw error
  }
}

export const createComment = async (productId, data) => {
	try {
		const response = await api.post(`/comments/${productId}`, data)
		return response.data
	} catch (error) {
		throw error
	}
}

export const deleteComment = async (commentId) => {
	try {
		const response = await api.delete(`/comments/${commentId}`)
		return response.data
	} catch (error) {
		throw error
	}
}





