---
id: cambria-5-8-release-notes
title: Cambria 5.8 Release Notes
---

# Cambria 5.8

**Release Notes Updated (06/30/2026)**

**Release Build 5.8.0.31576 Release (and 5.8.0.x Branch Builds)**

Release notes cover Cluster, FTC, FTC API Packager, Cluster/FTC Linux & Kubernetes

### Notice: Older NVIDIA GPU Architecture Deprecation Notice

Support for older NVIDIA GPU architectures will be deprecated in a future release. Future releases will require Turing or newer GPUs as the minimum supported architecture.

### Notice: Removal of Cloud Extend Storage

As MinIO has discontinued support for the filesystem backend functionality leveraged by Cluster’s CloudExtend features, the CloudExtend Storage feature (used for simplified on-premise storage mapping) will be removed from Cluster. Version 5.6 will be the last release to support this functionality.

### Notice: EZTitles plugin has reached the end of its life-cycle

- The Capella EZTitles plug-in will no longer be in active development because the plug-in product has come to the end of its life-cycle.

- EZTitles will no longer provide customer support for the plug-in, although existing installations are expected to continue to work at this time.

- Please contact Capella with your caption/subtitle requests.
### Notice: Removal of non-HTTPS APIs

- The methods of the API must be executed using HTTPS. HTTP has been removed and will no longer work. To use HTTPS, simply use the “https://” prefix instead of the “http://” prefix for the URIs. For FTC the port number used for HTTPS methods is 8648. For Cluster the port number used for HTTPS is 8650.

- SNMP support for Cluster/FTC was using non-HTTPS API. For the 5.1.0.12651 build of Cluster/FTC, SNMP has been disabled. We will look into adding support back in for a future build.

### Important notes about the PostgreSQL upgrade

- Database migration between Postgres 9.3 and 14.3 is not automatic
- Installing Cluster/FTC ver. 5.0 will come with a clean Database (Postgres 14.3)
- If you are upgrading from FTC versions 4.8 (or lower) to 5.0 then Postgres 9.3 will still be installed on the system, which will be used to migrate all of the information to Postgres 14.3

- Only migration from Postgres 9.3 (FTC versions 4.8 or lower) to Postgres 14.3 (FTC 5.0 and above) is supported.

- Please read the migration document below on how to migrate the database: https://www.dropbox.com/s/otias8vdolo6215/Postgres%2014.3%20Migration%20Document.pdf?dl=0

Downgrading note: Downgrading from FTC 4.5 (or higher) to FTC 4.0 is not supported

### Important Licensing notes

- If you are using a build older than Floating License Server 4.5 or Cluster/FTC 4.5, there is a good chance the online activation license has stopped working sometime after May 2021.

- If you are using Cluster/FTC without the Floating License Server, then all you will need to do is update Cluster/FTC to v4.5 or higher.

- If you are using Floating License Server then you will need to update to v4.5 or higher and Capella will need to issue you new Activation Keys.

- Offline licenses will continue to work.
- Please contact sales@capellasystems.net for instructions for additional instructions.
## System Requirements

### Minimum Requirements

Operating System: Windows 10 (64 bit), Windows 11, Windows Server (64 bit) 2016 / 2019 / 2022 /

2025, Linux (Ubuntu 24.04 recommended)

Processor: Intel 2.8GHz (Quad-Core) or faster

Memory: 8GB or more (4K/8K encoding requires more memory, 32GB or more suggested)

Video Card: Supports Direct3D acceleration

OS Installation note: File Convert and Cluster installation requires addition system files included in recent Windows Update. If you encounter issues during installation, please conduct "Windows Update", reboot, and try again.

### Warning for machines with more than 64 cores or machines that have multiple processor groups

Cluster/FTC support of multiple processor groups requires the Capella License option “Windows Multi- Processor Group Support (more than 64 logical processors)”. Without this license option, FTC will only utilize only one of the processor groups for all FTC Jobs run on the machine. If the license option is enabled, FTC will distribute multiple Jobs to each processor group. However, a single job will still only use one processor group at a time.

### Key Points (Behavior Clarified 10/2025)

Cambria FTC limits the number of logical CPU cores that can be used. Extra licenses (options) are available to support more CPU cores. Supported OS are Windows 11, Server 2022, Server 2025.

### Recommended

Operating System: Windows 10 (64 bit), Windows 11, Windows Server 2016/2019/2022, Linux (Ubuntu

20.04.3)

Platform: HP Z4

CPU: 1x Intel Core i9-10980XE @ 3.00GHz (18-core Cascade Lake)

Memory: 64 GB (4x16 GB) DDR4-3200

Video Card: Supports Direct3D acceleration

Network Adapter: Gigabit Ethernet (Wired Connection) or 10 Gigabit Ethernet

System Drive: 1TB Samsung M.2 NVMe SSD

## Windows System Settings

### Machine Administrator for Installation

It is required that machine administrator account be used for the Cambria software installation. After installation, a non-administrator account can be used for normal File Convert operation. However, for Cluster it is required that the logon user has administrator privilege. Cluster service by default is logon with LOCALSYSTEM, which has administrator privilege. If it is being logon with other users, that user must be a local administrator as well. Otherwise, the Cluster may not start.

To add a user to local administrator: Run lusrmgr.msc, go to Groups -> Administrators, Add that user to this group.

### Service Credentials

After installation check the Capella CpServiceManager (File Convert) or CpClusterManager (Cluster) service! These services will need to have the appropriate access rights to read from and write to network file locations. Here are the instructions on how to modify ‘Capella CpServiceManager’ service credentials.

   a. Open the Services panel (Control Panel>Administrative Tools>Services)
   b. Open Properties panel for Capella CpServiceManager
   c. In the Log On tab, select “This account:”
   d. Enter the full domain account and password. (ie. Yourname@company.com)
   e. This domain account must have access rights to the locations
   f. Restart the service as prompted
### Windows Virtual Memory Setting

To prevent some memory allocation errors that can occur, we recommend changing a Windows Virtual Memory setting to allow for “System managed size”.

   a. Open up to the Advanced tab in the System Properties panel
(Control Panel>System and Security>System>Advanced system settings)

   b. Select Settings under Performance
   c. From the Advanced tab select Change under Virtual Memory
   d. Uncheck “Automatically manage paging file size for all drives”, select
“System managed size”

## Dolby Licensee Notice

Cambria FTC contains products licensed from Dolby Laboratories, including:

- Dolby Digital Professional Decoder
- Dolby Digital Plus Professional Decoder
- Dolby E Decoder
- Dolby Digital Professional Encoder
- Dolby Digital Plus Professional Encoder
- Dolby E Encoder
- Dolby Dialogue Intelligence.
- Dolby Encoding Engine
- Dolby Vision Live Distribution Processing Manufactured under license from Dolby Laboratories. Dolby and the double-D symbol are trademarks of Dolby Laboratories

## New Features

### New Features added for 5.8


Features listed include all of the new features added for 4.x, 5.x up to 5.8. Please note that some of these features are in a beta state.


| Module | Feature | Capella Reference # |
| --- | --- | --- |
| Features listed incl | ude all of the new features added for 4.x, 5.x up to 5.8. Please note that<br />these features are i<br />n a beta state. | some of |
| Filter | Expanded Subtitle Inject Input Formats for 608 Captions<br />The Subtitle Inject video filter now supports additional caption file formats when generating embedded 608 captions.<br />Supported input formats for creating 608 output: SCC, GLA, TTML, XML, SRT, STL, PAC, and VTT. | 21250 |
| Filter | SCTE-35 Inject Option to Preserve GOP Timing<br />Support added for controlling whether the SCTE-35 Inject filter starts a new GOP at SCTE-35 marker positions. This helps workflows that require fixed keyframe timing, such as maintaining IDR frames at regular 2-second intervals while still inserting SCTE-35 ad signaling.<br />Usage: In job XML, set SCTE35StartsNewGOP for the SCTE35 Injection filter to control whether SCTE-35 markers start a new GOP.<br />Notes: This option is API/job XML only and is not exposed in the UI. | 21626 |
| Filter | Subtitle Burn-In Font Styling<br />The subtitle burn-in filter now supports font styling, including font color, edge color, bold, underline, italic, and transparency. This makes it possible to control subtitle appearance directly from the FTC subtitle filter settings.<br />Notes: For DVB Subtitle Burn-in, the styling applies when Burn-in Mode is set to Version 2. The related DVB Subtitle Inject filter also exposes these styling options in the FTC tab. | 22062 |
| JobXML<br />Submission | Audio Normalizer Loudness Log Output JobXML only feature that enables loudness logging option for the<br />Audio Normalizer filter. When LoudnessLog="1" is added to the<br />Audio Normalizer filter settings in the job XML, FTC generates a CSV loudness log in the output location.<br />The log includes loudness information for the original and converted audio over time, including original and converted loudness values. Generated LoudnessLog CSV filenames now also handle Korean characters correctly.<br />Usage: Add LoudnessLog="1" to the Audio Filter - Normalizer<br />filter settings in the job XML.<br />Note: Some fields from the customer’s reference log format are not available from the normalizer filter, including source/output dialnorm level and source/target codec information. | 21642 |
| JobXML<br />Submission | XML File Operation Jobs FTC now supports file operation jobs in XML for Copy and Move.<br />Use &lt;Job Type="FileOperation"&gt; with &lt;Operation Type="Copy"<br />/&gt; or &lt;Operation Type="Move" /&gt;, then define the source and<br />destination locations in the job XML.<br />Notes: This is XML-only and has no UI. | 21798 |
| WebUI | Queue Jobs to Remote Machine<br />Cambria FTC now includes WebUI options to queue all jobs or selected jobs to a remote FTC/Cluster machine. You can enter a machine name, hostname, IP address, or a full API endpoint such as https://10.0.0.24:8648/CambriaFC/v1/Jobs or https://api.myhost.com/CambriaFC/v1/Jobs/?usertoken=myusertoken. | 21321 |
| Manager /<br />WebUI | Web UI S3 Browser A new S3 browser is available from the Job Creator folder icon, allowing users to browse an S3 location using the entered Access Key and Secret Key.<br />Notes: Credentials are used for browsing and are not saved. | 21944 |
| Manager /<br />WebUI | Web UI Simulated Jobs for Testing The Job Creator page now includes options to queue 1-minute and 10-minute simulated jobs from the FTC/Cluster Web UI.<br />These fake jobs are useful for troubleshooting and quick testing.<br />Notes: The simulated jobs appear in the preset list as 1-Minute Simulated Job and 10-Minute Simulated Job. | 21682 |
| Manager / | Web UI Filters / Fields | 21679, |
| WebUI | 21675 Job ID Filter The FTC/Cluster WebUI search box can now filter jobs by exact job ID. Enter the full job ID to narrow the list to that job.<br />Machine RAM Display The Machines list now shows the reported RAM value for each machine. This makes it easier to review system memory information directly in the WebUI. | 21675 |
| Linux / | Updated Kubernetes Diagnostic Script for Manager and | 21672 |
| Kubernetes | Ingress Changes<br />Updated support for the current Kubernetes deployment layout.<br />The script now checks the capella-manager namespace for Manager components and uses traefik for ingress-related |  |

### New Features added for 5.6

| Module | Feature | Capella Reference # |
| --- | --- | --- |
|  | information instead of the previously used ingress-nginx.<br />Improvements also include AWS EKS reporting by attempting to resolve an ingress hostname to an IP address when the ingress exposes a hostname instead of a direct IP. |  |
| Windows | Windows Smart App Control-Compatible Signed Installers<br />Release builds are signed Windows installer builds using Microsoft Azure Artifact Signing, also known as Microsoft Trusted Signing.<br />Signed builds help prevent Windows 11 Smart App Control from blocking Capella installers and application binaries with warnings such as “Smart App Control blocked an app that may be unsafe.”<br />Signed builds include Capella executables, DLLs, redistributable files, and MSI installers required by the application package. This is especially important on new Windows 11 installations where Smart App Control may block unsigned installers or dependent binaries.<br />Note: Capella cannot retroactively sign previously released builds; older builds must be rebuilt and redistributed to include signing. We recommend updating to the latest release version first. | 21945 |
| Filter | Subtitle Inject Filter<br />Added a new DVB Subtitle Inject filter to allow DVB subtitle streams to be injected into the output from subtitle files. | 19954 |
| Target (H.264<br />-VPU) | NETINT VPU test module (Akamai Cloud)<br />If you’d like to test the new VPU module, please contact us at:<br />https://www.capellasystems.net/contact-us<br />In FTC the VPU is used for hardware acceleration of H.264 video encoding. Testing may require a new build of the software. | 20998 |
| Target (AV1) | Added support for Film Grain Denoise in MP4 AV1 encoding with two new settings that reduce film grain and allow adjustment of levels. | 21092 |
| (Linux /<br />Kuberenetes) | On-prem Kubernetes Support Canonical Kubernetes for on-premise is now supported for Cambria FTC. All machines that are part of an on-premise Kubernetes deployment must use Ubuntu as the Linux distribution. The tested Linux distribution is Ubuntu 24.04. For high availability, at least 3 machines are required and must | 20593 |

### New Features added for 5.5

| Module | Feature | Capella Reference # |
| --- | --- | --- |
|  | be designated as control plane nodes. For Cambria Cluster manager redundancy, it is recommended to have at least 3 dedicated worker machines separate from the control plane nodes.<br />There are some notable currently unsupported features: FTC Autoscaler, GPU and VPU support.<br />Document link:<br />https://www.dropbox.com/scl/fi/b4hofqgc8r3yp1plftmwo/Cambria_Cluster_and_FTC_5_6_0_on_On_Premise_Kubernetes.pdf?rlkey=raeaiu9tnpmwlh942kfa3kz14&st=prmaws1c&dl=0 |  |
| Windows | Use External PostgreSQL 14 installation method<br />Please email support@capellasystems.net if you would like instructions for this. | 21239 |
| Source<br />(Blackmagic<br />RAW) | Support Blackmagic RAW (braw) sources | 19232 |
| Target<br />(NVENC) | GPU support for AWS EKS machines | 19770 |
| Target<br />(ABRv2) | 8K support added to HEVC (NVENC) for ABRv2 | 18506 |
| Target<br />(Elementary<br />Stream) | Add XAVC-Intra encoding to Elementary Stream exporter | 20245 |
| REST API | Setting Tag based slots at boot<br />Added to API documentation in GET/SET CambriaManagerOptions | 18756 |
| (Linux / | Oracle Kubernetes (OKE) supported | 20351, |
| Kuberenetes) | 19817 | 19817 |
| (Linux /<br />Kuberenetes) | Oracle Object Storage support (through S3 interface) | 19971 |
| (Linux /<br />Kuberenetes) | Installation via Terraform added | 19947 |
| (Linux / | IAM role used for Auto-scaler permissions and Loki on | 20469 |
| Kuberenetes) | AWS |  |

### New Features added for 5.4

