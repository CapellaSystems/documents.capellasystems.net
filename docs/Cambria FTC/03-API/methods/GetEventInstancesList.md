# GetEventInstancesList

**Broadcast Manager Endpoint:**  
`http://machineName:8753/CambriaBM/v1/EventInstances`

**Stream Manager Endpoint:**  
`http://machineName:8757/CambriaLM/v1/EventInstances`

## Description
Retrieve a list of instances for all events. Event instances represent running or scheduled sessions of an event.

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
| `Status`      | Content  | Logs of the API call                         |
| `Instances`   | Content  | List of event instances                      |
| `Instance`    | Instances| Details of an individual event instance       |

## HTTP Status Codes

| Value | Description                                            |
|-------|--------------------------------------------------------|
| 200   | Successfully processed                                 |
| 400   | Invalid parameters                                     |
| 5xx   | Server error while retrieving event instances list     |
