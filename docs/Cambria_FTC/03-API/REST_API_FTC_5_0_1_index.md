# Capella Cambria FTC and Cluster
## REST API Documentation

## Document History

| FTC Version | Description |
|---|---|
| 2.1 | More information regarding Cluster usage |
| 2.2 | Added API JobCleanUp |
| 2.4 Preview | Added more options for method “SetSettings” and updated information for method “GetSettings” |
| 2.4 | Added more options for API “SetJobInfo” and “GetListOfJobs” |
| 3.0 | Added more options for API “GetListOfJobs”, to search by source filename or output filename |
| 3.2 | Added API “SetClusterTags” and “GetClusterTags” |
| 3.2 | Added 'HasCluster' to GetSystemInfo, some information about new job types, ProcessArchitecture info. |
| 3.2 | Added 'JobTag' to JobDescr (JobData description) |
| 3.2 | Added Source File Analysis job type information, and Machine maintenance mode disconnect |
| 4.0 | Added API “AddMachine” |
| 4.5 | Added more options for API “SetJobInfo”; Updated API responses for “GetListOfJobs” |
| 4.5 | Added more attributes to JobDescr for GetJobInfo |
| 4.8 | Fixed errors in API “SetSettings” and added more attributes |
| 5.0.1 | Fixed errors in formatting of this document; Added new Job Type “Management_FlowParent” |

---

## 1. Introduction

This document describes the Cambria FTC Application Programming Interface (API). This API allows programmatic control over FTC and Cluster. The API can be used to add, manage and delete FTC jobs, configure FTC settings, get information about a machine running FTC and more.

The API is implemented using REST architecture. The FTC software runs a web server which exposes the REST API described in this document. HTTP is used as the transport layer, and server responses are returned in XML format. A client using the API can run on the machine where FTC is installed or on another machine on the same network.

REST APIs use standard HTTP methods (GET, POST, PUT and DELETE). They can therefore be used from any programming or scripting language which is able to make HTTP calls.

### 1.1 Before using the API

Before starting to use the API, it is recommended to become familiar with FTC using its User Interface. This will help understand the concept of a job and the job management system, which in turn will make using the API a simpler task.

A sample application using the API is also available. Not only is the C# source code for this application available, but the application itself implements a User Interface which demonstrates the use of the API. It displays the URIs called, the server XML responses and status codes returned from the server. Please note that this sample application only runs on Windows and requires .NET 4.7.2 or newer.

Sample function called, XML responses and POSTed data to add and monitor a transcoding job are available in the `FTC_APISamples` folder included with this package.

A web browser can also be used to call the API functions which use the HTTP GET method.

### 1.2 Requirements/Prerequisites

FTC must be installed on a machine located on the same network as the application using the API. FTC runs the API web server as a Windows Service, and it is available as soon as the FTC machine has started up.

Writing an application using the API requires familiarity with a programming or scripting language which can use standard HTTP methods, such as:

- C
- C++
- C#
- Java
- Python
- Perl
- Ruby
- VisualBasic
- Delphi
- PHP

Applications using the API can run on various operating systems, such as:

- Microsoft Windows
- Apple macOS
- Apple iOS
- Linux
- Google Android

### 1.3 Notes about methods usage

Success or failure of the methods is described using standard HTTP status codes. Status codes in the 200-299 range indicate success. Status codes in the 400-599 range indicate errors. More information about HTTP status codes can be found at: http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html

The methods of the API can be executed using either the HTTP or the HTTPS protocol. To use HTTPS, simply use the `https://` prefix instead of the `http://` prefix for the URIs.

Default ports:
- FTC: HTTP **8647**, HTTPS **8648**
- Cluster: HTTP **8649**, HTTPS **8650**

### 1.4 FTC (single machine) vs Cluster (multi-machine) usage

Machines with Cambria Cluster are running two web servers. The first one uses ports 8647 and 8648, and it is the local FTC web server. This is used by Cluster to assign jobs to the machine it is running on, and query the status of these jobs. The other web server uses ports 8649 and 8650 and it is the Cluster web server.

The Cluster web server includes additional functionality, providing information and control over the machines that it is controlling.

To assign jobs to the Cluster and have them distributed to the machines of the cluster, these jobs must be added to the Cluster web server. Similarly to delete a job which was assigned to the Cluster, or to list the Cluster jobs, the Cluster web server must also be used.

