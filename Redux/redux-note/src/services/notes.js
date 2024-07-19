import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'
const generateId = () => Number((Math.random() * 1000000).toFixed(0))
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, important: false }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const toggleImportance = async (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then((res) => res.data)
}

export default {
  getAll,
  createNew,
  toggleImportance,
}
