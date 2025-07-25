# GetSettings

**Broadcast Manager Endpoint:**  
`http://machineName:8753/CambriaBM/v1/Settings`

**Stream Manager Endpoint:**  
`http://machineName:8757/CambriaLM/v1/Settings`

## Description
Retrieve the current system settings of the Broadcast/Stream Manager.

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
| `Settings`    | Content  | System settings of the manager               |

## HTTP Status Codes

| Value | Description                                            |
|-------|--------------------------------------------------------|
| 200   | Successfully processed                                 |
| 5xx   | Server error while retrieving system settings          |
