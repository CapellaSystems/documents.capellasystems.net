---
id: cambria-cluster-ftc-5-8-akamai-kubernetes
title: Cambria Cluster / FTC 5.8.0 on Akamai Kubernetes
---

# Cambria Cluster / FTC 5.8.0

## Akamai Cloud Kubernetes Help Documentation

## Document History

| Version | Date | Description |
| --- | --- | --- |
| 5.6.0 | 10/31/2025 | Updated for release 5.6.0.26533 (Linux) |
| 5.8.0 | 07/01/2026 | Updated for release 5.8.0.31580 (Linux) |

\* Download the online version of this document for the latest information and latest files. Always download the latest files

Do not move forward with the installation process if you do not agree with the End User License Agreement (EULA) for our products. You can download and read the EULA for Cambria FTC, Cambria Cluster, and Cambria License Manager from the links below:

Cambria Cluster | Cambria FTC | Cambria License Manager

https://www.dropbox.com/s/1wg7ee7a59kzi8h/EULA_Cambria_License_Manager.pdf?dl=0

https://www.dropbox.com/s/oemlax63aatjjiw/EULA_Cluster.pdf?dl=0

https://www.dropbox.com/s/ualv9usxsowh6m2/EULA_FTC.pdf?dl=0

> **Important: Limitations and Security Information**  
> Cambria FTC, Cluster, and License Manager are installed on Linux in containers. Limitations and security information can be found in the document below:
>
> https://www.dropbox.com/scl/fi/zwojjdyy4kd6ul0s843kx/Cambria_FTC_5_8_0_Limitations_and_Security_Information.pdf?rlkey=ei1tnflrwm8nduiewfd6g6ghu&st=wi4rgxvh&dl=0

> **Important: Before You Begin**  
> PDF documents have a copy/paste issue. For best results, download this document and any referenced PDF documents in this guide and open them in a PDF viewer such as Adobe Acrobat.
>
> For commands that are in more than one line, copy each line one by one and check that the copied command matches the one in the document.
>
> The sections below provide instructions on creating a NEW basic Kubernetes cluster with Cambria FTC / Cluster with default settings and more open security settings. For more granular control and non-default settings, consult Akamai Cloud documentation.

> **Information**  
> This document references Kubernetes version 1.35 only

## ⚠️ Critical Information: Read Before Proceeding

Before starting the installation, carefully review the following considerations. Skipping this section may result in errors, failed deployments, or misconfigurations.

1. **A New Kubernetes Cluster Will Be Deployed**
   - The installation process creates a brand-new Kubernetes cluster to keep the Cambria ecosystem isolated from other applications.

2. **Default Installation is Non-Secure**
   - The guide covers installation with default settings in an open environment (not secure).
   - If you require a secure or customized setup, you will need Akamai Cloud expertise, which is not covered in this guide.
   - Firewall information is provided in section Firewall Information

3. **Understand Your Transcoding Requirements**
   - Know your expected transcoding volume, input/output specs, and whether a GPU is needed.
   - Refer to section Akamai Cloud Machine Information and Benchmark for guidelines on machine requirements.

4. **Administrative Rights Required**
   - Many of the steps in this guide require administrative rights to Akamai Cloud for adding permissions and performing other administrative functions of that sort.

5. **Check Akamai Cloud Account Quota**
   - Ensure the Akamai Cloud account has sufficient quota to deploy Kubernetes resources.
   - See section Resource Usage for estimated resource requirements.

6. **A Separate Linux Machine is Required**
   - A dedicated Linux machine (preferably Ubuntu on an Akamai Cloud Linode machine) is needed to deploy Kubernetes.
   - Keeping Kubernetes tools and configuration files on a dedicated system is strongly recommended.

7. **Verify Region-Specific Resource Availability**
   - Not all Akamai Cloud regions support the same resources (e.g., GPU availability varies by region).
   - Consult Akamai Cloud documentation to confirm available resources in your desired region.

## Document Overview

The purpose of this document is to provide a walkthrough of the installation and initial testing process of the Cambria Cluster and Cambria FTC applications in the Kubernetes environment. The basic view of the document is the following:

1. Overview of the Cambria Cluster / FTC Environment in a Kubernetes Environment
2. Preparation for the installation (Pre-requisites)
3. Installation (LKE Cluster, 3rd-Party Tools, Cambria FTC / Cluster)
4. Verify the Installation
5. Testing Cambria FTC / Cluster
6. Upgrading (Kubernetes Cluster, Cambria FTC / Cluster, Dependencies)
7. Resource Cleanup / Deletion
8. Quick Reference (Kubernetes commands, Akamai Linode commands, etc)
9. Glossary

## Overview of Cambria Cluster / FTC on Kubernetes

### Deployment Information: Cambria Cluster and Cambria FTC

There are two major applications involved in this Kubernetes installation: Cambria Cluster and Cambria FTC.

### Cambria Cluster

Recommended deployment is at least 3 nodes with 3 replicas and an external LoadBalancer service. Each node runs one Cambria Cluster pod. One pod acts as the leader, while the others serve as replicas that can replace the leader if needed.

Each Cambria Cluster pod includes:

- Cambria Cluster application
- Leader Elector tool, which selects the active leader pod
- Cambria FTC Autoscaler tool, which automatically deploys FTC worker nodes for encoding when autoscaling is enabled, based on the number of queued encoding jobs

> **Cambria FTC autoscaler formula**  
> [Image omitted from this Markdown build.]

Each active Cambria Cluster pod also has a corresponding PostgreSQL database pod. Data is replicated across the database pods to help preserve Cluster data if a pod or database issue occurs.

### Cambria FTC

Cambria FTC deployments consist of one or more encoding-focused nodes, typically using different instance types than the Cambria Cluster nodes. Each Cambria FTC pod runs on its own node and is dedicated to encoding tasks.

Each Cambria FTC pod includes:

- Cambria FTC application
- Auto-Connect FTC tool, which finds the Cambria Cluster pod and connects the FTC pod to it. If no Cambria Cluster is found within about 20 minutes, it deletes its node pool or recycles its node.
- Pgcluster database, which stores the encoder’s job data and related runtime information while the pod is running

Each Kubernetes node runs either a Cambria Cluster deployment or a Cambria FTC deployment.

## Resource Usage

The resources used and their quantities will vary depending on requirements and different environments. Below is general information about some of the major resource usage (other resources may be used. Consult Akamai Cloud documentation for other resources created, usage limits, etc):

Akamai Cloud Documentation:

https://techdocs.akamai.com/cloud-computing/docs/getting-started-with-lke-linode-kubernetes-engine

| Resource | Usage |
| --- | --- |
| NodeBalancers | 0-3 NodeBalancers (Manager WebUI, Manager Web Server, Grafana)<br />0-1 NodeBalancer (Ingress) |
| Nodes | X Cambria Manager Instances (Default is 3)<br />Y Cambria FTC Instances (Depends on max FTC instance configuration; Default is 20) |
| Networking | No VPCs are created |
| Security | By default, no firewalls are created. However, Firewalls can be applied to the LKE cluster nodes for stricter security |

## Akamai Cloud Machine Information and Benchmark

The following is a benchmark of two Akamai Cloud machines. The information below is as of October 2025. Note that the benchmark involves read from / write to Akamai ObjectStorage which influences the real-time speed of transcoding jobs.

