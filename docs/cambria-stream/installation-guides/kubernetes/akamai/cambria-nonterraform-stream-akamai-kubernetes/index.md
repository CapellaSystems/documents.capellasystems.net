# Cambria Stream / Stream Manager 5.9.0

## Akamai Cloud Kubernetes Help Documentation

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

https://www.dropbox.com/scl/fi/bq6qhry0jg44ljoee78sg/Cambria_Stream_5_9_0_Limitations_and_Security_Information.pdf?rlkey=5dbtikprwve22dl704x7jm5kv&st=rj2axhvb&dl=0

> **Important: Before You Begin**

PDF documents have a copy/paste issue. For best results, download this document and any referenced PDF
documents in this guide and open them in a PDF viewer such as Adobe Acrobat.

For commands that are in more than one line, copy each line one by one and check that the copied command
matches the one in the document.

The sections below provide instructions on creating a NEW basic Kubernetes cluster with Cambria Stream with
default settings and more open security settings. For more granular control and non-default settings, consult
Akamai Cloud documentation.

### Information

This document references Kubernetes version 1.36 only

## ⚠️ Critical Information: Read Before Proceeding with Installation

Before starting the installation, carefully review the following considerations. Skipping this section may
result in errors, failed deployments, or misconfigurations.

1. A New Kubernetes Cluster Will Be Deployed

- ​   The installation process creates a brand-new Kubernetes cluster to keep the Cambria ecosystem
isolated from other applications.

2. Default Installation is Non-Secure

- ​   The guide covers installation with default settings in an open environment (not secure).
- ​   If you require a secure or customized setup, you will need Akamai Cloud expertise, which is not
covered in this guide.

3. Understand Your Transcoding Requirements

- ​   Know your expected transcoding volume, input/output specs, and whether a GPU is needed.

4. Administrative Rights Required

- ​   Many of the steps in this guide require administrative rights to Akamai Cloud for adding permissions and
performing other administrative functions of that sort.

5. Check Akamai Cloud Account Quota

- ​   Ensure the Akamai Cloud account has sufficient quota to deploy Kubernetes resources.

6. A Separate Linux Machine is Required

- ​   A dedicated Linux machine (preferably Ubuntu on an Akamai Cloud Linode machine) is needed to
deploy Kubernetes.
- ​   Keeping Kubernetes tools and configuration files on a dedicated system is strongly recommended.

7. Verify Region-Specific Resource Availability

- ​   Not all Akamai Cloud regions support the same resources (e.g., GPU availability varies by region).
- ​   Consult Akamai Cloud documentation to confirm available resources in your desired region.

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

https://www.dropbox.com/scl/fi/kn4hfd5c3ve6x98xlui9f/Cambria_Stream_5_9_0_Akamai_Information.pdf?rlkey=lny76i7q22d8ft0bx2qnz38zz&st=ts37u86n&dl=0

# Prerequisites

## 1. User Information Needed Before Installation

Required Information:

- Akamai Linode Personal Access Token with Read/Write access to all Akamai resources
- Cambria Stream Manager License Key (Eg. 2XXXXX-XXXXXX-XXXXXX-XXXXXX-XXXXXX-XXXXXX)
- Cambria Stream Worker License Key (Eg. 3XXXXX-XXXXXX-XXXXXX-XXXXXX-XXXXXX-XXXXXX)
- Region code where to deploy the Kubernetes Cluster (Eg. us-ord)

Other Important Information:

- Number of Cambria Stream Manager backup machines needed
- The machine specification for the Cambria Stream Manager nodes
- Number of Cambria Stream Worker machines needed
- The machine specification for the Cambria Stream encoder / packager nodes

## 2. Prepare Deployment Server

In order to deploy Cambria Stream, a Linux Deployment Server is required because this is where all of the tools,
dependencies, and packages for the Cambria Stream Kubernetes deployment will be installed and/or stored.

> **Important: Linux Deployment Server Machine Information**

The instructions in this document perform functions using a root user. To keep things consistent, Capella strongly
recommends using Akamai Linode instances for the deployment process.

Capella tests deployment with the Dedicated 4GB (g6-dedicated-2) instance type

Minimum Requirements:

| Requirement | Value |
|---|---|
| Operating System (OS) | Ubuntu 24.04 |
| CPU(s) | 2 |
| RAM | 4 GB |
| Storage | 10 GB |

