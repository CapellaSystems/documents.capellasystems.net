# Cambria Cluster / FTC 5.8.0

## Oracle Cloud Kubernetes Help Documentation

## Document History

```text
Version         Date            Description
```

```text
5.6.0           10/31/2025      Updated for release 5.6.0.26533 (Linux)
```

```text
5.8.0           07/01/2026      Updated for release 5.8.0.31580 (Linux)
```

* Download the online version of this document for the latest information and latest files. Always

download the latest files

Do not move forward with the installation process if you do not agree with the End User License

Agreement (EULA) for our products. You can download and read the EULA for Cambria FTC, Cambria

Cluster, and Cambria License Manager from the links below:

Cambria Cluster | Cambria FTC | Cambria License Manager

https://www.dropbox.com/s/1wg7ee7a59kzi8h/EULA_Cambria_License_Manager.pdf?dl=0https://www.dropbox.com/s/oemlax63aatjjiw/EULA_Cluster.pdf?dl=0

https://www.dropbox.com/s/ualv9usxsowh6m2/EULA_FTC.pdf?dl=0

### Important: Limitations and Security Information

Cambria FTC, Cluster, and License Manager are installed on Linux in containers. Limitations and security information

can be found in the document below:

https://www.dropbox.com/scl/fi/zwojjdyy4kd6ul0s843kx/Cambria_FTC_5_8_0_Limitations_and_Security_Information.pdf?rlkey=ei1tnflrwm8nduiewfd6g6ghu&st=wi4rgxvh&dl=0

### Important: Before You Begin

PDF documents have a copy/paste issue. For best results, download this document and any referenced PDF

documents in this guide and open them in a PDF viewer such as Adobe Acrobat.

For commands that are in more than one line, copy each line one by one and check that the copied command

matches the one in the document.

The sections below provide instructions on creating a NEW basic Kubernetes cluster with Cambria FTC / Cluster

with default settings and more open security settings. For more granular control and non-default settings, consult

Oracle Cloud documentation.

### Information

This document references Kubernetes version 1.35 only

> [Image omitted from this Markdown build.]

## ⚠️ Critical Information: Read Before Proceeding

Before starting the installation, carefully review the following considerations. Skipping this section may

result in errors, failed deployments, or misconfigurations.

### 1. A New Kubernetes Cluster Will Be Deployed

- ​   The installation process creates a brand-new Kubernetes cluster to keep the Cambria ecosystem isolated
from other applications.

### 2. Default Installation is Non-Secure

- ​   The guide covers installation with default settings in an open environment (not secure).
- ​   If you require a secure or customized setup, you will need Oracle Cloud expertise, which is not covered
in this guide.

- ​   Firewall information is provided in section Firewall Information
### 3. Understand Your Transcoding Requirements

- ​   Know your expected transcoding volume, input/output specs
- ​   Refer to section Oracle Cloud Machine Information and Benchmark for guidelines on machine requirements.
### 4. Administrative Rights Required

- ​   Many of the steps in this guide require administrative rights to Oracle Cloud for adding permissions and
performing other administrative functions of that sort.

### 5. Check Oracle Cloud Account Quota

- ​   Ensure the Oracle Cloud account has sufficient quota to deploy Kubernetes resources.
- ​   See section Resource Usage for estimated resource requirements.
### 6. A Separate Linux Machine is Required

- ​   A dedicated Linux machine (preferably Ubuntu) is needed to deploy Kubernetes.
- ​   Keeping Kubernetes tools and configuration files on a dedicated system is strongly recommended.
7. Verify Region-Specific Resource Availability
- ​   Not all Oracle Cloud regions support the same resources (e.g., GPU availability varies by region).
- ​   Consult Oracle Cloud documentation to confirm available resources in your desired region.
> [Image omitted from this Markdown build.]

## Document Overview

The purpose of this document is to provide a walkthrough of the installation and initial testing process of the Cambria

Cluster and Cambria FTC applications in the Kubernetes environment. The basic view of the document is the following:

### 1. Overview of the Cambria Cluster / FTC Environment in a Kubernetes Environment

### 2. Preparation for the installation (Pre-requisites)

### 3. Installation (OKE Cluster, 3rd-Party Tools, Cambria FTC / Cluster)

4. Verify the Installation
### 5. Testing Cambria FTC / Cluster

### 6. Upgrading (Kubernetes Cluster, Cambria FTC / Cluster, Dependencies)

### 7. Resource Cleanup / Deletion

### 8. Quick Reference (Kubernetes commands, AWS commands, etc)

### 9. Glossary

### 10. Troubleshooting

## Overview of Cambria Cluster / FTC on Kubernetes

### Deployment Information: Cambria Cluster and Cambria FTC

There are two major applications involved in this Kubernetes installation: Cambria Cluster and Cambria FTC.

### Cambria Cluster

Recommended deployment is at least 3 nodes with 3 replicas and an external LoadBalancer service. Each node

runs one Cambria Cluster pod. One pod acts as the leader, while the others serve as replicas that can replace

the leader if needed.

Each Cambria Cluster pod includes:

- ​ Cambria Cluster application
- ​ Leader Elector tool, which selects the active leader pod
- ​ Cambria FTC Autoscaler tool, which automatically deploys FTC worker nodes for encoding when
autoscaling is enabled, based on the number of queued encoding jobs

Each active Cambria Cluster pod also has a corresponding PostgreSQL database pod. Data is replicated across

the database pods to help preserve Cluster data if a pod or database issue occurs.

### Cambria FTC

Cambria FTC deployments consist of one or more encoding-focused nodes, typically using different instance

types than the Cambria Cluster nodes. Each Cambria FTC pod runs on its own node and is dedicated to encoding

tasks.

Each Cambria FTC pod includes:

- ​ Cambria FTC application
- ​ Auto-Connect FTC tool, which finds the Cambria Cluster pod and connects the FTC pod to it. If no
Cambria Cluster is found within about 20 minutes, it deletes its node pool or recycles its node.

- ​ Pgcluster database, which stores the encoder’s job data and related runtime information while the pod
is running

Each Kubernetes node runs either a Cambria Cluster deployment or a Cambria FTC deployment.

> [Image omitted from this Markdown build.]

## Resource Usage

The resources used and their quantities will vary depending on requirements and different

environments. Below is general information about some of the major resource usage (other resources may be

used. Consult Oracle cloud documentation for other resources created, usage limits, etc):

Oracle Documentation:

https://docs.public.oneportal.content.oci.oraclecloud.com/en-us/iaas/Content/ContEng/Concepts/contengprerequisites.htm

```text
Load Balancers      0-4 (Manager WebUI, Manager Web Server, Ingress, Grafana)
```

```text
Nodes               X Cambria Manager Instances (Default is 3)
```

Y Cambria FTC Instances (Depends on max FTC instance configuration; Default is 20)

```text
Networking          Default is 1 VCN-native, IG, NAT, SGW
```

Default is 3 subnets (1 for kube plane, 1 for load balancers, 1 for nodes)

Default is /16 CIDR (Has been tested with /19 with default setup)

```text
Security            Default is to use security lists (No NSGs are used)
```

> [Image omitted from this Markdown build.]

## Oracle Cloud Machine Information and Benchmark

The following is a benchmark of two Oracle Cloud machines. The information below is as of October 2024. Note

that the benchmark involves read from / write to an ObjectStorage location which influences the real-time

speed of transcoding jobs.

Benchmark Job Information

```text
Container     Codec       Frame Rate        Resolution
```

```text
Source     TS            H.264       30                1920 x 1080 @ 8 Mbps
```

```text
Output     HLS/TS        H.264       29.97             1920 x 1080 @ 4Mbps | 1280 x 720 @ 2.4Mbps
```

640 x 480 @ 0.8Mbps | 320 x 240 @ 0.3Mbps

