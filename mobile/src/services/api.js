import axios from 'axios'

const api = axios.create({
  baseURL: 'http://172.25.44.129:3333',
})

export default api;