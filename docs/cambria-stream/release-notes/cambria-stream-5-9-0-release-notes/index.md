# Cambria Stream 5.9.0.x (Release Build)

Release Notes (11/5/26)

Notes for Cambria Stream Manager, Cambria Stream Encoder, Cambria Stream Packager, Cambria Stream Solo

Starting Build Versions: Linux: 5.9.0.35197, Windows: 5.9.0.35187

## System Requirements

| Required Operating System | |
|---|---|
| Linux | Ubuntu 24.04 is officially supported. Production workflows are only supported officially in Kubernetes environments. Testing and initial evaluation can be easily tested on Ubuntu 24.04 using the Cambria Stream Solo. |
| Or | Windows 11, Server 2019, Server 2022, Server 2025 (Windows should be updated through Microsoft Windows Update before installing the application) |

## Cambria Stream Benchmarks

Real-time Performance Benchmarks:

Cambria Stream projects can be configured in a variety of ways; this generally results in differences in resource usage.

### On Premise Machine Configuration: HP Z4

| Item | Value |
|---|---|
| Operating System | Linux (Ubuntu 24.04) |
| Processor | Intel Core i9-7940X @ 3.10GHz (14-core Skylake-X) |
| Memory | 32 GB (4x8 GB) DDR4-2666 |

### On Premise Packaging Only:

25 Programs, packaging to HLS, 3-layers per program (1080p720p/480p)

| Item | Value |
|---|---|
| CPU Utilization | 50% and 30% with previews disabled |

### On Premise Encoding+Packaging:

3 Programs, encoding to HLS, 4-layers per program (1080p720p/480p/360p)

| Item | Value |
|---|---|
| CPU Utilization | 75% |

Additional Cloud Benchmark information can be found in the Kubernetes installation guides

## Recommended System for Cambria Stream and Cambria Stream Manager

System Recommendation:

This is the suggested configuration for Cambria Stream, though most reasonably modern machines should be able to serve as a Stream Manager. A single machine can run both Cambria Stream and Stream Manager, and installing Cambria Stream Manager will automatically install Cambria Stream. If the same machine will be used to run live streaming channels, a more powerful system may be required depending on the number of concurrent channels.

(Cambria Stream + Stream Manager) or (Cambria Stream only)

| Item | Value |
|---|---|
| Model | HP Z4 |
| Operating System | Linux (Ubuntu 24.04) |
| Processor | Intel Core i9-7940X @ 3.10GHz (14-core Skylake-X) |
| Memory | 32 GB (4x8 GB) DDR4-2666 |
| Video Card | Supports Direct3D acceleration |
| Network Adapter | Gigabit Ethernet (Wired Connection) |
| System Hard Drive | 512 GB HP Z Turbo Drive M.2 NVMe SSD |

For Cloud, additional machine suggestions can be found in the Kubernetes installation guides

## Linux OS: Cambria Stream Installation and Testing Guides

Cambria Stream Manager/Cambria Stream has only been tested with Ubuntu 24.04.

Cambria Stream Solo 5.9.0:

https://www.dropbox.com/scl/fi/1zcvjr5qs4cr0e9q8p4kt/Cambria_Stream_Solo_5_9_0_Guide.pdf?rlkey=qb74dc0n52e4ldn1j977f0kuy&st=p2vduit5&dl=0

Cambria Stream on Akamai LKE (terraform) 5.9.0:

https://www.dropbox.com/scl/fi/zcxe9adbkk51fh2cj3mmk/Cambria_Stream_5_9_0_Terraform_on_Akamai_Kubernetes.pdf?rlkey=mtz279uslyaybj519v8am4s9l&st=tmzzhacz&dl=0

Cambria Stream on Akamai LKE (non-terraform) 5.9.0:

https://www.dropbox.com/scl/fi/kxdeil6y42h5ul1fdhp8l/Cambria_Stream_5_9_0_on_Akamai_Kubernetes.pdf?rlkey=dxprdi7838d8ckn1iev9qwf0n&st=invs2o5a&dl=0

Cambria Stream on AWS EKS (terraform) 5.9.0:

https://www.dropbox.com/scl/fi/ibarqs36so1561hxi8vcc/Cambria_Stream_5_9_0_Terraform_on_AWS_Kubernetes.pdf?rlkey=kpat7chk8v4swrvgff5z6ehzv&st=0zprpvoa&dl=0

Cambria Stream on AWS EKS (non-terraform) 5.9.0:

https://www.dropbox.com/scl/fi/ff5tdvomc2hrd3rr351zt/Cambria_Stream_5_9_0_on_AWS_Kubernetes.pdf?rlkey=udbuy1n5nnxbzhnwtkn4jvcyx&st=8u8oyxyw&dl=0

Cambria Stream User / Testing Guide 5.9.0:

https://www.dropbox.com/scl/fi/ne3t3efc490cnresayawl/Cambria_Stream_Manager_and_Cambria_Stream_5_9_0_User_Guide.pdf?rlkey=vvifcxd1rlgkdlcw21nbwjpec&st=50gqlwof&dl=0

## Windows OS: System Settings

### Machine Administrator for Installation:

It is required that machine administrator account be used for the Cambria software installation. Installation is done through running the setup.exe from the Cambria Stream / Stream Manager installer package for Windows. After installation, a non-administrator account can be used for normal operation.

### Service Credentials:

