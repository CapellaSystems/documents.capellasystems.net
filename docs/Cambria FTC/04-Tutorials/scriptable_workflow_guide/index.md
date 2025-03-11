# (UC) Scriptable Workflow

## Overview

Scriptable Workflows enable users to customize encoding Job parameters at the beginning of a Job using Python or Perl scripts. These scripts can access video and audio properties of the source material, such as resolution, frame rate, loudness, and complexity, and adjust Job parameters accordingly. If the 'Group of Files' feature is enabled in Watch Folder, the script can access all files in the group and combine them in various ways.

### Before Getting Started

To use Scriptable Workflows, users must be familiar with Cambria FTC and the Job XML format it employs. Job XML contains settings for sources, encoders, multiplexers, filters, as well as notification settings, upload settings, audio mapping, and more. The script will either modify or generate this Job XML.

### What You Can Do With Scripts

- Modifying target settings (resolution, frame rate, bitrate, etc.) based on source properties.
- Automatically failing the Job if a certain source property value exists.
- Automatically setting source segments (In and Out points).
- Setting up complex Jobs, such as subtitling burn-in with titling in/out points controlled through a subtitling file, using the 'Group of Files' option in Watch Folder.


## How Scripts Work

Scripts are executed at the start of the Job, before source decoding starts. FTC will analyze the source file and augment the `Source` section in the original Job XML with source elements and attributes.

### Example of `Source` Section 
```xml
<Source Location="\\storage\MP4\movie_6ch.mp4" Duration27MHz="270000000" Name="Src1">
    <VideoTrackInfo Format="H.264 Video" FrameMode="Progressive" FrameRateDen="1001" FrameRateNum="30000" Height="480" PixelAspectRatioHor="4" PixelAspectRatioVer="3" Width="640" ColorFormat="YUV 420" />
    <AudioTrackInfo BitsPerSample="16" Format="AAC Audio" NbChannels="6" SampleRate="48000" />
</Source>
```

When running script analysis in 'Properties and Contents' mode (configurable in the Preset Editor's 'Script' tab), other information such as video complexity (a measure of how difficult a video is to encode) and audio loudness can augment the XML. For example:

```xml
<AnalysisInfo>
    <LoudnessMeterBS1770 TruePeakdbTP="-0.693612" PeakdbFS="-0.69363" LoudnessRangeLU="14.9317" LoudnessLUFS="-30.2088" />
    <VideoComplexity PeakComplexity_30sec="1814.53" AvgComplexity="1556.81" />
</AnalysisInfo>
```

Compressed video/audio and muxer properties can also be analyzed:

(Requires FTC 3.4.1 or newer)


```xml
<Muxer Format="MP4 Muxer" moov_at_start="0" isFragmented="0">
    <Track handler="video" codec_type="avc1" />
    <Track handler="soun" codec_type="mp4a" />
</Muxer>
```

The script outputs a new Job XML that is used for transcoding. This process is called **Script Transform**.



## Script Transform Steps

1. The Python script is extracted from the original Job XML and saved to a file.
2. The original Job XML is saved to a file and modified to include source video and audio properties. This is referred to as the **Input XML**.
3. CpJobExec (FTC's tool) uses `python.exe` or `perl.exe` to execute the script. The script receives the Input XML as an argument and outputs a new Job XML.
4. CpJobExec reads the Output XML and runs the job using its settings.

**Note:** Temporary files (Input XML, Output XML, and script files) are automatically deleted unless preserved using the `--s 1` command-line option.


Available encoding settings:
The script can add, remove or modify any settings stored in the Job XML. To get a list of which 
settings can be modified, use FTC or the Manager to extract a Job XML which contains the desired 
video and audio encoders, video or audio filters, notification, upload, audio mapping, etc.




### ModifyBitrateBasedOnSourceResolution.py

```python
source = data.getElementsByTagName('Source')[0]
video = source.getElementsByTagName('VideoTrackInfo')[0] if source.getElementsByTagName('VideoTrackInfo') else None
height = int(video.getAttribute('Height')) if video else 0
isHD = height >= 720
settings = data.getElementsByTagName('Settings')[0]
for _setting in settings.childNodes:
    if _setting.nodeType == _setting.ELEMENT_NODE and _setting.getAttribute('Type') == 'Video':
        if not isHD:
            _setting.setAttribute('BitrateKbps', '2000')
        else:
            _setting.setAttribute('BitrateKbps', '5000')
```

---

### FailIfPal.py

```python
source = data.getElementsByTagName('Source')[0]
video = source.getElementsByTagName('VideoTrackInfo')[0]
frameRateNum = int(video.getAttribute('FrameRateNum'))
frameRateDen = int(video.getAttribute('FrameRateDen'))

isPAL = (frameRateNum == 25 and frameRateDen == 1) or (frameRateNum == 50 and frameRateDen == 1)

job = data.getElementsByTagName('Job')[0]
if isPAL:
    job.setAttribute('IsError', '1')
    job.setAttribute('ErrorMessage', 'Source is PAL')
```

---

### UseHalfSourceFrameRateIfMoreThan30fps.py

```python
source = doc.getElementsByTagName('Source')[0]
video = source.getElementsByTagName('VideoTrackInfo')[0]

if video:
    frameRateNum = int(video.getAttribute('FrameRateNum'))
    frameRateDen = int(video.getAttribute('FrameRateDen'))
    sourceFrameRate = frameRateNum / frameRateDen
    setSame = 1 if sourceFrameRate <= 30 else 0

    settings = doc.getElementsByTagName('Settings')[0]
    for setting in settings.childNodes:
        if setting.getAttribute('Type') == 'Video':
            if setSame == 0:
                setting.setAttribute('FrameRate', str(sourceFrameRate / 2))
            else:
                setting.setAttribute('FrameRate', str(sourceFrameRate))


