const axios = require('axios')

const baseURL = 'https://api.replicate.com/v1'

const client = axios.create({
  baseURL,
  headers: {
    Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
})

const wait = async (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), ms)
  })
}

const createPredictions = async (prompt, options = {}) => {
  const {
    num_outputs = 3,
    width = 448,
    height = 448,
    num_inference_steps = 27,
  } = options
  const body = {
    input: { prompt, num_outputs, width, height, num_inference_steps },
    version: '8abccf52e7cba9f6e82317253f4a3549082e966db5584e92c808ece132037776',
  }
  let result = await client.post('/predictions', body)
  while (!result.data.output) {
    await wait(1000)
    result = await client.get(`/predictions/${result.data.id}`)
    console.log(result.data)
  }
  return result.data
}

module.exports = {
  createPredictions,
}