1. On the Akamai Dashboard, create a new Ubuntu Linode used for the terraform deployment. For best performance,
choose an 4GB RAM or higher machine (Eg. Dedicated 4GB)

2. SSH into the new Linode and install general tools:

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
curl -o CambriaStreamLKE.zip -L
"https://www.dropbox.com/scl/fi/s6vj5dct48map21ucho2v/CambriaStreamKubernetesAkamai_5_9_0.zip?rlkey=q5u916rtewp5lrf0rmctx1x54&st=x0ozryu4&dl=1"
```

2. Unzip the package and make the shell scripts executable:

```text
unzip -o CambriaStreamLKE.zip && chmod +x ./bin/*.sh
```

3. Install the tools needed for deployment:

```text
./bin/setupTools.sh && ./bin/installKubeToolsAkamai.sh && ./bin/installLogcli.sh && ./bin/installTerraformDocs.sh
```

4. Restart the SSH terminal window for the changes to take effect

5. Verify the tools are installed:

```text
kubectl version --client && helm version && terraform --version && kubectl argo rollouts version &&
terraform-docs --version && logcli --version
```

# Installation

## 1. Create LKE Cluster

In the Akamai Cloud dashboard under Compute > Kubernetes, create a new cluster.

| Setting | Value |
|---|---|
| Cluster Label | Choose any label (Eg. cambria-stream) |

Cluster Tier                   In most cases, this should be LKE

Region                         Your region of operation (Eg. US, Atlanta, GA (us-southeast))

Kubernetes Version             1.36

Akamai App Platform            No

HA Control Plane               For testing, set to No. For production, it is recommended to set this to Yes (Incurs
additional cost. See Akamai documentation)

Control Plane ACL              Only enable this if you already know which IP CIDRs will need access to the LKE
control plane. Otherwise, leave as is

Do not create the cluster yet until you have added at least one nodegroup. Continue with the rest of this section to
create the desired nodegroups.

### 1.1. Cambria Stream Manager Nodegroup

One set of nodes that need to be added are the Cambria Stream Manager nodes. These are also referred to as the
Manager Nodes. At least one Cambria Stream Manager node needs to be running at all times in the Kubernetes
cluster.

To create these nodes, select the number of nodes to assign to the Cambria Stream Manager node pool in the Add
Node Pools section

### Information / Recommendation

Cambria Stream Manager manages scheduling and handling Cambria Stream encoding / packaging programs.
Think about how many programs will be intended to run and choose an instance type accordingly. The lowest
recommended machine type for the manager machines is Dedicated 8GB.

It is also recommended to set the node count to 3. This is because 1 of the nodes will act as the Cambria
Stream Manager node while the other 2 nodes act as backup (web server and database are replicated /
duplicated). In the case that the Cambria Stream Manager node goes down or stops responding, one of the
other two nodes will take over as the Cambria Stream Manager node. Depending on your workflow(s), think
about how many backup nodes may be needed.

> [Image omitted from this Markdown build.]

### 1.2. Cambria Stream Nodegroup

Another set of nodes that need to be added are the Cambria Stream nodes which are used for the actual encoding /
packaging work. These are also referred to as the Worker Nodes.

To create these nodes, select the number of nodes to assign to the Cambria Stream node pool in the Add Node Pools
section:

### Information / Recommendation

Currently, Cambria Stream nodes need to be added manually. Therefore, you will need to think about what
machine / instance type you need for running your Cambria Stream workflows. Based on benchmarks, our
recommended machine / instance type to get started is Dedicated 32 GB.

initially, you only need 1 instance running in the node group. Later in this guide, you will configure the maximum
number of Cambria Stream instances that you will need. When you are ready to use Cambria Stream machines,
you can manually create nodes with the desired machine / instance type (from 1 up to the configured maximum
number of Cambria Stream instances). To get started, we recommend setting this number to 2. This way, when
the installation is complete, you will already have two Cambria Stream machines / instances to test with. You
can always scale Cambria Stream nodes up and down depending on your needs.

> [Image omitted from this Markdown build.]

### 1.3. [ BETA ] Cambria Stream Router Nodegroup

This is a new testing feature for routing incoming streams to Cambria Stream encoding programs. In order to use
Cambria Stream router, at least one node needs to be created for this purpose.

To create these nodes, select 1 node to assign to the Cambria Stream Router pool in the Add Node Pools section

### Information / Recommendation

The lowest level tested machine type for the Cambria Stream Router machines is Dedicated 8GB

### 1.4. Deploy the Kubernetes Cluster

1. After selecting the cluster's initial manager and worker nodes, Create Cluster. This will begin the LKE cluster
deployment with the initial nodes.

It may take a few minutes for everything configured so far to be in a usable state. Wait for the nodes to all have a
Status of Running.

> [Image omitted from this Markdown build.]

### 1.5. Add Cambria Stream Manager Labels

The label 'capella-manager: true' needs to be added in order for the Kubernetes deployment to know which nodes
to target as the Cambria Stream Manager nodes. Follow these steps:

1. In the Akamai Cloud Dashboard, go into the kubernetes cluster and look for the Cambria Stream Manager
node pool

2. Select Labels and Taints and Add Label. In the Label field, enter capella-manager: true and then save the
changes

### 1.6. Add Cambria Stream Worker Labels

The label 'capella-worker: true' needs to be added in order for the Kubernetes deployment to know which nodes to
target as the Cambria Stream nodes. Follow these steps:

1. In the Akamai Cloud Dashboard, go into the kubernetes cluster and look for the Cambria Stream node pool

2. Select Labels and Taints and Add Label. In the Label field, enter capella-worker: true and then save the
changes

3. (Optional) If you want Cambria Stream Manager nodes to also be able to run Cambria Stream programs, set this
label on the Cambria Stream Manager node pool as well: capella-worker: true

### 1.7. [ BETA ] Add Cambria Stream Router Labels

Only if using the Cambria Stream Router feature. The label 'capella-streamrouter: true' needs to be added in order
for the Kubernetes deployment to know which nodes to target as the Cambria Stream Router nodes. Follow these
steps:

1. In the Akamai Cloud Dashboard, go into the kubernetes cluster and look for the Cambria Stream Router node
pool

2. Select Labels and Taints and Add Label. In the Label field, enter capella-streamrouter: true and then save
the changes

### 1.8. Create Kubeconfig File

1. In the Linux Deployment Server, run the following commands (replace cambria-stream with the Kubernetes
Cluster's name):

```text
export CLUSTER_NAME=cambria-stream KUBECONFIG=kubeconfig.yaml
```

2. In the Akamai dashboard, navigate to the Kubernetes cluster that was created. In the Kubeconfig section, click
on View and copy the contents

3. In the Linux Deployment Server, create the file 'kubeconfig.yaml' and paste the contents of the previous step

4. Save the file by holding CTRL/CMD + X, pressing the letter 'y', and then the Enter/Return key

5. Verify that kubectl works with the cluster

```text
kubectl get nodes
```

Example:

```text
NAME                          STATUS ROLES AGE VERSION
lke389119-595948-28c8a7980000 Ready <none> 23m v1.32.1
lke389119-595948-5e8b20d10000 Ready <none> 23m v1.32.1
```

### 1.9. Default Storage Class

Remove the default tag from all storage classes:

```text
kubectl get storageclass -o name | xargs -n 1 kubectl patch -p '{"metadata":{"annotations":{"storageclass.kubernetes.io/is-default-class":null}}}'
```

Set the storage class linode-block-storage as the default storage class:

```text
kubectl patch storageclass linode-block-storage \
-p '{"metadata": {"annotations": {"storageclass.kubernetes.io/is-default-class": "true"}}}'
```

## 2. [ BETA ] GPU Operator for NVENC

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

## 3. Application Domain-Name Access: Traefik

By default, certain parts of the Cambria applications are exposed via an ingress. In order to access these, the traefik
service needs to be created and attached to the ingress.

1. Run the following commands to get the traefik Helm repository:

```text
helm repo add traefik https://traefik.github.io/charts && helm repo update
```

2. Run the following commands to deploy traefik to the Kubernetes cluster:

```text
helm upgrade --install traefik traefik/traefik \
--namespace traefik --create-namespace
```

3. Wait about a minute for the deployment to complete fully. Verify that the resources are created and in an active /
online state:

- Pods should be in a Running STATUS and all containers in READY should be active
- Services should have a CLUSTER-IP assigned. The traefik service should have an EXTERNAL-IP
- All other resources (Eg. replicasets, deployments, statefulsets, etc) should have all desired resources active

```text
kubectl get all -n traefik
```

If any resources are still not ready, wait about a minute for them to complete. If still not complete, contact the Capella
support team.

For Production / Using Publicly Registered Domain Name and TLS Certificate.
Example with Namecheap Registered Domain:

https://www.dropbox.com/scl/fi/l4uu74yj3ur4it50j6d3i/Cambria_Kubernetes_Domain_DNS_Guide.pdf?rlkey=qou5oj8jrdyfmpw3jhhzzqlaz&st=h6wo60gl&dl=0

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

1. Review the following information. For this option, it requires an AWS IAM user with an AWS_ACCESS_KEY_ID and
AWS_SECRET_ACCESS_KEY. This is the minimum permission requirements for the user (replace LOKI_BUCKET with
the actual name of the AWS S3 bucket that will be used)

```json
{
"Version": "2012-10-17",
"Statement": [
{
"Sid": "LokiStorage",
"Effect": "Allow",
"Action": [
"s3:ListBucket",
"s3:PutObject",
"s3:GetObject",
"s3:DeleteObject"
],
"Resource": [
"arn:aws:s3:::LOKI_BUCKET",
"arn:aws:s3:::LOKI_BUCKET/*"
]
}
]
}
```

2. Set the following environment variables:

7d: the number of days to keep logs tracked (in number of days)

```text
export LOG_RETENTION_PERIOD=7d
```

3. Create an S3 compatible bucket (if not already done so)

4. If using AWS S3, set up a Lifecycle Policy on the bucket. It is recommended that the bucket has a
lifecycle policy to delete objects after X amount of days greater than or equal to the
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

5. For S3 compatible buckets that are not AWS, review documentation for the specific s3 compatible
service to see how to set up the equivalent of a lifecycle policy that AWS S3 has. It is recommended that the
bucket has a lifecycle policy to delete objects after X amount of days greater than or equal to the
LOG_RETENTION_PERIOD.

6. Set environment variables

LOKI_BUCKET=my-bucket-name: the S3 bucket from the previous step
LOKI_REGION=us-west-2: the region of the S3 bucket. For Akamai, make sure the region ends with
linodeobjects.com (Eg. us-southeast-1.linodeobjects.com)
ACCESS_KEY_ID=C12345678AB217A99: the Access Key Id of the user that has permissions to the Loki
bucket
SECRET_ACCESS_KEY=abcdefghijklmnop12345012345011111abcde: the Secret Key of the user that has
permissions to the Loki bucket
REPLICAS=2: the number of nodes to replicate loki to. This value must be at least 2. For this value, this
amount of nodes must be active on the kubernetes cluster to operate properly

```text
export LOKI_BUCKET=my-bucket-name
export LOKI_REGION=us-west-2
export ACCESS_KEY=C12345678AB217A99
export SECRET_KEY=abcdefghijklmnop12345012345011111abcde
export REPLICAS=2
```

7. Deploy Loki and Alloy:

```text
./bin/deployLokiAlloyS3EmbeddedCredentials.sh
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

akamaiCloudAPIToken:                                   This is the Akamai Cloud account’s API Token. See
"d02732530a2bcfd4d028425eb55f366f74631…"               https://www.linode.com/docs/products/tools/api/guides/manage-api
-tokens/

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

1. In the Akamai Cloud Dashboard, go to the Kubernetes section to the Kubernetes cluster that needs to be
upgraded. There should be an option to upgrade the cluster

2. Run through the steps in Verification to check that the Kubernetes cluster is still working

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

# Cleanup / Delete

Many resources are created in a Kubernetes environment. It is important that each step is followed carefully:

1. Run the following commands to remove the Helm deployments:

```text
helm uninstall capella-stream -n default --wait
```

2. If any volumes are remaining, run the following command:

```text
kubectl get pv -o name | awk -F'/' '{print $2}' | xargs -I{} kubectl patch pv {} -p='{"spec":{"persistentVolumeReclaimPolicy": "Delete"}}'
```

3. Only if traefik ingress was deployed, do the following:

```text
helm uninstall -n traefik traefik --wait && kubectl delete namespace traefik
```

4. Set the kubernetes cluster name, region, and kubeconfig as environment variables (if not already done so):

```text
export CLUSTER_NAME=cambria-stream KUBECONFIG=kubeconfig.yaml
```

5. Delete the monitoring related components created:

s3: set this to s3_embedcred if the setup was s3 for Loki logs or local if the setup was filesystem for Loki logs

```text
./bin/quickDestroyMonitoring.sh s3_embedcred
```

6. Only if enableLiveRouter was set to true in the Helm chart, delete the inputstreams node balancer:

```text
export LINODE_CLI_TOKEN=d02732530a2bcfd4d028425eb55f366f74631…
./bin/akamaiNodeBalancer.sh delete
```

7. Only if limitExternalAccess in the Helm config yaml file was set to true, do the following:

   a.​ In the Akamai dashboard, go to the LKE cluster
   b.​ In the LKE cluster dashboard, make a note of the Cluster ID
   c.​ Go to Networking > Firewalls. Delete the firewall called firewall-[CLUSTER_ID] where [CLUSTER_ID] is
the LKE cluster's ID

8. In the Akamai Cloud Home page, go into the Kubernetes Cluster and Delete Cluster

Wait several minutes for the Kubernetes Cluster to delete completely.

# Resources / Useful Information

## Cambria Stream Values

### Required Values

```text
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
akamaiCloudAPIToken:                              This is the Akamai Cloud account’s API Token. See
"d02732530a2bcfd4d028425eb55f366f74631…"          https://www.linode.com/docs/products/tools/api/guides/manage-api-tokens/
```

### Optional Values

```text
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
 managerExtraServiceAnnotations: {}               If exposeStreamServiceExternally is set to true, load balancers are created to
 webuiExtraServiceAnnotations: {}                 expose Cambria Web UI and API applications externally.
                                                  These specific values allow extra annotations to these load balancers. By default,
                                                  no extra annotations are added to the load balancers.
 hostName: myhost.com                             These fields are for use with the ingress. The default values can be used for
 acmeRegistrationEmail: test@example.com          testing purposes. For production, these values must be changed to a valid
 acmeServer:                                      registered domain name, email, and TLS certificate server.
https://acme-staging-v02.api.letsencrypt.org/directory
 ingressUseSelfSigned: true                       For testing purposes, the ingress will use a self-signed certificate for the
                                                  application servers. For production (and if you have your own valid certificate), set
                                                  this to false
externalStreamIPs:                                limitExternalAccess: when true, this allows only the specified IP address CIDRs
 limitExternalAccess: false                       specified in allowedExternalStreamIPs to send inbound traffic to the Cambria
 allowedExternalStreamIPs:                        Stream nodes in the kubernetes cluster. A firewall is created in the Akamai Cloud
 - 10.0.0.0/8                                     Firewalls section for this purpose. Default is false.
 - 192.168.0.0/16
 -                                                allowedExternalStreamIPs: these are all the IP address CIDRs that are allowed
                                                  to send inbound traffic to the Cambria Stream nodes. The CIDRs "10.0.0.0/8" and
                                                  "192.168.0.0/16" are required. Any other CIDRs should be listed in the same way
                                                  as the required CIDRs.
streamRouter:                                     Port ranges to expose for the Cambria Stream router.
  rtpPortBegin: 15004
  rtpPortCount: 21                                Note that the Kubernetes firewall must still open these ports.
  srtPortBegin: 18000
  srtPortCount: 10
  ristPortBegin: 19000
  ristPortCount: 10
webui:                                            This is used for exposing important information to an operator of the Cambria
 userText: "Staging Cluster for project XYZ"      Web UI (Eg. API usertoken)
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

In some cases, you might need to copy files to a Cambria Stream pod. For example, you have an MP4 file you
want to use as a failover source for your stream. In this case, to copy the file over to the Cambria Stream pod,
do the following:

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
kubectl cp C:\MyKeys\MyKeyFile.key cambriastreammanagerapp-695dcc848f-vjpc7:/var/keys/MyKeyFile.key -n default
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

## Third-Party Tools

Argo: the Argo third-party system is a collection of tools for orchestrating parallel jobs in a Kubernetes
environment.

Argo-Rollouts: an Argo tool used for upgrading containers in a Kubernetes Cluster in a rollout fashion (Eg.
upgrade 50% of the containers first, then 80% of the containers, then 100% of the containers).

Argo-Events: an Argo tool that triggers specific Kubernetes functions based on events from other
dependencies such as webhook, s3, etc.

Cert-Manager: the cert-manager addon automates the process of retrieving and managing TLS certificates.
These certificates are periodically renewed to keep the certificates up to date and valid.
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