| Module | Feature | Capella Reference # |
| --- | --- | --- |
| Linux (Docker<br />Installation) | Base image for docker container updated to use Ubuntu 24.04 | 19613 |
| Source (R3D) | RD3 source decode support<br />Cambria FTC can now decode R3D files (Windows only)<br />Notes:<br />- Windows only<br />- Due to limitations with the R3D SDK, these files are not<br />supported via cloud storage platforms like S3 | 19327 |
| Target (DV5) | Encoding to Dolby Vision Profile v5 (DV5) is now supported in TS, MP4, ABRv2 (DASH, HLS/fmp4, CMAF) containers<br />Note: Sources are required to be HDR (HLG, PQ, HDR10 color spec) to encode to DV5. Jobs with Non-HDR sources will fail when encoding to DV5. | 18956 |
| Target (WAV) | WAV Exporter: CART Chunk Metadata support<br />API job submission only. CART Chunk metadata can be added to ‘wav’ XML job. Here are the attributes supported in the<br />MuxerSettings for this:<br />"WriteCart" "CartTitle" "CartArtist" "CartCutID" "CartClientID" "CartCategory" "CartClassification" "CartOutCue" "CartStartDate" "CartStartTime" "CartEndDate" "CartEndTime" "CartProducerAppID" "CartProducerAppVersion" "CartUserDef" "CartLevelReference" "CartURL" "CartTagText"<br />For dates, format is yyyy/mm/dd For times, format is hh:mm:ss | 19528 |
| Target (audio) | Audio Language Code passthrough<br />Audio Language Code (ISO 639-2) can now be passed through to the output by setting the audio language to 'src'.<br />Note: Only certain containers allow for this to work (TS, MP4, MOV).<br />Note: Known limitations / unsupported cases:<br />- audio passthrough<br />- audio remapping filter<br />- audio mapping<br />- using additional audio sources (eg separate .wav files) | 18445 |
| Target<br />(Subtitle – | Specifying Multiple DVB Subtitle PIDs | 19014 |
| DVB) | There is now a way to specify multiple DVB subtitles by their own PID instead of the PID being set in sequential order. This can only be set by editing a job XML directly for use with Cambria FTC API. In the &lt;MuxerSettings&gt;, set the attribute 'DVBSubtitlesPIDX' to the PID that the output track should be. See the following example,<br />&lt;Job&gt;&lt;Settings&gt;&lt;MuxerSettings DVBSubtitlesPID="650"<br />DVBSubtitlesPID2="660" DVBSubtitlesPID3="670"<br />&gt;&lt;/MuxerSettings&gt;<br />Note: If no DVBSubtitlesPID is specified for a track, that output track's PID will be: FIRST TRACK PID + TRACK NUMBER – 1 |  |
| Target<br />(Subtitle – | WEBVTT alignment setting added | 19014 |
| WEBVTT) | Overriding the default alignment of WEBVTT subtitles is now possible.<br />"align:center" "align:start" "position:30% align:start" - position moved 30%<br />Setting added to Subtitle Stream Settings. |  |
| Target (GPU<br />acceleration) | Machines with multiple NVENC GPU cards supported | 19362 |
| Target | OCR enhancements | 19654, |
| (Analysis | 19507 | 19507 |
| Exporter - | - Tooltip added to ‘Language’ field to indicate what language |  |
| OCR) | codes to use<br />- Mixed English and Japanese text support |  |
| Filter (Speech- | Speech-to-text enhancements/fixes | 19640, |
| to-text) | 19629, | 19629, |

![](images/release-note-image-000.png)

![](images/release-note-image-001.png)


### New Features added for 5.3

