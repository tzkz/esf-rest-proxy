# esf-rest-proxy

RESTful proxy for ESF SOAP API. Original WSDLs: https://testvs.kgd.gov.kz:8443/esf-web/ws/api1/

## Session Service

### Create Session

```
POST /sessions/createsession
```

Field | Description | Format
----- | ----------- | ------
username | User's IIN or BIN | Text
password | ESF account password | Text
x509Certificate | User's X.509 certificate | Text

#### Example Request

```
curl -X POST "localhost:3000/sessions/createsession" \
     -H "Content-Type: application/json" \
     -d '{ 
          "username": "123456789011",
          "password": "TestPass123",
          "x509Certificate": "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"
        }'
```

#### Example Response

```
{
    "sessionId": "518c8ad6b28843b29e8a41f798ff4703-123456789011-"
}
```

### Current User

```
POST /sessions/currentuser
```

Field | Description | Format
----- | ----------- | ------
username | User's IIN or BIN | Text
password | ESF account password | Text
sessionId | Session ID | Text

#### Example Request

```
curl -X POST "localhost:3000/sessions/currentuser" \
     -H "Content-Type: application/json" \
     -d '{ 
          "username": "123456789011",
          "password": "TestPass123",
          "sessionId": "cf919a520f9c41d4a41f4deba060c39d-123456789011-"
        }'
```

#### Example Response

```
{
    "user": {
        "login": "123456789011",
        "email": "i.lucenko@osdkz.com",
        "mobile": "454545",
        "issueDate": "03.12.2018",
        "issuedBy": "fdfdff",
        "passportNum": "232323",
        "status": "ACTIVE",
        "reason": "",
        "taxpayer": {
            "tin": "123456789011",
            "nameRu": "ИП Кайрат",
            "firstNameRu": "test",
            "addressRu": "010000, Казахстан, г. Астана, ул. Мира 4",
            "resident": true,
            "type": "INDIVIDUAL_ENTREPRENEUR",
            "resourceUser": false,
            "accounts": null,
            "kogd": "0001"
        }
    }
}
```

### Current User Profiles

```
POST /sessions/currentuserprofiles
```

Field | Description | Format
----- | ----------- | ------
username | User's IIN or BIN | Text
password | ESF account password | Text
sessionId | Session ID | Text

#### Example Request

```
curl -X POST "localhost:3000/sessions/currentuserprofiles" \
     -H "Content-Type: application/json" \
     -d '{ 
          "username": "123456789011",
          "password": "TestPass123",
          "sessionId": "cf919a520f9c41d4a41f4deba060c39d-123456789011-"
        }'
```

#### Example Response

```
{
    "profileInfoList": {
        "profileInfo": [
            {
                "iin": "123456789011",
                "tin": "123456789011",
                "businessProfileType": "INDIVIDUAL",
                "status": "ACTIVE",
                "type": "GENERAL"
            },
            {
                "iin": "123456789011",
                "tin": "123456789011",
                "businessProfileType": "ENTREPRENEUR",
                "status": "ACTIVE",
                "type": "GENERAL"
            },
            {
                "iin": "123456789011",
                "tin": "123456789011",
                "businessProfileType": "PROJECT_ADMIN",
                "status": "ACTIVE",
                "type": "PROJECT",
                "projectParticipantType": "CONTRACTOR",
                "projectCode": "2898776207527002111",
                "projectName": "test esf-513(13.12.2018)"
            }
        ]
    }
}
```

## Invoice Service

### Query Invoice

```
GET /invoices?dateStart=YYYY-MM-DD&dateEnd=YYYY-MM-DD&num=<invoice reg number>&direction=INBOUND&customerTin=<customer IIN or BIN>&type=ORDINARY
```
