const express = require('express');
const soap = require('soap');
const bodyParser = require('body-parser');
const config = require('./env/config');

const app = express();
const port = process.env.PORT || 3000;
const wsdlOptions = {
    overrideRootElement: {
        namespace: 'tns'
    },
    ignoredNamespaces: {
      namespaces: [],
      override: true
    },
    ignoreBaseNameSpaces: false
};
let invoiceSoapClient = null;
let sessionSoapClient = null;

const setSoapSecurity = (user, pass) => {
  sessionSoapClient.setSecurity(new soap.WSSecurity(user, pass, {
    hasTimeStamp: false,
    hasTokenCreated: false
  })); 
};

app.use(bodyParser.json({ limit: '50mb' }));
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/invoices', (req, res) => { res.send('GET /invoices'); });

app.post('/sessions', (req, res) => {
  setSoapSecurity(req.body.username, req.body.password);
 
  let soapReqBody = {
    tin: req.body.tin,
    x509Certificate: req.get('X-Client-Cert')
  };
	
  sessionSoapClient.createSession(soapReqBody, function(err, result) {
    if (err) { return res.send(err); }
    res.json(result);
  }, {rejectUnauthorized: false});
});

app.post('/users', (req, res) => { 
  setSoapSecurity(req.body.username, req.body.password);
  
  let soapReqBody = {
    tin: req.body.tin,
    x509Certificate: req.get('X-Client-Cert')
  };

  sessionSoapClient.getUser(soapReqBody, function(err, result) {
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
      console.log('Listening on port:', port);
    });
  })
  .catch((error) => {
    throw error;
  });