VM.Standard.E5.Flex - 8 OCPUs + 32 GB RAM [ AMD EPYC 7J13 ]

Machine Info

```text
Name                   RAM       OCPUs       Storage     Network           Cost per Hour
```

```text
VM.Standard.E5.Flex    32 GB     8           Any         Up to 8 Gbps      $0.448
```

Benchmark Results

```text
# of Concurrent Jobs     Real Time Speed                            CPU Usage
```

```text
2                        For Each job: 0.84x RT (faster             100%
```

than real-time)

Throughput: 1.68x RT (it takes

around 36 seconds to transcode 1

minute of source)

> [Image omitted from this Markdown build.]

## Cambria Application Access

The Cambria applications are accessible via the following methods:

### Option 1: External Access via TCP Load Balancer

The default Cambria installation configures the Cambria applications to be exposed through load balancers.

There is one for the Cambria Manager WebUI + License Manager, and one for the web / REST API server. The

load balancers are publicly available and can be accessed either through its public ip address or domain name,

and the application's TCP port.

Example:

Cambria Manager WebUI:

https://44.33.212.155:8161

Cambria REST API:

https://121.121.121.121:8650/CambriaFC/v1/SystemInfo

External access in this way can be turned on / off via a configuration variable. See Deploy Cambria Cluster and

FTC Application. If this feature is disabled, another method of access will need to be configured.

### Option 2: Application Access via Domain Name: Traefik

In cases where the external access via TCP load balancer is not acceptable or for using a purchased domain name

from servicers such as GoDaddy, the Cambria installation provides the option to expose an ingress route. Similar to

the external access load balancers, the Cambria Manager WebUI and web / REST API server are exposed. However,

only one ip address / domain name is needed in this case.

How it works is that the Cambria WebUI is exposed through the subdomain webui, the Cambria web server through

the subdomain api, and Grafana dashboard through the subdomain monitoring. The following is an example with the

domain mydomain.com

Cambria Manager WebUI:

https://webui.mydomain.com

Cambria REST API:

https://api.mydomain.com

Grafana Dashboard:

https://monitoring.mydomain.com

Capella provides a default internal hostname for testing purposes only. In production, the default hostname, ssl

certificate, and other such information needs to be configured. More information about domain configuration is

explained later in this guide.

> [Image omitted from this Markdown build.]

## Firewall Information

By default, this guide creates a kubernetes cluster with default settings which includes the default

network firewall configurations. In the default configuration, a virtual network is created alongside the

kubernetes cluster. For custom / non-default configurations, or to explore with a more restrictive network based

on the default virtual network created, the following is a list of known ports that the Cambria applications use:

```text
Port(s)            Protocol   Traffic       Description
```

```text
8650               TCP        Inbound       Cambria Cluster REST API
```

```text
8161               TCP        Inbound       Cambria Cluster WebUI
```

```text
8678               TCP        Inbound       Cambria License Manager Web Server
```

```text
8481               TCP        Inbound       Cambria License Manager WebUI
```

```text
9100               TCP        Inbound       Prometheus System Exporter for Cambria Cluster
```

```text
8648               TCP        Inbound       Cambria FTC REST API
```

```text
3100               TCP        Inbound       Loki Logging Service
```

```text
3000               TCP        Inbound       Grafana Dashboard
```

```text
443                TCP        Inbound       Capella Ingress
```

```text
ALL                TCP/UDP    Outbound      Expose all Outbound Traffic
```

Also, for Cambria licensing, any Cambria Cluster and Cambria FTC machine requires that at least the following

domains be exposed in your firewall (both inbound and outbound traffic):

```text
Domain                            Port(s)     Protocol        Traffic        Description
```

```text
api.cryptlex.com                  443         TCP             In/Out         License Server
```

```text
cryptlexapi.capellasystems.net    8485        TCP             In/Out         License Cache Server
```

```text
cpfs.capellasystems.net           8483        TCP             In/Out         License Backup Server
```

> [Image omitted from this Markdown build.]

## Specifications for Linux Deployment Server

In order to deploy Cambria FTC, a Linux Deployment Server is required because this is where all of the tools,

dependencies, and packages for the Cambria FTC Kubernetes deployment will be installed and/or stored. If you

already have a deployment server, you can skip this section.

### Important: Linux Deployment Server Machine Information

The instructions in this document perform functions using a root user. To keep things consistent, Capella strongly

recommends using Oracle instances for the deployment process.

Capella tests deployment with the VM.Standard.E5.Flex Shape

Minimum Requirements:

```text
Operating System (OS)          Canonical Ubuntu 24.04
```

```text
Shape                          VM.Standard.E5.Flex
```

```text
OCPU(s)                        2
```

```text
RAM                            4 GB
```

```text
Storage                        10 GB
```

> [Image omitted from this Markdown build.]

## Pre-requisites

The following steps need to be completed before the deployment process.

### 1. Install Linux Tools

This guide uses curl, unzip, python3, and jq to run certain commands and download the required tools and

applications. Therefore, the Linux server used for deployment will need to have these tools installed.

Example with Ubuntu 24.04:

```text
sudo apt update && \
sudo DEBIAN_FRONTEND=noninteractive apt -o Dpkg::Options::="--force-confold" -y upgrade && \
sudo DEBIAN_FRONTEND=noninteractive apt -o Dpkg::Options::="--force-confold" -y install curl unzip jq python3
```

### 2. Download Cambria FTC Package

The components of this installation are packaged in a zip archive. Download it using the following command:

```text
curl -o CambriaClusterKubernetesOracle_5_8_0.zip -L
```

"https://www.dropbox.com/scl/fi/gh0ea0cmqieatdapa665n/CambriaClusterKubernetesOracle_5_8_0.zip?rlkey=yl0t1niy2z3s1dqyf003fb2ki&st=2wtl0vu5&dl=1"

```text
unzip -o CambriaClusterKubernetesOracle_5_8_0.zip && chmod +x *.sh ./bin/*.sh
```

Important: the scripts included have been tested with Ubuntu. They may work with other Linux distributions but not

tested

### 3. Install Kubernetes Tools: Kubectl, Helm, OCI-CLI

1. Select one of the following options for installing the kubernetes tools
Option 1: Use Installation Script (Verified on Ubuntu)

```text
./bin/installKubeTools.sh && ./bin/installKubeToolsOracle.sh
```

Option 2: Other Installation Options

### 1. Kubectl: https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/

### 2. Helm:    https://helm.sh/docs/intro/install/

### 3. OCI CLI: https://docs.oracle.com/en-us/iaas/Content/API/SDKDocs/cliinstall.htm

2. Verify that the tools are installed correctly. If any of the commands below fail, review the installation
instructions for the failing tool and try again:

```text
kubectl version --client && helm version && oci --version
```

> [Image omitted from this Markdown build.]

4. Create an Oracle Cloud API Key
You can skip this step if you already have an Oracle Cloud config file in $HOME/.oci in the Linux

machine that will run the commands in this guide. In order to work with Oracle cloud, an API key needs to

be created.

### 1. Install openssl tool for creating keys:

```text
sudo apt update -y && sudo apt install -y openssl
```

2. Run the following script to create a public / private key pair:
```text
./bin/createPublicPrivateKeyPair.sh
```

3. Copy the public key that was printed out (Starts with "-----BEGIN PUBLIC KEY—--")
4. In the Oracle Cloud Dashboard, do the following:
a.​ Go to your profile (Profile is located in the top right corner and the option My profile).

b.​ In Tokens and keys, select API keys and Add API key.

c.​ Select the Paste a public key option and paste the public key that you copied from step 3

d.​ Click Add to continue. You should get a read-only version of your Oracle config file.

5. Copy the contents of the Oracle config file generated in the previous step. Go back to the Linux terminal and
create a new file $HOME/.oci/config:

```text
nano ~/.oci/config && chmod 600 ~/.oci/config
```

Paste the contents of the Oracle config file to this editor window.

Use your arrow keys to move down to the line that says key_file: `<path_to_your_private_key>`

Replace the `<path_to_your_private_key>` with ~/.oci/privatekey.pcks8

Then save the contents by doing the following on your keyboard:

   a. Press the CTRL + X keys
   b. Press the 'y' key
   c. Press the [Enter] key
> [Image omitted from this Markdown build.]

5. Create an OCI Compartment and Domain
If you already have a compartment where you plan to deploy the OKE cluster, skip this section.

1. In the Oracle Cloud Dashboard, go to Identity & Security > Identity > Compartments
2. Create compartment with the following:
```text
Name                         [ Any Name ] (Eg. my-oke-compartment)
```

```text
Description                  [ Any Description ] (Eg. Compartment to run my OKE cluster)
```

```text
Parent compartment           [ Choose any parent compartment ] (Eg. root)
```

3. Go to Identity & Security > Identity > Domains. Create domain with the following:
```text
Display Name                 [ Any Name ] (Eg. my-oke-domain)
```

```text
Description                  [ Any Description ] (Eg. Domain to run my OKE cluster)
```

```text
Domain type                  Free
```

```text
Domain administrator         (Optional) Fill this out if you need an admin for this compartment. Otherwise,
```

disable the "Create an administrative user for this domain" checkbox

```text
Compartment                  The compartment from the previous steps
```

> [Image omitted from this Markdown build.]

6. Set OKE Entity Permissions
Follow the steps in this section if you are planning to use Cambria Cluster's autoscaler feature. For this feature

to work properly, the entities within the OKE cluster must have specific permissions in order to create and

manage Oracle cloud instances.

1. Go to Identity & Security > Identity > Compartments. Look for the compartment where the OKE cluster will
be deployed. Copy the OCID of this compartment and paste it somewhere as it will be needed in the steps below

2. Go to Identity & Security > Identity > Domains and filter by the compartment from step 1
3. If there is a domain listed that you want to use, skip to the next step. Otherwise, create a new domain:
```text
Display Name                              [ Any Name ] (Eg. my-domain)
```

```text
Description                               [ Any Description ] (Eg. This is my special domain)
```

```text
Domain type                               Free (Other options should work too, but Free to quickly get started)
```

```text
Domain Administrator                      Disable for now
```

```text
Remote region disaster recovery           Leave disabled
```

4. Select the preferred domain. Go to Dynamic Groups and create a new Dynamic Group with the following:
```text
Name                                      [ Any Name ]
```

```text
Description                               [ Any Description ]
```

```text
Matching Rules                            Match any rules defined below
```

