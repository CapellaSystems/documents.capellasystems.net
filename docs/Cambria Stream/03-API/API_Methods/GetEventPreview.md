# GetEventPreview

**Broadcast Manager Endpoint:**  
`http://machineName:8753/CambriaBM/v1/EventPreview`

**Stream Manager Endpoint:**  
`http://machineName:8757/CambriaLM/v1/EventPreview`

## Description
Retrieve a preview of the event. This includes thumbnail images or preview details based on the event's configuration.

## Arguments

| Name   | Type   | Description                                         |
|--------|--------|-----------------------------------------------------|
| EventID | String | The ID of the event to preview.                   |

## HTTP Method
**GET**

## HTTP XML Response

| Element       | Parent   | Description                                    |
|---------------|----------|------------------------------------------------|
| `Content`     | None     | Container of the response                     |
| `Preview`     | Content  | Preview details of the event                 |

## HTTP Status Codes

| Value | Description                                            |
|-------|--------------------------------------------------------|
| 200   | Successfully processed                                 |
| 400   | Invalid parameters                                     |
| 404   | Event not found                                        |
| 5xx   | Server error while retrieving event preview            |
