# GetMachineInfo

**Broadcast Manager Endpoint:**  
`http://machineName:8753/CambriaBM/v1/Machines/[MachineID]`

**Stream Manager Endpoint:**  
`http://machineName:8757/CambriaLM/v1/Machines/[MachineID]`

## Description
Retrieve detailed information about a specified machine, including its status, IP address, system uptime, license information, and other attributes.

## Arguments

| Name   | Type   | Description |
|--------|--------|-------------|
No arguments.

## HTTP Method
**GET**

## HTTP XML Response

| Element  | Parent  | Description |
|----------|---------|-------------|
| `Content` | None | Container of the response |
| `Status` | Content | Logs of the API call |
| `ServerRequest` | Status | Information about the request |
| `Error` | Status | Information about errors, if any exist |
| `Machine` | Content | Contains detailed information about the machine |

## HTTP Status Codes

| Value | Description |
|-------|-------------|
| 200 | Successfully processed |
| 400 | Invalid parameters |
| 404 | Machine not found |
| 5xx | Unable to retrieve machine info due to server error |