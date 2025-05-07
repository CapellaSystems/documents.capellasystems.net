---
title: Watch Folder with Unique Subtitle Burn-In
---

# Cambria Watch Folder - Unique Subtitle Burn-In

NOTE: User will need to know # of subtitles to use as they set up Watch-Folder.

Launch Cambria Manger

Go to Watch Folder Tab, Add a Watch Folder

In the Watch Folder configuration window set the following:

![Screenshot](01_screenshot.png)


Folder to Watch (folder where you drop your source files to be encoded)

![Screenshot](02_screenshot.png)


Subfolders to watch (Depends on if your watch folder has subfolders)

Priority

Name and Description

Go to the Source Acceptance Tab set the following:

![Screenshot](03_screenshot.png)


Accept if source file is constant for: (Set Time by using dropdown or enter in time)

Make sure Source is a group of files is enabled

The files in my test example are called source1234.mov, source1234_eng.txt, source1234_spa.txt and source1234_ger.txt.

Please add the following as shown below:

%match%.*, %match%_eng.txt %match%_spa.txt and %match%_ger.txt

Next, go to the Encoding Tab here you will add your encoding actions:

Click the Add Simple Action … button on the right

![Screenshot](04_screenshot.png)


For the Trigger select: %match%.* as shown below:

Action set to: Encode to Target Preset

Here you can select Edit… button on the right to edit your Encoding Settings, Source Filter Settings, and Conditional Audio Mapping settings

![Screenshot](05_screenshot.png)


For this scenario please click Edit… next to the Source Filters, here you will add the Subtitle Burn-in Filters based on the # of subtitles you have:

Click Add button to add a filter

In the Select Filter dropdown select: Subtitle Burn-In and Click OK

This will launch the Subtitle Burn-in filter settings where you can specify your subtitle settings and load a subtitle

![Screenshot](06_screenshot.png)


For our example case we are going to set the Subtitle Settings:

Set Subtitle Source Type to: Visititle Single Timecode format

Browse for your first subtitle source file, in our example case it is: source1234_eng.txt

Repeat steps 1-4 above for each subtitle file so in total you should have 3 Subtitle Burn-In Filters

Click OK to add your subtitle burn-in filter to your watch folder configuration.

NOTE: Make sure the subtitle burn-in filters are configured for the right Subtitle Source Type (in our example, we are using Visititle Single Timecode format).

Modify your Encoding Settings, click Edit… Button (Add Script UseMultiSubBurnInSourcesFromGroupOfFiles.pl)

This will launch the preset editor where you can configure your encoding settings

Go to the Scriptable Workflow Tab:

Enable Scriptable Workflow

![Screenshot](07_screenshot.png)


Leave default settings and load the following script by clicking Add Script button:

Click OK to save your encoding settings with script added.

Click OK to go back to Watch Folder configuration window and Enable Activate this Watch-Folder.

![Screenshot](08_screenshot.png)


Drop your source file along with your subtitle files into the Watch Folder you specified in step 3, the Encoding Job should start.

![Screenshot](09_screenshot.png)


Your output file should have 3 subtitles burned in, you can change their positions to see all three in the Subtitle Burn-In fitler settings.