To interact with Cambria Cluster, it is only necessary to communicate with the machine running Cambria Cluster, and ports 8649 or 8650 must be used.

To detect if Cluster is installed, call **GetSystemInfo** on the FTC web server (with port 8647 or 8648) and check if `HasCluster` attribute is set to `1`.

---

## 2. API Methods

This chapter describes the different methods of the API, as well as their parameters and the expected response.

Each method of the API is described in this chapter. For each method, the following elements are described:

- **Method name**: used to refer to a particular method in our documentation.
- **Description**: a brief overview of the method's use
- **Note**: any notes of interest regarding the method
- **Arguments**: list of arguments which can be passed to the method
- **HTTP method**: the HTTP verb used for this method (GET, POST, PUT or DELETE)
- **HTTP POST XML Content**: XML to pass to the server when using POST (UTF-8 encoded)
- **HTTP XML response**: XML returned by the method

The examples assume `machineName` is the host and the REST API server is using the default port.

Methods which require a job ID use the following notation: `http://machineName:8647/CambriaFC/v1/Jobs/[JobID]`

For Cluster-only methods requiring a machine ID: `http://machineName:8649/CambriaFC/v1/Machines/[MachineID]`

> **Note:** The XML Elements mentioned in this section are described in **Chapter 3 — XML Elements**.

### GetSystemInfo

**FTC:** `http://machineName:8647/CambriaFC/v1/SystemInfo`  
**Cluster:** `http://machineName:8649/CambriaFC/v1/SystemInfo`

**Description:** Retrieve information about the computer system.

**Note:** Low impact method, can be used to verify that the REST API server is running.

**Arguments:** none

**HTTP Method:** `GET`

**HTTP XML Response Elements:**

- `Content`: container for the response
- `Status`: logs of the API call
- `ServerRequest`: information about the request
- `Error`: information about errors (when present)
- `System`: system information  
  - `HasCluster`: set to `1` indicates that Cambria Cluster is installed

### GetSystemStatus

**FTC:** `http://machineName:8647/CambriaFC/v1/SystemStatus`  
**Cluster:** `http://machineName:8649/CambriaFC/v1/SystemStatus`

**Description:** Retrieve information about current resource usage (CPU/RAM).

**Arguments:** none

**HTTP Method:** `GET`

**HTTP XML Response Elements:**

- `Content`, `Status`, `ServerRequest`, `Error`, `System`

### AddJob

**FTC:** `http://machineName:8647/CambriaFC/v1/Jobs`  
**Cluster:** `http://machineName:8649/CambriaFC/v1/Jobs`

**Description:** Adds jobs to the system.

**Note:** The HTTP XML response includes a `jobID` (unique job identifier) in `ServerRequest` which can be used by other methods (`DeleteJob`, `GetJobInfo`, etc.).

**Arguments:** none

**HTTP Method:** `POST`

**HTTP POST JobData:**

- Element `JobDescr`: specification of the job (see **Chapter 4 — Job Specification**)

**HTTP XML Response Elements:**

- `Content`, `Status`, `ServerRequest`, `Error`

### DeleteJob

**FTC:** `http://machineName:8647/CambriaFC/v1/Jobs/[JobID]`  
**Cluster:** `http://machineName:8649/CambriaFC/v1/Jobs/[JobID]`

**Description:** Deletes job with ID `[JobID]` from the system.

**Note:** Deletion is permanent. To stop a running job but keep it in the system for later restart, use `SetJobInfo` to change job status to cancel or pause.

**Arguments:** none

**HTTP Method:** `DELETE`

**HTTP XML Response Elements:**

- `Content`, `Status`, `ServerRequest`, `Error`, `System`

### GetJobInfo

**FTC:** `http://machineName:8647/CambriaFC/v1/Jobs/[JobID]`  
**Cluster:** `http://machineName:8649/CambriaFC/v1/Jobs/[JobID]`

**Alternatives using arguments:**

- `...?Content=Full`
- `...?Content=Status`
- `...?Content=Description`
- `...?Content=JobData`

**Description:** Retrieves information about a job.

**Arguments:**

- `Content` = `Description` (default), `Status`, `JobData`, or `Full`.

**HTTP Method:** `GET`

**HTTP XML Response Elements:**