After installation check the Capella Cambria Stream Service and Capella Cambria Stream Manager service! These services will need to have the appropriate access rights to read from network file locations if you are using the source file option. Here are the instructions on how to modify service credentials.

a. Open the Services panel (Control Panel>Administrative Tools>Services)  
b. Open Properties panel for Capella Cambria Stream/Stream Manager Service  
c. In the Log On tab, select “This account:”  
d. Enter the full domain account and password. (ie. Yourname@company.com)  
e. This domain account must have access rights to the locations you will be reading from  
f. Restart the service as prompted

## Basic Workflows Supported:

### Encode Mode:

**Input:**

- SDI*
- RTP
- SRT
  - Caller and Listener workflows supported
  - Passphrase support
  - Stream ID validation support where configured
- RIST
  - Caller and Listener workflows supported
- Zixi
- NDI via NDI Discovery Server
  - Uncompressed NDI
  - NDI HX1
  - NDI HX2
  - NDI HX3
- RTMP
- Media File
- HLS/TS

**Targets:**

- CMAF
- DASH
- HLS/TS
- HLS (MP4 / fMP4)
- SRT
- RIST
- RTP
- Zixi
- File/TS
- RTMP

**Codec / encoder options:**

- H.264
- HEVC
- H.264 (VPU)**
- HEVC (VPU)**

### Passthrough Mode:

**Sources:**

- RTP/TS
- SRT/TS
- RIST/TS
- RTMP
- Zixi
- Playlist

**ABR In + ABR Out:**

- HLS/TS Push
  - Supported for AWS MediaLive and compatible HLS/TS push senders

**Targets:**

**Multi Streams In + ABR Out:**

- CMAF
- DASH
- HLS

**ABR In + ABR Out:**

- CMAF
- DASH
- HLS

**Single Stream In + Single Stream Out:**

- RTMP Server
- RTP/UDP
- SRT/TS
- RIST/TS
- Zixi/TS
- File/TS

### Direct Capture Mode:

**Sources:**

- RTP
- SRT
- Zixi
- SDI via AJA*

**Target:**

- File/TS

### Encode and ABR Out:

**Supported Cases:**

1. Video + Audio Input and Output
2. Video Only Input + Audio Only Input
3. DRM Support (CPIX, Irdeto, Axinom) -> [Widevine, FairPlay, PlayReady]
   - DASH (Widevine, PlayReady)
   - HLS (FairPlay)
   - CMAF (Widevine, PlayReady, FairPlay)
4. CMAF CTE (Only for CMAF Support)
5. Stream Primary / Backup workflows
6. Publish Types: Akamai, AWS S3, AWS MediaStore, WebDAV, and File
7. Marker Types: ESAM, SCTE-35, SCTE-104*
8. Ad Types: Yospace, AWS Cue Out/Cue In
9. File playlist input support (only x264 and HEVC codecs supported)
10. HEVC Main10 ingest and output support
11. VPU encoding support for H.264 and HEVC on supported Kubernetes NETINT VPU deployments**
12. HLS/TS Push ingest support for ABR In + ABR Out, including AWS MediaLive-compatible workflows
13. HDR10/PQ/HLG ingest support
14. Dolby Vision ingest and output as HDR10 and SDR
15. CMAF subtitle support for WebVTT and IMSC1
16. HLS/fMP4 TTML subtitle support using the IMSC1 profile

### Single Stream Out:

**Supported Cases:**

1. RTMP input and RTMP/RTMPS output
2. RTP/UDP input and output
3. RTP with FEC input and output
4. Zixi output support (only tested with AWS MediaConnect Zixi input)
5. RTMP Tested Platforms: Facebook, YouTube, Wowza
6. File playlist input support (only x264 and HEVC codecs supported)
7. File output support (TS and MP4 only)
8. SRT/TS input and output
9. RIST input and output, including Caller and Listener modes
10. SRT passphrase support
11. SRT Stream ID validation support where configured

### Direct Capture:

**Supported Cases:**

1. Direct Capture from RTP to File/TS
2. Direct Capture from SRT to File/TS
3. Direct Capture from Zixi to File/TS
4. Input/output status indicators and signal lost/recovered activity logging

### Supported Formats for Playlist Feature:

**Video:**

- x264
- HEVC

**Audio:**

- AAC
- AC-3 (Dolby Digital)
- E-AC-3 (Dolby Digital Plus)

**Container:**

- MP4
- TS

Note: other codecs / formats may work, but they are not officially supported

### Input Stream Requirements for Packaging Only Programs:

- Closed, fixed length GOP
- GOP boundary matched with segment duration configured in Stream ABR out target settings
- PTS must be matched across streams
- For HLS/TS Push ingest, video/audio timing and media sequence alignment must be valid across the incoming playlists

## Known Limitations:

1. ABR output layers are synced by incoming stream's PTS so PTS needs to be matched among streams. Encoding output does not have this source requirement.

2. Each Video and Audio layer must have unique bitrate. No two video layers can have the same bitrate. No two audio layers can have the same bitrate.

3. If using Yospace, make sure to match video/audio layers to Yospace endpoint configuration.

4. Ad insertion is passthrough. This means ad breaks need to be inserted in the source. The exception is for ESAM markers.

5. CMAF CTE only uploads to the DASH endpoint. HLS playback does not work in this case.

