const express = require('express')
const soap = require('soap')
const bodyParser = require('body-parser')
const cors = require('cors')
const { Jsonix } = require('jsonix')

const config = require('./config')
const mappingInvoiceV2 = require('./mappings/invoiceV2').PO

const context = new Jsonix.Context([mappingInvoiceV2])
const unmarshaller = context.createUnmarshaller()

const parseInvoiceBody = item => new Promise((resolve) => {
  const invoice = unmarshaller.unmarshalString(item.invoiceBody).value

  resolve({ ...item, invoice })
})

const app = express()
const port = process.env.PORT || 3001

const dateToISOString = (dateString) => {
  const dateObj = new Date(dateString)
  return dateObj.toISOString()
}

const getStatus = ({ response }) => (response ? response.statusCode : 500)

const getJson = error => (
  error.response
    ? { ...error, soapError: error.root.Envelope.Body.Fault }
    : error
)

app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }))
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const startApp = ([invoiceService, sessionService]) => {
  app.get('/v1', (req, res) => {
    res.send('Hello World!')
  })

  app.post('/v1/sessions/createsession', (req, res) => {
    const { username, password, x509Certificate } = req.body
    const body = {
      tin: username,
      x509Certificate,
    }

    sessionService('createSession', { username, password, body })
      .then(result => res.json(result))
      .catch(error => res.status(getStatus(error)).json(getJson(error)))
  })

  app.post('/v1/sessions/closesession', (req, res) => {
    const { username, password, sessionId } = req.body
    const body = { sessionId }

    sessionService('closeSession', { username, password, body })
      .then(result => res.json(result))
      .catch(error => res.status(getStatus(error)).json(getJson(error)))
  })

  app.post('/v1/sessions/currentuser', (req, res) => {
    const { username, password, sessionId } = req.body
    const body = { sessionId }

    sessionService('currentUser', { username, password, body })
      .then(result => res.json(result))
      .catch(error => res.status(getStatus(error)).json(getJson(error)))
  })

  app.post('/v1/sessions/currentuserprofiles', (req, res) => {
    const { username, password, sessionId } = req.body
    const body = { sessionId }

    sessionService('currentUserProfiles', { username, password, body })
      .then(result => res.json(result))
      .catch(error => res.status(getStatus(error)).json(getJson(error)))
  })

  app.get('/v1/invoices/queryinvoice', (req, res) => {
    const {
      direction, dateFrom, dateTo, statuses, ...other
    } = req.query
    const body = {
      sessionId: req.get('Session-ID'),
      criteria: {
        direction,
        dateFrom: dateToISOString(dateFrom),
        dateTo: dateToISOString(dateTo),
        invoiceStatusList: {
          invoiceStatus: statuses,
        },
        ...other,
        asc: true,
      },
    }

    invoiceService('queryInvoice', { body })
      .then((result) => {
        if (result.invoiceInfoList && result.invoiceInfoList.invoiceInfo) {
          return Promise.all(result.invoiceInfoList.invoiceInfo.map(parseInvoiceBody))
            .then(invoiceInfo => res.json({ ...result, invoiceInfoList: { invoiceInfo } }))
            .catch((error) => {
              res.status(500).json(error)
            })
        }
        return res.json(result)
      })
      .catch(error => res.status(getStatus(error)).json(getJson(error)))
  })

  app.listen(port, () => {
    app.emit('appStarted')
    console.log('Listening on port:', port) // eslint-disable-line no-console
  })
}

const createService = (name, options = {}) => new Promise((resolveService, rejectService) => {
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

Promise.all([
  createService('invoice'),
  createService('session'),
])
  .then(startApp)
  .catch((error) => {
    throw error
  })

module.exports = app
