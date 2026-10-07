# Cambria Cluster / FTC

## Kubernetes User Guide 5.8.0

## Document History

| Version | Date | Description |
|---|---|---|
| 5.6.0 | 10/31/2025 | Updated for release 5.6.0.26533 (Linux) |
| 5.8.0 | 07/01/2026 | Updated for release 5.8.0.31580 (Linux) |

\* Download the online version of this document for the latest information and latest files. Always download the latest files

### Important: Before You Begin

PDF documents have a copy/paste issue. For best results, download this document and any referenced PDF documents in this guide and open them in a PDF viewer such as Adobe Acrobat.

For commands that are in more than one line, copy each line one by one and check that the copied command matches the one in the document.

## Firewall Information

For custom / non-default configurations, or to explore with a more restrictive network based on the default virtual network created, the following is a list of known ports that the Cambria applications use:

| Port(s) | Protocol | Traffic | Description |
|---|---|---|---|
| 8650 | TCP | Inbound | Cambria Cluster REST API |
| 8161 | TCP | Inbound | Cambria Cluster WebUI |
| 8678 | TCP | Inbound | Cambria License Manager Web Server |
| 8481 | TCP | Inbound | Cambria License Manager WebUI |
| 9100 | TCP | Inbound | Prometheus System Exporter for Cambria Cluster |
| 8648 | TCP | Inbound | Cambria FTC REST API |
| 3100 | TCP | Inbound | Loki Logging Service |
| 3000 | TCP | Inbound | Grafana Dashboard |
| 443 | TCP | Inbound | Capella Ingress |
| ALL | TCP/UDP | Outbound | Expose all Outbound Traffic |

Also, for Cambria licensing, any Cambria Cluster and Cambria FTC machine requires that at least the following domains be exposed in your firewall (both inbound and outbound traffic):

| Domain | Port(s) | Protocol | Traffic | Description |
|---|---|---|---|---|
| api.cryptlex.com | 443 | TCP | In/Out | License Server |
| cryptlexapi.capellasystems.net | 8485 | TCP | In/Out | License Cache Server |
| cpfs.capellasystems.net | 8483 | TCP | In/Out | License Backup Server |

## Testing Cambria FTC / Cluster

Before getting started, make sure to have the following:

1. Cambria FTC Installed

   Have one of the following Cambria FTC installations

   **Option 1: Kubernetes Cluster**

   - A Kubernetes Cluster with Cambria FTC / Cluster Installed
   - Linux deployment machine with Kubernetes cluster's kubeconfig and other tools

   **Option 2: Cambria FTC Solo**

   - A Linux machine with Cambria FTC Solo installed

   **Option 3: Docker Linux**

   - A Linux machine with Cambria FTC installed in a Docker container

2. cURL command-line tool (or similar REST API client)

## 1. Pre-requisites

### 1.1. Get Cambria Cluster Links

In order to submit jobs, the REST API url is needed. Also, to view the jobs in a job list in a graphical UI, the WebUI url will also be needed.

WebUI and REST API:

Run the following steps depending on the method used to install Cambria Cluster / FTC.

**Option 1: Kubernetes Cluster or Cambria FTC Solo**

In the Linux deployment server where the Cambria FTC package is, run the following command:

```bash
./bin/getFtcInfo.sh
```

This should return a set of links and useful information for gaining access to different parts of the Cambria FTC software. Look for the Cambria Cluster Web UI and Cambria Cluster Rest API sections.

**Option 2: Cambria FTC on Docker Linux**

For the Cambria Cluster Web UI, the address is:

```text
https://[MACHINE IP]:8161
```

For the Cambria Cluster Rest API, the address is:

```text
https://[MACHINE IP]:8650/CambriaFC/v1
```

### 1.2. Get Usertoken for API Calls

This only applies to Kubernetes and Cambria FTC Solo installations. The usertoken for Cambria Cluster can be found by running the following command where the Cambria Cluster Kubernetes Package is located:

```bash
./bin/getFtcInfo.sh --api
```

Also, for most REST API calls, a special user token is required.

## 2. Create a Cambria FTC Job

