# ImportEvents

**Broadcast Manager Endpoint:**  
`http://machineName:8753/CambriaBM/v1/Events/Import`

**Stream Manager Endpoint:**  
`http://machineName:8757/CambriaLM/v1/Events/Import`

## Description
Import one or more events into the Broadcast/Stream Manager.

## Arguments

| Name       | Type   | Description                                         |
|------------|--------|-----------------------------------------------------|
| EventsXML  | XML    | XML structure containing the events to import.      |

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
| 5xx   | Server error while importing events                   |
