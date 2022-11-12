import axios from 'axios'

const baseURL = process.env['REACT_APP_API_URL']

const instance = axios.create({ baseURL })

export const createRoom = (name: string, password: string) =>
  instance.post('/room', { name, password })
