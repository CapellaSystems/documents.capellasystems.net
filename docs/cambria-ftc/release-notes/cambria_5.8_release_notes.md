# Cambria 5.8

**Release Notes Updated (06/30/2026)**

**Release Build 5.8.0.31576 Release (and 5.8.0.x Branch Builds)**

Release notes cover Cluster, FTC, FTC API Packager, Cluster/FTC Linux & Kubernetes

### Notice: Older NVIDIA GPU Architecture Deprecation Notice

Support for older NVIDIA GPU architectures will be deprecated in a future release. Future releases will require Turing or newer GPUs as the minimum supported architecture.

### Notice: Removal of Cloud Extend Storage

As MinIO has discontinued support for the filesystem backend functionality leveraged by Cluster’s CloudExtend features, the CloudExtend Storage feature (used for simplified on-premise storage mapping) will be removed from Cluster. Version 5.6 will be the last release to support this functionality.

### Notice: EZTitles plugin has reached the end of its life-cycle

- The Capella EZTitles plug-in will no longer be in active development because the plug-in product has come
to the end of its life-cycle.

- EZTitles will no longer provide customer support for the plug-in, although existing installations are
expected to continue to work at this time.

- Please contact Capella with your caption/subtitle requests.
### Notice: Removal of non-HTTPS APIs

- The methods of the API must be executed using HTTPS. HTTP has been removed and will no longer work.
To use HTTPS, simply use the “https://” prefix instead of the “http://” prefix for the URIs. For FTC the port number used for HTTPS methods is 8648. For Cluster the port number used for HTTPS is 8650.

- SNMP support for Cluster/FTC was using non-HTTPS API. For the 5.1.0.12651 build of Cluster/FTC, SNMP
has been disabled. We will look into adding support back in for a future build.

### Important notes about the PostgreSQL upgrade

- Database migration between Postgres 9.3 and 14.3 is not automatic
- Installing Cluster/FTC ver. 5.0 will come with a clean Database (Postgres 14.3)
- If you are upgrading from FTC versions 4.8 (or lower) to 5.0 then Postgres 9.3 will still be installed on the
system, which will be used to migrate all of the information to Postgres 14.3

- Only migration from Postgres 9.3 (FTC versions 4.8 or lower) to Postgres 14.3 (FTC 5.0 and above) is
supported.

- Please read the migration document below on how to migrate the database:
https://www.dropbox.com/s/otias8vdolo6215/Postgres%2014.3%20Migration%20Document.pdf?dl=0 Downgrading note: Downgrading from FTC 4.5 (or higher) to FTC 4.0 is not supported

### Important Licensing notes

- If you are using a build older than Floating License Server 4.5 or Cluster/FTC 4.5, there is a good chance the
online activation license has stopped working sometime after May 2021.

- If you are using Cluster/FTC without the Floating License Server, then all you will need to do is update
Cluster/FTC to v4.5 or higher.

- If you are using Floating License Server then you will need to update to v4.5 or higher and Capella will
need to issue you new Activation Keys.

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

To add a user to local administrator: Run lusrmgr.msc, go to Groups -&gt; Administrators, Add that user to this group.

### Service Credentials

After installation check the Capella CpServiceManager (File Convert) or CpClusterManager (Cluster) service! These services will need to have the appropriate access rights to read from and write to network file locations. Here are the instructions on how to modify ‘Capella CpServiceManager’ service credentials.

   a. Open the Services panel (Control Panel&gt;Administrative Tools&gt;Services)
   b. Open Properties panel for Capella CpServiceManager
   c. In the Log On tab, select “This account:”
   d. Enter the full domain account and password. (ie. Yourname@company.com)
   e. This domain account must have access rights to the locations
   f. Restart the service as prompted
### Windows Virtual Memory Setting

To prevent some memory allocation errors that can occur, we recommend changing a Windows Virtual Memory setting to allow for “System managed size”.

   a. Open up to the Advanced tab in the System Properties panel
(Control Panel&gt;System and Security&gt;System&gt;Advanced system settings)

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
- Dolby Vision Live Distribution Processing
Manufactured under license from Dolby Laboratories. Dolby and the double-D symbol are trademarks of Dolby Laboratories

## New Features

### New Features added for 5.8

```text
Features listed include all of the new features added for 4.x, 5.x up to 5.8. Please note that some of
these features are in a beta state.


 Module             Feature                                                                    Capella
                                                                                               Reference #
 Filter             Expanded Subtitle Inject Input Formats for 608 Captions                    21250

                    The Subtitle Inject video filter now supports additional caption file
                    formats when generating embedded 608 captions.

                    Supported input formats for creating 608 output: SCC, GLA,
                    TTML, XML, SRT, STL, PAC, and VTT.

 Filter             SCTE-35 Inject Option to Preserve GOP Timing                               21626

                    Support added for controlling whether the SCTE-35 Inject filter
                    starts a new GOP at SCTE-35 marker positions. This helps
                    workflows that require fixed keyframe timing, such as
                    maintaining IDR frames at regular 2-second intervals while still
                    inserting SCTE-35 ad signaling.

                    Usage: In job XML, set SCTE35StartsNewGOP for the SCTE35
                    Injection filter to control whether SCTE-35 markers start a new
                    GOP.

                    Notes: This option is API/job XML only and is not exposed in the
                    UI.

 Filter             Subtitle Burn-In Font Styling                                              22062

                    The subtitle burn-in filter now supports font styling, including font
                    color, edge color, bold, underline, italic, and transparency. This
                    makes it possible to control subtitle appearance directly from the
                    FTC subtitle filter settings.

                    Notes: For DVB Subtitle Burn-in, the styling applies when Burn-in
                    Mode is set to Version 2. The related DVB Subtitle Inject filter
                    also exposes these styling options in the FTC tab.


 JobXML             Audio Normalizer Loudness Log Output                                       21642
 Submission
                    JobXML only feature that enables loudness logging option for the
                    Audio Normalizer filter. When LoudnessLog="1" is added to the
                    Audio Normalizer filter settings in the job XML, FTC generates a
                    CSV loudness log in the output location.

                    The log includes loudness information for the original and
                    converted audio over time, including original and converted
                    loudness values. Generated LoudnessLog CSV filenames now also
                    handle Korean characters correctly.
```

```text
             Usage: Add LoudnessLog="1" to the Audio Filter - Normalizer
             filter settings in the job XML.

             Note: Some fields from the customer’s reference log format are
             not available from the normalizer filter, including source/output
             dialnorm level and source/target codec information.

JobXML       XML File Operation Jobs                                             21798
Submission
             FTC now supports file operation jobs in XML for Copy and Move.
             Use <Job Type="FileOperation"> with <Operation Type="Copy"
             /> or <Operation Type="Move" />, then define the source and
             destination locations in the job XML.

             Notes: This is XML-only and has no UI.

WebUI        Queue Jobs to Remote Machine                                        21321

             Cambria FTC now includes WebUI options to queue all jobs or
             selected jobs to a remote FTC/Cluster machine. You can enter a
             machine name, hostname, IP address, or a full API endpoint such
             as https://10.0.0.24:8648/CambriaFC/v1/Jobs or https://api.myh
             ost.com/CambriaFC/v1/Jobs/?usertoken=myusertoken.

Manager /    Web UI S3 Browser                                                   21944
WebUI
             A new S3 browser is available from the Job Creator folder icon,
             allowing users to browse an S3 location using the entered Access
             Key and Secret Key.

             Notes: Credentials are used for browsing and are not saved.

Manager /    Web UI Simulated Jobs for Testing                                   21682
WebUI
             The Job Creator page now includes options to queue 1-minute
             and 10-minute simulated jobs from the FTC/Cluster Web UI.
             These fake jobs are useful for troubleshooting and quick testing.

             Notes: The simulated jobs appear in the preset list as 1-Minute
             Simulated Job and 10-Minute Simulated Job.

Manager /    Web UI Filters / Fields                                             21679,
WebUI                                                                            21675
             Job ID Filter
             The FTC/Cluster WebUI search box can now filter jobs by exact
             job ID. Enter the full job ID to narrow the list to that job.

             Machine RAM Display
             The Machines list now shows the reported RAM value for each
             machine. This makes it easier to review system memory
             information directly in the WebUI.

Linux /      Updated Kubernetes Diagnostic Script for Manager and                21672
Kubernetes   Ingress Changes

             Updated support for the current Kubernetes deployment layout.
             The script now checks the capella-manager namespace for
             Manager components and uses traefik for ingress-related
```

### New Features added for 5.6

```text
                information instead of the previously used ingress-nginx.

                Improvements also include AWS EKS reporting by attempting to
                resolve an ingress hostname to an IP address when the ingress
                exposes a hostname instead of a direct IP.

Windows         Windows Smart App Control-Compatible Signed Installers                21945

                Release builds are signed Windows installer builds using Microsoft
                Azure Artifact Signing, also known as Microsoft Trusted Signing.
                Signed builds help prevent Windows 11 Smart App Control from
                blocking Capella installers and application binaries with warnings
                such as “Smart App Control blocked an app that may be unsafe.”

                Signed builds include Capella executables, DLLs, redistributable
                files, and MSI installers required by the application package. This
                is especially important on new Windows 11 installations where
                Smart App Control may block unsigned installers or dependent
                binaries.

                Note: Capella cannot retroactively sign previously released
                builds; older builds must be rebuilt and redistributed to include
                signing. We recommend updating to the latest release version
                first.





Module          Feature                                                               Capella
                                                                                      Reference #
Filter          Subtitle Inject Filter                                                19954

                Added a new DVB Subtitle Inject filter to allow DVB subtitle
                streams to be injected into the output from subtitle files.

Target (H.264   NETINT VPU test module (Akamai Cloud)                                 20998
-VPU)
                If you’d like to test the new VPU module, please contact us at:
                https://www.capellasystems.net/contact-us

                In FTC the VPU is used for hardware acceleration of H.264 video
                encoding. Testing may require a new build of the software.

Target (AV1)    Added support for Film Grain Denoise in MP4 AV1 encoding with         21092
                two new settings that reduce film grain and allow adjustment of
                levels.

(Linux /        On-prem Kubernetes Support                                            20593
Kuberenetes)
                Canonical Kubernetes for on-premise is now supported for
                Cambria FTC. All machines that are part of an on-premise
                Kubernetes deployment must use Ubuntu as the Linux
                distribution. The tested Linux distribution is Ubuntu 24.04. For
                high availability, at least 3 machines are required and must
```

### New Features added for 5.5

```text
                be designated as control plane nodes. For Cambria Cluster
                manager redundancy, it is recommended to have at least 3
                dedicated worker machines separate from
                the control plane nodes.

                There are some notable currently unsupported features: FTC
                Autoscaler, GPU and VPU support.

                Document link:
                https://www.dropbox.com/scl/fi/b4hofqgc8r3yp1plftmwo/Cambri
                a_Cluster_and_FTC_5_6_0_on_On_Premise_Kubernetes.pdf?rlke
                y=raeaiu9tnpmwlh942kfa3kz14&st=prmaws1c&dl=0

Windows         Use External PostgreSQL 14 installation method                21239

                Please email support@capellasystems.net if you would like
                instructions for this.





Module          Feature                                                       Capella
                                                                              Reference #
Source          Support Blackmagic RAW (braw) sources                         19232
(Blackmagic
RAW)
Target          GPU support for AWS EKS machines                              19770
(NVENC)
Target          8K support added to HEVC (NVENC) for ABRv2                    18506
(ABRv2)
Target          Add XAVC-Intra encoding to Elementary Stream exporter         20245
(Elementary
Stream)
REST API        Setting Tag based slots at boot                               18756

                Added to API documentation in GET/SET CambriaManagerOptions

(Linux /        Oracle Kubernetes (OKE) supported                             20351,
Kuberenetes)                                                                  19817

(Linux /        Oracle Object Storage support (through S3 interface)          19971
Kuberenetes)
(Linux /        Installation via Terraform added                              19947
Kuberenetes)
(Linux /        IAM role used for Auto-scaler permissions and Loki on         20469
Kuberenetes)    AWS
```

### New Features added for 5.4

```text
Module           Feature                                                        Capella
                                                                                Reference #
Linux (Docker    Base image for docker container updated to use Ubuntu 24.04    19613
Installation)

Source (R3D)     RD3 source decode support                                      19327

                 Cambria FTC can now decode R3D files (Windows only)

                 Notes:
                 - Windows only
                 - Due to limitations with the R3D SDK, these files are not
                 supported via cloud storage platforms like S3

Target (DV5)     Encoding to Dolby Vision Profile v5 (DV5) is now               18956
                 supported in TS, MP4, ABRv2 (DASH, HLS/fmp4, CMAF)
                 containers

                 Note: Sources are required to be HDR (HLG, PQ, HDR10 color
                 spec) to encode to DV5. Jobs with Non-HDR sources will fail
                 when encoding to DV5.

Target (WAV)     WAV Exporter: CART Chunk Metadata support                      19528

                 API job submission only. CART Chunk metadata can be added to
                 ‘wav’ XML job. Here are the attributes supported in the
                 MuxerSettings for this:
                 "WriteCart"
                 "CartTitle"
                 "CartArtist"
                 "CartCutID"
                 "CartClientID"
                 "CartCategory"
                 "CartClassification"
                 "CartOutCue"
                 "CartStartDate"
                 "CartStartTime"
                 "CartEndDate"
                 "CartEndTime"
                 "CartProducerAppID"
                 "CartProducerAppVersion"
                 "CartUserDef"
                 "CartLevelReference"
                 "CartURL"
                 "CartTagText"

                 For dates, format is yyyy/mm/dd
                 For times, format is hh:mm:ss

Target (audio)   Audio Language Code passthrough                                18445

                 Audio Language Code (ISO 639-2) can now be passed through to
                 the output by setting the audio language to 'src'.
```

```text
                  Note: Only certain containers allow for this to work (TS, MP4,
                  MOV).

                  Note: Known limitations / unsupported cases:
                  - audio passthrough
                  - audio remapping filter
                  - audio mapping
                  - using additional audio sources (eg separate .wav files)

Target            Specifying Multiple DVB Subtitle PIDs                                 19014
(Subtitle –
DVB)              There is now a way to specify multiple DVB subtitles by their own
                  PID instead of the PID being set in sequential order. This can only
                  be set by editing
                  a job XML directly for use with Cambria FTC API. In the
                  <MuxerSettings>, set the attribute 'DVBSubtitlesPIDX' to the PID
                  that the output track should be. See the following example,

                  <Job><Settings><MuxerSettings DVBSubtitlesPID="650"
                  DVBSubtitlesPID2="660" DVBSubtitlesPID3="670"
                  ></MuxerSettings>

                  Note: If no DVBSubtitlesPID is specified for a track, that output
                  track's PID will be: FIRST TRACK PID + TRACK NUMBER – 1

Target            WEBVTT alignment setting added                                        19014
(Subtitle –
WEBVTT)           Overriding the default alignment of WEBVTT subtitles is now
                  possible.
                  "align:center"
                  "align:start"
                  "position:30% align:start" - position moved 30%

                  Setting added to Subtitle Stream Settings.




Target (GPU       Machines with multiple NVENC GPU cards supported                      19362
acceleration)

Target            OCR enhancements                                                      19654,
(Analysis                                                                               19507
Exporter -        - Tooltip added to ‘Language’ field to indicate what language
OCR)              codes to use
                  - Mixed English and Japanese text support

Filter (Speech-   Speech-to-text enhancements/fixes                                     19640,
to-text)                                                                                19629,
```

<!-- ![Release notes image from page 9](images/release-note-image-000.png) -->

### New Features added for 5.3

