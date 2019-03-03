const { Jsonix } = require('jsonix')
const mappingInvoiceV2 = require('./mappings/invoiceV2').PO

const context = new Jsonix.Context([mappingInvoiceV2])
const unmarshaller = context.createUnmarshaller()

const parseXmlInvoice = item => new Promise((resolve) => {
  const invoice = unmarshaller.unmarshalString(item.invoiceBody).value

  resolve({ ...item, invoice })
})

const parseXmlInvoices = invoices => Promise.all(invoices.map(parseXmlInvoice))

module.exports = (result) => {
  if (!result.invoiceInfoList || !result.invoiceInfoList.invoiceInfo) {
    return result
  }

  return parseXmlInvoices(result.invoiceInfoList.invoiceInfo)
    .then(invoiceInfo => ({ ...result, invoiceInfoList: { invoiceInfo } }))
}