| Module | Feature | Capella Reference # |
| --- | --- | --- |
|  | - .vtt and .srt output fixed to work with VLC playback<br />- Filter removed from target side filters<br />- AVX2 is required to use this feature, improved error added<br />- String replacement supported for output filename<br />- input field "Language" was added to allow the user to specify<br />the expected language to detect in the audio | 19628, 19627, 19433 |
| Filter (Blur<br />Face) | Blur strength increased | 19309 |
| S3 / Post Task<br />Upload | New XML attribute added: ContentTypeOverride API job submission only. The new attribute "ContentTypeOverride" allows you to set the content-type for S3 uploads. | 19269 |
| WebGUI | WebUI Preset Editor enhanced<br />Target Preset Editor for the WebUI updated to be more in-line with the Preset Editor for the Application UI.<br />Note: Functions such as video/audio filters, scriptable workflow, post task commands cannot be configured through the WebUI Preset Editor. If these functions are needed, we recommend using the Windows application UI to create JobXML templates for API submission. | 19029 |
| Source (Dolby | Dolby Vision Module Updated | 18478, |
| Vision) | 18457 The updated version supports using Dolby Vision MOV as sources. | 18457 |
| Source | Read sources directly from Azure Blob storage (JobXML, | 18991 |
| (Azure) | API only)<br />To use this feature, the following is needed:<br />1. Url to the source (Eg.<br />https://myuserstorageaccount.blob.core.windows.net/my_contain er/my_source.mp4)<br />2. SAS credentials for the source<br />Example of Azure Blob storage url in JobXML (Note: replace the<br />'https://' in your url with '[azure]'):<br />&lt;Source<br />Location="[azure]myuserstorageaccount.blob.core.windows.net/<br />my_container/my_source.mp4" Name="Src1"/&gt;<br />The SAS token will go in the &lt;JobDescr /&gt; tag like this:<br />&lt;JobDescr Description="FTC UI (Preset: DASH)"<br />azure_blob_sas="&lt;my-azure-blob-sas&gt;"&gt;<br />Notes:<br />- The SAS token must have at least Read and List permissions<br />How to get URL and SAS Credentials:<br />To get the url, click on the source in Azure Blob storage and copy the URL property in the "Overview" section.<br />To get SAS credentials, click on the source in Azure Blob storage and go to the "Generate SAS" section. |  |
| Target (Post<br />Task Upload, | Upload to Azure Blob Storage | 19040 |
| Azure) | In FTC Post Task, there is now an Azure Blob storage upload<br />option that allows you to specify the following:<br />Storage Account Name: The Azure Blob Storage account name (under the 'Storage accounts' section of Azure) Container: The name of the container to output to (under 'containers' in the storage account page) SAS Token: access token to the container (can be generated through the container's option 'Generate SAS') Block Size: the upload chunk size (in kilobytes). Azure limits this to 50 GB per file<br />Notes:<br />- SAS token must have write permissions to the container<br />- The Storage account needs to have "Allow storage account key<br />access" enabled. This setting can be found in the Storage account's Settings &gt; Configuration section<br />- Currently, writing directly to Azure Blob storage is not<br />supported |  |
| Target (GPU) | Supported added for using multiple NVENC cards on a single machine | 19030 |
| Target (GPU) | 8K support enabled for NVENC jobs | 18506 |
| Target | Split and Stitch 14850 A job/source can be split into multiple video segments and one<br />audio file. The job segments are distributed to multiple machines to encode. Once the segments are complete, they are stitched together to create the final output, as if it was transcoded in one machine.<br />The temporary files are written to a user-configurable location called the WorkFolder.<br />In Cambria FTC UI (not the Cambria Manager UI) you can specify this location in Settings &gt; Options &gt; Split And Stitch Options.<br />For Windows, you can run regular jobs as "split and stitch" jobs by selecting the "Queue All Jobs" dropdown and selecting either "Queue All / Split And Stitch" or "Queue Selected / Split And Stitch".<br />In JobXMLs, to specify that a job should be in "split and stitch"<br />mode, set the Type attribute in the &lt;Job&gt;&lt;/Job&gt; tag to<br />"SplitAndStitch". Also, set the attribute SegmentDurationSec to the amount of seconds to split each segment and WorkFolder to a shared location where the segments will be written to.<br />Sample Job Tag:<br />&lt;Job SegmentDurationSec="30" Type="SplitAndStitch"<br />WorkFolder="C:\Temp"&gt;&lt;/Job&gt;<br />For Cloud/S3:<br />&lt;Job SegmentDurationSec="30" Type="SplitAndStitch"<br />WorkFolder="[s3]mybucket@us-east-<br />1:SplitAndStitchTest/Segments"&gt;&lt;/Job&gt;<br />Known Limitations (does not work with Split and Stitch):<br />- Frame Rate Conversion<br />- Adaptive Streaming Output<br />- Audio mapping jobs<br />- Jobs with more than one segment configured<br />- Stitched sources<br />- Multi-Target jobs<br />- Not All Video Filters work<br />- Watch Folder<br />- Job Tags (Cambria Cluster)<br />- Audio Only Jobs | 19321, 14850 |
| Target | Analysis Exporter Enhancements | 18768, |
| (Analysis) | 19007,<br />- Detect Video Cadence<br />- Find Faces<br />- Improved OCR (Text Recognition)<br />Note: The new OCR feature requires additional files to be installed into C:/Program Files (x86)/Capella/Cambria/cpx64<br />Please contact support@capellasystems.net to request for the additional files. | 19007, 18959 |
| Filter (Blur<br />Faces) | Blur Faces Filter There is a new video filter "Blur Faces" which places a rectangle around faces and basically blurs them. Users can adjust how much the faces are blurred (strength) and the confidence level<br />threshold that determines whether something in the video is a face or not.<br />Notes:<br />- The lower the threshold, the more likely faces will be blurred.<br />However, currently there is a higher chance other objects will also get blurred with lower thresholds.<br />- Works well with faces further out in the frame. Faces may still<br />recognizable when close to the camera. | 19007 |
| Filter (Speech<br />to Text) | Speech to Text Filter New filter added that allows for text to speech in the following formats: .xml, .vtt, and .srt. | 18932 |
| Filter | Nexguard SDK version update to 1.18.0. With that, Linux now | 19134 |
| (Nexguard) | supports Nexguard video filter.<br />Locations to add the Nexguard license:<br />Windows (FTC): C:\Program Files (x86)\Capella\Cambria\cpx64\NexGuardV2 Windows (Cluster): C:\Program Files (x86)\Capella\CambriaCluster\cpx64\NexGuardV2 Linux (FTC): /opt/capella/Cambria/bin Linux (Cluster): /opt/capella/CambriaCluster/bin |  |
| WebGUI | WebUI Preset Editor (Beta)<br />The preset editor was added to the Cambria FTC/Cluster WebUI.<br />This only includes encoding configuration and not all encoding target/settings are included. Functionality such as filters, post task delivery, notifications cannot be configured through the preset editor at this time. | 18711 |
| Licensing | Enhancement for Cryptlex error handling<br />Reactivation retry implemented for unexpected fail case. | 18499 |
| Licensing | Fully Redundant Licensing for Hosted (and Hosted Floating Server) Licenses 18514 This feature is only supported for Hosted Licenses and Hosted<br />Floating Server Clients. Requirement is to whitelist this IP:<br />54.241.85.49<br />If the machine loses connection to cryptlex (i.e. cryptlex server goes down, etc) then backup licensing will keep the machines license active. Other scenarios of sudden invalidation or grace period is over are also covered by the backup licensing server.<br />Hosted Floating Server Clients Please note that this feature is ONLY for the clients and not the Floating License Server itself.<br />In the case when the floating server license unexpectedly invalidates, then currently connected and leased client machines will continue to be operational because of the backup licensing support.<br />Notes:<br />- This feature works for Hosted Floating Server Clients but not the<br />Floating License Server itself. | 19313, 19292, 18514 |

### New Features added for 5.2

| Module | Feature | Capella Reference # |
| --- | --- | --- |
|  | - Testing to make sure 54.241.85.49 I reachable.<br />ping cpfs.capellasystems.net or wget https://cpfs.capellasystems.net:8481/ ===&gt; should get xml (it will states an error but enough to check connectivity) |  |
| Security | Support for TLS 1.2 added, TLS 1.1 and 1.0 is disabled<br />TLS 1.2 is the minimum version needed to negotiate SSL. | 18828 |
| Filters | Added Video Denoiser Filter<br />Filter added to remove grain/noise from video. | 18321 |
| Filters | DFXP Support added for Burn-in Filter | 18241 |
| Scriptable | Security Enhancements affecting executables used in Jobs | 18370, |
| Workflow/Exec<br />utables | and Perl scriptable workflow scripts Starting in 5.2 release, any executables (post-taks, notifications) or Perl scripts (scriptable workflow) used as part of a Job must be trusted by the machine executing the Job.<br />Have your IT department review this document to determine if you want to use this feature, and if so to assist with usage of this feature<br />The reason why executables and scripts need to be trusted is to ensure that only authorized programs are executed on a machine.<br />When a script or an executable is registered as trusted, it means that the user or the system administrator has explicitly allowed it to run on the machine. Without this trust, any script or executable could potentially run on a machine, including those that are malicious or harmful.<br />By registering trusted executables and scripts, organizations can ensure that only authorized programs are executed on their machines, thereby reducing the risk of malware infections, data theft, and other security breaches. Additionally, the trusted list can help prevent unauthorized modifications to scripts or executables, as any change to the program will change its SHA256 hash, requiring the trusted list to be updated.<br />Overall, the registration of trusted executables and scripts is an important security measure that helps to mitigate the risk of security incidents caused by malicious programs, and<br />organizations should take this process seriously to ensure the safety of their systems and data.<br />Here are some instructions for using the features described:<br />Registering Trusted Executables:<br />To register a trusted executable on a machine, follow these steps:<br />a. Generate the SHA256 hash for the executable file you want to<br />register.<br />b. Open the registry editor by typing "regedit" in the search bar<br />or the Run dialog box (press Win+R).<br />c. Navigate to the following registry key:<br />HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\CAPELLA\CA MBRIA.<br />d. Create a new string value called "TrustedAppSHA256".<br />e. Set the value of the "TrustedAppSHA256" to be the SHA256 of<br />the executable, separated by commas if there are multiple executables.<br />f. Repeat these steps for each machine where you want to<br />register the trusted executable.<br />Alternatively, you can create a .reg file with the SHA256 of the trusted executable and run it as administrator on each machine where you want to register the executable.<br />Registering Trusted Perl Scripts:<br />To register a trusted Perl script, follow the same steps as above, but use the "TrustedScriptSHA256" registry key instead of "TrustedAppSHA256". Note that any changes made to a Perl script will change its SHA256, so the trusted list will need to be updated accordingly.<br />Using Python Scripts:<br />Python scripts are executed in a sandbox, so they don't need to be registered as trusted. However, they will not have access to the network, which can be necessary for some workflows.<br />Security Considerations:<br />It's important to note that any trusted executable will be allowed to be called with different arguments, so users need to make sure that trusted executables can't cause any damage with other arguments. For example, if a trusted executable takes a file name as an argument, it should check that the file is of the expected type and doesn't contain any malicious code. Similarly, if a Perl script takes user input, it should validate the input to prevent injection attacks. If network access is not needed, it's recommended to use Python scripts instead of Perl scripts to reduce the risk of security issues.<br />Please contact your IT department to assist with properly identifying which executables and scripts may be risky. | 17658 |
| Kubernetes | AWS Kubernetes Support<br />Link to installation guide:<br />https://www.dropbox.com/scl/fi/xt7vj917tg9bejo0r6x8d/Cambria | 18280 |

### New Features added for 5.1

| Module | Feature | Capella Reference # |
| --- | --- | --- |
|  | _Cluster_and_FTC_RC1_5_2_0_on_AWS_Kubernetes.pdf?rlkey=z r11ja7gk7fkh37ucw7nw4dsl |  |
| Kubernetes | Argo Events to FTC Job 18136, Argo Events can be used to trigger FTC encoding jobs. | 17939, 18136, 18270 |
| Kubernetes | Akamai NetStorage Watcher 18220 NetStorage Watcher can be used with Argo Events (webhook) to trigger FTC jobs. This adds “Watch Folder” like functionality. | 18275, 18220 |
| Linux | Upgrade to PostgreSQL 15 | 18280 |
| Source | HEIC source support added | 17273 |
| Source | 12 bit DPX source support added | 17165 |
| Source | Preset Creation function expanded to support MXF, DNxHD, | 17417 |
| Analysis | ProRES, IMX, XDCAM HD |  |
| Target | MPEG-2 Transport Stream supports writing | 17524 |
| (Transport<br />Stream) | AU_information into output file/frames This setting can be turned on for the preset through the Container Format Settings for the Target Preset. Required to support DVB-AU spec. May be needed for some parsers/players. |  |
| Target (MXF) | Closed Captions settings added to MXF exporter<br />Both the Video Settings and Container Settings area for a MXF Target Preset now contain a Closed Captions setting which will allow CEA-708 to be used. | 17432 |
| Target (HLS) | TTML support for MSS added<br />TTML Support for MSS was added, both for Sidecar and Embedded cases. Currently, we only support embedding / sidecar with an external Subtitle file. | 17219 |
| Target (AVID | XAVC 300 and 480 support was added to the AVID | 15407 |
| AAF) | exporter |  |
| Target<br />(Segmenter) | Segmenter Exporter This exporter allows the user to partition their video into multiple files based on a user configured Segment Duration. | 17287 |
| Filter (Subtitle<br />Inject) | SCC caption file format supported by Subtitle Inject filter | 17589 |
| Watch Folder | Smart Watch Folder Enhancements 16546, In the Watch Folder Source Acceptance section, ‘Source is a group of files’ feature has been updated with 3 new workflow functions.<br />17195,<br />- Use Workflow Job<br />- Dynamic Grouping (Parse XML to find associated files)<br />- Passthrough those files to create an ABR output<br />Use Workflow Job Enables the ‘Scripts Settings’ function on the Encoding Tab that will allow for Jobs to be created via a Workflow Script. This will enable a Job to include functions for decision making and various tasks (encoding and administrative) to be part of the Workflow Job.<br />Dynamic Grouping (Parse XML to find associated files) Allows for the Dynamic Grouping Script to be used instead of Filename Matching Criteria for groups of files.<br />Passthrough those files to create an ABR output Sets the Filename Matching Criteria to look for multiple video files that will be used as sources for an Adaptive Streaming (Packaging Only) Job. | 16443, 16546, 16545, 16544, 17440, 17195, 17016 |
| Cambria<br />Manager | Status and Summary section added to Watch Folder tab | 17444 |
| (Watch | These sections allow for users to get more information about the |  |
| Folder) | current status of a watch folder, what process is currently running, etc. |  |
| Cluster<br />Manager | User configuration for ‘Number of Urgent Jobs’ in Cluster Manager | 17045 |
| Web UI | Add/Remove Machines from Cluster function added | 17597 |
| Linux | Cluster / FTC Linux Document<br />Linux startup guide has been updated with a new Vulnerabilities Information section.<br />Link to Cluster/FTC 5.1 Linux startup guides:<br />https://www.dropbox.com/s/236y5m30jde54s0/Linux_FTC_Guide_5.1.0.pdf?dl=0<br />https://www.dropbox.com/s/crprvyzl2etlabo/Linux_Cluster_Guide_5.1.0.pdf?dl=0<br />Latest Version (9/08/2023):<br />https://www.dropbox.com/scl/fi/mf9h58uip3nalt42591j5/Linux_Cluster_Guide_RC1_5.2.0.pdf?rlkey=1a46fg2hok6n1smw5pa2n842e<br />https://www.dropbox.com/scl/fi/0msy7rj48ktmmmcou5h23/Linux_FTC_Guide_RC1_5.2.0.pdf?rlkey=5lbxzpvcfcrsseg6j9jq69j7u | 17738 |

### New Features added for 5.0

| Module | Feature | Capella Reference # |
| --- | --- | --- |
| Kubernetes | Akamai Kubernetes Support | 17607, |
| Support | 17612, Cambria Cluster / FTC can be run in an Akamai Kubernetes environment. Currently functionality is limited to API only for Job submissions. API or WebUI can be used to monitor Jobs.<br />Not all features in the Windows version of FTC are available in Linux. Please reference the latest Linux startup guide for a list of known Linux limitations.<br />Link to Cambria Cluster / FTC 5.1 installation and help guide for<br />Akamai Kubernetes:<br />https://www.dropbox.com/s/0uxi0o0tnq9zs66/Cambria_Cluster_and_FTC_on_Linode_Kubernetes_5.1.0.pdf?dl=0<br />Latest Version (9/08/2023):<br />https://www.dropbox.com/scl/fi/x1vdb97zac7e2tmyeq2om/Cambria_Cluster_and_FTC_RC1_5_2_0_on_Akamai_Kubernetes.pdf?rlkey=db1sn20pm577zei8lxfslvqow | 17612, 17615, 17617, 17618, 17620, 17621, 17783 |
| Exporter<br />(Audio) | Fraunhofer FDK encoder Added as optional configuration in the audio encoder settings. | 16730 |
| Exporter | Adaptive Streaming v2 exporter supports teletext to | 16788 |
| (Adaptive<br />Streaming v2) | WebVTT conversion FTC now supports teletext input for ABRv2 subtitle streams.<br />Steps:<br />- Users will need to first add a subtitle track to the ABRv2.<br />- Inside the subtitle track, add individual subtitle streams.<br />- Inside the subtitle stream, specify input type as Teletext.<br />- Specify Teletext Page number for the input.<br />Note: Users can find the Teletext Page number by analyzing the source either in FTC source analysis feature or using third party apps such as MediaInfo. |  |
| Filter | Color Conversion filter performance improvement<br />Color Conversion processing improved multi-threading taking advantage of systems with more threads (particularly 46 threads or more). | 16848 |
| Filter | Nexguard A/B Watermarking (requires Nexguard license)<br />Nexguard A/B Watermarking support added to FTCs NexGuard filter. Also, a checkbox option can be found in Adaptive<br />Streaming v2 exporter that can also apply the A/B Watermarking. | 16350 |
| Filter | (Beta) Teletext Extractor filter<br />Enables workflows for converting VBI Teletext from the source to OP47 in the target. | 15921 |
| Source | (Beta) S3 Requester Pays buckets supported<br />Supported in JobXML through API submission.<br />Please contact support@capellasystems.net for info | 16488 |
| Cluster | Cluster/FTC network multicast dependency has been removed<br />Cluster can use network multicast to automatically detect FTC clients. If multicast is disabled after the initial detection, Cluster/FTC will still continue to work. | 16589 |
| Cluster / | CloudExtend Improvements | 15884, |
| CloudExtend | 15895<br />- AWS EC2 Credentials and AQS Instance Control settings can be<br />exported to save file and reimported.<br />- AWS Operations such as (stopping and terminating) are now<br />disabled for non-AWS machines. | 15895 |
| FLS | API functionality added to register and deregister Licenses 15867 Please contact support@capellasystems.net for updated API documentation. | 16589, 15867 |
| Module / | PostgreSQL version updated to 14.3 | 16347, |
| components | 16972 Postgres is used by FTC and Cluster has been updated to 14.3 from 9.3.2.<br />Notes:<br />- Installing Postgres 14.3 does not replace/remove old 9.3.2.<br />Users can remove old version once they migrated. However, make sure that old database information is migrated properly.<br />- New Postgres 14.3 is not a seamless upgrade and require user<br />actions. User is expected to run "PostgreSQLUpdater" to clone old database to new database (migration).<br />Migration doc link:<br />https://www.dropbox.com/s/otias8vdolo6215/Postgres%2014.3%20Migration%20Document.pdf?dl=0<br />- User may not setup Redundancy across different Postgres<br />versions. | 16972 |
| Linux | FTC (Linux) Improvements<br />- Job Tag column added to WebUI | 16977 |

### New Features added for 4.8

| Module | Feature | Capella Reference # |
| --- | --- | --- |
|  | - Cluster (running on Windows) can distribute jobs to FTC (Linux)<br />Link to FTC 5.0 Linux startup guide:<br />https://www.dropbox.com/s/vzyg64o1ec7axld/Linux_FTC_Guide_1.1.0.pdf?dl=0 |  |
| Linux OS | Linux Support<br />FTC can now be installed onto Linux.<br />Currently functionality is limited to API only for Job submissions.<br />API or WebUI can be used to monitor Jobs.<br />Not all features in the Windows version of FTC are available in Linux. Please reference the startup guide of a list of known limitations.<br />Link to FTC 4.8 Linux startup guide:<br />https://www.dropbox.com/s/my7m1f4dosvq9ir/Linux_FTC_Guide_1.0.pdf?dl=0<br />Link to FTC 5.0 Linux startup guide:<br />https://www.dropbox.com/s/vzyg64o1ec7axld/Linux_FTC_Guide_1.1.0.pdf?dl=0 | 14892 |
| Target<br />(NVENC Video | GPU (NVENC) Acceleration for HEVC Jobs | 16321 |
| Encoder) | New video encoder option added: HEVC (NVENC) Enables FTC to use specific NVIDIA cards to do accelerated HEVC encoding. This encoder option is included as part of the HEVC (purchase option).<br />Video Settings:<br />Profile: main Levels: 2.0, 2.1, 3.0, 3.1, 4.0, 4.1, 5.0, 5.2, 6.0, 6.1, 6.2 Tier: main, high Frame Size: 224x126, 320x180, 640x360, 864x486, 1280x720, 1920x1080, 3840x2160 Frame Rate (fps): 23.98, 24, 25, 29.97, 30, 50, 59.94, 60 Interlacing: Progressive, Upper Field First, Lower Field First Display Aspect Ratio: Same as Source, 4:3, 16:9 Rate Control Mode: CBR, VBR Bitrate: User specified: max is 240,000 kbps Tuning: High Quality, Low Latency, Ultra Low Latency Preset: 1-7: 1 is Low Quality/Fast: 7 is High Quality/Slow GOP Structure: I only, IPP, IBP, IBBP (B frames supported in *Qualified* GPUs only) Maximum CPB Size: 1, 2 IDR Period (GOP Count): User specified: default is 120<br />Performance: |  |
| Quality, Speed, an | d Number of Concurrent encodes are limited by<br />the type of Nvidia<br />GPU used. List of features that are influenced<br />by GPU type: |  |
| 1: Number of GPUs | supported on a single machine |  |
| 2: Number of concu | rrent NVENC encodings |  |
| 3: HEVC B Frame su | pport (B frame in GOP structure) |  |
| 4: Processing spee | d of a NVENC encode |  |
| 7th NVENC Generati | on (or newer) *Qualified* GPUs are<br />recommended for be<br />tter performance and least limitations. For a<br />list of GPUs, plea<br />se visit https://developer.nvidia.com/video-encode-and-decode-<br />gpu-support-matrix-new |  |
| The only officiall<br />*Qualified* GPU | y supported card (Capella tested):<br />Benchmark: |  |
| PNY NVIDIA Quadro | RTX 4000 |  |
| (Machine Spec: 12t<br />4K → 4K | h Gen i7-12700K, Windows 11) |  |
| Resolution/FPS sam | e-as-source (3840x2160@29.97fps) |  |
| Tuning = High Qual<br />GOP = IBP | ity |  |
| Preset (quality/sp | eed) = 3 (default value) |  |
| Bitrate=10,000kbps<br />1 job at 2.89x RT | CBR<br />Result: |  |
| 4 jobs at 1.13x R<br />HD -&gt; HD | T |  |
| Resolution/FPS sam | e as source (1920x1080@29.97fps) |  |
| Tuning = High Qual<br />GOP = IBP | ity |  |
| Preset (quality/sp | eed) = 3 (default value) |  |
| Bitrate= 5,000kbps<br />1 job at 8.84x RT | CBR<br />Result: |  |
| 16 jobs at 1.02x | RT |  |
| Benchmark Note: Di | fferent machine/storage environments may<br />affect the results<br />. Changes in encoding settings will also affect<br />results (Ex: 4K@60<br />fps runs 2 jobs at 1.02x RT)<br />Additional Notes: |  |
| - For qualified ca | rds, there's unlimited number of jobs you can concurrently run. |  |
| - For unqualified | cards, the limit is 3 (concurrent jobs) |  |
| - Unqualified card | s we've tested with is Nvidia Quadro P400 and |  |
| NVIDIA GeForce GTX | 960. These cards cannot do B frames |  |
| - GPU is only used | for encoding. CPU is used for everything else,<br />such as decoding,<br />scaling, frame rate conversion, color format<br />conversion, and an<br />y other video filters |  |
| - Multiple cards i | s not supported |  |
| - Higher end card | does not directly imply better performance. For<br />details, please co<br />nsult Capella Support. |  |
| Source (DPX) | DPX files can now be loaded without needing the XML file descriptor. You can load any of the dpx files in the list and the same behavior as the xml file should apply. | 15994 |
| Source (Y4M) | Support added for Y4M sources | 16132 |
| Target<br />(Adaptive | CMAF output added to Adaptive Streaming v2 exporter<br />Streaming v2)<br />The Adaptive Streaming v2 container now has an option for CMAF output. Similar to some of the other Adaptive Streaming v2 options, CMAF has support for DRM with Fairplay as the HLS option and Widevine/PlayReady as the DASH option. You will see this as "Fairplay/Widevine" or "Fairplay/Playready". | 16006 |
| Target AV1 | AV1 video codec option has been added to MP4 exporter 15430 | 16343, 15430 |
| FTP Upload | Create subdirectories for FTP Upload with String Replacement Variables<br />String replacement variables can now be used in the 'Server' field of the Post Task FTP uploaded settings to create subdirectories.<br />These string replacements can be used in Post Task FTP config:<br />%presetName% %sourcePath% %sourceName% %sourcePath0%, %sourcePath1%, etc %projectName%<br />If the preset is used in a WatchFolder, these variables will not<br />work:<br />%presetName% %projectName% | 16355 |
| Retrieval / | NetStorage support enhancements | 16342, |
| Post Task | 16341 | 16341 |
| Upload | 1. Watch Folders can now process a source file directly from<br />NetStorage without downloading the entire file to the Watch Folder first.<br />In the NetStorage retrieval option for Watch Folders, there is a new "Process without downloading as a file" checkbox. Selecting this setting allows for a local Watch Folder to also "watch" a NetStorage location and use sources directly without having to transfer it first.<br />2. For API users. Added support for specifying the NetStorage<br />credentials in FTC JobXMLs.<br />The attribute "netstorage_secret_key" in the<br />&lt;JobDescr&gt;&lt;/JobDescr&gt; tag which allows the user to specify<br />their NetStorage HTTP API Key for reading files from and uploading files to NetStorage, and the format for reading file from storage: [netstorage]&lt;netstorage username&gt;@&lt;netstorage domain&gt;:&lt;path to the source in netstorage&gt;<br />Ex:<br />&lt;JobDescr netstorage_secret_key="adfsd"&gt;<br />...<br />&lt;Source<br />Location="[netstorage]netstorage_username@netstorage_domai<br />n:pathtomyfile/subfolder/myFile.mp4" Name="Src1" /&gt;<br />...<br />&lt;/JobDescr&gt; |  |
| Audio Track | Track Name Label added to the Audio Track Mapping dialog box | 16155 |
| Mapping | to allow for user description for the various tracks. JobXMLs created from these jobs will also contain the description. |  |
| Filter (VITC) | Filters added to support VITC generation and extraction<br />There are two new filters added:<br />- VITC Generator<br />- VITC Extractor<br />The generator filter adds VITC specific timecode information into the output. The VITC Extractor takes VITC timecode information stored in the source and uses it in some way (currently only to be reused with the burn-in filter).<br />Notes:<br />1. In order to use VITC generator, the source needs to have a<br />frame width of 720 (if source filter) or target (if target filter)<br />2. In the FTC UI, both of the VITC filters don't have any<br />configurable options for the filters themselves<br />3. For VITC Generator, the source needs to either already have<br />timecode embedded or a timecode overwrite filter needs to be used alongside it. If using timecode filter, the timecode filter needs to activate first. This means the order of these filters matters.<br />4. For VITC Extractor, the filter needs to be used as a source filter<br />(whether it is used directly as a source filter or on the preset side).<br />5. The only ways to get VITC Extractor works as a target side<br />filter is when same as source is used for encoding settings such as frame size, frame rate, and interlacing or VITC generator + VITC extractor are used in the same job in that order (Eg. Job with Timecode overwrite + VITC generator + VITC extractor + Timecode burn-in) | 15958 |
| Filter<br />(NexGuard) | NexGuard v2 filter enhancement In our NexGuard v2 filter, we have now included a way to do ClipMark watermarking, along with G2 (which was already there before). In order to do ClipMark watermarking, you need an appropriate license from NexGuard.<br />Licensing note: NexGuard Watermarking V2 For FTC 4.8 has changed licenses due to NexGuard (NAGRA) requirements.<br />Hence, your existing Nexguard watermarking licenses will not work. Please obtain new licenses from NexGuard. | 15989 |
| Windows OS | Windows 11 and Windows Server 2022 Supported | 16483 |

![](images/release-note-image-002.png)


### New Features added for 4.7

| Module | Feature | Capella Reference # |
| --- | --- | --- |
| Watch Folder | Support encoding directly from S3<br />When setting up a Watch Folder for Retrieval from S3, you can check the ‘Retrieve as S3 shortcut’ option. When you configure this setting, instead of moving the entire source file down from S3, FTC will create just the shortcut in the Watch Folder. The Job that is generated will encode the source directly from S3. | 15841 |
| Watch Folder | Support retrieval from S3<br />Retrieval from S3 has been added as an option that can be configured from the ‘Retrievals’ tab for Watch Folders. | 15739 |
| Source | Support for AV1 codec files | 15387 |
| Source | Support for S3 pre-signed URL source | 15785, |
| (S3) | 16072 "Pre-signed URLs" HTTP-based urls that a user can generate via the AWS command-line tool for files on an S3 bucket. These URLs can now be added to a FTC job as a replacement to the source path.<br />Steps:<br />1. Get a pre-signed url from the aws command-line or other tool.<br />See https://docs.aws.amazon.com/AmazonS3/latest/userguide/ShareObjectPreSignedURL.html<br />2. Edit an existing FTC job or project and add the pre-signed url<br />to the location you'd like to use the resource (such as Source, Logo Filter source, etc).<br />3. If a JobXML, queue the job and check that the job runs<br />successfully. If an FTC project, see if the source loads into FTC and that it acts similar to what the source would be like in local storage.<br />Limitation: For Pre-Signed URLs, images cannot be used as file sources into FTC because FTC image sources in FTC are decoded as a sequence (Limitation).<br />Therefore, FTC expects a sequence from the pre-signed URL source and it cannot find / import. | 16072 |
| Target | Output ATS files 15812 This feature is implemented only for H.264 inside TS.<br />Transport Stream container now has a new checkbox for "Write EBP Markers" in the Container Format Settings section.<br />When the checkbox enabled, users are able to set EBP GOPS per segment and fragment.<br />ATS metadata, called Encoder Boundary Points (EBP), are injected and carried in the transport stream layer to provide adaptive boundary information to downstream processing tasks. | 15748, 15812 |
| Target | Output HEV1 files<br />For x265 HEVC and NTT's HEVC (only for MP4) we can specify HEVC Codec Tag for the output file (either HEV1 or HVC1) | 15835 |
| Filters<br />(Normalizer) | Normalize at True Peak audio sample ‘Normalize to True Peak audio sample’ option added to the normalizer audio filter. | 13902 |
| Filters<br />(EZTitles) | EZTitles is supported for Passthrough jobs | 13134 |
| Retrieval / | Akamai NetStorage Retrieval and Post Task Upload | 15923, |
| Post Task<br />Upload | (purchase option)<br />Limitation:<br />- Japanese character handling is not currently supported for<br />NetStorage upload or retrieval.<br />- Progress bar does not complete in a linear way, so may not be<br />an accurate representation of upload progress. | 15864 |
| Scriptable | Allow user-installed Perl packages and executable (Beta) | 15791 |
| Workflow | for use with Scriptable Workflow.<br />Please contact support@capellasystems.net for instructions. |  |
| Cluster /<br />CloudExtend | Launch function for AWS EC2 instances | 15465 |
| (AWS) | The CloudExtend tab in Cambria Cluster Manager has this function that allows users to launch AWS EC2 instances.<br />Instances launched by this function will automatically be connected to the Cluster Manager.<br />Please contact support@capellasystems.net for instructions. |  |
| Cluster /<br />CloudExtend | Automatically Shutdown AWS instances | 15468 |
| (AWS) | CloudExtend setting allows EC2 instances that are launched by Cluster to auto stop or terminated when idle |  |
| Cluster /<br />CloudExtend | Tool to dynamically manage number of AWS instances | 15469 |
| (AWS) | CloudExtend setting called ‘Dynamic Instance Controller’ allows users to run a tool that can manage automatic launching of AWS<br />instances based on:<br />- The number of slots specified per machine<br />- The number of queued jobs in the Cluster queue list<br />- The maximum number of machines specified<br />Notes:<br />- Users can also change the AwsDynInstCtrl tool to any other tool<br />that works with AWS instances.<br />- For best results, 30 minutes should be the minimum time used<br />for the Controller interval. |  |
| Cluster / | Configure On Premise storage to become accessible to | 15467, |
| CloudExtend<br />(Storage) | AWS EC2 When this is configured, a MinIO server will run on the Cluster machine to allow On Premise storage to become accessible to EC2 instances.<br />Limitation: Scriptable workflow does not work for CloudExtend where the jobs run on a machine that does not have direct access to the sources, even if the sources are located in a location mapped via the "CloudExtend Storage" feature. | 15512 |
| Cluster / | Pay As You Go (PAYG) feature has been removed | 15470, |
| CloudExtend | (10/2025)<br />Show Pay As You Go (PAYG) Balance<br />The PAYG balance is shown in the "Pay As You Go licensing" section on the CloudExtend tab.<br />The balance shown is the lowest balance of any machine in the Cluster machine list that has PAYG enabled. | 13391 |
| Manager<br />Options | Automatic Job Cleanup This setting can be found in the Manager, under the ‘File’ dropdown. You can configure Manager to periodically clean up jobs. You can specify what job statuses to clean up and how old jobs need to be to be removed. | 13261 |
| FTC Packager | Packaging Jobs can be configured and launched from Watch Folder (Beta)<br />- There is a new check box to specify "if the incoming group files<br />are a part of ABR sources" under Source Acceptance tab. It will be only shown when "Group Files" check box is ON.<br />- When this check box is ON, group files will be changed to<br />"%match%_1.*" ~ "%match%_4.*", and Encoding tab will be changed to only accept Packaging action.<br />- Packaging action setting allows users to associate files in the<br />group with layers of output ABR streams. (when the watch folder has files with something like ABCD_1.ts ABCD_2.ts ABCD_3.ts and ABCD_4.ts)<br />- Once a group of files are dropped to the Watch Folder,<br />Packaging action will be kicked in and ABR stream will be generated (using passthrough) based on the configuration.<br />Notes:<br />Since it is passthrough packaging, please make sure each source is using different bitrates to avoid conflict between layers. Each | 15738 |

### New Features added for 4.6

| Module | Feature | Capella Reference # |
| --- | --- | --- |
|  | file needs to be GOP synced/aligned. Current packager does not enforce this limitation (it does not show up as an error). |  |
| Licensing | Pay As You Go (PAYG) support added to Hosted License method | 15777 |
| Target (Closed | Closed Caption exporter added | 15245, |
| Caption) | 15229 The new exporter in FTC called "Closed Captions" allows you to extract closed captions from a source (such as 608, 708, and Teletext) and output those captions to a specific caption file.<br />Currently the exporter only outputs to WebVTT format (.vtt).<br />Limitations:<br />- The exporter has an option for "Teletext Page Number" which<br />needs to be used to extract Teletext caption information.<br />This option is ignored for all other source caption types.<br />- DVB subtitles are not currently supported<br />- Japanese characters are not supported for WebVTT filename<br />output, this will be fixed for 4.8. | 15229 |
| Target (MKV) | VP9 codec added to MKV exporter | 15305 |
| Target | SMIL file creation option for Adaptive Streaming v2 | 15461 |
| (Adaptive<br />Streaming v2) | exporter The ‘Type’ setting in the ‘Container Format Settings’ section of a Adaptive Streaming v2 target preset can be set to SMIL (MP4).<br />Similar to the other ABRv2 targets, you can customize the bitrate configurations for both video and audio, and customize the naming conventions of the manifest, media, and subtitle folder/files. You can also add special metadata to the manifest which is used on the player side. |  |
| Target | AV1 codec added to Elementary Stream exporter 11717 Limitation: Currently AV1 is restricted to use only through the Elementary Stream exporter. We plan to add it as an option to the MP4 exporter in the future. | 15038, 11717 |
| Target (AAC<br />Audio) | Dual Mono encoding support FTC now supports Dual Mono in AAC. Users have an option to encode each channel independently from each other in AAC.<br />To enable this there is a new checkbox under Audio settings:<br />"Use Independent Channels". | 15231 |
| Filter (Color | Custom LUT Tables can be used with Color Conversion | 15267 |
| Conversion) | Filter<br />In the Color Space Conversion filter, the user can now specify custom look up tables that the user provides via config files (in this case .cube files).<br />In order to do this, select the ‘via 3D-LUT’ option in the filter’s ‘Conversion Mode’ dropdown. There will be a file input field ‘LUT file’ to specify the custom LUT. |  |
| Filter (Color<br />Channels | Color Channels Remapper Filter added | 15352 |
| Remapper) | The Color Channels Remapper filter can remap the Alpha value to the Y value of the output. For example if source is YUV-Alpha then target will be Alpha-UV. If the A to Y mapping value is set to 128 then output will be grayscale.<br />Limitations:<br />- The Color Channels Remapper filter will not work for outputs<br />with 10 bit depth. Currently only works for 8 bit outputs.<br />- The Color Channels Remapper filter will not show preview in the<br />UI in following cases:<br />a) any source that is 10 bits with alpha b) any source without alpha c) if preset editor is not configured yet |  |
| Filter | EZTitles filter can be used in MPEG-2 TS passthrough jobs to | 15052 |
| (EZTitles) | insert captions without transcoding. |  |
| Post Task | Harmonic VOS 360 / VOS CNS integration (purchase option | 15322, |
| Upload / Filter | required) 15084 &gt; Support for VOS 360 Upload. You can access the upload settings through the Target Preset ‘Post Task’ tab.<br />&gt; Support for VOS CNS Upload. You can access the upload settings through the Target Preset ‘Post Task’ tab.<br />&gt; SCTE 35 inject filter can be used to inject SCTE-35 markers (via ESAM XML) into the output.<br />Help document for using the VOS Uploader:<br />https://www.dropbox.com/s/9wdvmc7c5qs7ee6/FTC%20Harmonic%20VOS%20Upload%20Guide.docx.pdf?dl=0 | 15306, 15084 |
| Manager | Database Maintenance Manager feature<br />FTC and Cluster now support "Database Maintenance" upon service reboot only when scheduled through UI (access the setting through Cambria Manager → File menu dropdown. | 14811 |

### New Features added for 4.5

| Module | Feature | Capella Reference # |
| --- | --- | --- |
|  | Maintenance is done through a "vacuum" feature in postgres where DB size will be reduced (i.e. deleted rows are cleaned up from the database)<br />Notes:<br />- Vacuum will be performed with "best effort" upon next service<br />start only when DB Maintenance is scheduled.<br />- Vacuum will not be performed (skipped) when database is not<br />connectible, or read only, or when POSTGRES or CLUSTER/FTC services are stopped.<br />- Vacuum will be waited to be performed, before<br />servicerunner/webserver starts.<br />- If user sees error in the UI (such as "unable to obtain info")<br />then UI should be restarted. |  |
| Cluster | Multicast Independence for Cluster Redundancy<br />In previous versions of Cluster the network needed to allow Multicast in order for Cluster redundancy to work. This requirement is now removed for this Cluster 4.6. | 15341 |
| Floating<br />License Server | New tool Floating Server Monitor There is a new tool that can be used with Floating Server Manager. The tool can be installed on any machine, it will watch the Floating License Server and can send out notification alerts<br />based on various conditions:<br />- Floating Server Manager does not respond error<br />- License Expires soon (10 Days)<br />- Activation status becomes invalid<br />- Number of Agent Machines less than number indicated | 15025 |
| Dashboard | Additional metrics and Installer for Prometheus/Grafana 15265<br />Documentation:<br />https://www.dropbox.com/s/b3n9yvkd7wfytpu/Capella%20Monitoring%20System.pdf?dl=0 | 15266, 15265 |
| Target<br />(MP4,<br />Elementary<br />Stream) | VP9 codec added to MP4 and Elementary Stream exporters | 11889 |
| Target<br />(Adaptive<br />Streaming v2) | Dolby Audio support added | 14484 |
| Target | 12328 | 12328 |
| (Adaptive<br />Streaming v2) | I-frame only playlist support for HLS |  |

### New Features added for 4.4

| Module | Feature | Capella Reference # |
| --- | --- | --- |
|  | A checkbox has been added to enable this for HLS. It can be found in the Adaptive Streaming v2 Exporter in the ‘Container Format Settings’. |  |
| Target<br />(Analysis) | Black Segment Detection added to analysis exporter This setting can be found in the Analysis Exporter in the ‘Container Format Settings’ section under ‘Video Contents’. | 14901 |
| Source/Target | FTPS retrieval and post task delivery support added | 14319 |
| Filter | Color Space Conversion filter enhanced<br />BT.709 to HLG (and HLG to BT.709) can be done in one step.<br />The new option has been added to Color Space Conversion filter in the ‘Conversion Mode’ options. | 14448 |
| Filter | Nexguard V2 added to Target Filter list<br />This filter uses Nexguard SDK version 1.7.1.<br />Documentation:<br />https://www.dropbox.com/s/5qevmx0lay8f4ky/NexGuard%20FTC%20Guide.docx | 14636 |
| Job | AWS credentials for JobXMLs retrieved from Manager are now<br />submission<br />encrypted. | 14373 |
| WebUI | Web UI added<br />Cambria Manager includes a selection to quick launch into the WebUI under the ‘Help’ dropdown.<br />You can also launch it by going to this link on the Cluster/FTC<br />machine:<br />https://localhost:8161/<br />(The first time you run it, it will show the location of the instructions to set up user accounts) | 14738 |
| Licensing | Upgraded to use latest version of Cryptlex API 14913, Please refer to the licensing note at the start of the Cluster/FTC 4.5 release notes. | 14883, 14913, 14924 |
| Source | DivX input supported 14144<br />Limitation: Cannot seek DivX files. | 14233, 14144 |
| Source (FTP<br />retrieval) | SFTP retrieval supported | 14140 |
| Target (MXF) | Added official support for ARD-ZDF SDF 01/02, HDF 01/02/03 and adhere to corresponding specifications | 13194 |
| Target (MXF) | XAVC Long GOP supported<br />FTC now supports XAVC LONG GOP 4:2:0 8 bit, 23.98, 25, 29.97 FPS, will be 100Mbps, 50, 59.94 will be 150Mbps. | 14072 |
| Target (MXF) | XAVC Intra updated with Class 50 option | 14061 |
| Target (AAF) | AVCIntra100 and AVCIntra50 support added to AAF exporter | 14114 |
| Target | Dolby Digital and Dolby Digital Plus audio has been added | 13516 |
| (Adaptive<br />Streaming) | to Adaptive Streaming Exporter The Dolby setting requires applying a config file. Here are the steps to generate Dolby Encoding Setting XML for Adaptive<br />Streaming:<br />1. Open FTC and go to the "Encoding" tab<br />2. Create a new encoding preset with any container that has<br />Dolby Audio available. For example, "MPEG-2 Transport Stream"<br />3. In the "Audio/Track 1" option, select "Dolby Digital" or "Dolby<br />Digital Plus"<br />4. Scroll down to "Audio Settings / Track 1" and modify the audio<br />settings to your liking<br />5. Click on the "Save..." button in the Preset Editor and save<br />the .cen file<br />6. Rename the .cen file to have a .xml extension<br />7. Open the file in a text editor and look for the audio<br />&lt;EncodingSettings&gt; tag<br />8. Delete everything else in the file except for the audio encoding<br />settings and all of the contents inside it<br />9. Save the modified file<br />10. This file can be used in the ‘Load Config’ button when Dolby is<br />selected for audio in the Adaptive Streaming Exporter.<br />Here is an example of a Dolby Digital configuration:<br />&lt;EncoderSettings<br />EncoderName="Audio Encoder - AC3"<br />Type="Audio"<br />NbOfChannels="6"<br />BitsPerSample="Same as Source"<br />BitrateKbps="384"<br />AudioCodingMode="7"<br />LFEEnabled="1"<br />Dialnorm="31"<br />BitstreamMode="0"<br />EvolutionFrameworkEnable="1"<br />SurroundMode="0"<br />SurroundExMode="1"<br />LineModeProfile="1"<br />RFModeProfile="1"<br />StereoDownmixMode="0"<br />LTRTCenterMixLevel="4"<br />LTRTSurroundMixLevel="4"<br />LOROCenterMixLevel="4"<br />LOROSurroundMixLevel="4"<br />UseHDCDConverter="0"<br />UseLFEFilter="0"<br />UseSurroundPhaseShift="0"<br />UseSurroundAttenuation="0"<br />CopyrightFlag="1"<br />OriginalFlag="1"<br />PeakMixingLevel="105"<br />RoomType="2"<br />LanguageCode="eng"<br />Name="AudioEnc1"&gt;<br />&lt;FilterSettings Type="AFilter"<br />FilterName="Audio Filter - DPLC" Mode="1770-<br />2+DI" SpeechThreshold="20"<br />UseTruePeakDCBlock="0" UseTruePeakEmphasis="0"<br />UseScaling="0" /&gt;<br />&lt;/EncoderSettings&gt; |  |
| Target | (Beta) Adaptive Streaming V2 exporter | 13539, |
| (Adaptive | 14484, | 14484, |
| Streaming v2 | The beta version of the ‘Adaptive Streaming V2’ exporter is | 14457, |
| Beta) | available to test and use. This exporter includes a purchase option to have CPIX/Irdeto integration for DRM. And has more user controls for folder and file naming schemes, compared to V1.<br />Also included are DASH Conformance Mode for HbbTV 2.0/DVB- DASH 2014.<br />Limitations:<br />- Dolby Audio output does not currently work with the V2<br />exporter. Jobs will error with a “MultiBitrate Encoding:<br />Unexpected Error”. This will be resolved in a future build.<br />- VBR jobs will fail with “Unexpected Error”. This will be resolved<br />in the next version.<br />- JobXMLs extracted from a job with CPIX and/or AWS S3 will<br />show the credentials in plain text. This will be resolved in a future build. | 14373 |
| Source and | Dolby to Dolby transcoding supported | 12330, |
| Target (Dolby | 14347, | 14347, |
| Audio) | Limitations: Audio Delay and Audio Normalizer filters cannot be used in a Dolby to Dolby transcoding job. | 14362 |
| Filter (XML<br />Titler) | XML Titler support for EUDC and Carbon Coder XMLs added A help guide is available. Please contact support (support@capellasytems.net) for more details. | 14380 |
| Filter | Teletrax Watermarking Filter (target side) support | 14361 |
| (Teletrax) | Requires a license from Teletrax. |  |

### New Features added for 4.3

| Module | Feature | Capella Reference # |
| --- | --- | --- |
|  | Documentation:<br />https://www.dropbox.com/s/zxt62k4s932i8c3/How%20to%20Teletrax%20Watermarking%20.pdf?dl=0 |  |
| Post Task | Retry attempt value and delay value added to Post Task network delivery | 13421 |
| FTC | List of various modules/components that have been | 13933, |
| Module/compo | upgraded: | 13928, |
| nents | 13492,<br />- ffmpeg upgraded to v4.2<br />13105,<br />- x265 upgraded to v3.2.1<br />14358,<br />- mp3 encoder updated<br />14105,<br />- Dolby Vision upgraded to SDK v 2.2.0<br />14260,<br />- MXF XDCAM reading from S3 optimization<br />14377<br />- Avid AAF exporter enhancements: Auto delete AAF after check-<br />in option, limit # of files in folder, additional logging<br />- Color Primaries/Transfer Characteristics/Matrix Coefficients<br />options added to DNxHD/DNxHR and ProRes configuration<br />- ProRes optimization to increase processing speed<br />- Logo Filter position accuracy increased<br />- Specify Channel Layout option added to MOV container settings<br />- Whitelist option added for Watch Folder Source Acceptance tab<br />- UI option added to switch UI language (English / Japanese /<br />Chinese) | 13492, 12942, 13105, 14317, 14358, 14281, 14105, 13071, 14260, 14193, 14377 |
| API Packager | (Purchase Option) CPIX and Irdeto Integration for DRM PlayReady/Widevine Support | 14175, 13835 |
| Source<br />(Growing<br />source) | Growing source files can now be segmented by Timecode | 13540 |
| Target (Avid | Avid AAF Exporter enhancements: | 13730, |
| AAF Exporter) | - Added Custom Metadata (Tagged Values) interface<br />- String replacement variable can be used for the Material Name,<br />so source name can be maintained | 13682 |
| Audio | Audio enhancements:<br />- Analysis exporter supports loudness measurements for multiple<br />audio tracks<br />- Audio description values for Voice Over and Control Track are<br />used during transcoding with "Audio Voice Over Control Renderer" filter | 13808, 13329 |
| UI | UI updates:<br />- UHD/4K/8K selections added to UI dropdown for x264, x265,<br />ProRes, HEVC(NTT) codecs<br />- The column sorting in Manager occurs across all pages<br />- New field added for modifying filenames for Adaptive Streaming<br />MPEG-Dash video streams | 13242, 12068, 13571 |
| API | Different credentials can be used for access to files in | 13472, |
| (Credentials) / | various locations | 15318, |
| Credential | 15345 | 15345 |
| Manager | Credentials Storage<br />- Credentials are stored into database<br />- Credentials will hence be persistent across builds, and persistent<br />across Cluster Redundancy<br />Credential Manager<br />- Credentials are entered via Credential Manager<br />- Credential Manager is identical, and can be found in FTC and in<br />Cambria Manager<br />- Credentials will then be written to JobXML (and assigned to<br />Manager) when jobs are created.<br />- Removing entries in Credential Manager DOES NOT invalidate<br />the credentials<br />- In other words, users who get hold of your JobXML can then<br />modify the JobXML to R/W files on the path, given that they know the path<br />- Passwords are encrypted, but does not prevent impersonation.<br />UI workflow (limited to reading/writing to location that UI have access to) 1: FTC -&gt; Settings -&gt; Credential Manager (Or, for WF, Cambria Manager -&gt; File -&gt; Credential Manager) 2: Put in the path (folder path), user name, password and domain.<br />Password and domain is optional, depending on user environment.<br />3: Create jobs and run accordingly.<br />API workflow (craft and submit as JobXML):<br />1: Then, you can work with any path, as long as you know it 2: FTC -&gt; Settings -&gt; Credential Manager (Or, Cambria Manager -&gt; File -&gt; Credential Manager) |  |

### New Features added for 4.2

| Module | Feature | Capella Reference # |
| --- | --- | --- |
|  | 3: Put in the path (folder path), user name, password and domain.<br />4: Export -&gt; Export All -&gt; Save the ccf file 5: Open the ccf file, you will see lines of "Credentials" 6: When crafting JobXML, Insert "Credentials" as child element of "Job", and put those lines of "Credential" as child of "Credentials",<br />eg:<br />&lt;Job&gt;<br />....<br />&lt;Credentials&gt;<br />&lt;Credential Domain="mycompany.net"<br />Password="foobar1##" Path="\\network-nas1"<br />Username="nasuser1" /&gt;<br />&lt;Credential Domain="mycompany.net"<br />Password="foobar2##" Path="\\network-nas2"<br />Username="nasuser2" /&gt;<br />&lt;/Credentials&gt;<br />&lt;/Job&gt;<br />Limitations:<br />Lists of functions that do not work with Credential Manager:<br />- Retrievals (Network, FTP, etc)<br />- Uploads (Network, FTP, etc)<br />- Scripts for Scriptable Workflow<br />- Third-Party Plugins |  |
| API | Return TotalItems value that represents the number of items in the Jobs List<br />http://localhost:8647/CambriaFC/v1/Jobs/http://localhost:8649/CambriaFC/v1/Jobs/ | 13792 |
| Scripts | MultiTargetBitrateLadderBasedOnVideoComplexity.pl script added<br />It allows multiple individual targets (MP4 or TS) to use source video complexity values to set target bitrates. | 13788 |
| Adaptive | Adaptive Streaming Repackager (API only) (Separate | 13202, |
| Streaming<br />Repackager | Purchase Option)<br />Packager test sample link:<br />https://www.dropbox.com/s/oefcbw7fujhsctd/PackagerTest.zip<br />PackagerTest notes: The package includes instructions for creating the MP4 elementary streams in the FTC UI, then using the API for repackaging. | 13595 |
| Source<br />(IMF) | IMF ProRes import | 13587 |
| Source<br />(AVI and MKV) | Support for lossless codecs: FFv1 and FFvHuff | 13379 |
| Source | Enhancement: S3 performance optimization with MOV and MXF XDCAM sources | 13083, 13105 |
| Source and | Enhancement: Improved credential handling for S3 to | 13081 |
| Target | allow different credentials to be used per job.<br />Please contact Capella at support@capellasystems.net for instructions. |  |
| Target | Option added to output fragmented MP4 with byte range | 13338 |
| (MP4) | external file |  |
| Target | AVID AAF Exporter creates AVID MXF (MPEG-2 IMX, | 13222, |
| (Avid MXF) | XDCAM HD, or DNxHD) and handles check-in to Interplay 14822 Limitation: When the AVID AAF exported is used in combination with the FTC setting to “overwrite” target files that already exist, a crash may occur. Please do not overwrite AVID AAF targets that exist. | 13638, 14822 |
| Target<br />(MXF) | Added support for ProRes to MXF exporter | 13574 |
| Target | Added support for DV (DVCPRO25, DVCPRO50, | 11118, |
| (MXF) | DVCPROHD) to MXF exporter | 13486 |
| Target<br />(MXF XAVC) | Added Long GOP support to MXF (XAVC) | 13617 |
| Target | Enhancement: MXF output is usable in Premiere as it | 13294 |
| (MXF) | grows |  |
| Target | Analysis Exporter enhancement to allow video matching | 13496 |
| (Analysis) | detection<br />Video matching detection setting added Analysis Exporter. This setting is exposed when setting the Analysis Exporter video setting to ‘No Encoder’ and checking the ‘Video matching detection’ checkbox in the Video Contents section. You point to a video file that us used to match against the source.<br />The output XML will indicate if a match was found and the<br />position (in frames) of the matched section. Example output:<br />&lt;AnalysisInfo&gt;<br />&lt;VideoMatch DetectionMode="initial" FrameEnd="2834"<br />FrameStart="2697" Matched="1" LowestPSNR="40.6390"<br />PSNRThreshold="35" SourceFrameRateDen="1001"<br />SourceFrameRateNum="30000"/&gt;<br />&lt;/AnalysisInfo&gt;<br />This feature can be combined with the Scritable Workflow to identify if the source has a match, then remove (or replace) that section of video. |  |
| Filter | Kantar SNAP Audio Watermarking<br />The watermarking filter is now officially certified. It requires Capella purchase option as well as license from Kantar.<br />This can be tested upon request. Please contact Capella at support@capellasystems.net if you are interested in testing.<br />Link to documentation:<br />https://www.dropbox.com/s/no05ii0vkiibn9x/Audio%20watermarking%20integration%20with%20%27Kantar%27%20guide.docx | 10338 |
| Filter | Logo filter enhancement for motion logos<br />Source Ending Handling (Repeat Last Frame / Disappear / Loop) setting added to Logo filter. This setting is exposed when using a video (.mov) file as the filter source. | 7648 |
| Dashboard | Web-based Dashboard/Monitoring/Alerting<br />Prometheus data output for Cambria is added. Instructions for setup of a dashboard for monitoring and alerting are included in the document.<br />Link to documentation:<br />https://www.dropbox.com/s/yn3slyqxbzt14is/Cambria%20FTC%20Feature_%20Prometheus.pdf | 13423 |
| Windows | Windows Processor Groups support (Beta) | 13313, |
| Component | 13407, Warning: Cluster/FTC support of multiple processor groups is limited and we do not guarantee that a multiple processor group machine configuration is optimal. We do not recommend that machines with more than 64-cores are used in production due to performance issues<br />Multiple Processor Groups are defined by Windows when systems have more than 64 cores.<br />A single FTC job can only use 1 processor group.<br />We have enhanced FTC to distribute individual jobs into different processor groups to utilize machines that have more than 64 cores. | 13407, 13690 |
| Virtual | Automated AWS clients for Cluster | 13365, |
| Machines | 13299 | 13299 |
| (Cluster/FTC) | This is part of our ongoing development for improving Cluster on premise/cloud hybrid handling.<br />This can be tested upon request. Please contact Capella at support@capellasystems.net if you are interested in testing. |  |

### New Features added for 4.1

| Module | Feature | Capella Reference # |
| --- | --- | --- |
| License | ‘Pay As You Go’ Licensing Option (Beta) | 13365, |
| (Cluster/FTC) | 13299, This licensing feature can be used to allow customers to pay based on extra encoding volume instead of adding full perpetual licenses.<br />Can be used with Automated AWS clients for a more cloud centric workflow or to support unanticipated spikes in encoding volume.<br />Also added ‘Pay As You Go’ balance to Prometheus metrics.<br />This can be tested upon request. Please contact Capella at support@capellasystems.net if you are interested in testing. | 13299, 13484 |
| Source | S3 optimization for source handling<br />Performance is improved for sources being read from S3. | 13030 |
| Target | MXF with Dolby E | 13035, |
| (MXF) | 13027 Improved MXF muxer. Also, passthrough optimized to allow for<br />various Dolby E workflows to be supported:<br />In the global Transcoding Preferences (File [Symbol] Transcoding Preferences), there is now "Dolby E Decode" option. This can be set to "Decode (if licensed)" or "Do not decode".<br />Target Presets by default will use the global Trancoding Preferences. But target presets can be modified to not use the Application Defaults and so this setting can be changed on the Target Preset also.<br />Based on the global Transcoding Preferences, Dolby E files will load in as all PCM if the setting is set to "Do not Decode".<br />Otherwise, Dolby E will load in normally, which means two source channels get decoded to one 5.1 Dolby E track. | 13027 |
| Target | ProRes Target Enhancements: | 13042, |
| (ProRes) | 13031<br />- Custom PAR option added.<br />- Improved ProRes backwards compatibility with older players. | 13031 |
| Target (XAVC) | XAVC Encoder Performance Improved<br />Transcoding speed should be 2 to 3 times faster than the previous version. | 13055 |
| Filter | Preroll / Postroll Filter<br />Allows for preroll and postroll to be added. Type can be black, image, or freeze frame. Duration can also be set. | 13041 |
| Filter | BT.709 to HLG Conversion Improvement<br />The color correction filter has been updated to have a more accurate conversion algorithm. | 12690 |
| Filter | Option added to Audio Remapper filter to allow automapping to match output tracks<br />Allows for linear mapping of channels from source to target until all the tracks have a source channel assigned or until there are no source channels left. | 12868 |
| Transcoding | Audio Track Handling option allows for silent audio to be | 12832 |
| Preferences<br />(Source File | added to target tracks automatically |  |
| Handling) | In Transcoding Preferences (Source File Handling), there is a new option for Audio Track Handling. The setting is called “Create Silent track if used Source Track does not Exist”. |  |
| Transcoding<br />Preferences | Adaptive deinterlacer option | 12932 |
| (Standards | Transcoding Preferences Standards Conversion option added for |  |
| Conversion) | “Deinterlacer Mode” to all for per frame interlacing detection.<br />This enables FTC to adaptively handle video that has both interlaced and progressive segments. |  |
| Watch Folder | Watch Folder enhancements:<br />12913<br />- Subfolder depth limit increased to unlimited. Please note<br />that this feature allows for an unlimited depth, however, other limitations such as Windows maximum path length may prevent a really long watch folder path from working.<br />- FTP upload and S3 upload added as Watch Folder Actions. | 13080, 12913 |
| Notification | Notification enhancements:<br />- New string replacement variables added, hover over the help<br />(?) for the list of supported variables. | 12940 |
| Log | Automatically delete logs for Cluster/FTC<br />Logs are now automatically deleted for Cluster/FTC if it is past 45 days. | 12890 |
| Source and<br />Target | Dolby Vision Support (Beta) This can be tested upon request. Please contact Capella at support@capellasystems.net if you are interested in testing. | 12483 |
| API | Role Based API Access (Beta) 21406 This feature allows for the administrator of Cambria Cluster to set role based permissions for API access. This can be unlocked for beta testing for those who request it. Please contact Capella at | 11930, 21406 |

## Known Issues

Here is a list of currently known important issues. Some of which will be fixed in future releases of Cambria.

| Module | Issue | Capella Reference # |
| --- | --- | --- |
| suppor | t@capellasystems.net if you are interested in testing. |  |
| Limita | tion: When the API is used in role-based mode, GET |  |
| /Cambr | iaFC/v1/Jobs/ returns only jobs owned by the<br />authen<br />ticated user unless that user has the Administrator role. |  |
| Custom | roles with full permissions may still see an empty job list. |  |
| This a | ffects the job ID listing API, not the Administrator role. |  |
| Here is a list of currentl | y known important issues. Some of which will be fixed in future releas Cambria. | es of |
| File Convert / | Cambria currently uses decimal points instead of decimal | 9039 |
| Cluster | commas. This is the case even in OS languages that normally uses decimal commas. |  |
| Watch Folder | Remote Retrieval 14910 Unless the network retrieval location is shared as Public with no login necessary, the username and password fields must be filled in. By doing so, you can ensure that the network retrieval will still work even after the user logs out.<br />When doing FTP / Network Retrieval for a Watch Folder, use the "Subfolders to watch" dropdown to select the depth of subfolders to retrieve. Otherwise, no content inside of subfolders will be retrieved by default. | 7160, 14910 |
| Watch Folder | Growing file support<br />Allows transcoding to begin on a source file that is still being transferred into the watch folder.<br />The Allow growing files options can be accessed and modified through the Watch Folder Source Acceptance (tab).<br />Limitations: The growing files feature should be used for files that are growing at a rate equivalent to their bitrate.<br />This feature is not to be used as a workaround for a slow network transfer rate. Also, since the full size of the source file can be unknown, the completion percentage can be inaccurate. | 5003 |
| Watch Folder | Window’s folder shortcuts are not a supported input to trigger Watch folder encoding jobs. Also, shortcuts created from files in Windows Libraries folders also are not supported<br />by Watch Folders. | 6060, 5987 |
| Watch Folder | Maximum number of subtasks for a single job is 8. This limitation will only apply when ‘Perform actions in parallel’ is unchecked. | 1888 |
| Watch Folder | If ‘Submit as Job XML is selected as a Watch Folder action, no other actions are performed after this selection. | 13951 |
| Watch Folder (S3 | S3 Retrieval in Watch Folders does not honor the "Retrieve | 16383 |
| Retrieval) | as S3 shortcut" checkbox. The current behavior is that it will always retrieve as S3 shortcut regardless of the option being enabled / disabled.<br />Note: This issue will be fixed in a future build. |  |
| Source (Import<br />error reporting tool) | Reporting tool for source files that fail to import When source files fail to import into the File Convert Sources tab, there will be a link at the bottom of the application, Show File Import Error Log. You can click on this link to access the ‘Create Report’ function. This tool will create a folder that contains information about the file and also will extract the information at the start and end of the file. This folder can then be sent to Capella for troubleshooting/support purposes. | 10667 |
| Source | Import support for IMF files<br />The source can be loaded by pointing File Convert to the playlist XML (CPL.xml) | 10283 |
| Source | Decode source file once when encoding to multiple targets 9592, When encoding to multiple targets using the same source file, you can now configure File Convert to decode the source once. To do this use the option on the ‘Encoding’ tab in the main UI to “Encode Targets as Single Job”. This allows us the amount resources spent on decoding/deinterlacing to be reduced and increases overall transcoding speed for the target group.<br />1. Conditional Audio Mapping cannot be used with the<br />‘Perform encoding tasks as one job’ watch folder option.<br />2. Source side filters cannot be used with the ‘Perform<br />encoding tasks as one job’ watch folder option.<br />3. HTTP and Adaptive streaming targets cannot be used with<br />‘Perform encoding tasks as one job’ watch folder option or ‘Encode targets as single job’ File Convert UI option. | 9361, 9591, 9592, 9727, 9718, 9587 |
| Source | Analyze Source Function | 8221, |
|  | 8133, The ‘Analyze Source’ button can be found in the main UI in the source tab. This function allows the application to display more information about the source. (muxer used, video format, audio format, resolution, frame rate, interlacing, presence of closed caption, presence of timecode, bitrate, GOP size, number of B-frames, closed GOP/Open GOP, and many file-specific things like TS PIDs, H.264 settings (CAVLC/CABAC), etc.)<br />Analyze source also has an option to allow an Encoding Preset to be quickly created based on the analysis.<br />Limitations:<br />- Create Preset option does not work on all sources. MXF<br />(XDCAM) sources cannot be used with this function.<br />- If a source is detected as a High-10 profile and 4:2:2 10-<br />bit, the create preset function will create a 4:2:0 10-bit preset. This occurs because High-10 does not support 4:2:2.<br />- The MPEG-2 decoder will always decode the file with the<br />color format YUV 4:2:2. Because of this, the video properties will always show YUV 4:2:2 for all MPEG-2 videos.<br />- Some files, especially longer files may take a long time to<br />analyze. You can modify the ‘Analysis Duration’ for the options tab in the main UI. Setting this to ‘Partial’ will limit the analysis to the first 2 minutes of the file. However, setting this to a shorter analysis segment may reduce the accuracy of the detection for the bitrate setting. | 8133, 10302 10196 |
| Source | Reported duration for HEVC (TS) source files can be off by 3 to 5 seconds. | 7499 |
| Source | HEVC Decoder<br />Limitation: HEVC sources may not be seekable, therefore scrubbing through the Segments Editor timeline will not work. | 6885 |
| Source | Sources with timecode that does not increase linearly can cause the progress of the job to be reported inaccurately. | 6085 |
| Source | 4k support<br />Limitations: 4k output is only supported with HEVC and x264 targets. In order to use 4k resolution, the Level in the encoder UI must be set to 5.2 or higher. 4k input formats that have been tested include HEVC, Grass Valley HQX, Grass Valley Lossless, ProRES 422, and ProRES 4444.<br />Recommendations: 4k conversions are memory intensive.<br />Here are some recommendations to avoid problems related to Windows 32-bit memory limits.<br />- It is recommended to use the 64-bit FTC UI for 4k<br />conversions. (C:\Program Files (x86)\Capella\Cambria\cpx64)<br />- When using the File Convert UI, it is recommended to use<br />Queue instead of Convert to start a job. | 5748 |
| Source | Sources with multiple video streams are unsupported and will now fail with this error: “Configuration error: Audio- Video Source. Unsupported source –contains multiple video streams”. | 4183 |
| Source | Sources with a mix of interlaced and progressive pictures are not supported. The job will fail with an “unexpected internal error” message. | 14905 |
| Source (ProRes) | ProRes Source Error Tolerance<br />Source Error Tolerance now works for ProRes sources. The user can specify how many source frames to ignore (per minute) and continue decoding when FTC encounters certain errors in the source file. This enables encoding to continue, but may result in duplicated or skipped source frames.<br />The Sources Error Tolerance configuration can be found in ‘Preset Editor’ → ‘Transcoding Preferences’ → ‘Other Settings’. | 11814 |
| Source | Uncompressed ‘raw’ RGBA MOV files show artifacts | 10858 |
| (uncompressed) | during decoding<br />Note: We are looking into fixing this for a future release. |  |
| Source (IFO -<br />PS/DVD) | Source IFO (PS/DVD) files usage and limitations:<br />How to use:<br />Go to Video_TS folder (which contains the IFO/VOB files), and import the IFO that starts with "VTS". Using VIDEO_TS.IFO will not work. Users should not import all VOBs manually, the IFO loader will concatenate all of the VOBs automatically.<br />Limitations:<br />1: IFO: The accuracy of source duration is relied on IFO. In our observations, it is often a few frames off of actual source duration through frame counting.<br />2: VOB/PS: The accuracy of source duration is relied on the accuracy of PTS (Presentation Time Stamp). If the PTS is inaccurate, detected source duration will be different than actual source duration through frame counting.<br />3: Does not support files that do not have system header (Spec required to have at least 1).<br />4: IFO Demuxer does not support accurate seeking for 23.976 Pulldown sources. There may be a few frames off when we seek/segments.<br />5: IFO Demuxer does not support segmenting by chapters. It will demux all chapters found in the main title in first PGC.<br />6: When demuxing IFO, we do not have "FBI Warning" sections (VTS_0X_0.VOB) since that is not included as valid/used sectors in first program chain. By we only demux sectors that are referred in first program chain.<br />7: Does not support DVD that have multiple main program chains, we always pick first one.<br />8: Does not support Closed Captioning subtitles (CC). We can only support bitmaps subtitles (indicated by IFOs). | 3492 |
| Source (MPEG-2 | If the timestamps of the source are continuous and accurate, | 3513 |
| TS/PS) | and the file is seekable, then we are frame accurate. If the timestamps are non-linear and/or non-accurate, then our duration will be accurate within an average of 2-10 seconds. |  |
| Source (WMV) | Windows Server 2012 R2 requires Windows Media Foundation and Desktop Experience to be installed for WMV support. | 12313 |
| Source | Seeking in the Segments Editor can be off by 1 frame for | 6108 |
| (Segments Editor) | DirectShow sources. |  |
| Source | When Map Audio Tracks is used. The duration of the audio | 9292 |
| (Map Audio Tracks) | for the source will be modified to match the duration of the shortest audio source. This can result in the loss of audio for longer audio assets used in the same Map Audio Tracks configuration. |  |
| Source (Analysis) | For files we load using 3rd party SDKs, like Windows Media or DirectShow, the reported properties of the file are what our decoder receives, which can be different from the native properties of the source.<br />Ex:<br />GV codec - Audio sample is 24-bit but 16-bit is displayed.<br />WMV - Color format is YUV4:2:0 but 4:2:2 is displayed. | 13913 |
| Source (Audio | When encoding from a source file with different length audio | 12693 |
| Duration) | tracks, the longer audio duration will be used. |  |
| Source (Watch<br />Folder) | Watch Folder Support for XML Job Submission Watch Folders can accept job XML files as long as the Watch folder Action is set to “Submit as job XML”.<br />Requirement:<br />Job XMLs that are submitted must have &lt;JobDescr&gt; as the<br />root element.<br />Example:<br />&lt;JobDescr Priority="5" NumberOfRetries="3"<br />Description="File to file conversion 123"<br />Submitter="10.12.0.155"&gt;<br />…<br />&lt;/JobDescr&gt; | 8323 |
| Target/Source<br />(Amazon S3) | Read and write to Amazon S3 Using Amazon IAM user authentication, FTC can access Amazon S3 buckets. Source files on S3 can be imported into FTC via JobAPI submissions and FTC can write directly to S3 while encoding.<br />Limitations:<br />- Some source formats cannot be read directly from S3.<br />- Some output formats cannot be written to S3 while<br />encoding, these outputs will be written locally first then transferred to S3. | 12724, |
| Source and Target | 8K Support (purchase option)<br />Limitations: 8k output is only supported with HEVC targets.<br />In order to use 8k resolution, the Level in the encoder UI must be set to 6.0 or higher. 8k input formats that have been tested include HEVC, TIFF, DPX, Uncompressed YUV.<br />Recommendations: 8k conversions are memory intensive.<br />Here are some recommendations to avoid problems related to Windows 32-bit memory limits.<br />- It is recommended to use the 64-bit FTC UI for 8k<br />conversions.<br />- When using the File Convert UI, it is recommended to use<br />Queue instead of Convert to start a job. | 8811 |
| Source and Target | 10-bit/12-bit/16-bit video Support 7127,<br />10-bit supported formats:<br />8526,<br />Source and Target Formats:<br />ProRes422 (QuickTime MOV) ProRes4444 (QuickTime MOV) Uncompressed (QuickTime MOV) Uncompressed (AVI) * source only HEVC (Elementary, TS, MP4) H.264 (Elementary, TS, MP4) DNxHD (MXF, MOV) AVCIntra (MXF) *source only XAVC (MXF) *source only<br />12-bit supported Sources and Targets:<br />TIFF *source only HEVC (Elementary, TS, MP4)<br />Conversion Modules:<br />Scaler Interlacer (*Deinterlacing is only 8-bit) Frame rate converter Pulldown<br />10-bit/12-bit/16-bit Source and Target Filters:<br />Crop, Logo, Text Burn In, Timecode Burn In<br />Note: Video data being processed in 8-bit if any module used is 8-bit and the resulting output file will be 8-bit. *For Example: if Deinterlacing is used in transcoding process, output will be 8-bit. | 7361, 7127, 8389 8526, 8539 |
| Source and Target | DVB and Teletext Support 8621, DVB subtitles and Teletext from TS sources can be passed through from source to target. In the TS Exporter, Container Format Settings (Preset Editor → Encode [tab]), check the appropriate setting. Write DVB Subtitles or Write Teletext.<br />DVB subtitles and Teletext from TS sources can also be burned into the video prior to encoding. You can do this through a ‘DVB Burn-in’ or ‘Teletext Burn-in’ source filters.<br />Known Issues / Limitations:<br />- DVB subtitles with multiple languages on one DVB stream<br />are not supported. Only the first language will be used.<br />- Some subtitles may appear in incorrect positions with the<br />burn-in filter. | 8659, 8621, 8474, 8471, 8249 |
| Target (H.264) | Encoding parameters for H.264 are clamped to the range allowable for the specified Profile / Level and Conformance Mode. Some of these restrictions on parameters are not visible to the user and will occur without warning. | 1047 |
| Target (MP4) | MP4 files created at 29.97fps will display 59.94 for the frame rate field in VLC’s codec information section. VLC is showing field rate information instead of frame rate. | 4226 |
| Target (MP4) | MP4 files output files that are longer the 7 hours may be created with a file duration that is incorrect. This could cause the files not to open up in certain media players or cause other unwanted effects. | 3494 |
| Target (MP4) | When using the ‘Place moov at start’ option, File Convert will create a temporary file, which gets deleted when the job ends. | 3194 |
| Target (MOV) | Write timecode track in MOV<br />Requirement: ‘Write Timecode Track’ checkbox in the MOV target encoding settings must be checked for the timecode track to be written. | 5877 |
| Target (MXF) | MXF Muxer requires all channels to be contained in the same track. Use the Map Audio Tracks filter on the source file, when needed, to map source audio channels to 1 track to use for a MXF target. | 6664 |
| Target (MXF) | MXF files that are created in exactly this setting (1280x720, 4:2:0, 50P, 35Mpbs) will not always transfer to the XDCAM deck. | 5938 |
| Target (MXF) | Some combinations of settings for our XDCAM exporter can produce output files that do not playback in Sony XDCAM Viewer. Our MXF exporter allows for users to configure files that are out of MXF specification. It is up to the user to configure “in-spec” outputs. | 3119, 11777 |
| Target (JPEG2000) | JPEG2000 Export (purchase option) 9756<br />Limitations:<br />1. RGB444 color format option is not officially supported.<br />Using this setting may result in a problematic output file.<br />2. 4K JPEG2000 targets are not officially supported by FTC.<br />If a JPEG2000 job is configured to a 4K resolution, the job will attempt to execute, however, it is possible that the job will run out of memory. If this occurs, you can try changing the ‘Encoding Threads’ value to 4 and requeue the job.<br />Please contact Capella if you are interested in 4K JPEG2000 encodes. | 9759, 9756 |
| Target | Restrictions removed for number of audio channels | 10301, |
| (XDCAM) | per track for MPEG-2 XDCAM MXF<br />The exporter also allows users to configure any number of audio channels between 1-8. This can lead to creation of MXF XDCAM HD files that do not conform to any specification.<br />Known Issue: Previous restrictions have been removed, File Convert no longer automatically makes audio settings adjustments to conform to the Sony XDCAM spec. Please refer to the chart below the recommended settings for<br />certain configurations:<br />1. XDCAM MPEG-2 HD 420<br />1440 x 1080 - 2ch 16bps/ 4ch 16bps 1280 x 720 - 4ch 16bps<br />2. XDCAM MPEG-2 HD 422<br />1920x1080/ 1280x720 - 8ch 24bps<br />3. XDCAM MPEG-2 IMX<br />8ch 16bps 4ch 24bps<br />4. XDCAM DVCAM<br />4ch 16bps | 9563 |
| Target (MPEG-2) | Timecode MPEG-2 video (GOP headers) usage and<br />limitations:<br />As long as File Convert can read the timecode from a particular source, file convert will pass source timecode information to the target given that the source and target frame rates match. If frame rate differs, File Convert will pass the starting timecode (minus the frame number info) from the source to the target and automatically make the timecode increase linearly from that point.<br />There is also filter function that allows users specify the start<br />time code manually. | 3588 |
| Target (WMV) | WMV encoding is slower in 64-bit than in 32-bit. Since FTC now defaults to submitting jobs in 64-bit. Encoding may be slower than before.<br />Note: This is scheduled to be investigated for a future release. | 11939 |
| Target (WMV) | Modifying file extensions for the Windows Media Exporter<br />Changing the file extension through the preset editor to an extension not recognized by the encoder may cause the transcoding job to fail.<br />Extensions that have been verified to work: .wmv, .wm, .asf | 8691 |
| Target (WMV) | When using a custom PowerToy .reg file, if b-frames or lookahead is used, the first frame of the output is likely to be duplicated. For maximum quality, both b-frames and lookahead should be used. | 5412 |
| Target (AVI) | Canopus HQ AVI export support<br />Limitation: Output files don’t have interlacing and aspect ratio information, because the AVI standard doesn’t handle it. Different tools like Edius and Premiere use their own made up extensions to store this, so users may have to overwrite these values when they import the files, for example into Edius. | 5922 |
| Target (AVI) | Canopus DV and DVCPro50 outputs only support 720x480 and 720x576 output resolutions. If you output to any other frame sizes you will get an “Error multiplexing streams …” error. | 5542 |
| Target<br />(Audio only) | Adjusting audio speed for audio only output Audio only targets do not have encoding parameters for frame rate. However, the source speed can be adjusted with the ‘speed adjustment’ source filter.<br />Example: If you a source video at 24fps and would like to create audio only file to use with a 25fps video of the same content. You can apply the ‘speed adjustment’ filter to the source and set the speed percentage to 104.2% | 11042 |
| Target | Video passthrough support and limitations | 5170, |
| (Passthrough) | 15519 Video essence can be passed from source to target without decoding for certain containers and codecs.<br />Containers that are supported:<br />MPEG-2 Transport Stream MPEG-1/MPEG-2 Program Stream MP4 MOV<br />MXF Elementary Stream<br />Video streams/codecs we can pass through:<br />MPEG-2 H.264 (including x264) DV DVCPRO DVCPROHD ProRES VC-3 (ie DNxHD)<br />Limitations:<br />- Cannot apply video filters.<br />- If the sources files are I-frame only then segment output<br />will be frame accurate. If source files are long-GOP and the segment in point is not a key frame, the in point will be set to the previous key frame.<br />- There is no video preview while transcoding.<br />- XAVC Intra VBR source cannot be used in MXF Passthrough | 15519 |
| Target | The Transcoding Preference: Source Speed Adjustment | 8678 |
| (Passthrough) | cannot be allowed when using audio passthrough. The Source Speed Adjustment setting must be changed to ‘disallowed’ for the Job to complete without error. |  |
| Target<br />(HEVC) | NTT HEVC quality improvement parameter files Three configuration files have been added that can be used to improve the quality of HEVC output.<br />These configuration files can be loaded through the ‘Encoding Parameter File’ setting found in ‘Video Settings’ section of a HEVC target.<br />The configuration files can be found here:<br />C:\Users\Public\Documents\Capella\Cambria\Config<br />HEVC_CBR_Type100.cfg: Used to avoid underflow errors HEVC_CBR_Type101.cfg: Used with CBR encodes HEVC_VBR_Type100.cfg: Used with VBR encodes | 10950, |
| Target | Known Adaptive Streaming v1 limitations | 14444, |
| (Adaptive | 14493 | 14493 |
| Streaming) | - Smooth streaming sub-jobs will stall at 99%. The<br />workaround is to use ‘run as a single job’ option.<br />- Cluster may not work well with Adaptive Streaming jobs.<br />As a workaround please enable ‘Encode Layers as a Single Job’ or use ‘Adaptive Streaming v2”’ exporter.<br />- An “Unexpected Internal Error” will occur if Black Segment<br />Remover Filter is used with an Adaptive Streaming target.<br />- Apple HTTP Streaming validator will show errors for HLS<br />target.<br />- Adaptive Streaming v1 with Dolby audio should disable the<br />default checkbox “Encode Layers as Single Job” to avoid a configuration error. |  |
| Target<br />(Adaptive | Encode all Adaptive Streaming layers as single job | 10663 |
| Streaming) | ‘Encode Layers as Single Job’ setting allows Adaptive Streaming jobs to be optimized for source decoding, interlacing/deinterlacing, and framerate conversion operations. The setting can be found in the ‘Container Format Settings’ section in the Preset Editor for Adaptive Streaming targets. It is enabled by default. |  |
| Target | Adaptive Streaming layers can be configured to have | 10630 |
| (Adaptive<br />Streaming) | different frame rates Limitation: It is recommended that layers with the lower frame rates are set to use the H.264 encoder. If all layers are using HEVC and you are also using mixed frame rates, there may be restrictions on the GOP sizes for your layers.<br />Please contact Capella for more info. |  |
| Target | Adaptive Streaming (HLS) Video and Audio layers are | 10888 |
| (Adaptive<br />Streaming) | linked You can have multiple video and audio layers. For HLS we automatically link the audio layers to the video layers. The lowest audio layer (by bitrate) is linked to the lowest video layer. The 2nd lowest audio layer is linked to the next video layer and so on. Once the highest bitrate audio layer is reached, it is linked with the remaining video layers. |  |
| Target (Mpeg-DASH,<br />HLS) | Adaptive Streaming Packaging FTC can be used to package MPEG-DASH and HLS, without re-encoding the source.<br />- This feature can only be used via JobXML API submission.<br />- Sources must be MP4 segments with GOP sync and same<br />framerate.<br />- Job Type must be set to "MultiBitrateMux".<br />- Sources must contain 'Source' child elements, with<br />'Location' set to the different source layers<br />- SegmentNamingScheme should not have “_bitrate”, but<br />needs to have %i.<br />We can send sample JobXMLs to you, please email your<br />request:<br />support@capellasystems.net | 12327 |
| Target (Transcoding | When using the Transcoding Preferences option to move or | 6031 |
| Preferences) | copy source files when transcoding failure occurs, it will always overwrite any file in the move/copy target location. |  |
| Target (Post | The Post Conversion Task (Command Line) occurs before | 12682 |
| Conversion<br />Command Line) | any Upload tasks |  |
| Target (Post | If the post-task upload is used for a Adaptive Streaming | 11037 |
| Conversion Task / | (HLS ) target with AES encryption, the AES keys are also |  |
| HLS AES keys) | uploaded. Be cautious of uploading them to a web server that is not secure. |  |
| Target (Analysis<br />Exporter) | Video Text Recognition (OCR) Enhancements The Optical Character Reading (OCR) feature added to the Analysis exporter since FTC version 3.5. OCR allows text found in videos (Ex: scrolling end credits) to be identified and written as text to an output XML. This XML is searchable and can be repurposed/integrated into other workflows.<br />Text translation is not expected to be perfect.<br />Enhancements for version 4.0:<br />• Improved detection speed.<br />• Additional tuning parameters added.<br />• Output XML now contains x an y position information for<br />the text.<br />Basic Use Instructions :<br />1) Load the sources into FTC that you would like to analyze.<br />2) Use the source Segment Editor to mark and In/Out point<br />for the segment you would like to analyze.<br />(this step helps to reduce the time it takes to produce the XML output)<br />3) From the Target tab select the Analysis Exporter.<br />4) Uncheck the options found in the Video Complexity<br />Measurement (these settings are not related to OCR, leaving them checked can slow down your analysis processing)<br />5) Check the ‘Use OCR’ box.<br />6) Specify the ‘Data’ folder.<br />(this files in this folder are used in the text analysis processes. The Data Folder can be found in FTC installation package. Point the setting to the “…\Data” folder)<br />7) Set the 3-digit Language code. (eng for English, fra for<br />French, deu for German, spa for Spanish, ita for Italian).<br />8) Once done with the setup of the preset, you can queue<br />the job as normal.<br />9) The output XML will contain the text recognition results. | 12694 |
| Target (Still Image<br />Exporter) | Scene Detection export requires x264 to be licensed. | 13691 |
| Target (Post<br />Conversion Task) | YouTube Upload Any target preset can be setup to upload automatically to YouTube. To enable the YouTube upload, you will need to add YouTube as a destination address through the Post Task (tab). Twitter and Facebook notifications can also be configured as part of the post task to tweet or post upon completed delivery.<br />Target preset recommendations:<br />1) It is recommended that your File Convert encoding preset<br />is configured to a high quality, since the file will be re- encoded by<br />YouTube upon receipt. Keep in mind that there is a 128GB limit (per source).<br />2) Use Progressive.<br />3) Do not add black bars, keep original aspect ratios.<br />4) Use Closed GOP.<br />Security:<br />When configuring YouTube upload as a Post Task option, users will be required to enter their YouTube account credentials. YouTube will return an authorized credential that allows our application to act on behalf of users. We do not store YouTube username and password in File Convert presets or project, but we will store the returned authorized credential in encrypted form.<br />Limitations:<br />1) When we attempt to upload identical video, YouTube<br />returns 201 Created but will show "Rejected (duplicate upload)" when checked in browser on the user's channel.<br />2) Does not support upload resume. | 3917 |
| Target (Post<br />Conversion Task) | Facebook Upload<br />Video Guidelines:<br />https://www.facebook.com/help/218673814818907<br />Recommended video dimensions is 1280 x 720 for Landscape and Portrait.<br />Minimum width is 600 pixels (length depends on aspect ratio) for Landscape and Portrait.<br />Landscape aspect ratio is 16:9.<br />Portrait aspect ratio is 9:16 (if video includes link, aspect ratio is 16:9).<br />Mobile renders both video types to aspect ratio 2:3.<br />Max file size is 4GB.<br />Recommended video formats are .MP4 and .MOV.<br />Video length max is 120 minutes.<br />Video max frames 30fps.<br />Limitations:<br />With Cluster/FTC 5.1, there is a known issue where users may run into an “Authorization Error” when credentials are first entered. The workaround for this issue is to click “ok” on the message and then go through the authentication process again. Authorization should work on the subsequent attempt. | 14630 |
| Target | Gmail mail account settings change to allow for File | 10087 |
| (Notifications) | Convert and Cluster notifications to work with account<br />Gmail accounts need to have account settings modified to all for less secure apps to access your account.<br />Here is a link to the Google webpage for instructions on how<br />to change the setting:<br />https://support.google.com/accounts/answer/6010255 (Follow the steps detailed for Option 2) |  |
| Target | HTTP notification | 7543 |
| (Notifications) | http:// is a required prefix for the ‘destination address’ field for http notifications to work. |  |
| Target | Create XML log for each job completion or transcoding | 8339, |
| (Notifications) | error / string substitutions list<br />In Notification Settings (Preset Editor → Notification [tab]), you can now select ‘Create Log’ for the Notification Type.<br />Steps to Setup:<br />1. From the Notification Settings dialog, enter in a Name.<br />(Ex: Job Completed!)<br />2. Choose “Create Log” for the ‘Notification Type’.<br />3. Choose a ‘Notification Event Type’. (This settings<br />specifies the trigger that will create the XML log)<br />4. Specify a ‘Location’ of where the logs will be written to.<br />5. Enter in the ‘Content’ of what the log will contain.<br />If you are writing XML logs then here is an example of an<br />entry that can be used:<br />&lt;?xml version="1.0" encoding="utf-8"?&gt;<br />&lt;Log&gt; &lt;Info OutputFilename = "%outputfilename%" Source =<br />"%sourcefilename%" EndTme="%jobendtime%"<br />SubmitTime="%jobsubmissiontime%"/&gt;<br />&lt;/Log&gt;<br />If you are writing text logs, here is an example:<br />Job Completed!<br />JobStatus: %jobstatus% JobType: %jobtype% SourceFilename: %sourcefilename% OutputFilename: %outputfilename% JobSubmissionTime: %jobsubmissiontime% JobStartTime: %jobstarttime% JobEndTime: %jobendtime% JobRealtimeSpeed: %realtimespeed%<br />Here is a full list of string substitutions that can be used in<br />the content section:<br />%jobid% %errorid% %errormessage% %ftpurl% %jobstatus% %jobtype% %sourcefilename% %outputfilename% %jobsubmissiontime% %jobstarttime% %jobendtime% %realtimespeed% %numberoferror% %numberofretriesleft% %lasterror% %progressatlasterror%<br />%description%<br />6. Make sure you check the checkbox for ‘Is Content XML’ to<br />specify that you want the output to have an .xml extension.<br />Unchecked means the output will be .txt.<br />Known Limitations: String substitutions will not work when using the conversion button in the File Convert GUI for transcoding. It is recommended that you “Queue” the job or use Watch Folders. Also, when the ‘Notification Event Type’ is set to ‘On Job Start’, the duration shown in the log will be 00:00:00 because the database does not have the updated source duration at that point. | 10258 |
| Target<br />(Scriptable | Job stalls due to scripts | 12591 |
| Workflow) | During script phase, our job's progress does not increase, this is detected as 'no progress' internally. This means if this time exceeds the Job Timeout value, we will stop the job as stalled. You can increase your job timeout to a longer duration to avoid this issue. |  |
| Target | Limitation for Single jobs with multiple targets using | 11983 |
| (Scriptable<br />Workflow) | scripts Only the scripts from the first target will be used. All scripts in all other targets will be ignored. |  |
| Target (audio only) | Audio only targets may have audio sync issues since there is no video to synchronize with. If the audio only output is part of set of targets the sync issue can be avoided by encoding the targets using the “encode targets as single job” option. | 14779 |
| Filter (Target Side) | Target side video filters are not applied with ABR v2 targets.<br />This will be fixed in a future release. | 15933 |
| Filter | ITU-R BS. 1770-3 Loudness option added to Audio | 9396 |
| (Audio) | Normalizer<br />This option allows for audio to achieve EBU R128 compliance.<br />Known Issue: Audio bitrates at 128 kbps or lower can cause the true peak to exceed the maximum level that is specified by the filter. |  |
| Filter | Subtitle burn-in filter does not support all languages<br />English, Traditional Chinese, Indonesian, Korean, Malaysian subtitles are all confirmed to work. However due to a limitation we cannot correctly display characters for Vietnamese(VIETN4), Arabic(ARABI3) and Thai(THAI01). In these cases, we will now show the error “Unsupported language in subtitle file”.<br />Note: File Convert supports a 3rd party solution for handling<br />a larger set to caption formats, EZtitles plugin:<br />Here is the link to the product info:<br />http://www.eztitles.com/index.php?page=ezp-cambria<br />Free trial for their File Convert plugin:<br />http://www.eztitles.com/index.php?page=download-free-trials<br />(EZtitles can be used to workaround many of the limitations of File Convert’s native subtitle format handling) | 9517 |
| Filter | 608/708 closed caption burn-in<br />The Closed Caption Burn-in filter will read the 608/708 captioning data from the source and burn the captions onto the video picture of the output.<br />Limitation: When used as a filter on the target side, the frame rate of the source and target must match, otherwise the captions will not be burned into the target. This is not a limitation when the filter is used on the source side (or when adding a source side filter to the target). | 6976 |
| Filter | DVD Subtitle Burn-in (from a DVD IFO source file)<br />Available settings:<br />1. Subtitle Language - DVD's can contain multiple subtitles.<br />There can be English, Japanese, and/or Spanish subtitles in a DVD.<br />Choose the subtitle language you want displayed in this section.<br />2. Subtitle Language Index - Each language may contain<br />different subtitles. For example, if Chinese is picked from the Subtitle Language there can be two ways to write the characters. Index 0 is chosen by default and will always contain subtitle information if the Subtitle Language is supported by the .IFO. To choose the second subtitle style, choose Index 1.<br />Limitations:<br />1. If the IFO contains lots of CHG_COLCON subtitles in a<br />"burst", we may consume lots of memory.<br />2. We currently do not support previews of subtitle<br />information. | 4134 |
| Filter | Logo filter preview does not display logo when ‘apply to | 8899 |
| (Preview) | segment’ is used. |  |
| Filter<br />(Preview) | Filter Preview Enhancement Filters can now be previewed all at once. By default, all filters are previewed. You can right click on the filter preview and select or deselect filters that are included in the preview. Preview for different filters can also be enabled/disabled during playback. Some filters cannot be previewed and are not included in preview. A “*” is shown next to the current filter being edited.<br />Note: Source filters and target filters are not previewed at the same time. When editing a source filter, the preview will only show source filters. When editing target filters, the preview will only show target filters. | 6601 |
| Filter (Timecode<br />Burn-in) | Multiple timecode sources In the case that there are multiple timecodes in a source, the timecode burn-in filter will now choose the most significant one.<br />For example, the user has a source with MPEG-2 GOP timecode and VITC timecode. In our case, the VITC timecode takes precedence over the MPEG-2 GOP timecode and so the Timecode Burn-In Filter will use the VITC timecode.<br />The ordering of the filters matter in this case as the burn-in filter chooses the most significant one.<br />For example, if the user wants to burn-in the VITC timecode, the VITC extractor filter should come before the timecode burn-in. If you want the MPEG-2 GOP timecode and VITC timecode burned in for example, you'll want to first have the timecode burn-in filter for the MPEG-2 GOP timecode, then the VITC extractor, and then the timecode burn-in. | 15991 |
| Filter (Overwrite | Timecode overwrite filter can make timecode modifications | 14446 |
| Timecode) | that are applied through the muxer, so timecode that are inside of the video stream will not be affected by this filter for a Passthrough job. |  |
| Manager | Removing a job in the “Starting” state will delete the job from the Job Manager. However, the CPJobExec for the job may still be running in Windows Task Manager. Since the “Starting” state occurs only for a few seconds at the start of a job, this is a rare issue. | 9598 |
| Manager | When there is multiple Cambria Manager user interfaces open on the same machine, the changes made in one UI may not be reflected in other UI. This may lead to some confusion.<br />Workaround: You can close the Cambria Manager UI that is not updated. Newly launched Cambria Manager will contain all the updated changes. | 6565 |
| Manager | Option to control job timeout<br />A timeout setting has been added to the Cambria Manager Option (tab) to allow for increasing the timeout duration to avoid job failure caused by slow network speed. | 5982 |
| Cluster | Cluster communication uses HTTPS by default as of FTC 3.5<br />While HTTP connection is still possible now, HTTP connection may be deprecated/rejected in a future release.<br />Recommendation: It is recommended that external applications that are interfacing with FTC/Cluster web<br />servers via HTTP are retooled to use HTTPS. | 11803 |
| Cluster | Machines that are connected “online” to the Cluster with transcoding slots set to 0 may still accept transcoding jobs.<br />These jobs will remain stuck in a queuing state. In order to avoid this problem, any machines with 0 transcoding slots set should be disconnected (set to “offline”) from the Cluster. | 9738 |
| Cluster | Converting a Cluster machine to a FTC machine<br />When a Cluster machine is being used in a Backup redundancy role, the role must be set to “no backup” before the Cluster is uninstalled. If this is not done, then when FTC is installed on that machine, the database will be in read only mode and jobs will not function properly on the machine. | 9667 |
| Cluster | Cambria not compatible with VirtualBox / VMware 6599 Cluster and File Convert instances are not compatible with (VirtualBox / VMware Workstation / VMware Player).<br />Machines that have (VirtualBox / VMware Workstation / VMware Player) installed may cause File Convert not to show up in Cluster properly, in addition, File Convert may not be able to receive jobs.<br />Note: To avoid this issue FC/Cluster should not be installed on the same machine that (VirtualBox / VMware Workstation / VMware Player) is installed on. | 9010, 6599 |
| Cluster | Cambria Cluster and Cambria Broadcast Manager cannot be installed on the same machine. | 8635 |
| Cluster | It is generally recommended for Cluster installations that the same build version for both Cluster and File Convert are used. If you need to use them in different versions, please contact Capella. | 6517 |
| Cluster | If the HTTP response from the client machines takes longer than 1 second (client machines are located far away or have non-optimal internet connection), the Cluster manager may unable to set client's number of encoding slots. | 6039 |
| Cluster | When a machine is added through IP manually to the Cluster, the connection is maintained off of the exact IP entered. If the client machine changes its IP address, then you will need to manually delete the machine from the machines list and add it again. | 6038 |
| Cluster | When Cluster Manager shows a lot of "Cluster could not | 3341 |
| (Jobs) | connect to FileConvert machine to Add new job "errors for a<br />particular machine, the causes could be:<br />1)temporarily network issues (disconnected)<br />2) machine is rebooting<br />Recommendation: If you are not running into case 1 or case 2. Rebooting the client machine can resolve the problem. |  |
| Cluster (Job | Special Job Tags to prevent over distribution of Jobs to | 11601 |
| Management) | a single FTC node<br />Dynamic slots does a good job of distributing tranconding Jobs to the client FTC machines. However, there can be cases where FTC can be oversaturated with lots of Jobs.<br />This can occur when jobs use less CPU at the beginning, and then increases CPU use substantially later. During this period of low CPU use, Cluster may assign too many jobs to the FTC client. A new special Job Tag can be used to prevent this from occurring.<br />The Job Tag ‘CPUBaseline=X’ can be used, where X is a user specified number from 1 and 100. When the Job is running, the X value will be used as the minimum reported CPU utilization value for that Job. So, value X or the actual CPU utilized for the job is used, whichever is higher. Cluster will use this reported CPU utilization of all the Jobs running on a FTC machine to decide whether or not to distribute any additional Jobs to the machine.<br />Ex: CPUBaseline=80 (When a Job with this tag is running, it will report to Cluster that the Job is using 80% CPU utilization at the very least. If the Job is using more than 80% CPU, the higher value will be reported)<br />In addition to using the CPUBaseline tag, a new special Machine Tag has been introduced to allow CPUBaseline to be dynamically adjusted depending on what machine is running the Job.<br />The Machine Tag ‘CPUBaselineAdjPct=X’ can be set through the Cluster Manager for any Machine in the Machines list. X can be any number from 0 to 100. CPUBaselineAdjPct is used as a scaling factor for CPUBaseline. This allows the user control over the CPUBaseline value across machines of different processing capability.<br />Ex: When a CPUBaseline=80 Job is sent to a Machine with CPUBaselineAdjPct=50, then the actual baseline value is scaled (80 * .5) = 40. |  |
| Cluster (Redunancy) | Cluster Redundancy 8804, A second Cluster Manager can be configured as a Backup Cluster. When the active Cluster becomes unavailable the Backup machine will take over and assume the Cluster Manager’s role. Watch Folders will continue to be monitored and jobs distribution will continue. This feature adds redundancy and eliminates having a single point of failure for the Cluster.<br />Limitations / Known Issues:<br />When Redundancy is triggered by rebooting the Redundancy Primary machine, the Redundancy Backup machine becomes the triggered Primary. Upon bootup, the original Primary may not be properly stopped. In this case the Watch processes of the original Primary will still be active. This may lead to duplicate unwanted jobs to be created. Please set the status of the original Primary to ‘Stopped’ if you suspect this is the case.<br />If Primary and Backup machines are disconnected from the network at the same time for more six hours, the Redundancy replication will stop (health indicator will be red). If this occurs, the Backup must be configured to point to the Primary IP again.<br />Disabling the active network adapters through Windows Network Connections interface can cause the Primary/Backup the Redundancy replication to stop (health indicator will be red). Re-establish the machine roles again to establish a healthy Redundancy connection.<br />Redundancy role may become unset after a machine reboot.<br />Re-establish the machine roles again to establish a healthy Redundancy connection.<br />Backup machine cannot be used for encoding when it is in Backup role. However if redundancy is triggered and the Backup is promoted to Primary, the machine can be used as an encoding node.<br />Due to technical limitation of PostgreSQL database replication, it cannot handle IPchanges. So, both Primary and Backup should be assigned with staticIP. Please consult network administrators for such settings. | 8426, 8804, 8945, 9042, 9046 |
| Cluster (REST API) | When using the API to queue jobs to the Cluster for normal Cluster job distribution, you should be using port 8649 for HTTP or 8650 for HTTPS. | 4109 |
| REST API | When using the API, the output filenames will show the requested filename. It will only show the true output filenames for a job when the jobs are completed. This behavior is important to note in the case where the Job is writing to an output location where the filename already exists. | 7826 |
| Cluster | Cluster Manager may stop working if the machines system | 6111 |
| (License) | time is rolled back. It is recommended that restart the CpClusterServiceRunner service from (Windows - Service Manager) after the clock has been rolled back.<br />Changing the computer clock forwards beyond actual real world time can affect the duration of the license validity<br />when you clock is rolled back. If you are running into an issue with the dongle license, please contact Capella. |  |
| Cluster (License) | When updating a dongle license for Cambria Cluster, you should restart the CpClusterServiceRunner service from (Windows - Service Manager) for the license to be detected properly. | 5173 |
| Licensing | Floating License Server / Online Activation | 11682, |
| (Alternate method) | 11819, Floating License Servers can be used to lease Capella product licenses to physical machines and virtual servers over the network. This feature supports both “on-premise” machines as well as virtual servers on the IBM, Google, and AWS cloud.<br />The Floating License Server software is activated using Capella’s new Online Activation licensing. Online Activation is an alternative to Capella’s USB license dongle. Online Activation allows Capella Products to be unlocked on a machine through the internet using a 25-digit activation key.<br />Notes:<br />• Floating License Server must be installed on a physical<br />machine. The Windows OS must also be configured to prevent the machine from going to sleep.<br />• Updates/Extensions to Licenses by Capella will apply<br />automatically if the license is online. However, it is recommended that users re-activates after Capella makes the change so that the Licenses can be updated immediately.<br />• Machines that have Capella Products that are Online<br />Activated should remain connected to the internet. If disconnected, the license will continue to work until the end of the Grace Period (2-3 days), during this time users can reestablish their internet connection.<br />• If the machine is rebooted while in Grace Period, Capella<br />Product licenses no longer work. The licenses will need to be re-activated via the Online Activation procedure.<br />• For Cluster and FTC that are installed onto Virtual Servers,<br />the virtual machines should have a single network adapter and TCP traffic must be enabled (allowed through security group setting/firewall) between the Cluster and FTC.<br />• Uninstalling the Floating License Server will automatically<br />deactivate the license. Capella products that were clients of the Floating License Server will automatically go into a 7-day grace period. Installing and reactivating the Floating License Server license again should allow clients to re-establish the connection for the licensing link.<br />• Server sync may not update the number of clients/license<br />a floating server has. To workaround this, you will need to manually re-activate the key on the floating server. | 11819, 11826, 12275, 14409 |
| License | We support grace period of 10 days after license has | 16012 |
| (Activation/Cryptlex) | suddenly invalidated or fingerprint changed.<br />But, if the machine reboots during grace period (GP) state, then upon boot the License Manager UI will not show the GP state. However the license is in GP state internally. |  |
| License (USB) | Changing the computer clock forwards beyond actual real world time can affect the duration of the license validity when you clock is rolled back. If you are running into an issue with the dongle license, please contact Capella. | 6111 |
| License (USB) | After USB dongles are remotely updated, it is recommended that the Cambria machine be rebooted so that the new license features and job queuing functions can apply. | 5173 |
| License (USB / | If the hardware or software license is not plugged in, File | 3874 |
| Software) | Convert will fail to encode when the “Convert All Jobs” button is clicked. Plugging in the license at that time will not allow you to bypass the error.<br />Workaround: Save the project and close and reopen the project with the license plugged in. |  |
| Migration Issues | Cambria Manager information such as Watch Folder, Job, and Settings are not guaranteed to remain after upgrading from an older build to a newer build. It is recommended to save these settings before updating Cambria. | 8885 |
| Windows | Disable Microsoft Window’s Hibernate/Sleep mode | 8957, |
| Component | 9046 Cambria Cluster does not support Microsoft Window’s Hibernate/Sleep mode. If a computer goes into Hibernate/Sleep mode while Cambria Cluster, some functions of the application may not work properly.<br />Recommendation: Disable Hibernate/Sleep on the<br />Cambria machine:<br />1. Go to Control Panel&gt;Power Options<br />2. For the selected preferred plan, select ‘Change plan<br />settings’<br />3. Select ‘Change advanced power settings’<br />4. Go to Sleep&gt;Allow hybrid sleep<br />5. Change the setting to “On” (this change will disable the<br />Hibernate option in the start menu)<br />6. Go to Sleep&gt;Hibernate after<br />7. Change the setting to “Never” (this change will keep the<br />system from Hibernation when it sleeps) | 9046 |
| IMF Editor Tool | IMF Editor Tool (Purchase Option)<br />Generate Interoperable Master Format Packages with this tool.<br />The IMF tool allows for Clip Lists to be created from video/audio files. A Clip can be used to create Application #2 compliant output. | 10852 |
| Cluster Settings | Limitations:<br />- No Metadata entry (language, title, description, etc)<br />- No compliance checking is done to make sure that video<br />and audio durations match. (It is recommended that this is checked by the user)<br />- No automated workflows (watch folder, script/template)<br />- no upload, post-task, script, notification, filters, etc<br />- Does not support re-import/modifying existing IMF<br />- Does not support captions<br />- Does not support source trimming<br />- Does not support video previews |  |
| Watch folder input | and output locations should be a shared network location so that al<br />machines can acces<br />s the folder location through a shared network path. | l cluster |
| Please refer to th | e ClusterInfo&Troubleshooting.pdf file for more information on Cambr | ia |
| Cluster. This docu | ment is included in the Cambria Cluster installation package. |  |
| REST_API_(File Con | vert/Cluster) |  |
| Please refer to th | e REST_API_FileConvert.pdf file for more information on API for Camb | ria File |
| Convert and Cluste | r. |  |
| Please also note t | hat API Samples are included in the FTC_APISamples package.<br />Here is the link:<br />https://www.dropbox.com/sh/lc5y7mzwp73vclf/AAAGgOdY_JyxOf8LCjHtSNPXa?dl=0 |  |
| REST_API_(Cluster | Replication) |  |
| Please refer to th | e REST_API_Replication.pdf file for more information on API for Camb | ria |
| Cluster Replicatio | n.<br />Here is the link:<br />https://www.dropbox.com/sh/lc5y7mzwp73vclf/AAAGgOdY_JyxOf8LCjHtSNPXa?dl=0 |  |
| Scripting Guide_(F | ile Convert/Cluster) |  |
| Please refer to th | e Scriptable Workflow Guide.pdf file for more information on how to<br />and test Target Pr<br />eset scripts.<br />Here is the link:<br />https://www.dropbox.com/sh/lc5y7mzwp73vclf/AAAGgOdY_JyxOf8LCjHtSNPXa?dl=0 | develop |
| REST_API_(Floating | Server Manager) |  |
| The Floating Serve | r Manager API is available upon request. |  |
| Email your request | here:<br />support@capellasys<br />tems.net |  |