```text
                 - .vtt and .srt output fixed to work with VLC playback              19628,
                 - Filter removed from target side filters                           19627,
                 - AVX2 is required to use this feature, improved error added        19433
                 - String replacement supported for output filename
                 - input field "Language" was added to allow the user to specify
                 the expected language to detect in the audio

Filter (Blur     Blur strength increased                                             19309
Face)

S3 / Post Task   New XML attribute added: ContentTypeOverride                        19269
Upload
                 API job submission only. The new attribute
                 "ContentTypeOverride" allows you to set the content-type for S3
                 uploads.




WebGUI           WebUI Preset Editor enhanced                                        19029

                 Target Preset Editor for the WebUI updated to be more in-line
                 with the Preset Editor for the Application UI.

                 Note: Functions such as video/audio filters, scriptable workflow,
                 post task commands cannot be configured through the WebUI
                 Preset Editor. If these functions are needed, we recommend using
                 the Windows application UI to create JobXML templates for API
                 submission.





Module           Feature                                                             Capella
                                                                                     Reference #
Source (Dolby    Dolby Vision Module Updated                                         18478,
Vision)                                                                              18457
                 The updated version supports using Dolby Vision MOV as sources.
```

<!-- ![Release notes image from page 10](images/release-note-image-001.png) -->

```text
Source         Read sources directly from Azure Blob storage (JobXML,                18991
(Azure)        API only)

               To use this feature, the following is needed:
               1. Url to the source (Eg.
               https://myuserstorageaccount.blob.core.windows.net/my_contain
               er/my_source.mp4)
               2. SAS credentials for the source

               Example of Azure Blob storage url in JobXML (Note: replace the
               'https://' in your url with '[azure]'):
               <Source
               Location="[azure]myuserstorageaccount.blob.core.windows.net/
               my_container/my_source.mp4" Name="Src1"/>

               The SAS token will go in the <JobDescr /> tag like this:
               <JobDescr Description="FTC UI (Preset: DASH)"
               azure_blob_sas="<my-azure-blob-sas>">

               Notes:
               - The SAS token must have at least Read and List permissions

               How to get URL and SAS Credentials:
               To get the url, click on the source in Azure Blob storage and copy
               the URL property in the "Overview" section.
               To get SAS credentials, click on the source in Azure Blob storage
               and go to the "Generate SAS" section.

Target (Post   Upload to Azure Blob Storage                                          19040
Task Upload,
Azure)         In FTC Post Task, there is now an Azure Blob storage upload
               option that allows you to specify the following:

               Storage Account Name: The Azure Blob Storage account name
               (under the 'Storage accounts' section of Azure)
               Container: The name of the container to output to (under
               'containers' in the storage account page)
               SAS Token: access token to the container (can be generated
               through the container's option 'Generate SAS')
               Block Size: the upload chunk size (in kilobytes). Azure limits this
               to 50 GB per file

               Notes:
               - SAS token must have write permissions to the container
               - The Storage account needs to have "Allow storage account key
               access" enabled. This setting can be found in the Storage
               account's Settings > Configuration section
               - Currently, writing directly to Azure Blob storage is not
               supported

Target (GPU)   Supported added for using multiple NVENC cards on a                   19030
               single machine

Target (GPU)   8K support enabled for NVENC jobs                                     18506

Target         Split and Stitch                                                      19321,
                                                                                     14850
               A job/source can be split into multiple video segments and one
```

```text
               audio file. The job segments are distributed to multiple machines
               to encode. Once the segments are complete, they are stitched
               together to create the final output, as if it was transcoded in one
               machine.

               The temporary files are written to a user-configurable location
               called the WorkFolder.
               In Cambria FTC UI (not the Cambria Manager UI) you can specify
               this location in Settings > Options > Split And Stitch Options.
               For Windows, you can run regular jobs as "split and stitch" jobs
               by selecting the "Queue All Jobs" dropdown and selecting either
               "Queue All / Split And Stitch" or "Queue Selected / Split And
               Stitch".

               In JobXMLs, to specify that a job should be in "split and stitch"
               mode, set the Type attribute in the <Job></Job> tag to
               "SplitAndStitch". Also, set the attribute SegmentDurationSec to
               the amount of seconds
               to split each segment and WorkFolder to a shared location where
               the segments will be written to.

               Sample Job Tag:
               <Job SegmentDurationSec="30" Type="SplitAndStitch"
               WorkFolder="C:\Temp"></Job>

               For Cloud/S3:
               <Job SegmentDurationSec="30" Type="SplitAndStitch"
               WorkFolder="[s3]mybucket@us-east-
               1:SplitAndStitchTest/Segments"></Job>

               Known Limitations (does not work with Split and Stitch):
               - Frame Rate Conversion
               - Adaptive Streaming Output
               - Audio mapping jobs
               - Jobs with more than one segment configured
               - Stitched sources
               - Multi-Target jobs
               - Not All Video Filters work
               - Watch Folder
               - Job Tags (Cambria Cluster)
               - Audio Only Jobs

Target         Analysis Exporter Enhancements                                        18768,
(Analysis)                                                                           19007,
               - Detect Video Cadence                                                18959
               - Find Faces
               - Improved OCR (Text Recognition)
                 Note: The new OCR feature requires additional files to be
               installed into C:/Program Files (x86)/Capella/Cambria/cpx64

               Please contact support@capellasystems.net to request for the
               additional files.

Filter (Blur   Blur Faces Filter                                                     19007
Faces)
               There is a new video filter "Blur Faces" which places a rectangle
               around faces and basically blurs them. Users can adjust how
               much the faces are blurred (strength) and the confidence level
```

```text
                 threshold that determines whether something in the video is a
                 face or not.

                 Notes:
                 - The lower the threshold, the more likely faces will be blurred.
                 However, currently there is a higher chance other objects will also
                 get blurred with lower thresholds.
                 - Works well with faces further out in the frame. Faces may still
                 recognizable when close to the camera.

Filter (Speech   Speech to Text Filter                                                               18932
to Text)
                 New filter added that allows for text to speech in the following
                 formats: .xml, .vtt, and .srt.

Filter           Nexguard SDK version update to 1.18.0. With that, Linux now                         19134
(Nexguard)       supports Nexguard video filter.

                 Locations to add the Nexguard license:
                 Windows (FTC): C:\Program Files (x86)\Capella\Cambria\cpx64\NexGuardV2
                 Windows (Cluster): C:\Program Files (x86)\Capella\CambriaCluster\cpx64\NexGuardV2
                 Linux (FTC): /opt/capella/Cambria/bin
                 Linux (Cluster): /opt/capella/CambriaCluster/bin

WebGUI           WebUI Preset Editor (Beta)                                                          18711

                 The preset editor was added to the Cambria FTC/Cluster WebUI.
                 This only includes encoding configuration and not all encoding
                 target/settings are included. Functionality such as filters, post
                 task delivery, notifications cannot be configured through the
                 preset editor at this time.

Licensing        Enhancement for Cryptlex error handling                                             18499

                 Reactivation retry implemented for unexpected fail case.

Licensing        Fully Redundant Licensing for Hosted (and Hosted Floating                           19313,
                 Server) Licenses                                                                    19292,
                                                                                                     18514
                 This feature is only supported for Hosted Licenses and Hosted
                 Floating Server Clients. Requirement is to whitelist this IP:
                 54.241.85.49

                 If the machine loses connection to cryptlex (i.e. cryptlex server
                 goes down, etc) then backup licensing will keep the machines
                 license active. Other scenarios of sudden invalidation or grace
                 period is over are also covered by the backup licensing server.

                 Hosted Floating Server Clients
                 Please note that this feature is ONLY for the clients and not the
                 Floating License Server itself.
                 In the case when the floating server license unexpectedly
                 invalidates, then currently connected and leased client machines
                 will continue to be operational because of the backup licensing
                 support.

                 Notes:
                 - This feature works for Hosted Floating Server Clients but not the
                 Floating License Server itself.
```

### New Features added for 5.2

```text
                - Testing to make sure 54.241.85.49 I reachable.
                  ping cpfs.capellasystems.net
                    or
                  wget https://cpfs.capellasystems.net:8481/ ===> should get
                xml (it will states an error but enough to check connectivity)


Security        Support for TLS 1.2 added, TLS 1.1 and 1.0 is disabled                 18828

                TLS 1.2 is the minimum version needed to negotiate SSL.





Module          Feature                                                                Capella
                                                                                       Reference #
Filters         Added Video Denoiser Filter                                            18321

                Filter added to remove grain/noise from video.

Filters         DFXP Support added for Burn-in Filter                                  18241

Scriptable      Security Enhancements affecting executables used in Jobs               18370,
Workflow/Exec   and Perl scriptable workflow scripts                                   17658
utables
                Starting in 5.2 release, any executables (post-taks, notifications)
                or Perl scripts (scriptable workflow) used as part of a Job must be
                trusted by the machine executing the Job.

                Have your IT department review this document to determine if
                you want to use this feature, and if so to assist with usage of this
                feature

                The reason why executables and scripts need to be trusted is to
                ensure that only authorized programs are executed on a machine.
                When a script or an executable is registered as trusted, it means
                that the user or the system administrator has explicitly allowed it
                to run on the machine. Without this trust, any script or
                executable could potentially run on a machine, including those
                that are malicious or harmful.

                By registering trusted executables and scripts, organizations can
                ensure that only authorized programs are executed on their
                machines, thereby reducing the risk of malware infections, data
                theft, and other security breaches. Additionally, the trusted list
                can help prevent unauthorized modifications to scripts or
                executables, as any change to the program will change its
                SHA256 hash, requiring the trusted list to be updated.

                Overall, the registration of trusted executables and scripts is an
                important security measure that helps to mitigate the risk of
                security incidents caused by malicious programs, and
```

```text
             organizations should take this process seriously to ensure the
             safety of their systems and data.

             Here are some instructions for using the features described:

             Registering Trusted Executables:
             To register a trusted executable on a machine, follow these steps:
             a. Generate the SHA256 hash for the executable file you want to
             register.
             b. Open the registry editor by typing "regedit" in the search bar
             or the Run dialog box (press Win+R).
             c. Navigate to the following registry key:
             HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\CAPELLA\CA
             MBRIA.
             d. Create a new string value called "TrustedAppSHA256".
             e. Set the value of the "TrustedAppSHA256" to be the SHA256 of
             the executable, separated by commas if there are multiple
             executables.
             f. Repeat these steps for each machine where you want to
             register the trusted executable.

             Alternatively, you can create a .reg file with the SHA256 of the
             trusted executable and run it as administrator on each machine
             where you want to register the executable.

             Registering Trusted Perl Scripts:
             To register a trusted Perl script, follow the same steps as above,
             but use the "TrustedScriptSHA256" registry key instead of
             "TrustedAppSHA256". Note that any changes made to a Perl
             script will change its SHA256, so the trusted list will need to be
             updated accordingly.

             Using Python Scripts:
             Python scripts are executed in a sandbox, so they don't need to
             be registered as trusted. However, they will not have access to
             the network, which can be necessary for some workflows.

             Security Considerations:
             It's important to note that any trusted executable will be allowed
             to be called with different arguments, so users need to make sure
             that trusted executables can't cause any damage with other
             arguments. For example, if a trusted executable takes a file name
             as an argument, it should check that the file is of the expected
             type and doesn't contain any malicious code. Similarly, if a Perl
             script takes user input, it should validate the input to prevent
             injection attacks. If network access is not needed, it's
             recommended to use Python scripts instead of Perl scripts to
             reduce the risk of security issues.

             Please contact your IT department to assist with properly
             identifying which executables and scripts may be risky.


Kubernetes   AWS Kubernetes Support                                               18280

             Link to installation guide:
             https://www.dropbox.com/scl/fi/xt7vj917tg9bejo0r6x8d/Cambria
```

### New Features added for 5.1

```text
                _Cluster_and_FTC_RC1_5_2_0_on_AWS_Kubernetes.pdf?rlkey=z
                r11ja7gk7fkh37ucw7nw4dsl

Kubernetes      Argo Events to FTC Job                                                 17939,
                                                                                       18136,
                Argo Events can be used to trigger FTC encoding jobs.                  18270

Kubernetes      Akamai NetStorage Watcher                                              18275,
                                                                                       18220
                NetStorage Watcher can be used with Argo Events (webhook) to
                trigger FTC jobs. This adds “Watch Folder” like functionality.

Linux           Upgrade to PostgreSQL 15                                               18280





Module          Feature                                                                Capella
                                                                                       Reference #
Source          HEIC source support added                                              17273

Source          12 bit DPX source support added                                        17165

Source          Preset Creation function expanded to support MXF, DNxHD,               17417
Analysis        ProRES, IMX, XDCAM HD

Target          MPEG-2 Transport Stream supports writing                               17524
(Transport      AU_information into output file/frames
Stream)
                This setting can be turned on for the preset through the
                Container Format Settings for the Target Preset. Required to
                support DVB-AU spec. May be needed for some parsers/players.

Target (MXF)    Closed Captions settings added to MXF exporter                         17432

                Both the Video Settings and Container Settings area for a MXF
                Target Preset now contain a Closed Captions setting which will
                allow CEA-708 to be used.

Target (HLS)    TTML support for MSS added                                             17219

                TTML Support for MSS was added, both for Sidecar and
                Embedded cases. Currently, we only support embedding / sidecar
                with an external Subtitle file.

Target (AVID    XAVC 300 and 480 support was added to the AVID                         15407
AAF)            exporter

Target          Segmenter Exporter                                                     17287
(Segmenter)
                This exporter allows the user to partition their video into multiple
                files based on a user configured Segment Duration.
```

```text
Filter (Subtitle   SCC caption file format supported by Subtitle Inject filter            17589
Inject)
Watch Folder       Smart Watch Folder Enhancements                                        16443,
                                                                                          16546,
                   In the Watch Folder Source Acceptance section, ‘Source is a            16545,
                   group of files’ feature has been updated with 3 new workflow           16544,
                   functions.                                                             17440,
                                                                                          17195,
                   - Use Workflow Job                                                     17016
                   - Dynamic Grouping (Parse XML to find associated files)
                   - Passthrough those files to create an ABR output

                   Use Workflow Job
                   Enables the ‘Scripts Settings’ function on the Encoding Tab that
                   will allow for Jobs to be created via a Workflow Script. This will
                   enable a Job to include functions for decision making and various
                   tasks (encoding and administrative) to be part of the Workflow
                   Job.

                   Dynamic Grouping (Parse XML to find associated files)
                   Allows for the Dynamic Grouping Script to be used instead of
                   Filename Matching Criteria for groups of files.

                   Passthrough those files to create an ABR output
                   Sets the Filename Matching Criteria to look for multiple video files
                   that will be used as sources for an Adaptive Streaming
                   (Packaging Only) Job.

Cambria            Status and Summary section added to Watch Folder tab                   17444
Manager
(Watch             These sections allow for users to get more information about the
Folder)            current status of a watch folder, what process is currently
                   running, etc.

Cluster            User configuration for ‘Number of Urgent Jobs’ in Cluster Manager      17045
Manager
Web UI             Add/Remove Machines from Cluster function added                        17597

Linux              Cluster / FTC Linux Document                                           17738

                   Linux startup guide has been updated with a new Vulnerabilities
                   Information section.

                   Link to Cluster/FTC 5.1 Linux startup guides:
                   https://www.dropbox.com/s/236y5m30jde54s0/Linux_FTC_Guide
                   _5.1.0.pdf?dl=0

                   https://www.dropbox.com/s/crprvyzl2etlabo/Linux_Cluster_Guide
                   _5.1.0.pdf?dl=0

                   Latest Version (9/08/2023):
                   https://www.dropbox.com/scl/fi/mf9h58uip3nalt42591j5/Linux_C
                   luster_Guide_RC1_5.2.0.pdf?rlkey=1a46fg2hok6n1smw5pa2n842
                   e

                   https://www.dropbox.com/scl/fi/0msy7rj48ktmmmcou5h23/Linux
                   _FTC_Guide_RC1_5.2.0.pdf?rlkey=5lbxzpvcfcrsseg6j9jq69j7u
```

