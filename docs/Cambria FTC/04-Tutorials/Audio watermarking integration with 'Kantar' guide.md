## Audio watermarking integration with 'Kantar' guide

**Document Version:**

*   
  1.0: Initial release. This is matched to 4.2.0.45153.


**Requirements:**

* FTC/Cluster 4.2 Release build (tested at 4.2.0.45153), and corresponding system requirements. Please refer to release notes for details.  
* Kantar License for audio watermarking (Acquired from Kantar themselves)

### Section 1: Setup Watch Folder 

* The following uses F:\\ as a base path for simplicity.   
  * For Cluster Watch Folder, UNC path is required.   
      
1. Go to Cambria Manager Application, Click the Watch Folder Tab, Click Add to configure Watch Folder.  
2. Enter the following details for your watch folder configuration:

	Folder To Watch: F:\\WatchFolderInput (location of your source files)  
You may want to start with a clean folder for easier troubleshooting  
Name: Watch Folder for Kantar Watermarking (cosmetics only)

3. Go to the Source Acceptance Tab and set Accept if source file size is constant for: 30 seconds  
   You can set it shorter or longer. It means, after the source is copied to the Watch Folder, the delay before the encoding begins.  
     
     
     
     
     
     
4. Go to the Encoding Tab and Click on the Add Simple Action... Button, This will open the Add Simple Action window, set the following settings:

Action: Encoding to target preset

1. Then Click Edit… next to Encoding Settings  
   1. Specify the following settings: 

      Output Folder: “F:\\WatchFolderOutput”

      Preset Name:  Kantar Watermark

      Specify your Encoding Format, Video Settings, Audio Settings, Containing Format Settings, Transcoding Preferences, and more…

      Then Click OK.

2. After setting up your encoding settings, click Edit.. next to Source Filters

   This should open the Source Filters window

   1. Select Add, opens the Add Filter window  
   2. Select Filter from the dropdown: Snap Audio Watermark Filter settings

      Specify the following settings:

      Apply To: Select a specific audio track you would like to watermark or select all tracks

      Media License File: Browse to your Kantar License Information and point to your Lic File

      Audience License File: Browse to your Kantar License Information and point to your Aud File

      Once those Files are selected, the following settings should be available to configure:

      	Channel Name, Content ID, Metadata 1-8

      Metadata 1 is a mandatory field for Snap Audio Watermarking, so specify the correct metadata.

      Then Click OK, Click OK again to Add this filter

3. Finally Click OK to Add Simple Action

5. Select Perform Actions in parallel, Activate this Watch Folder and Click OK to add Watch Folder.

### 

### Section 2: Perform Encoding and Apply Watermarking

1. Drag and Drop any source into F:\\WatchFolderInput, This will queue a job after waiting for the Source Acceptance duration to pass.  
2. The Job should successfully encode and apply the watermark and the Job can be seen in the Jobs  Queue in Cambria Manager Application.  
3. The output file from that Job should be preset here: F:\\WatchFolderOutput  
   

### Section 3: Verify Playback and Watermarking 

1. Playback the output file on any player of your choice  
2. Watermarking can be verified by downloading the following program:  
   1. "S:\\Engineering\\3rd\_party\\Kantar\\QC Detector 6.0\\setupFileQcDetectorSnap-6.0-120299.exe"   
   2. Get license from Kantar (this is different license than watermarking SDK)  
   3. Copy license to C:\\Program Files (x86)\\Kantar Media France\\FileQcDetectorSnap  
      C:\\Program Files (x86)\\Kantar Media France\\FileQcDetectorSnap\\AudioWatermarkFileDetectorCL.exe" should now work  
3. Alternatively, if you just want to see if an audio is watermarked, there is Android/iOS Application "Detect Now" (from Kantar), no need for a license.  
   

     
     
     
   

   	

   

