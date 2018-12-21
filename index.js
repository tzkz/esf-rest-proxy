const express = require('express');
const soap = require('soap');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');

const app = express();
const port = process.env.PORT || 3000;
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

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/invoices/queryinvoice', (req, res) => {
  const dateFrom = new Date(req.query.dateFrom)
  const dateTo = new Date(req.query.dateTo)
  let soapReqBody = {
    sessionId: req.get('Session-ID'),
    criteria: {
      direction: req.query.direction,
      dateFrom: dateFrom.toISOString(),
      dateTo: dateTo.toISOString(),
      asc: true,
    }
  }

  invoiceSoapClient.queryInvoice(soapReqBody, (error, result) => {
    if (error) { return res.send(error) }

    res.json(result)
  }, {rejectUnauthorized: false})
});

app.post('/sessions/createsession', (req, res) => {
  setSoapSecurity(req.body.username, req.body.password);
 
  let soapReqBody = {
    tin: req.body.username,
    x509Certificate: req.body.x509Certificate,
  };
	
  sessionSoapClient.createSession(soapReqBody, function(err, result) {
    if (err) { return res.send(err); }
    res.json(result);
  }, {rejectUnauthorized: false});
});

app.post('/sessions/closesession', (req, res) => {
  setSoapSecurity(req.body.username, req.body.password);
 
  let soapReqBody = {
    sessionId: req.body.sessionId,
  };
	
  sessionSoapClient.closeSession(soapReqBody, function(err, result) {
    if (err) { return res.send(err); }
    res.json(result);
  }, {rejectUnauthorized: false});
});

app.post('/sessions/currentuser', (req, res) => {
  setSoapSecurity(req.body.username, req.body.password);

  let soapReqBody = {
    sessionId: req.body.sessionId,
  };

  sessionSoapClient.currentUser(soapReqBody, function(err, result) {
    if (err) { return res.send(err); }
    res.json(result);
  }, {rejectUnauthorized: false});
});

app.post('/sessions/currentuserprofiles', (req, res) => {
  setSoapSecurity(req.body.username, req.body.password);

  let soapReqBody = {
    sessionId: req.body.sessionId,
  };

  sessionSoapClient.currentUserProfiles(soapReqBody, function(err, result) {
    if (err) { return res.send(err); }
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