### New Features added for 5.0

```text
Kubernetes      Akamai Kubernetes Support                                              17607,
Support                                                                                17612,
                Cambria Cluster / FTC can be run in an Akamai Kubernetes               17615,
                environment. Currently functionality is limited to API only for Job    17617,
                submissions. API or WebUI can be used to monitor Jobs.                 17618,
                Not all features in the Windows version of FTC are available in        17620,
                Linux. Please reference the latest Linux startup guide for a list of   17621,
                known Linux limitations.                                               17783

                Link to Cambria Cluster / FTC 5.1 installation and help guide for
                Akamai Kubernetes:
                https://www.dropbox.com/s/0uxi0o0tnq9zs66/Cambria_Cluster_a
                nd_FTC_on_Linode_Kubernetes_5.1.0.pdf?dl=0

                Latest Version (9/08/2023):
                https://www.dropbox.com/scl/fi/x1vdb97zac7e2tmyeq2om/Camb
                ria_Cluster_and_FTC_RC1_5_2_0_on_Akamai_Kubernetes.pdf?rlk
                ey=db1sn20pm577zei8lxfslvqow





Module          Feature                                                                Capella
                                                                                       Reference #
Exporter        Fraunhofer FDK encoder                                                 16730
(Audio)
                Added as optional configuration in the audio encoder settings.

Exporter        Adaptive Streaming v2 exporter supports teletext to                    16788
(Adaptive       WebVTT conversion
Streaming v2)
                FTC now supports teletext input for ABRv2 subtitle streams.

                Steps:
                 - Users will need to first add a subtitle track to the ABRv2.
                 - Inside the subtitle track, add individual subtitle streams.
                 - Inside the subtitle stream, specify input type as Teletext.
                 - Specify Teletext Page number for the input.

                Note: Users can find the Teletext Page number by analyzing the
                source either in FTC source analysis feature or using third party
                apps such as MediaInfo.

Filter          Color Conversion filter performance improvement                        16848

                Color Conversion processing improved multi-threading taking
                advantage of systems with more threads (particularly 46 threads
                or more).

Filter          Nexguard A/B Watermarking (requires Nexguard license)                  16350

                Nexguard A/B Watermarking support added to FTCs NexGuard
                filter. Also, a checkbox option can be found in Adaptive
```

```text
              Streaming v2 exporter that can also apply the A/B Watermarking.

Filter        (Beta) Teletext Extractor filter                                    15921

              Enables workflows for converting VBI Teletext from the source to
              OP47 in the target.

Source        (Beta) S3 Requester Pays buckets supported                          16488

              Supported in JobXML through API submission.

              Please contact support@capellasystems.net for info

Cluster       Cluster/FTC network multicast dependency has been                   16589
              removed

              Cluster can use network multicast to automatically detect FTC
              clients. If multicast is disabled after the initial detection,
              Cluster/FTC will still continue to work.

Cluster /     CloudExtend Improvements                                            15884,
CloudExtend                                                                       15895
              - AWS EC2 Credentials and AQS Instance Control settings can be
              exported to save file and reimported.

              - AWS Operations such as (stopping and terminating) are now
              disabled for non-AWS machines.


FLS           API functionality added to register and deregister Licenses         16589,
                                                                                  15867
              Please contact support@capellasystems.net for updated API
              documentation.

Module /      PostgreSQL version updated to 14.3                                  16347,
components                                                                        16972
              Postgres is used by FTC and Cluster has been updated to 14.3
              from 9.3.2.

              Notes:
              - Installing Postgres 14.3 does not replace/remove old 9.3.2.
              Users can remove old version once they migrated. However,
              make sure that old database information is migrated properly.

              - New Postgres 14.3 is not a seamless upgrade and require user
              actions. User is expected to run "PostgreSQLUpdater" to clone old
              database to new database (migration).
              Migration doc link:
              https://www.dropbox.com/s/otias8vdolo6215/Postgres%2014.3
              %20Migration%20Document.pdf?dl=0

              - User may not setup Redundancy across different Postgres
              versions.

Linux         FTC (Linux) Improvements                                            16977

              - Job Tag column added to WebUI
```

### New Features added for 4.8

```text
                - Cluster (running on Windows) can distribute jobs to FTC (Linux)

                Link to FTC 5.0 Linux startup guide:
                https://www.dropbox.com/s/vzyg64o1ec7axld/Linux_FTC_Guide_1.
                1.0.pdf?dl=0





Module          Feature                                                               Capella
                                                                                      Reference #
Linux OS        Linux Support                                                         14892

                FTC can now be installed onto Linux.
                Currently functionality is limited to API only for Job submissions.
                API or WebUI can be used to monitor Jobs.
                Not all features in the Windows version of FTC are available in
                Linux. Please reference the startup guide of a list of known
                limitations.

                Link to FTC 4.8 Linux startup guide:
                https://www.dropbox.com/s/my7m1f4dosvq9ir/Linux_FTC_Guide_
                1.0.pdf?dl=0

                Link to FTC 5.0 Linux startup guide:
                https://www.dropbox.com/s/vzyg64o1ec7axld/Linux_FTC_Guide_1.
                1.0.pdf?dl=0

Target          GPU (NVENC) Acceleration for HEVC Jobs                                16321
(NVENC Video
Encoder)        New video encoder option added: HEVC (NVENC)
                Enables FTC to use specific NVIDIA cards to do accelerated HEVC
                encoding. This encoder option is included as part of the HEVC
                (purchase option).

                Video Settings:
                Profile: main
                Levels: 2.0, 2.1, 3.0, 3.1, 4.0, 4.1, 5.0, 5.2, 6.0, 6.1, 6.2
                Tier: main, high
                Frame Size: 224x126, 320x180, 640x360, 864x486, 1280x720,
                             1920x1080, 3840x2160
                Frame Rate (fps): 23.98, 24, 25, 29.97, 30, 50, 59.94, 60
                Interlacing: Progressive, Upper Field First, Lower Field First
                Display Aspect Ratio: Same as Source, 4:3, 16:9
                Rate Control Mode: CBR, VBR
                Bitrate: User specified: max is 240,000 kbps
                Tuning: High Quality, Low Latency, Ultra Low Latency
                Preset: 1-7: 1 is Low Quality/Fast: 7 is High Quality/Slow
                GOP Structure: I only, IPP, IBP, IBBP
                                 (B frames supported in *Qualified* GPUs only)
                Maximum CPB Size: 1, 2
                IDR Period (GOP Count): User specified: default is 120

                Performance:
```

```text
Quality, Speed, and Number of Concurrent encodes are limited by
the type of Nvidia GPU used. List of features that are influenced
by GPU type:

1: Number of GPUs supported on a single machine
2: Number of concurrent NVENC encodings
3: HEVC B Frame support (B frame in GOP structure)
4: Processing speed of a NVENC encode

7th NVENC Generation (or newer) *Qualified* GPUs are
recommended for better performance and least limitations. For a
list of GPUs, please visit https://developer.nvidia.com/video-
encode-and-decode-gpu-support-matrix-new

The only officially supported card (Capella tested):

*Qualified* GPU

Benchmark:
PNY NVIDIA Quadro RTX 4000
(Machine Spec: 12th Gen i7-12700K, Windows 11)

4K → 4K
Resolution/FPS same-as-source (3840x2160@29.97fps)
Tuning = High Quality
GOP = IBP
Preset (quality/speed) = 3 (default value)
Bitrate=10,000kbps CBR
 Result:
 1 job at 2.89x RT
 4 jobs at 1.13x RT

HD -> HD
Resolution/FPS same as source (1920x1080@29.97fps)
Tuning = High Quality
GOP = IBP
Preset (quality/speed) = 3 (default value)
Bitrate= 5,000kbps CBR
 Result:
 1 job at 8.84x RT
 16 jobs at 1.02x RT

Benchmark Note: Different machine/storage environments may
affect the results. Changes in encoding settings will also affect
results (Ex: 4K@60fps runs 2 jobs at 1.02x RT)

Additional Notes:
- For qualified cards, there's unlimited number of jobs you can
concurrently run.
- For unqualified cards, the limit is 3 (concurrent jobs)
- Unqualified cards we've tested with is Nvidia Quadro P400 and
NVIDIA GeForce GTX 960. These cards cannot do B frames
- GPU is only used for encoding. CPU is used for everything else,
such as decoding, scaling, frame rate conversion, color format
conversion, and any other video filters
- Multiple cards is not supported
- Higher end card does not directly imply better performance. For
details, please consult Capella Support.
```

<!-- ![Release notes image from page 21](images/release-note-image-003.png) -->

```text
Source (DPX)    DPX files can now be loaded without needing the XML file              15994
                descriptor. You can load any of the dpx files in the list and the
                same behavior as the xml file should apply.

Source (Y4M)    Support added for Y4M sources                                         16132

Target          CMAF output added to Adaptive Streaming v2 exporter                   16006
(Adaptive
Streaming v2)   The Adaptive Streaming v2 container now has an option for CMAF
                output. Similar to some of the other Adaptive Streaming v2
                options, CMAF has support for DRM with Fairplay as the HLS
                option and Widevine/PlayReady as the DASH option. You will see
                this as "Fairplay/Widevine" or "Fairplay/Playready".

Target AV1      AV1 video codec option has been added to MP4 exporter                 16343,
                                                                                      15430

FTP Upload      Create subdirectories for FTP Upload with String                      16355
                Replacement Variables

                String replacement variables can now be used in the 'Server' field
                of the Post Task FTP uploaded settings to create subdirectories.

                These string replacements can be used in Post Task FTP config:
                %presetName%
                %sourcePath%
                %sourceName%
                %sourcePath0%, %sourcePath1%, etc
                %projectName%

                If the preset is used in a WatchFolder, these variables will not
                work:
                %presetName%
                %projectName%

Retrieval /     NetStorage support enhancements                                       16342,
Post Task                                                                             16341
Upload          1. Watch Folders can now process a source file directly from
                NetStorage without downloading the entire file to the Watch
                Folder first.
                In the NetStorage retrieval option for Watch Folders, there is a
                new "Process without downloading as a file" checkbox. Selecting
                this setting allows for a local Watch Folder to also "watch" a
                NetStorage location and use sources directly without having to
                transfer it first.

                2. For API users. Added support for specifying the NetStorage
                credentials in FTC JobXMLs.
                The attribute "netstorage_secret_key" in the
                <JobDescr></JobDescr> tag which allows the user to specify
                their NetStorage HTTP API Key for reading files from and
                uploading files to NetStorage, and the format for reading file from
                storage: [netstorage]<netstorage username>@<netstorage
                domain>:<path to the source in netstorage>

                Ex:
                <JobDescr netstorage_secret_key="adfsd">
```

```text
                ...
                <Source
                Location="[netstorage]netstorage_username@netstorage_domai
                n:pathtomyfile/subfolder/myFile.mp4" Name="Src1" />
                ...
                </JobDescr>

Audio Track     Track Name Label added to the Audio Track Mapping dialog box            16155
Mapping         to allow for user description for the various tracks. JobXMLs
                created from these jobs will also contain the description.

Filter (VITC)   Filters added to support VITC generation and extraction                 15958

                There are two new filters added:
                - VITC Generator
                - VITC Extractor

                The generator filter adds VITC specific timecode information into
                the output. The VITC Extractor takes VITC timecode information
                stored in the source and uses it in some way (currently only to be
                reused with the burn-in filter).

                Notes:
                1. In order to use VITC generator, the source needs to have a
                frame width of 720 (if source filter) or target (if target filter)
                2. In the FTC UI, both of the VITC filters don't have any
                configurable options for the filters themselves
                3. For VITC Generator, the source needs to either already have
                timecode embedded or a timecode overwrite filter needs to be
                used alongside it. If using timecode filter, the timecode filter
                needs to activate first. This means the order of these filters
                matters.
                4. For VITC Extractor, the filter needs to be used as a source filter
                (whether it is used directly as a source filter or on the preset
                side).
                5. The only ways to get VITC Extractor works as a target side
                filter is when same as source is used for encoding settings such
                as frame size, frame rate, and interlacing or VITC generator +
                VITC extractor are used
                in the same job in that order (Eg. Job with Timecode overwrite +
                VITC generator + VITC extractor + Timecode burn-in)

Filter          NexGuard v2 filter enhancement                                          15989
(NexGuard)
                In our NexGuard v2 filter, we have now included a way to do
                ClipMark watermarking, along with G2 (which was already there
                before). In order to do ClipMark watermarking, you need an
                appropriate license from NexGuard.

                Licensing note: NexGuard Watermarking V2 For FTC 4.8 has
                changed licenses due to NexGuard (NAGRA) requirements.
                Hence, your existing Nexguard watermarking licenses will not
                work. Please obtain new licenses from NexGuard.
Windows OS      Windows 11 and Windows Server 2022 Supported                            16483
```

### New Features added for 4.7

```text
Module          Feature                                                              Capella
                                                                                     Reference #
Watch Folder    Support encoding directly from S3                                    15841

                When setting up a Watch Folder for Retrieval from S3, you can
                check the ‘Retrieve as S3 shortcut’ option. When you configure
                this setting, instead of moving the entire source file down from
                S3, FTC will create just the shortcut in the Watch Folder. The Job
                that is generated will encode the source directly from S3.

Watch Folder    Support retrieval from S3                                            15739

                Retrieval from S3 has been added as an option that can be
                configured from the ‘Retrievals’ tab for Watch Folders.

Source          Support for AV1 codec files                                          15387

Source          Support for S3 pre-signed URL source                                 15785,
(S3)                                                                                 16072
                "Pre-signed URLs" HTTP-based urls that a user can generate via
                the AWS command-line tool for files on an S3 bucket. These
                URLs can now be added to a FTC job as a replacement to the
                source path.

                Steps:
                1. Get a pre-signed url from the aws command-line or other tool.
                See
                https://docs.aws.amazon.com/AmazonS3/latest/userguide/Share
                ObjectPreSignedURL.html

                2. Edit an existing FTC job or project and add the pre-signed url
                to the location you'd like to use the resource (such as Source,
                Logo Filter source, etc).

                3. If a JobXML, queue the job and check that the job runs
                successfully. If an FTC project, see if the source loads into FTC
                and that it acts similar to what the source would be like in local
                storage.

                Limitation: For Pre-Signed URLs, images cannot be used as file
                sources into FTC because FTC image sources in FTC are decoded
                as a sequence (Limitation).
                Therefore, FTC expects a sequence from the pre-signed URL
                source and it cannot find / import.

Target          Output ATS files                                                     15748,
                                                                                     15812
                This feature is implemented only for H.264 inside TS.
                Transport Stream container now has a new checkbox for "Write
                EBP Markers" in the Container Format Settings section.
```