Then, in Rule 1, add this rule (replace [CT_ID] with the compartment OCID from step 1:

```text
All {instance.compartment.id = '[CT_ID]'}
```

5. Save the Dynamic Group and then go to Identity & Security > Identity > Policies
6. Create a new policy in the same compartment as the above with the following permissions (replace the
highlighted values):

[DN]: the name of the domain that the OKE cluster will be created in

[DG]: the name of the dynamic group created in the previous step

[CT]: the name of the compartment your OKE cluster will be created in

```text
Allow dynamic-group '[DN]'/'[DG]' to read clusters in compartment [CT]
Allow dynamic-group '[DN]'/'[DG]' to manage cluster-family in compartment [CT]
Allow dynamic-group '[DN]'/'[DG]' to use subnets in compartment [CT]
Allow dynamic-group '[DN]'/'[DG]' to use vnics in compartment [CT]
Allow dynamic-group '[DN]'/'[DG]' to inspect compartments in compartment [CT]
Allow dynamic-group '[DN]'/'[DG]' to manage cluster-node-pools in compartment [CT]
Allow dynamic-group '[DN]'/'[DG]' to manage instance-family in compartment [CT]
Allow dynamic-group '[DN]'/'[DG]' to manage virtual-network-family in compartment [CT]
Allow dynamic-group '[DN]'/'[DG]' to use network-security-groups in compartment [CT]
Allow dynamic-group '[DN]'/'[DG]' to use private-ips in compartment [CT]
Allow dynamic-group '[DN]'/'[DG]' to use public-ips in compartment [CT]
```

> [Image omitted from this Markdown build.]

# Installation

## 1. Create Kubernetes Cluster

The following section provides the basic steps needed to create a Kubernetes Cluster on Oracle Cloud.

### 1.1. Create Cluster and Cambria Manager Nodes

1. In the Oracle Cloud account where the cluster will be created, go to Developer Services > Containers &
Artifacts > Kubernetes Clusters (OKE)

2. In the Applied Filters, choose the Compartment where the kubernetes cluster should be added. This should
match the compartment that was used in section Set OKE Entity Permissions

3. Create cluster and select Quick create. Click on Submit to apply the changes
4. Set kubernetes cluster details up to the Shape and image section (see the example below):
```text
Name                                  cambria-cluster
```

```text
Compartment                           Same compartment as step 2
```

```text
Kubernetes Version                    v1.35
```

```text
Kubernetes API endpoint               Public endpoint
```

```text
Node type                             Managed
```

```text
Kubernetes worker nodes               Private workers
```

5. In the Shape and image section, you will choose the type of machine you want for your management
(Cambria Cluster) nodes. This will depend on many factors including the amount of power you need for

management, number of jobs you expect to have in general, number of machines to manage, etc.

### Information / Recommendation

Cambria Cluster manages scheduling and handling Cambria FTC encoding / packaging programs. You will

want to think about how many programs you will intend to run and choose an instance type accordingly.

Node shape can be anything. In Capella testing, we mainly use the VM.Standard.E6.Flex option.

For standard workflows, our minimum requirement currently is 4 OCPUs and 8GB of RAM

It is also recommended to set the node count to 3. This is because 1 of the nodes will act as the Cambria

Cluster node while the other 2 nodes act as backup (web server and database are replicated / duplicated).

In the case that the Cambria Cluster node goes down or stops responding, one of the other two nodes will

take over as the Cambria Cluster node. Depending on the desired workflow(s), think about how many

backup nodes may be needed.

For this guide, here are the values we have set:

```text
Node shape             VM.Standard.E6.Flex
```

```text
OCPUs                  4
```

```text
Memory (GB)            8
```

```text
Image                  Oracle Linux 8 (build Capella uses is 2026.06.15-0)
```

> [Image omitted from this Markdown build.]

6. In Advanced Options, go to Kubernetes labels and Add row:
```text
Key                 capella-manager
```

```text
Value               true
```

7. Verify the details of your OKE cluster and Create cluster. Check the Create a Basic cluster and Continue.
8. Wait for all of the tasks to say complete and continue. At this point, the cluster will be in a Creating state.
Wait until the Cluster status says Running. This could take up to 10 minutes or more depending on the

number of resources to create.

9. Once the OKE cluster is running, Access cluster and go into the Local Access instructions. Follow all of the
steps and for Access config, make sure to choose the Public endpoint access command.

10. Verify that you can access all of the nodes in your kubernetes cluster:
```text
kubectl get nodes
```

### 1.2. Create Cambria FTC Nodes

Skip this step if planning to use Cambria FTC's Autoscaler feature. If you try to manually create an FTC

node with the autoscaler on, the new node is treated as an autoscaled machine and may be terminated

automatically without warning.

For initial testing purposes, it is recommended (but not required) that only one Cambria FTC node is created. If more

FTC nodes are needed, they can be deployed at any time using the same steps below. Keep in mind that there is a

limit to how many FTC nodes can be created. This limit can be modified in a configuration file that is created later in

this guide.

### Information / Recommendation

This section will require an understanding of the required encoding workflows, the complexity of the

transcoding jobs, volume, etc. This is needed in order to determine the strength and type of instance(s)

that will be needed to run the transcodes.

Node shape can be anything. In Capella testing, we mainly use the VM.Standard.E5.Flex option for the

FTC nodes.

For standard workflows, our minimum requirement currently is 8 OCPUs and 32GB of RAM

1. Make sure you are looking at the kubernetes cluster details for your cluster in the Oracle Cloud dashboard
2. Go to the Node pools tab and Add node pool and fill out the following details:
For this guide, we have set the following values:

```text
Name                                      Eg. cambria-worker-nodes
```

```text
Compartment                               The compartment where your OKE cluster is in
```

```text
Node type                                 Managed
```

```text
Kubernetes version                        v1.35
```

> [Image omitted from this Markdown build.]

In Advanced options, go to Kubernetes labels and Add Pair with the following:

```text
Key                                     capella-worker
```

```text
Value                                   true
```

In Node placement configuration:

```text
Availability domain                       Choose the first option
```

```text
Worker node subnet compartment            Same as Kubernetes cluster compartment
```

```text
Worker node subnet                        Choose the one for "Private subnets"
```

In Shape and image:

```text
Node shape                                VM.Standard.E6.Flex
```

```text
Number of OCPUs                           8
```

```text
Memory                                    32
```

```text
Operating system                          Oracle Linux 8
```

```text
Image build                               2026.06.15-0
```

```text
Security                                  1.35
```

In Node pool options:

```text
Node count                                1
```

In Pod communication:

```text
Subnet compartment                                        Same as Kubernetes cluster compartment
```

```text
Subnet                                                    Choose the one listed under Private subnets
```

3. Add the node pool and wait for it to be fully created (and with a Node pool status of Active)
4. (Optional) If you want Cambria Cluster nodes to also be able to run encoding jobs, do the following:
a.​ Find out which node(s) will be used as Cambria Cluster nodes:

```text
kubectl get nodes
```

b.​ Apply the following label to each of those nodes:

```text
kubectl label node <node-name> capella-manager=true
```

> [Image omitted from this Markdown build.]

## 2. Deploy Traefik: Application Domain-Name Access

By default, certain parts of the Cambria applications are exposed via an ingress. In order to access these, the

traefik service needs to be created and attached to the ingress.

### Important: Service Load Balancer Not Auto-Deleted

This will create a load balancer that is not automatically deleted when the Kubernetes cluster is destroyed. This load

balancer has to be deleted manually

1. Run the following commands to get the traefik Helm repository:
```text
helm repo add traefik https://traefik.github.io/charts && helm repo update
```

2. Run the following commands to deploy traefik to the Kubernetes cluster:
```text
helm upgrade --install traefik traefik/traefik --namespace traefik --create-namespace
```

3. Wait about a minute for the deployment to complete fully. Verify that the resources are created and in an active /
online state:

- Pods should be in a Running STATUS and all containers in READY should be active

- Services should have a CLUSTER-IP assigned. The traefik service should have an EXTERNAL-IP

- All other resources (Eg. replicasets, deployments, statefulsets, etc) should have all desired resources active

```text
kubectl get all -n traefik
```

If any resources are still not ready, wait about a minute for them to complete. If still not complete, contact the

Capella support team.

For Production / Using Publicly Registered Domain Name and TLS Certificate:

Obtain a registered domain name (Eg. mywebapp.com) from a domain name registrar and an ACME server for

obtaining a valid certificate for the ingress. The example below will use a namecheap domain with oracle cloud's DNS

service:

In Oracle Cloud:

1. Go to Networking > DNS management > Public zones
2. Create zone and set the following:
```text
Method                         Manual
```

```text
Zone type                      Primary
```

```text
Zone name                      [ Your Domain Name ] (Eg. mydomain.com)
```

```text
Create in compartment          [ Same compartment as your OKE cluster ]
```

3. Create. You should now see a page with the Zone information. Oracle will provide four Nameservers. They will look
something like nsX.p201.dns.oraclecloud.net. Copy these four addresses.

> [Image omitted from this Markdown build.]

In Namecheap Account:

1.​ Go to your Namecheap domain's Manage page.

2.​ On the Domain tab, find the Nameservers section. Change the dropdown from Namecheap

BasicDNS to Custom DNS.

3.​ Paste the four Name Server addresses you copied from Oracle's Public zone into the fields provided.

Click the green checkmark to save.

Wait for DNS Switchover:

This change can take anywhere from 30 minutes to 48 hours. During this time, control of the domain's DNS is

being transferred to Oracle.

Create the Alias Record in Oracle Public zones:

1.​ Once the nameservers have updated, get the DNS name of the EKS cluster's ingress:

a.​ Using kubectl, run the following command:

```text
kubectl get svc/traefik -n traefik -o=jsonpath="{.status.loadBalancer.ingress[0].ip}{'\n'}"
```

b.​ You should see the IP Address of the ingress:

123.124.123.124

2.​ Navigate to the Public zone service in the Oracle Console and go into the Public zone created

3.​ Go to Records and then Manager records

4.​ Click Add record and configure the record as follows:

```text
Name                                              [ Your Domain Name ] (Eg. mydomain.com)
```

```text
Type                                              A - IPv4 address
```

```text
TTL in seconds                                    3600
```

```text
RDATA mode                                        Basic
```

```text
Address                                           The IP address from step 1
```

5.​ Save changes. Now, add a CNAME record for each of the subdomains, starting with monitoring:

```text
Name                 monitoring (eg. monitoring for monitoring.mydomain.com)
```

```text
Record type          CNAME - CNAME
```

```text
TIL in seconds       3600
```

```text
RDATA mode           Basic
```

```text
Target               [ Your Domain Name ] (Eg. mydomain.com)
```

6.​ Repeat step 4 for the following subdomains:

-​ api

-​ webui

-​ licenseui

If not working or unsure of how to do this, contact Capella support.

> [Image omitted from this Markdown build.]

## 3. Deploy Third-Party Dependency Kubernetes Tools

There are a few tools that need to be deployed in order to make Cambria FTC / Cluster work properly.

1. Run the following commands to deploy the pre-requisite tools for the kubernetes cluster:
```text
./bin/deployCambriaKubeDependencies.sh
```

2. Verify that resources are created and in an active / online state:
- Pods should be in a Running STATUS and all containers in READY should be active

- Services should have a CLUSTER-IP assigned

- All other resources (Eg. replicasets, deployments, statefulsets, etc) should have all desired resources active

```text
kubectl get all -n cnpg-system; kubectl get all -n argo-events; kubectl get all -n cert-manager
```

If any resources are still not ready, wait about a minute for them to complete. If still not working, contact the

Capella support team.

## 4. Deploy Performance Metrics and Logging Tools

This section is required for logging and other performance information about the Cambria

applications.

Follow the steps in the document below to install Prometheus, Grafana, Loki, and Promtail:

https://www.dropbox.com/scl/fi/tghb0px50wqmquhz8nkk0/Prometheus_Grafana_Setup_for_Cambria_Cluster_5_8_0_on_Oracle_Kubernetes.pdf?rlkey=b4pojebduajsgs1n2eh8dad9o&st=vbaqlmd3&dl=0

## 5. Deploy Cambria Cluster and FTC Application

With Helm and Kubectl installed on the Linux deployment server, create the Helm configuration file (yaml) that

will be used to deploy Cambria Cluster / FTC to the Kubernetes environment.

1. In a command line / terminal window, run the following command to create the configuration file:
```text
helm show values ./config/capella-cluster-0.5.4.tgz > cambriaClusterConfig.yaml
```

2. Open the configuration file in your favorite text / document editor and edit the following values:
Example using nano:

```text
nano cambriaClusterConfig.yaml
```

> [Image omitted from this Markdown build.]

Blue: values in blue will be given to you by Capella. These values in the chart below are for the release version.

Red: values in red are proprietary values that need to be changed based on your specific environment

```text
cambriaClusterConfig.yaml                                                     Explanation
```

```text
# enableManagerWebUI: deploy the cambria manager's web UI                     The Cambria manager has a WebUI available that
enableManagerWebUI: true                                                      exposes some management functionality via a GUI
```

interface. For those that do not plan to use the

WebUI, this value can be set to false

```text
# ftcEnableAutoScaler: if true, auto-scaler pod for FTC will be deployed      The Cambria FTC autoscaler spawns Cambria FTC
ftcEnableAutoScaler: true                                                     encoders to handle jobs based on the number of
```

jobs in the queue. By default, the autoscaler is

enabled. If you would like to instead add Cambria

FTC nodes manually, set this value to false.

```text
#ftcEnableScriptableWorkflow: enable to use scriptable workflow in FTC Jobs   By default, the Cambria FTC scriptable workflow
ftcEnableScriptableWorkflow: true                                             system is enabled. This is used for running
```

scriptable workflow scripts in Cambria FTC jobs.

```text
# ftcAutoScalerExtraConfig: extra config for autoscaler….                     If the Cambria FTC autoscaler is enabled (value
ftcAutoScalerExtraConfig:                                                     is true), these extra settings need to be configured:
```

```text
cpCloudVendor=OCI,                                                            cpRegion: the region where the Kubernetes cluster
cpRegion=us-ashburn-1,                                                        resides (Eg. us-ashburn-1)
```

ociCompartmentID=ocid1.compartment.oc1..yyyy,

```text
ADsToUse= ,                                                                   ociCompartmentID: this is the OCID of the
CPUs=2,                                                                       compartment where the OKE cluster resides. FTC
MemoryInGB=16                                                                 nodes will be created in this compartment in new
```

node pools under the cluster in this compartment.

ADsToUse: if you want to specify specific ADs to

use in your network for any Cambria FTC nodes that

are auto created, specify each AD separated by a

semicolon. Leave this field blank if you want to be

able to use all of the ADs available.

Example:

ADsToUse=MgAW:UK-LONDON-1-AD-1;MgAW:UK-L

ONDON-1-AD-3

CPUs: this is the number of OCPUs you want your

encoding machine(s) to have when created

MemoryInGBe: this is the amount of memory you

want your encoding machine(s) to have when

created

```text
# ftcInstanceType: instance type for the FTC nodes which will be...           The instance type for the Cambria FTC machines. By
ftcInstanceType: "VM.Standard.E6.Flex"                                        default, this is set to “VM.Standard.E6.Flex”
```

…

```text
# maxFTCInstances: maximum number of FTC instances (ie replicas)...           The max number of FTC machines that can be
maxFTCInstances: 20                                                           spawned. By default, this is 20, but this will depend
```

on your workflow.

```text
# ftcEncodingSlots: how many encoding slots to use for FTC instances          For FTC autoscaler, the amount of concurrent
ftcEncodingSlots: 2                                                           encoding jobs that FTC instances should be able to
```

run. If not using the FTC autoscaler, this is used as

the default initial number of slots for the deployed

FTC instances.

```text
# pgInstances: number of postgresql database instances (ie replicas)          The number of instances for Cambria Cluster and
pgInstances: 3                                                                postgres database. These two values must match
```

each other and also the amount of nodes created in

```text
# cambriaClusterReplicas: number of Cambria Cluster instances...              step 1.
```

cambriaClusterReplicas: 3

…

> [Image omitted from this Markdown build.]

```text
# run an FTC instance as part of Cambria Cluster. Required for split and stitch.   Set this to true if planning to run any management
cpUseClusterAsFTC: false                                                           type of jobs (Eg. split and stitch jobs)
```

```text
externalAccess:                                                                    Set to true to be able to access Cambria Cluster
# exposeClusterServiceExternally: main Cambria Cluster service                    externally
```

exposeStreamServiceExternally: true

```text
# enableIngress: enable traefik as an application ingress                         This allows the use of an application ingress to
enableIngress: true                                                               access the Cambria applications such as the Web
```

UI, API, Grafana, etc. By default, this is set to true.

```text
# extra annotations for API ingress route                                         If enableIngress is set to true, ingress routes are
apiExtraIngressAnnotations: {}                                                    created for Cambria's Web UI and API.
```

```text
# extra annotations for webUI ingress route                                       These specific values allow extra annotations to
webuiExtraIngressAnnotations: {}                                                  these ingress routes. By default, no extra
```

annotations are added to the ingress routes.

```text
# extra annotations for manager load balancer/service                             If exposeStreamServiceExternally is set to true,
managerExtraServiceAnnotations: {}                                                load balancers are created to expose Cambria Web
```

UI and API applications externally.

# extra annotations for webUI load balancer/service

```text
webuiExtraServiceAnnotations: {}                                                  These specific values allow extra annotations to
```

these load balancers. By default, not extra

annotations are added to the load balancers.

```text
# hostName: use for traefik. Replace this with your domain name.                  These fields are for use with the ingress. The default
hostName: myhost.com                                                              values can be used for testing purposes. For
```

production, these values must be changed to a

```text
# acmeRegistrationEmail: email for Automated Certificate Management               valid registered domain name, email, and TLS
acmeRegistrationEmail: test@example.com                                           certificate server.
```

# acmeServer: server to get TLS certificate from

acmeServer: https://acme-staging-v02.api.letsencrypt.org/directory

```text
# ingressUseSelfSigned: use this for local testing without an actual domain       For testing purposes, the ingress will use a
ingressUseSelfSigned: true                                                        self-signed certificate for the application servers. For
```

production (and if you have your own valid

certificate), set this to false

```text
secrets:                                                                           The password for the postgres database. It is
# pgClusterPassword: password for the postgresql database                         recommended to change the default values to
pgClusterPassword: "xrtVeQ4nN82SSiYHoswqdURZ…"                                    something more secure.
```

```text
# ftcLicenseKey: FTC license key                                                  The Cambria Cluster / FTC product license. The
ftcLicenseKey: "XXXXXX-XXXXXX-XXXXXX-XXXXXX-XXXXXX-XXXXXX"                        Capella team should have provided this value for
```

you. Replace the

“XXXXXX-XXXXXX-XXXXXX-XXXXXX-XXXXXX-XXXXX

X” with the license key provided.

```text
# cambriaClusterAPIToken: API token for Cambria Cluster...                        This is a token that is needed to make API calls to
cambriaClusterAPIToken: "12345678-1234-43f8-b4fc-53afd3893d5f"                    Capella’s Cluster web server. Change this value to
```

something specific to your environment.

Allowed Characters:

- lowercase and capital letters

- numbers

- underscores

- dashes

> [Image omitted from this Markdown build.]

```text
# cambriaClusterWebUIUser: user/password to access Cambria Cluster UI...   This is the login credentials for Cambria Cluster Web
cambriaClusterWebUIUser: "admin,defaultWebUIUser,RZvSSd3ffsElsCEEe9"       UI. Each user is
```

listed in the form:

role,username,password

Allowed roles:

admin - can view/create/edit/delete anything on

the WebUI. Can also create/manage WebUI users.

user - can view/create/edit/delete anything on the

WebUI.

viewer - can only view anything on the WebUI.

For multiple users, separate each by a comma.

Example:

admin,admin,changethispassword1234,viewer,guest

,password123

```text
# argoEventWebhookSourceBearerToken: bearer token used by webhook-ftc      This token can be configured to any value. The
argoEventWebhookSourceBearerToken: "L9Em5WIW8yth6H4uPtzT"                  token will be used for argo-events type of
```

workflows.

```text
webui:                                                                      This is used for exposing important information to
userText: "Staging Cluster for project XYZ"                                an operator of the Cambria Web UI (Eg. API
```

usertoken)