6. If using CMAF CTE, the LP machine and player machine clocks need to be synced in order to work properly.

7. Inaccurate RTP source streams may cause CMAF CTE to stop playing back on the player end.

8. HLS video/audio output from LP is split.

9. If an ABR project is distributed to run on an LP machine that only contains the license to run a Single Stream project, a slot instance will be used but the project will not work.

10. LPM/LP running on Linux has certain feature limitations compared to Windows. These limitations are documented in the Linux Cambria Stream guide.

11. NDI input support requires NDI Discovery Server configuration. mDNS/local auto-discovery is not the supported workflow for Stream NDI ingest.

12. VPU encoding requires a supported Kubernetes deployment with NETINT VPU hardware.

13. AJA SDI support on on-premises Kubernetes requires `aja_enabled=true`, `aja_allow_privileged=true`, `aja_acknowledge_risk=true`, and a valid `aja_device_path`.

## API documentation:

**Cambria Stream Manager:**

https://www.dropbox.com/scl/fi/2n2damuvbxpi8d1qcj6f6/REST_API_StreamManager-1.11.pdf?rlkey=v0du8tlz37izj8jxm30oqzapb&st=70kp6adj&dl=0

**Cambria Stream:**

https://www.dropbox.com/scl/fi/s4k02b1fi1f1s3kzhi9no/REST_API_Live_and_Stream_2_8.pdf?rlkey=i6nb09q7oryioj3cn2ao44s82&st=rc3wke57&dl=0

## New Features:

Please note that some of these features are in a beta state.
### New Features added for 5.9 (includes new features of 5.7)

```text
Module            Feature                                                            Capella
                                                                                     Reference #
    Cambria       HTTP and S3 Slates                                                 22012
    Stream        Failover, ad, and manual slates now support HTTP and S3
                  sources, including remote HLS playlists and image sources.

  Source /        RIST Input and Output                                              22295
Target / RIST
                  Cambria Stream now supports RIST input and output, including
                  Caller and Listener modes. StreamRouter also supports RIST
                  routing.

Source /          StreamRouter Dynamic Swap Compatibility                            22456
Dynamic Swap
                  StreamRouter inputs are now Dynamic Swap compatible by
                  default. When Align Fragments by Timecode (UTC) is enabled, the
                  timecode-based method is used instead.

    Encode /      NVENC Slice and Motion Constraint Settings                         22600
     NVENC
                  NVENC H.264 encoding now supports Specify Slice Settings with
                  Slice count or Macroblock rows per slice, plus Constrained-frame
                  encoding.

Encode / GPU      GPU Scaling                                                        22278

                  GPU scaling now processes video directly in GPU memory when
                  Use GPU Pipeline and GPU Scaling are enabled.

Encode / GPU      GPU HDR Conversion                                                 22335

                  Cambria Stream now supports GPU-based HDR color conversion
                  for HDR10/PQ, HLG, and SDR709 workflows, including HDR10-to-
                  SDR709, HLG-to-SDR709, HLG-to-PQ, and SDR709-to-HDR10/PQ
                  conversions.

Encode /          Audio Mixing                                                       22433
Audio
                  Advanced Mapping now supports mixing and matching source
                  audio tracks and channels for RTP, SRT, RIST, Zixi, NDI, and
                  media-file sources. Missing tracks or channels produce silent
                  audio and a warning in the Cambria Stream logs.





Target          Transport Stream Rate                                                21896

                Transport Stream Rate can now be configured per TS output
                when automatic rate calculation is disabled. Cambria Stream
                warns when the configured rate is lower than the combined video
                and audio bitrate.

Target          RTP/FEC Recovery                                                     22550

                RTP/FEC now supports staggered-column FEC construction and
                additional receiver-side FEC layouts for improved interoperability
                and packet recovery.

Target / HLS    HLS Video and Audio Interleaving                                     22187

                Interleave Video/Audio Streams is now available for HLS targets
                when the project type is Encode.

Target CMAF /   CMAF Subtitle Support                                                22505
Subtities
                CMAF output now supports WebVTT and IMSC1 subtitles.
                Supported formats include WebVTT for HLS/TS, WebVTT and
                IMSC1 for HLS/fMP4, WebVTT, TTML, EBU-TT-D, and IMSC1 for
                DASH, and WebVTT and IMSC1 for CMAF.

Target SRT /    DVB-TTML in SRT Input                                                21960
Subtitles
                Cambria Stream can decode multi-language DVB-TTML subtitles
                from an SRT source and convert them to supported adaptive-
                streaming subtitle formats such as WebVTT and TTML. If the
                configured language code is not present in the input, the output
                subtitle is empty.

Packager        SCTE-35 Passthrough for HLS                                          22114

                HLS sources can now pass SCTE-35 ad markers through to HLS
                output. Select SCTE35 (HLS/TS) as the Ad Marker Source and
                disable Yospace integration to preserve the markers.

Packager        Align Fragments Defaults                                             21983
                New CMAF and HLS targets now enable the settings required for
                Align Fragments by Timecode: Use Unix Epoch Time to name
                fragments, Use $Time for Fragment Naming, and Use time based
                naming for fragments. Existing projects are unchanged.

Kubernetes      AJA on On-Premises Kubernetes                                        20771

                On-premises Kubernetes deployments now support AJA SDI
                workflows. Note that Cambria Stream On-Premises Kubernetes
                installation is still in beta.



Kubernetes      AWS Terraform Deployment                                           22210

                Adds Cambria Stream-specific Terraform configuration for AWS
                EKS deployments, including AWS infrastructure, Cambria Stream
                components, monitoring, certificates, ingress, and supporting
                Kubernetes services.

Kubernetes      Standalone Ad Break Control Deployment                             21988
                Ad Break Control can now be deployed as a standalone WebUI
                with Cambria Stream Manager through Kubernetes and Solo
                installers. Kubernetes deployments can expose it through an
                ingress or the Cambria Stream Manager load-balancer URL on
                port 8191.

Prometheus      Prometheus Base URL                                                22174

                Kubernetes deployments now provide
                the prometheusBaseUrl Helm variable for specifying the
                Prometheus URL used by Cambria Stream Manager charts.
```