```text
               When the checkbox enabled, users are able to set EBP GOPS per
               segment and fragment.
               ATS metadata, called Encoder Boundary Points (EBP), are
               injected and carried in the transport stream layer to provide
               adaptive boundary information to downstream processing tasks.

Target         Output HEV1 files                                                 15835

               For x265 HEVC and NTT's HEVC (only for MP4) we can specify
               HEVC Codec Tag for the output file (either HEV1 or HVC1)

Filters        Normalize at True Peak audio sample                               13902
(Normalizer)
               ‘Normalize to True Peak audio sample’ option added to the
               normalizer audio filter.

Filters        EZTitles is supported for Passthrough jobs                        13134
(EZTitles)
Retrieval /    Akamai NetStorage Retrieval and Post Task Upload                  15923,
Post Task      (purchase option)                                                 15864
Upload
               Limitation:
               - Japanese character handling is not currently supported for
               NetStorage upload or retrieval.

               - Progress bar does not complete in a linear way, so may not be
               an accurate representation of upload progress.

Scriptable     Allow user-installed Perl packages and executable (Beta)          15791
Workflow       for use with Scriptable Workflow.

               Please contact support@capellasystems.net for instructions.

Cluster /      Launch function for AWS EC2 instances                             15465
CloudExtend
(AWS)          The CloudExtend tab in Cambria Cluster Manager has this
               function that allows users to launch AWS EC2 instances.
               Instances launched by this function will automatically be
               connected to the Cluster Manager.

               Please contact support@capellasystems.net for instructions.

Cluster /      Automatically Shutdown AWS instances                              15468
CloudExtend
(AWS)          CloudExtend setting allows EC2 instances that are launched by
               Cluster to auto stop or terminated when idle

Cluster /      Tool to dynamically manage number of AWS instances                15469
CloudExtend
(AWS)          CloudExtend setting called ‘Dynamic Instance Controller’ allows
               users to run a tool that can manage automatic launching of AWS
               instances based on:

               - The number of slots specified per machine
               - The number of queued jobs in the Cluster queue list
               - The maximum number of machines specified

               Notes:
```

```text
               - Users can also change the AwsDynInstCtrl tool to any other tool
               that works with AWS instances.

               - For best results, 30 minutes should be the minimum time used
               for the Controller interval.

Cluster /      Configure On Premise storage to become accessible to                 15467,
CloudExtend    AWS EC2                                                              15512
(Storage)
               When this is configured, a MinIO server will run on the Cluster
               machine to allow On Premise storage to become accessible to EC2
               instances.

               Limitation: Scriptable workflow does not work for CloudExtend
               where the jobs run on a machine that does not have direct access
               to the sources, even if the sources are located in a location
               mapped via the "CloudExtend Storage" feature.

Cluster /      Pay As You Go (PAYG) feature has been removed                        15470,
CloudExtend    (10/2025)                                                            13391

               Show Pay As You Go (PAYG) Balance

               The PAYG balance is shown in the "Pay As You Go licensing"
               section on the CloudExtend tab.
               The balance shown is the lowest balance of any machine in the
               Cluster machine list that has PAYG enabled.

Manager        Automatic Job Cleanup                                                13261
Options
               This setting can be found in the Manager, under the ‘File’
               dropdown. You can configure Manager to periodically clean up
               jobs. You can specify what job statuses to clean up and how old
               jobs need to be to be removed.

FTC Packager   Packaging Jobs can be configured and launched from                   15738
               Watch Folder (Beta)

               - There is a new check box to specify "if the incoming group files
               are a part of ABR sources" under Source Acceptance tab. It will
               be only shown when "Group Files" check box is ON.

               - When this check box is ON, group files will be changed to
               "%match%_1.*" ~ "%match%_4.*", and Encoding tab will be
               changed to only accept Packaging action.

               - Packaging action setting allows users to associate files in the
               group with layers of output ABR streams. (when the watch folder
               has files with something like ABCD_1.ts ABCD_2.ts ABCD_3.ts
               and ABCD_4.ts)

               - Once a group of files are dropped to the Watch Folder,
               Packaging action will be kicked in and ABR stream will be
               generated (using passthrough) based on the configuration.

               Notes:
               Since it is passthrough packaging, please make sure each source
               is using different bitrates to avoid conflict between layers. Each
```

### New Features added for 4.6

```text
                 file needs to be GOP synced/aligned. Current packager does not
                 enforce this limitation (it does not show up as an error).

Licensing        Pay As You Go (PAYG) support added to Hosted License                 15777
                 method





Module           Feature                                                              Capella
                                                                                      Reference #
Target (Closed   Closed Caption exporter added                                        15245,
Caption)                                                                              15229
                 The new exporter in FTC called "Closed Captions" allows you to
                 extract closed captions from a source (such as 608, 708, and
                 Teletext) and output those captions to a specific caption file.
                 Currently the exporter only outputs to WebVTT format (.vtt).

                 Limitations:
                 - The exporter has an option for "Teletext Page Number" which
                 needs to be used to extract Teletext caption information.
                 This option is ignored for all other source caption types.

                 - DVB subtitles are not currently supported

                 - Japanese characters are not supported for WebVTT filename
                 output, this will be fixed for 4.8.

Target (MKV)     VP9 codec added to MKV exporter                                      15305

Target           SMIL file creation option for Adaptive Streaming v2                  15461
(Adaptive        exporter
Streaming v2)
                 The ‘Type’ setting in the ‘Container Format Settings’ section of a
                 Adaptive Streaming v2 target preset can be set to SMIL (MP4).
                 Similar to the other ABRv2 targets, you can customize the
                 bitrate configurations for both video and audio, and customize the
                 naming conventions of the manifest, media, and subtitle
                 folder/files. You can also add special metadata to the manifest
                 which is used on the player side.

Target           AV1 codec added to Elementary Stream exporter                        15038,
                                                                                      11717
                 Limitation: Currently AV1 is restricted to use only through the
                 Elementary Stream exporter. We plan to add it as an option to
                 the MP4 exporter in the future.

Target (AAC      Dual Mono encoding support                                           15231
Audio)
                 FTC now supports Dual Mono in AAC. Users have an option to
                 encode each channel independently from each other in AAC.
```

```text
                  To enable this there is a new checkbox under Audio settings:
                  "Use Independent Channels".

Filter (Color     Custom LUT Tables can be used with Color Conversion                   15267
Conversion)       Filter

                  In the Color Space Conversion filter, the user can now specify
                  custom look up tables that the user provides via
                  config files (in this case .cube files).

                  In order to do this, select the ‘via 3D-LUT’ option in the filter’s
                  ‘Conversion Mode’ dropdown. There will be a file input field ‘LUT
                  file’ to specify the custom LUT.

Filter (Color     Color Channels Remapper Filter added                                  15352
Channels
Remapper)         The Color Channels Remapper filter can remap the Alpha value to
                  the Y value of the output. For example if source is YUV-Alpha
                  then target will be Alpha-UV. If the A to Y mapping value is set
                  to 128 then output will be grayscale.

                  Limitations:
                  - The Color Channels Remapper filter will not work for outputs
                  with 10 bit depth. Currently only works for 8 bit outputs.
                  - The Color Channels Remapper filter will not show preview in the
                  UI in following cases:
                  a) any source that is 10 bits with alpha
                  b) any source without alpha
                  c) if preset editor is not configured yet

Filter            EZTitles filter can be used in MPEG-2 TS passthrough jobs to          15052
(EZTitles)        insert captions without transcoding.

Post Task         Harmonic VOS 360 / VOS CNS integration (purchase option               15322,
Upload / Filter   required)                                                             15306,
                                                                                        15084
                  > Support for VOS 360 Upload. You can access the upload
                  settings through the Target Preset ‘Post Task’ tab.

                  > Support for VOS CNS Upload. You can access the upload
                  settings through the Target Preset ‘Post Task’ tab.

                  > SCTE 35 inject filter can be used to inject SCTE-35 markers
                  (via ESAM XML) into the output.

                  Help document for using the VOS Uploader:
                  https://www.dropbox.com/s/9wdvmc7c5qs7ee6/FTC%20Harmoni
                  c%20VOS%20Upload%20Guide.docx.pdf?dl=0



Manager           Database Maintenance Manager feature                                  14811

                  FTC and Cluster now support "Database Maintenance" upon
                  service reboot only when scheduled through UI (access the
                  setting through Cambria Manager → File menu dropdown.
```

### New Features added for 4.5

```text
                 Maintenance is done through a "vacuum" feature in postgres
                 where DB size will be reduced (i.e. deleted rows are cleaned up
                 from the database)

                 Notes:
                 - Vacuum will be performed with "best effort" upon next service
                 start only when DB Maintenance is scheduled.
                 - Vacuum will not be performed (skipped) when database is not
                 connectible, or read only, or when POSTGRES or CLUSTER/FTC
                 services are stopped.
                 - Vacuum will be waited to be performed, before
                 servicerunner/webserver starts.
                 - If user sees error in the UI (such as "unable to obtain info")
                 then UI should be restarted.

Cluster          Multicast Independence for Cluster Redundancy                      15341

                 In previous versions of Cluster the network needed to allow
                 Multicast in order for Cluster redundancy to work. This
                 requirement is now removed for this Cluster 4.6.

Floating         New tool Floating Server Monitor                                   15025
License Server
                 There is a new tool that can be used with Floating Server
                 Manager. The tool can be installed on any machine, it will watch
                 the Floating License Server and can send out notification alerts
                 based on various conditions:
                 - Floating Server Manager does not respond error
                 - License Expires soon (10 Days)
                 - Activation status becomes invalid
                 - Number of Agent Machines less than number indicated

Dashboard        Additional metrics and Installer for Prometheus/Grafana            15266,
                                                                                    15265
                 Documentation:
                 https://www.dropbox.com/s/b3n9yvkd7wfytpu/Capella%20Monitorin
                 g%20System.pdf?dl=0





Module           Feature                                                            Capella
                                                                                    Reference #
Target           VP9 codec added to MP4 and Elementary Stream exporters             11889
(MP4,
Elementary
Stream)

Target           Dolby Audio support added                                          14484
(Adaptive
Streaming v2)
Target                                                                              12328
(Adaptive        I-frame only playlist support for HLS
Streaming v2)
```

### New Features added for 4.4

```text
                A checkbox has been added to enable this for HLS. It can be
                found in the Adaptive Streaming v2 Exporter in the ‘Container
                Format Settings’.

Target          Black Segment Detection added to analysis exporter                   14901
(Analysis)
                This setting can be found in the Analysis Exporter in the
                ‘Container Format Settings’ section under ‘Video Contents’.

Source/Target   FTPS retrieval and post task delivery support added                  14319

Filter          Color Space Conversion filter enhanced                               14448

                BT.709 to HLG (and HLG to BT.709) can be done in one step.
                The new option has been added to Color Space Conversion filter
                in the ‘Conversion Mode’ options.

Filter          Nexguard V2 added to Target Filter list                              14636

                This filter uses Nexguard SDK version 1.7.1.

                Documentation:
                https://www.dropbox.com/s/5qevmx0lay8f4ky/NexGuard%20FTC
                %20Guide.docx

Job             AWS credentials for JobXMLs retrieved from Manager are now           14373
submission      encrypted.

WebUI           Web UI added                                                         14738

                Cambria Manager includes a selection to quick launch into the
                WebUI under the ‘Help’ dropdown.

                You can also launch it by going to this link on the Cluster/FTC
                machine:
                https://localhost:8161/

                (The first time you run it, it will show the location of the
                instructions to set up user accounts)

Licensing       Upgraded to use latest version of Cryptlex API                       14883,
                                                                                     14913,
                Please refer to the licensing note at the start of the Cluster/FTC   14924
                4.5 release notes.





Module          Feature                                                              Capella
                                                                                     Reference #
Source          DivX input supported                                                 14233,
                                                                                     14144
```

```text
               Limitation: Cannot seek DivX files.

Source (FTP    SFTP retrieval supported                                              14140
retrieval)
Target (MXF)   Added official support for ARD-ZDF SDF 01/02, HDF                     13194
               01/02/03 and adhere to corresponding specifications

Target (MXF)   XAVC Long GOP supported                                               14072

               FTC now supports XAVC LONG GOP 4:2:0 8 bit, 23.98, 25, 29.97
               FPS, will be 100Mbps, 50, 59.94 will be 150Mbps.

Target (MXF)   XAVC Intra updated with Class 50 option                               14061

Target (AAF)   AVCIntra100 and AVCIntra50 support added to AAF                       14114
               exporter

Target         Dolby Digital and Dolby Digital Plus audio has been added             13516
(Adaptive      to Adaptive Streaming Exporter
Streaming)
               The Dolby setting requires applying a config file. Here are the
               steps to generate Dolby Encoding Setting XML for Adaptive
               Streaming:

               1. Open FTC and go to the "Encoding" tab
               2. Create a new encoding preset with any container that has
               Dolby Audio available. For example, "MPEG-2 Transport Stream"
               3. In the "Audio/Track 1" option, select "Dolby Digital" or "Dolby
               Digital Plus"
               4. Scroll down to "Audio Settings / Track 1" and modify the audio
               settings to your liking
               5. Click on the "Save..." button in the Preset Editor and save
               the .cen file
               6. Rename the .cen file to have a .xml extension
               7. Open the file in a text editor and look for the audio
               <EncodingSettings> tag
               8. Delete everything else in the file except for the audio encoding
               settings and all of the contents inside it
               9. Save the modified file
               10. This file can be used in the ‘Load Config’ button when Dolby is
               selected for audio in the Adaptive Streaming Exporter.

               Here is an example of a Dolby Digital configuration:
               <EncoderSettings
                       EncoderName="Audio Encoder - AC3"
                       Type="Audio"
                       NbOfChannels="6"
                       BitsPerSample="Same as Source"
                       BitrateKbps="384"
                       AudioCodingMode="7"
                       LFEEnabled="1"
                       Dialnorm="31"
                       BitstreamMode="0"
                       EvolutionFrameworkEnable="1"
                       SurroundMode="0"
                       SurroundExMode="1"
```

```text
                        LineModeProfile="1"
                        RFModeProfile="1"
                        StereoDownmixMode="0"
                        LTRTCenterMixLevel="4"
                        LTRTSurroundMixLevel="4"
                        LOROCenterMixLevel="4"
                        LOROSurroundMixLevel="4"
                        UseHDCDConverter="0"
                        UseLFEFilter="0"
                        UseSurroundPhaseShift="0"
                        UseSurroundAttenuation="0"
                        CopyrightFlag="1"
                        OriginalFlag="1"
                        PeakMixingLevel="105"
                        RoomType="2"
                        LanguageCode="eng"
                        Name="AudioEnc1">
                    <FilterSettings Type="AFilter"
                FilterName="Audio Filter - DPLC" Mode="1770-
                2+DI" SpeechThreshold="20"
                UseTruePeakDCBlock="0" UseTruePeakEmphasis="0"
                UseScaling="0" />
                </EncoderSettings>
Target          (Beta) Adaptive Streaming V2 exporter                                 13539,
(Adaptive                                                                             14484,
Streaming v2    The beta version of the ‘Adaptive Streaming V2’ exporter is           14457,
Beta)           available to test and use. This exporter includes a purchase          14373
                option to have CPIX/Irdeto integration for DRM. And has more
                user controls for folder and file naming schemes, compared to V1.
                Also included are DASH Conformance Mode for HbbTV 2.0/DVB-
                DASH 2014.

                Limitations:
                - Dolby Audio output does not currently work with the V2
                exporter. Jobs will error with a “MultiBitrate Encoding:
                Unexpected Error”. This will be resolved in a future build.

                - VBR jobs will fail with “Unexpected Error”. This will be resolved
                in the next version.

                - JobXMLs extracted from a job with CPIX and/or AWS S3 will
                show the credentials in plain text. This will be resolved in a
                future build.

Source and      Dolby to Dolby transcoding supported                                  12330,
Target (Dolby                                                                         14347,
Audio)          Limitations: Audio Delay and Audio Normalizer filters cannot be       14362
                used in a Dolby to Dolby transcoding job.

Filter (XML     XML Titler support for EUDC and Carbon Coder XMLs added               14380
Titler)
                A help guide is available. Please contact support
                (support@capellasytems.net) for more details.

Filter          Teletrax Watermarking Filter (target side) support                    14361
(Teletrax)      Requires a license from Teletrax.
```