```text
debugging:                                                                  If set to true, this will generate crash dumps
collectCrashDumpManager: false                                             whenever the applications crash (Cambria manager,
collectCrashDumpWorker: false                                              Cambria worker). This will use up more disk space
```

as the dumps are created directly on the respective

node volume. By default, this is disabled and should

only be enabled for debugging purposes.

```text
optionalInstall:                                                            This is used for enabling / disabling the argo-events
enableEventing: true                                                       feature.
```

> [Image omitted from this Markdown build.]

3. Wait at least 5 minutes after installing prerequisites before moving on to this step. In a command line /
terminal window, run the following command:

### Information: Helm Install Warnings

If you see any of the following messages during the helm install / upgrade, ignore those messages:

"Warning: spec.privateKey.rotationPolicy: In cert-manager >= v1.18.0, the default value changed from `Never` to

`Always`."

```text
helm upgrade --install capella-cluster ./config/capella-cluster-0.5.4.tgz --values cambriaClusterConfig.yaml
```

The result of running the command should look something like this:

Release "capella-cluster" does not exist. Installing it now.

NAME: capella-cluster

LAST DEPLOYED: Thu May 3 10:09:47 2023

NAMESPACE: default

STATUS: deployed

REVISION: 1

TEST SUITE: None

4. At this point, several components are being deployed to the Kubernetes environment. Wait a few minutes for
everything to be deployed.