### New Features added for 5.8 (includes new features of 5.7)

```text
Module          Feature                                                            Capella
                                                                                   Reference #
Cambria         Cambria Stream Solo Installer for Single-Machine Linux             21526
Stream Solo /   Deployments
Product
                Capella now has the Cambria Stream Solo product installer, which
                includes a simplified on-prem Kubernetes installer for running
                Cambria Stream on a single Linux machine. The Stream Solo
                package includes setup and uninstall scripts for installing the
                required tools, deploying Cambria Stream/Stream Manager, and
                cleaning up the environment when a reinstall is needed. The
                installer supports VM and bare-metal deployments.

Cambria         Mapped Default Streaming Ports for Cambria Stream Solo             21934
Stream Solo
                Cambria Stream Solo now exposes the default streaming ports
                through Kubernetes NodePort services, making it easier to send
                common input types into a Solo deployment. Supported default
                inputs include RTP 5004–5013, SRT 8000, RTMP 1935, and
                HLS/TS Push 8777. Because Solo uses NodePort mappings,
                senders connect to the mapped host ports rather than directly to
                the internal receiver ports; the full port list and mapping
                examples are available in the Cambria Stream Solo 5.8.0 Guide.

Source / NDI    NDI and NDI HX Source Support via NDI Discovery Server             21322,


                                                                                      21325
               Cambria Stream now supports NDI receive workflows through the
               NDI Discovery Server, including uncompressed NDI and NDI HX1,
               HX2, and HX3 sources. Users configure the sender and receiver to
               use the same Discovery Server, then in Cambria Stream Manager
               use NDI > Config > Reload to refresh and select available NDI
               sources.

               Limitation: Discovery Server can be used with Cambria Stream
               Solo, but the current setup is a temporary configuration and is
               not yet fully seamless.

               To enable NDI, please create the required ndi-config.v1.json file
               using the setup details provided in in this document:
               https://www.dropbox.com/scl/fi/rmvp2aougqob6agwazwse/Camb
               ria-Stream-Solo-NDI-Discovery-Server-Client-
               Setup.pdf?rlkey=46k5a64edceb6om59z7gjcnck&st=oi03r5hu&dl=

               Once the configuration is applied, NDI Discovery Server mode
               should be available.
               Please note that this temporary configuration will need to
               be reapplied after a system reboot or pod restart, which
               may cause some operational inconvenience.

               In a future version, we plan to add this configuration to the Helm
               chart so it is applied automatically and persists across reboots or
               pod restarts.

Source / SRT   SRT Caller Source Pull Mode                                            21519

               Cambria Stream now supports SRT Caller mode as a source
               option, allowing a program to pull video from an SRT Listener
               endpoint. This enables workflows where the source-side program
               initiates the connection to a remote listener instead of waiting for
               an inbound push. To use it, add or edit a program, open the
               Source tab, select SRT as the input source, enable Use Caller
               Mode, then enter the listener machine’s IP address, port, and
               latency settings. For best results, start the SRT Listener program
               first, then start the SRT Caller program so it can connect and
               begin pulling the stream.

Source         Preview Support for Direct Capture Inputs                              21819

               Direct Capture now supports live preview for “Direct Capture -
               Single Stream In” programs, making it easier to confirm that RTP
               or SRT input is being received correctly before checking the final
               output. Preview is enabled by default in Direct Capture mode. To
               disable it, open the program’s Options, go to Advanced Options,
               and uncheck Use Preview (Parse/Decode the incoming stream).



Source         Preview Support for Non-Encode Projects                                 21712

               Cambria Stream now supports preview mode for non-Encode
               project types, making it possible to verify incoming content
               without starting actual streaming. This includes passthrough and
               direct capture workflows such as Multiple Streams In / ABR Out,
               Single Stream In / Out, ABR In / ABR Out, and Direct Capture -
               Single Stream In. To use it, open the receiver program and click
               Preview; the preview appears in the Output Preview tab.

Source / SDI   SCTE-104 Ad Signal Support for SDI Inputs                               21494
               Cambria Stream now supports SCTE-104 as an ad signal source
               for SDI-based workflows. In Stream 5.8, SCTE-104 is listed
               directly as an ad marker option, making the SDI ad signaling
               workflow clearer and easier to configure. When SCTE-104
               markers are detected from the SDI input, they can be carried into
               output manifests as SCTE cue information for downstream ad
               insertion workflows, including HLS/DASH playback and services
               such as Yospace.

Encode /       CRF Rate Control for QVBR-Like Encoding                                 21767
Target
               Cambria Stream now supports an RC Mode setting for video
               layers, with CBR as the default and CRF available for quality-
               based variable bitrate encoding. In CRF mode, users can
               configure Max Bitrate and Quality Level to support QVBR-like
               workflows where visual quality is prioritized while still applying a
               bitrate ceiling. To use it, add or edit a video layer in the Encoding
               tab, set RC Mode to CRF, then configure Max Bitrate and Quality
               Level; the default quality level is 23, with a valid range of 1–51.

VPU Encode /   VPU Encoding Support for Kubernetes Stream Deployments                  21131,
Target                                                                                 21108,
               Cambria Stream now exposes VPU-based encoding options in the            21780
               Stream Manager Web UI for Kubernetes deployments using
               supported NETINT VPU hardware. In Encode projects, open the
               Encoding tab, add or edit a video layer, and select H.264 (VPU) or
               HEVC (VPU) from the Codec dropdown.

               Limitation: VPU is not currently supported with Cambria Stream
               Solo deployments; even on VPU-capable machines.

Target         Edit Programs While Streaming                                           21580

               Cambria Stream Manager now allows users to edit a program
               while it is already streaming. When saving changes, users can
               choose Save to apply the changes the next time the program
               starts; modified-but-unapplied programs are marked with a
               yellow * next to the program name. Users can also choose Apply
               Now to immediately stop, restart, and apply the updated program


                settings. For Primary/Backup workflows, most settings can be
                changed while streaming, but the Use Backup checkbox cannot
                be changed during an active stream.

Target          SRT Listener Mode Authentication and Stream ID                       21653,
                Validation                                                           21645

                Cambria Stream now supports SRT passphrase configuration and
                Stream ID validation for both caller and listener workflows. Users
                can configure SRT passphrases on both sides of a connection;
                streams connect when the passphrases match and fail with
                clearer caller-side error messages when the passphrase is missing
                or mismatched. SRT Listener mode also supports Stream ID
                validation: when a Stream ID is configured on the listener side,
                incoming connections must provide the same ID or the
                connection is rejected and logged. If no Stream ID is configured
                on the listener, incoming connections are accepted using the
                default SRT behavior.

Ad Break        Multi-Program Views for Standalone Ad Break Control                  19921
Control /
Standalone Ad   The standalone Cambria Stream Ad Break Control (ABC) Web UI
Break Control   now supports multi-program views for multi-monitor or multi-
                operator workflows.
                Users can open /abc with a programs= URL parameter to control
                which programs are shown, the order they appear in, and to
                include placeholders for programs that have not started yet.

                The URL format is:
                https://[MachineName]:8381/abc?programs=<ProgramGUID>|<
                DisplayName>,<ProgramGUID>|<DisplayName>
                Program GUIDs can be found by right-clicking on a program and
                selecting "Show Internal Info." Each program entry is separated
                by a comma.

                Example:
                 https://MyMachine:8381/abc?programs=9f3c2a11-6b4d-4d91-
                8c1a-2e7d9a4b8f21%7CTest1,3c8b7e2a-91d4-4f6a-9d12-
                7a5c1e0b6d33%7CTest2

Log /           Grafana Log Filtering from Stream Manager                            20163
Kubernetes
                Cambria Stream Manager can now open Grafana directly with log
                filters for a selected Stream program in Kubernetes deployments.
                Right-click a program and choose Show Log via Grafana to filter
                logs by Event or Current Instance, or open the program’s Show
                Log menu and select the Grafana versions of those views. This
                requires a Kubernetes deployment with ingress enabled, Grafana
                and Loki running, and matching ingress hostnames for Stream
                Manager and monitoring, such as webui.myhost.com and
                monitoring.myhost.com.
```


