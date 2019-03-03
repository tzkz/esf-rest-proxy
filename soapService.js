const soap = require('soap')
const config = require('./config')

module.exports = (name, options = {}) => new Promise((resolveService, rejectService) => {
  soap.createClient(config.wsdl[name], options, (errorService, client) => {
    if (errorService) {
      rejectService(errorService)
    }
    console.log(`${name} SOAP client has been created`) // eslint-disable-line no-console
    resolveService((method, requestOptions) => new Promise((resolve, reject) => {
      const { username, password, body } = requestOptions

      if (name === 'session') {
        client.setSecurity(new soap.WSSecurity(username, password, {
          hasTimeStamp: false,
          hasTokenCreated: false,
        }))
      }

      client[method](body, (error, result) => {
        if (error) {
          reject(error)
        }
        resolve(result)
      }, { rejectUnauthorized: false })
    }))
  })
})
