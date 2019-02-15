const express = require('express');
const soap = require('soap');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');
const Jsonix = require('jsonix').Jsonix
const mappingInvoiceV2 = require('./mappings/invoiceV2').PO;

const context = new Jsonix.Context([mappingInvoiceV2]);
const unmarshaller = context.createUnmarshaller();

const parseInvoiceBody = (item) => new Promise((resolve) => {
  console.log('parsing invoice body:', item.invoiceBody)
  const invoice = unmarshaller.unmarshalString(item.invoiceBody).value
  resolve({ ...item, invoice })
})

const app = express();
const port = process.env.PORT || 3001;
const wsdlOptions = {
    // overrideRootElement: {
    //     namespace: 'tns'
    // },
    // ignoredNamespaces: {
    //   namespaces: [],
    //   override: true
    // },
    // ignoreBaseNameSpaces: false
};
let invoiceSoapClient = null;
let sessionSoapClient = null;

const setSoapSecurity = (user, pass) => {
  sessionSoapClient.setSecurity(new soap.WSSecurity(user, pass, {
    hasTimeStamp: false,
    hasTokenCreated: false
  })); 
};

const dateToISOString = (dateString) => {
  const dateObj = new Date(dateString)
  return dateObj.toISOString()
}

const handleSoapError = (error, res) => {
  return res.status(error.response.statusCode)
    .json({ ...error, soapError: error.root.Envelope.Body.Fault });
}

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.get('/v1', (req, res) => {
  res.send('Hello World!');
});

app.get('/v1/invoices/queryinvoice', (req, res) => {
  const { direction, dateFrom, dateTo, statuses, ...other } = req.query
  let soapReqBody = {
    sessionId: req.get('Session-ID'),
    criteria: {
      direction,
      dateFrom: dateToISOString(dateFrom),
      dateTo: dateToISOString(dateTo),
      invoiceStatusList: {
        invoiceStatus: statuses
      },
      ...other,
      asc: true,
    }
  }

  invoiceSoapClient.queryInvoice(soapReqBody, (err, result) => {
    if (err) {
      return err.response
        ? handleSoapError(err, res)
        : res.status(500).json(err)
    }

    if (result.invoiceInfoList && result.invoiceInfoList.invoiceInfo) {
      Promise.all(result.invoiceInfoList.invoiceInfo.map(parseInvoiceBody))
        .then((invoiceInfo) => res.json({ ...result, invoiceInfoList: { invoiceInfo } }))
        .catch((error) => {
          console.log(error);
          res.status(500).json(error)
        })
    } else {
      res.json(result)
    }
  }, {rejectUnauthorized: false})
});

app.post('/v1/sessions/createsession', (req, res) => {
  setSoapSecurity(req.body.username, req.body.password);
 
  let soapReqBody = {
    tin: req.body.username,
    x509Certificate: req.body.x509Certificate,
  };

  sessionSoapClient.createSession(soapReqBody, function(err, result) {
    if (err) {
      return err.response
        ? handleSoapError(err, res)
        : res.status(500).json(err)
    }
    res.json(result);
  }, {rejectUnauthorized: false});
});

app.post('/v1/sessions/closesession', (req, res) => {
  setSoapSecurity(req.body.username, req.body.password);
 
  let soapReqBody = {
    sessionId: req.body.sessionId,
  };

  sessionSoapClient.closeSession(soapReqBody, function(err, result) {
    if (err) {
      return err.response
        ? handleSoapError(err, res)
        : res.status(500).json(err)
    }
    res.json(result);
  }, {rejectUnauthorized: false});
});

app.post('/v1/sessions/currentuser', (req, res) => {
  setSoapSecurity(req.body.username, req.body.password);

  let soapReqBody = {
    sessionId: req.body.sessionId,
  };

  sessionSoapClient.currentUser(soapReqBody, function(err, result) {
    if (err) {
      return err.response
        ? handleSoapError(err, res)
        : res.status(500).json(err)
    }
    res.json(result);
  }, {rejectUnauthorized: false});
});

app.post('/v1/sessions/currentuserprofiles', (req, res) => {
  setSoapSecurity(req.body.username, req.body.password);

  let soapReqBody = {
    sessionId: req.body.sessionId,
  };

  sessionSoapClient.currentUserProfiles(soapReqBody, function(err, result) {
    if (err) {
      return err.response
        ? handleSoapError(err, res)
        : res.status(500).json(err)
    }
    res.json(result);
  }, {rejectUnauthorized: false});
});

let p1 = new Promise((resolve, reject) => {
  soap.createClient(config.invoiceWsdl, wsdlOptions, function(err, cl) {
    if (err) {
      reject(err);;
    }
    console.log('InvoiceService SOAP client loaded.');
    resolve(cl);
  });
});

let p2 = new Promise((resolve, reject) => {
  soap.createClient(config.sessionWsdl, wsdlOptions, function(err, cl) {
    if (err) { throw err; }
    console.log('SessionService SOAP client loaded.');
    resolve(cl);
  });
});

Promise.all([p1, p2])
  .then((values) => {
    invoiceSoapClient = values[0];
    sessionSoapClient = values[1];
    app.listen(port, () => {
      app.emit('appStarted');
      console.log('Listening on port:', port);
    });
  })
  .catch((error) => {
    throw error;
  });

module.exports = app;

