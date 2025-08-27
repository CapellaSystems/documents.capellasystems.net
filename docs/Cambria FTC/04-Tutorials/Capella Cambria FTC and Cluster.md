---

title: Scriptable Workflow Guide

---
# Capella Cambria FTC and Cluster — Scriptable Workflow Guide

## 1. Overview

Scriptable Workflows enable users to customize encoding Job parameters at the beginning of a Job using Python or Perl scripts. These scripts can access video and audio properties of the source material, such as resolution, frame rate, loudness, and complexity, and adjust Job parameters accordingly. If the "Group of Files" feature is enabled in Watch Folder, the script can access all files in the group and combine them in various ways.

### Before Getting Started

To use Scriptable Workflows, users must be familiar with Cambria FTC and the Job XML format it employs. Job XML contains settings for sources, encoders, multiplexers, filters, notification settings, upload settings, audio mapping, and more. The script will either modify or generate this Job XML.

### Example Use Cases

* Modifying target settings (resolution, frame rate, bitrate) based on source properties
* Failing a Job automatically based on undesired source properties
* Automatically setting In/Out segments
* Creating complex workflows such as subtitle burn-in with time-controlled titling using the "Group of Files" option

### How Scripts Work

Scripts are executed at the start of the Job before source decoding begins. FTC analyzes the source and augments the `<Source>` section of the original Job XML:

```xml
<Source Location="\\storage\MP4\movie_6ch.mp4" Duration27MHz="270000000" Name="Src1">
  <VideoTrackInfo Format="H.264 Video" FrameMode="Progressive" FrameRateDen="1001" FrameRateNum="30000" Height="480" PixelAspectRatioHor="4" PixelAspectRatioVer="3" Width="640" ColorFormat="YUV 420" />
  <AudioTrackInfo BitsPerSample="16" Format="AAC Audio" NbChannels="6" SampleRate="48000" />
</Source>
```

Additional analysis results (video complexity, audio loudness, muxer info, codec info) can appear in `<AnalysisInfo>`, `<Muxer>`, and `<VideoProperties>` if enabled in Preset Editor:

```xml
<AnalysisInfo>
  <LoudnessMeterBS1770 TruePeakdbTP="-0.69" LoudnessLUFS="-30.2" />
  <VideoComplexity AvgComplexity="1556.81" />
</AnalysisInfo>
```

The **Script Transform** process includes:

1. Extracting script from Job XML (saved as `.py` or `.pl`)
2. Saving augmented Job XML as Input XML
3. Calling `python` or `perl` with Input XML and an output path
4. Job runs based on Output XML

Temporary files are deleted unless you run with `--s 1`:

```bash
CpJobExec.exe --xml JobData.xml --s 1
```

## 2. Writing a Script

### Common Header

```python
#!/usr/bin/env python3
import sys
import xml.dom.minidom

def main():
    if len(sys.argv) != 3:
        print("\nUsage: script.py inputXML outputXML\n")
        return

    inputPath = sys.argv[1]
    outputPath = sys.argv[2]

    with open(inputPath, 'r') as f:
        xmlContent = f.read()

    doc = xml.dom.minidom.parseString(xmlContent)
```

### Common Footer

```python
    with open(outputPath, 'w') as f:
        f.write(doc.toxml())
```

### Special Job Settings

To **fail the job**:

```python
job.setAttribute('IsError', '1')
job.setAttribute('ErrorMessage', 'Source resolution is too low')
```

To **skip the job without failing**:

```python
job.setAttribute('NoAction', '1')
```

## 3. Editing / Troubleshooting Scripts

To retain temporary files during testing:

```bash
CpJobExec.exe --xml JobData.xml --s 1
```

You will find:

* `src_xxxx.xml` → Input XML
* `tgt_xxxx.xml` → Output XML
* `script_xxxx.py` → Script
* `rerun_xxxx.bat` → Batch file to regenerate output

You can test script changes by modifying the script and rerunning the batch file.

## 4. Sample Scripts

### ModifyBitrateBasedOnSourceResolution.py

```python
source = data.getElementsByTagName('Source')[0]
video = source.getElementsByTagName('VideoTrackInfo')[0]
height = int(video.getAttribute('Height'))
isHD = height >= 720
settings = data.getElementsByTagName('Settings')[0]
for s in settings.childNodes:
    if s.nodeType == s.ELEMENT_NODE and s.getAttribute('Type') == 'Video':
        s.setAttribute('BitrateKbps', '5000' if isHD else '2000')
```

### FailIfPal.py

```python
frameRateNum = int(video.getAttribute('FrameRateNum'))
frameRateDen = int(video.getAttribute('FrameRateDen'))
if (frameRateNum, frameRateDen) in [(25, 1), (50, 1)]:
    job.setAttribute('IsError', '1')
    job.setAttribute('ErrorMessage', 'Source is PAL')
```

### UseHalfSourceFrameRateIfMoreThan30fps.py

```python
sourceFrameRate = frameRateNum / frameRateDen
newRate = sourceFrameRate / 2 if sourceFrameRate > 30 else sourceFrameRate
setting.setAttribute('FrameRate', str(newRate))
```

### PassthroughAudioIfAC3.py (Perl)

```perl
$format = $audio->getAttribute('Format');
if ($format eq 'AC-3 Audio') {
    $_setting->setAttribute('EncoderName', 'Audio Passthrough');
}
```

## More Example Scripts

1. **SetInTimecodeTo\_01\_00\_00\_00.py** – Sets In Timecode, leaves Out unset
2. **Create5MinuteSegment.py** – Sets In to 0, Out to 5 mins
3. **UseHalfSourceFrameRateIfMoreThan30fps.pl** – Perl version of frame rate halving
4. **AddPreroll\_Postroll.py** – Concatenate intro/outro
5. **MapAdditionalAudio.py** – Merge audio from external source
6. **SkipAdaptiveStreamingLayersBasedOnSourceResolution.py** – Drop DASH/HLS layers > source resolution
7. **AdaptiveBitrateLadderBasedOnVideoComplexity.py** – Tune bitrates based on complexity

> 📂 Sample scripts are located in:
> `C:\Users\Public\Documents\Capella\Cambria\Scripts`

---

