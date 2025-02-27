# GetNotification

**Broadcast Manager Endpoint:**  
`http://machineName:8753/CambriaBM/v1/Notification`

**Stream Manager Endpoint:**  
`http://machineName:8757/CambriaLM/v1/Notification`

## Description
Retrieve the current notification settings configured in the Broadcast/Stream Manager.

## Arguments

| Name   | Type   | Description |
|--------|--------|-------------|
| (No arguments) | | |

## HTTP Method
**GET**

## HTTP XML Response

| Element         | Parent   | Description                                    |
|-----------------|----------|------------------------------------------------|
| `Content`       | None     | Container of the response                     |
| `Notification`  | Content  | Details of the notification settings          |

## HTTP Status Codes

| Value | Description                                            |
|-------|--------------------------------------------------------|
| 200   | Successfully processed                                 |
| 5xx   | Server error while retrieving notifications            |
