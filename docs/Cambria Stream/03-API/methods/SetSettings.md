# SetSettings

**Broadcast Manager Endpoint:**  
`http://machineName:8753/CambriaBM/v1/Settings`

**Stream Manager Endpoint:**  
`http://machineName:8757/CambriaLM/v1/Settings`

## Description
Update the global system settings for the Broadcast/Stream Manager.

## Arguments

| Name      | Type   | Description                          |
|-----------|--------|--------------------------------------|
| Settings  | XML    | XML structure containing the new settings for the manager. |

## HTTP Method
**PUT**

## HTTP XML Response

| Element       | Parent   | Description                                    |
|---------------|----------|------------------------------------------------|
| `Content`     | None     | Container of the response                     |
| `Status`      | Content  | Logs of the API call                          |

## HTTP Status Codes

| Value | Description                                            |
|-------|--------------------------------------------------------|
| 200   | Successfully processed                                 |
| 400   | Invalid parameters                                     |
| 5xx   | Server error while updating system settings            |
