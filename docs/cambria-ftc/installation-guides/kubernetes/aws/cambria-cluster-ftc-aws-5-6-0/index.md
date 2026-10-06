---
id: cambria-cluster-ftc-5-8-aws-kubernetes
title: Cambria Cluster / FTC 5.8.0 on AWS Kubernetes
---

# Cambria Cluster / FTC 5.8.0

## AWS Kubernetes Help Documentation


## Document History

| Version | Date | Description |
| --- | --- | --- |
| 5.6.0 | 10/31/2025 | Updated for release 5.6.0.26533 (Linux) |
| 5.8.0 | 07/01/2026 | Updated for release 5.8.0.31580 (Linux) |

* Download the online version of this document for the latest information and latest files. Always
download the latest files

Do not move forward with the installation process if you do not agree with the End User License
Agreement (EULA) for our products. You can download and read the EULA for Cambria FTC, Cambria
Cluster, and Cambria License Manager from the links below:

Cambria Cluster | Cambria FTC | Cambria License Manager
https://www.dropbox.com/s/1wg7ee7a59kzi8h/EULA_Cambria_License_Manager.pdf?dl=0
https://www.dropbox.com/s/oemlax63aatjjiw/EULA_Cluster.pdf?dl=0
https://www.dropbox.com/s/ualv9usxsowh6m2/EULA_FTC.pdf?dl=0

**Important: Limitations and Security Information**

Cambria FTC, Cluster, and License Manager are installed on Linux in containers. Limitations and security information
can be found in the document below:

https://www.dropbox.com/scl/fi/zwojjdyy4kd6ul0s843kx/Cambria_FTC_5_8_0_Limitations_and_Security_Information.pdf?rlkey=ei1tnflrwm8nduiewfd6g6ghu&st=wi4rgxvh&dl=0

**Important: Before You Begin**

PDF documents have a copy/paste issue. For best results, download this document and any referenced PDF
documents in this guide and open them in a PDF viewer such as Adobe Acrobat.

For commands that are in more than one line, copy each line one by one and check that the copied command
matches the one in the document.

The sections below provide instructions on creating a NEW basic Kubernetes cluster with Cambria FTC / Cluster
with default settings and more open security settings. For more granular control and non-default settings, consult
AWS Cloud documentation.

**Information**

This document references Kubernetes version 1.35 only

# ⚠️ Critical Information: Read Before Proceeding

Before starting the installation, carefully review the following considerations. Skipping this section may
result in errors, failed deployments, or misconfigurations.

1. A New Kubernetes Cluster Will Be Deployed

- The installation process creates a brand-new Kubernetes cluster to keep the Cambria ecosystem isolated
  from other applications.

2. Default Installation is Non-Secure

- The guide covers installation with default settings in an open environment (not secure).
- If you require a secure or customized setup, you will need AWS expertise, which is not covered in this
  guide.
- Firewall information is provided in section Firewall Information

3. Understand Your Transcoding Requirements

- Know your expected transcoding volume, input/output specs, and whether a GPU is needed.
- Refer to section AWS Cloud Machine Information and Benchmark for guidelines on machine requirements.

4. Administrative Rights Required

- Many of the steps in this guide require administrative rights to AWS for adding permissions and performing
  other administrative functions of that sort.

5. Check AWS Account Quota

- Ensure the AWS account has sufficient quota to deploy Kubernetes resources.
- See section Resource Usage for estimated resource requirements.

6. A Separate Linux Machine is Required

- A dedicated Linux machine (preferably Ubuntu on an AWS EC2 machine) is needed to deploy Kubernetes.
- The machine needs to be able to assume AWS roles in order to perform aws-cli commands
- Keeping Kubernetes tools and configuration files on a dedicated system is strongly recommended.

7. Verify Region-Specific Resource Availability

- Not all AWS regions support the same resources (e.g., GPU availability varies by region).
- Consult AWS documentation to confirm available resources in your desired region.

# Document Overview

The purpose of this document is to provide a walkthrough of the installation and initial testing process of the Cambria
Cluster and Cambria FTC applications in the Kubernetes environment. The basic view of the document is the following:

1. Overview of the Cambria Cluster / FTC Environment in a Kubernetes Environment
2. Preparation for the installation (Pre-requisites)
3. Installation (EKS Cluster, 3rd-Party Tools, Cambria FTC / Cluster)
4. Verify the Installation
5. Testing Cambria FTC / Cluster
6. Upgrading (Kubernetes Cluster, Cambria FTC / Cluster, Dependencies)
7. Resource Cleanup / Deletion
8. Quick Reference (Kubernetes commands, AWS commands, etc)
9. Glossary
10. Troubleshooting

# Overview of Cambria Cluster / FTC on Kubernetes

## Deployment Information: Cambria Cluster and Cambria FTC

There are two major applications involved in this Kubernetes installation: Cambria Cluster and Cambria FTC.

### Cambria Cluster

Recommended deployment is at least 3 nodes with 3 replicas and an external LoadBalancer service. Each node
runs one Cambria Cluster pod. One pod acts as the leader, while the others serve as replicas that can replace
the leader if needed.

Each Cambria Cluster pod includes:

- Cambria Cluster application
- Leader Elector tool, which selects the active leader pod
- Cambria FTC Autoscaler tool, which automatically deploys FTC worker nodes for encoding when
  autoscaling is enabled, based on the number of queued encoding jobs

> **Cambria FTC autoscaler formula**  
> [Image omitted from this Markdown build.]

Each active Cambria Cluster pod also has a corresponding PostgreSQL database pod. Data is replicated across
the database pods to help preserve Cluster data if a pod or database issue occurs.

### Cambria FTC

Cambria FTC deployments consist of one or more encoding-focused nodes, typically using different instance
types than the Cambria Cluster nodes. Each Cambria FTC pod runs on its own node and is dedicated to encoding
tasks.

Each Cambria FTC pod includes:

- Cambria FTC application
- Auto-Connect FTC tool, which finds the Cambria Cluster pod and connects the FTC pod to it. If no
  Cambria Cluster is found within about 20 minutes, it deletes its node pool or recycles its node.
- Pgcluster database, which stores the encoder’s job data and related runtime information while the pod
  is running

Each Kubernetes node runs either a Cambria Cluster deployment or a Cambria FTC deployment.

## Resource Usage

The resources used and their quantities will vary depending on requirements and different
environments. Below is general information about some of the major resource usage (other resources may be
used. Consult AWS and eksctl documentation for other resources created, usage limits, etc):

AWS and Eksctl Documentation:
https://docs.aws.amazon.com/eks/latest/userguide/eks-deployment-options.html
https://eksctl.io/usage/creating-and-managing-clusters/
https://eksctl.io/usage/vpc-networking/
https://docs.aws.amazon.com/eks/latest/best-practices/subnets.html
https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AvailableIpPerENI.html
https://docs.aws.amazon.com/eks/latest/best-practices/network-security.html

|  |  |
| --- | --- |
| Load Balancers | 0-3 Classic Load Balancers (Manager WebUI, Manager Web Server, Grafana)<br />0-1 Network Load Balancer (Ingress) |
| Nodes | X Cambria Manager Instances (Default is 3)<br />Y Cambria FTC Instances (Depends on max FTC instance configuration; Default is 20) |
| Networking | Default is 1 VPC<br />Default is 3 public subnets and 3 private subnets. 2 of the subnets are reserved<br />Default is /16 CIDR (/19 CIDR per subnet)<br />For more information on choosing a CIDR block for the VPC:<br />https://docs.aws.amazon.com/eks/latest/best-practices/networking.html |
| Security | Default is 1 security group for control plane<br />Default is X security groups (1 per node group) |


