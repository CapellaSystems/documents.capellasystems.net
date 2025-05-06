# SCTE-35

		Cambria FTC supports the use of SCTE-35 insertion. To use this feature within a project perform the following steps:

1. Open FTC/ FTC(Cluster).  
2. Select the source file(s) to be used for the project.  
3. Set any of the settings needed for the source, such as using segments, filters, or mapped audio.  
4. Select ‘**Encoding**’ and then ‘**Add...**’ to create a new preset.  
5. In the Preset Editor window, perform the following:  
   1. Select the ‘**Encode**’ tab.  
   2. Set the Container to ‘**MPEG-2 Transport Stream**’.  
   3. Set the Video to ‘**H.264 (x264)**’.  
   4. Scroll down to Video Settings and enable ‘**Use fixed length GOP**’.  
   5. Scroll down to Container Format Settings and enable ‘**Write SCTE35**’.  
   6. Set the ‘**SCTE35 marker lead time (ms)**’ to the needed time frame (4-8 seconds).  
   7. Select the ‘**Filter**’ tab, followed by the down arrow next to **‘Add**’, and then ‘**Markers**’ from the list to add a new filter to your target file.  
   8. In the Markers Filter Settings, set the Usage to ‘**SCTE35 Slice Insert**’.  
   9. For **Timecode Mode** select the necessary option for either a user set timecode or a source set timecode.  
   10. Select ‘**Add**’ and enter the Timecode(s) where you would like to place the Marker(s).  
   11. Select ‘**OK**’ to add the filter and return to the Preset Editor.  
   12. Select ‘**OK**’ to return to Cambria FTC.

SCTE-35 has been properly added to the target source.

For any questions or technical support contact Capella Systems at:

**support@capellasystems.net**.