const axios = require('axios')

const baseURL = 'https://api.replicate.com/v1'

console.log({ token: process.env.REPLICATE_API_TOKEN })

const client = axios.create({
  baseURL,
  headers: {
    Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
})

const createPredictions = async (prompt, options = {}) => {
  const {
    num_outputs = 3,
    width = 448,
    height = 448,
    num_inference_steps = 27,
  } = options
  console.log('Creating predictions')
  let result = await client.post('/predictions', {
    input: { prompt, num_outputs, width, height, num_inference_steps },
  })
  console.log(result)
}

module.exports = {
  createPredictions,
}