### Sample Cambria FTC Jobs

Use this option if you do not currently have cloud Cambria FTC jobs to test with. The following package includes sample Cambria FTC jobs to test with:

1. Download the package

```bash
curl -o CambriaClusterSampleJobs.zip -L "https://www.dropbox.com/scl/fi/wnkkcd4iwi2tgy8m1y5ct/CambriaClusterSampleJobs.zip?rlkey=ilxx7sap6juxfq39shvumlvqn&st=47zurxa2&dl=1"
```

2. Unzip the contents

```bash
unzip -o CambriaClusterSampleJobs.zip
```

3. Edit the desired jobs (or create new ones from the samples)

### Samples Option 1: Akamai ObjectStorage

Capella provides some sample job XML files that can be used to test the Kubernetes Cluster/FTC setup where source comes from and output is written to Akamai ObjectStorage.

THESE JOB XMLs WILL HAVE 'AKAMAI OBJECT STORAGE' IN THE FILENAME

For the Job XML file, there are some attributes that need to be changed with your proprietary information (only modify the highlighted fields):

1. aws_access_key_id and aws_secret_access_key in the `<JobDescr>` tag. This is used for reading source(s) from Akamai ObjectStorage.

```xml
<JobDescr Description="Queued Job (bbb_short)"
          JobTag=""
          NumberOfRetries="2"
          Priority="5"
          ProcessArchitecture="x64"
          Submitter="Cambria"
          aws_access_key_id="XYZABC"
          aws_secret_access_key="1234abcdefg">
```

2. OutputFilename in `<MuxerSettings>` tag. Only change the highlighted part of this OutputFilename. %guid% is used here to differentiate between output files in this job and to avoid overwriting files with the same name.

```xml
NexguardABStubMode="0"
NexguardABTransferCharacteristics="Linear"
OutputFilename="%tempLocation%/output_file_%guid%"
PCRPID="1536"
PMTPID="512"
PlaceChildPlaylistNextToMasterPlaylist="0"
```

3. S3 Upload information in `<Upload>` tag. This is used to write the output of the encode to your preferred Akamai ObjectStorage bucket

Bucket: this is the name of the bucket to write the output to  
Region: this is the region of your bucket (Eg. us-west-1.linodeobjects.com)  
Location: the subfolder inside the bucket to write the output to (leave blank to output directly to bucket)  
aws_access_key_id: the access key id for writing to the bucket (from Access Keys)  
aws_secret_access_key: the secret access key for writing to the bucket (from Access Keys)

```xml
<UploadSettings Use="1">
  <Upload AllowNoLocalFile="1"
          Bucket="my-bucket"
          Location="path/inside/mybucket"
          MultiPartSizeKBytes="5120"
          RateLimitKbps="0"
          Region="sample-region.linodeobjects.com"
          Type="S3Upload"
          WriteWhileEncoding="1"
          aws_access_key_id="XYZABC"
          aws_secret_access_key="1234abcdefg"/>
  <Action Perform=""
          Trigger=""/>
```

4. Location in the `<Source>` tag. This is used to specify the location in your Akamai ObjectStorage for your source file.

my-bucket : the name of your Akamai ObjectStorage bucket  
sample-region.linodeobjects.com : the bucket’s specific region  
path/to/myfile.mp4 : the subfolder path inside the bucket for the source file

```xml
<Source Location="[s3]my-bucket@sample-region.linodeobjects.com:path/to/myfile.mp4"
        Name="Src1"/>
```

### Samples Option 2: AWS S3 Using IAM Roles

This can only be used with machines that have assumed an AWS IAM role that has S3 permissions. If you don't know what this is, skip this section. Capella provides some sample job XML files that can be used to test the Kubernetes Cluster/FTC setup where source comes from and output is written to AWS S3.

THESE JOB XMLs WILL HAVE 'IAM ROLES' IN THE FILENAME

For the Job XML file, there are some attributes that need to be changed with your proprietary information (only modify the highlighted fields):