## AWS Machine Information and Benchmark

The following is a benchmark of two AWS machines. The information below is as of October 2025. Note that the
benchmark involves read from / write to AWS S3 which influences the real-time speed of transcoding jobs.

**Benchmark Job Information**

|  | Container | Codec | Frame Rate | Resolution |
| --- | --- | --- | --- | --- |
| Source | TS | H.264 | 30 | 1920 x 1080 @ 8 Mbps |
| Output | HLS/TS | H.264 | 29.97 | 1920 x 1080 @ 4Mbps \| 1280 x 720 @ 2.4Mbps<br />640 x 480 @ 0.8Mbps \| 320 x 240 @ 0.3Mbps |

a. c6a.4xlarge [ AMD EPYC 7R13 ]

**Machine Info**

| Name | RAM | CPUs | Storage | Network Performance | Cost per Hour |
| --- | --- | --- | --- | --- | --- |
| c6a.4xlarge | 32 GB | 16 | Any | 12.5 Gbps | $0.612 |

**Benchmark Results**

| # of Concurrent Jobs | Real Time Speed | CPU Usage |
| --- | --- | --- |
| 2 | For Each job: 0.67x RT (slower than real-time)<br />Throughput: 1.34x RT (it takes around 45 seconds to transcode 1 minute of source) | 100% |

b. c6a.16xlarge [ AMD EPYC 7R13 ]

**Machine Info**

| Name | RAM | CPUs | Storage | Network Performance | Cost per Hour |
| --- | --- | --- | --- | --- | --- |
| c6a.16xlarge | 128 GB | 64 | Any | 25 Gbps | $2.448 |

**Benchmark Results**

| # of Concurrent Jobs | Real Time Speed | CPU Usage |
| --- | --- | --- |
| 2 | For Each Job: 1.59x RT (faster than real-time)<br />Throughput: 3.08x RT (it takes around 21 seconds to transcode 1 minute of source) | ~94% |

Benchmark Findings:​
The results show the c6a.16xlarge has higher overall throughput. This is expected as the instance has more
processing power than the c6a.4xlarge. However, if you take into account the cost per hour for each machine,
the more cost efficient option is to go with the c6a.4xlarge.

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

External access in this way can be turned on / off via a configuration variable. See section Deploy Cambria
Cluster and FTC Application. If this feature is disabled, another method of access will need to be configured.

### Option 2: Application Access via Domain Name: Traefik

In cases where the external access via TCP load balancer is not acceptable or for using a purchased domain
name from servicers such as GoDaddy, the Cambria installation provides the option to expose an ingress route.
Similar to the external access load balancers, the Cambria Manager WebUI and web / REST API server are
exposed. However, only one ip address / domain name is needed in this case.

How it works is that the Cambria WebUI is exposed through the subdomain webui, the Cambria web server
through the subdomain api, and Grafana dashboard through the subdomain monitoring. The following is an
example with the domain mydomain.com

Cambria Manager WebUI:

https://webui.mydomain.com

Cambria REST API:

https://api.mydomain.com

Grafana Dashboard:

https://monitoring.mydomain.com

Capella provides a default internal hostname for testing purposes only. In production, the default hostname, ssl
certificate, and other such information needs to be configured. More information about domain configuration is
explained later in this guide.

## Firewall Information

By default, this guide creates a kubernetes cluster with default settings which includes the default
network firewall configurations. In the default configuration, a virtual network is created alongside the
kubernetes cluster. For custom / non-default configurations, or to explore with a more restrictive network based
on the default virtual network created, the following is a list of known ports that the Cambria applications use:

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

Also, for Cambria licensing, any Cambria Cluster and Cambria FTC machine requires that at least the following
domains be exposed in your firewall (both inbound and outbound traffic):

| Domain | Port(s) | Protocol | Traffic | Description |
| --- | --- | --- | --- | --- |
| api.cryptlex.com | 443 | TCP | In/Out | License Server |
| cryptlexapi.capellasystems.net | 8485 | TCP | In/Out | License Cache Server |
| cpfs.capellasystems.net | 8483 | TCP | In/Out | License Backup Server |


## Specifications for Linux Deployment Server

In order to deploy Cambria FTC, a Linux Deployment Server is required because this is where all of the tools,
dependencies, and packages for the Cambria FTC Kubernetes deployment will be installed and/or stored. If you
already have a deployment server, you can skip this section.

**Important: Linux Deployment Server Machine Information**

The instructions in this document require IAM admin rights and IAM role assignment. For this purpose, it
is required to use an AWS EC2 instance (unless you already have a way to assign IAM roles to a machine that
is not an EC2 instance).

Capella tests deployment with the t3.small instance type

Minimum Requirements:

| Operating System (OS) | Ubuntu 24.04 |
| --- | --- |
| CPU(s) | 2 |
| RAM | 2 GB |
| Storage | 10 GB |


# Pre-Requisites

The following steps need to be completed before the deployment process.

## 1. Install Linux Tools

This guide uses curl, unzip, and jq to run certain commands and download the required tools and applications.
Therefore, the Linux server used for deployment will need to have these tools installed.

Example with Ubuntu 24.04:

```bash
sudo apt update && \
sudo DEBIAN_FRONTEND=noninteractive apt -o Dpkg::Options::="--force-confold" -y upgrade && \
sudo DEBIAN_FRONTEND=noninteractive apt -o Dpkg::Options::="--force-confold" -y install curl unzip jq
```

## 2. Download Cambria FTC Package

The components of this installation are packaged in a zip archive. Download it using the following command:

```bash
curl -o CambriaClusterKubernetesAws_5_8_0.zip -L "https://www.dropbox.com/scl/fi/q4n98ob8vlqcvu2reh2cg/CambriaClusterKubernetesAws_5_8_0.zip?rlkey=1qcz48vrd9x9dxnrr71pplmle&st=fveqqbm3&dl=1"
```

```bash
unzip -o CambriaClusterKubernetesAws_5_8_0.zip && chmod +x *.sh ./bin/*.sh
```

Important: the scripts included have been tested with Ubuntu. They may work with other Linux distributions
but not tested

## 3. Install Kubernetes Tools: Kubectl, Helm, Eksctl, AWS-CLI

1. Select one of the following options for installing the kubernetes tools

Option 1: Use Installation Script (Verified on Ubuntu)

```bash
./bin/installKubeTools.sh && ./bin/installKubeToolsAws.sh
```

Option 2: Other Installation Options

1. Kubectl:    https://kubernetes.io/docs/tasks/tools/
2. Helm:       https://helm.sh/docs/intro/install/
3. Eksctl:      https://eksctl.io/installation/
4. AWS CLI:  https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html

2. Verify that the tools are installed correctly. If any of the commands below fail, review the installation
instructions for the failing tool and try again:

```bash
kubectl version --client && helm version && eksctl version && aws --version
```


## 4. Create and Configure AWS Permissions

In order to create resources on AWS for the kubernetes cluster, certain policies and roles need to be created and
configured.

**Important: AWS Admin Rights**

This section requires IAM administrative permission. The steps can be done manually using the AWS
Dashboard. However, the aws-cli will be used in this guide. To follow the exact steps, the Linux Deployment
Server (in this case, an EC2 machine with the admin IAM role) and the aws-cli will be required.

1. Create an IAM admin role (if not already done so)
2. On the AWS EC2 Dashboard, select the Linux Deployment Server created. Go to Actions > Security >
Modify IAM role and select the IAM admin role

Before continuing, the AWS account id must be temporarily set as an environment variable to run the
commands in this section.

```bash
export AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query "Account" --output text)
```

### 4.1. Create Custom Policies

