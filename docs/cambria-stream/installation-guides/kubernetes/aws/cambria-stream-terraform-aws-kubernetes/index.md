# Cambria Stream / Stream Manager 5.9.0

## AWS Kubernetes Help Documentation

## Terraform Installation

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

- AWS IAM role with specific IAM admin permissions (Sample:
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

# Installation

## Option 1: Quick Installation

For users that just want to quickly install Cambria Stream on AWS EKS for testing and are ok with the default values,
follow the steps in this section.

> **Important: Information About this Quick Installation**

- This install method will create an AWS EKS cluster with 1 Cambria Stream Manager node, 2 backup Cambria
Stream Manager nodes, 2 Cambria Stream encoder nodes, and 1 Cambria Stream Router node

- Not all AWS regions have the same instance type availability. If changing the eks_region, make sure to use
available instance types for the region

- Variables used in this install method are environment variables. Recommendation is to save these values
somewhere safe for future reference. These environment variables do not persist once the command prompt /
terminal session is closed

- For more information on the variables used in this section and other allowed variables, see the tables in Cambria
Stream Variables

1. Set the following environment variables (the values can be changed to your preference):
For security reasons, it is recommended to change all sensitive values.

```text
export TF_VAR_pg_cluster_password=xrtVeQ4nfdd2YHoswqdURZvQDaL4KpNElsCEEe9bwdxMd73KckIeXzS5cU6LiC2
export TF_VAR_cambria_stream_api_token=12345678-1234-43f8-b4fc-53afd3893d5f
export TF_VAR_cambria_stream_web_ui_user=admin,webUIUser,userpassword
export TF_VAR_cambria_abc_web_ui_user=admin,defaultABCWebUIUser,userpassword
export TF_VAR_grafana_admin_password=prom-capellaPsw
export TF_VAR_eks_cluster_name=cambria-stream
export TF_VAR_eks_region=us-east-1
export TF_VAR_manager_instance_type=c7i.xlarge
export TF_VAR_worker_instance_type=c6a.2xlarge
export TF_VAR_streamrouter_instance_type=c7i.xlarge
```

2. Set your Cambria Stream Licenses:

```text
export TF_VAR_license_key_manager=<your-cambria-stream-manager-license-key>
export TF_VAR_license_key_worker=<your-cambria-stream-license-key>
```

3. Set the location for the kubeconfig file:

```text
export KUBECONFIG=kubeconfig.yaml
```

4. Save the deployment variables to tfvars file:

```text
./bin/createValuesTfvars.sh
```

5. Deploy

```text
terraform init && terraform apply -auto-approve -var-file=values.tfvars
```

6. Save the following files somewhere safe as they are needed to perform operations against the Kubernetes cluster
such as updating, deleting, getting information, etc:

- kubeconfig.yaml
- terraform.tfstate
- values.tfvars

## Option 2: Full Installation

For users that require a more personalized installation than the quick install method can provide, follow the steps in
this section.

1. Generate a config file to specify all of the values for the Kubernetes cluster environment:

```text
terraform-docs tfvars hcl . --description --sort=false --output-file=values.tfvars --output-mode=replace --output-template="{{ .Content }}"
```

2. In a text editor (Eg. nano), edit the config file with the values for your specific environment:

```text
nano values.tfvars
```

This file will have descriptions for each variable. For more information on the variables, see section Cambria Stream
Variables

3. If using nano, save your changes with CTRL/CMD + X, type the letter 'y', and Enter / Return

4. Set the location for the kubeconfig file:

```text
export KUBECONFIG=kubeconfig.yaml
```

5. Deploy

```text
terraform init && terraform apply -auto-approve -var-file=values.tfvars
```

6. Save the following files somewhere safe as they are needed to perform operations against the Kubernetes cluster
such as updating, deleting, getting information, etc:

- kubeconfig.yaml
- terraform.tfstate
- values.tfvars

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

1. Review section Prerequisites to verify that those prerequisites have been met

2. Download / Paste your values.tfvars and terraform.tfstate files that were used for the Kubernetes cluster
deployment into the Linux deployment server

3. Edit the values.tfvars file and change the kubernetes_version variable to the desired version

4. Set the KUBECONFIG environment variable:

```text
export KUBECONFIG=kubeconfig.yaml
```

5. Run the terraform deployment update:

```text
terraform apply -auto-approve -var-file=values.tfvars
```

6. Run through the steps in Verification to check that the Kubernetes cluster is still working

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

2. Download / Paste your values.tfvars and terraform.tfstate files that were used for the Kubernetes cluster
deployment into the Linux deployment server

3. Edit the values.tfvars file with the values that you need to change. See the Cambria Stream Variables
section for more information on variables that are allowed to be updated

4. Set the KUBECONFIG environment variable:

```text
export KUBECONFIG=kubeconfig.yaml
```

5. Run the terraform deployment update:

```text
terraform apply -auto-approve -var-file=values.tfvars
```

6. Update Cambria Stream Manager deployments:

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

# Cleanup / Delete

Many resources are created in a Kubernetes environment. It is important that each step is followed
carefully

1. In the Linux Deployment Server, if not already done so, download / Paste your values.tfvars and
terraform.tfstate files that were used for the Kubernetes cluster deployment into the Linux deployment server

2. Set the kubeconfig environment variable:

```text
export KUBECONFIG=kubeconfig.yaml
```

3. Run the following command to destroy the kubernetes cluster:

```text
terraform apply -destroy -auto-approve -var-file=values.tfvars
```

# Resources / Useful Information

## Cambria Stream Variables

```text
values.tfvars                          Explanation
eks_cluster_name                       The name of the kubernetes cluster
                                       Default: cambria-stream
eks_region                             The region code where the kubernetes cluster should be deployed
                                       Default: us-west-2
eks_terraform_trusted_principal_arns   (Optional) AWS Principal ARNs that should be allowed to see and
                                       perform actions against the Kubernetes cluster. This is a list of comma
                                       separated ARN values.
                                       Default: []
eks_nodes_vpc_cidr                     Number of IP addresses allocated for the Kubernetes network. It is
                                       recommended to have a high number of IP addresses available in case
                                       of Kubernetes cluster expansion.
                                       Default: 10.0.0.0/16
eks_node_ami_family                    The OS of the nodes in the Kubernetes cluster. Do not change this value
                                       unless instructed by Capella or if you know what you are doing.
                                       Default: Ubuntu2404
manager_instance_type                  The instance type of the Cambria Stream Manager nodes. See AWS
                                       documentation for information on how to get the instance type name
                                       Default: c7i.xlarge
manager_node_count                     The number of Cambria Stream Manager nodes to create
                                       Default: 3
worker_instance_type                   The instance type of the Cambria Stream nodes. See AWS
                                       documentation for information on how to get the instance type name
                                       Default: c6a.2xlarge
worker_node_count                      The number of Cambria Stream nodes to create
                                       Default: 2
streamrouter_instance_type             The instance type of the Cambria Stream Router nodes. See AWS
                                       documentation for information on how to get the instance type name
                                       Default: c7i.xlarge
streamrouter_node_count                The number of dedicated nodes for handling Stream Router input
                                       Default: 1
worker_stream_ingress_cidrs            The IP Address CIDRs that should be allowed to stream to the Cambria
                                       Stream nodes.
                                       Default: ["0.0.0.0/0"]
```

```text
values.tfvars                   Explanation
stream_router_ingress_cidrs     The IP Address CIDRs that should be allowed to stream to the Cambria
                                Stream Router node.
                                Default: ["0.0.0.0/0"]
max_worker_instances            The maximum number of encoders that the kubernetes cluster can have
                                up and running.
                                Default: 2
cambria_manager_replicas        The maximum number of Cambria management + replica machines to
                                have up and running. This should match the manager_node_count or
                                be greater if more manager replicas will be needed after installation
                                Default: 3
loki_storage_type               This is for deciding what type of storage to use for Loki logs. It is
                                recommended to use an S3 compatible storage like AWS S3 for
                                production. For testing purposes only, there is a filesystem version of the
                                Loki log storage deployment (local).
                                NOTE: option s3 is not currently working. For AWS S3, use
                                s3_embedcred
                                Allowed Options: local, s3_embedcred
                                Default: local
loki_local_storage_size_gi      This option is only used for the local loki_storage_type. This is how
                                many GB the Loki log volume should be. Volumes can fill up quickly so
                                testing different volume sizes may be required.
                                Default: 100
loki_s3_bucket_name             This option should be changed if using the s3 loki_storage_type. This is
                                the name of the S3 compatible bucket to write logs to
loki_s3_region                  This option should be changed if using the s3 loki_storage_type. This is
                                the region where the S3 bucket is located
loki_log_retention_period       This is the number of days to retain Loki logs in the storage device
                                Default: 7
workers_can_use_manager_nodes   Whether the Cambria Stream Manager nodes should also be able to
                                handle encoding tasks.
                                Default: false
workersUseGPU                   [ BETA ] This must be set to true if planning to use NVENC capabilities
                                on the encoding machines
                                Default: false
nbGPUs                          [ BETA ] The max number of GPUs to use from the encoding machines if
                                GPU functionality is enabled. This value should not exceed the amount of
                                GPUs available
                                Default: 1
```

```text
values.tfvars                  Explanation
webrtc_port_range_begin        WebRTC is used for input and output preview in the Cambria Stream
                               AdBreak Control UI. Each program uses up 1 WebRTC port. This is the
                               first usable port for WebRTC.
                               Default: 50000
webrtc_port_range_end          WebRTC is used for input and output preview in the Cambria Stream
                               AdBreak Control UI. Each program uses up 1 WebRTC port. This is the
                               last usable port for WebRTC.
                               Default: 50009
worker_rtp_port_range_begin    What RTP ports should be available when streaming directly to a Cambria
                               Stream node. This is the first allowed port in the allowed RTP port range.
                               Default: 5004
worker_rtp_port_range_end      Same as the above but this is specifically the last allowed port in the
                               allowed RTP port range.
                               Default: 5013
worker_srt_port_range_begin    What SRT ports should be available when streaming directly to a
                               Cambria Stream node. This is the first allowed port in the allowed SRT
                               port range.
                               Default: 8000
worker_srt_port_range_end      Same as the above but this is specifically the last allowed port in the
                               allowed SRT port range.
                               Default: 8009
worker_rist_port_range_begin   What RIST ports should be available when streaming directly to a
                               Cambria Stream node. This is the first allowed port in the allowed RIST
                               port range.
                               Default: 9000
worker_rist_port_range_end     Same as the above but this is specifically the last allowed port in the
                               allowed RIST port range.
                               Default: 9009
worker_rtmp_port_range_begin   What RTMP ports should be available when streaming directly to a
                               Cambria Stream node. This is the first allowed port in the allowed RTMP
                               port range.
                               Default: 1935
worker_rtmp_port_range_end     Same as the above but this is specifically the last allowed port in the
                               allowed RTMP port range.
                               Default: 1944
enable_manager_webui           If enabled, this allows users to use Cambria Stream Manager's Web UI.
                               Otherwise, only the REST API server can be used to interact with
                               Cambria Stream Manager.
                               Default: true
```

```text
values.tfvars                       Explanation
default_machine_maximum_instances   When a Cambria Stream worker node is connected to Cambria Stream
                                    Manager, this is the max number of channels it can run by default.
                                    Default: -1
worker_rollout_step1_weight         For upgrading Cambria Stream workers, this is the initial (step 1)
                                    percentage of those worker pods to upgrade. By default, this is set to 10.
                                    This means that running Cambria Stream programs will be killed and
                                    reassigned to any online machine.
                                    Default: 10
worker_rollout_step2_weight         For upgrading Cambria Stream workers, this is the percentage of those
                                    worker nodes to have upgraded in the 2nd upgrade stage (also called
                                    step 2). By default, this is set to 40. This means that running Cambria
                                    Stream programs will be killed and reassigned to any online machine.
                                    Default: 40
worker_rollout_max_unavailable      For upgrading Cambria Stream workers, this is the max number of pods
                                    that can be in a pending / unavailable state during the upgrade
                                    procedure. By default, this is set to 1000. This means that at least 1000
                                    pods can be in this state. This is set to a high number to allow most
                                    cases to upgrade.
                                    Default: 1000
stream_router_rtp_port_begin        What RTP ports should be available when streaming via the Cambria
                                    Stream Router. This is the first allowed port in the allowed RTP port
                                    range.
                                    Default: 15004
stream_router_rtp_port_count        The number of RTP ports allowed in the Cambria Stream Router.
                                    Default: 51
stream_router_srt_port_begin        What SRT ports should be available when streaming via the Cambria
                                    Stream Router. This is the first allowed port in the allowed SRT port
                                    range.
                                    Default: 18000
stream_router_srt_port_count        The number of SRT ports allowed in the Cambria Stream Router.
                                    Default: 10
stream_router_rist_port_begin       What RIST ports should be available when streaming via the Cambria
                                    Stream Router. This is the first allowed port in the allowed RIST port
                                    range.
                                    Default: 19000
stream_router_rist_port_count       The number of RIST ports allowed in the Cambria Stream Router.
                                    Default: 10
```

```text
values.tfvars                       Explanation
expose_capella_service_externally   This option tells the deployment to create load balancers to publicly
                                    expose the Capella application
                                    Default: true
enable_ingress                      This option tells the deployment to create an ingress for the Capella
                                    applications that should be exposed.
                                    Default: false
host_name                           One way to access the Cambria applications is through an Application
                                    ingress. This is the domain name for the ingress (Eg. mydomain.com)
                                    Default: myhost.com
acme_registration_email             This information is needed to connect a real TLS certificate to the ingress.
                                    The default values are only usable under a test environment. This is the
                                    email address for the ACME registration
                                    Default: test@mywebsite.com
acme_server                         The ACME server for automated certificate management
                                    Default: https://acme-staging-v02.api.letsencrypt.org/directory
ingressUseSelfSigned                If true, use self-signed certificates for the Cambria application servers. If
                                    false, the user needs to configure their own valid certificate for the
                                    Cambria applications.
                                    Default: true
webui_usertext                      This is used for exposing important information to an operator of the
                                    Cambria Web UI (Eg. API usertoken)
                                    Default: Staging Cluster for project XYZ
kubernetes_version                  The Kubernetes version number to use. Do not change this value
                                    unless instructed by Capella.
                                    Default: 1.36
install_monitoring                  This controls whether monitoring features (prometheus, grafana) should
                                    be installed. Do not change this value unless instructed by Capella.
                                    Default: true
install_loki                        This controls whether the Loki logs feature should be installed. Do not
                                    change this value unless instructed by Capella.
                                    Default: true
expose_grafana                      This option tells the deployment to make the Grafana dashboard
                                    accessible publicly via a load balancer
                                    Default: true
license_key_manager                 [ REQUIRED ]
                                    This is the Cambria Stream Manager license key that Capella should have
                                    provided. The license key should start with a '2' in this case. (Eg.
                                    2AAAAA-111111-BBBBBB-222222-CCCCCC-333333)
```

```text
values.tfvars                Explanation
license_key_worker           [ REQUIRED ]
                             This is the Cambria Stream license key that Capella should have
                             provided. The license key should start with a '3' in this case. (Eg.
                             3AAAAA-111111-BBBBBB-222222-CCCCCC-333333)
pg_cluster_password          The password for the PostgreSQL database that Cambria Stream
                             Manager uses. General password rules apply. The default can be used for
                             testing purposes but this should be changed for production
                             Default:
                             xrtVeQ4nfdd2YHoswqdURZvQDaL4KpNElsCEEe9bwdxMd73KckIeXzS5cU6
                             LiC2
cambria_stream_api_token     A token needed for making calls to the Cambria Stream Manager web
                             server. General token rules apply (Eg. 1234-5678-90abcdefg). The
                             default can be used for testing purposes but this should be changed for
                             production
                             Default: 12345678-1234-43f8-b4fc-53afd3893d5
cambria_stream_web_ui_user   This is the login credentials for the Cambria Stream Manager and License
                             WebUIs for the kubernetes cluster. Each user is listed in the form:
                             role,username,password
                             Allowed roles:
                             1. admin - can view/create/edit/delete anything on the WebUI. Can also
                             create/manage WebUI users.
                             2. superuser - can view/create/edit/delete anything on the WebUI.
                             3. user - can only view anything on the WebUI.
                             For multiple users, separate each by a comma. Example:
                             admin,admin,changethispassword1234,user,guest,password123
                             Default: admin,webUIUser,userpassword
cambria_abc_web_ui_user      This is the login credentials for the Cambria AdBreak Control WebUI for
                             the kubernetes cluster. Same rules apply as
                             cambria_stream_web_ui_user.
                             Default: admin,defaultABCWebUIUser,userpassword
grafana_admin_password       The password for Grafana Dashboard. General password rules apply
                             Default: prom-capellaPsw
loki_s3_access_key           This must be defined if using the s3_embedcred loki storage type. The
                             recommended log storage solution is AWS S3 or compatible S3 storage.
                             If using this solution, this is the ACCESS_KEY or AWS_ACCESS_KEY_ID
loki_s3_secret_key           This must be defined if using the s3_embedcred loki storage type. The
                             recommended log storage solution is AWS S3 or compatible S3 storage.
                             If using this solution, this is the SECRET_KEY or
                             AWS_SECRET_ACCESS_KEY
```

## Cambria Stream Manager WebUI

1. Run this command to get the webui address:

```text
kubectl get service/cambriastreammanagerwebuiservice -n capella-manager -o=jsonpath="{'https://'}{.status.loadBalancer.ingress[0].hostname}{':8171'}"
```

2. To log in to the WebUI, the credentials are located in the values file

## Cambria Stream Manager REST API

1. Run the following command to get the base REST API Web Address:

```text
kubectl get service/cambriastreamservice -n capella-manager -o=jsonpath="{'https://'}{.status.loadBalancer.ingress[0].hostname}{':8758'}"
```

The REST API url should look similar to this:

https://my-server:8758/CambriaLM/v1/Events?usertoken=12345678-1234-43f8-b4fc-53afd3893d5f

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
