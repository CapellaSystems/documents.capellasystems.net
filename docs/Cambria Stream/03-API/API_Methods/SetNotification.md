# SetNotification

**Broadcast Manager Endpoint:**  
`http://machineName:8753/CambriaBM/v1/Notification`

**Stream Manager Endpoint:**  
`http://machineName:8757/CambriaLM/v1/Notification`

## Description
Update the notification settings for the Broadcast/Stream Manager.

## Arguments

| Name          | Type   | Description                                         |
|---------------|--------|-----------------------------------------------------|
| Notification  | XML    | XML structure containing the updated notification settings. |

## HTTP Method
**PUT**

## HTTP XML Response

| Element         | Parent   | Description                                    |
|-----------------|----------|------------------------------------------------|
| `Content`       | None     | Container of the response                     |
| `Status`        | Content  | Logs of the API call                          |

## HTTP Status Codes

| Value | Description                                            |
|-------|--------------------------------------------------------|
| 200   | Successfully processed                                 |
| 400   | Invalid parameters                                     |
| 5xx   | Server error while updating notification settings      |
