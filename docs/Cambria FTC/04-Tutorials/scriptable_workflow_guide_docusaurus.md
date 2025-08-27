---
id: scriptable-workflow-guide
title: Scriptable Workflow Guide
---

# Scriptable Workflow Guide


**1. Overview**

Scriptable Workflows enable users to customize encoding Job parameters
at the beginning of a Job using Python or Perl scripts. These scripts
can access video and audio properties of the source material, such as
resolution, frame rate, loudness, and complexity, and adjust Job
parameters accordingly. If the \'Group of Files\' feature is enabled in
Watch Folder, the script can access all files in the group and combine
them in various ways.

****

****Before Getting Started\
\
****To use Scriptable Workflows, users must be familiar with Cambria FTC
and the Job XML format it employs. Job XML contains settings for
sources, encoders, multiplexers, filters, as well as notification
settings, upload settings, audio mapping, and more. The script will
either modify or generate this Job XML.****\
\
****Examples of what Scripts can be used for\
****\
Modifying target settings (resolution, frame rate, bitrate, etc.) based
on source properties.

-   Automatically failing the Job if a certain source property value
    exists.
-   Automatically setting source segments (In and Out points).
-   Setting up complex Jobs, such as subtitling burn-in with titling
    in/out points controlled through a subtitling file, using the
    \'Group of Files\' option in Watch Folder.\

\

\

****How Scripts work:\
\
****Scripts are executed at the start of the Job, before source decoding
starts. FTC will analyze the source file and augment the 'Source'
section in the original Job XML with source elements and attributes.

Example of 'Source' section after XML is augmented:

\<Source Location=\"\\\\storage\\MP4\\movie_6ch.mp4\"
Duration27MHz=\"270000000\" Name=\"Src1\"\>

\<VideoTrackInfo Format=\"H.264 Video\" FrameMode=\"Progressive\"
FrameRateDen=\"1001\" FrameRateNum=\"30000\" Height=\"480\"
PixelAspectRatioHor=\"4\" PixelAspectRatioVer=\"3\" Width=\"640\"
ColorFormat=\"YUV 420\" /\>

\<AudioTrackInfo BitsPerSample=\"16\" Format=\"AAC Audio\"
NbChannels=\"6\" SampleRate=\"48000\" /\>

\</Source\>

