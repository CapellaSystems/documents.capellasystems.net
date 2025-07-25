# SetMachineSettings

**Broadcast Manager Endpoint:**  
`http://machineName:8753/CambriaBM/v1/Machines/[MachineID]/Settings`

**Stream Manager Endpoint:**  
`http://machineName:8757/CambriaLM/v1/Machines/[MachineID]/Settings`

## Description
Update the settings of a specific machine managed by the Broadcast/Stream Manager.

## Arguments

| Name      | Type   | Description                          |
|-----------|--------|--------------------------------------|
| MachineID | String | The ID of the machine to update.    |
| Settings  | XML    | XML structure containing the new settings for the machine. |

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
| 404   | Machine not found                                      |
| 5xx   | Server error while updating machine settings           |
