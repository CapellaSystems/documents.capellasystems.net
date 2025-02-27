# ExportEvents

**Broadcast Manager Endpoint:**  
`http://machineName:8753/CambriaBM/v1/Events/Export`

**Stream Manager Endpoint:**  
`http://machineName:8757/CambriaLM/v1/Events/Export`

## Description
Export one or more events from the Broadcast/Stream Manager. If no Event IDs are provided, all events are exported.

## Arguments

| Name       | Type   | Description                                         |
|------------|--------|-----------------------------------------------------|
| EventIDs   | String | **Optional.** A comma-separated list of Event IDs to export. |

## HTTP Method
**GET**

## HTTP XML Response

| Element       | Parent   | Description                                    |
|---------------|----------|------------------------------------------------|
| `Content`     | None     | Container of the response                     |
| `EventsXML`   | Content  | XML representation of the exported events     |

## HTTP Status Codes

| Value | Description                                            |
|-------|--------------------------------------------------------|
| 200   | Successfully processed                                 |
| 400   | Invalid parameters                                     |
| 5xx   | Server error while exporting events                   |