The eksctl tool used for creating the kubernetes cluster requires certain permissions. This section will configure
those permissions that AWS doesn't already manage as policies. For more details on eksctl policies, see
https://eksctl.io/usage/minimum-iam-policies/

1. Run the following command to create the EksAllAccess and IamLimitedAccess as mentioned in the eksctl
documentation

```bash
./bin/createEksctlCustomAwsPolicies.sh
```

If the policies were created successfully, a json description of each policy will be returned.
Otherwise, verify the information is correct and retry. If the policies already exist, delete the old
policies and create the new ones.

### 4.2. Create and Assign Eksctl AWS Role

In order to deploy the kubernetes cluster and run eksctl commands, the user of the Linux deployment machine
needs to be able to assume an AWS role with the minimum permissions per eksctl documentation:

1. Create a new IAM role called eksctl-user with the following policies:

  -​
  AmazonEC2FullAccess
  -​
  AWSCloudFormationFullAccess
  -​
  EksAllAccess
  -​
  IamLimitedAccess

Needs administrative role and instance profile creation permissions

eksctl-user: the name of the role for deploying EKS clusters via eksctl. The name must start with eksctl- in
order for permissions to work

```bash
./bin/createEksctlClusterUserRole.sh eksctl-user
```

2. Assume the new role on the Linux deployment machine. If using an AWS EC2 instance, select the instance
and go to Actions > Security > Modify IAM role. Select the eksctl-user-instance-profile from the list

# Installation

## 1. Create Kubernetes Cluster

The following section provides the basic steps needed to create a Kubernetes Cluster on AWS.

### 1.1. Create AWS EKS Cluster and Cambria Cluster Node Group

1. In a command line / terminal window, run the following command to create the base Kubernetes Cluster
(replace the highlighted values with those of your specific environment):

**Information / Recommendation**

Cambria Cluster manages scheduling and handling Cambria FTC encoding / packaging programs. It is
important to think about how many programs you will be intended to run and choose an instance type
accordingly. The lowest recommended machine type for the manager machines is c7i.xlarge.

It is also recommended to set the node count to 3. This is because 1 of the nodes will act as the Cambria
Cluster node while the other 2 nodes act as backup (web server and database are replicated / duplicated).
In the case that the Cambria Cluster node goes down or stops responding, one of the other two nodes will
take over as the Cambria Cluster node. Depending on the desired workflow(s), think about how many
backup nodes may be needed.

1. Set environment variables for the cluster:

--name=cambria-cluster: the name for the Kubernetes Cluster

--region=us-west-2: the AWS region where the Kubernetes Cluster will reside

--version=1.35: the Kubernetes version. Recently tested version is 1.35

```bash
export CLUSTER_NAME=cambria-cluster REGION=us-west-2 KUBEVERSION=1.35
```

2. Use kubectl to create the EKS cluster:

--nodes=3: the number of nodes for the manager application. The recommended value is 3.

--instance-types=c7i.xlarge: the instance type for the manager application. The recommended type is
c7i.xlarge. Must be a x86-64 machine.

--node-ami-family=Ubuntu2404: what type of OS to install in the worker nodes. It is currently recommended
to use the Ubuntu2404 image. Capella has also tested with AmazonLinux2, but this image does not work with
GPU.

--vpc-cidr=10.0.0.0/16: the ip range for the VPC. This will depend on many factors such as number of
instances, instance types, workflows. Omit this flag for the default VPC CIDR from eksctl. The lowest CIDR
tested by Capella is /19.

```bash
eksctl create cluster \
--name=$CLUSTER_NAME \
--region=$REGION \
--version=$KUBEVERSION \
--kubeconfig=./$CLUSTER_NAME-kubeconfig.yaml \
--node-private-networking \
--nodegroup-name=manager-nodes \
--node-labels="capella-manager=true" \
--with-oidc \
--node-ami-family=Ubuntu2404 --nodes=3 --instance-types=c7i.xlarge --vpc-cidr=10.0.0.0/16
```


3. Set the kubeconfig as an environment variable:

```bash
export KUBECONFIG=$CLUSTER_NAME-kubeconfig.yaml
```

4. Verify that the cluster and manager nodes are accessible:

```bash
kubectl get nodes
```

This should return something similar to the following. If it does not, verify the deployment information,
credentials, permissions, etc:

```text
NAME                                                        STATUS   ROLES    AGE    VERSION
ip-10-0-12-44.us-west-2.compute.internal    Ready    <none>   118m   v1.34.1
ip-10-0-16-207.us-west-2.compute.internal  Ready    <none>   118m   v1.34.1
ip-10-0-22-84.us-west-2.compute.internal    Ready    <none>   118m   v1.34.1
```

### 1.2. Create Cambria FTC Node Group(s)

Skip this step if planning to use Cambria FTC's autoscaler. Run the following command to create the
Node Group for the worker application instances (replace the highlighted values to those of your specific
environment):

**Information / Recommendation**

For this particular case, Cambria FTC nodes need to be added manually. Therefore, think about
what machine / instance type will be needed for running the desired Cambria FTC workflows. Based
on benchmarks (See AWS Machine Information and Benchmark), the recommended machine /
instance type to get started is c6a.4xlarge.

To get started, it is recommended to start with one instance. This way, when the installation is
complete, there will already be one Cambria FTC instance to test with. The number of instances
can always be scaled up and down, up to the maximum FTC instance count that will be configured
in section Deploy Cambria Cluster and FTC Application

--nodes=1: the number of nodes that will be able to run the worker application. The recommended value is 1.

--instance-types=c6.4xlarge: the type of the worker application nodes. The recommended value is c6.4xlarge.
Must be a x86-64 machine.

--node-ami-family=Ubuntu2404: what type of OS to install in the worker nodes. We currently recommend
using the Ubuntu2404 image. Capella has also tested with AmazonLinux2, but this image does not work with
GPU.

```bash
eksctl create nodegroup \
--name=worker-nodes \
--cluster=$CLUSTER_NAME \
--region=$REGION \
--node-private-networking \
--node-labels="capella-worker=true" \
--nodes=1  --instance-types=c6a.4xlarge --node-ami-family=Ubuntu2404
```


(Optional) If you want Cambria Cluster nodes to also be able to run encoding jobs, set this label on the Cambria
Cluster nodegroup:

```bash
export CLUSTER_NAME=<cluster_name> REGION=<region>
eksctl set labels --cluster=$CLUSTER_NAME --region=$REGION --labels="capella-worker=true"
--nodegroup=manager-nodes
```

### 1.3. Set Default Storage Class

Remove the default tag from all storage classes:

```bash
kubectl get storageclass -o name | xargs -n 1 kubectl patch -p
'{"metadata":{"annotations":{"storageclass.kubernetes.io/is-default-class":null}}}'
```

Set the storage class gp2 as the default storage class:

```bash
kubectl patch storageclass gp2 \
-p '{"metadata": {"annotations": {"storageclass.kubernetes.io/is-default-class": "true"}}}'
```

### 1.4. Create EBS CSI Driver

1. Create the IAM Role that will interact with AWS EBS CSI Driver to use volumes in the AWS Kubernetes
environment (replace highlighted values):

--role-name=eksctl-ebs-csi-driver-role: this is the role name that will have permissions for the CSI plugin. The
name should at least start with eksctl-, be unique to the EKS cluster, and be less than or equal to 64 characters

```bash
eksctl create iamserviceaccount \
--name=ebs-csi-controller-sa \
--namespace=kube-system \
--cluster=$CLUSTER_NAME \
--region=$REGION \
--role-only \
--attach-policy-arn=arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy \
--approve \
--role-name=eksctl-ebs-csi-driver-role
```