### New Features added for 4.3

```text
                Documentation:
                https://www.dropbox.com/s/zxt62k4s932i8c3/How%20to%20Tel
                etrax%20Watermarking%20.pdf?dl=0

Post Task       Retry attempt value and delay value added to Post Task            13421
                network delivery

FTC             List of various modules/components that have been                 13933,
Module/compo    upgraded:                                                         13928,
nents                                                                             13492,
                - ffmpeg upgraded to v4.2                                         12942,
                                                                                  13105,
                - x265 upgraded to v3.2.1                                         14317,
                                                                                  14358,
                - mp3 encoder updated                                             14281,
                                                                                  14105,
                - Dolby Vision upgraded to SDK v 2.2.0                            13071,
                                                                                  14260,
                - MXF XDCAM reading from S3 optimization                          14193,
                                                                                  14377
                - Avid AAF exporter enhancements: Auto delete AAF after check-
                in option, limit # of files in folder, additional logging

                - Color Primaries/Transfer Characteristics/Matrix Coefficients
                options added to DNxHD/DNxHR and ProRes configuration

                - ProRes optimization to increase processing speed

                - Logo Filter position accuracy increased

                - Specify Channel Layout option added to MOV container settings

                - Whitelist option added for Watch Folder Source Acceptance tab

                - UI option added to switch UI language (English / Japanese /
                Chinese)


API Packager    (Purchase Option) CPIX and Irdeto Integration for DRM             14175,
                PlayReady/Widevine Support                                        13835





Module          Feature                                                           Capella
                                                                                  Reference #
Source          Growing source files can now be segmented by Timecode             13540
(Growing
source)
```

```text
Target (Avid      Avid AAF Exporter enhancements:                                        13730,
AAF Exporter)     - Added Custom Metadata (Tagged Values) interface                      13682

                  - String replacement variable can be used for the Material Name,
                  so source name can be maintained

Audio             Audio enhancements:                                                    13808,
                  - Analysis exporter supports loudness measurements for multiple        13329
                  audio tracks

                  - Audio description values for Voice Over and Control Track are
                  used during transcoding with "Audio Voice Over Control Renderer"
                  filter

UI                UI updates:                                                            13242,
                  - UHD/4K/8K selections added to UI dropdown for x264, x265,            12068,
                  ProRes, HEVC(NTT) codecs                                               13571

                  - The column sorting in Manager occurs across all pages

                  - New field added for modifying filenames for Adaptive Streaming
                  MPEG-Dash video streams

API               Different credentials can be used for access to files in               13472,
(Credentials) /   various locations                                                      15318,
Credential                                                                               15345
Manager           Credentials Storage
                  - Credentials are stored into database
                  - Credentials will hence be persistent across builds, and persistent
                  across Cluster Redundancy

                  Credential Manager
                  - Credentials are entered via Credential Manager
                  - Credential Manager is identical, and can be found in FTC and in
                  Cambria Manager
                  - Credentials will then be written to JobXML (and assigned to
                  Manager) when jobs are created.
                  - Removing entries in Credential Manager DOES NOT invalidate
                  the credentials
                  - In other words, users who get hold of your JobXML can then
                  modify the JobXML to R/W files on the path, given that they know
                  the path
                  - Passwords are encrypted, but does not prevent impersonation.

                  UI workflow (limited to reading/writing to location that UI have
                  access to)
                  1: FTC -> Settings -> Credential Manager (Or, for WF, Cambria
                  Manager -> File -> Credential Manager)
                  2: Put in the path (folder path), user name, password and
                  domain.
                  Password and domain is optional, depending on user
                  environment.
                  3: Create jobs and run accordingly.

                  API workflow (craft and submit as JobXML):
                  1: Then, you can work with any path, as long as you know it
                  2: FTC -> Settings -> Credential Manager (Or, Cambria Manager
                  -> File -> Credential Manager)
```

### New Features added for 4.2

```text
                3: Put in the path (folder path), user name, password and
                domain.
                4: Export -> Export All -> Save the ccf file
                5: Open the ccf file, you will see lines of "Credentials"
                6: When crafting JobXML, Insert "Credentials" as child element of
                "Job", and put those lines of "Credential" as child of "Credentials",
                eg:

                <Job>
                ....
                <Credentials>
                  <Credential Domain="mycompany.net"
                Password="foobar1##" Path="\\network-nas1"
                Username="nasuser1" />
                  <Credential Domain="mycompany.net"
                Password="foobar2##" Path="\\network-nas2"
                Username="nasuser2" />
                </Credentials>
                </Job>


                Limitations:
                Lists of functions that do not work with Credential Manager:
                - Retrievals (Network, FTP, etc)
                - Uploads (Network, FTP, etc)
                - Scripts for Scriptable Workflow
                - Third-Party Plugins

API             Return TotalItems value that represents the number of                   13792
                items in the Jobs List

                http://localhost:8647/CambriaFC/v1/Jobs/
                http://localhost:8649/CambriaFC/v1/Jobs/

Scripts         MultiTargetBitrateLadderBasedOnVideoComplexity.pl                       13788
                script added

                It allows multiple individual targets (MP4 or TS) to use source
                video complexity values to set target bitrates.





Module          Feature                                                                 Capella
                                                                                        Reference #
Adaptive        Adaptive Streaming Repackager (API only) (Separate                      13202,
Streaming       Purchase Option)                                                        13595
Repackager
                Packager test sample link:
```

```text
                https://www.dropbox.com/s/oefcbw7fujhsctd/PackagerTest.zip

                PackagerTest notes: The package includes instructions for
                creating the MP4 elementary streams in the FTC UI, then using
                the API for repackaging.

Source          IMF ProRes import                                                      13587
(IMF)
Source          Support for lossless codecs: FFv1 and FFvHuff                          13379
(AVI and MKV)
Source          Enhancement: S3 performance optimization with MOV and                  13083,
                MXF XDCAM sources                                                      13105

Source and      Enhancement: Improved credential handling for S3 to                    13081
Target          allow different credentials to be used per job.

                Please contact Capella at support@capellasystems.net for
                instructions.

Target          Option added to output fragmented MP4 with byte range                  13338
(MP4)           external file

Target          AVID AAF Exporter creates AVID MXF (MPEG-2 IMX,                        13222,
(Avid MXF)      XDCAM HD, or DNxHD) and handles check-in to Interplay                  13638,
                                                                                       14822
                Limitation: When the AVID AAF exported is used in combination
                with the FTC setting to “overwrite” target files that already exist,
                a crash may occur. Please do not overwrite AVID AAF targets
                that exist.

Target          Added support for ProRes to MXF exporter                               13574
(MXF)
Target          Added support for DV (DVCPRO25, DVCPRO50,                              11118,
(MXF)           DVCPROHD) to MXF exporter                                              13486

Target          Added Long GOP support to MXF (XAVC)                                   13617
(MXF XAVC)
Target          Enhancement: MXF output is usable in Premiere as it                    13294
(MXF)           grows

Target          Analysis Exporter enhancement to allow video matching                  13496
(Analysis)      detection

                Video matching detection setting added Analysis Exporter. This
                setting is exposed when setting the Analysis Exporter video
                setting to ‘No Encoder’ and checking the ‘Video matching
                detection’ checkbox in the Video Contents section. You point to a
                video file that us used to match against the source.

                The output XML will indicate if a match was found and the
                position (in frames) of the matched section. Example output:
                <AnalysisInfo>
                   <VideoMatch DetectionMode="initial" FrameEnd="2834"
                FrameStart="2697" Matched="1" LowestPSNR="40.6390"
                PSNRThreshold="35" SourceFrameRateDen="1001"
                SourceFrameRateNum="30000"/>
```

```text
                </AnalysisInfo>

                This feature can be combined with the Scritable Workflow to
                identify if the source has a match, then remove (or replace) that
                section of video.

Filter          Kantar SNAP Audio Watermarking                                       10338

                The watermarking filter is now officially certified. It requires
                Capella purchase option as well as license from Kantar.

                This can be tested upon request. Please contact Capella at
                support@capellasystems.net if you are interested in testing.

                Link to documentation:
                https://www.dropbox.com/s/no05ii0vkiibn9x/Audio%20watermar
                king%20integration%20with%20%27Kantar%27%20guide.docx

Filter          Logo filter enhancement for motion logos                             7648

                Source Ending Handling (Repeat Last Frame / Disappear / Loop)
                setting added to Logo filter. This setting is exposed when using a
                video (.mov) file as the filter source.

Dashboard       Web-based Dashboard/Monitoring/Alerting                              13423

                Prometheus data output for Cambria is added. Instructions for
                setup of a dashboard for monitoring and alerting are included in
                the document.

                Link to documentation:
                https://www.dropbox.com/s/yn3slyqxbzt14is/Cambria%20FTC%2
                0Feature_%20Prometheus.pdf

Windows         Windows Processor Groups support (Beta)                              13313,
Component                                                                            13407,
                Warning: Cluster/FTC support of multiple processor groups            13690
                is limited and we do not guarantee that a multiple
                processor group machine configuration is optimal. We do
                not recommend that machines with more than 64-cores
                are used in production due to performance issues

                Multiple Processor Groups are defined by Windows when systems
                have more than 64 cores.
                A single FTC job can only use 1 processor group.
                We have enhanced FTC to distribute individual jobs into different
                processor groups to utilize machines that have more than 64
                cores.

Virtual         Automated AWS clients for Cluster                                    13365,
Machines                                                                             13299
(Cluster/FTC)   This is part of our ongoing development for improving Cluster on
                premise/cloud hybrid handling.

                This can be tested upon request. Please contact Capella at
                support@capellasystems.net if you are interested in testing.
```

### New Features added for 4.1

```text
License         ‘Pay As You Go’ Licensing Option (Beta)                            13365,
(Cluster/FTC)                                                                      13299,
                This licensing feature can be used to allow customers to pay       13484
                based on extra encoding volume instead of adding full perpetual
                licenses.

                Can be used with Automated AWS clients for a more cloud centric
                workflow or to support unanticipated spikes in encoding volume.
                Also added ‘Pay As You Go’ balance to Prometheus metrics.

                This can be tested upon request. Please contact Capella at
                support@capellasystems.net if you are interested in testing.





Module          Feature                                                            Capella
                                                                                   Reference #
Source          S3 optimization for source handling                                13030

                Performance is improved for sources being read from S3.

Target          MXF with Dolby E                                                   13035,
(MXF)                                                                              13027
                Improved MXF muxer. Also, passthrough optimized to allow for
                various Dolby E workflows to be supported:

                In the global Transcoding Preferences (File [Symbol] Transcoding
                Preferences), there is now "Dolby E Decode" option. This can be
                set to "Decode (if licensed)" or "Do not decode".

                 Target Presets by default will use the global Trancoding
                Preferences. But target presets can be modified to not use the
                Application Defaults and so this setting can be changed on the
                Target Preset also.

                Based on the global Transcoding Preferences, Dolby E files will
                load in as all PCM if the setting is set to "Do not Decode".
                Otherwise, Dolby E will load in normally, which means two source
                channels get decoded to one 5.1 Dolby E track.

Target          ProRes Target Enhancements:                                        13042,
(ProRes)                                                                           13031
                - Custom PAR option added.
                - Improved ProRes backwards compatibility with older players.

Target (XAVC)   XAVC Encoder Performance Improved                                  13055

                Transcoding speed should be 2 to 3 times faster than the
                previous version.

Filter          Preroll / Postroll Filter                                          13041
```

```text
               Allows for preroll and postroll to be added. Type can be black,
               image, or freeze frame. Duration can also be set.

Filter         BT.709 to HLG Conversion Improvement                                  12690

               The color correction filter has been updated to have a more
               accurate conversion algorithm.
Filter         Option added to Audio Remapper filter to allow                        12868
               automapping to match output tracks

               Allows for linear mapping of channels from source to target until
               all the tracks have a source channel assigned or until there are no
               source channels left.


Transcoding    Audio Track Handling option allows for silent audio to be             12832
Preferences    added to target tracks automatically
(Source File
Handling)      In Transcoding Preferences (Source File Handling), there is a new
               option for Audio Track Handling. The setting is called “Create
               Silent track if used Source Track does not Exist”.

Transcoding    Adaptive deinterlacer option                                          12932
Preferences
(Standards     Transcoding Preferences Standards Conversion option added for
Conversion)    “Deinterlacer Mode” to all for per frame interlacing detection.
               This enables FTC to adaptively handle video that has both
               interlaced and progressive segments.

Watch Folder   Watch Folder enhancements:                                            13080,
                                                                                     12913
                  -   Subfolder depth limit increased to unlimited. Please note
                      that this feature allows for an unlimited depth, however,
                      other limitations such as Windows maximum path length
                      may prevent a really long watch folder path from working.
                  -   FTP upload and S3 upload added as Watch Folder Actions.

Notification   Notification enhancements:                                            12940

               - New string replacement variables added, hover over the help
               (?) for the list of supported variables.

Log            Automatically delete logs for Cluster/FTC                             12890

               Logs are now automatically deleted for Cluster/FTC if it is past 45
               days.

Source and     Dolby Vision Support (Beta)                                           12483
Target
               This can be tested upon request. Please contact Capella at
               support@capellasystems.net if you are interested in testing.

API            Role Based API Access (Beta)                                          11930,
                                                                                     21406
               This feature allows for the administrator of Cambria Cluster to set
               role based permissions for API access. This can be unlocked for
               beta testing for those who request it. Please contact Capella at
```

## Known Issues

```text
                    support@capellasystems.net if you are interested in testing.

                    Limitation: When the API is used in role-based mode, GET
                    /CambriaFC/v1/Jobs/ returns only jobs owned by the
                    authenticated user unless that user has the Administrator role.
                    Custom roles with full permissions may still see an empty job list.
                    This affects the job ID listing API, not the Administrator role.




Here is a list of currently known important issues. Some of which will be fixed in future releases of
Cambria.

 Known Issues

 Module                   Issue                                                                 Capella
                                                                                                Reference
                                                                                                #
 File Convert /           Cambria currently uses decimal points instead of decimal              9039
 Cluster                  commas. This is the case even in OS languages that
                          normally uses decimal commas.

 Watch Folder             Remote Retrieval                                                      7160,
                                                                                                14910
                          Unless the network retrieval location is shared as Public with
                          no login necessary, the username and password fields must
                          be filled in. By doing so, you can ensure that the network
                          retrieval will still work even after the user logs out.

                          When doing FTP / Network Retrieval for a Watch Folder, use
                          the "Subfolders to watch" dropdown to select
                          the depth of subfolders to retrieve. Otherwise, no content
                          inside of subfolders will be retrieved by default.

 Watch Folder             Growing file support                                                  5003

                          Allows transcoding to begin on a source file that is still being
                          transferred into the watch folder.

                          The Allow growing files options can be accessed and modified
                          through the Watch Folder Source Acceptance (tab).

                          Limitations: The growing files feature should be used for
                          files that are growing at a rate equivalent to their bitrate.
                          This feature is not to be used as a workaround for a slow
                          network transfer rate. Also, since the full size of the source
                          file can be unknown, the completion percentage can be
                          inaccurate.

 Watch Folder             Window’s folder shortcuts are not a supported input to                6060,
                          trigger Watch folder encoding jobs. Also, shortcuts created           5987
                          from files in Windows Libraries folders also are not supported
```

## Known Issues