When running script analysis in \'Properties and Contents\' mode
(configurable in the Preset Editor\'s \'Script\' tab), other information
such as video complexity (a measure of how difficult a video is to
encode) and audio loudness can augment the XML. For example:

\<Source Location=\"\\\\storage\\MP4\\movie_6ch.mp4\"
Duration27MHz=\"270000000\" Name=\"Src1\"\>

\<VideoTrackInfo Format=\"H.264 Video\" FrameMode=\"Progressive\"
FrameRateDen=\"1001\" FrameRateNum=\"30000\" Height=\"480\"
PixelAspectRatioHor=\"4\" PixelAspectRatioVer=\"3\" Width=\"640\"
ColorFormat=\"YUV 420\" /\>

\<AudioTrackInfo BitsPerSample=\"16\" Format=\"AAC Audio\"
NbChannels=\"6\" SampleRate=\"48000\" /\>

\<AnalysisInfo\>

\<LoudnessMeterBS1770 TruePeakdbTP=\"**-0.693612**\"
PeakdbFS=\"**-0.69363**\" LoudnessRangeLU=\"**14.9317**\"
LoudnessLUFS=\"**-30.2088**\"/\>

\<VideoComplexity PeakComplexity_30sec=\"**1814.53**\"
AvgComplexity=\"**1556.81**\"/\>

\</AnalysisInfo\>

\</Source\>

Compressed video/audio and muxer properties can also be analyzed (also
configurable in the Preset Editor\'s \'Script\' tab).

(Requires FTC 3.4.1 or newer)

\<Source Location=\"\\\\storage\\MP4\\movie_6ch.mp4\"
Duration27MHz=\"270000000\" Name=\"Src1\"\>

\<VideoTrackInfo Format=\"H.264 Video\" FrameMode=\"Progressive\"
FrameRateDen=\"1001\" FrameRateNum=\"30000\" Height=\"480\"
PixelAspectRatioHor=\"4\" PixelAspectRatioVer=\"3\" Width=\"640\"
ColorFormat=\"YUV 420\" /\>

\<AudioTrackInfo BitsPerSample=\"16\" Format=\"AAC Audio\"
NbChannels=\"6\" SampleRate=\"48000\" /\>

\<Muxer Format=\"MP4 Muxer\" moov_at_start=\"0\" isFragmented=\"0\" \>

\<Track handler=\"video\" codec_type=\"avc1\" /\>

\<Track handler=\"soun\" codec_type=\"mp4a\" /\>

\</Muxer\>

\<VideoProperties\>

\<CompressedProperties Profile=\"Main\" MinGOP=\"3\" MaxGOP=\"60\"
Level=\"30\" Format=\"H.264 Video\" SlicesMin=\"1\" SlicesMax=\"1\"
ReportedBitrateKbps=\"1200\" MaxBFrames=\"2\" EntropyMode=\"CABAC\"
ClosedGOP=\"1\" CalculatedBitrateKbps=\"1180\" CPB=\"9600000\" \>

\</VideoProperties\>

\</Source\>

The original Job XML with source information is used as an input for the
script. The script will output a new Job XML that is used for
transcoding. The process of the Script using the original Job XML and
creating a new Job XML is called Script Transform.

****Script Transform steps:\
****\
1) The Python script is extracted from the original Job XML and is saved
to file (with .pl extension).\
2) The original Job XML is saved to a file, and is modified to include
source video and audio properties. This is referred to as the Input
XML.\
3) CpJobExec (FTC\'s tool which runs transcoding jobs) uses pyton.exe or
perl.exe to execute the script saved to file in step 1. The script
receives in its argument the Input XML and a filename where to create
the Output XML.\
4) CpJobExec reads the Output XML and runs the job using the settings
described by that Output XML.

Note: The Input XML, Output XML, and script files are temporary files.
These files are automatically deleted once the Output XML is submitted.
These files can be preserved by running cpJobExec manually and using the
\'\--s 1\' command line option.\
\
****Available encoding settings****:\
\
****The script can add, remove or modify any settings stored in the Job
XML. To get a list of which settings can be modified, use FTC or the
Manager to extract a Job XML which contains the desired video and audio
encoders, video or audio filters, notification, upload, audio mapping,
etc.****\
\
****Sample Scripts:\
\
****Sample scripts can be found as part of the FTC installation package,
located in:

C:\\Users\\Public\\Documents\\Capella\\Cambria\\Scripts. Users may use
them as is, or can customize a script to their liking. Here are names
and descriptions for some of the scripts.

1\) ModifyBitrateBasedOnSourceResolution.py\
Script looks at the width/height of the source. If it is SD, it sets the
H.264 bitrate to 2000bps. If it is HD, it sets the bitrate to 5000mbps.
\[This assumes that the XML setting for bitrate is \'BitrateKbps\',
which is not the case for all encoders\].

2\) FailIfPAL.py\
Script looks at the frame rate and makes the job fail if the frame rate
is PAL (ie 25 or 50).

3\) FailIfNotHD.py\
Script looks at the frame size and makes the job fail if the width is
less than 1280 or if the height is less than 720.

4\) SetInTimecodeTo_01_00_00_00.py\
Script sets the In Timecode to 01:00:00:00, and sets no Out point (so we
keep transcoding until the end of the file).

5\) Create5MinuteSegment.py\
Script set In point at 0 and Out point at 5 minutes.

6\) UseHalfSourceFrameRateIfMoreThan30fps.pl\
Script inspects the source frame rate. If it is 30 or less, output frame
rate is set to source frame rate. If it is over 30, output frame rate is
set to half of source frame rate. \[This assumes that the target can use
any frame rate, so for example this wouldn\'t work with DV output\].

7\) AddPreroll_Postroll.py\
Stitches the source file with a preroll and/or postroll source file.

8\) MapAdditionalAudio.py\
Used with Watch Folder \'Group of Files\'. Combines audio from external
sources to the audio of the main source file. This can for example
combine audio of different languages into a multi-track source.

