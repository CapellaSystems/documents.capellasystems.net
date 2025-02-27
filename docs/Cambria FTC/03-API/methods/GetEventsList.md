# GetEventsList

**Broadcast Manager Endpoint:**  
`http://machineName:8753/CambriaBM/v1/Events`

**Stream Manager Endpoint:**  
`http://machineName:8757/CambriaLM/v1/Events`

## Description
Retrieve a list of events known to the Broadcast/Stream Manager. Filters can be applied to include only specific event statuses.

## Arguments

| Name   | Type   | Description                                         |
|--------|--------|-----------------------------------------------------|
| Status | String | **Optional.** Filters events by their status. Allowed values: `Streaming`, `NotStreaming`, `Error`. |

## HTTP Method
**GET**

## HTTP XML Response

| Element       | Parent   | Description                                    |
|---------------|----------|------------------------------------------------|
| `Content`     | None     | Container of the response                     |
| `Status`      | Content  | Logs of the API call                         |
| `Events`      | Content  | List of events                               |
| `Event`       | Events   | Contains unique identifier of an event       |

## HTTP Status Codes

| Value | Description                                            |
|-------|--------------------------------------------------------|
| 200   | Successfully processed                                 |
| 400   | Invalid parameters                                     |
| 5xx   | Unable to retrieve events list due to server error     |
