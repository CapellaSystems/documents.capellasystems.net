# SetEventInfo

**Broadcast Manager Endpoint:**  
`http://machineName:8753/CambriaBM/v1/Events/[EventID]/Info`

**Stream Manager Endpoint:**  
`http://machineName:8757/CambriaLM/v1/Events/[EventID]/Info`

## Description
Update the information for a specific event, such as its name, start/stop time, and configuration.

## Arguments

| Name      | Type   | Description                                     |
|-----------|--------|-------------------------------------------------|
| EventID   | String | The ID of the event to update.                  |
| EventInfo | XML    | XML structure containing the updated event information. |

## HTTP Method
**PUT**

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
| 404   | Event not found                                        |
| 5xx   | Server error while updating event information          |
