# Introduction

This document describes the **Cambria Live Broadcast/Stream Manager Application Programming Interface (API)**.  
The API allows programmatic control over Cambria Live Broadcast/Stream Manager, which manages multiple Cambria Live/Stream instances.  

The API enables functionality such as:
- Adding, managing, and deleting events
- Controlling inputs and outputs
- Retrieving status information and alerts

An event can be:
- A one-time event with a defined start and stop time
- A recurring weekly event
- A non-stop 24/7 channel

## API Architecture

The API is implemented using the **REST architecture**, with the following details:
- The Cambria Live Broadcast/Stream Manager software runs a web server exposing the REST API.
- **HTTP** is used as the transport layer, and responses are returned in **XML format**.
- The client application can run on the same machine or another machine on the same network.

## Supported HTTP Methods

The API uses standard HTTP methods:
- **GET**
- **POST**
- **PUT**
- **DELETE**  

These methods can be used from any programming or scripting language capable of making HTTP calls.

## Recommendations Before Using the API

1. **Familiarize with Cambria Live Broadcast/Stream Manager via its User Interface**  
   Understanding the concept of an event and Cambria Live capabilities makes API usage simpler.
   
2. **Sample Application**  
   A sample application demonstrating API usage is available, with features like:
   - Displaying called URIs, server XML responses, and status codes
   - Requires Windows and .NET 4.7.2

3. **Using a Web Browser**  
   Web browsers can be used to call API functions utilizing the **HTTP GET** method.

## Requirements/Prerequisites

- **Software**:
  - Cambria Live Broadcast/Stream Manager and Cambria Live/Stream must be installed on the same network.
  - The API web server runs as a **Windows Service** and is available upon system startup.

- **Programming Skills**:
  - Knowledge of a language capable of using standard HTTP methods, such as:
    - C/C++
    - C#
    - Java
    - Python
    - Perl
    - Ruby
    - PHP

- **Supported Operating Systems**:
  - Microsoft Windows/Windows Server
  - Apple MacOS/iOS/iPadOS
  - Linux
  - Google Android

## Notes on Method Usage

- Success or failure of methods is communicated using standard **HTTP status codes**:
  - Codes in the **200–299** range indicate success.
  - Codes in the **400–599** range indicate errors.
- Both **HTTP** and **HTTPS** protocols are supported:
  - Port numbers:
    - HTTP: 8753 (Broadcast Manager), 8757 (Stream Manager)
    - HTTPS: 8754 (Broadcast Manager), 8758 (Stream Manager)
  - **Recommendation:** Use HTTPS, as HTTP support will be deprecated in the future.