### New Features added for 5.6

```text
Module           Feature                                                             Capella
                                                                                     Reference #
Source / Audio   Source Audio Mapper                                                 20819
input
                 Cambria Stream now has an Audio Source Mapping tool that
                 allows users to configure source audio and map it to 1 or more
                 tracks (known as a virtual source track).
                 Each Virtual Source Track is encoded into a "Virtual Audio
                 Encoded Output (VST-EO)" set. Each VST-EO is then mapped to
                 one or more Audio Output/Groups.

                 The Audio Source Mapping tool has 3 possible Audio Source
                 Mapping Methods:
                 1. Source Track #: Map a virtual audio source to an audio track
                 from the incoming source based on its index (starting with index
                 1)
                 2. Channels: Map a virtual audio source to a source audio track
                 #. In each virtual audio source, users can remap the source audio
                 track's channels in the order that they
                 should appear when presented to the encoder
                 3. PIDs: Map a virtual audio source to an audio track based on
                 the source audio track's PID
                 Allowed audio mapping configurations per source type:
                 - RTP/SRT/Zixi/Media File: Channels, PIDs, Source Track Number
                 - SDI: Channels (only track 1)
                 - RTMP/HLS (TS): Audio Mapping Not Supported

Source / SDI     SDI ingest can now be configured with more then 2-                  20822
input            channels via the Audio Mapper UI

Source / Audio   Cambria Stream Packager: Multiple Streams In / ABR Out'             20734
Input            project type supports multiple audio per source.
(Packager)
                 How to configure:

                 Source Side:
                 - Specify the source (has to be an IP type source (Eg. SRT, RTP))

                 Target Side:
                 - Specify the IP input to use for audio
                 - Specify the specific audio's track number OR PID

                 Limitations:
                 - Within a target, users can only use either audio track numbers



                or PID, not both
                - For multiple targets, there is no restriction as to what method
                can be used, as long as it is consistent within the targets
                - Multiple audio ingest is not supported for RTMP and Playlist
                source types

Encode /        5.1-channel to 2-channel down mix                                   20832
Target Audio
                For Cambria Stream's encoder, downmixing is now supported and
                will automatically occur for AAC audio output but only for the
                following configurations:
                - Source: 6ch (5.1), Target: 2ch AAC
                - Source: 6ch (5.1), Target: 1ch AAC
                - Source: Dolby Digital 5.1, Target: 2ch AAC
                - Source: Dolby Digital 5.1, Target: 1ch AAC

WebUI           Updated CSM/Assist Video setting UI to match the Audio              20827
                setting UI layout

                This was done to provide consistency in the user interface with
                the various “Outputs” dialog boxes. ABR and RTMP targets are
                not changed.

WebUI           Added direct link to Capella License WebUI from the                 20953
                Cambria Manager WebUI

Grafana and     Grafana was updated to version 12.0 and Prometheus was              20730
Prometheus      updated to version 3.3 in our deployments
```


