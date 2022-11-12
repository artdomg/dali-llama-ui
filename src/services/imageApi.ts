import axios from 'axios'

const baseURL = process.env['REACT_APP_IMAGE_AI_URL']

const instance = axios.create({ baseURL })

export const generateImages = (text: string) =>
  instance.post('/generate', {
    prompt: text,
    test: !!process.env['REACT_APP_LOCAL'],
  })
