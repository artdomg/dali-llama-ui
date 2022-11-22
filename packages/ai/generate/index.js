const { createPredictions } = require('../../../lib/replicateApi')

const main = async (args) => {
  const prompt = args.prompt
  console.log('running function')
  await createPredictions(prompt)
  return { body: 'Hello World!' }
}

exports.main = main