### Benchmark Job Information

|  | Container | Codec | Frame Rate | Resolution |
| --- | --- | --- | --- | --- |
| Source | TS | H.264 | 30 | 1920 x 1080 @ 8 Mbps |
| Output | HLS/TS | H.264 | 29.97 | 1920 x 1080 @ 4Mbps \| 1280 x 720 @ 2.4Mbps<br />640 x 480 @ 0.8Mbps \| 320 x 240 @ 0.3Mbps |

### a. g6-dedicated-16 [ AMD EPYC 7713 ]

#### Machine Info

| Name | RAM | CPUs | Storage | Transfer | Network In/Out | Cost per Hour |
| --- | --- | --- | --- | --- | --- | --- |
| Dedicated 32 GB | 32 GB | 16 | 640 GB | 7 TB | 40 Gbps / 7 Gbps | $0.432 (As of 10/15/2025) |

#### Benchmark Results

| # of Concurrent Jobs | Real Time Speed | CPU Usage |
| --- | --- | --- |
| 2 | For Each job: 0.65x RT (slower than real-time)<br />Throughput: 1.30x RT (it takes around 47 seconds to transcode 1 minute of source) | 100% |

### b. g6-dedicated-56 [ AMD EPYC 7713 ]

#### Machine Info

| Name | RAM | CPUs | Storage | Transfer | Network In/Out | Cost per Hour |
| --- | --- | --- | --- | --- | --- | --- |
| Dedicated 256 GB | 256 GB | 56 | 5000 GB | 11 TB | 40 Gbps / 11 Gbps | $3.456 (As of 05/28/2024) |

#### Benchmark Results

| # of Concurrent Jobs | Real Time Speed | CPU Usage |
| --- | --- | --- |
| 2 | For Each Job: 1.56x RT (faster than real-time)<br />Throughput: 3.12x RT (it takes around 20 seconds to transcode 1 minute of source) | ~90% |

### Benchmark Findings:

The results show the g6-dedicated-56 has higher overall throughput. This is expected as the instance has more processing power than the g6-dedicated-16. However, if you take into account the cost per hour for each machine, the more cost efficient option is to go with the g6-dedicated-16.

## Cambria Application Access

The Cambria applications are accessible via the following methods:

### Option 1: External Access via TCP Load Balancer

The default Cambria installation configures the Cambria applications to be exposed through load balancers. There is one for the Cambria Manager WebUI + License Manager, and one for the web / REST API server. The load balancers are publicly available and can be accessed either through its public ip address or domain name, and the application's TCP port.

Example:

Cambria Manager WebUI:

```text
https://44.33.212.155:8161
```

Cambria REST API:

```text
https://121.121.121.121:8650/CambriaFC/v1/SystemInfo
```

External access in this way can be turned on / off via a configuration variable. See section Deploy Cambria Cluster and FTC Application. If this feature is disabled, another method of access will need to be configured.

### Option 2: Application Access via Domain Name: Traefik

In cases where the external access via TCP load balancer is not acceptable or for using a purchased domain name from servicers such as GoDaddy, the Cambria installation provides the option to expose an ingress route. Similar to the external access load balancers, the Cambria Manager WebUI and web / REST API server are exposed. However, only one ip address / domain name is needed in this case.

How it works is that the Cambria WebUI is exposed through the subdomain webui, the Cambria web server through the subdomain api, and Grafana dashboard through the subdomain monitoring. The following is an example with the domain mydomain.com

Cambria Manager WebUI:

```text
https://webui.mydomain.com
```

Cambria REST API:

```text
https://api.mydomain.com
```

Grafana Dashboard:

```text
https://monitoring.mydomain.com
```

Capella provides a default ingress hostname for testing purposes only. In production, the default hostname, ssl certificate, and other such information needs to be configured. More information about ingress configuration is explained later in this guide.

## Firewall Information

By default, this guide creates a kubernetes cluster with default settings which do not include a Firewall. For custom / non-default configurations, or to explore with a more restrictive network based on the default virtual network created, the following is a list of known ports that the Cambria applications use:

| Port(s) | Protocol | Traffic | Description |
| --- | --- | --- | --- |
| 8650 | TCP | Inbound | Cambria Cluster REST API |
| 8161 | TCP | Inbound | Cambria Cluster WebUI |
| 8678 | TCP | Inbound | Cambria License Manager Web Server |
| 8481 | TCP | Inbound | Cambria License Manager WebUI |
| 9100 | TCP | Inbound | Prometheus System Exporter for Cambria Cluster |
| 8648 | TCP | Inbound | Cambria FTC REST API |
| 3100 | TCP | Inbound | Loki Logging Service |
| 3000 | TCP | Inbound | Grafana Dashboard |
| 443 | TCP | Inbound | Capella Ingress |
| ALL | TCP/UDP | Outbound | Expose all Outbound Traffic |

Also, for Cambria licensing, any Cambria Cluster and Cambria FTC machine requires that at least the following domains be exposed in your firewall (both inbound and outbound traffic):

| Domain | Port(s) | Protocol | Traffic | Description |
| --- | --- | --- | --- | --- |
| api.cryptlex.com | 443 | TCP | In/Out | License Server |
| cryptlexapi.capellasystems.net | 8485 | TCP | In/Out | License Cache Server |
| cpfs.capellasystems.net | 8483 | TCP | In/Out | License Backup Server |

## Specifications for Linux Deployment Server

In order to deploy Cambria FTC, a Linux Deployment Server is required because this is where all of the tools, dependencies, and packages for the Cambria FTC Kubernetes deployment will be installed and/or stored. If you already have a deployment server, you can skip this section.

> **Important: Linux Deployment Server Machine Information**  
> The instructions in this document perform functions using a root user. To keep things consistent, Capella strongly recommends using Akamai Linode instances for the deployment process.
>
> Capella tests deployment with the Dedicated 4GB (g6-dedicated-2) instance type

### Minimum Requirements:

| Requirement | Value |
| --- | --- |
| Operating System (OS) | Ubuntu 24.04 |
| CPU(s) | 2 |
| RAM | 2 GB |
| Storage | 10 GB |

# Prerequisites

The following steps need to be completed before the deployment process.

## 1. Linux Tools

This guide uses curl, unzip, and jq to run certain commands and download the required tools and applications. Therefore, the Linux server used for deployment will need to have these tools installed.

Example with Ubuntu 24.04:

```bash
sudo apt update && \
sudo DEBIAN_FRONTEND=noninteractive apt -o Dpkg::Options::="--force-confold" -y upgrade && \
sudo DEBIAN_FRONTEND=noninteractive apt -o Dpkg::Options::="--force-confold" -y install curl unzip jq
```

## 2. Download Cambria FTC Package

The components of this installation are packaged in a zip archive. Download it using the following command:

```bash
curl -o CambriaClusterKubernetesAkamai_5_8_0.zip -L "https://www.dropbox.com/scl/fi/m00s0lk8m6hby74hm0qhh/CambriaClusterKubernetesAkamai_5_8_0.zip?rlkey=kie58ays029znxnn70sk6jupj&st=e9f0uxn6&dl=1"
```

