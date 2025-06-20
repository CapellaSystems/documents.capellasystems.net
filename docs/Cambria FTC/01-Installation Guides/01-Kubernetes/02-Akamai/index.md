---
id: cambria-cluster-ftc-terraform
title: Cambria Cluster / FTC 5.5.0 - Terraform on Akamai Kubernetes
---

# Cambria Cluster / FTC 5.5.0

## Akamai Cloud Kubernetes Help Documentation

### Terraform Installation

---

## Document History

| Version | Date       | Description                                   |
|---------|------------|-----------------------------------------------|
| 5.4.0   | 10/03/2024 | Updated for release 5.4.0.21627 (Linux)       |
| 5.5.0   | 04/11/2025 | Updated for release 5.5.0.23529 (Linux)       |

> **Download the online version of this document for the latest information and latest files. Always download the latest files.**

Do not move forward with the installation process if you do not agree with the End User License Agreement (EULA) for our products.  
You can download and read the EULA for Cambria FTC, Cambria Cluster, and Cambria License Manager from the links below:

- [Cambria License Manager EULA](https://www.dropbox.com/s/1wg7ee7a59kzi8h/EULA_Cambria_License_Manager.pdf?dl=0)  
- [Cambria Cluster EULA](https://www.dropbox.com/s/oemlax63aatjjiw/EULA_Cluster.pdf?dl=0)  
- [Cambria FTC EULA](https://www.dropbox.com/s/ualv9usxsowh6m2/EULA_FTC.pdf?dl=0)

### Limitations and Security Information

Cambria FTC, Cluster, and License Manager are installed on Linux Docker containers. Limitations and security checks done for this version are included in our general Linux documents below:

- [Linux Cambria Cluster and FTC 5.5.0 Guide](https://www.dropbox.com/scl/fi/0rvskhpqtla6dffhbfli5/Linux_Cambria_Cluster_and_FTC_5_5_0_Guide.pdf?rlkey=ngryjzox121ow5fgbc4y8n2yd)

> **Note:** These documents are for informational use only. The setup for Kubernetes starts in section 2. Create Kubernetes Cluster.

> **Note:** This document references Kubernetes version 1.32 only.

---

## ⚠️ Important: Before You Begin

PDF documents have a copy/paste issue. For best results, download this document and any referenced PDF documents in this guide and open them in a PDF viewer such as Adobe Acrobat.

For commands that are in more than one line, copy each line one by one and check that the copied command matches the one in the document.

---

## ⚠️ Critical Information: Read Before Proceeding with Installation

Before starting the installation, carefully review the following considerations. Skipping this section may result in errors, failed deployments, or misconfigurations.

Read only the **Critical Information: Read Before Proceeding with Installation** sections of the following documents:

- [Cambria Cluster Installation](https://www.dropbox.com/scl/fi/irkmp89qh17bo9w4459qw/Cambria_Cluster_and_FTC_5_5_0_on_Akamai_Kubernetes.pdf?rlkey=vmq8fcqdbv3dul5cqq9em4r91&st=5gecxrgs&dl=0)
- [Monitoring and Logging with Prometheus and Loki](https://www.dropbox.com/scl/fi/rxshb6038wd9yg81kxagd/Prometheus_Grafana_Setup_for_Cambria_Cluster_5_5_0_on_Akamai_Kubernetes.pdf?rlkey=5l561e8x251y46gywx57k5svm&st=prp5ca3q&dl=0)

---

## 1. Prerequisites

### 1.1. X11 Forwarding for User Interface

For **Windows and Mac only**, there are some special tools that need to be installed in order to be able to use the user interface from Capella's terraform installer.  
If using Linux, the machine must have a graphical user interface.

#### 1.1.1. Option 1: Microsoft Windows Tools

1. Download and install the X11 Forwarding Tool Xming:  
   [Download vcxsrv](https://github.com/marchaesen/vcxsrv/releases/download/21.1.13/vcxsrv-64.21.1.13.0.installer.exe)

2. Also, download and install PuTTY or similar tool that allows X11 Forwarding SSH:  
   [Download PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html)

3. Open XLaunch and do the following:

   - **Window 1:** Choose *Multiple windows* and set Display number to `0`
   - **Window 2:** Choose *Start no client*
   - **Window 3:** Enable all checkboxes: Clipboard, Primary Selection, Native OpenGL, and Disable access control
   - **Window 4:** Click on *Save configuration* and save this somewhere to reuse in the future

#### 1.1.2. Option 2: Apple macOS Tools

1. Download and install the X11 Forwarding Tool XQuartz:  
   [Download XQuartz](https://github.com/XQuartz/XQuartz/releases/download/XQuartz-2.8.5/XQuartz-2.8.5.pkg)

---

---

## 2. Prepare Deployment Server

1. On the Akamai Dashboard, create a new Ubuntu Linode used for the Terraform deployment.  
   For best performance, choose an 8GB RAM or higher machine as X11 Forwarding uses a lot of memory on the Linode instance.

2. SSH into the new Linode and install general tools:

   ```bash
   sudo apt update; sudo apt upgrade; sudo apt install curl unzip libice6 libsm6 dbus libgtk-3-0