- `Content`, `Status`, `ServerRequest`, `Error`
- `Job`: the posted job data (see **Chapter 4**)
- `JobDesc`: metadata (submission time, retries, status, errors, etc. — see **Chapter 3 — JobDesc**)
- `Task`: child of `JobDesc`; tasks progress (a job can have multiple tasks)

### GetListOfJobs

**FTC:** `http://machineName:8647/CambriaFC/v1/Jobs`  
**Cluster:** `http://machineName:8649/CambriaFC/v1/Jobs`

**Examples:**

- `...?Status=Running`
- `...?Status=All&Count=50&Offset=0`
- `...?OutputFilename=capella*`
- `...?Status=All&Count=50&Offset=50&SortBy=SubmitTime&OrderBy=Asc`

**Description:** Retrieves a list of `JobID`s.

**Arguments:**

| Name | Type | Description |
|---|---|---|
| Status | All (default), Queued, Running, Paused, Cancelled, Done, Error | Filter by job status |
| SourceFilename | Text | Filter by source filename (glob-like) |
| OutputFilename | Text | Filter by output filename (glob-like) |
| Count | Int (default: 100, max: 1000) | Max number of JobIDs to return |
| Offset | Int (default: 0) | Offset index (e.g., Count=20 & Offset=60 → returns items 60–79) |
| SortBy | SubmitTime (default), StartTime, EndTime, Priority, Status | Sort column (required when using `OrderBy`) |
| OrderBy | Asc (default), Desc | Sort order |

**HTTP Method:** `GET`

**HTTP XML Response Elements:**

- `Content`, `Status`, `ServerRequest`, `Error`
- `JobList`
  - `Job` element(s), each contains `JobID`

### GetJobPreviewImage

**FTC:** `http://machineName:8647/CambriaFC/v1/Jobs/[JobID]/PreviewFrame`  
**Cluster:** `http://machineName:8649/CambriaFC/v1/Jobs/[JobID]/PreviewFrame`

**Description:** Retrieves a JPEG image of the current frame being transcoded.

**Note:** On success, returns JPEG content. On error, returns XML similar to other API responses. Caller can check HTTP `Content-Type` or status code.

**Arguments:** none

**HTTP Method:** `GET`

**HTTP XML Response (on error):** `Content`, `Status`, `ServerRequest`, `Error`

### SetJobInfo

**FTC:** `http://machineName:8647/CambriaFC/v1/Jobs/[JobID]/`  
**Cluster:** `http://machineName:8649/CambriaFC/v1/Jobs/[JobID]/`

**Examples:**

- `...?Priority=1`
- `...?Priority=Urgent`
- `...?Status=Queue`
- `...?Status=Queue&Diagnostics=true`
- `...?ProcessPriority=Low`
- `...?Retries=0`

**Description:** Modifies the job settings for the job with ID `[JobID]`.

**Note:** No default call; each call must include **one or more** arguments. Prefer changing one property per call to avoid partial effects.

**Arguments:**

| Name | Type | Description |
|---|---|---|
| Priority | Int/String | 1 (highest) to 10 (lowest) or `urgent` |
| Status | Queue, Resume, Pause, Cancel | Attempt to change job status |
| Retries | Int | Retry count (>= 0) |
| ProcessPriority | Realtime, High, Abovenormal, Normal, Belownormal, Low | Process priority |

**HTTP Method:** `PUT`

**HTTP XML Response Elements:** `Content`, `Status`, `ServerRequest`, `Error`

### GetSettings

**FTC:** `http://machineName:8647/CambriaFC/v1/Settings`  
**Cluster:** `http://machineName:8649/CambriaFC/v1/Settings`

**Description:** Retrieves information on settings, such as number of transcoding slots (maximum simultaneous transcoding jobs), and job stalling timeout.

**Arguments:** none

**HTTP Method:** `GET`

**HTTP XML Response Elements:**

- `Content`, `Status`, `ServerRequest`, `Error`
- `Settings` (contains `TranscodingSlots`, `JobStallTimeout`)

### SetSettings

**FTC:** `http://machineName:8647/CambriaFC/v1/Settings/`  
**Cluster:** `http://machineName:8649/CambriaFC/v1/Settings/`

**Examples:**

- `...?TranscodingSlots=4`
- `...?JobStallTimeout=600`
- `...?PrioritizeUrgentJob=1`

**Description:** Set the number of transcoding slots and job stalling timeout.

**Note:** No default call. Each call must specify **one argument only**.