### New Features added for 5.3

```text
Module          Feature                                                             Capella
                                                                                    Reference #
Encode /        Added HLS/TS source support                                         18777
Source
                Setting can be found under:
                Cambria Stream Assist → Project Type:Encode → Sources (tab)

                Specify the url to the master manifest file in the configuration.

                Notes:
                - Cambria Stream will use the highest video and highest audio
                quality levels (layers)
                - Only TS-based HLS is supported currently
                - HLS interleaved sources are not supported
                - HLS sources with the BYTERANGE marker are not supported


Encode /        Added support to use files as sources                            18805
Source
Encode /        Additional input support                                         18782,
Source Video                                                                     18780,
and Audio       HDR10/PQ/HLG                                                     18796
                4:2:2
                Dolby Vision
                Dolby-E

Encode /        HEVC support was added for HLS/TS targets configured for         18691
Target          the AWS MediaPackage V1 destination

Encode /        Single RTMP output target type added                             18835
Target
Encode /        Audio track selection                                            18838
Audio Source
                Input audio source used can now be specified by PID. Setting
                can be found under:
                Cambria Stream Assist → Project Type:Encode → Sources (tab)

Encode /        Audio normalization filter                                       18789
Audio Filters
                Added a filter that allows for normalizing to an Integrated
                Loudness Target (dB).

Encode /        HLS(TS) URL path supported for Ad Slate Source                   19161
Ad Slate
                ex: https://example.com/slate/index.m3u8

Encode /        Support added for Ad and Sponsor signals through ARIB            18765
Sponsor Slate   B39 from SDI

Encode /        Filters added                                                    18764,
Filters                                                                          18839,
                Filters can be found under:                                      18874,
                Cambria Stream Assist → Project Type:Encode → Sources (tab) or   18786
                Cambria Stream Assist → Project Type:Encode → Filters (tab)

                Filters:
                Logo Filter
                Denoiser Filter
                Timecode Overwrite (in UTC)
                Scrolling Title Burn-in



Encode /        Subtitle input types added for HLS, DASH, and CMAF               18812,
Subtitles       (Unified Streaming) targets:                                     18819,
                                                                                 18817,
                CEA608 / CEA708                                                  18773,
                ARIB STD-B37                                                     18790,
                                                                                 18792


              Subtitle embedding options added for single bitrate out:

              Embed ARIB STD-B24
              Embed VANC as ARIB STD-B40
              Embed VANC as SMPTE 2038
              Embed DVB Subtitle
              Embed Teletext



              SMPTE2038 support added for embedded CEA608/708 and
              ARIB STD B-37 captions only
              A checkbox "Prioritize Metadata (e.g. CEA608/CEA708) inside
              VANC (eg. SMPTE2038)" was added to the "Options" section of
              the project settings. This option needs to be enabled for the
              SMPTE2038 data to be passed through to the output.

Encode /      Sync ABR output based on incoming UTC timecode                       18794
Option
              Setting found in Cambria Stream Assist → Project Type:Encode →
              Options (tab). Source must be TS based.

Encode and    Memory handling improvements and features                            19091,
Packager /                                                                         19144,
Memory        Modification to large kernel memory allocation to avoid memory       19154
Management    increasement.

              Setting added to allows for additional Memory Diagnostics logs to
              be written. Cambria Stream Asist → Project Type:Encode →
              Options (tab) → ‘Include Memory Diagnostics information to the
              troubleshooting log’.

Encode and    License related enhancements                                         19135,
Packager /                                                                         19190,
License       Automatically set concurrent slots based on License configuration    19133
Handling
              Grace Period mechanism coverage improved

              License notifications module updated to account for actual license
              date

Encode /      Multi-program Ad Break Control                                       18702
Companion
Application   Standalone Ad Break Control can be used to monitor and
              manually insert ad break points into output program. Can be
              used with multiple Cambria Stream (Encode) programs at the
              same time.
```


### New Features added for 5.2