```bash
unzip -o CambriaClusterKubernetesAkamai_5_8_0.zip && chmod +x *.sh ./bin/*.sh
```

**Important:** the scripts included have been tested with Ubuntu. They may work with other Linux distributions but not tested

## 3. Install Kubernetes Tools: Kubectl, Helm, Linode-cli

1. Select one of the following options for installing the kubernetes tools

### Option 1: Use Installation Script (Verified on Ubuntu)

```bash
./bin/installKubeTools.sh && ./bin/installKubeToolsAkamai.sh
```

If successful, use a new terminal window or restart the terminal window where the above steps were run

### Option 2: Other Installation Options

1. kubectl: https://kubernetes.io/docs/tasks/tools/
2. helm: https://helm.sh/docs/intro/install/
3. linode-cli: https://techdocs.akamai.com/cloud-computing/docs/install-and-configure-the-cli

2. Verify that the tools are installed correctly. If any of the commands below fail, review the installation instructions for the failing tool and try again:

```bash
kubectl version --client && helm version && linode-cli --version
```

# Installation

## 1. Create Kubernetes Cluster

The following section provides the basic steps needed to create a Kubernetes Cluster on Akamai Cloud.

### 1.1. Create LKE Cluster and Cambria Cluster Node Group

1. In the Akamai Cloud Dashboard, go to Kubernetes and Create Cluster and configure as follows:

| Setting | Value |
| --- | --- |
| Cluster Label | Choose a label (Eg. cambria-cluster) |
| Cluster Tier | In most cases, this should be LKE |
| Region | Your region of operation (Eg. US, Los Angeles, CA (us-lax)) |
| Kubernetes Version | 1.35 |
| Akamai App Platform | No |
| HA Control Plane | For testing, set to No. For production, it is recommended to set this to Yes (Incurs additional cost. See Akamai documentation) |
| Control Plane ACL | Only enable this if you already know which IP CIDRs will need access to the LKE control plane. Otherwise, leave as is |

Do not create the cluster yet until you have added at least one nodegroup. Continue with the rest of this section to create the desired nodegroups.

2. One set of nodes that need to be added are the Cambria Cluster nodes. These are also referred to as the Manager Nodes. At least one Cambria Cluster node needs to be running at all times in the Kubernetes cluster.

To create these nodes, select the number of nodes to assign to the Cambria Cluster node pool in the Add Node Pools section

> **Information / Recommendation**  
> Cambria Cluster manages scheduling and handling Cambria FTC encoding / packaging programs. Think about how many programs will be intended to run and choose an instance type accordingly. The lowest recommended machine type for the manager machines is Dedicated 8GB.
>
> It is also recommended to set the node count to 3. This is because 1 of the nodes will act as the Cambria Cluster node while the other 2 nodes act as backup (web server and database are replicated / duplicated). In the case that the Cambria Cluster node goes down or stops responding, one of the other two nodes will take over as the Cambria Cluster node. Depending on your workflow(s), think about how many backup nodes may be needed.

| Setting | Value |
| --- | --- |
| Plan | Dedicated 8GB (this is the recommended plan, but can be configured as needed) |
| Nodes | 3 (this is the recommended for manager redundancy, but can be configured as needed) |

### 1.2. Create Cambria FTC Node Group(s)

Skip this step if planning to use Cambria FTC's autoscaler. Run the following steps to create the Node Group(s) for the worker application instances (replace the highlighted values to those of your specific environment):

> **Information / Recommendation**  
> For this particular case, Cambria FTC nodes need to be added manually. Therefore, you will need to think about what machine / instance types are needed for running the Cambria FTC workflows. Based on benchmarks (See Akamai Cloud Machine Information and Benchmark). The recommended machine / instance type to get started is g6-dedicated-16.
>
> To get started, it is recommended to start with one instance. This way, when the installation is complete, there will already be one Cambria FTC instance to test with. The number of instances can always be scaled up and down, up to the maximum FTC instance count that will be configured in section Deploy Cambria Cluster and FTC Application

| Setting | Value |
| --- | --- |
| Plan | Dedicated 32GB (this is the recommended plan, but can be configured as needed) |
| Nodes | 1+ |

### 1.3. Deploy the Kubernetes Cluster

1. After selecting the initial node group(s), create the cluster. This will begin the LKE cluster deployment with the initial nodes.

It may take a few minutes for everything configured so far to be in a usable state. Wait for the nodes to all have a Status of Running.

2. Once the LKE Cluster is running, labels need to be added to the Cambria Cluster node pool:
   a. In the Akamai Cloud Dashboard, go into the kubernetes cluster and look for the Cambria Cluster node pool
   b. Select Labels and Taints and Add Label. In the Label field, enter capella-manager: true and then save the changes

3. Only if you added Cambria FTC nodes, do the following:
   a. In the Akamai Cloud Dashboard, go to the kubernetes cluster and look for the Cambria FTC node pool
   b. Select Labels and Taints and Add Label. In the Label field, enter capella-worker: true and then save the changes

4. (Optional) If you want Cambria Cluster nodes to also be able to run encoding jobs, set this label on the Cambria Cluster node pool as well: capella-worker: true

