# GetEventInfo

**Broadcast Manager Endpoint:**  
`http://machineName:8753/CambriaBM/v1/Events/[EventID]`

**Stream Manager Endpoint:**  
`http://machineName:8757/CambriaLM/v1/Events/[EventID]`

## Description
Retrieve detailed information about a specific event, including its name, status, start and stop time, and associated attributes.

## Arguments

| Name   | Type   | Description                                         |
|--------|--------|-----------------------------------------------------|
| IncludeDetails | Boolean | **Optional.** Whether to include detailed event information. |

## HTTP Method
**GET**

## HTTP XML Response

| Element       | Parent   | Description                                    |
|---------------|----------|------------------------------------------------|
| `Content`     | None     | Container of the response                     |
| `Status`      | Content  | Logs of the API call                         |
| `Event`       | Content  | Detailed information about the event         |

## HTTP Status Codes

| Value | Description                                            |
|-------|--------------------------------------------------------|
| 200   | Successfully processed                                 |
| 400   | Invalid parameters                                     |
| 404   | Event not found                                        |
| 5xx   | Server error while retrieving event information        |
