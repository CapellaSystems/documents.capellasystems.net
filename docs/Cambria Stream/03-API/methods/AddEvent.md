# AddEvent

**Broadcast Manager Endpoint:**  
`http://machineName:8753/CambriaBM/v1/Events`

**Stream Manager Endpoint:**  
`http://machineName:8757/CambriaLM/v1/Events`

## Description
Add an event using given event xml information.

## Arguments

| Name      | Type   | Description                                          |
|-----------|--------|------------------------------------------------------|
| AllowWarning   | Boolean | Allow adding new event which would result in new Conflict Detection or any other warning |

## HTTP Method
**POST**

## HTTP XML Response

| Element       | Parent   | Description                                    |
|---------------|----------|------------------------------------------------|
| `Content`     | None     | Container of the response                     |
| `Status`      | Content  | Logs of the API call                          |
| `ServerRequest`     | Status     | Information about the request                    |
| `Status`      | Status  | Information about errors, only exists when there is any                          |

## HTTP Status Codes

| Value | Description                                            |
|-------|--------------------------------------------------------|
| 200   | Successfully processed                                 |
| 400   | Required XML was not given, or invalid parameters                                     |
| 409   | The Event cannot be added due to conflict                                    |
| 5xx   | Unable to add Event due to server error, please check the corresponding errors returned           |
