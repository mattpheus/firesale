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
    console.log('success', response)
  } catch (error) {
    console.log('allComments apiservice')
  } 
}

export const getComments = async (productId) => {
  try {
    const response = await api.get(`/comments/${productId}`)
    console.log(response)
    return response.data
  } catch (error) {
    throw error
  }
}

export const createComments = async (productId, data) => {
  console.log('go to databae')
  console.log(productId)
  console.log(data)
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





