# AddMachines

**Broadcast Manager Endpoint:**  
`http://machineName:8753/CambriaBM/v1/Machines`

**Stream Manager Endpoint:**  
`http://machineName:8757/CambriaLM/v1/Machines`

## Description
Add one or more machines to the Broadcast/Stream Manager.

## Arguments

| Name      | Type   | Description                                         |
|-----------|--------|-----------------------------------------------------|
| Machines  | XML    | XML structure containing the information for the new machines. |

## HTTP Method
**POST**

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
| 5xx   | Server error while adding machines                    |
