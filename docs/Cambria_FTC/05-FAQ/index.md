---
title: Customer FAQs
---

# Customer FAQ
# To do a line break make sure to have double space at the end of the sentence. "  "

This is a general FAQ page for common questions that customers may have. If you cannot find the answer to your question, please email support@capellasystems.net and include the following information:
- Product Used
- Build number
If the issue is related to a project:
- jobdata.xml or the project file
- Source files (if possible)

<details>
<summary><strong>Filters</strong></summary>

**Q:** What is the difference between adding filters in the Source tab versus the Transcoding settings, and what happens if I use both?  
**A:** If you have a stitched source, adding filters in the Source tab lets you apply them to just one file, and the filter is applied in the source's original resolution and frame rate. In the Transcoding settings, you can choose whether the filter is applied to the source's original resolution and frame rate as a Source filter or after it has been converted to the target format as a Target filter.  

</details>

<details>
<summary><strong>License</strong></summary>

**Q:** My machine stopped working and it had a node-locked license. How can I move the license to the new machine?  
**A:** Please contact support@capellasystems.net. We will deactivate the license on the machine that is no longer working, allowing you to transfer it to the new machine.  

**Q:** I would like an offline node-locked license. How do I do this?  
**A:** In Capella License Manager, under "Activation Tool," check "Use Offline Activation/Deactivation."
 Then send the generated request.txt file to support@capellasystems.net. 
 We will provide an offlineResponse.dat file that you can use to complete the offline activation.  

</details>

<details>
<summary><strong>Notifications</strong></summary>

**Q:** Why does %sourcefilename% and %outputfilename% not work with HTTP Notifications?  
**A:** Use the Fwd version of the string replacement, e.g., `%sourcefilenameFwd%`.  

</details>

<details>
<summary><strong>Redundancy</strong></summary>

**Q:** My redundancy got triggered. How can I find the reason?  
**A:** If you run into a redundancy issue, look for the log file C:\Users\Public\Documents\Capella\CambriaCluster\Logs\CpClusterFailoverEXE20XX.txt. Open the file and search for the word “Error”. 
This line will usually give you a clue on what caused the redundancy event to trigger. This is the quickest way to see what the system detected and why it switched over. 
If the Error is not clear, please send the log file to the support team and we can help explain it.  

</details>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    const details = document.querySelectorAll('details');
    details.forEach((targetDetail) => {
      targetDetail.addEventListener('click', () => {
        details.forEach((detail) => {
          if (detail !== targetDetail) {
            detail.removeAttribute('open');
          }
        });
      });
    });
  });
</script>