# LiveControlAPI

**Broadcast Manager Endpoint:**  
`http://machineName:8753/CambriaBM/v1/LiveControl`

**Stream Manager Endpoint:**  
`http://machineName:8757/CambriaLM/v1/LiveControl`

## Description
Control live event streams by starting, stopping, or switching inputs and outputs.

## Arguments

| Name      | Type   | Description                                          |
|-----------|--------|------------------------------------------------------|
| Command   | String | The control command to execute (e.g., `Start`, `Stop`, `SwitchInput`). |
| EventID   | String | The ID of the event to control.                     |

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
| 404   | Event not found                                        |
| 5xx   | Server error while executing control command           |
