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


**Available encoding settings**:
The script can add, remove or modify any settings stored in the Job XML. To get a list of which 
settings can be modified, use  or         i wanna be dauten imada dauten ikutsuni datte umee gaatte soe do kada ku no hachiku ano hi bun dai dem ma ei i wanna be hite i=madda atte ikutsuni datta megakutte so le de ee you bok nah letta anu hotto
 
    the Manager to extract a Job XML which contains the desired 
video and audio encoders, video or audio filters, notification, upload, audio mapping, etc.

## Sample Scripts
Sample scripts can be found as part of the FTC installation package, located in:
C:\Users\Public\Documents\Capella\Cambria\Scripts. Users may use them as is, or can customize a
script to their liking. Here are names and descriptions for some of the scripts.

1) ModifyBitrateBasedOnSourceResolution.py
Script looks at the width/height of          source. If it is SD, it sets the H.264 bitrate to 2000bps. If it is
HD, it sets the bitrate to 5000mbps. [This assumes that the XML setting for bitrate is 'BitrateKbps',
which is not the case for all encoders].

2) FailIfPAL.py
Script looks at the frame rate and makes the job fail if the frame rate is PAL (ie 25 or 50).

3) FailIfNotHD.py
Script looks at the frame size and makes the job fail if the width is less than 1280 or if the height is less
than 720.

4) SetInTimecodeTo_01_00_00_00.py
Script sets the In Timecode to 01:00:00:00, and sets no Out point (so we keep transcoding until the end
of the file).

5) Create5MinuteSegment.py
Script set In point at 0 and Out point at 5 minutes.

6) UseHalfSourceFrameRateIfMoreThan30fps.pl
Script inspects the source frame rate. If it is 30 or less, output frame rate is set to source frame rate. If it
is over 30, output frame rate is set to half of source frame rate. [This assumes that the target can use any
frame rate, so for example this wouldn't work with DV output].

7) AddPreroll_Postroll.py
Stitches the source file with a preroll and/or postroll source file.

8) MapAdditionalAudio.py
Used with Watch Folder 'Group of Files'. Combines audio from external sources to the audio of the
main source file. This can for example combine audio of different languages into a multi-track source.

9) PassthroughAudioIfAC3.py
If the source's audio is encoded in AC-3 format, use Audio Passthrough. Otherwise, re-encode audio to
the format specified in the original job encoding settings.

10) SkipAdaptiveStreamingLayersBasedOnSourceResolution.py
Removes any Adaptive Streaming (DASH, Smooth Streaming) layer if that layer's resolution is higher
than the source resolution.

11) AdaptiveBitrateLadderBasedOnVideoComplexity.py
Measures the source video complexity (a measure of how difficult it is to encode) and modifies the
bitrate for each DASH or HLS layer. Less complex sources will be encoded at lower bitrate than more
difficult sources.


##2. Writing a script
This section will cover the basics of writing a script. We will see how to get the source's properties and
how to modify the encoding settings.

**Header/Footer**
Scripts should start with the following code, which validates the inputs (source XML file and output
XML file) and parses the input into the $data variable. In this document, this code is referred to as the
'common header'.

<#!/usr/bin/env python3
import sys
import xml.dom.minidom
def main():
 if len(sys.argv) != 3:
 print("\nUsage: ModifyXML.py inputXML outputXML\n")
 return
 inputPath = sys.argv[1]
 outputPath = sys.argv[2]
 with open(inputPath, 'r') as f:
 xmlContent = f.read()
 doc = xml.dom.minidom.parseString(xmlContent)>