### 5. Get important information about the Cambria Stream Manager deployment:

```text
./bin/getFtcInfo.sh
```

> [Image omitted from this Markdown build.]

# Installation Verification

## 1. Verify Cambria Cluster Deployment

Important: The components below are only a subset of the whole installation. These are the components considered

as key to a proper deployment.

1. Run the following command:
```text
kubectl get all -n capella-manager
```

2. Verify the following information:
```text
Resources            Content
```

```text
Deployments          - 1 cambriaclusterapp deployment with all items active
```

- 1 cambriaclusterwebui deployment with all items active

```text
Pods                 - X pods with cambriaclusterapp in the name (X = # of replicas specified in config file) with
```

all items active / Running

- 1 pod with cambriaclusterwebui in the name

```text
Services             - 1 service named cambriaclusterservice. If exposeStreamServiceExternally is true, this
```

should have an EXTERNAL-IP

- 1 service named cambriaclusterwebuiservice. If exposeStreamServiceExternally is

true, this should have an EXTERNAL-IP

3. If any of the above are not in an expected state, wait a few more minutes in case some resources take longer than
expected to complete. If after a few minutes there are still resources in an unexpected state, contact the Capella

support team.

4. Run the following command for the pgcluster configuration:
```text
kubectl get all -n capella-database
```

5. Verify the following information:
```text
Resources            Content
```

```text
Pods                 - X pods with pgcluster in the name (X = # of replicas specified in config file) with all items
```

active / Running

```text
Services             - 3 services with pgcluster in the name with a CLUSTER-IP assigned
```

> [Image omitted from this Markdown build.]

## 2. Verify Cambria FTC Deployment

Important: The components below are only a subset of the whole installation.These are the components considered

as key to a proper deployment.

1. Run the following command:
```text
kubectl get all -n capella-worker
```

2. Verify the following information:
```text
Resources                Content
```

```text
Pods                     - X pods with cambriaftcapp in the name (X = Max # of FTCs specified in the config
```

file)

Notes:

1. If using Cambria FTC autoscaler, all of these pods should be in a pending state. Every
time the autoscaler deploys a Cambria FTC node, one pod will be assigned to it