5. Copy the contents of the Kubeconfig file:
   a. In the Linux Deployment Server, run the following commands (replace cambria-cluster with the Kubernetes Cluster's name):

```bash
export CLUSTER_NAME=cambria-cluster && nano $CLUSTER_NAME-kubeconfig.yaml
```

   b. In the Akamai dashboard, navigate to the Kubernetes cluster that was created. In the Kubeconfig section, click on View and copy the contents
   c. In the Linux Deployment Server, paste the kubeconfig contents. Save the file by holding CTRL/CMD + X, pressing the letter 'y', and then the Enter/Return key

6. Still in the Linux Deployment Server, set the KUBECONFIG environment variable for terminal interaction with the LKE cluster:

```bash
export KUBECONFIG=$CLUSTER_NAME-kubeconfig.yaml
```

7. Verify that kubectl works with the cluster

```bash
kubectl get nodes
```

Example:

```text
NAME                              STATUS   ROLES    AGE   VERSION
lke525068-759150-2bfe0e460000     Ready    <none>   20m   v1.34.0
lke525068-759150-4661256b0000     Ready    <none>   20m   v1.34.0
lke525068-759150-5d7b909a0000     Ready    <none>   20m   v1.34.0
```

8. Back in the Akamai dashboard in the LKE cluster, click on Copy Token. Then, on Kubernetes Dashboard, use the token to log in to the dashboard

This will show details about the LKE cluster in its current state. This dashboard can be used to view and manage the LKE cluster from a graphical point of view.

> **Akamai Kubernetes Dashboard**  
> [Image omitted from this Markdown build.]

### 1.4. Set Default Storage Class

Remove the default tag from all storage classes:

```bash
kubectl get storageclass -o name | xargs -n 1 kubectl patch -p
'{"metadata":{"annotations":{"storageclass.kubernetes.io/is-default-class":null}}}'
```

Set the storage class gp2 as the default storage class:

```bash
kubectl patch storageclass linode-block-storage \
 -p '{"metadata": {"annotations": {"storageclass.kubernetes.io/is-default-class": "true"}}}'
```

## 2. [ BETA ] GPU Operator for NVENC

This section is only required for a Kubernetes cluster that will use GPUs. Skip this step if GPUs will not be used in this Kubernetes cluster.

> **Important: BETA Feature**  
> GPU can be used in Cambria Cluster/FTC. However, this feature is still a work in progress and may not function as expected.

> **Limitation: Cambria FTC Autoscaler**  
> This feature currently does not work with the FTC autoscaler

In your command prompt / terminal, run the following commands to deploy the GPU Operator to the Kubernetes cluster:

```bash
helm repo add nvidia https://helm.ngc.nvidia.com/nvidia; \
helm repo update; \
helm install nvidia-operator nvidia/gpu-operator \
 --create-namespace \
 --namespace gpu-operator
```

Wait at least 5 minutes for the GPU operator to install completely

Run this command with 'kubectl' and make sure that all of the pods are in a Running or Completed state:

```bash
kubectl get pods -n gpu-operator
```

If any pod is still in an Init state or PodCreating state, wait another 5 minutes to see if the pods will complete their install process.

For any pods that are in an errored state or that are still in an Init state after 10 minutes, do the following:

a. Check that at least one node is one of the supported Akamai Cloud GPU instances

b. Use the following command to check the state of a failing pod (check the Events section):

```bash
kubectl describe pod <your-pod-name> -n gpu-operator
```

Either look up the error for a potential solution or send the entire Events section to the Capella support team for investigation.

## 3. Deploy Traefik: Application Domain-Name Access

By default, certain parts of the Cambria applications are exposed via an ingress. In order to access these, the traefik service needs to be created and attached to the ingress.

1. Run the following commands to get the traefik Helm repository:

```bash
helm repo add traefik https://traefik.github.io/charts && helm repo update
```

2. Run the following commands to deploy traefik to the Kubernetes cluster:

```bash
helm upgrade --install traefik traefik/traefik --namespace traefik --create-namespace
```

3. Wait about a minute for the deployment to complete fully. Verify that the resources are created and in an active / online state:

- Pods should be in a Running STATUS and all containers in READY should be active
- Services should have a CLUSTER-IP assigned. The traefik service should have an EXTERNAL-IP
- All other resources (Eg. replicasets, deployments, statefulsets, etc) should have all desired resources active

```bash
kubectl get all -n traefik
```

If any resources are still not ready, wait about a minute for them to complete. If still not complete, contact the Capella support team.

For Production / Using Publicly Registered Domain Name and TLS Certificate.  
Example with Namecheap Registered Domain:

https://www.dropbox.com/scl/fi/l4uu74yj3ur4it50j6d3i/Cambria_Kubernetes_Domain_DNS_Guide.pdf?rlkey=qou5oj8jrdyfmpw3jhhzzqlaz&st=h6wo60gl&dl=0

If not working or unsure of how to do this, contact Capella support.

## 4. Deploy Third-Party Dependency Kubernetes Tools

There are a few tools that need to be deployed in order to make Cambria FTC / Cluster work properly.

1. Run the following commands to deploy the pre-requisite tools for the kubernetes cluster:

```bash
./bin/deployCambriaKubeDependencies.sh
```

2. Verify that resources are created and in an active / online state:

- Pods should be in a Running STATUS and all containers in READY should be active
- Services should have a CLUSTER-IP assigned
- All other resources (Eg. replicasets, deployments, statefulsets, etc) should have all desired resources active

```bash
kubectl get all -n cnpg-system; kubectl get all -n argo-events; kubectl get all -n cert-manager
```

If any resources are still not ready, wait about a minute for them to complete. If still not working, contact the Capella support team.

## 5. Deploy Performance Metrics and Logging Tools

This section is required for logging and other performance information about the Cambria applications.

Follow the steps in the document below to install Prometheus, Grafana, Loki, and Promtail:

https://www.dropbox.com/scl/fi/20ow87a43na8dpk11tbsu/Prometheus_Grafana_Setup_for_Cambria_Cluster_5_8_0_on_Akamai_Kubernetes.pdf?rlkey=b1nplo9szbw6p3ls4idyixgdw&st=z8b1xl7t&dl=0

## 6. Deploy Cambria Cluster and FTC Application

With Helm and Kubectl installed on the Linux deployment server, create the Helm configuration file (yaml) that will be used to deploy Cambria Cluster / FTC to the Kubernetes environment.

1. In a command line / terminal window, run the following command to create the configuration file:

```bash
helm show values ./config/capella-cluster-0.5.4.tgz > cambriaClusterConfig.yaml
```

2. Open the configuration file in your favorite text / document editor and edit the following values:

Example using nano:

```bash
nano cambriaClusterConfig.yaml
```

Blue: values in blue will be given to you by Capella. These values in the chart below are for the release version.  
Red: values in red are proprietary values that need to be changed based on your specific environment

| cambriaClusterConfig.yaml | Explanation |
| --- | --- |
| `# workersUseGPU: allow workers to use nvidia GPU`<br />`workersUseGPU: false` | If working with GPUs / NVENC workflows, set this value to true. Otherwise, leave as false. |
| `# nbGPUs: how many GPUs are on the nodes...`<br />`nbGPUs: 1` | If workersUseGPU is set to true, set this to the number of GPUs that are available on the worker nodes.<br /><br />Note: if using more than 1 GPU, multi-GPU support must be enabled in the Cambria license |
| `# enableManagerWebUI: deploy the cambria manager's web UI`<br />`enableManagerWebUI: true` | The Cambria manager has a WebUI available that exposes some management functionality via a GUI interface. For those that do not plan to use the WebUI, this value can be set to false |
| `# ftcEnableAutoScaler: if true, auto-scaler pod for FTC will be deployed`<br />`ftcEnableAutoScaler: true` | The Cambria FTC autoscaler spawns Cambria FTC encoders to handle jobs based on the number of jobs in the queue. By default, the autoscaler is enabled. To instead add Cambria FTC nodes manually, set this value to false. |
| `#ftcEnableScriptableWorkflow: enable to use scriptable workflow in FTC Jobs`<br />`ftcEnableScriptableWorkflow: true` | By default, the Cambria FTC scriptable workflow system is enabled. This is used for running scriptable workflow scripts in Cambria FTC jobs. |
| `# ftcInstanceType: instance type for the FTC nodes which will be...`<br />`ftcInstanceType: "g6-dedicated-16"`<br />`…` | For use with Cambria FTC autoscaler. The instance type for the Cambria FTC encoding machines. This is used by the autoscaler to choose what type of machines to create for encoding. Consult Akamai Cloud documentation for how to find your instance type. By default, this is set to g6-dedicated-16. |
| `# maxFTCInstances: maximum number of FTC instances (ie replicas)...`<br />`maxFTCInstances: 20` | The max number of FTC machines that can be spawned. By default, this is 20, but this will depend on your workflow. |
| `# ftcEncodingSlots: how many encoding slots to use for FTC instances`<br />`ftcEncodingSlots: 2` | For FTC autoscaler, the amount of concurrent encoding jobs that FTC instances should be able to run. If not using the FTC autoscaler, this is used as the default initial number of slots for the deployed FTC instances. |
| `# pgInstances: number of postgresql database instances (ie replicas)`<br />`pgInstances: 3`<br /><br />`# cambriaClusterReplicas: number of Cambria Cluster instances...`<br />`cambriaClusterReplicas: 3`<br />`…` | The number of instances for Cambria Cluster and postgres database. These two values must match each other and also the amount of nodes created in step 1. In this case, the value will be 3. |
| `# run an FTC instance as part of Cambria Cluster. Required for split and stitch.`<br />`cpUseClusterAsFTC: false` | Set this to true if planning to run any management type of jobs (Eg. split and stitch jobs) |
| `externalAccess:`<br />` # exposeClusterServiceExternally: main Cambria Cluster service`<br />` exposeStreamServiceExternally: true` | Set to true to be able to access Cambria Cluster externally |
| ` # enableIngress: enable traefik as an application ingress`<br />` enableIngress: true` | This allows the use of an application ingress to access the Cambria applications such as the Web UI, API, Grafana, etc. By default, this is set to true. |
| `# extra annotations for API ingress route`<br />`apiExtraIngressAnnotations: {}`<br /><br />`# extra annotations for webUI ingress route`<br />`webuiExtraIngressAnnotations: {}` | If enableIngress is set to true, ingress routes are created for Cambria's Web UI and API.<br /><br />These specific values allow extra annotations to these ingress routes. By default, no extra annotations are added to the ingress routes. |
| `# extra annotations for manager load balancer/service`<br />`managerExtraServiceAnnotations: {}`<br /><br />`# extra annotations for webUI load balancer/service`<br />`webuiExtraServiceAnnotations: {}` | If exposeStreamServiceExternally is set to true, load balancers are created to expose Cambria Web UI and API applications externally.<br /><br />These specific values allow extra annotations to these load balancers. By default, not extra annotations are added to the load balancers. |
| `# hostName: use for traefik. Replace this with your domain name.`<br />`hostName: myhost.com`<br /><br />`# acmeRegistrationEmail: email for Automated Certificate Management`<br />`acmeRegistrationEmail: test@example.com`<br /><br />`# acmeServer: server to get TLS certificate from`<br />`acmeServer: https://acme-staging-v02.api.letsencrypt.org/directory` | These fields are for use with the ingress. The default values can be used for testing purposes. For production, these values must be changed to a valid registered domain name, email, and TLS certificate server. |
| `# ingressUseSelfSigned: use this for local testing without an actual domain`<br />`ingressUseSelfSigned: true` | For testing purposes, the ingress will use a self-signed certificate for the application servers. For production (and if you have your own valid certificate), set this to false |
| `secrets:`<br />` # pgClusterPassword: password for the postgresql database`<br />` pgClusterPassword: "xrtVeQ4nN82SSiYHoswqdURZ…"` | The password for the postgres database. It is recommended to change the default values to something more secure. |
| ` # ftcLicenseKey: FTC license key`<br />` ftcLicenseKey: "2XXXXX-XXXXXX-XXXXXX-XXXXXX-XXXXXX-XXXXXX"` | The Cambria Cluster / FTC product license. The Capella team should have provided this value for you. Replace the “XXXXXX-XXXXXX-XXXXXX-XXXXXX-XXXXXX-XXXXXX” with the license key provided. |
| ` # cambriaClusterAPIToken: API token for Cambria Cluster...`<br />` cambriaClusterAPIToken: "12345678-1234-43f8-b4fc-53afd3893d5f"` | This is a token that is needed to make API calls to Capella’s Cluster web server. Change this value to something specific to your environment.<br /><br />Allowed Characters:<br />- lowercase and capital letters<br />- numbers<br />- underscores<br />- dashes |
| ` # cambriaClusterWebUIUser: user/password to access Cambria Cluster UI...`<br />` cambriaClusterWebUIUser: "admin,defaultWebUIUser,RZvSSd3ffsElsCEEe9"` | This is the login credentials for Cambria Cluster Web UI. Each user is listed in the form:<br /><br />role,username,password<br /><br />Allowed roles:<br />admin - can view/create/edit/delete anything on the WebUI. Can also create/manage WebUI users.<br />user - can view/create/edit/delete anything on the WebUI.<br />viewer - can only view anything on the WebUI.<br /><br />For multiple users, separate each by a comma.<br />Example:<br /><br />Admin,admin,changethispassword1234,viewer,guest,password123 |
| `# akamaiCloudAPIToken: API token, used for horizontal scaling...`<br />`akamaiCloudAPIToken: "d02732530a2bcfd4d028425eb55f366f74631…"` | This is the Akamai Cloud account’s API Token. See https://www.linode.com/docs/products/tools/api/guides/manage-api-tokens/ |
| `# argoEventWebhookSourceBearerToken: bearer token used by webhook-ftc`<br />`argoEventWebhookSourceBearerToken: "L9Em5WIW8yth6H4uPtzT"` | This token can be configured to any value. The token will be used for argo-events type of workflows. |
| `webui:`<br />` userText: "Staging Cluster for project XYZ"` | This is used for exposing important information to an operator of the Cambria Web UI (Eg. API usertoken) |
| `debugging:`<br />` collectCrashDumpManager: false`<br />` collectCrashDumpWorker: false` | If set to true, this will generate crash dumps whenever the applications crash (Cambria manager, Cambria worker). This will use up more disk space as the dumps are created directly on the respective node volume. By default, this is disabled and should only be enabled for debugging purposes. |
| `optionalInstall:`<br />` enableEventing: true` | This is used for enabling / disabling the argo-events feature. |

3. Wait at least 5 minutes after installing prerequisites before moving on to this step. In a command line / terminal window, run the following command:

```bash
helm upgrade --install capella-cluster ./config/capella-cluster-0.5.4.tgz --values cambriaClusterConfig.yaml
```

The result of running the command should look something like this:

```text
Release "capella-cluster" does not exist. Installing it now.
NAME: capella-cluster
LAST DEPLOYED: Thu May 3 10:09:47 2023
NAMESPACE: default
STATUS: deployed
REVISION: 1
TEST SUITE: None
```

4. At this point, several components are being deployed to the Kubernetes environment. Wait a few minutes for everything to be deployed.

5. Get important information about the Cambria Stream Manager deployment:

```bash
./bin/getFtcInfo.sh
```

# Installation Verification

## 1. Verify Cambria Cluster Deployment

**Important:** The components below are only a subset of the whole installation. These are the components considered as key to a proper deployment.

1. Run the following command:

```bash
kubectl get all -n capella-manager
```

2. Verify the following information:

| Resources | Content |
| --- | --- |
| Deployments | - 1 cambriaclusterapp deployment with all items active<br />- 1 cambriaclusterwebui deployment with all items active |
| Pods | - X pods with cambriaclusterapp in the name (X = # of replicas specified in config file) with all items active / Running<br />- 1 pod with cambriaclusterwebui in the name |
| Services | - 1 service named cambriaclusterservice. If exposeStreamServiceExternally is true, this should have an EXTERNAL-IP<br />- 1 service named cambriaclusterwebuiservice. If exposeStreamServiceExternally is true, this should have an EXTERNAL-IP |

3. If any of the above are not in an expected state, wait a few more minutes in case some resources take longer than expected to complete. If after a few minutes there are still resources in an unexpected state, contact the Capella support team.

4. Run the following command for the pgcluster configuration:

```bash
kubectl get all -n capella-database
```

5. Verify the following information:

| Resources | Content |
| --- | --- |
| Pods | - X pods with pgcluster in the name (X = # of replicas specified in config file) with all items active / Running |
| Services | - 3 services with pgcluster in the name with a CLUSTER-IP assigned |

## 2. Verify Cambria FTC Deployment

**Important:** The components below are only a subset of the whole installation.These are the components considered as key to a proper deployment.

1. Run the following command:

```bash
kubectl get all -n capella-worker
```

2. Verify the following information:

| Resources | Content |
| --- | --- |
| Pods | - X pods with cambriaftcapp in the name (X = Max # of FTCs specified in the config file)<br /><br />Notes:<br />1. If using Cambria FTC autoscaler, all of these pods should be in a pending state. Every time the autoscaler deploys a Cambria FTC node, one pod will be assigned to it<br /><br />2. If not using Cambria fTC autoscaler, Y of the pods should be in an active / running state and all containers running (Y = # of Cambria FTC nodes active) |
| Deployments | - 1 cambriaftcapp deployment. |

3. If any of the above are not in an expected state, wait a few more minutes in case some resources take longer than expected to complete. If after a few minutes there are still resources in an unexpected state, contact the Capella support team.

## 3. Verify Applications are Accessible

### 3.1. Cambria Cluster WebUI

Skip this step if the WebUI was set to disabled in the Helm values configuration yaml file or the ingress will be used instead. For any issues, contact the Capella support team

1. Get the WebUI address. A web browser is required to access the WebUI:

#### Option 1: External Url if External Access is Enabled

Run the following command:

```bash
kubectl get svc/cambriaclusterwebuiservice -n capella-manager -o=jsonpath="{'https://'}{.status.loadBalancer.ingress[0].hostname}{':8161'}{'\n'}"
```

The response should look something like this:

```text
https://192.122.45.33:8161
```

#### Option 2: Non-External Url Access

Run the following command to temporarily expose the WebUI via port-forwarding:

```bash
kubectl port-forward -n capella-manager svc/cambriaclusterwebuiservice 8161:8161 --address=0.0.0.0
```

The url depends on the location of the web browser. If the web browser and the port-forward are on the same machine, use localhost. Otherwise, use the ip address of the machine with the port-forward:

```text
https://<server>:8161
```

2. In a web browser, enter the above url. This should trigger an "Unsafe" page similar to the one below:

> **Cambria Cluster WebUI certificate warning**  
> [Image omitted from this Markdown build.]

3. Click on Advanced and Proceed to [ EXTERNAL IP ] (unsafe). This will show the login page.

> **Cambria Cluster WebUI login page**  
> [Image omitted from this Markdown build.]

4. Log in using the credentials created in the Helm values yaml file (See cambriaClusterWebUIUser)

### 3.2. Cambria Cluster REST API

Skip this step if the ingress will be used instead of external access or any other type of access. For any issues, contact the Capella support team.

1. Get the REST API address:

#### Option 1: External Url if External Access is Enabled

Run the following command:

```bash
kubectl get svc/cambriaclusterservice -n capella-manager -o=jsonpath="{'https://'}{.status.loadBalancer.ingress[0].hostname}{':8650'}{'\n'}"
```

The response should look something like this:

```text
https://192.122.45.33:8650
```

#### Option 2: Non-External Url Access

Run the following command to temporarily expose the REST API via port-forwarding:

```bash
kubectl port-forward -n capella-manager svc/cambriaclusterservice 8650:8650 --address=0.0.0.0
```

The url depends on the location of the port-forward. If the web browser and the port-forward are on the same machine, use localhost. Otherwise, use the ip address of the machine with the port-forward:

```text
https://<server>:8650
```

2. Run the following API query to check if the REST API is active:

```bash
curl -k -X GET https://<server>:8650/CambriaFC/v1/SystemInfo
```

### 3.3. Cambria License

Skip this step if the ingress will be used instead of external access or any other type of access. The Cambria license needs to be active in all entities where the Cambria application is deployed. Run the following steps to check the cambria license. Access to a web browser is required:

1. Get the url for the License Manager WebUI:

#### Option 1: External Url if External Access is Enabled

Run the following command:

```bash
kubectl get svc/cambriaclusterwebuiservice -n capella-manager -o=jsonpath="{'https://'}{.status.loadBalancer.ingress[0].hostname}{':8481'}{'\n'}"
```

The response should look something like this:

```text
https://192.122.45.33:8481
```

#### Option 2: Non-External Url Access

Run the following command to temporarily expose the License WebUI via port-forwarding:

```bash
kubectl port-forward -n capella-manager svc/cambriaclusterwebuiservice 8481:8481 --address=0.0.0.0
```

The url depends on the location of the port-forward. If the web browser and the port-forward are on the same machine, use localhost. Otherwise, use the ip address of the machine with the port-forward:

```text
https://<server>:8481
```

2. In a web browser, enter the above url. This should trigger an "Unsafe" page similar to the one below:

> **Cambria License Manager certificate warning**  
> [Image omitted from this Markdown build.]

3. Click on Advanced and Proceed to [ EXTERNAL IP ] (unsafe). This will show the login page.

> **Cambria License Manager login page**  
> [Image omitted from this Markdown build.]

4. Log in using the credentials created in the Helm values yaml file (See cambriaClusterWebUIUser)

5. Verify that the License Status is valid for at least either the Primary or Backup. Preferably, both Primary and Backup should be valid. If there are issues with the license, wait a few minutes as sometimes it takes a few minutes to properly update. If still facing issues, contact the Capella support team.

### 3.4. Cambria Domain-Based Application Access

Skip this step if not planning to test with Cambria's domain-based access. For any issues, contact the Capella support team.

#### 3.4.1. Get the Ingress Endpoints

There are two ways to use the ingress:

##### Option 1: Using Default Testing Ingress

Only use this option for testing purposes. Skip to option 2 for production. In order to use the testing domain, the hostname needs to be DNS resolvable on the machines that will need access to the Cambria applications.

1. Get the traefik service external address:

```bash
kubectl get svc/traefik -n traefik -o=jsonpath="{.status.loadBalancer.ingress[0].hostname}{'\n'}"
```

The response should look similar to the following:

```text
55.99.103.99
```

2. In your local server(s) or any other server(s) that need to access the ingress, edit the hosts file (in Linux, usually /etc/hosts) and add the following lines (Example):

```text
55.99.103.99          api.myhost.com
55.99.103.99          webui.myhost.com
55.99.103.99          monitoring.myhost.com
```

##### Option 2: Using Publicly Registered Domain (Production)

Contact Capella if unable to set up a purchased domain with the ingress. If the domain is set up, the endpoints needed are the following:

Example with mydomain.com as the domain:

```text
REST API:          https://api.mydomain.com
WebUI:             https://webui.mydomain.com
Grafana Dashboard: https://monitoring.mydomain.com
```

#### 3.4.2. Test Ingress Endpoints

If using the test ingress, these steps can only be verified in the machine(s) where the hosts file was modified. This is because the test ingress is not publicly DNS resolvable and so only those whose hosts file (or DNS) have been configured to resolve the test ingress will be able to access the Capella applications in this way.

1. Test Cambria Cluster WebUI with the ingress that starts with webui. Run steps 2-3 of Cambria Cluster WebUI. Example:

```text
https://webui.myhost.com
```

2. Test Cambria REST API with the ingress that starts with api. Run step 2 of Cambrai Cluster REST API. Example:

```text
https://api.myhost.com/CambriaFC/v1/SystemInfo
```

3. Test Grafana Dashboard with the ingress that starts with monitoring. Run the verification steps for the Grafana Dashboard section Verify Grafana Deployment (steps 2-4) in the document in section Performance Metrics and Logging Tools. Example:

```text
https://monitoring.myhost.com
```

# Testing Cambria FTC / Cluster

The following guide provides information on how to get started testing the Cambria FTC / Cluster software:

https://www.dropbox.com/scl/fi/4c03qwdg7xeb7hvfy24k1/Cambria_Cluster_and_FTC_5_8_0_Kubernetes_User_Guide.pdf?rlkey=jhwtqvbf409lquxg7k2awkq9h&st=bp46ftb9&dl=0

# Updating / Upgrading

## Updating Kubernetes Cluster to New Version

Since upgrading Kubernetes versions is an irreversible process, Capella highly recommends creating a new Kubernetes cluster with the desired version.

> **Warning: Using a Different Kubernetes Version Than the Document**  
> The Cambria Cluster / FTC Kubernetes documents are each tested on a specific Kubernetes version. For upgrading, it is recommended to download the latest Cambria Cluster / FTC Kubernetes document and use the latest Kubernetes version that was tested in that document.
>
> If you would like to use a different kubernetes version than the one tested, be aware that the steps in the document may not work as intended.

1. Download the latest Cambria FTC / Cluster Kubernetes Installation guide
2. Follow the steps in that document

## Updating Cambria FTC / Cluster and Dependencies

### 1. Choose Upgrade Method

#### Option 1: Normal Upgrade via Helm Upgrade

This upgrade method is best for when changing version numbers, secrets such as the license key, WebUI users, etc, and Cambria FTC | Cambria Cluster specific settings such as max number of pods, replicas, etc.

> **Warning: Known Issues**
> - pgClusterPassword cannot currently be updated via this method
> - Changing postgres version also cannot be updated via this method

1. Edit the Helm configuration file (yaml) for your Kubernetes environment or create a new configuration file and edit the new file. See section Deploy Cambria Cluster and FTC Application for more details.

2. Run the following command to apply the upgrade

```bash
helm upgrade capella-cluster ./config/capella-cluster-0.5.4.tgz --values cambriaClusterConfig.yaml
```

3. Restart the deployments

```bash
kubectl rollout restart deployment cambriaclusterapp cambriaclusterwebui -n capella-manager
kubectl rollout restart deployment cambriaftcapp -n capella-worker
```

4. Wait a few minutes for the kubernetes pods to install properly

#### Option 2: Upgrade via Cambria Cluster Reinstallation

For any upgrade cases for the Cambria Cluster | Cambria FTC environment, this is the most reliable option. This upgrade option basically uninstalls all of the Cambria FTC and Cluster components and then reinstall with the new Helm chart and values (.yaml) file. As a result, this will delete the database and delete all of your jobs in the Cambria Cluster UI.

1. Follow section Deploy Cambria Cluster and FTC Application to download and edit your new cambriaClusterConfig.yaml file.

2. In a command line / terminal window in your local server, run the following command:

```bash
helm uninstall capella-cluster --wait
```

3. Deploy the Helm configuration file with the following command

```bash
helm upgrade --install capella-cluster ./config/capella-cluster-0.5.4.tgz --values cambriaClusterConfig.yaml
```

### 2. Verify Upgrade was Successful

The best way to verify the upgrade is to use the steps in Installation Verification. For any issues, contact the Capella support team.

# Resource Cleanup / Deletion

## Delete Kubernetes Cluster

Many resources are created in a Kubernetes environment. It is important that each step is followed carefully:

1. Run the following commands to remove the Helm deployments:

```bash
helm uninstall capella-cluster -n default --wait
```

2. If any volumes are remaining, run the following command:

```bash
kubectl get pv -o name | awk -F'/' '{print $2}' | xargs -I{} kubectl patch pv {} -p='{"spec":
{"persistentVolumeReclaimPolicy": "Delete"}}'
```

3. Only if traefik ingress was deployed, do the following:

```bash
helm uninstall -n traefik traefik --wait && kubectl delete namespace traefik
```

4. Run the following commands to uninstall the monitoring deployment:

`<install_type>`: the loki install type. If the S3 loki version was installed, use 's3_embedcred'. If the Filesystem loki version was installed, use 'local'

```bash
./bin/quickDestroyMonitoring.sh <install_type>
```

5. In the Akamai Cloud Home page, go into the Kubernetes Cluster and Delete Cluster

Wait several minutes for the Kubernetes Cluster to delete completely.

# Quick Reference: Helpful Commands/Info for After Installation

This section provides helpful commands and other information that may be useful after the installation process such as how to get the WebUI address, what ports are available to use for incoming sources, etc.

## Get General Cambria FTC Deployment Information

Requires the Cambria FTC Package from Download Cambria FTC Package and all of the prerequisites.

```bash
./bin/getFtcInfo.sh
```

## Add Extra Cambria FTC Nodes

1. Go to your kubernetes cluster in the Akamai Cloud dashboard and Add A Node Pool. Select a Plan and number of nodes to add. Add Pool.

2. In the new node pool's "..." settings, choose Labels and Taints. In the Labels, add a new Node Label:

```text
capella-worker: true
```

3. Save Changes

## Add Extra Cambria Manager Nodes

1. Go to your kubernetes cluster in the Akamai Cloud dashboard and Add A Node Pool. Select a Plan and number of nodes to add. Add Pool.

2. In the new node pool's "..." settings, choose Labels and Taints. In the Labels, add a new Node Label:

```text
capella-manager: true
```

3. Save Changes

## Set Cambria FTC Label on New Nodes

For any node that should be an encoding node:

1. Find out which node(s) will be used as Cambria FTC nodes:

```bash
kubectl get nodes
```

2. Apply the following label to each of those nodes:

```bash
kubectl label node <node-name> capella-worker=true
```

## Set Cambria Cluster Label on New Nodes

For any node that should be a Cambria management node / management backup:

1. Find out which node(s) will be used as Cambria Cluster nodes:

```bash
kubectl get nodes
```

2. Apply the following label to each of those nodes:

```bash
kubectl label node <node-name> capella-manager=true
```

## Get Akamai Kubernetes Kubeconfig File [ For use with kubectl and Akamai Kubernetes Dashboard ]

Log in to the Akamai Cloud dashboard and go to Clusters. Select your cluster from the list and click on the link below Kubeconfig to download or click on View to see/copy the contents of the kubeconfig

## Get Akamai Kubernetes Dashboard URL

1. Log in to the Akamai Cloud dashboard and go to your Kubernetes Cluster. Copy Token
2. Click on the Kubernetes Dashboard link. Use the token from step 1 to log in

## Get Cambria Cluster WebUI URL (via kubectl)

1. Run the following command to get the webui address:

```bash
kubectl get service/cambriaclusterwebuiservice -n capella-manager -o=jsonpath="{'https://'}{.status.loadBalancer.ingress[0].hostname}{':8161'}"
```

2. To log in to the WebUI, the credentials are located in the Helm values .yaml file that you configure (See section Deploy Cambria Cluster and FTC Application)

## Get Cambria Cluster WebUI URL (via Kubernetes Dashboard)

1. In the Akamai Kubernetes Dashboard for your specific cluster, go to Services and look for the cambriaclusterwebuiservice service. Copy the IP address of one of the External Endpoints

2. The WebUI address should be https://[ EXTERNAL IP ]:8161. To log in to the WebUI, the credentials are located in the Helm values .yaml file that you configure (See section Deploy Cambria Cluster and FTC Application)

## Get Cambria Cluster REST API URL (via kubectl)

1. Run the following command to get the base REST API Web Address:

```bash
kubectl get service/cambriaclusterservice -n capella-manager -o=jsonpath="{'https://'}{.status.loadBalancer.ingress[0].hostname}{':8650'}"
```

The REST API url should look similar to this:

```text
https://23-45-226-151.ip.linodeusercontent.com:8650/CambriaFC/v1/Jobs?usertoken=12345678-1234-43f8-b4fc-53afd3893d5f
```

## Get Cambria Cluster REST API URL (via Kubernetes Dashboard)

1. In the Akamai Kubernetes Dashboard for your specific cluster, go to Services and look for the cambriaclusterservice service. Copy the IP address of one of the External Endpoints (replace http:// with https://)

The REST API should look similar to this:

```text
https://23-45-226-151.ip.linodeusercontent.com:8650/CambriaFC/v1/Jobs?usertoken=12345678-1234-43f8-b4fc-53afd3893d5f
```

## Get Cambria FTC Instance External IP

1. In the Cambria Cluster WebUI, go to the Machines tab and copy the name of the machine (pod)

2. Run the following commands with the name of the machine (aka. `<pod-name>`):

```bash
# Replace <pod-name> with your pod name
kubectl get pod/<pod-name> -n capella-worker -o=jsonpath={.spec.nodeName}

# Replace <node-name> with the result from the above command
kubectl get node/<node-name> -n capella-worker -o=jsonpath={.status.addresses[1].address}
```

## Get Leader Cambria Cluster Pod Name

Run the following command to get the name of the Cambria Cluster leader pod:

```bash
kubectl get lease -n capella-manager -o=jsonpath="{.items[0].spec.holderIdentity}"
```

## Remote Access a Kubernetes Pod

The general command for remote accessing a pod is:

```bash
kubectl exec -it <pod-name> -n <namespace> -- /bin/bash
```

Example with Cambria FTC:

```bash
kubectl exec -it cambriaftcapp-5c79586784-wbfvf -n capella-worker -- bash
```

## Extract Cambria Cluster | Cambria FTC | Cambria License Logs

In a machine that has kubectl and the kubeconfig file for your Kubernetes cluster, open a terminal window and make sure to set the KUBECONFIG environment variable to the path of your kubeconfig file. Then run one or more of the following commands depending on what types of logs you need (or that Capella needs). You will get a folder full of logs. Compress these logs into one zip file and send it to Capella:

`<pod-name>`: the name of the pod to grab logs from (Eg. cambriaftcapp-5c79586784-wbfvf)

Cambria FTC:

```bash
kubectl cp <pod-name>:/opt/capella/Cambria/Logs ./CambriaFTCLogs -n capella-worker
```

Cambria Cluster:

```bash
kubectl cp <pod-name>:/opt/capella/CambriaCluster/Logs ./CambriaClusterLogs -n capella-manager
```

Cambria License Manager (Cambria FTC):

```bash
kubectl cp <pod-name>:/opt/capella/CambriaLicenseManager/Logs ./CambriaFTCLicLogs -n capella-worker
```

Cambria License Manager (Cambria Cluster):

```bash
kubectl cp <pod-name>:/opt/capella/CambriaLicenseManager/Logs ./CambriaClusterLicLogs -n capella-manager
```

## Copy File(s) to Cambria FTC / Cluster Pod

In some cases, you might need to copy files to a Cambria FTC / Cluster pod. For example, you have an MP4 file you want to use as a source directly from the encoding machine’s file system. In this case, to copy the file over to the Cambria FTC / Cluster pod, do the following:

```bash
kubectl cp <host-file-path> <pod-name>:<path-inside-container> -n <namespace>
```

Example:

```bash
# Copy file to Cambria FTC pod
kubectl cp /mnt/n/MySource.mp4 cambriaftcapp-7c55887db9-t42v7:/var/media/MySource.mp4 -n capella-worker

# Copy file to Cambria Cluster pod
kubectl cp C:\MyKeys\MyKeyFile.key cambriaclusterapp-695dcc848f-vjpc7:/var/keys/MyKeyFile.key -n capella-manager

# Copy directory to Cambria FTC container
kubectl cp /mnt/n/MyMediaFiles cambriaftcapp-7c55887db9-t42v7:/var/temp/mediafiles -n capella-worker
```

## Restart / Re-create Pods

Kubectl does not currently have a way to restart pods. Instead, a pod will need to be “restarted” by deleting the pod which causes a new pod to be created / existing pod to take over the containers.

```bash
kubectl delete pod <pod-name> -n <namespace>
```

Example:

```bash
# Delete Cambria FTC Container
kubectl delete pod cambriaftcapp-7c55887db9-t42v7 -n capella-worker

# Delete Cambria Cluster Container
kubectl delete pod cambriaclusterapp-695dcc848f-vjpc7 -n capella-manager
```

# Glossary

This glossary provides a brief definition / description of some of the more common terms found in this guide.

## Kubernetes Terms

For Kubernetes terms, please refer to the Kubernetes Glossary:

https://kubernetes.io/docs/reference/glossary/?fundamental=true

## Third-Party Tools

**Argo:** the Argo third-party system is a collection of tools for orchestrating parallel jobs in a Kubernetes environment.

**Argo-Events:** an Argo tool that triggers specific Kubernetes functions based on events from other dependencies such as webhook, s3, etc.

**Cert-Manager:** the cert-manager addon automates the process of retrieving and managing TLS certificates. These certificates are periodically renewed to keep the certificates up to date and valid.

**Helm:** the Helm third-party tool is used for deploying / managing (install, update, delete) deployments for Kubernetes Cluster applications.

**Traefik:** the traefik addon is an ingress server using Traefik as a load balancer to route traffic to ingress and ingress routes. In this case, traefik is used for applying domain name use to the Kubernetes services (REST API, WebUI, etc).

## Capella Applications

**cambriaclusterapp:** the Cambria Cluster application container. This container exists in all cambriaclusterapp-xyz pods.

**cambriaftautoscale:** this container is used like a load balancer. It spawns new nodes with Cambria FTC specific content whenever Cambria Cluster has jobs in the queue.

**cambriaftcapp:** the Cambria FTC application container. This container exists in all cambriaftcapp-xyz pods.

**cambriaftcconnect:** this container is used for automatically connecting Cambria FTC instances to Cambria Cluster. This container exists in all cambriaftcapp-xyz pods.

**cambrialeaderelector:** this container is used for Cambria Cluster replication in that it decides which of the Cambria Cluster instances is the primary instance. This container exists in all cambriaclusterapp-xyz pods.

**pgcluster-capella:** this type of pod holds the PostgreSQL database that Cambria Cluster uses / interacts with.