2. Add the AWS EBS CSI Driver to the Kubernetes Cluster (replace highlighted values):

Important: this step will install a plugin to handle volumes in AWS. This must be installed correctly and the
plugin must have an Active status before continuing. Otherwise, the Cambria product installation will always
fail. If this step fails, consider re-creating the Kubernetes cluster from scratch as the safest option

eksctl-ebs-csi-driver-role: the role name from the command in step 1

```bash
eksctl create addon \
--name aws-ebs-csi-driver \
--cluster=$CLUSTER_NAME \
--region=$REGION \
--force \
--service-account-role-arn=arn:aws:iam::$AWS_ACCOUNT_ID:role/eksctl-ebs-csi-driver-role
```

3. Run the following command to check on the state of the EBS CSI Driver plugin

```bash
eksctl get addon --name=aws-ebs-csi-driver --cluster=$CLUSTER_NAME --region=$REGION
```

DO NOT MOVE ON TO THE NEXT STEP UNTIL THE ABOVE PLUGIN SHOWS ‘ACTIVE’

## 2. Set AWS IAM Permissions for FTC

Certain permissions need to be added in order for functionality such as S3 reading / writing and the FTC
autoscaler to work.

### 2.1. Create FTC Role

Cambria FTC needs special permissions to perform S3 read and write operations. For this, the Cambria FTC
instances will need to assume a specific role with these permissions. Run the following script to create the role:

eksctl-ftc-role: the name of the IAM role for FTC in the kubernetes cluster. This name has to start with eksctl-,
be unique to the EKS cluster, and be less than or equal to 64 characters

./config/ftcS3PermissionSample.json: this is the policy JSON file for the FTC instances. Capella provides this file
as a sample which enables read, write, list for all s3 buckets. See AWS documentation for how to generate a
policy for S3 needs.

```bash
./bin/createRoleForFtcInstances.sh eksctl-ftc-role ./config/ftcS3PermissionSample.json
```

### 2.2. Create FTC Autoscaler Role

Only run this if planning to use Cambria FTC's autoscaler feature. For the FTC autoscaler to work, certain
permissions need to be passed to the autoscaler container. Run the following script to create the role:

eksctl-autoscaler-role: the name of the IAM role for the FTC autoscaler. This name has to start with eksctl-, be
unique to the EKS cluster, and be less than or equal to 64 characters

eksctl-autoscaler-cfg-role: the name of the IAM role for FTC autoscaler's config. This name has to start with
eksctl-, be unique to the EKS cluster, and be less than or equal to 64 characters

```bash
./bin/createRolesForFtcAutoscaler.sh eksctl-autoscaler-role eksctl-autoscaler-cfg-role
```


## 3. [ BETA ] GPU Operator for NVENC

This section is only required for a Kubernetes cluster that will use GPUs. Skip this step if GPUs will
not be used in this Kubernetes cluster.

**Important: BETA Feature**

GPU can be used in Cambria Cluster/FTC. However, this feature is still a work in progress and may not
function as expected.

**Limitation: Cambria FTC Autoscaler**

This feature currently does not work with the FTC autoscaler

In your command prompt / terminal, run the following commands to deploy the GPU Operator to the Kubernetes
cluster:

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

If any pod is still in an Init state or PodCreating state, wait another 5 minutes to see if the pods will complete
their install process.

For any pods that are in an errored state or that are still in an Init state after 10 minutes, do the following:

a. Check that at least one node is one of the supported Akamai Cloud GPU instances

b. Use the following command to check the state of a failing pod (check the Events section):

```bash
kubectl describe pod <your-pod-name> -n gpu-operator
```

Either look up the error for a potential solution or send the entire Events section to the Capella support team for
investigation.

## 4. Deploy Traefik: Application Domain-Name Access

By default, certain parts of the Cambria applications are exposed via an ingress. In order to access these, the
traefik service needs to be created and attached to the ingress.

1. Run the following commands to get the traefik Helm repository:

```bash
helm repo add traefik https://traefik.github.io/charts && helm repo update
```

2. Run the following commands to deploy traefik to the Kubernetes cluster:

```bash
helm upgrade --install traefik traefik/traefik \
--namespace traefik --create-namespace \
--set-string "service.annotations.service\.beta\.kubernetes\.io/aws-load-balancer-type=nlb"
```

3. Wait about a minute for the deployment to complete fully. Verify that the resources are created and in an active /
online state:

- Pods should be in a Running STATUS and all containers in READY should be active
- Services should have a CLUSTER-IP assigned. The traefik service should have an EXTERNAL-IP
- All other resources (Eg. replicasets, deployments, statefulsets, etc) should have all desired resources active

```bash
kubectl get all -n traefik
```

If any resources are still not ready, wait about a minute for them to complete. If still not complete, contact the
Capella support team.

For Production / Using Publicly Registered Domain Name and TLS Certificate.
Example with Namecheap Registered Domain:

In AWS Route 53:

1.​ Go to the Route 53 console and create a Hosted Zone for your domain (mydomain.com)
2.​ After creating it, Route 53 will provide four Name Server (NS) addresses. They will look something
like ns-123.awsdns-01.com. Copy these four addresses.

In Namecheap Account:

1.​ Go to your Namecheap domain's Manage page.
2.​ On the Domain tab, find the Nameservers section. Change the dropdown from Namecheap
BasicDNS to Custom DNS.
3.​ Paste the four Name Server addresses you copied from Route 53 into the fields provided. Click the
green checkmark to save.

Wait for DNS Switchover:

This change can take anywhere from 30 minutes to 48 hours. During this time, control of the domain's DNS is
being transferred to AWS.

Create the Alias Record in Route 53:

1.​ Once the nameservers have updated, get the DNS name of the EKS cluster's ingress:

a.​ Using kubectl, run the following command:

```bash
kubectl get svc/traefik -n traefik
-o=jsonpath="{.status.loadBalancer.ingress[0].hostname}{'\n'}"
```

b.​ You should see the DNS name of the ingress. Example:

af14406933b624f5a825626a491236af-de6fb9599822dfc6.elb.us-west-2.amazonaws.com

2.​ Navigate to the Route 53 service in the AWS Console.
3.​ In the navigation pane, click Hosted zones. Select the hosted zone for the domain you want to use
(e.g., yourdomain.com).
4.​ Click Create record and configure the record as follows:

| Record name | Enter the subdomain monitoring (eg. monitoring for monitoring.mydomain.com) |
| --- | --- |
| Record type | Select A - Routes traffic to an IPv4 address and some AWS resources |
| Alias Toggle | Enable this toggle |
| Route traffic to | Select Alias to Network Load Balancer |
| Region | Select the Network Load Balancer's region |
| Choose load<br />balancer | Select the load balancer that matches the DNS name from step 1 |

5.​ Repeat step 4 for the following subdomains:
-​
api
-​
webui
-​
licenseui
-​
monitoring

If not working or unsure of how to do this, contact Capella support.

## 5. Deploy Third-Party Dependency Kubernetes Tools

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

If any resources are still not ready, wait about a minute for them to complete. If still not working, contact the
Capella support team.

## 6. Deploy Performance Metrics and Logging Tools

This section is required for logging and other performance information about the Cambria
applications.

Follow the steps in the document below to install Prometheus, Grafana, Loki, and Promtail:

https://www.dropbox.com/scl/fi/2hjofr10qcuce9xznhl9x/Prometheus_Grafana_Setup_for_Cambria_Cluster_5_8_0_on_AWS_Kubernetes.pdf?rlkey=4gxlwvn1cfa0sw863jm5z86mw&st=aes5kkgk&dl=0

## 7. Deploy Cambria Cluster and FTC Application

