const { createPredictions } = require('./replicateApi')

const main = async (args) => {
  try {
    const prompt = args.prompt
    const predictions = await createPredictions(prompt)
    return {
      body: {
        prompt,
        images: predictions.output,
      },
    }
  } catch (err) {
    console.log(err)
    return {
      error: {
        statusCode: 500,
        body: {
          message: 'Unexpected error',
        },
      },
    }
  }
}

exports.main = main
