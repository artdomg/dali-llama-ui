const { createPredictions } = require('./replicateApi')

const main = async (args) => {
  const prompt = args.prompt
  await createPredictions(prompt)
  return { body: 'Hello World!' }
}

exports.main = main