**Arguments:**

| Name | Type | Description |
|---|---|---|
| TranscodingSlots | Int | 1–16 |
| JobStallTimeout | Int | 600, 1200, 1800, 3600 (seconds) |
| PrioritizeUrgentJob | Int | `1` = urgent jobs will pause other jobs; `0` otherwise |
| BroadcastToCluster | Int | `1` = this machine will be controlled by Cluster (then settings above cannot be changed) |

**HTTP Method:** `PUT`

**HTTP XML Response Elements:** `Content`, `Status`, `ServerRequest`, `Error`

### JobCleanUp

**FTC:** `http://machineName:8647/CambriaFC/v1/JobCleanUp/`  
**Cluster:** `http://machineName:8649/CambriaFC/v1/JobCleanUp/`

**Example:**

`...?Status=Done&CompletionTime=3600&CompletionTimeMode=OlderThan`

**Description:** Remove jobs with specified status and time constraint. Example above removes jobs which have status “Done” and were completed before 1 hour ago.

**Note:** No default call. Each call must include status, time and mode. Depending on status, time and mode arguments differ (see types below).

**Types:**

- **Type 1**: Status = `Cancelled`, `Done`, `Failed`; Time constraint = `CompletionTime`; Mode = `Within`, `OlderThan`
- **Type 2**: Status = `Queued`, `Paused`; Time constraint = `SubmissionTime`; Mode = `Within`, `OlderThan`

**Arguments:**

| Name | Type | Description |
|---|---|---|
| Status | Queued, Paused, Cancelled, Done, Failed | Job status |
| CompletionTime | Int | Used with Status `Done`, `Cancelled`, `Failed` (seconds) |
| SubmissionTime | Int | Used with Status `Queued`, `Paused` (seconds) |
| CompletionTimeMode | Within, OlderThan | Used with Status `Done`, `Cancelled`, `Failed` |
| SubmissionTimeMode | Within, OlderThan | Used with Status `Queued`, `Paused` |

**HTTP Method:** `PUT`

**HTTP XML Response Elements:** `Content`, `Status`, `ServerRequest`, `Error`

### GetClientMachines (Cluster only)

`http://machineName:8649/CambriaFC/v1/Machines`

**Description:** Retrieves all client machines’ names, IP addresses and MachineIDs that are detected by Cluster.

**Arguments:** none

**HTTP Method:** `GET`

**HTTP XML Response Elements:**

- `Content`, `Status`, `ServerRequest`, `Error`
- `Machines` (with `Machine` children): IP, name and unique identifier

### GetMachineInfo (Cluster only)

`http://machineName:8649/CambriaFC/v1/Machines/[MachineID]`

**Description:** Retrieves important information for specified machine: FTC version, succeeded/failed counts, CPU cores, transcoding slots, priority, machine status.

**Arguments:** none

**HTTP Method:** `GET`

**HTTP XML Response Elements:** `Content`, `Status`, `ServerRequest`, `Error`, `MachineInfo`

### SetMachineSettings (Cluster only)

`http://machineName:8649/CambriaFC/v1/Machines/[MachineID]/`

**Examples:**

- `...?Priority=5`
- `...?TranscodingSlots=2`
- `...?status=connect`
- `...?status=disconnect`
- `...?status=disconnectmaintenance`
- `...?resetslots=true`

**Description:** Modifies the priority, transcoding slots, status for the machine with ID `[MachineID]`.

**Note:** No default call. Each call must include **one argument only**. Obtain MachineIDs via `GetClientMachines`.

**Arguments:**

| Name | Type | Description |
|---|---|---|
| Priority | Int | 1 (highest) to 10 (lowest) |
| TranscodingSlots | Int | 0–16 |
| Status | string | `connect`, `disconnect`, or `disconnectmaintenance` (the latter stops running jobs) |
| Resetslots | Bool | Reset succeeded/total count |

**HTTP Method:** `PUT`

**HTTP XML Response Elements:** `Content`, `Status`, `ServerRequest`, `Error`

### GetMachineTags (Cluster only)

`http://machineName:8649/CambriaFC/v1/Machines/[MachineID]/MachineTags`

**Description:** Retrieves machine tags for the specified machine. Combined with job tags, they can be used to control on which machines certain jobs can be executed.

**Arguments:** none

**HTTP Method:** `GET`

