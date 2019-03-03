const { Jsonix } = require('jsonix')
const mappingInvoiceV2 = require('./mappings/invoiceV2').PO

const context = new Jsonix.Context([mappingInvoiceV2])
const unmarshaller = context.createUnmarshaller()

module.exports = item => new Promise((resolve) => {
  const invoice = unmarshaller.unmarshalString(item.invoiceBody).value

  resolve({ ...item, invoice })
})
