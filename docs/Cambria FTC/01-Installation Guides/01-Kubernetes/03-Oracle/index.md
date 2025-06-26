---
id: cambria-cluster-ftc-oracle
title: Cambria Cluster / FTC 5.5.0 - Oracle Kubernetes
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
   ● If you require a secure or customized setup, you will need Oracle Cloud expertise, which is not covered in this guide.  
   ● Firewall information is provided in section 1.5. Firewall Information

3. **Understand Your Transcoding Requirements**  
   ● Know your expected transcoding volume, input/output specs, and whether a GPU is needed.  
   ● Refer to section 1.3. Oracle Cloud Machine Information and Benchmark for guidelines on machine requirements.

4. **Administrative Rights Required**  
   ● Many of the steps in this guide require administrative rights to Oracle Cloud for adding permissions and performing other administrative functions of that sort.

5. **Check Oracle Cloud Account Quota**  
   ● Ensure the Oracle Cloud account has sufficient quota to deploy Kubernetes resources.  
   ● See section 1.2. Resource Usage for estimated resource requirements.

6. **A Separate Linux Machine is Required**  
   ● A dedicated Linux machine (preferably Ubuntu) is needed to deploy Kubernetes.  
   ● Keeping Kubernetes tools and configuration files on a dedicated system is strongly recommended.

7. **Verify Region-Specific Resource Availability**  
   ● Not all Oracle Cloud regions support the same resources (e.g., GPU availability varies by region).  
   ● Consult Oracle Cloud documentation to confirm available resources in your desired region.

# Document Overview

The purpose of this document is to provide a walkthrough of the installation and initial testing process of the Cambria Cluster and Cambria FTC applications in the Kubernetes environment. The basic view of the document is the following:

1. Overview of the Cambria Cluster / FTC Environment in a Kubernetes Environment  
2. Preparation for installation (Prerequisites)  
3. Create and configure the Kubernetes Cluster, Logging, and Metrics  
4. Install Cambria Cluster and Cambria FTC on the Kubernetes Cluster  
5. Verify the installation is working properly  
6. Test the Cambria Cluster / FTC applications  
7. Update the Cambria Cluster / FTC applications on Kubernetes Cluster  
8. Delete a Kubernetes Cluster  
9. Quick Reference of Kubernetes Installation  
10. Quick Reference of Important Kubernetes Components (urls, template projects, test player, etc)  
11. Glossary of important terms  

## 1. Overview

### 1.1. Cambria Cluster / FTC Kubernetes Deployment

There are two major applications involved in this Kubernetes installation: **Cambria Cluster** and **Cambria FTC**.

**Cambria Cluster:**  
This deployment is recommended to run on at least 3 nodes (`replica = 3`) with a service (Load Balancer) that exposes the application externally. For each of these nodes, Cambria Cluster will be installed on its own pod and designated to its own node. One node acts as the leader and the other two are replicas for the purpose of replacing the leader in the case it becomes inactive, corrupted, etc.

Each Cambria Cluster pod has three containers:
1. Cambria Cluster (application)  
2. Leader Elector tool that chooses which of the Cambria Cluster node / pod will be the leader  
3. Cambria FTC Autoscaler tool that, when the FTC autoscaler is enabled, will automatically deploy worker nodes for encoding purposes based on the number of encoding jobs queued to the system.

This is based on the calculation (rounded down):  
**Number of Nodes to Deploy = (Number of Queued Jobs + 2) / 3**

Also for the Cluster deployment, there is a corresponding PostgreSQL database installed on a separate pod for each active Cambria Cluster pod. The data is replicated between the different database pods in order to preserve data in case of issues with the database and/or Cluster.

**Cambria FTC:**  
Capella’s Cambria FTC deployment consists of one or more nodes that (by default) are of different instance types than the Cambria Cluster nodes. These nodes focus specifically on running encoding tasks. Similar to Cambria Cluster, the Cambria FTC application is installed on its own pod and designated to its own node.

Each Cambria FTC pod has three containers:
1. Cambria FTC (application)  
2. Auto-Connect FTC dotnet tool that does the following:  
   - lists pods  
   - attempts to find Cambria Cluster  
   - connects the Cambria FTC application running in the pod to the Cambria Cluster that it found.  
   This container also deletes its own node pool or recycles its node if no Cambria Cluster is found within a specific time (~20 minutes).  
3. Pgcluster database for storing its encoder's own job contents and other such information for as long as the pod is running.

Each node in the Kubernetes Cluster will either be running the Cluster deployment or the FTC deployment.

### 1.2. Resource Usage

The resources used and their quantities will vary depending on requirements and different environments.  
Below is general information about some of the major resource usage (other resources may be used).  
Consult Oracle Cloud documentation for other resources created, usage limits, etc.

**Oracle Documentation**  
<https://docs.public.oneportal.content.oci.oraclecloud.com/en-us/iaas/Content/ContEng/Concepts/contengprerequisites.htm>

| Resource Type   | Details                                                                 |
|-----------------|-------------------------------------------------------------------------|
| Load Balancers  | 0–4 (Manager WebUI, Manager Web Server, Ingress, Grafana)               |
| Nodes           | X Cambria Manager Instances (Default is 3)                              |
|                 | Y Cambria FTC Instances (Default is 20, based on max FTC configuration) |
| Networking      | Default is 1 VCN-native, IG, NAT, SGW                                   |
|                 | Default is 3 subnets (1 for kube plane, 1 for load balancers, 1 for nodes) |
|                 | Default is /16 CIDR (tested with /19 in default setup)                  |
| Security        | Default is to use security lists (No NSGs are used)                     |

