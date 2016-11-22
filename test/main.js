const request = require('supertest');
const app = require('../index.js');

let testCert = `MIIG0jCCBLqgAwIBAgIUUInMeUch6yr1YMZ2YPRUbiSOg78wDQYJKoZIhvcNAQEL
BQAwgc4xCzAJBgNVBAYTAktaMRUwEwYDVQQHDAzQkNCh0KLQkNCd0JAxFTATBgNV
BAgMDNCQ0KHQotCQ0J3QkDFMMEoGA1UECgxD0KDQnNCaIMKr0JzQldCc0JvQldCa
0JXQotCi0IbQmiDQotCV0KXQndCY0JrQkNCb0KvSmiDSmtCr0JfQnNCV0KLCuzFD
MEEGA1UEAww60rDQm9Ci0KLQq9KaINCa0KPTmNCb0JDQndCU0KvQoNCj0KjQqyDQ
ntCg0KLQkNCb0KvSmiAoUlNBKTAeFw0xNTEyMjIwOTI1NDRaFw0xNjEyMjEwOTI1
NDRaMIGnMR4wHAYDVQQDDBXQotCV0KHQotCe0JIg0KLQldCh0KIxFTATBgNVBAQM
DNCi0JXQodCi0J7QkjEYMBYGA1UEBRMPSUlOMTIzNDU2Nzg5MDExMQswCQYDVQQG
EwJLWjEVMBMGA1UEBwwM0JDQodCi0JDQndCQMRUwEwYDVQQIDAzQkNCh0KLQkNCd
0JAxGTAXBgNVBCoMENCi0JXQodCi0J7QktCY0KcwggEiMA0GCSqGSIb3DQEBAQUA
A4IBDwAwggEKAoIBAQCe6yPiNVBTjCZacjGbYRVNvEH9l+bGsqoVh7uayHX+ePMg
SIZAnjhmfLg0e8grQUZlLcuW6cfpn4GbTVRUnsZV1Ad7cr4nUeivJkp6mjMIhjbQ
rjZ19qGHbglp+qJSTG8/EAkw0+ckqyuViqGdMaRIi1w59ZDsRvWXelpaHnJLQPN3
XwsuuuqVipHKkNMsqVyq1ciRAsD26dbcddCIEMqe5gNbVoXdlzd38rdZpdt+ajkd
/lmVuOKSVV9vjZ01rz6DuhuM9Tuou2GdhztRMWoe+vPIpww9qNsiudoerFRGWt5Y
NlZocREGO94Es5z2xcZl7BCNntRNjMQ8XkEYwVG3AgMBAAGjggHLMIIBxzAOBgNV
HQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwIGCCqDDgMDBAEBMA8GA1Ud
IwQIMAaABFW1tOIwHQYDVR0OBBYEFB3ArBr0Nw7p14Dk1JS/B2rgdQ6AMF4GA1Ud
IARXMFUwUwYHKoMOAwMCBDBIMCEGCCsGAQUFBwIBFhVodHRwOi8vcGtpLmdvdi5r
ei9jcHMwIwYIKwYBBQUHAgIwFwwVaHR0cDovL3BraS5nb3Yua3ovY3BzME4GA1Ud
HwRHMEUwQ6BBoD+GHWh0dHA6Ly9jcmwucGtpLmdvdi5rei9yc2EuY3Jshh5odHRw
Oi8vY3JsMS5wa2kuZ292Lmt6L3JzYS5jcmwwUgYDVR0uBEswSTBHoEWgQ4YfaHR0
cDovL2NybC5wa2kuZ292Lmt6L2RfcnNhLmNybIYgaHR0cDovL2NybDEucGtpLmdv
di5rei9kX3JzYS5jcmwwYgYIKwYBBQUHAQEEVjBUMC4GCCsGAQUFBzAChiJodHRw
Oi8vcGtpLmdvdi5rei9jZXJ0L3BraV9yc2EuY2VyMCIGCCsGAQUFBzABhhZodHRw
Oi8vb2NzcC5wa2kuZ292Lmt6MA0GCSqGSIb3DQEBCwUAA4ICAQASM0HOUeKu0S/t
v8czHSIIiO1WY71DY7VC1UwMM+RuL2s2esZwV/KuoKKGPisOne++zmW1ssH+bN+R
CMWy1hq7uZJmGphSLh+/RKAuW6avmeZQis9jxUHH5eTI8mGnwtG6vwQCWkZaJx/x
PKWXs3ODp7kd/7JfK0MWYK791HgTWmjAXojXWZ6s0oofqWP5IhKRYyznnHVa1ewi
yI+O4c2SvAt3OxyfMBZP5ZULCIuD9SLJrmypLroVxk/CGTwwiQs8tCz2H8uX+jw4
JI107+Q9zMK9EhCC+gxBKtk/FDTeS1ZjOpEvDHMzr1BxMTRGpxO7SgtzYofcOPSM
X6Ckfg+q8yPUnhabImoNzPmTj+Cu++3G8zGiuurUiJEBQpjCoJvWh02631SB4hqT
A6LSNPM57We2zsiycAKs5l6DIvUXk8jYpffwD8SZfA3NJcaoeFd6kHXyRsUI5Xs5
6P1Kp543Bh0YpbkZeVP6FMGBQlOGBNtdbYSsj51kPIoTlqujiZL6NxejclDSGP1p
HCm76HzUw1pROj8DnwS/tlMHdDcCYm7Rkn/uHjK2s+Soo8IIjpkfIjMMuyY6Bl1o
IiTYF49xBnQypP0l3ZuvX8MGyqTAyZa01p6/hwyem11jvWKi6VYS8Ksly5LdmqAF
JGaBqFK3hEge4WiC3VleAXGce0vnqA==`;

before(function(done){
  this.timeout(5000);
  app.on('appStarted', () => {
    done();
  });
});

describe('POST /users', () => {
  it('should respond with a user', (done) => {
    testCert = testCert.replace(/(\r\n|\n|\r)/gm,'');
    request(app)
      .post('/users')
      .set('Content-Type', 'application/json')
      .set('X-Client-Cert', testCert)
      .send({
        username: '123456789011',
	password: 'TestPass123',
	tin: '123456789011'
      })
      .expect(200)
      .expect((res) => {
        res.body.should.have.property('user');
      })
      .end(done);
  });
});