```text
Module          Feature                                                               Capella
                                                                                      Reference #
Encode          ‘Listener Mode’ supported for Multi Bitrate SRT output                18507

                Multi Bitrate SRT output in Cambria Stream (Encoder) now has a
                ‘SRT Listener Mode’ checkbox.

Encode          HLS (fMP4) output support added as an Encode Target                   18617
                type

Encode          Multi Bitrate SRT target output added                                 18297

Encode /        GPU (NVENC) Acceleration for HEVC and H.264 encoding                  18542
NVENC
                HEVC (NVENC) and H.264 (NVENC) options enables Stream to
                use specific NVIDIA cards to do accelerated HEVC / H.264
                encoding. This encoder option is included as part of a purchase
                option.

                7th NVENC Generation (or newer) *Qualified* GPUs are
                recommended for better performance and least limitations. For a
                list of GPUs, please visit https://developer.nvidia.com/video-
                encode-and-decode-gpu-support-matrix-new

                The only officially supported card (Capella tested):
                PNY NVIDIA Quadro RTX 4000

Encode /        DVB Burn In filter added                                              18056
Source Option
                DVB subtitles can be burned into the video using this filter. TS
                based IP sources are supported. DVB PID on the source must be
                specified by the user.

Encode /        Source Ad detection using OCR (purchase option)                       18487
Options
                Auto ad detection has been added to Cambria Stream projects.
                This uses OCR to detect specific text in a part of a frame and
                determine whether this text is what is needed to trigger an ad
                break. In the Cambria Stream project under "Options", the user
                can select 'Analysis (OCR)' and configure the text window and
                Python script which will handle the decision making. The user
                can also configure ad breaks and other ad settings for this type of
                workflow.

                Notes:
                - On Linux, users must have the OCR build installed in order to
                use the OCR feature.


             - On Windows, users need to copy the contents of
             CambriaStream_Analysis_CopyToCpx64Folder to the C:\Program
             Files (x86)\Capella\CambriaStream\cpx64 directory.
             - For all users, the OCR dongle bit must be enabled in the license
             in order to use OCR feature.

Encode and   Akamai Object Storage supported as an Upload Target for              18268
Packager     ABR output

             In Cambria Stream adaptive streaming targets (encode and
             packager), there is now the option to upload to Akamai Object
             Storage.

             This works similar to upload to AWS S3 with the exception that
             the region no longer needs to have '.linodeobjects.com' attached
             to the end of the region
             (Eg. Before: us-east-1.linodeobjects.com; After: us-east-1).

Encode and   AWS Media Package supported as an Upload Target for                  18574
Packager     HLS/TS output

             For the HLS/TS target (encode, packager), there is a new upload
             type to AWS Media Package.

             Note: DRM and AES Encryption keys are not supported for this
             upload type.
Encode and   Axinom DRM has been added as a DRM option                            18611
Packager /
DRM          Axinom DRM is now an option for adaptive streaming targets.
             Users will need to create an account with Axinom.

             For Cambria Stream Configuration:
             - CPIX API End Point URL: [ User's Key Service Configuration
             SPEKE URL ]
             - Axinom Tenant ID: [ User's Key Service Configuration Tenant ID
             ]
             - Axinom Management Key: [ User's Key Service Configuration
             Management Key ]
             - CPIX ID: [ Leave Blank if no CPIX ID was provided by Axinom ]
             - CPIX Content ID: [ Any Value Generated by User ]
             - CPIX KID: [ Any Value Generated by User ]

             For Playback:
             1. Go to https://portal.axinom.com/mosaic/tools/drm-video-
             playback
             2. In the DASH / HLS video URL, input the playback url for DASH
             and/or HLS
             3. In the Content Keys section, put the CPIX KID
             4. In the Communication Key, put the License Service Config
             Communication Key ID and Communication Key
             5. Generate JWT


                 6. In a player of choice (Eg. Shaka player), enter the playback
                 url, DRM license url, and in headers, add a header "X-AxDRM-
                 Message" with the value being the JWT generated
Packager         Zixi output support added                                             18332

Web UI           Right-click option to open Cambria Stream Ad Break                    18636
/Programs List   Control UI for running programs added

                 The WebUI now has a context (right-click) menu option for
                 programs that opens the Cambria Stream ABC Web UI for a
                 program. For primary / backup programs, there is an option
                 to show either the primary or backup Cambria Stream ABC Web
                 UI.

                 Note: currently, the private ip is used. For containers (Docker,
                 Kubernetes), this IP address is inaccessible so the ip address will
                 have to be replaced with the external ip of the host
                 in order for the ABC Web UI to show properly. For Kubernetes,
                 this will be the node's external ip address where the Cambria
                 Stream pod is running.

Web UI /         The Desktop Application UI for Cambria Stream Manager                 18592
Windows          has been removed in favor of the Web UI
```


### New Features added for 5.1

