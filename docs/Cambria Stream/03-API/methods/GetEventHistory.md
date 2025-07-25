# GetUnifiedLog

**Broadcast Manager Endpoint:**  
`http://machineName:8753/CambriaBM/v1/UnifiedLog`

**Stream Manager Endpoint:**  
`http://machineName:8757/CambriaLM/v1/UnifiedLog`

## Description
Retrieve the unified log for the system, which includes operational logs, warnings, and errors.

## Arguments

| Name      | Type   | Description                                   |
|-----------|--------|-----------------------------------------------|
| StartTime | String | **Optional.** The start time for log retrieval. |
| EndTime   | String | **Optional.** The end time for log retrieval.   |

## HTTP Method
**GET**

## HTTP XML Response

| Element       | Parent   | Description                                    |
|---------------|----------|------------------------------------------------|
| `Content`     | None     | Container of the response                     |
| `Log`         | Content  | Details of the unified log entries           |

## HTTP Status Codes

| Value | Description                                            |
|-------|--------------------------------------------------------|
| 200   | Successfully processed                                 |
| 400   | Invalid parameters                                     |
| 5xx   | Server error while retrieving unified log              |
