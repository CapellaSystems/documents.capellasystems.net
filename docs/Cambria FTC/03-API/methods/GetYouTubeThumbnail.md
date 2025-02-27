# SetYouTubeThumbnail

**Broadcast Manager Endpoint:**  
`http://machineName:8753/CambriaBM/v1/SetYouTubeThumbnail`

**Stream Manager Endpoint:**  
`http://machineName:8757/CambriaLM/v1/SetYouTubeThumbnail`

## Description
Set the thumbnail image for a YouTube event. This can replace an existing thumbnail.

## Arguments

| Name           | Type     | Description                                   |
|----------------|----------|-----------------------------------------------|
| YouTubeID      | String   | The YouTube ID associated with the event.     |
| ThumbnailData  | Base64   | Base64 encoded data for the new thumbnail image. |

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
| 404   | YouTube event not found                               |
| 5xx   | Server error while setting thumbnail                  |
