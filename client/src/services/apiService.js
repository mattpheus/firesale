import axios from 'axios'
const BASE_URL = 'https://fire-sale-app.herokuapp.com/'

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

export const getProducts = async () => {
  try {
    const response = await api.get('/products')
    return response.data
  } catch (error) {
    throw error
  }
}

export const getProductById = async (productId) => {
  try {
    const response = await api.get(`products/${productId}`)
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

export const allComments = async () => {
  try {
    const response = await api.get(`/comments`)
  } catch (error) {
    
  } 
}

export const getComments = async (productId) => {
  try {
    const response = await api.get(`/comments/${productId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const createComments = async (productId, data) => {

  try {
    const response = await api.post(`comments/${productId}`, data)
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