```text
                        by Watch Folders.

Watch Folder            Maximum number of subtasks for a single job is 8. This             1888
                        limitation will only apply when ‘Perform actions in parallel’ is
                        unchecked.

Watch Folder            If ‘Submit as Job XML is selected as a Watch Folder action,        13951
                        no other actions are performed after this selection.

Watch Folder (S3        S3 Retrieval in Watch Folders does not honor the "Retrieve         16383
Retrieval)              as S3 shortcut" checkbox. The current behavior is that it will
                        always retrieve as S3 shortcut regardless of the option being
                        enabled / disabled.

                        Note: This issue will be fixed in a future build.

Source (Import          Reporting tool for source files that fail to import                10667
error reporting tool)
                        When source files fail to import into the File Convert Sources
                        tab, there will be a link at the bottom of the application,
                        Show File Import Error Log. You can click on this link to
                        access the ‘Create Report’ function. This tool will create a
                        folder that contains information about the file and also will
                        extract the information at the start and end of the file. This
                        folder can then be sent to Capella for
                        troubleshooting/support purposes.



Source                  Import support for IMF files                                       10283

                        The source can be loaded by pointing File Convert to the
                        playlist XML (CPL.xml)

Source                  Decode source file once when encoding to multiple                  9361,
                        targets                                                            9591,
                                                                                           9592,
                        When encoding to multiple targets using the same source            9727,
                        file, you can now configure File Convert to decode the source      9718,
                        once. To do this use the option on the ‘Encoding’ tab in the       9587
                        main UI to “Encode Targets as Single Job”. This allows us
                        the amount resources spent on decoding/deinterlacing to be
                        reduced and increases overall transcoding speed for the
                        target group.


                        1. Conditional Audio Mapping cannot be used with the
                        ‘Perform encoding tasks as one job’ watch folder option.

                        2. Source side filters cannot be used with the ‘Perform
                        encoding tasks as one job’ watch folder option.

                        3. HTTP and Adaptive streaming targets cannot be used with
                        ‘Perform encoding tasks as one job’ watch folder option or
                        ‘Encode targets as single job’ File Convert UI option.

Source                  Analyze Source Function                                            8221,
```

```text
                                                                            8133,
         The ‘Analyze Source’ button can be found in the main UI in         10302
         the source tab. This function allows the application to            10196
         display more information about the source. (muxer used,
         video format, audio format, resolution, frame rate,
         interlacing, presence of closed caption, presence of
         timecode, bitrate, GOP size, number of B-frames, closed
         GOP/Open GOP, and many file-specific things like TS PIDs,
         H.264 settings (CAVLC/CABAC), etc.)

         Analyze source also has an option to allow an Encoding
         Preset to be quickly created based on the analysis.

         Limitations:
         - Create Preset option does not work on all sources. MXF
         (XDCAM) sources cannot be used with this function.

         - If a source is detected as a High-10 profile and 4:2:2 10-
         bit, the create preset function will create a 4:2:0 10-bit
         preset. This occurs because High-10 does not support
         4:2:2.

         - The MPEG-2 decoder will always decode the file with the
         color format YUV 4:2:2. Because of this, the video
         properties will always show YUV 4:2:2 for all MPEG-2 videos.

         - Some files, especially longer files may take a long time to
         analyze. You can modify the ‘Analysis Duration’ for the
         options tab in the main UI. Setting this to ‘Partial’ will limit
         the analysis to the first 2 minutes of the file. However,
         setting this to a shorter analysis segment may reduce the
         accuracy of the detection for the bitrate setting.
Source   Reported duration for HEVC (TS) source files can be off by 3       7499
         to 5 seconds.

Source   HEVC Decoder                                                       6885

         Limitation: HEVC sources may not be seekable, therefore
         scrubbing through the Segments Editor timeline will not
         work.

Source   Sources with timecode that does not increase linearly can          6085
         cause the progress of the job to be reported inaccurately.

Source   4k support                                                         5748

         Limitations: 4k output is only supported with HEVC and
         x264 targets. In order to use 4k resolution, the Level in the
         encoder UI must be set to 5.2 or higher. 4k input formats
         that have been tested include HEVC, Grass Valley HQX,
         Grass Valley Lossless, ProRES 422, and ProRES 4444.

         Recommendations: 4k conversions are memory intensive.
         Here are some recommendations to avoid problems related
         to Windows 32-bit memory limits.
         - It is recommended to use the 64-bit FTC UI for 4k
         conversions. (C:\Program Files
         (x86)\Capella\Cambria\cpx64)
```

```text
                  - When using the File Convert UI, it is recommended to use
                  Queue instead of Convert to start a job.

Source            Sources with multiple video streams are unsupported and           4183
                  will now fail with this error: “Configuration error: Audio-
                  Video Source. Unsupported source –contains multiple video
                  streams”.


Source            Sources with a mix of interlaced and progressive pictures are     14905
                  not supported. The job will fail with an “unexpected internal
                  error” message.

Source (ProRes)   ProRes Source Error Tolerance                                     11814

                  Source Error Tolerance now works for ProRes sources. The
                  user can specify how many source frames to ignore (per
                  minute) and continue decoding when FTC encounters certain
                  errors in the source file. This enables encoding to continue,
                  but may result in duplicated or skipped source frames.

                  The Sources Error Tolerance configuration can be found in
                  ‘Preset Editor’ → ‘Transcoding Preferences’ → ‘Other
                  Settings’.

Source            Uncompressed ‘raw’ RGBA MOV files show artifacts                  10858
(uncompressed)    during decoding

                  Note: We are looking into fixing this for a future release.

Source (IFO -     Source IFO (PS/DVD) files usage and limitations:                  3492
PS/DVD)
                  How to use:
                  Go to Video_TS folder (which contains the IFO/VOB files),
                  and
                  import the IFO that starts with "VTS". Using VIDEO_TS.IFO
                  will not work. Users should not import all VOBs manually, the
                  IFO loader will concatenate all of the VOBs automatically.


                  Limitations:
                  1: IFO: The accuracy of source duration is relied on IFO. In
                  our observations, it is often a few frames off of actual source
                  duration through frame counting.

                  2: VOB/PS: The accuracy of source duration is relied on the
                  accuracy of PTS (Presentation Time Stamp). If the PTS is
                  inaccurate, detected source duration will be different than
                  actual source duration through frame counting.

                  3: Does not support files that do not have system header
                  (Spec required to have at least 1).

                  4: IFO Demuxer does not support accurate seeking for
                  23.976 Pulldown sources. There may be a few frames off
                  when we seek/segments.
```

```text
                     5: IFO Demuxer does not support segmenting by chapters. It
                     will demux all chapters found in the main title in first PGC.

                     6: When demuxing IFO, we do not have "FBI Warning"
                     sections (VTS_0X_0.VOB) since that is not included as
                     valid/used sectors in first program chain. By we only demux
                     sectors that are referred in first program chain.

                     7: Does not support DVD that have multiple main program
                     chains, we always pick first one.

                     8: Does not support Closed Captioning subtitles (CC). We
                     can only support bitmaps subtitles (indicated by IFOs).

Source (MPEG-2       If the timestamps of the source are continuous and accurate,      3513
TS/PS)               and the file is seekable, then we are frame accurate. If the
                     timestamps are non-linear and/or non-accurate, then our
                     duration will be accurate within an average of 2-10 seconds.

Source (WMV)         Windows Server 2012 R2 requires Windows Media                     12313
                     Foundation
                     and Desktop Experience to be installed for WMV support.

Source               Seeking in the Segments Editor can be off by 1 frame for          6108
(Segments Editor)    DirectShow sources.

Source               When Map Audio Tracks is used. The duration of the audio          9292
(Map Audio Tracks)   for the source will be modified to match the duration of the
                     shortest audio source. This can result in the loss of audio for
                     longer audio assets used in the same Map Audio Tracks
                     configuration.

Source (Analysis)    For files we load using 3rd party SDKs, like Windows Media        13913
                     or DirectShow, the reported properties of the file are what
                     our decoder receives, which can be different from the native
                     properties of the source.

                     Ex:
                     GV codec - Audio sample is 24-bit but 16-bit is displayed.
                     WMV - Color format is YUV4:2:0 but 4:2:2 is displayed.

Source (Audio        When encoding from a source file with different length audio      12693
Duration)            tracks, the longer audio duration will be used.

Source (Watch        Watch Folder Support for XML Job Submission                       8323
Folder)
                     Watch Folders can accept job XML files as long as the Watch
                     folder Action is set to “Submit as job XML”.

                     Requirement:
                     Job XMLs that are submitted must have <JobDescr> as the
                     root element.

                     Example:
                     <JobDescr Priority="5" NumberOfRetries="3"
                     Description="File to file conversion 123"
                     Submitter="10.12.0.155">
                     …
```

```text
                    </JobDescr>

Target/Source       Read and write to Amazon S3                                   12724,
(Amazon S3)
                    Using Amazon IAM user authentication, FTC can access
                    Amazon S3 buckets. Source files on S3 can be imported into
                    FTC via JobAPI submissions and FTC can write directly to S3
                    while encoding.

                    Limitations:
                    - Some source formats cannot be read directly from S3.
                    - Some output formats cannot be written to S3 while
                    encoding, these outputs will be written locally first then
                    transferred to S3.

Source and Target   8K Support (purchase option)                                  8811

                    Limitations: 8k output is only supported with HEVC targets.
                    In order to use 8k resolution, the Level in the encoder UI
                    must be set to 6.0 or higher. 8k input formats that have
                    been tested include HEVC, TIFF, DPX, Uncompressed YUV.

                    Recommendations: 8k conversions are memory intensive.
                    Here are some recommendations to avoid problems related
                    to Windows 32-bit memory limits.
                    - It is recommended to use the 64-bit FTC UI for 8k
                    conversions.
                    - When using the File Convert UI, it is recommended to use
                    Queue instead of Convert to start a job.

Source and Target   10-bit/12-bit/16-bit video Support                            7361,
                                                                                  7127,
                    10-bit supported formats:                                     8389
                                                                                  8526,
                    Source and Target Formats:                                    8539
                    ProRes422 (QuickTime MOV)
                    ProRes4444 (QuickTime MOV)
                    Uncompressed (QuickTime MOV)
                    Uncompressed (AVI) * source only
                    HEVC (Elementary, TS, MP4)
                    H.264 (Elementary, TS, MP4)
                    DNxHD (MXF, MOV)
                    AVCIntra (MXF) *source only
                    XAVC (MXF) *source only

                    12-bit supported Sources and Targets:
                    TIFF *source only
                    HEVC (Elementary, TS, MP4)


                    Conversion Modules:
                    Scaler
                    Interlacer (*Deinterlacing is only 8-bit)
                    Frame rate converter
                    Pulldown

                    10-bit/12-bit/16-bit Source and Target Filters:
                    Crop, Logo, Text Burn In, Timecode Burn In
```

```text
                    Note: Video data being processed in 8-bit if any module
                    used is 8-bit and the resulting output file will be 8-bit. *For
                    Example: if Deinterlacing is used in transcoding process,
                    output will be 8-bit.


Source and Target   DVB and Teletext Support                                          8659,
                                                                                      8621,
                    DVB subtitles and Teletext from TS sources can be passed          8474,
                    through from source to target. In the TS Exporter, Container      8471,
                    Format Settings (Preset Editor → Encode [tab]), check the         8249
                    appropriate setting. Write DVB Subtitles or Write Teletext.

                    DVB subtitles and Teletext from TS sources can also be
                    burned into the video prior to encoding. You can do this
                    through a ‘DVB Burn-in’ or ‘Teletext Burn-in’ source filters.

                    Known Issues / Limitations:
                    - DVB subtitles with multiple languages on one DVB stream
                    are not supported. Only the first language will be used.
                    - Some subtitles may appear in incorrect positions with the
                    burn-in filter.

Target (H.264)      Encoding parameters for H.264 are clamped to the range            1047
                    allowable for the specified Profile / Level and Conformance
                    Mode. Some of these restrictions on parameters are not
                    visible to the user and will occur without warning.

Target (MP4)        MP4 files created at 29.97fps will display 59.94 for the frame    4226
                    rate field in VLC’s codec information section. VLC is showing
                    field rate information instead of frame rate.

Target (MP4)        MP4 files output files that are longer the 7 hours may be         3494
                    created with a file duration that is incorrect. This could
                    cause the files not to open up in certain media players or
                    cause other unwanted effects.

Target (MP4)        When using the ‘Place moov at start’ option, File Convert will    3194
                    create a temporary file, which gets deleted when the job
                    ends.

Target (MOV)        Write timecode track in MOV                                       5877

                    Requirement: ‘Write Timecode Track’ checkbox in the MOV
                    target encoding settings must be checked for the timecode
                    track to be written.

Target (MXF)        MXF Muxer requires all channels to be contained in the same       6664
                    track. Use the Map Audio Tracks filter on the source file,
                    when needed, to map source audio channels to 1 track to
                    use for a MXF target.


Target (MXF)        MXF files that are created in exactly this setting (1280x720,     5938
                    4:2:0, 50P, 35Mpbs) will not always transfer to the XDCAM
                    deck.
```

```text
Target (MXF)        Some combinations of settings for our XDCAM exporter can            3119,
                    produce output files that do not playback in Sony XDCAM             11777
                    Viewer. Our MXF exporter allows for users to configure files
                    that are out of MXF specification. It is up to the user to
                    configure “in-spec” outputs.

Target (JPEG2000)   JPEG2000 Export (purchase option)                                   9759,
                                                                                        9756
                    Limitations:
                    1. RGB444 color format option is not officially supported.
                    Using this setting may result in a problematic output file.

                    2. 4K JPEG2000 targets are not officially supported by FTC.
                    If a JPEG2000 job is configured to a 4K resolution, the job
                    will attempt to execute, however, it is possible that the job
                    will run out of memory. If this occurs, you can try changing
                    the ‘Encoding Threads’ value to 4 and requeue the job.
                    Please contact Capella if you are interested in 4K JPEG2000
                    encodes.

Target              Restrictions removed for number of audio channels                   10301,
(XDCAM)             per track for MPEG-2 XDCAM MXF                                      9563

                    The exporter also allows users to configure any number of
                    audio channels between 1-8. This can lead to creation of
                    MXF XDCAM HD files that do not conform to any
                    specification.

                    Known Issue: Previous restrictions have been removed,
                    File Convert no longer automatically makes audio settings
                    adjustments to conform to the Sony XDCAM spec. Please
                    refer to the chart below the recommended settings for
                    certain configurations:

                    1. XDCAM MPEG-2 HD 420
                       1440 x 1080 - 2ch 16bps/ 4ch 16bps
                       1280 x 720 - 4ch 16bps
                    2. XDCAM MPEG-2 HD 422
                       1920x1080/ 1280x720 - 8ch 24bps
                    3. XDCAM MPEG-2 IMX
                       8ch 16bps
                       4ch 24bps
                    4. XDCAM DVCAM
                       4ch 16bps

Target (MPEG-2)     Timecode MPEG-2 video (GOP headers) usage and                       3588
                    limitations:

                    As long as File Convert can read the timecode from a
                    particular source, file convert will pass source timecode
                    information to the target given that the source and target
                    frame rates match. If frame rate differs, File Convert will
                    pass the starting timecode (minus the frame number info)
                    from the source to the target and automatically make the
                    timecode increase linearly from that point.

                    There is also filter function that allows users specify the start
```