9\) PassthroughAudioIfAC3.py\
If the source\'s audio is encoded in AC-3 format, use Audio Passthrough.
Otherwise, re-encode audio to the format specified in the original job
encoding settings.

10\) SkipAdaptiveStreamingLayersBasedOnSourceResolution.py\
Removes any Adaptive Streaming (DASH, Smooth Streaming) layer if that
layer\'s resolution is higher than the source resolution.

11\) AdaptiveBitrateLadderBasedOnVideoComplexity.py\
Measures the source video complexity (a measure of how difficult it is
to encode) and modifies the bitrate for each DASH or HLS layer. Less
complex sources will be encoded at lower bitrate than more difficult
sources.

**2. Writing a script**

This section will cover the basics of writing a script. We will see how
to get the source\'s properties and how to modify the encoding
settings.\
\
****Header/Footer****

Scripts should start with the following code, which validates the inputs
(source XML file and output XML file) and parses the input into the
\$data variable. In this document, this code is referred to as the
\'common header\'.

#!/usr/bin/env python3

 

**import** sys

**import** xml.dom.minidom

 

**def** main():

**if** len(sys.argv) != 3:

**print**(\"**\\n**Usage: ModifyXML.py inputXML outputXML**\\n**\")

**return**

 

inputPath = sys.argv\[1\]

outputPath = sys.argv\[2\]

 

**with** open(inputPath, \'r\') **as** f:

xmlContent = f.read()

 

doc = xml.dom.minidom.parseString(xmlContent)

Scripts should end with the following code, which closes the input and
output files, and writes the modified Job XML contents into the output
location. In this document, this code is referred to as the \'common
footer\'.

**with** open(outputPath, \'w\') **as** f:

f.write(doc.toxml())

****Special**** Job Settings\
\
****The following special settings can be added to a job settings, under
the \'Job\' element.

To cause the transcoding to fail (for example because the source has
unacceptable properties, such as resolution too low):

job.setAttribute(\'IsError\', \'1\')

job.setAttribute(\'ErrorMessage\', \'Source resolution is too low\')

To skip transcoding altogether, without causing the job to fail:

job.setAttribute(\'NoAction\', \'1\')

**3. Editing/Troubleshooting a Custom Script**

Being able to retain and reuse the temporary files that are created in
the Script Transform step can aid in script writing and debugging. Here
are the steps on how to retain the temporary Script Transform files.

1.  Create a Job XML that contains a script. You can do this by
    "queuing" an encoding job. Then from Cambria Manager, right click on
    the Job and select 'Diagnostics'  'Extract Job XML'. A JobData.xml
    file will be created.
2.  Open up command prompt (CMD)
3.  Change directory to C:\\Program Files (x86)\\Capella\\Cambria\\cpx64
4.  Run CpJobExec.exe \--xml JobData.xml \--s 1

The "\--s 1" parameter for CpJobExec.exe will turn off the automatic
delete of the Script Transform files.

When running the job, the location of a folder containing files to
re-execute the script will be printed out. For example:\

CpJobExec.exe \--xml C:\\temp\\JobWithScript.xml \--s 1

\...

JobExec::Process - Job Type: MediaGeneric

Number of scripts: 1

Script is not configured to analyze the properties and contents

Batch file to re-run python script, creating Output XML from Input XML:

C:\\Users\\myusername\\AppData\\Local\\Packages\\cpsandbox\\AC\\rerun_0\_e594e862-07b7-4c1b-b3be-60c2a50f1f9c.bat\

The folder will include these files:

1.  Input XML: src_xxxxx.xml (original Job XML with Source elements and
    attributes)
2.  Output XML: tgt_xxxxx.xml (job XML generate by the script)
3.  Python Script: script_xxxxx.py (the script used)
4.  Batch file: rerun_xxxxx.bat (used to re-run the script and generate
    a new job XML)

You can now modify the script and re-execute it by double-clicking the
\'rerun_xxxxx.bat\' file. This will overwrite the \'tgt_xxxxx.xml\'
file.

You can also test different input properties by modifying the
\'src_xxxxx.xml\' file.

**4. Sample Scripts**

This section contains the logic of different scripts, with the common
header, common footer and variable declaration removed for simplicity.

ModifyBitrateBasedOnSourceResolution.py\
Sets video bitrate to 5000kbps if the source height is 720 pixels or
greater. Otherwise, video bitrate is set to 2000kbps.

source = data.getElementsByTagName(\'Source\')\[0\]

video = source.getElementsByTagName(\'VideoTrackInfo\')\[0\] **if**
source.getElementsByTagName(\'VideoTrackInfo\') **else** None

height = int(video.getAttribute(\'Height\')) **if** video **else** 0

isHD = height \>= 720

settings = data.getElementsByTagName(\'Settings\')\[0\]

**for** \_setting **in** settings.childNodes:

**if** \_setting.nodeType == \_setting.ELEMENT_NODE **and**
\_setting.getAttribute(\'Type\') == \'Video\':

bitrate = int(\_setting.getAttribute(\'BitrateKbps\'))

**if** **not** isHD:

\_setting.setAttribute(\'BitrateKbps\', \'2000\')

**else**:

\_setting.setAttribute(\'BitrateKbps\', \'5000\')

**FailIfPal.py\
**Fails the transcoding job if the source frame rate is 25fps or 50fps.

source = data.getElementsByTagName(\'Source\')\[0\]

video = source.getElementsByTagName(\'VideoTrackInfo\')\[0\]

frameRateNum = int(video.getAttribute(\'FrameRateNum\'))

frameRateDen = int(video.getAttribute(\'FrameRateDen\'))

isPAL = False

 

**if** (frameRateNum == 25 **and** frameRateDen == 1) **or**
(frameRateNum == 50 **and** frameRateDen == 1):

isPAL = True

 

job = data.getElementsByTagName(\'Job\')\[0\]

**if** **not** isPAL:

job.setAttribute(\'IsError\', \'1\')

job.setAttribute(\'ErrorMessage\', \'Source is not PAL\')

UseHalfSourceFrameRateIfMoreThan30fps.py\
Encoding using source\'s frame rate, or half source\'s frame rate if it
is greater than 30fps.

source = doc.getElementsByTagName(\'Source\')\[0\]

video = source.getElementsByTagName(\'VideoTrackInfo\')\[0\]

 

**if** video:

frameRateNum = int(video.getAttribute(\'FrameRateNum\'))

frameRateDen = int(video.getAttribute(\'FrameRateDen\'))

sourceFrameRate = frameRateNum / frameRateDen

setSame = 1 **if** sourceFrameRate \<= 30 **else** 0

 

settings = doc.getElementsByTagName(\'Settings\')\[0\]

**for** setting **in** settings.childNodes:

**if** setting.getAttribute(\'Type\') == \'Video\':

outputFrameRate = float(setting.getAttribute(\'FrameRate\'))

**if** setSame == 0:

setting.setAttribute(\'FrameRate\', str(sourceFrameRate / 2))

**else**:

setting.setAttribute(\'FrameRate\', str(sourceFrameRate))

PassthroughAudioIfAC3.py\
Use Audio Passthrough if the source contains AC-3 audio. Otherwise,
re-encode audio as specified in the encoding settings.

\$source = \$data-\>getElementsByTagName(\'Source\')-\>item(0);

\$audio = \$source-\>getElementsByTagName(\'AudioTrackInfo\')-\>item(0);

**if**(\$audio)

{

\$format = \$audio-\>getAttribute(\'Format\');

**if** (\$format eq \'AC-3 Audio\')

{

\$isAC3 = 1;

}

 

\$settings = \$data-\>getElementsByTagName(\'Settings\')-\>item(0);

\@list = \$settings-\>getChildNodes;

**for** my \$\_setting (@list)

{

\$type = \$\_setting-\>getAttribute(\'Type\');

**if** (\$type eq \'Audio\')

{

\$encoderName = \$\_setting-\>getAttribute(\'EncoderName\');

**if** (\$isAC3 == 1)

{

\$\_setting-\>setAttribute(\'EncoderName\', \'Audio Passthrough\');

}

}

}

}
