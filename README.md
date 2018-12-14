# esf-rest-proxy

RESTful proxy for ESF SOAP API. Original WSDLs: https://esf-test.kgd.gov.kz:9443/esf-web/ws/

## Session Service

### Get User

```
POST /sessions/getuser
```

Field | Description | Format
----- | ----------- | ------
username | User's IIN or BIN | Text
password | ESF account password | Text
x509Certificate | User's X.509 certificate | Text

### Create Session

```
POST /sessions/create
```

### Close Session

```
POST /sessions/close
```

## Invoice Service

### Query Invoice

```
GET /invoices/query
```