```text
                time code manually.

Target (WMV)    WMV encoding is slower in 64-bit than in 32-bit. Since FTC         11939
                now defaults to submitting jobs in 64-bit. Encoding may be
                slower than before.

                Note: This is scheduled to be investigated for a future
                release.

Target (WMV)    Modifying file extensions for the Windows Media Exporter           8691

                Changing the file extension through the preset editor to an
                extension not recognized by the encoder may cause the
                transcoding job to fail.

                Extensions that have been verified to work: .wmv, .wm, .asf

Target (WMV)    When using a custom PowerToy .reg file, if b-frames or             5412
                lookahead is used, the first frame of the output is likely to be
                duplicated. For maximum quality, both b-frames and
                lookahead should be used.

Target (AVI)    Canopus HQ AVI export support                                      5922

                Limitation: Output files don’t have interlacing and aspect
                ratio information, because the AVI standard doesn’t handle
                it. Different tools like Edius and Premiere use their own
                made up extensions to store this, so users may have to
                overwrite these values when they import the files, for
                example into Edius.

Target (AVI)    Canopus DV and DVCPro50 outputs only support 720x480               5542
                and 720x576 output resolutions. If you output to any other
                frame sizes you will get an “Error multiplexing streams …”
                error.

Target          Adjusting audio speed for audio only output                        11042
(Audio only)
                Audio only targets do not have encoding parameters for
                frame rate. However, the source speed can be adjusted with
                the ‘speed adjustment’ source filter.

                Example: If you a source video at 24fps and would like to
                create audio only file to use with a 25fps video of the same
                content. You can apply the ‘speed adjustment’ filter to the
                source and set the speed percentage to 104.2%

Target          Video passthrough support and limitations                          5170,
(Passthrough)                                                                      15519
                Video essence can be passed from source to target without
                decoding for certain containers and codecs.

                Containers that are supported:
                MPEG-2 Transport Stream
                MPEG-1/MPEG-2 Program Stream
                MP4
                MOV
```

```text
                MXF
                Elementary Stream

                Video streams/codecs we can pass through:
                MPEG-2
                H.264 (including x264)
                DV
                DVCPRO
                DVCPROHD
                ProRES
                VC-3 (ie DNxHD)

                Limitations:
                - Cannot apply video filters.
                - If the sources files are I-frame only then segment output
                will be frame accurate. If source files are long-GOP and the
                segment in point is not a key frame, the in point will be set
                to the previous key frame.
                - There is no video preview while transcoding.
                - XAVC Intra VBR source cannot be used in MXF Passthrough

Target          The Transcoding Preference: Source Speed Adjustment             8678
(Passthrough)   cannot be allowed when using audio passthrough. The
                Source Speed Adjustment setting must be changed to
                ‘disallowed’ for the Job to complete without error.

Target          NTT HEVC quality improvement parameter files                    10950,
(HEVC)
                Three configuration files have been added that can be used
                to improve the quality of HEVC output.

                These configuration files can be loaded through the
                ‘Encoding Parameter File’ setting found in ‘Video Settings’
                section of a HEVC target.

                The configuration files can be found here:
                C:\Users\Public\Documents\Capella\Cambria\Config

                HEVC_CBR_Type100.cfg: Used to avoid underflow errors
                HEVC_CBR_Type101.cfg: Used with CBR encodes
                HEVC_VBR_Type100.cfg: Used with VBR encodes

Target          Known Adaptive Streaming v1 limitations                         14444,
(Adaptive                                                                       14493
Streaming)      - Smooth streaming sub-jobs will stall at 99%. The
                workaround is to use ‘run as a single job’ option.

                - Cluster may not work well with Adaptive Streaming jobs.
                As a workaround please enable ‘Encode Layers as a Single
                Job’ or use ‘Adaptive Streaming v2”’ exporter.

                - An “Unexpected Internal Error” will occur if Black Segment
                Remover Filter is used with an Adaptive Streaming target.

                - Apple HTTP Streaming validator will show errors for HLS
                target.
```

```text
                      - Adaptive Streaming v1 with Dolby audio should disable the
                      default checkbox “Encode Layers as Single Job” to avoid a
                      configuration error.

Target                Encode all Adaptive Streaming layers as single job              10663
(Adaptive
Streaming)            ‘Encode Layers as Single Job’ setting allows Adaptive
                      Streaming jobs to be optimized for source decoding,
                      interlacing/deinterlacing, and framerate conversion
                      operations. The setting can be found in the ‘Container
                      Format Settings’ section in the Preset Editor for Adaptive
                      Streaming targets. It is enabled by default.

Target                Adaptive Streaming layers can be configured to have             10630
(Adaptive             different frame rates
Streaming)
                      Limitation: It is recommended that layers with the lower
                      frame rates are set to use the H.264 encoder. If all layers
                      are using HEVC and you are also using mixed frame rates,
                      there may be restrictions on the GOP sizes for your layers.
                      Please contact Capella for more info.
Target                Adaptive Streaming (HLS) Video and Audio layers are             10888
(Adaptive             linked
Streaming)
                      You can have multiple video and audio layers. For HLS we
                      automatically link the audio layers to the video layers. The
                      lowest audio layer (by bitrate) is linked to the lowest video
                      layer. The 2nd lowest audio layer is linked to the next video
                      layer and so on. Once the highest bitrate audio layer is
                      reached, it is linked with the remaining video layers.

Target (Mpeg-DASH,    Adaptive Streaming Packaging                                    12327
HLS)
                      FTC can be used to package MPEG-DASH and HLS, without
                      re-encoding the source.

                      - This feature can only be used via JobXML API submission.
                      - Sources must be MP4 segments with GOP sync and same
                      framerate.
                      - Job Type must be set to "MultiBitrateMux".
                      - Sources must contain 'Source' child elements, with
                      'Location' set to the different source layers
                      - SegmentNamingScheme should not have “_bitrate”, but
                      needs to have %i.

                      We can send sample JobXMLs to you, please email your
                      request:
                      support@capellasystems.net

Target (Transcoding   When using the Transcoding Preferences option to move or        6031
Preferences)          copy source files when transcoding failure occurs, it will
                      always overwrite any file in the move/copy target location.

Target (Post          The Post Conversion Task (Command Line) occurs before           12682
Conversion            any Upload tasks
Command Line)
```

```text
Target (Post          If the post-task upload is used for a Adaptive Streaming       11037
Conversion Task /     (HLS ) target with AES encryption, the AES keys are also
HLS AES keys)         uploaded. Be cautious of uploading them to a web server
                      that is not secure.

Target (Analysis      Video Text Recognition (OCR) Enhancements                      12694
Exporter)
                      The Optical Character Reading (OCR) feature added to the
                      Analysis exporter since FTC version 3.5. OCR allows text
                      found in videos (Ex: scrolling end credits) to be identified
                      and written as text to an output XML. This XML is searchable
                      and can be repurposed/integrated into other workflows.
                      Text translation is not expected to be perfect.

                      Enhancements for version 4.0:
                      • Improved detection speed.
                      • Additional tuning parameters added.
                      • Output XML now contains x an y position information for
                      the text.

                      Basic Use Instructions :
                      1) Load the sources into FTC that you would like to analyze.
                      2) Use the source Segment Editor to mark and In/Out point
                      for the segment you would like to analyze.
                      (this step helps to reduce the time it takes to produce the
                      XML output)
                      3) From the Target tab select the Analysis Exporter.
                      4) Uncheck the options found in the Video Complexity
                      Measurement
                      (these settings are not related to OCR, leaving them checked
                      can slow down your analysis processing)
                      5) Check the ‘Use OCR’ box.
                      6) Specify the ‘Data’ folder.
                      (this files in this folder are used in the text analysis
                      processes. The Data Folder can be found in FTC installation
                      package. Point the setting to the “…\Data” folder)
                      7) Set the 3-digit Language code. (eng for English, fra for
                      French, deu for German, spa for Spanish, ita for Italian).
                      8) Once done with the setup of the preset, you can queue
                      the job as normal.
                      9) The output XML will contain the text recognition results.

Target (Still Image   Scene Detection export requires x264 to be licensed.           13691
Exporter)

Target (Post          YouTube Upload                                                 3917
Conversion Task)
                      Any target preset can be setup to upload automatically to
                      YouTube. To enable the YouTube upload, you will need to
                      add YouTube as a destination address through the Post Task
                      (tab). Twitter and Facebook notifications can also be
                      configured as part of the post task to tweet or post upon
                      completed delivery.

                      Target preset recommendations:
                      1) It is recommended that your File Convert encoding preset
                      is configured to a high quality, since the file will be re-
                      encoded by
```

```text
                   YouTube upon receipt. Keep in mind that there is a 128GB
                   limit (per source).
                   2) Use Progressive.
                   3) Do not add black bars, keep original aspect ratios.
                   4) Use Closed GOP.

                   Security:
                   When configuring YouTube upload as a Post Task option,
                   users will be required to enter their YouTube account
                   credentials. YouTube will return an authorized credential that
                   allows our application to act on behalf of users. We do not
                   store YouTube username and password in File Convert
                   presets or project, but we will store the returned authorized
                   credential in encrypted form.

                   Limitations:
                   1) When we attempt to upload identical video, YouTube
                   returns 201 Created but will show "Rejected (duplicate
                   upload)" when checked in browser on the user's channel.
                   2) Does not support upload resume.

Target (Post       Facebook Upload                                                  14630
Conversion Task)
                   Video Guidelines:
                   https://www.facebook.com/help/218673814818907

                   Recommended video dimensions is 1280 x 720 for
                   Landscape and Portrait.
                   Minimum width is 600 pixels (length depends on aspect
                   ratio) for Landscape and Portrait.
                   Landscape aspect ratio is 16:9.
                   Portrait aspect ratio is 9:16 (if video includes link, aspect
                   ratio is 16:9).
                   Mobile renders both video types to aspect ratio 2:3.
                   Max file size is 4GB.
                   Recommended video formats are .MP4 and .MOV.
                   Video length max is 120 minutes.
                   Video max frames 30fps.

                   Limitations:
                   With Cluster/FTC 5.1, there is a known issue where users
                   may run into an “Authorization Error” when credentials are
                   first entered. The workaround for this issue is to click “ok”
                   on the message and then go through the authentication
                   process again. Authorization should work on the subsequent
                   attempt.

Target             Gmail mail account settings change to allow for File             10087
(Notifications)    Convert and Cluster notifications to work with account

                   Gmail accounts need to have account settings modified to all
                   for less secure apps to access your account.

                   Here is a link to the Google webpage for instructions on how
                   to change the setting:
                   https://support.google.com/accounts/answer/6010255
                   (Follow the steps detailed for Option 2)
```

```text
Target            HTTP notification                                                  7543
(Notifications)   http:// is a required prefix for the ‘destination address’ field
                  for http notifications to work.

Target            Create XML log for each job completion or transcoding              8339,
(Notifications)   error / string substitutions list                                  10258

                  In Notification Settings (Preset Editor → Notification [tab]),
                  you can now select ‘Create Log’ for the Notification Type.

                  Steps to Setup:
                  1. From the Notification Settings dialog, enter in a Name.
                  (Ex: Job Completed!)
                  2. Choose “Create Log” for the ‘Notification Type’.
                  3. Choose a ‘Notification Event Type’. (This settings
                  specifies the trigger that will create the XML log)
                  4. Specify a ‘Location’ of where the logs will be written to.
                  5. Enter in the ‘Content’ of what the log will contain.

                  If you are writing XML logs then here is an example of an
                  entry that can be used:

                  <?xml version="1.0" encoding="utf-8"?>
                  <Log>
                  <Info OutputFilename = "%outputfilename%" Source =
                  "%sourcefilename%" EndTme="%jobendtime%"
                  SubmitTime="%jobsubmissiontime%"/>
                  </Log>

                  If you are writing text logs, here is an example:
                  Job Completed!
                  JobStatus: %jobstatus%
                  JobType: %jobtype%
                  SourceFilename: %sourcefilename%
                  OutputFilename: %outputfilename%
                  JobSubmissionTime: %jobsubmissiontime%
                  JobStartTime: %jobstarttime%
                  JobEndTime: %jobendtime%
                  JobRealtimeSpeed: %realtimespeed%

                  Here is a full list of string substitutions that can be used in
                  the content section:
                  %jobid%
                  %errorid%
                  %errormessage%
                  %ftpurl%
                  %jobstatus%
                  %jobtype%
                  %sourcefilename%
                  %outputfilename%
                  %jobsubmissiontime%
                  %jobstarttime%
                  %jobendtime%
                  %realtimespeed%
                  %numberoferror%
                  %numberofretriesleft%
                  %lasterror%
                  %progressatlasterror%
```

```text
                       %description%

                       6. Make sure you check the checkbox for ‘Is Content XML’ to
                       specify that you want the output to have an .xml extension.
                       Unchecked means the output will be .txt.

                       Known Limitations: String substitutions will not work
                       when using the conversion button in the File Convert GUI for
                       transcoding. It is recommended that you “Queue” the job or
                       use Watch Folders. Also, when the ‘Notification Event Type’
                       is set to ‘On Job Start’, the duration shown in the log will be
                       00:00:00 because the database does not have the updated
                       source duration at that point.

Target                 Job stalls due to scripts                                          12591
(Scriptable
Workflow)              During script phase, our job's progress does not increase,
                       this is detected as 'no progress' internally. This means if this
                       time exceeds the Job Timeout value, we will stop the job as
                       stalled. You can increase your job timeout to a longer
                       duration to avoid this issue.

Target                 Limitation for Single jobs with multiple targets using             11983
(Scriptable            scripts
Workflow)
                       Only the scripts from the first target will be used. All scripts
                       in all other targets will be ignored.

Target (audio only)    Audio only targets may have audio sync issues since there is       14779
                       no video to synchronize with. If the audio only output is part
                       of set of targets the sync issue can be avoided by encoding
                       the targets using the “encode targets as single job” option.

Filter (Target Side)   Target side video filters are not applied with ABR v2 targets.     15933
                       This will be fixed in a future release.

Filter                 ITU-R BS. 1770-3 Loudness option added to Audio                    9396
(Audio)                Normalizer

                       This option allows for audio to achieve EBU R128 compliance.

                       Known Issue: Audio bitrates at 128 kbps or lower can
                       cause the true peak to exceed the maximum level that is
                       specified by the filter.

Filter                 Subtitle burn-in filter does not support all languages             9517

                       English, Traditional Chinese, Indonesian, Korean, Malaysian
                       subtitles are all confirmed to work. However due to a
                       limitation we cannot correctly display characters for
                       Vietnamese(VIETN4), Arabic(ARABI3) and Thai(THAI01). In
                       these cases, we will now show the error “Unsupported
                       language in subtitle file”.

                       Note: File Convert supports a 3rd party solution for handling
                       a larger set to caption formats, EZtitles plugin:
```

```text
            Here is the link to the product info:
            http://www.eztitles.com/index.php?page=ezp-cambria

            Free trial for their File Convert plugin:
            http://www.eztitles.com/index.php?page=download-free-
            trials

            (EZtitles can be used to workaround many of the limitations
            of File Convert’s native subtitle format handling)

Filter      608/708 closed caption burn-in                                    6976

            The Closed Caption Burn-in filter will read the 608/708
            captioning data from the source and burn the captions onto
            the video picture of the output.

            Limitation: When used as a filter on the target side, the
            frame rate of the source and target must match, otherwise
            the captions will not be burned into the target. This is not a
            limitation when the filter is used on the source side (or when
            adding a source side filter to the target).
Filter      DVD Subtitle Burn-in (from a DVD IFO source file)                 4134

            Available settings:
            1. Subtitle Language - DVD's can contain multiple subtitles.
            There can be English, Japanese, and/or Spanish subtitles in a
            DVD.
            Choose the subtitle language you want displayed in this
            section.

            2. Subtitle Language Index - Each language may contain
            different subtitles. For example, if Chinese is picked from the
            Subtitle Language there can be two ways to write the
            characters. Index 0 is chosen by default and will always
            contain subtitle information if the Subtitle Language is
            supported by the .IFO. To choose the second subtitle style,
            choose Index 1.

            Limitations:
            1. If the IFO contains lots of CHG_COLCON subtitles in a
            "burst", we may consume lots of memory.
            2. We currently do not support previews of subtitle
            information.

Filter      Logo filter preview does not display logo when ‘apply to          8899
(Preview)   segment’ is used.

Filter      Filter Preview Enhancement                                        6601
(Preview)
            Filters can now be previewed all at once. By default, all
            filters are previewed. You can right click on the filter
            preview and select or deselect filters that are included in the
            preview. Preview for different filters can also be
            enabled/disabled during playback. Some filters cannot be
            previewed and are not included in preview. A “*” is shown
            next to the current filter being edited.
```

