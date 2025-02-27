# GetSystemInfo

**Broadcast Manager Endpoint:**  
`http://machineName:8753/CambriaBM/v1/SystemInfo`

**Stream Manager Endpoint:**  
`http://machineName:8757/CambriaLM/v1/SystemInfo`

## Description
Retrieve system information for the Broadcast/Stream Manager, including software version, uptime, and resource usage.

## Arguments

| Name   | Type   | Description |
|--------|--------|-------------|
| (No arguments) | | |

## HTTP Method
**GET**

## HTTP XML Response

| Element       | Parent   | Description                                    |
|---------------|----------|------------------------------------------------|
| `Content`     | None     | Container of the response                     |
| `SystemInfo`  | Content  | Details about the system information          |

## HTTP Status Codes

| Value | Description                                            |
|-------|--------------------------------------------------------|
| 200   | Successfully processed                                 |
| 5xx   | Server error while retrieving system information       |