**HTTP XML Response Elements:** `Content`, `Status`, `ServerRequest`, `Error`, `MachineInfo` (including MachineTags)

### SetMachineTags (Cluster only)

`http://machineName:8649/CambriaFC/v1/Machines/[MachineID]/MachineTags`

**Example:**

- `...?MachineTags=WithHEVC,Fast,4k`

**Description:** Overwrites job tags for the machine with ID `[MachineID]`.

**Arguments:**

| Name | Type | Description |
|---|---|---|
| MachineTags | string | Comma-separated machine tags |

**HTTP Method:** `PUT`

**HTTP XML Response Elements:** `Content`, `Status`, `ServerRequest`, `Error`

### AddMachine (Cluster only)

`http://machineName:8649/CambriaFC/v1/Machines/`

**Description:** Add new machine to Cluster by specifying its IP address. Machines on the same subnet as Cluster are added automatically; use this API to add others.

**Arguments:** none

**HTTP Method:** `POST`

**HTTP POST JobData:**

- Element `Machine` with attributes `IP` and `autoConnect`

**HTTP XML Response Elements:** `Content`, `Status`, `ServerRequest`, `Error`, `MachineInfo`

---

## 3. XML Elements (Contained in Content Element)

### Status → ServerRequest

| Attribute | Description |
|---|---|
| Verb | HTTP method (`get`, `delete`, `put`, `post`) |
| Uri | The URL received by server (starts with `/CambriaFC/v1/`) |
| JobID | Unique job identifier (exists for some APIs) |

### Status → Error

| Attribute | Description |
|---|---|
| Type | String identifying error type |
| ReadableErrorEng | Human-readable error text (English) |
| HttpCode | HTTP code (200–299 success) — see http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html |

### System

| Attribute | Description |
|---|---|
| CPUs | Number of CPU cores |
| Ram | Total RAM (MB) |
| ProductVersion | Version number of Cambria FTC |
| CPUUsage | Current CPU usage (%) |
| FreeRam | Free RAM (MB) |
| Winver | Windows version |

### JobList

| Attribute | Description |
|---|---|
| ItemsInList | Number of `Job` items in this response |
| TotalItems | Total number of jobs with the specified status (or all when not specified) |

#### JobList → Job

| Attribute | Description |
|---|---|
| ID | Unique job identifier (GUID) |

### Job

The content varies per job type (see **Chapter 4**).

### Settings

| Attribute | Description |
|---|---|
| TranscodingSlots | Max simultaneous transcoding jobs |
| JobStallTimeout | Job stalling timeout (seconds) |

### JobDesc (Attributes)

| Attribute | Description |
|---|---|
| CurrentTask | The current task that the job is doing |
| Description | Concise remark of the job |
| DurationAtLastError | Time since last error (YYYY-MM-DD HH:MM:SS) |
| DurationSinceLastUpdate | Time since last update (YYYY-MM-DD HH:MM:SS) |
| EndTime | When job finished (YYYY-MM-DD HH:MM:SS) |
| JobID | Unique identifier of the job |
| JobType | `media` or `management` |
| LastError | Last error message |
| NumberOfFailures | Count of failures |
| NumberOfRetries | Count of retries |
| OutputFilename | Output file name |
| Priority | 1–10 (1 = highest) |
| ProcessID | OS process ID executing the job |
| ProgressAtLastError | % progress at last error |
| SourceFilename | Source file name |
| StartTime | When job started (YYYY-MM-DD HH:MM:SS) |
| Status | Current status (see table below) |
| StatusEnum | Internal use only (may change in future versions) |
| SubmissionTime | When job submitted (YYYY-MM-DD HH:MM:SS) |
| Submitter | Submitter’s IP |
| Task | Child nodes containing per-task progress |

#### JobDesc — Status Values

| Value | Meaning |
|---|---|
| queued | Job is in the queue |
| starting | Job is being started |
| running | Job is in process |
| pausing | Job is pausing |
| paused | Job is temporarily stopped |
| resuming | Job is resuming after pause |
| done | Job is complete |
| cancelling | Job is being stopped |
| cancelled | Job has been stopped |
| errored | Job has stopped due to an error |
| deleting | Job is being removed |

### JobDesc → Task

| Attribute | Description |
|---|---|
| ID | Task ID (starting at 0) |
| Type | Type of task |
| Progress | Progress (%) |

