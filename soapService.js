const soap = require('soap')
const config = require('./config')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0' // ignore certificate verification on wsdl fetch

module.exports = (name, options = {}) => new Promise((resolveService, rejectService) => {
  soap.createClient(config.wsdl[name], options, (errorService, client) => {
    if (errorService) {
      return rejectService(errorService)
    }
    console.log(`${name} SOAP client has been created`) // eslint-disable-line no-console

    return resolveService((method, requestOptions) => new Promise((resolve, reject) => {
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