```text
                    Note: Source filters and target filters are not previewed at
                    the same time. When editing a source filter, the preview will
                    only show source filters. When editing target filters, the
                    preview will only show target filters.

Filter (Timecode    Multiple timecode sources                                        15991
Burn-in)
                    In the case that there are multiple timecodes in a source, the
                    timecode burn-in filter will now choose the most significant
                    one.
                    For example, the user has a source with MPEG-2 GOP
                    timecode and VITC timecode. In our case, the VITC timecode
                    takes precedence over the MPEG-2 GOP timecode and so the
                    Timecode Burn-In Filter will use the VITC timecode.

                    The ordering of the filters matter in this case as the burn-in
                    filter chooses the most significant one.

                    For example, if the user wants to burn-in the VITC timecode,
                    the VITC extractor filter should come before the timecode
                    burn-in. If you want the MPEG-2 GOP timecode and VITC
                    timecode burned in for example, you'll want to first have the
                    timecode burn-in filter for the MPEG-2 GOP timecode, then
                    the VITC extractor, and then the timecode burn-in.

Filter (Overwrite   Timecode overwrite filter can make timecode modifications        14446
Timecode)           that are applied through the muxer, so timecode that are
                    inside of the video stream will not be affected by this filter
                    for a Passthrough job.

Manager             Removing a job in the “Starting” state will delete the job       9598
                    from the Job Manager. However, the CPJobExec for the job
                    may still be running in Windows Task Manager. Since the
                    “Starting” state occurs only for a few seconds at the start of
                    a job, this is a rare issue.
Manager             When there is multiple Cambria Manager user interfaces           6565
                    open on the same machine, the changes made in one UI
                    may not be reflected in other UI. This may lead to some
                    confusion.

                    Workaround: You can close the Cambria Manager UI that
                    is not updated. Newly launched Cambria Manager will
                    contain all the updated changes.

Manager             Option to control job timeout                                    5982

                    A timeout setting has been added to the Cambria Manager
                    Option (tab) to allow for increasing the timeout duration to
                    avoid job failure caused by slow network speed.

Cluster             Cluster communication uses HTTPS by default as of                11803
                    FTC 3.5

                    While HTTP connection is still possible now, HTTP connection
                    may be deprecated/rejected in a future release.

                    Recommendation: It is recommended that external
                    applications that are interfacing with FTC/Cluster web
```

```text
          servers via HTTP are retooled to use HTTPS.

Cluster   Machines that are connected “online” to the Cluster with          9738
          transcoding slots set to 0 may still accept transcoding jobs.
          These jobs will remain stuck in a queuing state. In order to
          avoid this problem, any machines with 0 transcoding slots
          set should be disconnected (set to “offline”) from the
          Cluster.

Cluster   Converting a Cluster machine to a FTC machine                     9667

          When a Cluster machine is being used in a Backup
          redundancy role, the role must be set to “no backup” before
          the Cluster is uninstalled. If this is not done, then when FTC
          is installed on that machine, the database will be in read only
          mode and jobs will not function properly on the machine.


Cluster   Cambria not compatible with VirtualBox / VMware                   9010,
                                                                            6599
          Cluster and File Convert instances are not compatible with
          (VirtualBox / VMware Workstation / VMware Player).
          Machines that have (VirtualBox / VMware Workstation /
          VMware Player) installed may cause File Convert not to show
          up in Cluster properly, in addition, File Convert may not be
          able to receive jobs.

          Note: To avoid this issue FC/Cluster should not be installed
          on the same machine that (VirtualBox / VMware Workstation
          / VMware Player) is installed on.

Cluster   Cambria Cluster and Cambria Broadcast Manager                     8635
          cannot be installed on the same machine.


Cluster   It is generally recommended for Cluster installations that the    6517
          same build version for both Cluster and File Convert are
          used. If you need to use them in different versions, please
          contact Capella.

Cluster   If the HTTP response from the client machines takes longer        6039
          than 1 second (client machines are located far away or have
          non-optimal internet connection), the Cluster manager may
          unable to set client's number of encoding slots.

Cluster   When a machine is added through IP manually to the                6038
          Cluster, the connection is maintained off of the exact IP
          entered. If the client machine changes its IP address, then
          you will need to manually delete the machine from the
          machines list and add it again.

Cluster   When Cluster Manager shows a lot of "Cluster could not            3341
(Jobs)    connect to FileConvert machine to Add new job "errors for a
          particular machine, the causes could be:

          1)temporarily network issues (disconnected)
          2) machine is rebooting
```

```text
                      Recommendation: If you are not running into case 1 or
                      case 2. Rebooting the client machine can resolve the
                      problem.



Cluster (Job          Special Job Tags to prevent over distribution of Jobs to          11601
Management)           a single FTC node

                      Dynamic slots does a good job of distributing tranconding
                      Jobs to the client FTC machines. However, there can be
                      cases where FTC can be oversaturated with lots of Jobs.
                      This can occur when jobs use less CPU at the beginning, and
                      then increases CPU use substantially later. During this
                      period of low CPU use, Cluster may assign too many jobs to
                      the FTC client. A new special Job Tag can be used to prevent
                      this from occurring.

                      The Job Tag ‘CPUBaseline=X’ can be used, where X is a user
                      specified number from 1 and 100. When the Job is running,
                      the X value will be used as the minimum reported CPU
                      utilization value for that Job. So, value X or the actual CPU
                      utilized for the job is used, whichever is higher. Cluster will
                      use this reported CPU utilization of all the Jobs running on a
                      FTC machine to decide whether or not to distribute any
                      additional Jobs to the machine.

                      Ex: CPUBaseline=80
                      (When a Job with this tag is running, it will report to Cluster
                      that the Job is using 80% CPU utilization at the very least. If
                      the Job is using more than 80% CPU, the higher value will be
                      reported)

                      In addition to using the CPUBaseline tag, a new special
                      Machine Tag has been introduced to allow CPUBaseline to be
                      dynamically adjusted depending on what machine is running
                      the Job.

                      The Machine Tag ‘CPUBaselineAdjPct=X’ can be set through
                      the Cluster Manager for any Machine in the Machines list. X
                      can be any number from 0 to 100. CPUBaselineAdjPct is
                      used as a scaling factor for CPUBaseline. This allows the
                      user control over the CPUBaseline value across machines of
                      different processing capability.

                      Ex: When a CPUBaseline=80 Job is sent to a Machine with
                      CPUBaselineAdjPct=50, then the actual baseline value is
                      scaled (80 * .5) = 40.

Cluster (Redunancy)   Cluster Redundancy                                                8426,
                                                                                        8804,
                      A second Cluster Manager can be configured as a Backup            8945,
                      Cluster. When the active Cluster becomes unavailable the          9042,
                      Backup machine will take over and assume the Cluster              9046
                      Manager’s role. Watch Folders will continue to be monitored
                      and jobs distribution will continue. This feature adds
                      redundancy and eliminates having a single point of failure for
                      the Cluster.
```

```text
                     Limitations / Known Issues:
                     When Redundancy is triggered by rebooting the Redundancy
                     Primary machine, the Redundancy Backup machine becomes
                     the triggered Primary. Upon bootup, the original Primary
                     may not be properly stopped. In this case the Watch
                     processes of the original Primary will still be active. This
                     may lead to duplicate unwanted jobs to be created. Please
                     set the status of the original Primary to ‘Stopped’ if you
                     suspect this is the case.

                     If Primary and Backup machines are disconnected from the
                     network at the same time for more six hours, the
                     Redundancy replication will stop (health indicator will be
                     red). If this occurs, the Backup must be configured to point
                     to the Primary IP again.

                     Disabling the active network adapters through Windows
                     Network Connections interface can cause the
                     Primary/Backup the Redundancy replication to stop (health
                     indicator will be red). Re-establish the machine roles again
                     to establish a healthy Redundancy connection.

                     Redundancy role may become unset after a machine reboot.
                     Re-establish the machine roles again to establish a healthy
                     Redundancy connection.

                     Backup machine cannot be used for encoding when it is in
                     Backup role. However if redundancy is triggered and the
                     Backup is promoted to Primary, the machine can be used as
                     an encoding node.

                     Due to technical limitation of PostgreSQL database
                     replication, it cannot handle IPchanges. So, both Primary and
                     Backup should be assigned with staticIP. Please consult
                     network administrators for such settings.



Cluster (REST API)   When using the API to queue jobs to the Cluster for normal      4109
                     Cluster job distribution, you should be using port 8649 for
                     HTTP or 8650 for HTTPS.

REST API             When using the API, the output filenames will show the          7826
                     requested filename. It will only show the true output
                     filenames for a job when the jobs are completed. This
                     behavior is important to note in the case where the Job is
                     writing to an output location where the filename already
                     exists.

Cluster              Cluster Manager may stop working if the machines system         6111
(License)            time is rolled back. It is recommended that restart the
                     CpClusterServiceRunner service from (Windows - Service
                     Manager) after the clock has been rolled back.

                     Changing the computer clock forwards beyond actual real
                     world time can affect the duration of the license validity
```

```text
                     when you clock is rolled back. If you are running into an
                     issue with the dongle license, please contact Capella.

Cluster (License)    When updating a dongle license for Cambria Cluster, you          5173
                     should restart the CpClusterServiceRunner service from
                     (Windows - Service Manager) for the license to be detected
                     properly.

 Licensing           Floating License Server / Online Activation                      11682,
(Alternate method)                                                                    11819,
                     Floating License Servers can be used to lease Capella            11826,
                     product licenses to physical machines and virtual servers        12275,
                     over the network. This feature supports both “on-premise”        14409
                     machines as well as virtual servers on the IBM, Google, and
                     AWS cloud.

                     The Floating License Server software is activated using
                     Capella’s new Online Activation licensing. Online Activation
                     is an alternative to Capella’s USB license dongle. Online
                     Activation allows Capella Products to be unlocked on a
                     machine through the internet using a 25-digit activation key.

                     Notes:
                     • Floating License Server must be installed on a physical
                     machine. The Windows OS must also be configured to
                     prevent the machine from going to sleep.

                     • Updates/Extensions to Licenses by Capella will apply
                     automatically if the license is online. However, it is
                     recommended that users re-activates after Capella makes
                     the change so that the Licenses can be updated immediately.

                     • Machines that have Capella Products that are Online
                     Activated should remain connected to the internet. If
                     disconnected, the license will continue to work until the end
                     of the Grace Period (2-3 days), during this time users can
                     reestablish their internet connection.

                     • If the machine is rebooted while in Grace Period, Capella
                     Product licenses no longer work. The licenses will need to be
                     re-activated via the Online Activation procedure.

                     • For Cluster and FTC that are installed onto Virtual Servers,
                     the virtual machines should have a single network adapter
                     and TCP traffic must be enabled (allowed through security
                     group setting/firewall) between the Cluster and FTC.

                     • Uninstalling the Floating License Server will automatically
                     deactivate the license. Capella products that were clients of
                     the Floating License Server will automatically go into a 7-day
                     grace period. Installing and reactivating the Floating License
                     Server license again should allow clients to re-establish the
                     connection for the licensing link.

                     • Server sync may not update the number of clients/license
                     a floating server has. To workaround this, you will need to
                     manually re-activate the key on the floating server.
```

```text
License                 We support grace period of 10 days after license has               16012
(Activation/Cryptlex)   suddenly invalidated or fingerprint changed.

                        But, if the machine reboots during grace period (GP) state,
                        then upon boot the License Manager UI will not show the GP
                        state. However the license is in GP state internally.

License (USB)           Changing the computer clock forwards beyond actual real            6111
                        world time can affect the duration of the license validity
                        when you clock is rolled back. If you are running into an
                        issue with the dongle license, please contact Capella.

License (USB)           After USB dongles are remotely updated, it is recommended          5173
                        that the Cambria machine be rebooted so that the new
                        license features and job queuing functions can apply.

License (USB /          If the hardware or software license is not plugged in, File        3874
Software)               Convert will fail to encode when the “Convert All Jobs”
                        button is clicked. Plugging in the license at that time will not
                        allow you to bypass the error.

                        Workaround: Save the project and close and reopen the
                        project with the license plugged in.

Migration Issues        Cambria Manager information such as Watch Folder, Job,             8885
                        and Settings are not guaranteed to remain after upgrading
                        from an older build to a newer build. It is recommended to
                        save these settings before updating Cambria.

Windows                 Disable Microsoft Window’s Hibernate/Sleep mode                    8957,
Component                                                                                  9046
                        Cambria Cluster does not support Microsoft Window’s
                        Hibernate/Sleep mode. If a computer goes into
                        Hibernate/Sleep mode while Cambria Cluster, some functions
                        of the application may not work properly.

                        Recommendation: Disable Hibernate/Sleep on the
                        Cambria machine:
                        1. Go to Control Panel>Power Options
                        2. For the selected preferred plan, select ‘Change plan
                        settings’
                        3. Select ‘Change advanced power settings’
                        4. Go to Sleep>Allow hybrid sleep
                        5. Change the setting to “On” (this change will disable the
                        Hibernate option in the start menu)
                        6. Go to Sleep>Hibernate after
                        7. Change the setting to “Never” (this change will keep the
                        system from Hibernation when it sleeps)

IMF Editor Tool         IMF Editor Tool (Purchase Option)                                  10852

                        Generate Interoperable Master Format Packages with this
                        tool.

                        The IMF tool allows for Clip Lists to be created from
                        video/audio files. A Clip can be used to create Application
                        #2 compliant output.
```

```text
                       Limitations:
                       - No Metadata entry (language, title, description, etc)
                       - No compliance checking is done to make sure that video
                       and audio durations match. (It is recommended that this is
                       checked by the user)
                       - No automated workflows (watch folder, script/template)
                       - no upload, post-task, script, notification, filters, etc
                       - Does not support re-import/modifying existing IMF
                       - Does not support captions
                       - Does not support source trimming
                       - Does not support video previews




Cluster Settings
Watch folder input and output locations should be a shared network location so that all cluster
machines can access the folder location through a shared network path.

Please refer to the ClusterInfo&Troubleshooting.pdf file for more information on Cambria
Cluster. This document is included in the Cambria Cluster installation package.




REST_API_(File Convert/Cluster)
Please refer to the REST_API_FileConvert.pdf file for more information on API for Cambria File
Convert and Cluster.

Please also note that API Samples are included in the FTC_APISamples package.

Here is the link:
https://www.dropbox.com/sh/lc5y7mzwp73vclf/AAAGgOdY_JyxOf8LCjHtSNPXa?dl=0




REST_API_(Cluster Replication)
Please refer to the REST_API_Replication.pdf file for more information on API for Cambria
Cluster Replication.

Here is the link:
https://www.dropbox.com/sh/lc5y7mzwp73vclf/AAAGgOdY_JyxOf8LCjHtSNPXa?dl=0




Scripting Guide_(File Convert/Cluster)
Please refer to the Scriptable Workflow Guide.pdf file for more information on how to develop
and test Target Preset scripts.

Here is the link:
```

```text
https://www.dropbox.com/sh/lc5y7mzwp73vclf/AAAGgOdY_JyxOf8LCjHtSNPXa?dl=0


REST_API_(Floating Server Manager)
The Floating Server Manager API is available upon request.

Email your request here:
support@capellasystems.net
```
