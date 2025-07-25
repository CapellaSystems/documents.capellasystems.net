# GetMachinesList

**Broadcast Manager Endpoint:**  
`http://machineName:8753/CambriaBM/v1/Machines`

**Stream Manager Endpoint:**  
`http://machineName:8757/CambriaLM/v1/Machines`

## Description
Retrieve all Cambria Live/Stream machines' identifiers detected by the Broadcast/Stream Manager.  
- **Note:** The machine identifier can change if the client machine re-registers.  
- By default, all known machines are returned if no arguments are provided.

## Arguments

| Name   | Type   | Description                                                                                 |
|--------|--------|---------------------------------------------------------------------------------------------|
| Status | String | **Optional.** Filters machines by their status. Allowed values: `Online`, `Offline`, `Standby`, `ColdStandby`. |

## HTTP Method
**GET**

## HTTP XML Response

| Element  | Parent  | Description                                     |
|----------|---------|-------------------------------------------------|
| `Content` | None   | Container of the response                      |
| `Status`  | Content | Logs of the API call                          |
| `ServerRequest` | Status | Information about the request             |
| `Error`  | Status  | Information about errors, if any exist         |
| `Machines` | Content | Contains all machines                        |
| `Machine` | Machines | Contains unique identifier of a machine      |

## HTTP Status Codes

| Value | Description                                            |
|-------|--------------------------------------------------------|
| 200   | Successfully processed                                 |
| 400   | Invalid parameters                                     |
| 5xx   | Unable to retrieve machines list due to server error   |