1. OutputFilename in `<MuxerSettings>` tag. Only change the highlighted part of this OutputFilename. %guid% is used here to differentiate between output files in this job and to avoid overwriting files with the same name.

```xml
NexguardABStubMode="0"
NexguardABTransferCharacteristics="Linear"
OutputFilename="%tempLocation%/output_file_%guid%"
PCRPID="1536"
PMTPID="512"
PlaceChildPlaylistNextToMasterPlaylist="0"
```

2. S3 Upload information in `<Upload>` tag. This is used to write the output of the encode to your preferred S3 bucket

Bucket: this is the name of the bucket to write the output to  
Region: this is the region of your bucket (Eg. us-west-1)  
Location: the subfolder inside the bucket to write the output to (leave blank to output directly to bucket)

```xml
<UploadSettings Use="1">
  <Upload AllowNoLocalFile="1"
          Bucket="my-bucket"
          Location="path/inside/mybucket"
          MultiPartSizeKBytes="5120"
          RateLimitKbps="0"
          Region="sample-region"
          Type="S3Upload"
          WriteWhileEncoding="1" />
  <Action Perform=""
          Trigger=""/>
```

3. Location in the `<Source>` tag. This is used to specify the location in S3 for the desired source file.

my-bucket : the name of your Akamai ObjectStorage bucket  
sample-region : the bucket’s specific region  
path/to/myfile.mp4 : the subfolder path inside the bucket for the source file

```xml
<Source Location="[s3]my-bucket@sample-region:path/to/myfile.mp4"
        Name="Src1"/>
```

### Samples Option 3: Akamai NetStorage

Capella provides some sample job XML files that can be used to test the Kubernetes Cluster/FTC setup where source comes from and output is written to Akamai NetStorage.

THESE JOB XMLs WILL HAVE 'AKAMAI NETSTORAGE' IN THE FILENAME

For the Job XML files, there are some attributes that need to be changed with your proprietary information (only modify the highlighted fields):

1. netstorage_secret_key in the `<JobDescr>` tag. This is used for reading source(s) from Akamai NetStorage.

```xml
<JobDescr Description="FTC Encoder - HLS (Default)"
          JobTag=""
          NumberOfRetries="3"
          Priority="5"
          ProcessArchitecture="x64"
          Submitter="API Submission"
          netstorage_secret_key="my-netstorage-key">
```

2. OutputFilename in `<MuxerSettings>` tag. Only change the highlighted part of this OutputFilename. %guid% is used here to differentiate between output files in this job and to avoid overwriting files with the same name.

FTC Packager Job XMLs:

```xml
<MuxerSettings AdaptiveStreamType="HLS-fMP4"
               FileConflictResolveOption="Overwrite"
               MuxerName="Muxer - Adaptive Streaming"
               Name="Mux1"
               OutputFilename="%tempLocation%/sample-source-hls-packager_%guid%"
               SubTaskRetries="2"
               Type="AdaptiveStreaming"/>
```

FTC Encoder Job XMLs:

```xml
<MuxerSetttings
                  ...
                  MuxerName="Muxer - Adaptive Streaming Packager"
                  NGSFKey=""
                  NGSFPreset=""
                  Name="Mux1"
                  NewKeyPerLayer="0"
                  NexguardABStubMode="0"
                  NexguardABTransferCharacteristics="Linear"
                  OutputFilename="%tempLocation%/sample-source-hls_%guid%"
                  ... />
```

3. Akamai NetStorage Upload information in `<Upload>` tag. This is used to write the output of the encode to your preferred NetStorage location:

Domain: the domain name to your NetStorage filesystem  
KeyName: the value / username to access the NetStorage filesystem  
Path: the path inside NetStorage where to upload the output file(s)

```xml
<Upload Domain="my-netstorage-domain"
        KeyName="my-netstorage-username"
        Path="path/to/output/directory"
        Type="NetStorageUpload" />
```

4. Location in the `<Source>` tag. This is used to specify the location in your Akamai NetStorage for your source file.

my-netstorage-username : the keyname (username) to access the NetStorage filesystem  
my-netstorage-domain : the domain name to your NetStorage  
path/to/myfile.mp4 : the path to the source file(s) in the NetStorage filesystem

