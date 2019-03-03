const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const createService = require('./soapService')
const parseXml = require('./xmlParser')

const app = express()
const port = process.env.PORT || 3001

const getStatus = ({ response }) => (response ? response.statusCode : 500)

const getJson = error => (
  error.response
    ? { ...error, soapError: error.root.Envelope.Body.Fault }
    : error
)

app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }))

const initializeApp = ([invoiceService, sessionService]) => {
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
        dateFrom: (new Date(dateFrom)).toISOString(),
        dateTo: (new Date(dateTo)).toISOString(),
        invoiceStatusList: {
          invoiceStatus: statuses,
        },
        ...other,
        asc: true,
      },
    }

    invoiceService('queryInvoice', { body })
      .then(parseXml)
      .then(result => res.json(result))
      .catch(error => res.status(getStatus(error)).json(getJson(error)))
  })

  app.listen(port, () => console.log('Listening on port:', port)) // eslint-disable-line no-console
}

Promise.all([
  createService('invoice'),
  createService('session'),
])
  .then(initializeApp)
  .catch((error) => {
    throw error
  })

module.exports = app
