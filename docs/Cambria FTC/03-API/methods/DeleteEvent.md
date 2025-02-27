# GetEventsConflict

**Broadcast Manager Endpoint:**  
`http://machineName:8753/CambriaBM/v1/EventsConflict`

**Stream Manager Endpoint:**  
`http://machineName:8757/CambriaLM/v1/EventsConflict`

## Description
Check for conflicts between scheduled events in the Broadcast/Stream Manager.

## Arguments

| Name       | Type   | Description                                         |
|------------|--------|-----------------------------------------------------|
| EventIDs   | String | A comma-separated list of Event IDs to check for conflicts. |

## HTTP Method
**POST**

## HTTP XML Response

| Element       | Parent   | Description                                    |
|---------------|----------|------------------------------------------------|
| `Content`     | None     | Container of the response                     |
| `Conflicts`   | Content  | Details of any detected conflicts             |

## HTTP Status Codes

| Value | Description                                            |
|-------|--------------------------------------------------------|
| 200   | Successfully processed                                 |
| 400   | Invalid parameters                                     |
| 5xx   | Server error while checking for conflicts              |