```xml
<Source Location="[netstorage]my-netstorage-username@my-netstorage-domain:path/to/my/sample-source.mp4"
        Name="Src1" />
```

For FTC Packager Job XMLs:

Change the above, as well as attributes for the video bitrate and CPB size:

my-video-bitrate: the video layer’s specific bitrate  
my-video-cpb: the video layer’s specific CPB size (Eg. 2). You can guess this value if the exact CPB size is unknown

```xml
<Sources MuxerType="None"
         SegmentDurationSec="4"
         UseDRM="false"
         EmbedSCTEInfo="true"
  <Source Location="[netstorage]my-netstorage-username@my-netstorage-domain:path/to/sample-source.mp4"
          Type="Video" VideoBitrateKbps="my-video-bitrate" VideoBufferSizeInSec="my-video-cpb" />
  <Source
Location="[netstorage]my-netstorage-username@my-netstorage-domain:path/to/sample-source-audio.mp4"
          Type="Audio"
          LangCode="eng"/>
</Sources>
```

Note: For FTC Packager only, you can add a `<Source … Type=”video” />` for every video quality level and `<Source … Type=”Audio” LangCode=”...” />` for every audio quality / language for your package.

### Use Existing JobXML Files

For this option, users can use their own JobXML files. However, these JobXMLs may need to be modified so that they work with the existing Cambria FTC deployment. For all Kubernetes cases, currently only cloud-based files are supported, such as AWS S3, Akamai NetStorage, etc. See the Sample Cambria FTC Jobs section for some information on how to configure JobXMLs in one of those methods.

## 3. Queue A Cambria FTC Job

1. Select one of the JobXMLs from the above sections

2. Run the job with cURL using the user token (replace highlighted values):

`<restapi-url>`: the REST API ip address / hostname  
`<usertoken>`: the user token  
/path/to/my/job.xml: the path to the Job XML file to test against the Cambria Cluster

```bash
curl -k -X POST https://<restapi-url>/CambriaFC/v1/Jobs/?usertoken=<usertoken> -d @/path/to/my/job.xml
```

Sample:

```bash
curl -k -X POST https://api.myhost.com/CambriaFC/v1/Jobs/?usertoken=12345678-1234-43f8-b4fc-53afd3893d5f -d @TS_Akamai_ObjectStorage_Sample_Job.xml
```

3. In the Cluster Web UI, check that the job has been queued successfully

> [Image omitted from this Markdown build.]

Note: it may take several minutes for Kubernetes to create a Cambria FTC instance to handle the job.

## Quick Reference: Useful Information

### Get Cambria Cluster REST API Info (Kubernetes and Cambria FTC Solo)

```bash
./bin/getFtcInfo.sh --api
```

### Get Cambria Cluster REST API Info (Docker Linux)

```text
https://[MACHINE IP]:8650/CambriaFC/v1
```

Where [MACHINE IP] is the IP of the machine hosting the Cambria FTC Docker container.

### Get Usertoken (Kubernetes and Cambria FTC Solo Only)

```bash
./bin/getFtcInfo.sh --api
```

Look for the usertoken in the information provided by the above command.

### Sample Cambria Cluster API Calls

For a list of other common API calls, run the following on your web browser:

```text
https://<restapi-url>
```

Or in a command line window (via cURL):

```bash
curl -k -X GET https://<restapi-url>
```

Example:

```bash
curl -k -X GET https://localhost:8650
```

This will return a JSON list of urls to other API functions for Cambria Cluster. The output should look similar to this:

```json
{
  "system_info": "https://localhost:8650/CambriaFC/v1/SystemInfo",
  "system_status": "https://localhost:8650/CambriaFC/v1/SystemStatus",
  "license_info": "https://localhost:8650/CambriaFC/v1/LicenseInfo",
  "job_list": "https://localhost:8650/CambriaFC/v1/Jobs",
  "machine_list": "https://localhost:8650/CambriaFC/v1/Machines",
  "settings": "https://localhost:8650/CambriaFC/v1/Settings"
}
```
