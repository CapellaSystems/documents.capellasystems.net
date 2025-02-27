# CheckEventSource

**Broadcast Manager Endpoint:**  
`http://machineName:8753/CambriaBM/v1/Events/[EventID]/SourceCheck`

**Stream Manager Endpoint:**  
`http://machineName:8757/CambriaLM/v1/Events/[EventID]/SourceCheck`

## Description
Verify the source configuration of an event, ensuring the inputs are valid and accessible.

## Arguments

| Name    | Type   | Description                     |
|---------|--------|---------------------------------|
| EventID | String | The ID of the event to check. |

## HTTP Method
**GET**

## HTTP XML Response

| Element       | Parent   | Description                                    |
|---------------|----------|------------------------------------------------|
| `Content`     | None     | Container of the response                     |
| `Status`      | Content  | Logs of the API call                          |
| `SourceCheck` | Content  | Results of the source verification            |

## HTTP Status Codes

| Value | Description                                            |
|-------|--------------------------------------------------------|
| 200   | Successfully processed                                 |
| 400   | Invalid parameters                                     |
| 404   | Event not found                                        |
| 5xx   | Server error while checking event source               |
