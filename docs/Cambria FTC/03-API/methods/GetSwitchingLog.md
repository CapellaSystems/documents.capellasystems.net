# GetSwitchingLog

**Broadcast Manager Endpoint:**  
`http://machineName:8753/CambriaBM/v1/SwitchingLog`

**Stream Manager Endpoint:**  
`http://machineName:8757/CambriaLM/v1/SwitchingLog`

## Description
Retrieve the switching log, which includes input and output switching actions and their timestamps.

## Arguments

| Name    | Type   | Description                                   |
|---------|--------|-----------------------------------------------|
| EventID | String | **Optional.** The ID of the event to filter the switching log. |

## HTTP Method
**GET**

## HTTP XML Response

| Element         | Parent   | Description                                    |
|-----------------|----------|------------------------------------------------|
| `Content`       | None     | Container of the response                     |
| `SwitchingLog`  | Content  | Details of the switching log entries          |

## HTTP Status Codes

| Value | Description                                            |
|-------|--------------------------------------------------------|
| 200   | Successfully processed                                 |
| 400   | Invalid parameters                                     |
| 404   | Event not found                                        |
| 5xx   | Server error while retrieving switching log            |
