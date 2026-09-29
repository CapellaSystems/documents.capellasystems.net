---
id: customer-faqs
title: Customer FAQs
---

# Customer FAQs

This page provides answers to common questions about Cambria FTC configuration, workflows, filters, licensing, storage, notifications, and related features.

If you cannot find the answer to your question, please email support@capellasystems.net and include the following information:

- Product used
- Product version and build number
- Relevant logs or error messages

If the issue is related to a project, please also include:

- `JobData.xml` or the project file
- Source files, if possible

<details>
<summary><strong>Audio</strong></summary>

**Q:** Why do I hear audio phasing when using the Normalizer and Audio Remapper filters?  
**A:** Audio phasing can occur when audio processing is applied separately to individual channels. For example, when the Audio Remapper filter is configured to **Split each channel to a Separate Track**, operations such as tempo adjustment may be performed independently on each channel. Small differences between the processed channels can result in audible phasing.  

If you encounter this behavior, review the order of the audio filters and whether splitting each channel into a separate track is required for the workflow.  

</details>

<details>
<summary><strong>Credentials and Network Storage</strong></summary>

**Q:** Why do I receive an "Access Denied" error when writing output to a network location?  
**A:** When writing output to a network share, the Windows account running the Cambria service must have permission to access the destination.  

Some output components may not use credentials stored in Windows Credential Manager. If the destination cannot be accessed, check the logon account used by the **CpServiceManager** or **CpClusterServiceManager** service on the machine processing the job.  

The service should run under an account that has the required permissions for the network share.  

</details>

<details>
<summary><strong>Dolby E</strong></summary>

**Q:** I am submitting a job through the API, but the Global Setting for Dolby E Decode is being used instead of the `SourceDolbyEDecode` value in my `JobData.xml`. Why?  
**A:** The source handling preference determines whether Cambria uses the values defined in the submitted job or the application defaults.  

To use the Dolby E settings defined in the submitted `JobData.xml`, set:

`SourceFileHandlingPrefSource="PresetDefined"`

instead of:

`SourceFileHandlingPrefSource="ApplicationDefaults"`

Similar behavior applies to other preference sources such as error handling and standards conversion. When application defaults are selected, the corresponding global settings may replace values supplied in the job.  

</details>

<details>
<summary><strong>Filters</strong></summary>

**Q:** What is the difference between adding filters in the Source tab versus the Transcoding settings, and what happens if I use both?  
**A:** If you have a stitched source, adding filters in the Source tab lets you apply them to just one file, and the filter is applied using the source's original resolution and frame rate.  

In the Transcoding settings, you can choose whether the filter is applied using the source's original resolution and frame rate as a Source filter, or after the video has been converted to the target format as a Target filter.  

If equivalent filters are configured in multiple locations, the Transcoding settings take precedence for the final output. Using the same filter in multiple locations is generally unnecessary and may add additional processing.  

**Q:** There is no "Fixed GOP" option for HEVC (x265). Can I still create a fixed GOP?  
**A:** Yes. Set **Minimum GOP** and **Maximum GOP** to the same value.  

For example:

`Minimum GOP: 60`  
`Maximum GOP: 60`  

</details>

<details>
<summary><strong>License</strong></summary>

**Q:** My machine stopped working and it had a node-locked license. How can I move the license to a new machine?  
**A:** Please contact support@capellasystems.net. We can assist with deactivating the license associated with the machine that is no longer available so it can be activated on the replacement machine.  

**Q:** I would like an offline node-locked license. How do I do this?  
**A:** In Capella License Manager, under **Activation Tool**, select **Use Offline Activation/Deactivation**.  

Send the generated `request.txt` file to support@capellasystems.net. Support will provide an `offlineResponse.dat` file that can be used to complete the offline activation.  

</details>

<details>
<summary><strong>Notifications</strong></summary>

**Q:** Why do `%sourcefilename%` and `%outputfilename%` not work correctly with HTTP Notifications?  
**A:** When using string replacements inside JSON or URL-oriented content, use the `Fwd` version of the string replacement.  

For example:

`%sourcefilenameFwd%`

instead of:

`%sourcefilename%`

The same convention can be used for other filename substitutions when required.  

</details>

<details>
<summary><strong>PostgreSQL Database</strong></summary>

**Q:** What is the PostgreSQL database used for in Cambria FTC?  
**A:** Cambria FTC uses PostgreSQL to store information such as:

- Jobs
- Global configuration
- Watch Folder configuration

Cambria Cluster also stores information related to the machines participating in the cluster.  

The PostgreSQL database is installed and configured automatically by the Cambria installer and normally does not require routine database administration.  

A database backup utility is available for protecting configuration and job information.  

Database maintenance can also be scheduled from Cambria Manager using:  

**File → Database Maintenance → Schedule Maintenance at Next Restart**  

</details>

<details>
<summary><strong>Redundancy</strong></summary>

**Q:** My redundancy was triggered. How can I find the reason?  
**A:** Check the Cambria Cluster failover log located under:

`C:\Users\Public\Documents\Capella\CambriaCluster\Logs\`

Look for the `CpClusterFailoverEXE` log corresponding to your installed version and search for **Error**.  

The error information can usually provide a clue about what caused the redundancy event to trigger. If the cause is not clear, send the relevant log file to support@capellasystems.net for assistance.  

**Q:** Why does Windows Primary/Backup Cluster redundancy need to be configured again after a reboot or failover?  
**A:** Windows Primary/Backup Cluster redundancy uses a manual recovery process.  

After certain reboot or failover scenarios, the operator may need to verify the state of both systems before restoring redundancy. This allows the systems and their data to be checked before synchronization is resumed.  

</details>

<details>
<summary><strong>Amazon S3</strong></summary>

**Q:** Can one job upload output to two different Amazon S3 locations?  
**A:** Yes. A single job can contain multiple S3 upload destinations, and each destination can use its own S3 configuration.  

The generated output can then be uploaded to both locations as part of the same workflow.  

</details>

<details>
<summary><strong>SCTE-35</strong></summary>

**Q:** Where can I find an example ESAM XML file for SCTE-35 injection?  
**A:** AWS provides a public ESAM XML example that can be used as a reference when creating SCTE-35 signaling:

[Example ESAM XML – AWS MediaConvert](https://docs.aws.amazon.com/mediaconvert/latest/ug/example-esam-xml.html)

ESAM XML can contain SCTE-35 elements such as:

- `time_signal`
- `segmentation_descriptor`
- Program placement opportunity start markers
- Program placement opportunity end markers

For segmentation type identifiers and other SCTE-35 values, refer to the documentation for the system receiving or processing the SCTE-35 messages.  

</details>

<details>
<summary><strong>Split and Stitch</strong></summary>

**Q:** Why does Split and Stitch report "The specified path is invalid"?  
**A:** Verify that Cambria FTC has a valid temporary file location configured.  

In Cambria FTC, open:

**Settings → Options**

Check the **Temporary File Location** setting and make sure the configured directory exists and is accessible by the Cambria services.  

</details>

<details>
<summary><strong>Subtitle Burn-In</strong></summary>

**Q:** Why is a custom Windows font unavailable when a job is sent to Cambria Manager or Cluster?  
**A:** Custom fonts must be installed so that the Windows account running the Cambria service can access them.  

For Cluster environments, install the required font on every machine that may process the job.  

When installing a font manually in Windows, use **Install for all users** when available.  

System-wide fonts are typically installed under:

`C:\Windows\Fonts`

After installing the font, restart the relevant Cambria services if the font is not immediately available.  

</details>