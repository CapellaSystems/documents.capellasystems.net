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



## Document Overview

The purpose of this document is to provide a walkthrough of the installation and initial testing process of the **Cambria Cluster** and **Cambria FTC** applications in a Kubernetes environment.

### Document Structure

1. Overview of the Cambria Cluster / FTC Environment in a Kubernetes Environment  
2. Preparation for the installation (Prerequisites)  
3. Create and configure the Kubernetes Cluster  
4. Install Cambria Cluster and Cambria FTC on the Kubernetes Cluster  
5. Verify the installation is working properly  
6. Test the Cambria Cluster / FTC applications  
7. Update the Cambria Cluster / FTC applications on Kubernetes Cluster  
8. Delete a Kubernetes Cluster  
9. Quick Reference of Kubernetes Installation  
10. Quick Reference of Important Kubernetes Components (URLs, template projects, test player, etc.)  
11. Glossary of important terms  

---

## 1. Overview

### 1.1 Cambria Cluster / FTC Kubernetes Deployment

There are two major applications involved in this Kubernetes installation:

- **Cambria Cluster**
- **Cambria FTC**

---

### Cambria Cluster

This deployment is recommended to run on **at least 3 nodes** (`replica = 3`) with a **LoadBalancer service** that exposes the application externally.

- Each Cambria Cluster pod is installed on its own node.
- One pod acts as the **leader**, and the other two serve as **replicas**, allowing automatic failover.

Each **Cambria Cluster pod** includes:

1. `Cambria Cluster` (application container)  
2. `Leader Elector` tool – designates the pod leader  
3. `Cambria FTC Autoscaler` tool – auto-deploys FTC workers based on job load:

> **Scaling Formula:**  
> Number of Nodes to Deploy = `(Number of Queued Jobs + 2) / 3`

Additionally:

- A **PostgreSQL database** pod is deployed per active Cambria Cluster pod.
- Databases are **replicated** for fault tolerance and data integrity.

---

### Cambria FTC

Capella’s **Cambria FTC** deployment consists of **one or more nodes**, often using different instance types than the Cluster nodes.

- FTC pods are responsible for executing encoding jobs.
- Each pod is assigned its **own node**.

Each **Cambria FTC pod** includes:

1. `Cambria FTC` (application container)  
2. `Auto-Connect FTC` (dotnet tool) – performs:
   - Pod discovery
   - Cluster identification
   - FTC-Cluster auto-connect logic  
   - If no Cluster is found within ~20 minutes, the node is recycled
3. `Pgcluster` – PostgreSQL container for job and state persistence (pod lifetime only)

---

### Deployment Note

Each node in the Kubernetes Cluster will either be running the **Cambria Cluster deployment** or the **Cambria FTC deployment**, but not both.


### 1.2 Resource Usage

The resources used and their quantities will vary depending on requirements and environments.  
Below is general information about major resource usage. Other resources may also be required.  
Please consult AWS and `eksctl` documentation for more details.

#### Reference Documentation:

- [EKS Deployment Options](https://docs.aws.amazon.com/eks/latest/userguide/eks-deployment-options.html)  
- [eksctl: Creating and Managing Clusters](https://eksctl.io/usage/creating-and-managing-clusters/)  
- [eksctl: VPC Networking](https://eksctl.io/usage/vpc-networking/)  
- [EKS Subnet Best Practices](https://docs.aws.amazon.com/eks/latest/best-practices/subnets.html)  
- [AWS EC2: Available IPs per ENI](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AvailableIpPerENI.html)  
- [EKS Network Security Best Practices](https://docs.aws.amazon.com/eks/latest/best-practices/network-security.html)

---

#### Resource Overview

| Component      | Description                                                                 |
|----------------|-----------------------------------------------------------------------------|
| **Load Balancers** | - 0–3 Classic Load Balancers (Manager WebUI, Manager Web Server, Grafana)  
                      - 0–1 Network Load Balancer (Ingress)                                    |
| **Nodes**          | - `X` Cambria Manager Instances (Default: 3)  
                      - `Y` Cambria FTC Instances (Default max: 20)                            |
| **Networking**     | - 1 VPC (default)  
                      - 3 public subnets and 3 private subnets (2 subnets reserved)  
                      - Default `/16` CIDR  
                      - Each subnet: `/19` CIDR                                                 |

> **Note:** For CIDR planning, refer to  
> [EKS Best Practices: Networking](https://docs.aws.amazon.com/eks/latest/best-practices/networking.html)

#### Security Groups

- Default: 1 security group for the **control plane**
- Default: `X` security groups — one per **node group**

---

<!-- Add image below once graph is provided -->
<!-- ![Resource Usage Graph](./path_to_graph_image.png) -->

### 1.3 AWS Machine Information and Benchmark

The following benchmark compares two AWS EC2 instance types.  
This information is current as of **September 2023**.

> ⚠️ Benchmark results reflect workloads that involve read/write access to **AWS S3**, which affects transcoding speed.

---

#### Benchmark Job Configuration

| Type     | Codec | Frame Rate | Resolution                   |
|----------|--------|-------------|-------------------------------|
| **Source** | TS     | H.264       | 30 fps, 1920×1080 @ 8 Mbps     |
| **Output** | HLS/TS | H.264       | 29.97 fps  
                                   - 1920×1080 @ 4 Mbps  
                                   - 1280×720 @ 2.4 Mbps  
                                   - 640×480 @ 0.8 Mbps  
                                   - 320×240 @ 0.3 Mbps |

---

#### a. `c6a.4xlarge` [AMD EPYC 7R13]

##### Machine Info

| Name         | RAM     | CPUs | Storage | Network Performance | Cost/Hour |
|--------------|---------|------|---------|----------------------|-----------|
| c6a.4xlarge  | 32 GB   | 16   | Any     | 12.5 Gbps            | $0.612    |

##### Benchmark Results

| Concurrent Jobs | Real-Time Speed                        | CPU Usage |
|-----------------|----------------------------------------|-----------|
| 2               | - 0.73x RT per job (slower than real-time)  
                 - Total throughput: 1.46x RT  
                 (≈ 42 sec to transcode 1 min)          | 100%      |

---

#### b. `c6a.16xlarge` [AMD EPYC 7R13]

##### Machine Info

| Name           | RAM     | CPUs | Storage | Network Performance | Cost/Hour |
|----------------|---------|------|---------|----------------------|-----------|
| c6a.16xlarge   | 128 GB  | 64   | Any     | 25 Gbps              | $2.448    |

##### Benchmark Results

| Concurrent Jobs | Real-Time Speed                         | CPU Usage |
|-----------------|------------------------------------------|-----------|
| 2               | - 2.17x RT per job (faster than real-time)  
                 - Total throughput: 4.34x RT  
                 (≈ 21 sec to transcode 1 min)           | ~84%       |

---

#### Benchmark Summary

- The **c6a.16xlarge** instance provides significantly higher throughput due to increased compute resources.
- However, the **c6a.4xlarge** instance is **more cost-effective per hour**.
- The choice between the two should consider both budget and throughput requirements.