### MachineInfo

| Attribute | Description |
|---|---|
| FCVersion | FTC version of client machine |
| FailedCount | Failed job count (Cluster-assigned only) |
| SucceededCount | Succeeded job count (Cluster-assigned only) |
| NbOfCPUs | Number of CPU cores |
| NbOfSlotsInUse | Transcoding slots currently in use |
| NbOfTransSlots | Total transcoding slots |
| Priority | Client machine priority |
| Status | Status of client machine |

### Machines → Machine

| Attribute | Description |
|---|---|
| Identifier | Unique identifier of the machine |
| Name | Machine computer name |
| IP | IP address of the machine |

---

## 4. JobData Description

### 4.1 Basic JobData description

JobData consists of a `JobDescr` element and a child `Job` element:

```xml
<JobDescr Priority="5" NumberOfRetries="1" Description="Test" Submitter="10.12.0.15" ProcessArchitecture="x64" JobTag="">
  <Job … />
</JobDescr>
```

### 4.2 JobData elements

**JobDescr attributes:**

| Attribute | Description |
|---|---|
| Priority | 1 (highest) to 10 (lowest) |
| NumberOfRetries | Number of times the job manager will retry the job |
| ProcessArchitecture | `"x64"` for 64-bit, `"32"` for 32-bit |
| JobTag | Cluster-only: job tag used to distribute to matching machines |
| Description | Informative description |
| Submitter | Informative submitter description |
| JobProgress | Overall job progress (0–100 %) |
| RealTimeSpeed | Average speed (e.g., 1.75 means 1.75×) |

**Job attributes:**

| Attribute | Description |
|---|---|
| Type | Job type: `Fake`, `MediaGeneric`, `Management_MediaParent`, or `SourceAnalysis` |

### 4.3 'Fake' Job Type

For `Type="Fake"`:

| Attribute | Description |
|---|---|
| Type | `Fake` |
| Duration | Seconds to complete after start |
| Stall | `1` to stall at halfway point |
| Error | `1` to error at halfway point |

**Sample XML:**

```xml
<JobDescr Priority="5" NumberOfRetries="1" Description="Test Job" Submitter="Norman">
  <Job Type="Fake" Duration="50" Stall="0" Error="0"/>
</JobDescr>
```

### 4.4 Basic 'MediaGeneric' Job Type

A typical `MediaGeneric` job (attributes vary by encoder/muxer/filters):

```xml
<Job Type="MediaGeneric">
  <Filters />
  <Settings>
    <MuxerSettings FileConflictResolveOption="Overwrite" MuxerName="Muxer - MP4" Name="Mux1"
                   OutputFilename="C:\Out\test.mp4" OutputFilenameExtension="mp4" Type="MP4" />
    <EncoderSettings BFrames="0" BitrateKbps="1000" EncoderName="Video Encoder – H264" FrameHeight="480"
                     FrameRate="Same as Source" FrameWidth="640" Interlacing="Progressive"
                     MaxCPBSizeKbits="4000" MaxGOP="90" Name="VideoEnc1" Type="Video" VideoAspectRatio="Same as Source" />
    <EncoderSettings BitrateKbps="128" BitrateMode="0" BitsPerSample="16" EncoderName="Audio Encoder - AAC" />
  </Settings>
  <Upload DestinationUrl="ftp://" Password="" Retries="1" Type="Upload" Use="0" Username="" />
  <PostTask CommandLine="" TaskTimeOut="600" Type="PostConversion" />
  <Output Mux="Mux1">
    <OutStream Enc="VideoEnc1" InStreamIndex="0" InStreamType="Video" OutStreamID="" StreamSrc="Src1" />
    <OutStream Enc="AudioEnc1" InStreamIndex="0" InStreamType="Audio" Language="eng" OutStreamID="" StreamSrc="Src1" />
  </Output>
  <Source Location="C:\sourceFiles\source01.mov" Name="Src1" />
</Job>
```

**Elements overview:**

| Element | Parent | Description |
|---|---|---|
| Job | — | Container for job data |
| Filters | Job | Video filter configuration list |
| Settings | Job | Container for encoder and muxer settings |
| EncoderSettings | Settings | Video or audio encoder settings |
| MuxerSettings | Settings | Muxer settings (combines encoded streams) |
| Upload | Job | Output upload settings |
| PostTask | Job | Post-conversion task settings |
| Output | Job | Output stream routing |
| OutStream | Output | Maps encoder outputs into muxer inputs |
| Source | Job | Source file(s) |

