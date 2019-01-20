var PO_Module_Factory = function () {
  var PO = {
    name: 'PO',
    typeInfos: [{
        localName: 'AbstractInvoice',
        typeName: {
          namespaceURI: 'abstractInvoice.esf',
          localPart: 'AbstractInvoice'
        },
        propertyInfos: [{
            name: 'date',
            required: true,
            elementName: {
              localPart: 'date'
            }
          }, {
            name: 'invoiceType',
            required: true,
            elementName: {
              localPart: 'invoiceType'
            }
          }, {
            name: 'num',
            required: true,
            elementName: {
              localPart: 'num'
            }
          }, {
            name: 'operatorFullname',
            required: true,
            elementName: {
              localPart: 'operatorFullname'
            }
          }, {
            name: 'relatedInvoice',
            elementName: {
              localPart: 'relatedInvoice'
            },
            typeInfo: '.RelatedInvoice'
          }, {
            name: 'turnoverDate',
            required: true,
            elementName: {
              localPart: 'turnoverDate'
            }
          }]
      }, {
        localName: 'ProductSet.Products',
        typeName: null,
        propertyInfos: [{
            name: 'product',
            required: true,
            collection: true,
            elementName: {
              localPart: 'product'
            },
            typeInfo: '.Product'
          }]
      }, {
        localName: 'Consignor',
        typeName: {
          namespaceURI: 'v2.esf',
          localPart: 'Consignor'
        },
        propertyInfos: [{
            name: 'address',
            elementName: {
              localPart: 'address'
            }
          }, {
            name: 'name',
            elementName: {
              localPart: 'name'
            }
          }, {
            name: 'tin',
            elementName: {
              localPart: 'tin'
            }
          }]
      }, {
        localName: 'AbstractProductShare',
        typeName: {
          namespaceURI: 'abstractInvoice.esf',
          localPart: 'AbstractProductShare'
        }
      }, {
        localName: 'Participant.ProductShares',
        typeName: null,
        propertyInfos: [{
            name: 'share',
            required: true,
            collection: true,
            elementName: {
              localPart: 'share'
            },
            typeInfo: '.ProductShare'
          }]
      }, {
        localName: 'InvoiceV2.CustomerParticipants',
        typeName: null,
        propertyInfos: [{
            name: 'participant',
            required: true,
            collection: true,
            elementName: {
              localPart: 'participant'
            },
            typeInfo: '.Participant'
          }]
      }, {
        localName: 'Seller',
        typeName: {
          namespaceURI: 'v2.esf',
          localPart: 'Seller'
        },
        baseTypeInfo: '.AbstractCustomer',
        propertyInfos: [{
            name: 'address',
            elementName: {
              localPart: 'address'
            }
          }, {
            name: 'bank',
            elementName: {
              localPart: 'bank'
            }
          }, {
            name: 'bik',
            elementName: {
              localPart: 'bik'
            }
          }, {
            name: 'branchTin',
            elementName: {
              localPart: 'branchTin'
            }
          }, {
            name: 'certificateNum',
            elementName: {
              localPart: 'certificateNum'
            }
          }, {
            name: 'certificateSeries',
            elementName: {
              localPart: 'certificateSeries'
            }
          }, {
            name: 'iik',
            elementName: {
              localPart: 'iik'
            }
          }, {
            name: 'kbe',
            elementName: {
              localPart: 'kbe'
            }
          }, {
            name: 'name',
            required: true,
            elementName: {
              localPart: 'name'
            }
          }, {
            name: 'reorganizedTin',
            elementName: {
              localPart: 'reorganizedTin'
            }
          }, {
            name: 'shareParticipation',
            elementName: {
              localPart: 'shareParticipation'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'statuses',
            elementName: {
              localPart: 'statuses'
            },
            typeInfo: '.Seller.Statuses'
          }, {
            name: 'tin',
            required: true,
            elementName: {
              localPart: 'tin'
            }
          }, {
            name: 'trailer',
            elementName: {
              localPart: 'trailer'
            }
          }]
      }, {
        localName: 'Participant',
        typeName: {
          namespaceURI: 'v2.esf',
          localPart: 'Participant'
        },
        propertyInfos: [{
            name: 'productShares',
            required: true,
            elementName: {
              localPart: 'productShares'
            },
            typeInfo: '.Participant.ProductShares'
          }, {
            name: 'reorganizedTin',
            elementName: {
              localPart: 'reorganizedTin'
            }
          }, {
            name: 'tin',
            required: true,
            elementName: {
              localPart: 'tin'
            }
          }]
      }, {
        localName: 'InvoiceV2.Customers',
        typeName: null,
        propertyInfos: [{
            name: 'customer',
            required: true,
            collection: true,
            elementName: {
              localPart: 'customer'
            },
            typeInfo: '.Customer'
          }]
      }, {
        localName: 'Seller.Statuses',
        typeName: null,
        propertyInfos: [{
            name: 'status',
            required: true,
            collection: true,
            elementName: {
              localPart: 'status'
            }
          }]
      }, {
        localName: 'AbstractProduct',
        typeName: {
          namespaceURI: 'abstractInvoice.esf',
          localPart: 'AbstractProduct'
        }
      }, {
        localName: 'RelatedInvoice',
        typeName: {
          namespaceURI: 'abstractInvoice.esf',
          localPart: 'RelatedInvoice'
        },
        propertyInfos: [{
            name: 'date',
            required: true,
            elementName: {
              localPart: 'date'
            }
          }, {
            name: 'num',
            required: true,
            elementName: {
              localPart: 'num'
            }
          }, {
            name: 'registrationNumber',
            elementName: {
              localPart: 'registrationNumber'
            }
          }]
      }, {
        localName: 'Customer.Statuses',
        typeName: null,
        propertyInfos: [{
            name: 'status',
            required: true,
            collection: true,
            elementName: {
              localPart: 'status'
            }
          }]
      }, {
        localName: 'PublicOffice',
        typeName: {
          namespaceURI: 'v2.esf',
          localPart: 'PublicOffice'
        },
        propertyInfos: [{
            name: 'bik',
            required: true,
            elementName: {
              localPart: 'bik'
            }
          }, {
            name: 'iik',
            elementName: {
              localPart: 'iik'
            }
          }, {
            name: 'payPurpose',
            elementName: {
              localPart: 'payPurpose'
            }
          }, {
            name: 'productCode',
            elementName: {
              localPart: 'productCode'
            }
          }]
      }, {
        localName: 'InvoiceV2',
        typeName: {
          namespaceURI: 'v2.esf',
          localPart: 'InvoiceV2'
        },
        baseTypeInfo: '.AbstractInvoice',
        propertyInfos: [{
            name: 'addInf',
            elementName: {
              localPart: 'addInf'
            }
          }, {
            name: 'consignee',
            elementName: {
              localPart: 'consignee'
            },
            typeInfo: '.Consignee'
          }, {
            name: 'consignor',
            elementName: {
              localPart: 'consignor'
            },
            typeInfo: '.Consignor'
          }, {
            name: 'customerAgentAddress',
            elementName: {
              localPart: 'customerAgentAddress'
            }
          }, {
            name: 'customerAgentDocDate',
            elementName: {
              localPart: 'customerAgentDocDate'
            }
          }, {
            name: 'customerAgentDocNum',
            elementName: {
              localPart: 'customerAgentDocNum'
            }
          }, {
            name: 'customerAgentName',
            elementName: {
              localPart: 'customerAgentName'
            }
          }, {
            name: 'customerAgentTin',
            elementName: {
              localPart: 'customerAgentTin'
            }
          }, {
            name: 'customerParticipants',
            elementName: {
              localPart: 'customerParticipants'
            },
            typeInfo: '.InvoiceV2.CustomerParticipants'
          }, {
            name: 'customers',
            required: true,
            elementName: {
              localPart: 'customers'
            },
            typeInfo: '.InvoiceV2.Customers'
          }, {
            name: 'datePaper',
            elementName: {
              localPart: 'datePaper'
            }
          }, {
            name: 'deliveryDocDate',
            elementName: {
              localPart: 'deliveryDocDate'
            }
          }, {
            name: 'deliveryDocNum',
            elementName: {
              localPart: 'deliveryDocNum'
            }
          }, {
            name: 'deliveryTerm',
            elementName: {
              localPart: 'deliveryTerm'
            },
            typeInfo: '.DeliveryTerm'
          }, {
            name: 'productSet',
            required: true,
            elementName: {
              localPart: 'productSet'
            },
            typeInfo: '.ProductSet'
          }, {
            name: 'publicOffice',
            elementName: {
              localPart: 'publicOffice'
            },
            typeInfo: '.PublicOffice'
          }, {
            name: 'reasonPaper',
            elementName: {
              localPart: 'reasonPaper'
            }
          }, {
            name: 'sellerAgentAddress',
            elementName: {
              localPart: 'sellerAgentAddress'
            }
          }, {
            name: 'sellerAgentDocDate',
            elementName: {
              localPart: 'sellerAgentDocDate'
            }
          }, {
            name: 'sellerAgentDocNum',
            elementName: {
              localPart: 'sellerAgentDocNum'
            }
          }, {
            name: 'sellerAgentName',
            elementName: {
              localPart: 'sellerAgentName'
            }
          }, {
            name: 'sellerAgentTin',
            elementName: {
              localPart: 'sellerAgentTin'
            }
          }, {
            name: 'sellerParticipants',
            elementName: {
              localPart: 'sellerParticipants'
            },
            typeInfo: '.InvoiceV2.SellerParticipants'
          }, {
            name: 'sellers',
            required: true,
            elementName: {
              localPart: 'sellers'
            },
            typeInfo: '.InvoiceV2.Sellers'
          }]
      }, {
        localName: 'InvoiceV2.Sellers',
        typeName: null,
        propertyInfos: [{
            name: 'seller',
            required: true,
            collection: true,
            elementName: {
              localPart: 'seller'
            },
            typeInfo: '.Seller'
          }]
      }, {
        localName: 'ProductSet',
        typeName: {
          namespaceURI: 'v2.esf',
          localPart: 'ProductSet'
        },
        propertyInfos: [{
            name: 'currencyCode',
            required: true,
            elementName: {
              localPart: 'currencyCode'
            }
          }, {
            name: 'currencyRate',
            elementName: {
              localPart: 'currencyRate'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'products',
            required: true,
            elementName: {
              localPart: 'products'
            },
            typeInfo: '.ProductSet.Products'
          }, {
            name: 'totalExciseAmount',
            required: true,
            elementName: {
              localPart: 'totalExciseAmount'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'totalNdsAmount',
            required: true,
            elementName: {
              localPart: 'totalNdsAmount'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'totalPriceWithTax',
            required: true,
            elementName: {
              localPart: 'totalPriceWithTax'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'totalPriceWithoutTax',
            required: true,
            elementName: {
              localPart: 'totalPriceWithoutTax'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'totalTurnoverSize',
            required: true,
            elementName: {
              localPart: 'totalTurnoverSize'
            },
            typeInfo: 'Decimal'
          }]
      }, {
        localName: 'Consignee',
        typeName: {
          namespaceURI: 'v2.esf',
          localPart: 'Consignee'
        },
        propertyInfos: [{
            name: 'address',
            elementName: {
              localPart: 'address'
            }
          }, {
            name: 'countryCode',
            required: true,
            elementName: {
              localPart: 'countryCode'
            }
          }, {
            name: 'name',
            elementName: {
              localPart: 'name'
            }
          }, {
            name: 'tin',
            elementName: {
              localPart: 'tin'
            }
          }]
      }, {
        localName: 'Product',
        typeName: {
          namespaceURI: 'v2.esf',
          localPart: 'Product'
        },
        baseTypeInfo: '.AbstractProduct',
        propertyInfos: [{
            name: 'additional',
            elementName: {
              localPart: 'additional'
            }
          }, {
            name: 'catalogTruId',
            required: true,
            elementName: {
              localPart: 'catalogTruId'
            }
          }, {
            name: 'description',
            elementName: {
              localPart: 'description'
            }
          }, {
            name: 'exciseAmount',
            elementName: {
              localPart: 'exciseAmount'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'exciseRate',
            elementName: {
              localPart: 'exciseRate'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'kpvedCode',
            elementName: {
              localPart: 'kpvedCode'
            }
          }, {
            name: 'ndsAmount',
            required: true,
            elementName: {
              localPart: 'ndsAmount'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'ndsRate',
            elementName: {
              localPart: 'ndsRate'
            },
            typeInfo: 'Int'
          }, {
            name: 'priceWithTax',
            required: true,
            elementName: {
              localPart: 'priceWithTax'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'priceWithoutTax',
            required: true,
            elementName: {
              localPart: 'priceWithoutTax'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'productDeclaration',
            elementName: {
              localPart: 'productDeclaration'
            }
          }, {
            name: 'productNumberInDeclaration',
            elementName: {
              localPart: 'productNumberInDeclaration'
            }
          }, {
            name: 'quantity',
            elementName: {
              localPart: 'quantity'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'tnvedName',
            elementName: {
              localPart: 'tnvedName'
            }
          }, {
            name: 'truOriginCode',
            required: true,
            elementName: {
              localPart: 'truOriginCode'
            }
          }, {
            name: 'turnoverSize',
            required: true,
            elementName: {
              localPart: 'turnoverSize'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'unitCode',
            elementName: {
              localPart: 'unitCode'
            }
          }, {
            name: 'unitNomenclature',
            elementName: {
              localPart: 'unitNomenclature'
            }
          }, {
            name: 'unitPrice',
            elementName: {
              localPart: 'unitPrice'
            },
            typeInfo: 'Decimal'
          }]
      }, {
        localName: 'DeliveryTerm',
        typeName: {
          namespaceURI: 'v2.esf',
          localPart: 'DeliveryTerm'
        },
        propertyInfos: [{
            name: 'contractDate',
            elementName: {
              localPart: 'contractDate'
            }
          }, {
            name: 'contractNum',
            elementName: {
              localPart: 'contractNum'
            }
          }, {
            name: 'deliveryConditionCode',
            elementName: {
              localPart: 'deliveryConditionCode'
            }
          }, {
            name: 'destination',
            elementName: {
              localPart: 'destination'
            }
          }, {
            name: 'hasContract',
            required: true,
            elementName: {
              localPart: 'hasContract'
            },
            typeInfo: 'Boolean'
          }, {
            name: 'term',
            elementName: {
              localPart: 'term'
            }
          }, {
            name: 'transportTypeCode',
            elementName: {
              localPart: 'transportTypeCode'
            }
          }, {
            name: 'warrant',
            elementName: {
              localPart: 'warrant'
            }
          }, {
            name: 'warrantDate',
            elementName: {
              localPart: 'warrantDate'
            }
          }]
      }, {
        localName: 'AbstractCustomer',
        typeName: {
          namespaceURI: 'abstractInvoice.esf',
          localPart: 'AbstractCustomer'
        }
      }, {
        localName: 'ProductShare',
        typeName: {
          namespaceURI: 'v2.esf',
          localPart: 'ProductShare'
        },
        baseTypeInfo: '.AbstractProductShare',
        propertyInfos: [{
            name: 'additional',
            elementName: {
              localPart: 'additional'
            }
          }, {
            name: 'exciseAmount',
            elementName: {
              localPart: 'exciseAmount'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'ndsAmount',
            required: true,
            elementName: {
              localPart: 'ndsAmount'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'priceWithTax',
            required: true,
            elementName: {
              localPart: 'priceWithTax'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'priceWithoutTax',
            required: true,
            elementName: {
              localPart: 'priceWithoutTax'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'productNumber',
            required: true,
            elementName: {
              localPart: 'productNumber'
            },
            typeInfo: 'Int'
          }, {
            name: 'quantity',
            elementName: {
              localPart: 'quantity'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'turnoverSize',
            required: true,
            elementName: {
              localPart: 'turnoverSize'
            },
            typeInfo: 'Decimal'
          }]
      }, {
        localName: 'Customer',
        typeName: {
          namespaceURI: 'v2.esf',
          localPart: 'Customer'
        },
        baseTypeInfo: '.AbstractCustomer',
        propertyInfos: [{
            name: 'address',
            elementName: {
              localPart: 'address'
            }
          }, {
            name: 'branchTin',
            elementName: {
              localPart: 'branchTin'
            }
          }, {
            name: 'countryCode',
            required: true,
            elementName: {
              localPart: 'countryCode'
            }
          }, {
            name: 'name',
            required: true,
            elementName: {
              localPart: 'name'
            }
          }, {
            name: 'reorganizedTin',
            elementName: {
              localPart: 'reorganizedTin'
            }
          }, {
            name: 'shareParticipation',
            elementName: {
              localPart: 'shareParticipation'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'statuses',
            elementName: {
              localPart: 'statuses'
            },
            typeInfo: '.Customer.Statuses'
          }, {
            name: 'tin',
            elementName: {
              localPart: 'tin'
            }
          }, {
            name: 'trailer',
            elementName: {
              localPart: 'trailer'
            }
          }]
      }, {
        localName: 'InvoiceV2.SellerParticipants',
        typeName: null,
        propertyInfos: [{
            name: 'participant',
            required: true,
            collection: true,
            elementName: {
              localPart: 'participant'
            },
            typeInfo: '.Participant'
          }]
      }, {
        type: 'enumInfo',
        localName: 'SellerType',
        values: ['COMMITTENT', 'BROKER', 'FORWARDER', 'LESSOR', 'JOINT_ACTIVITY_PARTICIPANT', 'SHARING_AGREEMENT_PARTICIPANT', 'EXPORTER', 'TRANSPORTER', 'PRINCIPAL']
      }, {
        type: 'enumInfo',
        localName: 'PaperReasonType',
        values: ['DOWN_TIME', 'MISSING_REQUIREMENT', 'UNLAWFUL_REMOVAL_REGISTRATION']
      }, {
        type: 'enumInfo',
        localName: 'CustomerType',
        values: ['COMMITTENT', 'BROKER', 'LESSEE', 'JOINT_ACTIVITY_PARTICIPANT', 'PUBLIC_OFFICE', 'NONRESIDENT', 'SHARING_AGREEMENT_PARTICIPANT', 'PRINCIPAL', 'RETAIL', 'INDIVIDUAL']
      }, {
        type: 'enumInfo',
        localName: 'InvoiceType',
        values: ['ORDINARY_INVOICE', 'FIXED_INVOICE', 'ADDITIONAL_INVOICE']
      }],
    elementInfos: [{
        elementName: {
          localPart: 'invoice',
          namespaceURI: 'abstractInvoice.esf'
        },
        typeInfo: '.AbstractInvoice'
      }, {
        elementName: {
          localPart: 'invoice',
          namespaceURI: 'v2.esf'
        },
        typeInfo: '.InvoiceV2'
      }]
  };
  return {
    PO: PO
  };
};
if (typeof define === 'function' && define.amd) {
  define([], PO_Module_Factory);
}
else {
  var PO_Module = PO_Module_Factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports.PO = PO_Module.PO;
  }
  else {
    var PO = PO_Module.PO;
  }
}