### 1.3. Oracle Cloud Machine Information and Benchmark

The following is a benchmark of two Oracle Cloud machines. The information below is as of **October 2024**.  
Note that the benchmark involves read from / write to an ObjectStorage location which influences the real-time speed of transcoding jobs.

#### Benchmark Job Information

| Type     | Codec  | Frame Rate | Resolution               | Bitrate     |
|----------|--------|------------|---------------------------|-------------|
| Source   | TS H.264 | 30       | 1920 x 1080              | 8 Mbps      |
| Output   | HLS/TS H.264 | 29.97 | 1920 x 1080, 1280 x 720, 640 x 480, 320 x 240 | 4 Mbps, 2.4 Mbps, 0.8 Mbps, 0.3 Mbps |

---

**Machine Used:** `VM.Standard.E4.Flex` – 8 OCPUs + 32 GB RAM (AMD EPYC 7J13)

#### Machine Info

| Name                | RAM   | OCPUs | Storage | Network         | Cost per Hour |
|---------------------|--------|--------|---------|------------------|----------------|
| VM.Standard.E4.Flex | 32 GB  | 16     | Any     | 2.5 – 3.5 GHz    | $0.448         |

#### Benchmark Results

| # of Concurrent Jobs | Real Time Speed              | CPU Usage |
|----------------------|------------------------------|-----------|
| 2                    | 1.18x RT per job (faster than real-time) <br> Total Throughput: 2.36x RT <br> (~26 seconds to transcode 1 minute) | 100%      |

### 1.4. Cambria Application Access

The Cambria applications are accessible via the following methods:

#### 1.4.1. External Access via TCP Load Balancer

The default Cambria installation configures the Cambria applications to be exposed through load balancers.  
There is one for the **Cambria Manager WebUI + License Manager**, and one for the **web / REST API server**.  
The load balancers are publicly available and can be accessed either through their public IP address or domain name and the application's TCP port.

**Example:**

- **Cambria Manager WebUI**  
  `https://44.33.212.155:8161`

- **Cambria REST API**  
  `https://121.121.121.121:8650/CambriaFC/v1/SystemInfo`

> External access in this way can be turned on/off via a configuration variable.  
> See section **4.2. Creating and Editing Helm Configuration File**.  
> If this feature is disabled, another method of access will need to be configured.

---

#### 1.4.2. HTTP Ingress via Reverse Proxy

In cases where external access via TCP load balancer is not acceptable, or for using a purchased domain name from providers like GoDaddy,  
the Cambria installation provides the option to expose an ingress.

Similar to the external access load balancers, the **Cambria Manager WebUI** and **web / REST API server** are exposed.  
However, only **one IP address or domain name** is needed in this case.

How it works:
- The **Cambria WebUI** is exposed through the subdomain `webui`
- The **Cambria web server** is exposed through the subdomain `api`
- The **Grafana dashboard** is exposed through the subdomain `monitoring`

**Example with the domain `mydomain.com`:**

- **Cambria Manager WebUI**  
  `https://webui.mydomain.com`

- **Cambria REST API**  
  `https://api.mydomain.com`

- **Grafana Dashboard**  
  `https://monitoring.mydomain.com`

> Capella provides a default ingress hostname for **testing purposes only**.  
> In production, the default hostname, SSL certificate, and other such information needs to be configured.  
> More information about ingress configuration is explained later in this guide.

### 1.5. Firewall Information

By default, this guide creates a Kubernetes cluster with default settings, including the default network firewall configurations.  
A virtual network is created alongside the Kubernetes cluster.

For custom or non-default configurations, or to restrict the network beyond the default setup,  
refer to the following list of known ports that the Cambria applications use:

| Port(s) | Protocol | Direction | Description |
|---------|----------|-----------|-------------|
| 8650    | TCP      | Inbound   | Cambria Cluster REST API |
| 8161    | TCP      | Inbound   | Cambria Cluster WebUI |
| 8678    | TCP      | Inbound   | Cambria License Manager Web Server |
| 8481    | TCP      | Inbound   | Cambria License Manager WebUI |
| 9100    | TCP      | Inbound   | Prometheus System Exporter for Cambria Cluster |
| 8648    | TCP      | Inbound   | Cambria FTC REST API |
| 3100    | TCP      | Inbound   | Loki Logging Service |
| 3000    | TCP      | Inbound   | Grafana Dashboard |
| 443     | TCP      | Inbound   | Capella Ingress |
| ALL     | TCP/UDP  | Outbound  | Expose all outbound traffic |

---

For **Cambria licensing**, ensure that both **inbound and outbound** access is available for the following domains:

| Domain                         | Port(s) | Protocol | Direction | Description              |
|--------------------------------|---------|----------|-----------|--------------------------|
| api.cryptlex.com               | 443     | TCP      | In/Out    | License Server           |
| cryptlexapi.capellasystems.net| 8485    | TCP      | In/Out    | License Cache Server     |
| cpfs.capellasystems.net       | 8483    | TCP      | In/Out    | License Backup Server    |
