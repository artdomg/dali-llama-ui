const { createPredictions } = require('./replicateApi')

const main = async (args) => {
  try {
    const prompt = args.prompt
    console.log('running function')
    await createPredictions(prompt)
    return { body: 'Hello World!' }
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
