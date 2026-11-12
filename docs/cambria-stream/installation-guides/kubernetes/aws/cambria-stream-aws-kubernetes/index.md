# Cambria Stream / Stream Manager 5.9.0

## AWS Kubernetes Help Documentation

## Document History

| Version | Date | Description |
|---|---|---|
| 5.8.0 | 05/05/2026 | Updated for release version 5.8.0.29952 (Linux) |
| 5.9.0 | 11/05/2026 | Updated for release version 5.9.0.35197 (Linux) |

* Download the online version of this document for the latest information and latest files. Always
download the latest files

Do not move forward with the installation process if you do not agree with the End User License
Agreement (EULA) for our products. You can download and read the EULA for Cambria Stream, Cambria
Stream Manager, and Cambria License Manager from the links below:

Cambria Stream Manager | Cambria Stream | Cambria License Manager
https://www.dropbox.com/s/1wg7ee7a59kzi8h/EULA_Cambria_License_Manager.pdf?dl=0https://www.dropbox.com/s/cdttx4flzb7nxp1/EULA_Cambria_Stream_Manager.pdf?dl=0
https://www.dropbox.com/s/fla62h4o9kuqn7k/EULA_Cambria_Stream.pdf?dl=0

> **Important: Limitations and Security Information**

Cambria Stream, Stream Manager, and License Manager are installed on Linux in containers. Limitations and
security information can be found in the document below:

https://www.dropbox.com/scl/fi/bq6qhry0jg44ljoee78sg/Cambria_Stream_5_9_0_Limitations_and_Security_Information.pdf?rlkey=5dbtikprwve22dl704x7jm5kv&st=eluhc74o&dl=0

> **Important: Before You Begin**

PDF documents have a copy/paste issue. For best results, download this document and any referenced PDF
documents in this guide and open them in a PDF viewer such as Adobe Acrobat.

For commands that are in more than one line, copy each line one by one and check that the copied command
matches the one in the document.

The sections below provide instructions on creating a NEW basic Kubernetes cluster with Cambria Stream with
default settings and more open security settings. For more granular control and non-default settings, consult AWS
Cloud documentation.

### Information

This document references Kubernetes version 1.36 only

## ⚠️ Critical Information: Read Before Proceeding

Before starting the installation, carefully review the following considerations. Skipping this section may
result in errors, failed deployments, or misconfigurations.

1. A New Kubernetes Cluster Will Be Deployed

- ​   The installation process creates a brand-new Kubernetes cluster to keep the Cambria ecosystem isolated
from other applications.

2. Default Installation is Non-Secure

- ​   The guide covers installation with default settings in an open environment (not secure).
- ​   If you require a secure or customized setup, you will need AWS expertise, which is not covered in this
guide.

3. Understand Your Transcoding Requirements

- ​   Know your expected transcoding volume, input/output specs, and whether a GPU is needed.

4. Administrative Rights Required

- ​   Many of the steps in this guide require administrative rights to AWS for adding permissions and performing
other administrative functions of that sort.

5. Check AWS Account Quota

- ​   Ensure the AWS account has sufficient quota to deploy Kubernetes resources.

6. A Separate Linux Machine is Required

- ​   A dedicated Linux machine (preferably Ubuntu on an AWS EC2 machine) is needed to deploy Kubernetes.
- ​   The machine needs to be able to assume AWS roles in order to perform aws-cli commands
- ​   Keeping Kubernetes tools and configuration files on a dedicated system is strongly recommended.

7. Verify Region-Specific Resource Availability

- ​   Not all AWS regions support the same resources (e.g., GPU availability varies by region).
- ​   Consult AWS documentation to confirm available resources in your desired region.

8. Cloud Storage for Logs is Recommended

- ​   It is highly recommended to use the S3 Loki configuration for log storage for production
- ​   This is also recommended for testing but this guide does provide a Filesystem configuration that writes logs to
volumes only
- ​   The filesystem version of Loki will only retain 1 days worth of logs max and it is not as reliable as other
method

9. S3 Loki Configuration Requires At Least 2 Nodes

- ​   For S3 Loki configuration, it is required to at least have 2 nodes running on the kubernetes cluster at any
given time.
- ​   The S3 bucket that the logs are written to will need to have a lifecycle policy configured to manage log
deletion

## Document Overview

1. Overview of Cambria Stream Manager and Cambria Stream on Kubernetes
2. Prerequisites
3. Installation
4. Verification
5. Testing Cambria Stream
6. Updating / Upgrading
7. Cleanup / Delete
8. Resources / Useful Information
9. Glossary

## Overview of Cambria Stream Manager / Stream on Kubernetes

For general information about the Kubernetes deployment and Cambria Stream / Stream Manager, see the following
document. If this is your first time deploying or working with Cambria Stream, it is highly recommended to
review this document.

https://www.dropbox.com/scl/fi/fecmfp2w3jn0u2qei1u5d/Cambria_Stream_5_9_0_AWS_Information.pdf?rlkey=iulcvf4xzm2ao3srce5hiy35g&st=y80gfeih&dl=0

# Prerequisites

## 1. User Information Needed Before Installation

Required Information:

- AWS IAM role with IAM admin permissions (Sample:
https://www.dropbox.com/scl/fi/myhken3c1cf2ccj4wdlm9/aws_iam_admin_permission_sample.json?rlkey=2hd98e5i2jc8zvblhjentrp3i&st=046ui6ls&dl=0)
- Cambria Stream Manager License Key (Eg. 2XXXXX-XXXXXX-XXXXXX-XXXXXX-XXXXXX-XXXXXX)
- Cambria Stream Worker License Key (Eg. 3XXXXX-XXXXXX-XXXXXX-XXXXXX-XXXXXX-XXXXXX)
- Region code where to deploy the Kubernetes Cluster (Eg. us-east-1)

Other Important Information:

- Number of Cambria Stream Manager backup machines needed
- The machine specification for the Cambria Stream Manager nodes
- Number of Cambria Stream Worker machines needed
- The machine specification for the Cambria Stream encoder / packager nodes

## 2. Prepare Linux Deployment Server

In order to deploy Cambria Stream, a Linux Deployment Server is required because this is where all of the tools,
dependencies, and packages for the Cambria Stream Kubernetes deployment will be installed and/or stored.

> **Important: Linux Deployment Server Machine Information**

The instructions in this document require IAM admin rights and IAM role assignment. For this purpose, it is
required to use an AWS EC2 instance (unless you already have a way to assign IAM roles to a machine that is not
an EC2 instance).

Capella tests deployment with the t3.medium instance type

Minimum Requirements:

| Requirement | Value |
|---|---|
| Operating System (OS) | Ubuntu 24.04 |
| CPU(s) | 2 |
| RAM | 4 GB |
| Storage | 10 GB |

1. If you already have a Linux Deployment Server, skip this step. On the AWS Dashboard, create a new Ubuntu AWS
EC2 instance used for the terraform deployment.

2. SSH into the Linux Deployment Server and install general tools:

```text
sudo apt update && \
sudo DEBIAN_FRONTEND=noninteractive apt -o Dpkg::Options::="--force-confold" -y upgrade && \
sudo DEBIAN_FRONTEND=noninteractive apt -o Dpkg::Options::="--force-confold" -y install curl unzip
```

### Important

If during this step, a Configuring openssh-server menu shows up, choose keep the local version currently
installed

3. You will also need to download the argo-rollouts tool for whenever upgrades are needed:

```text
curl -o kubectl-argo-rollouts -sL https://github.com/argoproj/argo-rollouts/releases/download/v1.8.3/kubectl-argo-rollouts-linux-amd64
chmod +x ./kubectl-argo-rollouts
sudo mv ./kubectl-argo-rollouts /usr/local/bin/
```

## 3. Cambria Stream Package

1. Still on the Linux Deployment Server, download the package:

```text
curl -o CambriaStreamKubernetesAws.zip -L
"https://www.dropbox.com/scl/fi/0ykpvux3er0hv0dwykh6o/CambriaStreamKubernetesAws_5_9_0.zip?rlkey=069stj8qw6lxa18xy97ohzs29&st=1m57ltt9&dl=1"
```

2. Unzip the package and make the shell scripts executable:

```text
unzip -o CambriaStreamKubernetesAws.zip && chmod +x ./bin/*.sh
```

3. Install the tools needed for deployment:

```text
./bin/setupTools.sh && ./bin/setupToolsAws.sh && ./bin/installLogcli.sh && ./bin/installTerraformDocs.sh
```

4. Verify the tools are installed:

```text
kubectl version --client && helm version && eksctl version && aws --version && kubectl argo rollouts version
```

&& terraform-docs --version && logcli --version

## 4. Set AWS IAM Role on Linux Development Server

1. In the AWS EC2 Dashboard, find your Linux Development Server from the Instances list

2. While the instance is selected, go to Actions > Security > Modify IAM role

3. From the IAM role dropdown, select the IAM role and Update IAM role

## 5. Create and Configure AWS Permissions

In order to create resources on AWS for the kubernetes cluster, certain policies and roles need to be created and
configured.

> **Important: AWS Admin Rights**

This section requires IAM administrative permission. The steps can be done manually using the AWS
Dashboard. However, the aws-cli will be used in this guide. To follow the exact steps, the Linux Deployment
Server (in this case, an EC2 machine with the admin IAM role) and the aws-cli will be required.

Before continuing, the AWS account id must be temporarily set as an environment variable to run the commands in
this section.

```text
export AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query "Account" --output text)
```

### 5.1. Create Custom Policies

The eksctl tool used for creating the kubernetes cluster requires certain permissions. This section will configure those
permissions that AWS doesn't already manage as policies. For more details on eksctl policies, see
https://eksctl.io/usage/minimum-iam-policies/

1. Run the following command to create the EksAllAccess and IamLimitedAccess as mentioned in the eksctl
documentation (If the policies already exist, you can skip this step.)

```text
./bin/createEksctlCustomAwsPolicies.sh
```

If the policies were created successfully, a json description of each policy will be returned. Otherwise,
verify the information is correct and retry.

### 5.2. Create and Assign Eksctl AWS Role

In order to deploy the kubernetes cluster and run eksctl commands, the user of the Linux deployment machine needs
to be able to assume an AWS role with the minimum permissions per eksctl documentation:

1. Create a new IAM role called eksctl-user with the following policies:

- AmazonEC2FullAccess
- AWSCloudFormationFullAccess
- EksAllAccess
- IamLimitedAccess

Needs administrative role and instance profile creation permissions

```text
./bin/createEksctlClusterUserRole.sh eksctl-user
```

If the user role was created successfully, a json description of the role and instance profile will be
returned. Otherwise, verify the information is correct and retry.

2. Assume the new role:

   a. In the AWS EC2 Dashboard, find your Linux Development Server from the Instances list

   b. While the instance is selected, go to Actions > Security > Modify IAM role

   c. From the IAM role dropdown, select the IAM role and Update IAM role

# Installation

## 1. Create Kubernetes Cluster

The following section provides the basic steps needed to create a Kubernetes Cluster on AWS.

Information: Recommendation For Getting Started

- This example deployment creates an AWS EKS cluster with 1 Cambria Stream Manager node, 2 backup
Cambria Stream Manager nodes, 2 Cambria Stream encoder nodes, and 1 Cambria Stream Router
node

- Not all AWS regions have the same instance type availability. If changing the region, make sure to use
available instance types for the region

- Variables used in this install method are environment variables. Recommendation is to save these values
somewhere safe for future reference. These environment variables do not persist once the command prompt /
terminal session is closed

### 1.1. Create AWS EKS Cluster and Cambria Stream Manager Node Group

1. Set environment variables for the cluster:

--name=cambria-stream: the name for the Kubernetes Cluster

--region=us-west-2: the AWS region where the Kubernetes Cluster will reside

--version=1.36: the Kubernetes version. Recently tested version is 1.36

```text
export CLUSTER_NAME=cambria-stream REGION=us-west-2 KUBEVERSION=1.36
```

2. Use kubectl to create the EKS cluster:

--nodes=3: the number of nodes for the manager application. The recommended value is 3.

--instance-types=c7i.xlarge: the instance type for the manager application. The recommended type is c7i.xlarge.
Must be a x86-64 machine.

--node-ami-family=Ubuntu2404: what type of OS to install in the worker nodes. It is currently recommended to use
the Ubuntu2404 image. Capella has also tested with AmazonLinux2, but this image does not work with GPU.

--vpc-cidr=10.0.0.0/16: the ip range for the VPC. This will depend on many factors such as number of instances,
instance types, workflows. Omit this flag for the default VPC CIDR from eksctl. The lowest CIDR tested by Capella is
/19.

```text
eksctl create cluster \
--name=$CLUSTER_NAME \
--region=$REGION \
--version=$KUBEVERSION \
--kubeconfig=kubeconfig.yaml \
--node-private-networking --nodegroup-name=manager-nodes \
--with-oidc \
--node-ami-family=Ubuntu2404 --nodes=3 --instance-types=c7i.xlarge --vpc-cidr=10.0.0.0/16
```

3. Set the kubeconfig as an environment variable:

```text
export KUBECONFIG=kubeconfig.yaml
```

4. Verify that the cluster and manager nodes are accessible:

```text
kubectl get nodes
```

This should return something similar to the following. If it does not, verify the deployment information, credentials,
permissions, etc:

```text
NAME                                      STATUS ROLES AGE VERSION
ip-10-0-12-44.us-west-2.compute.internal Ready <none> 118m v1.35.1
ip-10-0-16-207.us-west-2.compute.internal Ready <none> 118m v1.35.1
ip-10-0-22-84.us-west-2.compute.internal Ready <none> 118m v1.35.1
```

5. Apply the following label to identify these nodes as Cambria Stream Manager nodes:

```text
eksctl set labels \
--cluster=$CLUSTER_NAME \
--region=$REGION \
--labels="capella-manager=true" \
--nodegroup=manager-nodes
```

6. (Optional) Only If you also want the Cambria Stream Manager nodes to be able to run live encoding / packaging
programs, add the Cambria Stream label to the nodes in the manager node group:

```text
eksctl set labels \
--cluster=$CLUSTER_NAME \
--region=$REGION \
--labels="capella-worker=true" \
--nodegroup=manager-nodes
```

### 1.2. [ BETA ] Create Cambria Stream Router Node Group

1. Run the following command to create the Node Group for the stream router:

--nodes=1: the number of nodes that will be able to run the worker application. The recommended value is 1.

--instance-types=c7i.xlarge: the type of the worker application nodes. The recommended value is c6.4xlarge. Must
be a x86-64 machine.

### Important

Cambria Stream Router is a beta feature. What this does is it routes streaming traffic to Cambria Stream
programs that use it. In this case, external streaming traffic is directed to the Stream Router node.

```text
eksctl create nodegroup \
--name=streamrouter-nodes \
--cluster=$CLUSTER_NAME \
--region=$REGION \
--node-ami-family=Ubuntu2404 \
--nodes=1 \
--instance-types=c7i.xlarge
```

2. Apply the following label to identify this node as a Cambria Stream Router node:

```text
eksctl set labels \
--cluster=$CLUSTER_NAME \
--region=$REGION \
--labels="capella-streamrouter=true" \
--nodegroup=streamrouter-nodes
```

### 1.3. Create Cambria Stream Node Group(s)

1. Run the following command to create the Node Group for the worker application instances (replace the highlighted
values to those of your specific environment):

--nodes=1: the number of nodes that will be able to run the worker application. The recommended value is 1.

--instance-types=c6a.4xlarge: the type of the worker application nodes. The recommended value is c6.4xlarge,
based on the published benchmark. Must be a x86-64 machine.

--node-ami-family=Ubuntu2404: what type of OS to install in the worker nodes. We currently recommend using
the Ubuntu2404 image. Capella has also tested with AmazonLinux2, but this image does not work with GPU.

### Important

By default, this section deploys the Cambria Stream nodes in a public subnet, allowing external sources to send
signals directly to the nodes.

If you are not using streaming protocols (Eg. RTP, SRT, etc) as incoming signal for Cambria Stream, or if the
signals originate from within the same network as the AWS Kubernetes cluster, add the flag
--node-private-network to the command below.

```text
eksctl create nodegroup \
--name=worker-nodes \
--cluster=$CLUSTER_NAME \
--region=$REGION \
--nodes=1 --instance-types=c6a.4xlarge --node-ami-family=Ubuntu2404
```

2. Apply the following label to identify this node as a Cambria Stream (Encoder / Packager) node:

```text
eksctl set labels \
--cluster=$CLUSTER_NAME \
--region=$REGION \
--labels="capella-worker=true" \
--nodegroup=worker-nodes
```

### 1.4. Default Storage Class

Remove the default tag from all storage classes:

```text
kubectl get storageclass -o name | xargs -n 1 kubectl patch -p
```

```text
'{"metadata":{"annotations":{"storageclass.kubernetes.io/is-default-class":null}}}'
```

Set the storage class gp2 as the default storage class:

```text
kubectl patch storageclass gp2 \
-p '{"metadata": {"annotations": {"storageclass.kubernetes.io/is-default-class": "true"}}}'
```

### 1.5. Create EBS CSI Driver

1. Create the IAM Role that will interact with AWS EBS CSI Driver to use volumes in the AWS Kubernetes
environment (replace highlighted values):

```text
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

> **Important: this step will install a plugin to handle volumes in AWS. This must be installed correctly and the**

plugin must have an Active status before continuing. Otherwise, the Cambria product installation will always
fail. If this step fails, consider re-creating the Kubernetes cluster from scratch as the safest option

```text
eksctl create addon \
--name aws-ebs-csi-driver \
--cluster=$CLUSTER_NAME \
--region=$REGION \
--force \
--service-account-role-arn=arn:aws:iam::$AWS_ACCOUNT_ID:role/eksctl-ebs-csi-driver-role
```

3. Run the following command multiple times to check on the state of the EBS CSI Driver plugin

```text
eksctl get addon --name=aws-ebs-csi-driver --cluster=$CLUSTER_NAME --region=$REGION
```

DO NOT MOVE ON TO THE NEXT STEP UNTIL THE ABOVE PLUGIN SHOWS ‘ACTIVE’

## 2. [ BETA ] Deploy GPU Operator for NVENC

This section is only required for a Kubernetes cluster that will use GPUs. Skip this step if GPUs will not be
used in this Kubernetes cluster.

> **Important: BETA Feature**

GPU can be used in Cambria Stream. However, this feature is still a work in progress and may not function as
expected.

In your command prompt / terminal, run the following commands to deploy the GPU Operator to the Kubernetes
cluster:

```text
helm repo add nvidia https://helm.ngc.nvidia.com/nvidia && \
helm repo update && \
helm install nvidia-operator nvidia/gpu-operator \
--create-namespace \
--namespace gpu-operator
```

Wait at least 5 minutes for the GPU operator to install completely

Run this command with 'kubectl' and make sure that all of the pods are in a Running or Completed state:

```text
kubectl get pods -n gpu-operator
```

If any pod is still in an Init state or PodCreating state, wait another 5 minutes to see if the pods will complete their
install process.

For any pods that are in an errored state or that are still in an Init state after 10 minutes, do the following:

   a. Check that at least one node is one of the supported AWS GPU instances

   b. Use the following command to check the state of a failing pod (check the Events section):

```text
kubectl describe pod <your-pod-name> -n gpu-operator
```

Either look up the error for a potential solution or send the entire Events section to the Capella support team for
investigation.

## 3. Deploy Traefik: Application Domain-Name Access

By default, certain parts of the Cambria applications are exposed via an ingress. In order to access these, the
traefik service needs to be created and attached to the ingress.

1. Run the following commands to get the traefik Helm repository:

```text
helm repo add traefik https://traefik.github.io/charts && helm repo update
```

2. Run the following commands to deploy traefik to the Kubernetes cluster:

```text
helm upgrade --install traefik traefik/traefik \
--namespace traefik --create-namespace \
--set-string "service.annotations.service\.beta\.kubernetes\.io/aws-load-balancer-type=nlb"
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

### Create the Alias Record in Route 53:

1.​ Once the nameservers have updated, get the DNS name of the EKS cluster's ingress:

   a.​ Using kubectl, run the following command:

```text
kubectl get svc/traefik -n traefik -o=jsonpath="{.status.loadBalancer.ingress[0].hostname}{'\n'}"
```

   b.​ You should see the DNS name of the ingress. Example:

af14406933b624f5a825626a491236af-de6fb9599822dfc6.elb.us-west-2.amazonaws.com

2.​ Navigate to the Route 53 service in the AWS Console.
3.​ In the navigation pane, click Hosted zones. Select the hosted zone for the domain you want to use
(e.g., yourdomain.com).
4.​ Click Create record and configure the record as follows:

| Setting | Value |
|---|---|
| Record name | Enter the subdomain monitoring (eg. monitoring for monitoring.mydomain.com) |

Record type         Select A - Routes traffic to an IPv4 address and some AWS resources

Alias Toggle        Enable this toggle

Route traffic to    Select Alias to Network Load Balancer

Region              Select the Network Load Balancer's region

Choose load         Select the load balancer that matches the DNS name from step 1
balancer

5.​ Repeat step 4 for the following subdomains:
- api
- webui
- licenseui
- monitoring

If not working or unsure of how to do this, contact Capella support.

## 4. Deploy Third-Party Dependency Kubernetes Tools

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

## 5. Deploy Performance Metrics and Logging Tools

This section is required for logging and other performance information about the Cambria applications.

### 5.1. Performance Metrics: Prometheus & Grafana

1. Deploy Prometheus and Grafana via Helm:

prom-capellaPsw: this is the password to the Grafana dashboard

> **Note: keep the password somewhere safe as it is needed to log in to the Grafana dashboard**

1. Install Prometheus:

```text
./bin/deployPrometheusGrafana.sh prom-capellaPsw
```

2. Set the Grafana Ingress

myhost.com: choose the ingress host. If not using, this can stay as is. Otherwise, change to the hostname that
will be used with the Capella installation.

https://acme-staging-v02.api.letsencrypt.org/directory: the ACME server. Do not change this value unless you
have a real ACME server and are using a real domain

test@yourdomain.com: the email address for the ACME server. Do not change this value unless you have a real
ACME server and real domain

self-signed: whether to use self-signed certificate or use a real certificate. Do not change this value unless you
have a real ACME server, certificate, and domain.

```text
./bin/applyMonitoringIngress.sh myhost.com https://acme-staging-v02.api.letsencrypt.org/directory
```

test@yourdomain.com self-signed

Wait a few minutes for the installation to complete.

3. Verify that all of the kubernetes resources to this point are in an active / running state, all containers up and
running, and all other components ready:

```text
kubectl get all -n monitoring
```

4. If using ingress or have a way to access Grafana internally, you can skip this step. To expose Grafana outside
of the Kubernetes environment, run the following command:

```text
kubectl apply -f ./config/exposeGrafana.yaml
```

Wait a few minutes for the load balancer to be created

### 5.2. Logging: Loki and Alloy

### Option 1: AWS S3

1. Set the following environment variables:

7d: the number of days to keep logs tracked (in number of days)

```text
export LOG_RETENTION_PERIOD=7d
```

2. Create an AWS S3 bucket (if not already done so)

3. Set up a Lifecycle Policy on the AWS S3 bucket. It is recommended that the bucket has a lifecycle
policy to delete objects after X amount of days greater than or equal to the
LOG_RETENTION_PERIOD.

   a.​ Go to the S3 bucket from step 2 on the AWS Dashboard and select the Management tab. In Lifecycle
configuration, start with Create lifecycle rule
   b.​ For Lifecycle rule configuration, set a rule name (Eg. Delete after 8 days), set the rule scope to
Apply to all objects in the bucket and acknowledge the warning.
   c.​ For Lifecycle rule actions, select Expire current versions of objects and Permanently delete
noncurrent versions of objects
   d.​ For Expire current versions of objects, set the Days after object creation to the number of days
(Eg. if log retention is set to 7 days, this value can be set to 7)
   e.​ For Permanently delete noncurrent versions of objects, set the value for Days after objects
become noncurrent to 1
   f.​ Save the Lifecycle rule

4. Set environment variables

LOKI_BUCKET=my-bucket-name: the S3 bucket from the previous step
LOKI_REGION=us-west-2: the region of the S3 bucket
LOKI_ROLE_NAME=capella-loki-storage-$CLUSTER_NAME: the name of the IAM role to use for Loki. It must
start with eksctl-, be unique to the EKS cluster, and be less than or equal to 64 characters. Modify this value
only if instructed
REPLICAS=2: the number of nodes to replicate loki to. This value must be at least 2. For this value, this
amount of nodes must be active on the kubernetes cluster to operate properly. Modify this value only if
instructed

```text
export LOKI_BUCKET=my-bucket-name
export LOKI_REGION=us-west-2
export LOKI_ROLE_NAME=eksctl-capella-loki-storage-$CLUSTER_NAME
export REPLICAS=2
```

5. Create AWS role for Loki and attach the LokiStoragePolicy with the bucket name

```text
./bin/createLokiStorageRole.sh
```

6. Apply service account for Loki:

```text
./bin/applyLokiServiceAccount.sh
```

7. Deploy Loki and Alloy:

```text
./bin/deployLokiAlloyS3.sh
```

Wait a few minutes for alloy / loki to be fully installed in the Kubernetes environment.

### Option 2: Using Filesystem

Only skip this section if already using Loki's S3 configuration. This is for TESTING PURPOSES ONLY.

1. Set environment variables

STORAGE_SIZE=100: this is the size (in GB) of the volume for Loki. This will depend on the load the
kubernetes cluster will be under.

```text
export STORAGE_SIZE=100
```

2. Deploy Loki and Alloy:

```text
./bin/deployLokiAlloyFilesystem.sh
```

Wait a few minutes for alloy / loki to be fully installed in the Kubernetes environment.

## 6. Deploy Cambria Stream and Stream Manager Application

1. Run the following command to create the configuration file:

```text
helm show values ./config/capella-stream-0.5.12.tgz > ./cambriaStreamConfig.yaml
```

2. Open the configuration file in your favorite text / document editor and edit the following values:

Example using nano:

```text
nano cambriaStreamConfig.yaml
```

Below are the required values / values that should be modified. For adjusting other values, see section Cambria
Stream Values.

cambriaStreamConfig.yaml                               Explanation

pgClusterPassword: "xrtVeQ4nN82SSiYHoswqdURZ…"         The password for the postgres database. It is recommended to
change the default value to something more secure.

cpLicenseKey: "XXXXXX-XXX..."                          The Cambria Stream product license. The Capella team should have
provided this value for you which you.

cpLicenseKeyManager: "YYYYYY-YYY..."                   The Cambria Stream Manager product license. The Capella team
should have provided this value for you.

cambriaStreamManagerAPIToken: "12345678-123..."        This is a token that is needed to make API calls to Capella’s Stream
Manager web server. Change this to any string value.

cambriaStreamManagerWebUIUser:                         This is the login credentials for Cambria Stream Manager’s Web UI.
"admin,defaultWebUIUser,RZvSSd3ffsElsCEEe9"            Each user is listed in the form:

role,username,password

Allowed roles:
admin - can do anything on the WebUI, including
creating/managing WebUI users.
superuser - can view/create/edit/delete anything on the WebUI.
user - can only view anything on the WebUI.

For multiple users, separate each by a comma. Example:

Admin,admin,changethispassword1234,user,guest,password123

cambriaABCWebUIUser:                                   This is the login credentials for Cambria Stream Manager’s Ad Break
"admin,defaultABCWebUIUser,RZvSSd3ffsElsCEEe9"         Control. Each user is listed in the form:

role,username,password

Allowed roles:
admin - can do anything on the WebUI, including
creating/managing WebUI users.
superuser - can view/create/edit/delete anything on the WebUI.
user - can only view anything on the WebUI.

For multiple users, separate each by a comma. Example:

Admin,admin,changethispassword1234,user,guest,password123

3. Wait at least 5 minutes after installing prerequisites before moving on to this step. In a command
line / terminal window, run the following command:

```text
helm upgrade --install capella-stream ./config/capella-stream-0.5.12.tgz --values cambriaStreamConfig.yaml
```

The result of running the command should look something like this:

```text
Release "capella-stream" does not exist. Installing it now.
NAME: capella-stream
LAST DEPLOYED: Wed May 30 10:09:47 2023
NAMESPACE: default
STATUS: deployed
REVISION: 1
TEST SUITE: None
```

4. At this point, several components are being deployed to the Kubernetes environment. Wait a few minutes for
everything to be deployed.

## 7. AWS EKS Firewall Management

Most ports are not exposed in the Kubernetes cluster. You will need to open ports in order to do things like stream
from external sources, etc. Therefore, the Kubernetes cluster's main security group will need to be modified to allow
external access to Stream nodes and Stream Router nodes.

1. Go to the AWS Dashboard and to the Elastic Kubernetes Service section. Find the Kubernetes cluster and look
into its details.

2. Go to the Networking section and select the Cluster security group

3. Edit the Inbound Rules with the following:

   a. AWS Required Ports:

https://docs.aws.amazon.com/eks/latest/best-practices/network-security.html

   b. Capella Ports for Cambria Stream Deployment. See the Firewall section in this document:

https://www.dropbox.com/scl/fi/fecmfp2w3jn0u2qei1u5d/Cambria_Stream_5_9_0_AWS_Information.pdf?rlkey=iulcvf4xzm2ao3srce5hiy35g&st=y80gfeih&dl=0

# Verification

The easiest way to verify if the installation works is if you can access the main application components. To get the
different applications available, run the following command in the Linux Deployment Server:

```text
./bin/getStreamInfo.sh
```

What to check?

- Cambria Stream Manager Web UI (Can access and login)
- Cambria Stream REST API (Can make API calls)
- Cambria Stream License Manager Web UI (Can access and login)
- Cambria Stream Ad Break Control (Can access and login)
- Grafana Web UI (Can access and login)

For a more in-depth verification, follow the steps in this document:

https://www.dropbox.com/scl/fi/5dmlsnluh67k94z88ls2u/Cambria_Stream_5_9_0_Deployment_Verification_Guide.pdf?rlkey=xqn4qv4vj03i262xiq4nxqbwq&st=ku497s54&dl=0

# Testing Cambria Stream

Use the following guide to learn about Cambria Stream and get started testing:

https://www.dropbox.com/scl/fi/ne3t3efc490cnresayawl/Cambria_Stream_Manager_and_Cambria_Stream_5_9_0_User_Guide.pdf?rlkey=vvifcxd1rlgkdlcw21nbwjpec&st=opsqx5wg&dl=0

# Updating / Upgrading

> **Warning: In-Place Kubernetes Upgrades**

For major upgrades like Kubernetes or Cambria Stream version upgrades, Capella highly recommends
creating a new Kubernetes cluster with the new version as the current upgrade steps may not consistently
work. In some cases, like Kubernetes version upgrade, the process is irreversible.

If you would still like to proceed with an in-place upgrade, follow the steps below

## Option 1: Upgrade Kubernetes Cluster

This option is only used for upgrading the Kubernetes cluster to a new version. Skip this step if you only need to
upgrade Cambria Stream / Stream Manager.

1. Set the required environment variables, including the kubernetes version to target:

```text
export CLUSTER_NAME=cambria-stream REGION=us-west-2 KUBEVERSION=1.36
```

2. Upgrade Control Plane:

```text
eksctl upgrade cluster --name=$CLUSTER_NAME --region=$REGION --version=$KUBEVERSION --approve
```

3. Upgrade the Add-ons:

```text
eksctl utils update-aws-node --cluster=$CLUSTER_NAME --region=$REGION
```

```text
eksctl utils update-coredns --cluster=$CLUSTER_NAME --region=$REGION
```

```text
eksctl utils update-kube-proxy --cluster=$CLUSTER_NAME --region=$REGION
```

4. Verify the components are running:

```text
kubectl get pods -n kube-system
```

5. Upgrade the Cambria Stream Manager node group:

```text
eksctl upgrade nodegroup --cluster=$CLUSTER_NAME --region=$REGION
```

--kubernetes-version=$KUBEVERSION --name=manager-nodes

6. Upgrade the Cambria Stream node group:

```text
eksctl upgrade nodegroup --cluster=$CLUSTER_NAME --region=$REGION
```

--kubernetes-version=$KUBEVERSION --name=worker-nodes

7. Upgrade the Cambria Stream Router node group:

```text
eksctl upgrade nodegroup --cluster=$CLUSTER_NAME --region=$REGION
```

--kubernetes-version=$KUBEVERSION --name=streamrouter-nodes

8. Run through the steps in Verification to check that the Kubernetes cluster is still working

## Option 2: Upgrade Cambria Stream Manager / Stream and Dependencies

### 1. Important Information Regarding Cambria Stream Upgrade

The current way to update a Kubernetes Cluster is through a third-party tool called argo-rollouts. This process allows
you to manually upgrade pods incrementally. There are four steps involved in the upgrade process:

1.​ Upgrade X% of total Cambria Stream worker pods (workerRolloutStep1Weight value). That means if you
have 5 pods and step 1 is to upgrade 10%, that means 1 pod will be upgraded.

2.​ When the pods are upgraded successfully, argo-rollouts goes into a pause state. While in this state,
argo-rollouts waits for the user to manually move on to the next step. This is so that the user can verify that
the upgraded pods are working properly.

3.​ Upgrade X% of total Cambria Stream worker pods (workerRolloutStep2Weight value). That means if you
have 5 pods and step 3 is to upgrade to 40%, that means 2 pods will be upgraded. However, since 1 pod has
already been upgraded from step 1, that means only 1 pod will be upgraded in this step.

4.​ This is the same as step 2. In this case, argo-rollouts waits for the user to manually verify that the upgraded
pods are working properly. After this step, the rest of the pods in the cluster are upgraded.

Follow these steps to upgrade your Cambria Stream Manager, Cambria Stream, and/or Helm-managed
Kubernetes environment:

Before doing any upgrades, you will need to make sure you are fully aware of your current setup and save all
configurations, programs, keys (such as DRM keys, AWS keys, etc), and previous yaml files (Eg.
cambriaStreamConfig.yaml). There are some things to keep in mind:

1.​ For upgrading to new Cambria Stream / Stream Manager versions, please use our newest Cambria Stream
Kubernetes guide. This should have been provided for you. If you do not have a new version of the document,
contact Capella’s support team: support@capellasystems.net
2.​ Cambria Stream nodes may change. This means that the ip addresses, names, etc may also change. This is
more likely the case when running the non-normal upgrade steps. In the case that the Cambria Stream nodes
do change, you will need to manually re-configure your incoming streams to point to the new Cambria Stream
nodes after the upgrade.
3.​ Cambria Stream Manager WebUI and Cambria Stream Manager REST API urls may also change during the
installation process. This is more likely to be the case if not running the normal upgrade process
4.​ Upgrading is not currently seamless. Programs will need to be taken down during the upgrade process
5.​ In the case that argo-rollouts does not work on upgrading the Cambria Stream environment, the Cambria
Stream application will need to be uninstalled and then re-installed with the new information. In this case, the
database will be wiped and all programs will be deleted. This is why it is important to save all
programs, configuration files, keys, etc.

To save all programs from the Cambria Stream WebUI:

   a.​ Select all of the programs in the Programs list
   b.​ Click on the Export Program button. This should prompt you to download the set of programs to a .lpef file

### 2. Cambria Stream Upgrade Steps

This is the default way to perform an upgrade for anything from updating license keys, Cambria version, etc.

1. Review section Prerequisites to verify that those prerequisites have been met

2. If not already done so, download / paste your cambriaStreamValues.yaml and kubeconfig.yaml file that
was used for the Kubernetes cluster deployment

3. Edit your cambriaStreamValues.yaml file with the values that need to be updated. See Cambria Stream
Variables for more information on the variables that are allowed to be modified.

4. Run the following command to upgrade:

```text
helm upgrade capella-stream ./config/capella-stream-0.5.12.tgz --values cambriaStreamConfig.yaml
```

6. Refresh the Cambria Stream Manager deployments:

```text
kubectl rollout restart deployment -n capella-manager cambriastreammanagerwebui cambriastreammanagerapp
```

7. Run this command in order to activate the argo-rollouts dashboard

```text
kubectl argo rollouts dashboard
```

8. In a web browser, go to the address http://`<linux-server-ip-address>`:3100/rollouts/capella-worker
where `<linux-server-ip-address>` is the Kubernetes Host IP address. You should see a dashboard similar to
the following:

Make sure that the window says cambriastreamapp. If it does not, you will need to change the namespace.
You can change this by going to the dropdown on the top right corner of this page and choosing the
capella-worker namespace.

9. Click on the button next to Weight (the gray button). At this point, argo-rollouts is running step one of the
four steps. When step one is done, you should see something similar to the following:

> [Image omitted from this Markdown build.]

> **Note: if it seems like it is taking a while for the UI to move on to the next step, click on the Promote button to**

get to the next step.

10. If the first set of nodes were upgraded correctly, verify that the upgraded node(s) are working properly.
Once done, click the Promote button to move on to step 3 which will upgrade the next set of nodes.

11. If the second set of nodes were upgraded correctly, verify that the upgraded node(s) are working properly.
Once done, click the Promote All button to finish upgrading the rest of the Cambria Stream nodes.

12. Run through the steps in Verification to check that the Kubernetes cluster is still working

```text
Cleanup / Delete
Many resources are created in a Kubernetes environment. It is important that each step is followed carefully:
1. Run the following commands to remove the Helm deployments:
 helm uninstall capella-stream -n default --wait
2. If any volumes are remaining, run the following command:
 kubectl get pv -o name | awk -F'/' '{print $2}' | xargs -I{} kubectl patch pv {} -p='{"spec":
 {"persistentVolumeReclaimPolicy": "Delete"}}'
3. Only if traefik ingress was deployed, do the following:
 helm uninstall -n traefik traefik --wait && kubectl delete namespace traefik
4. Set the kubernetes cluster name, region, and kubeconfig as environment variables (if not already done so):
 export CLUSTER_NAME=cambria-stream
 export REGION=us-west-2
 export KUBECONFIG=kubeconfig.yaml
5. Delete the monitoring related components created:
s3: set this to s3 if the setup was s3 for Loki logs or local if the setup was filesystem for Loki logs
 ./bin/quickDestroyMonitoring.sh s3
6. Delete the cluster:
 eksctl delete cluster --name=$CLUSTER_NAME --region=$REGION --wait
Wait several minutes for the Kubernetes Cluster to delete completely.
```

```text
7. To verify that the cluster was deleted, go to the AWS Console and log in with the IAM user that has the EKS
permissions. Check the following:
a. Search for Elastic Kubernetes Service in the region that the Kubernetes Cluster is located. Make sure the deleted
cluster does not show up on the list
b. Search for CloudFormation in the region that the Kubernetes Cluster is located. Make sure there are no stacks
specific to the Kubernetes Cluster on the list
c. Important: Check in EC2 Volumes and Load Balancers to make sure no volumes or load balancers were leftover
from the kubernetes cluster. Most will have the name of the EKS cluster in the resource name
8. (Optional) If you also want to delete the role created for the EKS setup, do the following:
Requires IAM admin permissions
    a.​ Switch the Linux Deployment Server EC2 instance to assume an IAM admin role
    b.​ Run the following command with the name of the IAM role to delete:
         ./bin/deleteIamRole.sh eksctl-user
```

```text
Resources / Useful Information
Cambria Stream Values
Required Values
cambriaStreamConfig.yaml                          Explanation
pgClusterPassword: "xrtVeQ4nN82SSiYHoswqdURZ…"    The password for the postgres database. It is recommended to
                                                  change the default value to something more secure.
cpLicenseKey: "XXXXXX-XXX..."                     The Cambria Stream product license. The Capella team should have
                                                  provided this value for you which you.
cpLicenseKeyManager: "YYYYYY-YYY..."              The Cambria Stream Manager product license. The Capella team
                                                  should have provided this value for you.
cambriaStreamManagerAPIToken: "12345678-123..."   This is a token that is needed to make API calls to Capella’s Stream
                                                  Manager web server. Change this to any string value.
cambriaStreamManagerWebUIUser:                    This is the login credentials for Cambria Stream Manager’s Web UI.
"admin,defaultWebUIUser,RZvSSd3ffsElsCEEe9"       Each user is listed in the form:
                                                  role,username,password
                                                  Allowed roles:
                                                  admin - can do anything on the WebUI, including
                                                  creating/managing WebUI users.
                                                  superuser - can view/create/edit/delete anything on the WebUI.
                                                  user - can only view anything on the WebUI.
                                                  For multiple users, separate each by a comma. Example:
                                                  Admin,admin,changethispassword1234,user,guest,password123
cambriaABCWebUIUser:                              This is the login credentials for Cambria Stream Manager’s Ad Break
"admin,defaultABCWebUIUser,RZvSSd3ffsElsCEEe9"    Control. Each user is listed in the form:
                                                  role,username,password
                                                  Allowed roles:
                                                  admin - can do anything on the WebUI, including
                                                  creating/managing WebUI users.
                                                  superuser - can view/create/edit/delete anything on the WebUI.
                                                  user - can only view anything on the WebUI.
                                                  For multiple users, separate each by a comma. Example:
                                                  Admin,admin,changethispassword1234,user,guest,password123
```

```text
Optional Values
cambriaStreamConfig.yaml               Explanation
workersUseGPU: false                   If working with GPUs / NVENC workflows, set this value to true. Otherwise, leave as
                                       false.
nbGPUs: 1                              If workersUseGPU is set to true, set this to the number of GPUs that are available on
                                       the worker nodes.
                                       Note: your Cambria Stream license must include support for multiple GPUs
webrtcPortRangeBegin: 50000            These settings are for WebRTC which affects program previews in Cambria Stream's Ad
webrtcPortRangeEnd: 50009              Break Control UI.
                                       For more than 9 programs, increase the port range.
workerRtpPortRangeBegin: 5004          Port ranges to expose for the Cambria Stream nodes for incoming RTP streams.
workerRtpPortRangeEnd: 5013
                                       Note that the Kubernetes firewall must still open these ports.
workerSrtPortRangeBegin: 8000          Port ranges to expose for the Cambria Stream nodes for incoming SRT streams.
workerSrtPortRangeEnd: 8009
                                       Note that the Kubernetes firewall must still open these ports.
workerRistPortRangeBegin: 9000         Port ranges to expose for the Cambria Stream nodes for incoming RIST streams.
workerRistPortRangeEnd: 9009
                                       Note that the Kubernetes firewall must still open these ports.
workerRtmpPortRangeBegin: 1935         Port ranges to expose for the Cambria Stream nodes for incoming RTMP streams.
workerRtmpPortRangeEnd: 1944
                                       Note that the Kubernetes firewall must still open these ports.
enableManagerWebUI: true               To disable the Cambria application's UI interface, set this value to false. Otherwise,
                                       keep the default value.
maxWorkerInstances: 20                 The max number of Cambria Stream machines that can be spawned. By default, this is
                                       20, but we recommend starting out with 2 for testing.
workerRolloutStep1Weight: 10           For upgrades, Capella uses argo-rollouts to incrementally upgrade nodes. The first
workerRolloutStep2Weight: 40           value is the percentage of all the nodes that should be upgraded first. The second
                                       value is the percentage of all the nodes that should be upgraded second. See the
                                       Upgrading Kubernetes Cluster section for more information.
workerRolloutMaxUnavailable: 1         For upgrades, argo-rollouts will use this value to determine how many Cambria Stream
                                       worker pods can be offline at a time. It is recommended to set this value to a number
                                       higher than maxWorkerInstances.
defaultMachineMaximumInstances: -1     This option allows users to configure the maximum number of channels a Cambria
                                       Stream node / machine can run (up to the amount in the Cambria license).
externalAccess:                        Set to true if you want to be able to access Cambria Stream Manager externally.
 exposeStreamServiceExternally: true   Otherwise, set to false
 enableIngress: true                   This allows the use of an application ingress to access the Cambria applications such as
                                       the Web UI, API, Grafana, etc. By default, this is set to true.
 apiExtraIngressAnnotations: {}        If enableIngress is set to true, ingress routes are created for Cambria's Web UI and
 webuiExtraIngressAnnotations: {}      API.
                                       These specific values allow extra annotations to these ingress routes. By default, no
                                       extra annotations are added to the ingress routes.
```

```text
cambriaStreamConfig.yaml                          Explanation
  managerExtraServiceAnnotations: {}              If exposeStreamServiceExternally is set to true, load balancers are created to
  webuiExtraServiceAnnotations: {}                expose Cambria Web UI and API applications externally.
                                                  These specific values allow extra annotations to these load balancers. By default,
                                                  no extra annotations are added to the load balancers.
 hostName: myhost.com                             These fields are for use with the ingress. The default values can be used for
 acmeRegistrationEmail: test@example.com          testing purposes. For production, these values must be changed to a valid
 acmeServer:                                      registered domain name, email, and TLS certificate server.
https://acme-staging-v02.api.letsencrypt.org/di
rectory
  ingressUseSelfSigned: true                      For testing purposes, the ingress will use a self-signed certificate for the
                                                  application servers. For production (and if you have your own valid certificate), set
                                                  this to false
streamRouter:                                     Port ranges to expose for the Cambria Stream router.
  rtpPortBegin: 15004
  rtpPortCount: 21                                Note that the Kubernetes firewall must still open these ports.
  srtPortBegin: 18000
  srtPortCount: 10
  ristPortBegin: 19000
  ristPortCount: 10
webui:                                            This is used for exposing important information to an operator of the Cambria
 userText: "Staging Cluster for project XYZ"      Web UI (Eg. API usertoken)
Enable Firewall Ports for Incoming Streams
In order to stream to the Cambria Stream machines, the AWS firewall needs to have ports open to allow those
incoming streams to reach the Cambria Stream instances. You will first need to identify which machines to open ports
for.
1. Log in to the AWS Console with the IAM User that has the EKS credentials and go to the Elastic Kubernetes
Service application. Click on your Kubernetes Cluster
2. In the Cambria Stream Manager Web UI, go to the machine tab and select one of the machines (Pods) that will be
used for Cambria Stream. Get the name of the machine (Pod) that you want to use for Cambria Stream.
3. Back in the AWS Kubernetes dashboard, go to Resources > Workloads > Pods. Set the Namespace to
capella-worker. Look for the Cambria Stream pod name in this list.
```

```text
4. Click on the Pod that has the same name as the machine. Click on the Node and then click on the Instance
Save the port configuration when finished. Verify that the ports are open correctly and are visible in the Incoming
Rules section.
In most cases, all of the Cambria Stream pods will share the same security group. However, if any Cambria Stream
has a different security group, repeat steps 3-5 for every other machine (Pod) that will be using Cambria Stream in a
different security group.
Cambria Stream Manager WebUI
1. Run this command to get the webui address:
 kubectl get service/cambriastreammanagerwebuiservice -n capella-manager
 -o=jsonpath="{'https://'}{.status.loadBalancer.ingress[0].hostname}{':8171'}"
2. To log in to the WebUI, the credentials are located in the values file
```

## Cambria Stream Manager REST API

1. Run the following command to get the base REST API Web Address:

```text
kubectl get service/cambriastreamservice -n capella-manager
-o=jsonpath="{'https://'}{.status.loadBalancer.ingress[0].hostname}{':8758'}"
```

The REST API url should look similar to this:

https://a7e4559218cg923a8dfc85d689bd9713-329199856.us-west-1.elb.amazonaws.com:8758/CambriaLM/v1/Events?usertoken=12345678-1234-43f8-b4fc-53afd3893d5f

## Cambria Stream Instance External IP

1. In the Cambria Stream Manager WebUI, go to the Machines tab and copy the name of the machine (pod)

2. Run the following commands with the name of the machine (aka. `<pod-name>`):

```text
# Replace <pod-name> with your pod name
kubectl get pod/<pod-name> -n capella-worker -o=jsonpath={.spec.nodeName}
```

```text
# Replace <node-name> with the result from the above command
kubectl get node/<node-name> -o=jsonpath={.status.addresses[1].address}
```

## Leader Cambria Stream Manager Pod

Run the following command to get the name of the Cambria Stream Manager leader pod:

```text
kubectl get lease -n capella-manager -o=jsonpath="{.items[0].spec.holderIdentity}"
```

## Remote Access to Kubernetes Pod

The general command for remote accessing a pod is:

```text
kubectl exec -it <pod name> -n <namespace> -- /bin/bash
```

Example with Cambria Stream:

```text
kubectl exec -it cambriastreamapp-5c79586784-wbfvf -n capella-worker -- /bin/bash
```

## Extracting Cambria Stream Manager | Cambria Stream | Cambria License Logs

In a machine that has kubectl and the kubeconfig file for your Kubernetes cluster, open a terminal window and make
sure to set the KUBECONFIG environment variable to the path of your kubeconfig file. Then run one or more of the
following commands depending on what types of logs you need (or that Capella needs). You will get a folder full of
logs. Compress these logs into one zip file and send it to Capella:

`<pod-name>`: the name of the pod to grab logs from (Eg. cambriastreamapp-5c79586784-wbfvf)

Cambria Stream:

```text
kubectl cp <pod name>:/opt/capella/CambriaStream/Logs ./CambriaStrmLogs -n capella-worker
```

Cambria Stream Manager:

```text
kubectl cp <pod-name>:/opt/capella/CambriaStreamManager/Logs ./CambriaStrmManLogs -n capella-manager
```

Cambria License Manager (Cambria Stream):

```text
kubectl cp <pod-name>:/opt/capella/CambriaLicenseManager/Logs ./CambriaStrLicLogs -n capella-worker
```

Cambria License Manager (Cambria Stream Manager):

```text
kubectl cp <pod-name>:/opt/capella/CambriaLicenseManager/Logs ./CambriaStrmManLicLogs -n capella-manager
```

## Copy File(s) to Cambria Stream Pod

In some cases, you might need to copy files to a Cambria Stream pod. For example, you have an MP4 file you want
to use as a failover source for your stream. In this case, to copy the file over to the Cambria Stream pod, do the
following:

```text
kubectl cp <host-file-path> [ Pod name ]:[ Path Inside Pod to Copy File ] -n capella-worker
```

Example:

```text
# Copy file to Cambria Stream pod
kubectl cp /mnt/n/MyFailoverSource.mp4 cambriastreamapp-7c55887db9-t42v7:/var/media/MyFailoverSource.mp4 -n capella-worker
```

```text
# Copy file to Cambria Stream Manager pod
kubectl cp C:\MyKeys\MyKeyFile.key cambriastreammanagerapp-695dcc848f-vjpc7:/var/keys/MyKeyFile.key -n capella-manager
```

```text
# Copy directory to Cambria Stream container
kubectl cp /mnt/n/MyMediaFiles cambriastreamapp-7c55887db9-t42v7:/var/temp/mediafiles -n capella-worker
```

## Restarting / Re-creating Pods

Kubectl does not currently have a way to restart pods. Instead, a pod will need to be “restarted” by deleting the pod
which causes a new pod to be created / existing pod to take over the containers.

```text
kubectl delete pod <pod-name> -n <namespace>
```

Example:

```text
# Delete Cambria Stream Container
kubectl delete pod cambriastreamapp-7c55887db9-t42v7 -n capella-worker
```

```text
# Delete Cambria Stream Manager Container
kubectl delete pod cambriastreammanagerapp-695dcc848f-vjpc7 -n capella-manager
```

# Glossary

This glossary provides a brief definition / description of some of the more common terms found in this guide.

## Kubernetes

For Kubernetes terms, please refer to the Kubernetes Glossary:
https://kubernetes.io/docs/reference/glossary/?fundamental=true

## AWS

CloudFormation: this AWS service is used to facilitate dependent multi-service deployment in the form of
stacks. The eksctl tool creates a CloudFormation stack to manage Kubernetes Cluster components.

Elastic Kubernetes Service (EKS): this AWS service allows users to create, delete, update, and manage
Kubernetes clusters.

IAM: this AWS service is for creating, deleting, updating, and managing credentialing and permissions for other
AWS services. In this case, IAM is used to get permissions to perform functions to the different services that
interact with EKS Clusters.

## Third-Party Tools

Argo: the Argo third-party system is a collection of tools for orchestrating parallel jobs in a Kubernetes
environment.

Argo-Rollouts: an Argo tool used for upgrading containers in a Kubernetes Cluster in a rollout fashion (Eg.
upgrade 50% of the containers first, then 80% of the containers, then 100% of the containers).

Argo-Events: an Argo tool that triggers specific Kubernetes functions based on events from other
dependencies such as webhook, s3, etc.

AWSCLIv2: the awscli tool is a command line tool to interact with AWS services like S3, EC2, etc. This is used
by the eksctl tool to interact with AWS EKS, IAM, etc.

Cert-Manager: the cert-manager addon automates the process of retrieving and managing TLS certificates.
These certificates are periodically renewed to keep the certificates up to date and valid.

Eksctl: the eksctl command line tool is used for creating, deleting, and updating AWS Kubernetes Clusters
(AWS EKS Service).

Helm: the Helm third-party tool is used for deploying / managing (install, update, delete) deployments for
Kubernetes Cluster applications.

Traefik: the traefik addon is an ingress server using Traefik as a load balancer to route traffic to ingress and ingress
routes. In this case, traefik is used for applying domain name use to the Kubernetes services (REST API, WebUI, etc).

## Capella Applications

cambrialeaderelector: this container is used for Cambria Stream Manager replication in that it decides which
of the Cambria Stream Manager instances is the primary instance. This container exists in all
cambriastreammanagerapp-xyz pods.

cambriastreamapp: the Cambria Stream application container. This container exists in all
cambriastreamapp-xyz pods.

cambriastreammanagerapp: the Cambria Stream Manager application container. This container exists in all
cambriastreammanagerapp-xyz pods.

pgcluster-capella: this type of pod holds the PostgreSQL database that Cambria Stream Manager uses /
interacts with.

cambriaworkerconnect: this container is used for automatically connecting Cambria Stream instances to
Cambria Stream Manager. This container exists in all cambriastreamapp-xyz pods.
