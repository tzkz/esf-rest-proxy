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
const wsdlOptions = {}
let invoiceSoapClient = null
let sessionSoapClient = null

const setSoapSecurity = (user, pass) => {
  sessionSoapClient.setSecurity(new soap.WSSecurity(user, pass, {
    hasTimeStamp: false,
    hasTokenCreated: false,
  }))
}

const dateToISOString = (dateString) => {
  const dateObj = new Date(dateString)
  return dateObj.toISOString()
}

const handleSoapError = (error, res) => res.status(error.response.statusCode)
  .json({ ...error, soapError: error.root.Envelope.Body.Fault })

app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }))
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

app.get('/v1', (req, res) => {
  res.send('Hello World!')
})

app.get('/v1/invoices/queryinvoice', (req, res) => {
  const {
    direction, dateFrom, dateTo, statuses, ...other
  } = req.query
  const soapReqBody = {
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

  invoiceSoapClient.queryInvoice(soapReqBody, (err, result) => {
    if (err) {
      return err.response
        ? handleSoapError(err, res)
        : res.status(500).json(err)
    }

    if (result.invoiceInfoList && result.invoiceInfoList.invoiceInfo) {
      return Promise.all(result.invoiceInfoList.invoiceInfo.map(parseInvoiceBody))
        .then(invoiceInfo => res.json({ ...result, invoiceInfoList: { invoiceInfo } }))
        .catch((error) => {
          res.status(500).json(error)
        })
    }
    return res.json(result)
  }, { rejectUnauthorized: false })
})

app.post('/v1/sessions/createsession', (req, res) => {
  setSoapSecurity(req.body.username, req.body.password)

  const soapReqBody = {
    tin: req.body.username,
    x509Certificate: req.body.x509Certificate,
  }

  sessionSoapClient.createSession(soapReqBody, (err, result) => {
    if (err) {
      return err.response
        ? handleSoapError(err, res)
        : res.status(500).json(err)
    }

    return res.json(result)
  }, { rejectUnauthorized: false })
})

app.post('/v1/sessions/closesession', (req, res) => {
  setSoapSecurity(req.body.username, req.body.password)

  const soapReqBody = {
    sessionId: req.body.sessionId,
  }

  sessionSoapClient.closeSession(soapReqBody, (err, result) => {
    if (err) {
      return err.response
        ? handleSoapError(err, res)
        : res.status(500).json(err)
    }

    return res.json(result)
  }, { rejectUnauthorized: false })
})

app.post('/v1/sessions/currentuser', (req, res) => {
  setSoapSecurity(req.body.username, req.body.password)

  const soapReqBody = {
    sessionId: req.body.sessionId,
  }

  sessionSoapClient.currentUser(soapReqBody, (err, result) => {
    if (err) {
      return err.response
        ? handleSoapError(err, res)
        : res.status(500).json(err)
    }

    return res.json(result)
  }, { rejectUnauthorized: false })
})

app.post('/v1/sessions/currentuserprofiles', (req, res) => {
  setSoapSecurity(req.body.username, req.body.password)

  const soapReqBody = {
    sessionId: req.body.sessionId,
  }

  sessionSoapClient.currentUserProfiles(soapReqBody, (err, result) => {
    if (err) {
      return err.response
        ? handleSoapError(err, res)
        : res.status(500).json(err)
    }

    return res.json(result)
  }, { rejectUnauthorized: false })
})

const createInvoiceClient = () => new Promise((resolve, reject) => {
  soap.createClient(config.invoiceWsdl, wsdlOptions, (err, cl) => {
    if (err) {
      reject(err)
    }
    console.log('InvoiceService SOAP client loaded.') // eslint-disable-line no-console
    resolve(cl)
  })
})

const createSessionClient = () => new Promise((resolve) => {
  soap.createClient(config.sessionWsdl, wsdlOptions, (err, cl) => {
    if (err) { throw err }
    console.log('SessionService SOAP client loaded.') // eslint-disable-line no-console
    resolve(cl)
  })
})

Promise.all([createInvoiceClient(), createSessionClient()])
  .then(([invoiceClient, sessionClient]) => {
    invoiceSoapClient = invoiceClient
    sessionSoapClient = sessionClient
    app.listen(port, () => {
      app.emit('appStarted')
      console.log('Listening on port:', port) // eslint-disable-line no-console
    })
  })
  .catch((error) => {
    throw error
  })

module.exports = app
