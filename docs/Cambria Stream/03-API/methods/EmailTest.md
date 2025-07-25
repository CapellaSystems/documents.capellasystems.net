# EmailTest

**Broadcast Manager Endpoint:**  
`http://machineName:8753/CambriaBM/v1/EmailTest`

**Stream Manager Endpoint:**  
`http://machineName:8757/CambriaLM/v1/EmailTest`

## Description
Test the email notification configuration by sending a test email.

## Arguments

| Name           | Type   | Description                                   |
|----------------|--------|-----------------------------------------------|
| EmailAddress   | String | The email address to send the test email to. |

## HTTP Method
**POST**

## HTTP XML Response

| Element       | Parent   | Description                                    |
|---------------|----------|------------------------------------------------|
| `Content`     | None     | Container of the response                     |
| `Status`      | Content  | Logs of the API call                          |

## HTTP Status Codes

| Value | Description                                            |
|-------|--------------------------------------------------------|
| 200   | Successfully processed                                 |
| 400   | Invalid parameters                                     |
| 5xx   | Server error while sending test email                 |