With Helm and Kubectl installed on the Linux deployment server, create the Helm configuration file (yaml) that
will be used to deploy Cambria Cluster / FTC to the Kubernetes environment.

1. In a command line / terminal window, run the following command to create the configuration file:

```bash
helm show values ./config/capella-cluster-0.5.4.tgz > cambriaClusterConfig.yaml
```

2. Open the configuration file in your favorite text / document editor and edit the following values:

Example using nano:

```text
nano cambriaClusterConfig.yaml
```


| Blue: | values in blue will be given to you by Capella. These values in the chart below are for the release version. |
| --- | --- |
| Red: | values in red are proprietary values that need to be changed based on your specific environment |

| cambriaClusterConfig.yaml | Explanation |
| --- | --- |
| # workersUseGPU: allow workers to use nvidia GPU<br />workersUseGPU: false | If working with GPUs / NVENC<br />workflows, set this value to true. Otherwise,<br />leave as false. |
| # nbGPUs: how many GPUs are on the nodes...<br />nbGPUs: 1 | If workersUseGPU is set to true, set this to<br />the number of GPUs that are available on the<br />worker nodes.<br />Note: if using more than 1 GPU, multi-GPU<br />support must be enabled in the Cambria<br />license |
| # enableManagerWebUI: deploy the cambria manager's web UI<br />enableManagerWebUI: true | The Cambria manager has a WebUI available that<br />exposes some management functionality via a<br />GUI interface. For those that do not plan to use<br />the WebUI, this value can be set to false |
| # ftcEnableAutoScaler: if true, auto-scaler pod for FTC will be deployed<br />ftcEnableAutoScaler: true | The Cambria FTC autoscaler spawns Cambria FTC<br />encoders to handle jobs based on the number of<br />jobs in the queue. By default, the autoscaler is<br />enabled. To instead add Cambria FTC nodes<br />manually, set this value to false. |
| #ftcEnableScriptableWorkflow: enable to use scriptable workflow in FTC Jobs<br />ftcEnableScriptableWorkflow: true | By default, the Cambria FTC scriptable workflow<br />system is enabled. This is used for running<br />scriptable workflow scripts in Cambria FTC jobs. |
| # ftcAutoScalerExtraConfig: extra config for autoscaler.<br />ftcAutoScalerExtraConfig:<br />cpCloudVendor=AWS,<br />cpClusterName=cambria-cluster,<br />cpRegion=us-west-2,<br />cpNodeRole=aws:iam::12341234:role/eksctl-autoscaler-cfg-role,<br />cpCapacityType=dedicated | If the Cambria FTC autoscaler is enabled<br />(value is true), these extra settings need to be<br />configured:<br />cpClusterName: set this value to the name of<br />the Kubernetes Cluster you created. By default,<br />this is set to CapellaEKS<br />cpRegion: set this value to the region code<br />where your Kubernetes Cluster resides. By<br />default, this is set to us-west-2.<br />cpNodeRole: this is the AWS role for the ftc<br />autoscaler config. Set this value as the ARN of<br />the FTC autoscaler role. This can be found on the<br />AWS IAM roles section or see section Quick<br />Reference: Helpful Commands/Info for After<br />Installation for an aws-cli command to get this<br />value<br />cpCapacityType: this is the type of AWS EC2<br />machine to spawn for Cambria FTC. By default,<br />this is dedicated. However, this can also be set to<br />'spot' which uses spot instances instead. |
| # ftcInstanceType: instance type for the FTC nodes which will be...<br />ftcInstanceType: "c6a.4xlarge"<br />… | For use with Cambria FTC autoscaler. The<br />instance type for the Cambria FTC encoding<br />machines. This is used by the autoscaler to<br />choose what type of machines to create for<br />encoding. Consult AWS documentation for how to<br />find your instance type. By default, this is set to<br />c6a.4xlarge. |
| # maxFTCInstances: maximum number of FTC instances (ie replicas)...<br />maxFTCInstances: 20 | The max number of FTC machines that can be<br />spawned. |


| # ftcEncodingSlots: how many encoding slots to use for FTC instances<br />ftcEncodingSlots: 2 | For FTC autoscaler, the amount of concurrent<br />encoding jobs that FTC instances should be able<br />to run. If not using the FTC autoscaler, this is<br />used as the default initial number of slots for the<br />deployed FTC instances. |
| --- | --- |
| # pgInstances: number of postgresql database instances (ie replicas)<br />pgInstances: 3<br /># cambriaClusterReplicas: number of Cambria Cluster instances...<br />cambriaClusterReplicas: 3<br />… | The number of instances for Cambria Cluster and<br />postgres database. These two values must match<br />each other and also the amount of nodes created<br />in step 1. In this case, the value will be 3. |
| # run an FTC instance as part of Cambria Cluster. Required for split and stitch.<br />cpUseClusterAsFTC: false | Set this to true if planning to run any<br />management type of jobs (Eg. split and stitch<br />jobs) |
| externalAccess:<br /># exposeClusterServiceExternally: main Cambria Cluster service<br />exposeStreamServiceExternally: true | Set to true to be able to access Cambria Cluster<br />externally |
| # enableIngress: enable traefik as an application ingress<br />enableIngress: true | This allows the use of an application ingress to<br />access the Cambria applications such as the Web<br />UI, API, Grafana, etc. By default, this is set to<br />true. |
| # extra annotations for API ingress route<br />apiExtraIngressAnnotations: {}<br /># extra annotations for webUI ingress route<br />webuiExtraIngressAnnotations: {} | If enableIngress is set to true, ingress routes<br />are created for Cambria's Web UI and API.<br />These specific values allow extra annotations to<br />these ingress routes. By default, no extra<br />annotations are added to the ingress routes. |
| # extra annotations for manager load balancer/service<br />managerExtraServiceAnnotations: {}<br /># extra annotations for webUI load balancer/service<br />webuiExtraServiceAnnotations: {} | If exposeStreamServiceExternally is set to<br />true, load balancers are created to expose<br />Cambria Web UI and API applications externally.<br />These specific values allow extra annotations to<br />these load balancers. By default, not extra<br />annotations are added to the load balancers. |
| # hostName: use for traefik. Replace this with your domain name.<br />hostName: myhost.com<br /># acmeRegistrationEmail: email for Automated Certificate Management<br />acmeRegistrationEmail: test@example.com<br /># acmeServer: server to get TLS certificate from<br />acmeServer: https://acme-staging-v02.api.letsencrypt.org/directory | These fields are for use with the ingress. The<br />default values can be used for testing purposes.<br />For production, these values must be<br />changed to a valid registered domain name,<br />email, and TLS certificate server. |
| # ingressUseSelfSigned: use this for local testing without an actual domain<br />ingressUseSelfSigned: true | For testing purposes, the ingress will use a<br />self-signed certificate for the application servers.<br />For production (and if you have your own valid<br />certificate), set this to false |
| secrets:<br /># pgClusterPassword: password for the postgresql database<br />pgClusterPassword: "xrtVeQ4nN82SSiYHoswqdURZ…" | The password for the postgres database. It is<br />recommended to change the default values to<br />something more secure. |
| # ftcLicenseKey: FTC license key<br />ftcLicenseKey: "2XXXXX-XXXXXX-XXXXXX-XXXXXX-XXXXXX-XXXXXX" | The Cambria Cluster / FTC product license. The<br />Capella team should have provided this value for<br />you. Replace the<br />“XXXXXX-XXXXXX-XXXXXX-XXXXXX-XXXXXX-XXX<br />XXX” with the license key. |


