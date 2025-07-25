# GetSystemStatus

**Broadcast Manager Endpoint:**  
`http://machineName:8753/CambriaBM/v1/SystemStatus`

**Stream Manager Endpoint:**  
`http://machineName:8757/CambriaLM/v1/SystemStatus`

## Description
Retrieve the current status of the Broadcast/Stream Manager, including operational health and alerts.

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
| `Status`      | Content  | Overall status of the system                  |

## HTTP Status Codes

| Value | Description                                            |
|-------|--------------------------------------------------------|
| 200   | Successfully processed                                 |
| 5xx   | Server error while retrieving system status            |