2. If not using Cambria fTC autoscaler, Y of the pods should be in an active / running
state and all containers running (Y = # of Cambria FTC nodes active)

```text
Deployments              - 1 cambriaftcapp deployment.
```

3. If any of the above are not in an expected state, wait a few more minutes in case some resources take longer than
expected to complete. If after a few minutes there are still resources in an unexpected state, contact the Capella

support team.

> [Image omitted from this Markdown build.]

## 3. Verify Applications are Accessible

### 3.1. Cambria Cluster WebUI

Skip this step if the WebUI was set to disabled in the Helm values configuration yaml file or the ingress

will be used instead. For any issues, contact the Capella support team

### 1. Get the WebUI address. A web browser is required to access the WebUI:

Option 1: External Url if External Access is Enabled

Run the following command:

```text
kubectl get svc/cambriaclusterwebuiservice -n capella-manager
-o=jsonpath="{'https://'}{.status.loadBalancer.ingress[0].ip}{':8161'}{'\n'}"
```

The response should look something like this:

https://192.122.45.33:8161

Option 2: Non-External Url Access

Run the following command to temporarily expose the WebUI via port-forwarding:

```text
kubectl port-forward -n capella-manager svc/cambriaclusterwebuiservice 8161:8161
--address=0.0.0.0
```

The url depends on the location of the web browser. If the web browser and the port-forward are on the

same machine, use localhost. Otherwise, use the ip address of the machine with the port-forward:

https://`<server>`:8161

2. In a web browser, enter the above url. This should trigger an "Unsafe" page similar to the one below:
> [Image omitted from this Markdown build.]

3. Click on Advanced and Proceed to [ EXTERNAL IP ] (unsafe). This will show the login page.
4. Log in using the credentials created in the Helm values yaml file (See cambriaClusterWebUIUser)
### 3.2. Cambria Cluster REST API

Skip this step if the ingress will be used instead of external access or any other type of access. For any

issues, contact the Capella support team.

### 1. Get the REST API address:

Option 1: External Url if External Access is Enabled

Run the following command:

```text
kubectl get svc/cambriaclusterservice -n capella-manager
-o=jsonpath="{'https://'}{.status.loadBalancer.ingress[0].ip}{':8650'}{'\n'}"
```

The response should look something like this:

https://192.122.45.33:8650

Option 2: Non-External Url Access

Run the following command to temporarily expose the REST API via port-forwarding:

```text
kubectl port-forward -n capella-manager svc/cambriaclusterservice 8650:8650 --address=0.0.0.0
```

The url depends on the location of the port-forward. If the web browser and the port-forward are on the

same machine, use localhost. Otherwise, use the ip address of the machine with the port-forward:

https://`<server>`:8650

2. Run the following API query to check if the REST API is active:
```text
curl -k -X GET https://<server>:8650/CambriaFC/v1/SystemInfo
```

> [Image omitted from this Markdown build.]

### 3.3. Cambria License

Skip this step if the ingress will be used instead of external access or any other type of access. The

Cambria license needs to be active in all entities where the Cambria application is deployed. Run the following steps to

check the cambria license. Access to a web browser is required:

### 1. Get the url for the License Manager WebUI:

Option 1: External Url if External Access is Enabled

Run the following command:

```text
kubectl get svc/cambriaclusterwebuiservice -n capella-manager
-o=jsonpath="{'https://'}{.status.loadBalancer.ingress[0].ip}{':8481'}{'\n'}"
```

The response should look something like this:

https://192.122.45.33:8481

Option 2: Non-External Url Access

Run the following command to temporarily expose the License WebUI via port-forwarding:

```text
kubectl port-forward -n capella-manager svc/cambriaclusterwebuiservice 8481:8481 --address=0.0.0.0
```

The url depends on the location of the port-forward. If the web browser and the port-forward are on the same

machine, use localhost. Otherwise, use the ip address of the machine with the port-forward:

https://`<server>`:8481

2. In a web browser, enter the above url. This should trigger an "Unsafe" page similar to the one below:
> [Image omitted from this Markdown build.]

3. Click on Advanced and Proceed to [ EXTERNAL IP ] (unsafe). This will show the login page.
4. Log in using the credentials created in the Helm values yaml file (See cambriaClusterWebUIUser)
5. Verify that the License Status is valid for at least either the Primary or Backup. Preferably, both Primary and
Backup should be valid. If there are issues with the license, wait a few minutes as sometimes it takes a few minutes

to properly update. If still facing issues, contact the Capella support team.

### 3.4. Cambria Domain-Based Application Access

Skip this step if not planning to test with Cambria's domain-based access. For any issues, contact the

Capella support team.

### 3.4.1. Get the Ingress Route Endpoints

There are two ways to use the ingress route endpoints:

Option 1: Using Default Testing Domain

Only use this option for testing purposes. Skip to option 2 for production. In order to use the

testing domain, the hostname needs to be DNS resolvable on the machines that will need access to the

Cambria applications.

### 1. Get the traefik service external address:

```text
kubectl get svc/traefik -n traefik -o=jsonpath="{.status.loadBalancer.ingress[0].ip}{'\n'}"
```

The response should look similar to the following:

55.99.103.99

3. In your local server(s) or any other server(s) that need to access the ingress, edit the hosts file (in
Linux, usually /etc/hosts) and add the following lines (Example):

```text
55.99.103.99          api.myhost.com
55.99.103.99          webui.myhost.com
55.99.103.99          monitoring.myhost.com
```

Option 2: Using Publicly Registered Domain (Production)

Contact Capella if unable to set up a purchased domain with the ingress. If the domain is set up, the

endpoints needed are the following:

Example with mydomain.com as the domain:

```text
REST API:          https://api.myhost.com
WebUI:             https://webui.myhost.com
```

Grafana Dashboard: https://monitoring.myhost.com

> [Image omitted from this Markdown build.]

### 3.4.2. Test Domain Endpoints

If using the test domain, these steps can only be verified in the machine(s) where the hosts file was

modified. This is because the test domain is not publicly DNS resolvable and so only those whose

hosts file (or DNS) have been configured to resolve the test domain will be able to access the

Capella applications in this way.

1. Test Cambria Cluster WebUI with the ingress that starts with webui. Run steps 2-3 of Cambria Cluster
WebUI. Example:

https://webui.myhost.com

2. Test Cambria REST API with the ingress that starts with api. Run step 2 of Cambrai Cluster REST API.
Example:

https://api.myhost.com/CambriaFC/v1/SystemInfo

3. Test Grafana Dashboard with the ingress that starts with monitoring. Run the verification steps for the
Grafana Dashboard section Verify Grafana Deployment (steps 2-4) in the document in Deploy Performance

Metrics and Logging Tools. Example:

https://monitoring.myhost.com

> [Image omitted from this Markdown build.]

# Testing Cambria FTC / Cluster

The following guide provides information on how to get started testing the Cambria FTC / Cluster software:

https://www.dropbox.com/scl/fi/4c03qwdg7xeb7hvfy24k1/Cambria_Cluster_and_FTC_5_8_0_Kubernetes_User_Guide.pdf?rlkey=jhwtqvbf409lquxg7k2awkq9h&st=377plkip&dl=0

# Upgrading / Updating

There are currently two ways to update / upgrade Cambria FTC / Cluster in the kubernetes environment.

## Updating Kubernetes Cluster to New Version

Since upgrading Kubernetes versions is an irreversible process, Capella highly recommends creating a new

Kubernetes cluster with the desired version.

### Warning: Using a Different Kubernetes Version Than the Document

The Cambria Cluster / FTC Kubernetes documents are each tested on a specific Kubernetes version. For

upgrading, it is recommended to download the latest Cambria Cluster / FTC Kubernetes document and use

the latest Kubernetes version that was tested in that document.

If you would like to use a different kubernetes version than the one tested, be aware that the steps in the

document may not work as intended.

### 1. Download the latest Cambria FTC / Cluster Kubernetes Installation guide

2. Follow the steps in that document
## Updating Cambria FTC / Cluster and Dependencies

### 1. Choose Upgrade Method

### Option 1: Normal Upgrade via Helm Upgrade

This upgrade method is best for when changing version numbers, secrets such as the license key, WebUI

users, etc, and Cambria FTC | Cambria Cluster specific settings such as max number of pods, replicas, etc.

### Warning: Known Issues

- pgClusterPassword cannot currently be updated via this method

- Changing postgres version also cannot be updated via this method

1. Edit the Helm configuration file (yaml) for your Kubernetes environment or create a new configuration file
and edit the new file. See section Deploy Cambria Cluster and FTC Application for more details.

2. Run the following command to apply the upgrade
```text
helm upgrade capella-cluster ./config/capella-cluster-0.5.4.tgz --values cambriaClusterConfig.yaml
```

### 3. Restart the deployments

```text
kubectl rollout restart deployment cambriaclusterapp cambriaclusterwebui -n capella-manager
kubectl rollout restart deployment cambriaftcapp -n capella-worker
```

4. Wait a few minutes for the kubernetes pods to install properly
> [Image omitted from this Markdown build.]

### Option 2: Upgrade via Cambria Cluster Reinstallation

For any upgrade cases for the Cambria Cluster | Cambria FTC environment, this is the most reliable option.

This upgrade option basically uninstalls all of the Cambria FTC and Cluster components and then reinstall with

the new Helm chart and values (.yaml) file. As a result, this will delete the database and delete all of

your jobs in the Cambria Cluster UI.

1. Follow section Deploy Cambria Cluster and FTC Application to download and edit your new
cambriaClusterConfig.yaml file.

2. In a command line / terminal window in your local server, run the following command:
```text
helm uninstall capella-cluster --wait
```

### 3. Deploy the Helm configuration file with the following command

```text
helm upgrade --install capella-cluster ./config/capella-cluster-0.5.4.tgz --values
```

cambriaClusterConfig.yaml

2. Verify Upgrade was Successful
The best way to verify the upgrade is to use the steps in Installation Verification. For any issues, contact the Capella

support team.

> [Image omitted from this Markdown build.]

# Resource Cleanup / Deletion

## Deleting Kubernetes Cluster

Many resources are created in a Kubernetes environment. It is important that each step is followed carefully:

1. Run the following commands to remove the Helm deployments:
```text
helm uninstall capella-cluster -n default --wait
```

### 2. If any volumes are remaining, run the following command:

```text
kubectl get pv -o name | awk -F'/' '{print $2}' | xargs -I{} kubectl patch pv {} -p='{"spec":
```

{"persistentVolumeReclaimPolicy": "Delete"}}'

### 3. Only if traefik ingress was deployed, do the following:

```text
helm uninstall -n traefik traefik --wait && kubectl delete namespace traefik
```

4. Run the following commands to uninstall the monitoring deployment:
`<install_type>`: the loki install type. If the S3 loki version was installed, use 's3_embedcred'. If the Filesystem loki

version was installed, use 'local'

```text
./bin/quickDestroyMonitoring.sh <install_type>
```

5. In the Oracle Cloud dashboard, search for OKE. Look for your kubernetes cluster and click into it for more
details.

6. Delete the cluster and wait for all of the cluster resources to be deleted
7. Still in the Oracle Cloud dashboard, search for Virtual Cloud Networks and delete any VNCs that were created by
the OKE deployment steps. These will have the name of the OKE cluster as part of the VNC name

> [Image omitted from this Markdown build.]

Quick Reference: Helpful Commands/Info for After

# Installation

This section provides helpful commands and other information that may be useful after the installation process

such as how to get the WebUI address, what ports are available to use for incoming sources, etc.

### Get General Cambria FTC Deployment Information

Requires the Cambria FTC Package from Download Cambria FTC Package and all of the prerequisites.

```text
./bin/getFtcInfo.sh
```

### Set Cambria FTC Label on New Nodes

For any node that should be an encoding node:

### 1. Find out which node(s) will be used as Cambria FTC nodes:

```text
kubectl get nodes
```

2. Apply the following label to each of those nodes:
```text
kubectl label node <node-name> capella-worker=true
```

### Set Cambria Cluster Label on New Nodes

For any node that should be a Cambria management node / management backup:

### 1. Find out which node(s) will be used as Cambria Cluster nodes:

```text
kubectl get nodes
```

2. Apply the following label to each of those nodes:
```text
kubectl label node <node-name> capella-manager=true
```

### Get Oracle Cloud Kubernetes Kubeconfig File [ For use with kubectl ]

1. Log in to the Oracle Cloud dashboard and search for OKE. Select your cluster from the list and click into it
for more details

2. Access Cluster and follow the Local Access instruction. Important: you will need to use a Linux machine
that already has an OCI config file. If you do not have a config file, follow the steps in section Create an Oracle

Cloud API Key

### Get Cambria Cluster WebUI URL

1. Run the following command to get the webui address:
```text
kubectl get service/cambriaclusterwebuiservice -n capella-manager
-o=jsonpath="{'https://'}{.status.loadBalancer.ingress[0].ip}{':8161'}"
```

2. To log in to the WebUI, the credentials are located in the Helm values .yaml file that you configure (See
section Deploy Cambria Cluster and FTC Application)

> [Image omitted from this Markdown build.]

### Get Cambria Cluster REST API URL

1. Run the following command to get the base REST API Web Address:
```text
kubectl get service/cambriaclusterservice -n capella-manager
-o=jsonpath="{'https://'}{.status.loadBalancer.ingress[0].ip}{':8650'}"
```

The REST API url should look similar to this:

https://23.45.226.151:8650/CambriaFC/v1/Jobs?usertoken=12345678-1234-43f8-b4fc-53afd3893d5f

### Get Cambria FTC Instance External IP

1. In the Cambria Cluster WebUI, go to the Machines tab and copy the name of the machine (pod)
2. Run the following commands with the name of the machine (aka. `<pod-name>`):
```text
# Replace <pod-name> with your pod name
kubectl get pod/<pod-name> -n capella-worker -o=jsonpath="{.spec.nodeName}"
```

```text
# Replace <node-name> with the result from the above command
kubectl get node/<node-name> -n capella-worker -o=jsonpath="{.status.addresses[1].address}"
```

### Get Leader Cambria Cluster Pod Name

Run the following command to get the name of the Cambria Cluster leader pod:

```text
kubectl get lease -n capella-manager -o=jsonpath="{.items[0].spec.holderIdentity}"
```

### Remote Access a Kubernetes Pod

The general command for remote accessing a pod is:

```text
kubectl exec -it <pod-name> -n <namespace> -- /bin/bash
```

Example with Cambria FTC:

```text
kubectl exec -it cambriaftcapp-5c79586784-wbfvf -n capella-worker -- /bin/bash
```

> [Image omitted from this Markdown build.]

### Extract Cambria Cluster | Cambria FTC | Cambria License Logs

In a machine that has kubectl and the kubeconfig file for your Kubernetes cluster, open a terminal window and

make sure to set the KUBECONFIG environment variable to the path of your kubeconfig file. Then run one or

more of the following commands depending on what types of logs you need (or that Capella needs). You will get

a folder full of logs. Compress these logs into one zip file and send it to Capella:

`<pod-name>`: the name of the pod to grab logs from (Eg. cambriaftcapp-5c79586784-wbfvf)

Cambria FTC:

```text
kubectl cp <pod-name>:/opt/capella/Cambria/Logs ./CambriaFTCLogs -n capella-worker
```

Cambria Cluster:

```text
kubectl cp <pod-name>:/opt/capella/CambriaCluster/Logs ./CambriaClusterLogs -n capella-manager
```

Cambria License Manager (Cambria FTC):

```text
kubectl cp <pod-name>:/opt/capella/CambriaLicenseManager/Logs ./CambriaFTCLicLogs -n capella-worker
```

Cambria License Manager (Cambria Cluster):

```text
kubectl cp <pod-name>:/opt/capella/CambriaLicenseManager/Logs ./CambriaClusterLicLogs -n
```

capella-manager

Copy File(s) to Cambria FTC / Cluster Pod

In some cases, you might need to copy files to a Cambria FTC / Cluster pod. For example, you have an MP4 file

you want to use as a source directly from the encoding machine’s file system. In this case, to copy the file over

to the Cambria FTC / Cluster pod, do the following:

```text
kubectl cp <host-file-path> <pod-name>:<path-inside-container> -n <namespace>
```

Example:

# Copy file to Cambria FTC pod

```text
kubectl cp /mnt/n/MySource.mp4 cambriaftcapp-7c55887db9-t42v7:/var/media/MySource.mp4 -n
```

capella-worker

# Copy file to Cambria Cluster pod

```text
kubectl cp C:\MyKeys\MyKeyFile.key cambriaclusterapp-695dcc848f-vjpc7:/var/keys/MyKeyFile.key -n
```

default

# Copy directory to Cambria FTC container

```text
kubectl cp /mnt/n/MyMediaFiles cambriaftcapp-7c55887db9-t42v7:/var/temp/mediafiles -n capella-worker
```

> [Image omitted from this Markdown build.]

Restart / Re-creating Pods

Kubectl does not currently have a way to restart pods. Instead, a pod will need to be “restarted” by deleting the

pod which causes a new pod to be created / existing pod to take over the containers.

```text
kubectl delete pod <pod-name> -n <namespace>
```

Example:

# Delete Cambria FTC Container

```text
kubectl delete pod cambriaftcapp-7c55887db9-t42v7 -n capella-worker
```

# Delete Cambria Cluster Container

```text
kubectl delete pod cambriaclusterapp-695dcc848f-vjpc7 -n default
```

> [Image omitted from this Markdown build.]

# Glossary

This glossary provides a brief definition / description of some of the more common terms found in this guide.

Kubernetes Terms

For Kubernetes terms, please refer to the Kubernetes Glossary:

https://kubernetes.io/docs/reference/glossary/?fundamental=true

Third-Party Tools

Argo: the Argo third-party system is a collection of tools for orchestrating parallel jobs in a Kubernetes

environment.

Argo-Events: an Argo tool that triggers specific Kubernetes functions based on events from other

dependencies such as webhook, s3, etc.

Cert-Manager: the cert-manager addon automates the process of retrieving and managing TLS certificates.

These certificates are periodically renewed to keep the certificates up to date and valid.

Helm: the Helm third-party tool is used for deploying / managing (install, update, delete) deployments for

Kubernetes Cluster applications.

Traefik: the traefik addon is an ingress server using Traefik as a load balancer to route traffic to ingress and

ingress routes. In this case, traefik is used for applying domain name use to the Kubernetes services (REST API,

WebUI, etc).

Capella Applications

cambriaclusterapp: the Cambria Cluster application container. This container exists in all

cambriaclusterapp-xyz pods.

cambriaftautoscale: this container is used like a load balancer. It spawns new nodes with Cambria FTC

specific content whenever Cambria Cluster has jobs in the queue.

cambriaftcapp: the Cambria FTC application container. This container exists in all cambriaftcapp-xyz pods.

cambriaftcconnect: this container is used for automatically connecting Cambria FTC instances to Cambria

Cluster. This container exists in all cambriaftcapp-xyz pods.

cambrialeaderelector: this container is used for Cambria Cluster replication in that it decides which of the

Cambria Cluster instances is the primary instance. This container exists in all cambriaclusterapp-xyz pods.

pgcluster-capella: this type of pod holds the PostgreSQL database that Cambria Cluster uses / interacts with.

> [Image omitted from this Markdown build.]

> [Image omitted from this Markdown build.]