```text
Module           Feature                                                               Capella
                                                                                       Reference #
Cambria          Encoding capabilities added to Cambria Stream                         17635
Stream
                 In addition to all the previous packaging only options, Cambria
                 Stream can now also encode and package.

Cambria          Unifed Streaming upload target supported for CMAF output              18036,
Stream                                                                                 17602

Kubernetes       Akamai Kubernetes Support                                             17968,
                                                                                       17928,
                 Cambria Stream Manager / Stream can be run in an Akamai               18122,
                 Kubernetes environment. WebUI (and API) can be used to                18088
                 create and run Programs that can encode and package live
                 streams.

                 Link to Cambria Cluster / FTC 5.1 installation and help guide for
                 Akamai Kubernetes:
                 https://www.dropbox.com/s/4xldehrdf0o4tjg/Cambria_Stream_5



                _1_0_on_Akamai_Kubernetes.pdf?dl=0



Kubternetes     AWS Kubernetes Support (Beta)                                         17932

                Link to Cambria Cluster / FTC 5.1 installation and help guide for
                AWS Kubernetes:
                https://www.dropbox.com/s/z5qk5zm5hjfv817/Cambria_Stream_
                5_1_0_on_AWS_Kubernetes.pdf?dl=0

Kubernetes      Support API Usertoken                                                 18169
                REST API calls now make use of the usertoken (Role-Based API)
                from the Helm values environment variable.
                Except for some public api calls, the rest of the calls such as all
                POST, PUT, and DELETE calls are protected with this usertoken.

Kubernetes      Certificate Manager Configuration                                     18214
                Given a domain name, a cert-manager can be configured to
                generate valid certificates. Instructions in the Kubernetes guide.
```


### New Features added for 5.0

```text
Module          Feature                                                               Capella
                                                                                      Reference #
Source          Enhanced playlist file handling to detect when HRD is not             17448
(Playlist)      preset

Target (HLS)    New HLS generator added to support to enhance 24/7                    16999
                streaming support

                Improves memory usage of HLS generator and has more stability
                for 24/7 workflows.
Target (HLS)    Corrected CPB issue with HLS targets                                  17376

Target          CPB handling improvement, subtitles properly synced to                17470
(Subtitles)     video and audio

Linux           Docker Supported Added (Beta)                                         17362
                https://www.dropbox.com/s/umtwegzg80qvi17/Linux_LivePackag
                er_Guide_1.1.0.pdf
```


### New Features added for 4.8

```text
Module           Feature                                                           Capella
                                                                                   Reference #
Linux            Linux OS Support Added                                            15308,
                 https://www.dropbox.com/s/lmmecqr7wvjph9r/Linux_LivePackager      16863,
                 _Guide_1.0.0.pdf                                                  16862,
                                                                                   16859,
                 Updated 12/19/22 (LPM/LP 5.0):                                    16758
                 https://www.dropbox.com/s/umtwegzg80qvi17/Linux_LivePackag
                 er_Guide_1.1.0.pdf

                 Updated 7/7/23 (Cambria Stream):
                 https://www.dropbox.com/s/pm2n7tlvtanrvng/Linux_Cambria_St
                 ream_Guide_5.1.0.pdf?dl=0

Source           Support Source DVB Teletext                                       16793

MPEG-Dash        Embed EBU-TT-D (TTML) Subtitles in DVB-Dash from                  16794
Target           Source Teletext
(Subtitles)
                 In the DASH target configuration, there is now a new subtitle
                 option for EBU-TT-D output.

Target (Audio)   Multiple audio tracks support                                     16402

                 Inside the project configuration window for ABR targets, the
                 audio settings now has a dropdown that allows users to select
                 how many audio tracks to have. For each audio track, there are
                 also fields to specify the audio track language code, role, and
                 audio purpose.

                 Notes/Limitations:
                 - Only non-HLS related streams supported.
                 - Up to 9 audio tracks are supported.
                 - UI configuration was only added for Windows Desktop UI.

WebUI            WebUI Enhancements                                                16807,
                                                                                   16864
                 - ‘Resync streams when a drop packet is detected’ added to
                 ‘Options’ tab.
                 - Maximum retry duration’ settings added to ‘Program Settings’
                 dialog.
```


### New Features added for 4.7

```text
Module          Feature                                                             Capella
                                                                                    Reference #
Source          SCTE support added to Playlist input                                15776
(Playlist)
                Source files that contain SCTE can now be used as part of the
                Playlist input feature.
Target          Forward Error Correction (FEC) added to RTP input support           15983
(RTP/FEC)
                FEC settings allows for a more robust RTP transmission.
                Live Packager can now receive RTP with FEC, it is recommended
                to use RTP (FEC) input to Live Packager over RTP, where
                possible.

                To configure the Live Packager project to accept RTP (FEC) input,
                when configuring the source to use RTP, click ‘config’ button and
                checkmark ‘Use FEC’. Set the ‘FEC Type’ and specify the ports
                being used for FEC.

Target (ABR     File output setting added ABR Target                                16160
Output)
                In the Live Packager project, ABR output targets (CMAF, DASH,
                HLS) can be configured to have the ‘Upload’ option set to ‘file’.
                This will allow users to output to the local filesystem.



Target (ABR     AVC3 added to AVC Version option for ABR target                     15862
Output)
Target (ABR     DRM (CPIX, Irdeto) support added to CMAF target                     16156
Output, CMAF)
LPM             Program Failover (redundancy scenario) improved to                  16215
                support environments that only have two machines LPM
                (Primary) and LPM (Backup)

                In a Redundancy configuration where there are two LPM
                machines and no LP client machines, we have added a network
                check to determine if LPM is in a “good network state” whenever
                redundancy triggers.

                This check will occur if there are no client machines reachable.
                Here is the domain that LPM will reach out to:
                http://www.gstatic.com/generate_204

                The LPM system (firewall/security settings) will need to be
                configured to be able to reach this location.
```
