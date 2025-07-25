# API Methods

This chapter describes the different methods of the API, including their parameters and expected responses.  
Each method includes the following details:

- **Method Name**: The name used to refer to the API method in the documentation.
- **Description**: A brief overview of the method's purpose.
- **Note**: Any additional notes or special considerations regarding the method.
- **Arguments**: A list of arguments that can be passed to the method.
- **HTTP Method**: The HTTP verb used for the method (e.g., GET, POST, PUT, DELETE).
- **HTTP POST XML Content**: Specifies the XML data sent to the server when using the POST HTTP method. The XML must be UTF-8 encoded.
- **HTTP XML Response**: Describes the structure of the XML response returned by the server.
- **HTTP Status Codes**: Lists the HTTP status codes that indicate success or failure for the method.

## General Example of API Usage

The examples in this documentation assume:
- **Cambria Live Broadcast/Stream Manager** is installed on a machine with the name `MachineName`.
- The REST API server is configured to use port numbers:
  - 8753 (HTTP) and 8754 (HTTPS) for the Broadcast Manager
  - 8757 (HTTP) and 8758 (HTTPS) for the Stream Manager

### Example Endpoint

For methods requiring an Event ID, replace `[EventID]` with the actual event ID in the URL.  
Example:  
`http://machineName:8753/CambriaBM/v1/Events/dce7d7f1-d10d-4c3d-95ed-58db5b8a7a05`

### Notes on Identifiers

Similar mechanisms are used for other identifiers (e.g., MachineID, InstanceID). When referenced in this documentation, replace placeholder values like `[EventID]` or `[MachineID]` with actual identifiers.