### 4.5 Multi-target 'MediaGeneric' and 'Management_MediaParent'

`MediaGeneric` jobs can write to multiple targets from a single read. `Management_MediaParent` jobs are used for adaptive streaming. Both use structures similar to simple `MediaGeneric` jobs, with multiple outputs or nested `JobDescr` entries.

### 4.6 'SourceAnalysis' Job Type

**Attributes:**

| Element | Value | Description |
|---|---|---|
| Type | SourceAnalysis | Identifies a source analysis job |
| SourceFilename | UNC path | Path of source file |
| OutputFilename | UNC path | Path of output XML to create |
| AnalysisDurationSec | number | Duration to analyze (for GOP structure, etc.) |
| MaxNbTimecodes | number | Max timecodes to extract into output XML |
| MaxNbMetadata | number | Max metadata units to extract into output XML |

### 4.7 Workflow Job Type `Management_FlowParent`

Workflow jobs describe combinations of other job types, executed serially or in parallel. Sub-jobs can be distributed to other FTC clients when originating from Cluster.

**Limitations:**

- `MediaGeneric` sub-jobs tested (others not)
- No UI to facilitate creation
- No nesting `Parallel` inside `Parallel`

**Elements:**

| Element | Parent | Description |
|---|---|---|
| Job | — | Container for workflow |
| Sequence | Job | Sequence of sub-jobs (`Parallel` or `Job`) |
| Parallel | Sequence | Set of job XMLs to run in parallel |
| JobDescr | Sequence/Parallel | A complete sub-job XML (serial or in parallel set) |

**Serial example:**

```xml
<Job Type="Management_FlowParent">
  <Sequence>
    <JobDescr Priority="5" Submitter="Cambria" NumberOfRetries="2">
      ...
    </JobDescr>
    <JobDescr Priority="5" Submitter="Cambria" NumberOfRetries="2">
      ...
    </JobDescr>
  </Sequence>
</Job>
```

**Parallel example:**

```xml
<Job Type="Management_FlowParent">
  <Sequence>
    <Parallel>
      <JobDescr Priority="5" Submitter="Cambria" NumberOfRetries="2">
        ...
      </JobDescr>
      <JobDescr Priority="5" Submitter="Cambria" NumberOfRetries="2">
        ...
      </JobDescr>
    </Parallel>
  </Sequence>
</Job>
```

**Combined example:**

```xml
<Job Type="Management_FlowParent">
  <Sequence>
    <Parallel>
      <JobDescr Priority="5" Submitter="Cambria" NumberOfRetries="2">
        ...
      </JobDescr>
      <JobDescr Priority="5" Submitter="Cambria" NumberOfRetries="2">
        ...
      </JobDescr>
    </Parallel>
    <JobDescr Priority="5" Submitter="Cambria" NumberOfRetries="2">
      ...
    </JobDescr>
  </Sequence>
</Job>
```

---

## 5. Error Type

API calls return XML back as string. In the element `Status`, there is a sub-element `Error` whenever the API cannot complete a request. The `Type` attribute indicates the technical error concisely:

| Type | Description |
|---|---|
| Success | No error |
| Database Connection Error | Cannot connect to Database |
| Database Access Error | Cannot access Database |
| Invalid Job ID | Invalid Job ID specified in URL (or missing where required) |
| Null Pointer | Job ID passed in was empty |
| Invalid XML | XML POSTed was invalid |
| Invalid Priority | Priority value specified is invalid |
| Invalid Status | Status specified is invalid |
| Invalid Progress | Progress was set inappropriately |
| Invalid Task Type | Type of the job to add is not valid |
| Invalid Operation | Requested query/option is not valid |
| String Not Large Enough | Buffer is not large enough to store the string |
| Image Buffer Not Stored | Unable to copy retrieved image to buffer or retrieve image |
| Invalid Diagnostics Mode | Diagnostics Mode specified is not supported |
| Status Not Changeable | Job status cannot be changed to specified value |
| Missing JobData XML | Attempted to add new jobs without Job XML |
| Missing Parameter | Missing parameters for APIs that require them |
| Bad Parameter | Invalid parameters specified for the API |
| Unexpected Error | All other errors not fitting above |

---

*End of Document*