| # cambriaClusterAPIToken: API token for Cambria Cluster...<br />cambriaClusterAPIToken: "12345678-1234-43f8-b4fc-53afd3893d5f" | This is a token that is needed to make API calls<br />to Capella’s Cluster web server. Change this value<br />to something specific to your environment.<br />Allowed Characters:<br />- lowercase and capital letters<br />- numbers<br />- underscores<br />- dashes |
| --- | --- |
| # cambriaClusterWebUIUser: user/password to access Cambria Cluster UI...<br />cambriaClusterWebUIUser: "admin,defaultWebUIUser,RZvSSd3ffsElsCEEe9" | This is the login credentials for Cambria Cluster<br />Web UI. Each user is<br />listed in the form:<br />role,username,password<br />Allowed roles:<br />admin - can view/create/edit/delete anything on<br />the WebUI. Can also create/manage WebUI<br />users.<br />user - can view/create/edit/delete anything on<br />the WebUI.<br />viewer - can only view anything on the WebUI.<br />For multiple users, separate each by a comma.<br />Example:<br />Admin,admin,changethispassword1234,user,gues<br />t,password123 |
| # argoEventWebhookSourceBearerToken: bearer token used by webhook-ftc<br />argoEventWebhookSourceBearerToken: "L9Em5WIW8yth6H4uPtzT" | This token can be configured to any value. The<br />token will be used for argo-events type of<br />workflows. |
| webui:<br />userText: "Staging Cluster for project XYZ" | This is used for exposing important information to<br />an operator of the Cambria Web UI (Eg. API<br />usertoken) |
| aws:<br />role:<br />ftc: arn:aws:iam::12341234:role/eksctl-ftc-role | Role needed for Cambria FTC. Set this values to<br />the FTC IAM role created from Create FTC Role.<br />This can be found on the AWS IAM roles section<br />or see section Quick Reference: Helpful<br />Commands/Info for After Installation for an<br />aws-cli command to get this value |
| autoscaler: arn:aws:iam::12341234:role/eksctl-autoscaler-role | Role needed for Cambria FTC. Set this values to<br />the FTC IAM role created from Create FTC<br />Autoscaler Role. This can be found on the AWS<br />IAM roles section or see section Quick Reference:<br />Helpful Commands/Info for After Installation for<br />an aws-cli command to get this value |
| debugging:<br />collectCrashDumpManager: false<br />collectCrashDumpWorker: false | If set to true, this will generate crash dumps<br />whenever the applications crash (Cambria<br />manager, Cambria worker). This will use up more<br />disk space as the dumps are created directly on<br />the respective node volume. By default, this is<br />disabled and should only be enabled for<br />debugging purposes. |
| optionalInstall:<br />enableEventing: true | This is used for enabling / disabling the<br />argo-events feature. |


3. In a command line / terminal window, run the following command:

```bash
helm upgrade --install capella-cluster ./config/capella-cluster-0.5.4.tgz --values cambriaClusterConfig.yaml
```

The result of running the command should look something like this:

Release "capella-cluster" does not exist. Installing it now.
NAME: capella-cluster
LAST DEPLOYED: Thu May  3 10:09:47 2023
NAMESPACE: default
STATUS: deployed
REVISION: 1
TEST SUITE: None

4. At this point, several components are being deployed to the Kubernetes environment. Wait a few minutes
for everything to be deployed.

5. Get important information about the Cambria Cluster / FTC deployment:

```bash
./bin/getFtcInfo.sh
```

6. At this point, the default VPC has been created for the EKS cluster, as well as the default security groups. See
section Firewall Information for the recommended Capella ports. These will be on top of the AWS recommended
ports. See the following for more information:

https://docs.aws.amazon.com/eks/latest/best-practices/network-security.html

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

3. If any of the above are not in an expected state, wait a few more minutes in case some resources take longer than
expected to complete. If after a few minutes there are still resources in an unexpected state, contact the Capella
support team.

4. Run the following command for the pgcluster configuration:

```bash
kubectl get all -n capella-database
```

5. Verify the following information:

