---
id: cambria-cluster-ftc-aws
title: Cambria Cluster / FTC 5.5.0 - AWS Kubernetes
---

## Document History

| Version | Date       | Description                                |
|---------|------------|--------------------------------------------|
| 5.4.0   | 10/03/2024 | Updated for release 5.4.0.21627 (Linux)    |
| 5.5.0   | 04/11/2025 | Updated for release 5.5.0.23529 (Linux)    |

> **Download the online version of this document for the latest information and latest files. Always download the latest files.**

Do not move forward with the installation process if you do not agree with the End User License Agreement (EULA) for our products.  
You can download and read the EULA for Cambria FTC, Cambria Cluster, and Cambria License Manager from the links below:

- [Cambria License Manager EULA](https://www.dropbox.com/s/1wg7ee7a59kzi8h/EULA_Cambria_License_Manager.pdf?dl=0)  
- [Cambria Cluster EULA](https://www.dropbox.com/s/oemlax63aatjjiw/EULA_Cluster.pdf?dl=0)  
- [Cambria FTC EULA](https://www.dropbox.com/s/ualv9usxsowh6m2/EULA_FTC.pdf?dl=0)

### Limitations and Security Information

Cambria FTC, Cluster, and License Manager are installed on Linux Docker containers. Limitations and security checks done for this version are included in our general Linux Documents below:

- [Linux Cambria Cluster and FTC 5.5.0 Guide](https://www.dropbox.com/scl/fi/0rvskhpqtla6dffhbfli5/Linux_Cambria_Cluster_and_FTC_5_5_0_Guide.pdf?rlkey=ngryjzox121ow5fgbc4y8n2yd)

> **Note:** These documents are for informational use only. The setup for Kubernetes starts in section 3. Create Kubernetes Cluster.  
> This document references Kubernetes version 1.32.1 only.

---

## ⚠️ Important: Before You Begin

PDF documents have a copy/paste issue. For best results, download this document and any referenced PDF documents in this guide and open them in a PDF viewer such as Adobe Acrobat.

For commands that are in more than one line, copy each line one by one and check that the copied command matches the one in the document.

---

## ⚠️ Critical Information: Read Before Proceeding with Installation

Before starting the installation, carefully review the following considerations. Skipping this section may result in errors, failed deployments, or misconfigurations.

1. **A New Kubernetes Cluster Will Be Deployed**  
   ● The installation process creates a brand-new Kubernetes cluster to keep the Cambria ecosystem isolated from other applications.

2. **Default Installation is Non-Secure**  
   ● The guide covers installation with default settings in an open environment (not secure).  
   ● If you require a secure or customized setup, you will need AWS expertise, which is not covered in this guide.  
   ● Firewall information is provided in section 1.5. Firewall Information

3. **Understand Your Transcoding Requirements**  
   ● Know your expected transcoding volume, input/output specs, and whether a GPU is needed.  
   ● Refer to section 1.3. AWS EC2 Instance Information and Benchmark for guidelines on machine requirements.

4. **Administrative Rights Required**  
   ● Many of the steps in this guide require administrative rights to AWS for adding permissions and performing other administrative functions of that sort.

5. **Check AWS Account Quota**  
   ● Ensure the AWS account has sufficient quota to deploy Kubernetes resources.  
   ● See section 1.2. Resource Usage for estimated resource requirements.

6. **A Separate Linux Machine is Required**  
   ● A dedicated Linux machine (preferably Ubuntu) is needed to deploy Kubernetes.  
   ● Keeping Kubernetes tools and configuration files on a dedicated system is strongly recommended.

7. **Verify Region-Specific Resource Availability**  
   ● Not all AWS regions support the same resources (e.g., GPU availability varies by region).  
   ● Consult AWS documentation to confirm available resources in your desired region.