| Resources | Content |
| --- | --- |
| Pods | - X pods with pgcluster in the name (X = # of replicas specified in config file) with all<br />items active / Running |
| Services | - 3 services with pgcluster in the name with a CLUSTER-IP assigned |


## 2. Verify Cambria FTC Deployment

Important: The components below are only a subset of the whole installation.These are the components
considered as key to a proper deployment.

1. Run the following command:

```bash
kubectl get all -n capella-worker
```

2. Verify the following information:

| Resources | Content |
| --- | --- |
| Pods | - X pods with cambriaftcapp in the name (X = Max # of FTCs specified in the<br />config file)<br />Notes:<br />1. If using Cambria FTC autoscaler, all of these pods should be in a pending state.<br />Every time the autoscaler deploys a Cambria FTC node, one pod will be assigned to<br />it<br />2. If not using Cambria fTC autoscaler, Y of the pods should be in an active /<br />running state and all containers running (Y = # of Cambria FTC nodes active) |
| Deployments | - 1 cambriaftcapp deployment. |

3. If any of the above are not in an expected state, wait a few more minutes in case some resources take longer than
expected to complete. If after a few minutes there are still resources in an unexpected state, contact the Capella
support team.

## 3. Verify Applications are Accessible

### 3.1. Cambria Cluster WebUI

Skip this step if the WebUI was set to disabled in the Helm values configuration yaml file or the ingress
will be used instead. For any issues, contact the Capella support team.

1. Get the WebUI address. A web browser is required to access the WebUI:

Option 1: External Url if External Access is Enabled

Run the following command:

```bash
kubectl get svc/cambriaclusterwebuiservice -n capella-manager
-o=jsonpath="{'https://'}{.status.loadBalancer.ingress[0].hostname}{':8161'}{'\n'}"
```

The response should look something like this:

https://192.122.45.33:8161

Option 2: Non-External Url Access

Run the following command to temporarily expose the WebUI via port-forwarding:

```bash
kubectl port-forward -n capella-manager svc/cambriaclusterwebuiservice 8161:8161
--address=0.0.0.0
```

The url depends on the location of the web browser. If the web browser and the port-forward are on the
same machine, use localhost. Otherwise, use the ip address of the machine with the port-forward:

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

Skip this step if the ingress will be used instead of external access or any other type of access. For any
issues, contact the Capella support team.

1. Get the REST API address:

Option 1: External Url if External Access is Enabled

Run the following command:

```bash
kubectl get svc/cambriaclusterservice -n capella-manager
-o=jsonpath="{'https://'}{.status.loadBalancer.ingress[0].hostname}{':8650'}{'\n'}"
```

The response should look something like this:

https://192.122.45.33:8650

Option 2: Non-External Url Access

Run the following command to temporarily expose the REST API via port-forwarding:

```bash
kubectl port-forward -n capella-manager svc/cambriaclusterservice 8650:8650 --address=0.0.0.0
```

The url depends on the location of the port-forward. If the web browser and the port-forward are on the
same machine, use localhost. Otherwise, use the ip address of the machine with the port-forward:

```text
https://<server>:8650
```

2. Run the following API query to check if the REST API is active:

```bash
curl -k -X GET https://<server>:8650/CambriaFC/v1/SystemInfo
```


### 3.3. Cambria License

The Cambria license needs to be active in all entities where the Cambria application is deployed. Run the
following steps to check the cambria license. Access to a web browser is required:

1. Get the url for the License Manager WebUI:

Option 1: External Url if External Access is Enabled

Run the following command:

```bash
kubectl get svc/cambriaclusterwebuiservice -n capella-manager
-o=jsonpath="{'https://'}{.status.loadBalancer.ingress[0].hostname}{':8481'}{'\n'}"
```

The response should look something like this:

https://192.122.45.33:8481

Option 2: Non-External Url Access

Run the following command to temporarily expose the License WebUI via port-forwarding:

```bash
kubectl port-forward -n capella-manager svc/cambriaclusterwebuiservice 8481:8481
--address=0.0.0.0
```

The url depends on the location of the port-forward. If the web browser and the port-forward are on the
same machine, use localhost. Otherwise, use the ip address of the machine with the port-forward:

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

5. Verify that the License Status is valid for at least either the Primary or Backup. Preferably, both Primary and
Backup should be valid. If there are issues with the license, wait a few minutes as sometimes it takes a few minutes
to properly update. If still facing issues, contact the Capella support team.

### 3.4. Cambria Domain-Based Application Access

Skip this step if not planning to test with Cambria's domain-based access. For any issues, contact the
Capella support team.

3.4.1. Get the Ingress Route Endpoints
There are two ways to use the ingress route endpoints:

Option 1: Using Default Testing Domain

Only use this option for testing purposes. Skip to option 2 for production. In order to use the
testing domain, the hostname needs to be DNS resolvable on the machines that will need access to the
Cambria applications.

1. Get the traefik service external address:

```bash
kubectl get svc/traefik -n traefik -o=jsonpath="{.status.loadBalancer.ingress[0].hostname}{'\n'}"
```

The response should look similar to the following:

a1c1d1a23a121.us-west-2.elb.amazonaws.com

2. Since AWS uses hostnames instead of IP addresses for the ingress, the IP address of the hostname
  used needs to be resolved:

```text
ping a1c1d1a23a121.us-west-2.elb.amazonaws.com
```

3. In your local server(s) or any other server(s) that need to access the ingress, edit the hosts file (in
  Linux, usually /etc/hosts) and add the following lines (Example):

  55.99.103.99          api.mydomain.com
  55.99.103.99          webui.mydomain.com
  55.99.103.99          monitoring.mydomain.com

Option 2: Using Publicly Registered Domain (Production)

Contact Capella if unable to set up a purchased domain with the ingress. If the domain is set up,
the endpoints needed are the following:

Example with mydomain.com as the domain:

REST API:                 https://api.mydomain.com
WebUI:                     https://webui.mydomain.com
Grafana Dashboard:   https://monitoring.mydomain.com

3.4.2. Test Domain Endpoints
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
Grafana Dashboard section Verify Grafana Deployment (steps 2-4) in the document in section Deploy
Performance Metrics and Logging Tools. Example:

https://monitoring.myhost.com

# Testing Cambria FTC / Cluster

The following guide provides information on how to get started testing the Cambria FTC / Cluster software:

https://www.dropbox.com/scl/fi/4c03qwdg7xeb7hvfy24k1/Cambria_Cluster_and_FTC_5_8_0_Kubernetes_User_Guide.pdf?rlkey=jhwtqvbf409lquxg7k2awkq9h&st=b7gpftz2&dl=0

# Updating / Upgrading

There are currently two ways to update / upgrade Cambria FTC / Cluster in the kubernetes environment.

## Updating Kubernetes Cluster to New Version

Since upgrading Kubernetes versions is an irreversible process, Capella highly recommends creating a new
Kubernetes cluster with the desired version.

**Warning: Using a Different Kubernetes Version Than the Document**

The Cambria Cluster / FTC Kubernetes documents are each tested on a specific Kubernetes version. For
upgrading, it is recommended to download the latest Cambria Cluster / FTC Kubernetes document and use
the latest Kubernetes version that was tested in that document.

If you would like to use a different kubernetes version than the one tested, be aware that the steps in the
document may not work as intended.

1. Download the latest Cambria FTC / Cluster Kubernetes Installation guide

2. Follow the steps in that document

## Updating Cambria FTC / Cluster and Dependencies

### 1. Choose Upgrade Method

Option 1: Normal Upgrade via Helm Upgrade

This upgrade method is best for when changing version numbers, secrets such as the license key, WebUI
users, etc, and Cambria FTC | Cambria Cluster specific settings such as max number of pods, replicas,
etc.

**Warning: Known Issues**

- pgClusterPassword cannot currently be updated via this method
- Changing postgres version also cannot be updated via this method

1. Edit the Helm configuration file (yaml) for your Kubernetes environment or create a new configuration
  file and edit the new file. See section Deploy Cambria Cluster and FTC Application for more details.

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

Option 2: Upgrade via Cambria Cluster Reinstallation

For any upgrade cases for the Cambria Cluster | Cambria FTC environment, this is the most reliable
option. This upgrade option basically uninstalls all of the Cambria FTC and Cluster components and then
reinstall with the new Helm chart and values (.yaml) file. As a result, this will delete the database
and delete all of your jobs in the Cambria Cluster UI.

1. Follow section Deploy Cambria Cluster and FTC Application to download and edit your new
  cambriaClusterConfig.yaml file.

2. In a command line / terminal window in your local server, run the following command:

```bash
helm uninstall capella-cluster --wait
```

3. Deploy the Helm configuration file with the following command

```bash
helm upgrade --install capella-cluster ./config/capella-cluster-0.5.4.tgz --values cambriaClusterConfig.yaml
```

### 2. Verify Upgrade was Successful

The best way to verify the upgrade is to use the steps in Installation Verification. For any issues, contact the
Capella support team.

# Resource Cleanup / Deletion

## Deleting Kubernetes Cluster

Many resources are created in a Kubernetes environment. It is important that each step is followed
carefully: If using FTC's autoscaler, make sure no leftover Cambria FTC nodes are running.

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

`<install_type>`: the loki install type. If the S3 loki version was installed, use 's3'. If the Filesystem loki version
was installed, use 'local'

```bash
./bin/quickDestroyMonitoring.sh <install_type>
```

5. Set the kubernetes cluster name and region as environment variables (if not already done so):

```bash
export CLUSTER_NAME=cambria-cluster REGION=us-west-2
```

6. Delete the inline policy for the FTC role:

```bash
aws iam delete-role-policy --role-name=eksctl-ftc-role --policy-name=S3AccessPolicy
```

7. If using FTC's autoscaler only. Delete the inline policy for the FTC autoscaler role

```bash
aws iam delete-role-policy --role-name=eksctl-autoscaler-role --policy-name=FTCAutoscalerPolicy
```

8. If using FTC's autoscaler only. Delete FTC autoscaler config role that was created for the cluster (this can
be done manually or via aws-cli). Example with aws-cli:

```bash
./bin/deleteConfigRoleForFtcAutoscaler.sh eksctl-autoscaler-cfg-role
```

9. Delete the cluster:

```bash
eksctl delete cluster --name=$CLUSTER_NAME --region=$REGION --wait
```

Wait several minutes for the Kubernetes Cluster to delete completely.

10. To verify that the cluster was deleted, go to the AWS Console and log in with the IAM user that has the EKS
permissions. Check the following:

a. Search for Elastic Kubernetes Service in the region that the Kubernetes Cluster is located. Make sure the
deleted cluster does not show up on the list

> **AWS EKS cluster deletion verification**  
> [Image omitted from this Markdown build.]

b. Search for CloudFormation in the region that the Kubernetes Cluster is located. Make sure there are no stacks
specific to the Kubernetes Cluster on the list

> **AWS CloudFormation deletion verification**  
> [Image omitted from this Markdown build.]

c. Important: Check in EC2 Volumes and Load Balancers to make sure no volumes or load balancers were
leftover from the kubernetes cluster. Most will have the name of the EKS cluster in the resource name

11. (Optional) If you also want to delete the role created for the EKS setup, do the following:
Requires IAM admin permissions

a.​ Switch the Linux Deployment Server EC2 instance to assume an IAM admin role

b.​ In an SSH session on the Linux Deployment Server, go to the location of the Cambria FTC package
(See section Download Cambria FTC Package for more information)

c.​ Run the following command with the name of the IAM role to delete:

```bash
./bin/deleteIamRole.sh eksctl-user
```


# Quick Reference: Helpful Commands/Info for After Installation

This section provides helpful commands and other information that may be useful after the installation process
such as how to get the WebUI address, what ports are available to use for incoming sources, etc.

## Get General Cambria FTC Deployment Information

Requires the Cambria FTC Package from Download Cambria FTC Package and all of the prerequisites.

```bash
./bin/getFtcInfo.sh
```

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

## Set Cambria Cluster (Manager) Label to All Nodes in Nodegroup

```bash
export CLUSTER_NAME=<cluster_name> REGION=<region> NODE_GROUP=<node_group>
eksctl set labels --cluster=$CLUSTER_NAME --region=$REGION --labels="capella-manager=true"
--nodegroup=$NODE_GROUP
```

## Set Cambria FTC (Encoder) Label to All Nodes in Nodegroup

```bash
export CLUSTER_NAME=<cluster_name> REGION=<region> NODE_GROUP=<node_group>
eksctl set labels --cluster=$CLUSTER_NAME --region=$REGION --labels="capella-worker=true"
--nodegroup=$NODE_GROUP
```

## Get AWS Kubernetes Kubeconfig File [ For use with kubectl ]

Using the aws-cli, run the following command:

```bash
aws eks update-kubeconfig --name=CapellaEKS --region=us-west-2
```


## Get Cambria Cluster WebUI URL

1. Run the following command to get the webui address:

```bash
kubectl get service/cambriaclusterwebuiservice -n capella-manager
-o=jsonpath="{'https://'}{.status.loadBalancer.ingress[0].hostname}{':8161'}"
```

2. To log in to the WebUI, the credentials are located in the Helm values .yaml file that you configure (See
section 4.2. Creating and Editing Helm Configuration File)

## Get Cambria Cluster REST API URL

1. Run the following command to get the base REST API Web Address:

```bash
kubectl get service/cambriaclusterservice -n capella-manager
-o=jsonpath="{'https://'}{.status.loadBalancer.ingress[0].hostname}{':8650'}"
```

The REST API url should look similar to this:

https://a7e4559218cg923a8dfc85d689bd9713-329199856.us-west-2.elb.amazonaws.com:8650/CambriaF
C/v1/Jobs?usertoken=12345678-1234-43f8-b4fc-53afd3893d5f

## Get Leader Cambria Cluster Pod Name

Run the following command to get the name of the Cambria Cluster leader pod:

```bash
kubectl get lease -n capella-manager -o=jsonpath="{.items[0].spec.holderIdentity}"
```

## Get Cambria FTC Instance External IP

1. In the Cambria Cluster WebUI, go to the Machines tab and copy the name of the machine (pod)

2. Run the following commands with the name of the machine (aka. `<pod-name>`):

```bash
kubectl get node/$(kubectl get pod/<pod-name> -n capella-worker -o=jsonpath={.spec.nodeName})
-o=jsonpath="{.status.addresses[1].address}{'\n'}"
```

## Remote Access a Kubernetes Pod

The general command for remote accessing a pod is:

```bash
kubectl exec -it <pod-name> -n <namespace> -- /bin/bash
```

Example with Cambria FTC:

```bash
kubectl exec -it cambriaftcapp-5c79586784-wbfvf -n capella-worker -- /bin/bash
```

## Extract Cambria Cluster | Cambria FTC | Cambria License Logs

In a machine that has kubectl and the kubeconfig file for your Kubernetes cluster, open a terminal window and
make sure to set the KUBECONFIG environment variable to the path of your kubeconfig file. Then run one or
more of the following commands depending on what types of logs you need (or that Capella needs). You will get
a folder full of logs. Compress these logs into one zip file and send it to Capella:

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
kubectl cp <pod-name>:/opt/capella/CambriaLicenseManager/Logs ./CambriaClusterLicLogs -n
capella-manager
```

## Copy File(s) to Cambria FTC / Cluster Pod

In some cases, you might need to copy files to a Cambria FTC / Cluster pod. For example, you have an MP4 file
you want to use as a source directly from the encoding machine’s file system. In this case, to copy the file over
to the Cambria FTC / Cluster pod, do the following:

```bash
kubectl cp <host-file-path> <pod-name>:<path-inside-container> -n <namespace>
```

Example:

```text
# Copy file to Cambria FTC pod
kubectl cp /mnt/n/MySource.mp4 cambriaftcapp-7c55887db9-t42v7:/var/media/MySource.mp4 -n
capella-worker
```

```text
# Copy file to Cambria Cluster pod
kubectl cp C:\MyKeys\MyKeyFile.key cambriaclusterapp-695dcc848f-vjpc7:/var/keys/MyKeyFile.key -n
capella-manager
```

```text
# Copy directory to Cambria FTC container
kubectl cp /mnt/n/MyMediaFiles cambriaftcapp-7c55887db9-t42v7:/var/temp/mediafiles -n capella-worker
```


## Restart / Re-create Pods

Kubectl does not currently have a way to restart pods. Instead, a pod will need to be “restarted” by deleting the pod
which causes a new pod to be created / existing pod to take over the containers.

```bash
kubectl delete pod <pod-name> -n <namespace>
```

Example:

```text
# Delete Cambria FTC Container
kubectl delete pod cambriaftcapp-7c55887db9-t42v7 -n capella-worker
```

```text
# Delete Cambria Cluster Container
kubectl delete pod cambriaclusterapp-695dcc848f-vjpc7 -n capella-manager
```

## Find the ARN of a role

```bash
aws iam get-role --role-name=eksctl-autoscaler-role-$CLUSTER_NAME --query "Role.Arn" --output text
```


# Glossary

This glossary provides a brief definition / description of some of the more common terms found in this guide.

## Kubernetes Terms

For Kubernetes terms, please refer to the Kubernetes Glossary:
https://kubernetes.io/docs/reference/glossary/?fundamental=true

## Third-Party Tools

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

## Capella Applications

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

# Troubleshooting

## No Instances Are Being Deployed With FTC Autoscaler

1. In the Linux deployment machine, run this command to get the logs of the FTC autoscaler:

```bash
kubectl logs -c cambriaftcautoscale -n capella-manager $(kubectl get lease
-o=jsonpath="{.items[0].spec.holderIdentity}")
```

2. Check for any errors. Here are a few that have been found in the past:

[AWS] NodePoolCreate exception: One or more errors occurred. (No cluster found for name: xyz.)

Edit the Helm values (cambriaClusterConfig.yaml) and verify that cpClusterName in
ftcAutoScalerExtraConfig is set to the correct kubernetes cluster name. If not, change the name in the
Helm values file and run the steps in Updating / Upgrading.

[AWS] NodePoolCreate exception: One or more errors occurred. (Cross-account pass role is not allowed.)

This error can happen for many reasons but usually it means the IAM roles were not set up correctly or
they were not configured correctly in the Helm values file. First, check the Helm values file and make
sure all IAM roles specified are correct (See Deploy Cambria Cluster and FTC Application). Otherwise,
destroy the kubernetes cluster and re-create it.

[AWS] NodePoolCreate exception: One or more errors occurred. (User:
arn:aws:sts::12341234:assumed-role/eksctl-XYZ/i-12341234
is not authorized to perform: ABC on resource: arn:aws::xyzabc1234)

Similar to the previous error. Verify that the correct roles were set in the Helm values file. Otherwise,
destroy the kubernetes cluster and re-create it.
