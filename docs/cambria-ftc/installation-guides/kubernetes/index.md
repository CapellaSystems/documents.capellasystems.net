# Cambria Cluster / FTC 5.8.0

## On Premise Kubernetes Help Documentation

## Document History

Version         Date            Description

5.6.0           10/31/2025      Updated for release 5.6.0.26533 (Linux)

5.8.0           07/01/2026      Updated for release 5.8.0.31580 (Linux)

* Download the online version of this document for the latest information and latest files. Always

download the latest files

Do not move forward with the installation process if you do not agree with the End User License

Agreement (EULA) for our products. You can download and read the EULA for Cambria FTC, Cambria

Cluster, and Cambria License Manager from the links below:

Cambria Cluster | Cambria FTC | Cambria License Manager

https://www.dropbox.com/s/1wg7ee7a59kzi8h/EULA_Cambria_License_Manager.pdf?dl=0https://www.dropbox.com/s/oemlax63aatjjiw/EULA_Cluster.pdf?dl=0

https://www.dropbox.com/s/ualv9usxsowh6m2/EULA_FTC.pdf?dl=0

### Important: Limitations and Security Information

Cambria Cluster, FTC, and License Manager are installed on Linux in containers. Limitations and security information

can be found in the document below:

https://www.dropbox.com/scl/fi/zwojjdyy4kd6ul0s843kx/Cambria_FTC_5_8_0_Limitations_and_Security_Information.pdf?rlkey=ei1tnflrwm8nduiewfd6g6ghu&st=wi4rgxvh&dl=0

### Important: Before You Begin

PDF documents have a copy/paste issue. For best results, download this document and any referenced PDF

documents in this guide and open them in a PDF viewer such as Adobe Acrobat.

For commands that are in more than one line, copy each line one by one and check that the copied command

matches the one in the document.

### Information

This document references Kubernetes version 1.35 only

## ⚠️ Critical Information: Read Before Proceeding

Before starting the installation, carefully review the following considerations. Skipping this section may

result in errors, failed deployments, or misconfigurations.

### 1. A New Kubernetes Cluster Will Be Deployed

- ​   The installation process creates a brand-new Kubernetes cluster to keep the Cambria ecosystem isolated
from other applications.

### 2. Default Installation is Non-Secure

- ​   The guide covers installation with default settings in an open environment (not secure).
- ​   If you require a secure or customized setup, you will need firewall and security experience for on-premise
environments, which is not covered in this guide.

- ​   Firewall information is provided in section Firewall Information

### 3. Understand Your Transcoding Requirements

- ​   Know your expected transcoding volume, input/output specs, and whether a GPU is needed.
- ​   Refer to section On Premise Machine Information and Benchmark for guidelines on machine requirements.

### 4. Administrative Rights Required

- ​   Many of the steps in this guide require administrative rights / root access for adding permissions and
performing other administrative functions of that sort.

### 5. Ubuntu 24.04 Recommended as Node Host

- ​   For this Kubernetes setup, only Ubuntu 24.04 has been tested by the Capella team. Also, all instructions in
this guide are only geared towards Ubuntu 24.04

- ​   Other Linux distributions and versions not supported. If another Linux version or distribution is preferred,
consult the Linux documentation for equivalent commands and procedures

### 6. Isolated Environment Recommended

- ​   To avoid potential conflicts with other applications, it is recommended to use machines / nodes that will be
dedicated to only performing tasks for this Kubernetes cluster deployment

- ​   Any node part of this Kubernetes deployment cannot have other container services running (Eg. Docker)
## Document Overview

The purpose of this document is to provide a walkthrough of the installation and initial testing process of the Cambria

Cluster and Cambria FTC applications in the Kubernetes environment. The basic view of the document is the following:

1. Overview of the Cambria Cluster / FTC Environment in a Kubernetes Environment
### 2. Preparation for the installation (Prerequisites)

3. Create and configure the Kubernetes Cluster
4. Install Cambria Cluster and Cambria FTC on the Kubernetes Cluster
5. Verify the installation is working properly
### 6. Test the Cambria Cluster / FTC applications

### 7. Update the Cambria Cluster / FTC applications on Kubernetes Cluster

8. Delete a Kubernetes Cluster
### 9. Quick Reference of Kubernetes Installation

10. Quick Reference of Important Kubernetes Components (urls, template projects, test player, etc)
### 11. Glossary of important terms

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

## Resource Usage

The resources used and their quantities will vary depending on requirements and different

environments. Below is general information about some of the major resource usage:

NodeBalancers      0-3 NodeBalancers (Manager WebUI, Manager Web Server, Grafana)

0-1 NodeBalancer (Ingress)

Nodes              X Cambria Manager Instances (Default is 3)

Y Cambria FTC Instances (Depends on max FTC instance configuration; Default is 20)

Networking         No specific networks are created

Security           No firewalls are created.

## On Premise Machine Information and Benchmark

Coming Soon!

Currently, no real benchmarks have been recorded for on-premise Kubernetes specifically. However, Capella does

record Windows benchmarks for some specific workflows. Find these in the document below:

https://www.capellasystems.net/cambria-ftc

## Cambria Application Access

The Cambria applications are accessible via the following methods:

### Option 1: External Access via TCP Load Balancer

The default Cambria installation configures the Cambria applications to be exposed through load balancers.

There is one for the Cambria Manager WebUI + License Manager, and one for the web / REST API server. The

load balancers are publicly available and can be accessed either through its public ip address or domain name,

and the application's TCP port.

Example:

Cambria Manager WebUI:

https://192.168.1.33:8161

Cambria REST API:

https://192.168.1.34:8650/CambriaFC/v1/SystemInfo

External access in this way can be turned on / off via a configuration variable. See Deploy Cambria Cluster, FTC,

and Monitoring. If this feature is disabled, another method of access will need to be configured.

### Option 2: HTTP Ingress via Reverse Proxy

In cases where the external access via TCP load balancer is not acceptable or for using a purchased domain

name from servicers such as GoDaddy, the Cambria installation provides the option to expose an ingress.

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

Capella provides a default ingress hostname for testing purposes only. In production, the default hostname, ssl

certificate, and other such information needs to be configured. More information about ingress configuration is

explained later in this guide.

## Firewall Information

By default, this guide creates a kubernetes cluster with default settings which do not include a

Firewall. For custom / non-default configurations, or to explore with a more restrictive network based on the

default virtual network created, the following is a list of known ports that the Cambria applications use:

Port(s)            Protocol   Traffic          Description

8650               TCP        Inbound          Cambria Cluster REST API

8161               TCP        Inbound          Cambria Cluster WebUI

8678               TCP        Inbound          Cambria License Manager Web Server

8481               TCP        Inbound          Cambria License Manager WebUI

9100               TCP        Inbound          Prometheus System Exporter for Cambria Cluster

8648               TCP        Inbound          Cambria FTC REST API

3100               TCP        Inbound          Loki Logging Service

3000               TCP        Inbound          Grafana Dashboard

443                TCP        Inbound          Capella Ingress

ALL                TCP/UDP    Outbound         Expose all Outbound Traffic

6400               TCP        Inbound          Node Control Plan API

Also, for Cambria licensing, any Cambria Cluster and Cambria FTC machine requires that at least the following

domains be exposed in your firewall (both inbound and outbound traffic):

Domain                                  Port(s)     Protocol          Traffic       Description

api.cryptlex.com                        443         TCP               In/Out        License Server

cryptlexapi.capellasystems.net          8485        TCP               In/Out        License Cache Server

cpfs.capellasystems.net                 8483        TCP               In/Out        License Backup Server

## Pre-requisites

The following steps need to be completed before the deployment process.

### 1. X11 Forwarding for User Interface

If using SSH to access the Kubernetes Host and the SSH client machine is either Windows or MAC, there

are some special tools that need to be installed in order to be able to use the user interface from Capella's terraform

installer. If using Linux, the machine must have a graphical user interface (GUI).

### 1.1. Option 1: Microsoft Windows Tools

1. Download and install the X11 Forwarding Tool Xming:
https://github.com/marchaesen/vcxsrv/releases/download/21.1.16.1/vcxsrv-64.21.1.16.1.installer.noadmin.exe

2. Also, download and install PuTTY or similar tool that allows X11 Forwarding SSH:
https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html

3. Open XLaunch and do the following:

a.​ Window 1: Choose Multiple windows and set Display number to 0

b.​ Window 2: Choose to Start no client

c.​ Window 3: Enable all checkboxes: Clipboard, Primary Selection, Native opengl, and Disable access

control

d.​ Window 4: Click on Save configuration and save this somewhere to reuse in the future

### 1.2. Option 2: Apple MacOS Tools

1. Download and install the X11 Forwarding Tool XQuartz:
https://github.com/XQuartz/XQuartz/releases/download/XQuartz-2.8.5/XQuartz-2.8.5.pkg

### 2. Enable IPv6 on Host Machines

For all on-premise machines that will be part of the Kubernetes process, IPv6 must be enabled. Run the following on

each of the machines:

```text
sudo sysctl -w net.ipv6.conf.all.disable_ipv6=0 && \
sudo sysctl -w net.ipv6.conf.default.disable_ipv6=0 && \
sudo sysctl -w net.ipv6.conf.lo.disable_ipv6=0 && \
sudo sed -i '/disable-ipv6/d' /etc/sysctl.conf && \
sudo sysctl --system
```

Restart the machine

```text
sudo reboot
```

3. Install Tools: Canonical
For all on-premise machines that will be part of the Kubernetes process, Canonical Kubernetes must be installed. Run

the following on each of the machines:

### 1. Try to remove any previous canonical installation:

```text
sudo snap remove k8s --purge
```

And also remove any saved credentials from previous installations:

```text
sudo rm -rf /etc/k8sd/* && sudo rm -rf /var/lib/k8sd/*
```

Skip this step if no previous canonical installation was found. Then, reboot the machine:

```text
sudo reboot
```

2. Install canonical

```text
sudo snap install k8s --classic --channel=1.35-classic/stable
```

Sample response:

```text
k8s (1.35-classic/stable) v1.35.0 from Canonical✓ installed
```

4. Download Cambria FTC Package
Run the following steps in the Kubernetes Host.

1. Install system tools:

```text
sudo apt update && \
sudo DEBIAN_FRONTEND=noninteractive apt -o Dpkg::Options::="--force-confold" -y upgrade && \
sudo DEBIAN_FRONTEND=noninteractive apt -o Dpkg::Options::="--force-confold" -y install curl unzip libice6
libsm6 dbus libgtk-3-0
```

2. Download the Cambria Cluster On-Premise Kubernetes package:

```text
curl -o CambriaClusterKubernetesOnPremise_5_8_0.zip -L
"https://www.dropbox.com/scl/fi/5heuqea49m0c6lc5iibia/CambriaClusterKubernetesOnPremise_5_8_0.zip?rlkey=svivfbl73xq7y89abi3ee1g8v&st=a1anzuv8&dl=1"
```

### 3. Unpack and make tools executable:

```text
unzip -o CambriaClusterKubernetesOnPremise_5_8_0.zip && chmod +x ./bin/*.sh ./bin/TerraformVariableEditor
```

4. Install tools needed for deployment:

```text
./bin/setupTools.sh && ./bin/installLogcli.sh && ./bin/installTerraformDocs.sh
```

5. Verify the tools are installed:

```text
kubectl version --client && helm version && terraform --version && terraform-docs --version
```

# Installation

1. Create Kubernetes Cluster
1.1. Create Cluster Base

Only run these steps on the machine that will be the Kubernetes Host.

1. Create the Canonical Cluster:

```text
sudo k8s bootstrap
```

Sample response:

Bootstrapping the cluster. This may take a few seconds, please wait.

Bootstrapped a new Kubernetes cluster with node address "10.0.0.30:6400".

The node will be 'Ready' to host workloads after the CNI is deployed successfully.

For any issues with this step, consult Troubleshooting for more information

2. Verify the installation:

```text
sudo k8s kubectl get nodes
```

Sample response:

NAME               STATUS ROLES            AGE VERSION

prodeski7-vpro1-linux Ready control-plane,worker 14m v1.33.4

1.2. Add Control Plane Nodes

By default, the Kubernetes host is a control plane node. To add more nodes as Control Plane Nodes, follow these

steps:

### Important: High Availability

To enable high availability, 3 control plane nodes must be active in a Canonical Kubernetes cluster. To verify that

high availability is enabled, run the following command:

```text
sudo k8s status
```

Sample response:

```text
cluster status:         ready
control plane nodes:    10.0.0.11:6400 (voter), 10.0.0.33:6400 (voter), 10.0.0.47:6400 (voter)
high availability:      yes
datastore:              k8s-dqlite
network:                enabled
dns:                     enabled at 10.151.182.107
ingress:                 ingress
load-balancer:           disabled
local-storage:           enabled at /var/snap/k8s/common/rawfile-storage
gateway:                  enabled
```

1. Make sure the machine / node to add already has Canonical installed. If unsure, run through the steps in Enable
IPv6 on Host Machines and Install Tools: Canonical

1. In the Kubernetes host, run this command:

`<node-hostname>`: the hostname of the machine. This hostname must be DNS reachable by the Kubernetes host

node

```text
sudo k8s get-join-token <node-hostname>
```

This should return a base64 encoded token

2. On the machine to add, run this command:

`<token>`: the base64 token from the command in the previous step

```text
sudo k8s join-cluster <token>
```

Sample response:

Joining the cluster. This may take a few seconds, please wait.

Cluster services have started on "local-machine-2".

Please allow some time for initial Kubernetes node registration.

For any issues with this step, consult Troubleshooting for more information

1.3. Add Worker Nodes

By default, the Kubernetes host is a worker node. Also, any node that was added as a control plane node is also a

worker node. To add more nodes as "worker nodes" that are not "control plane nodes", follow these steps:

1. Make sure the machine / node to add already has Canonical installed. If unsure, run through the steps in
## Pre-requisites

1. In the Kubernetes Host, run this command:

`<node-hostname>`: the hostname of the machine. This hostname must be DNS reachable by the Kubernetes host

node and make sure the hostname is all lowercase

```text
sudo k8s get-join-token <node-hostname> --worker
```

This should return a base64 encoded token

2. On the machine to add, run this command:

`<token>`: the base64 token from the command in the previous step

```text
sudo k8s join-cluster <token>
```

1.4. Add Cambria Cluster Manager Node Labels

For any node that will be designated as the Cambria Cluster node (management node), do the following:

1. In the Kubernetes Host node, run the following command to add the 'capella-manager="true"' label to the worker
node (make sure the node-name is all lowercase):

```text
sudo k8s kubectl label node <node-name> capella-manager="true"
```

2. Verify that the node has the label "capella-manager":"true"

```text
sudo k8s kubectl get node/<node-name> -o=jsonpath="{.metadata.labels}{'\n'}"
```

Sample response:

```text
{"beta.kubernetes.io/arch":"amd64","beta.kubernetes.io/os":"linux","capella-manager":"true","hostname":"local-m
```

achine-2","k8sd.io/role":"control-plane","kubernetes.io/arch":"amd64","kubernetes.io/hostname":"local-machine-2"

```text
,"kubernetes.io/os":"linux","node-role.kubernetes.io/control-plane":"","node-role.kubernetes.io/worker":""}
```

1.5. Add Cambria FTC Worker Node Labels

For any node that will be designated as the Cambria FTC node (worker node / encoding node), do the following:

1. In the Kubernetes Host node, run the following command to add the 'capella-worker="true"' label to the worker
node:

```text
sudo k8s kubectl label node <node-name> capella-worker="true"
```

2. Verify that the node has the label "capella-manager":"true"

```text
sudo k8s kubectl get node/<node-name> -o=jsonpath="{.metadata.labels}{'\n'}"
```

Sample response:

```text
{"beta.kubernetes.io/arch":"amd64","beta.kubernetes.io/os":"linux","capella-worker":"true","hostname":"local-mac
```

hine-3","k8sd.io/role":"control-plane","kubernetes.io/arch":"amd64","kubernetes.io/hostname":"local-machine-3","

```text
kubernetes.io/os":"linux","node-role.kubernetes.io/control-plane":"","node-role.kubernetes.io/worker":""}
```

### 1.6. Enable Load Balancers

In order to have access to the Cambria applications, load balancers need to be enabled in the Kubernetes cluster.

Follow these steps in the Kubernetes host:

1. In the Kubernetes Host, enable load balancers:

```text
sudo k8s enable load-balancer
```

Wait about a minute or two for the setting to be applied.

Check that the load balancer setting is enabled:

```text
sudo k8s status
```

Sample response:

cluster status:      ready

control plane nodes: 10.0.0.11:6400 (voter), 10.0.0.33:6400 (spare)

```text
high availability:   no
datastore:           etcd
network:             enabled
dns:                 enabled at 10.153.121.113
ingress:             disabled
load-balancer:       enabled, L2 mode
local-storage:       enabled at /var/snap/k8s/common/rawfile-storage
gateway              enabled
```

If the load balancer is still not enabled, wait another minute. If after this waiting period, there is still an issue, consult

Troubleshooting for more information

2. Set the load-balancer mode to l2 (if not already in that mode):

```text
sudo k8s set load-balancer.l2-mode=true
```

3. Select a CIDR to dedicate to the load balancers. This CIDR is a list of addresses that will be reserved for use with
the Kubernetes Cluster.

### Important: CIDR Selection Guideline

Make sure to select a CIDR where the IP addresses won't conflict with existing or future resources outside of the

Kubernetes cluster. The current minimum required CIDR is /29 and is the lowest the Capella team has tested.

10.0.0.248/29: the CIDR for your load-balancer pool

```text
sudo k8s set load-balancer.cidrs=10.0.0.248/29
```

4. Verify that the configuration is correct:

```text
sudo k8s get load-balancer
```

Sample response:

enabled: true

cidrs:

- 10.0.0.248/29

l2-mode: true

l2-interfaces: []

bgp-mode: false

bgp-local-asn: 0

bgp-peer-address: ""

bgp-peer-asn: 0

bgp-peer-port: 0

### 1.7. Enable Ingress

The ingress in the Kubernetes Cluster is used for allowing access to the Cambria (and other) applications by using a

registered domain and TLS certificates. The Canonical Kubernetes setup uses Cilium as the controller. For more

information, see https://docs.cilium.io/en/stable/network/servicemesh/ingress/

1. In the Kubernetes Host, make sure that the load-balancer configuration is enabled in the cluster. See 3.6. Load
Balancers

### 2. Enable the ingress controller:

```text
sudo k8s enable ingress
```

Sample response:

Enabling ingress on the cluster. This may take a few seconds, please wait.

ingress enabled.

3. Verify the ingress is enabled:

```text
sudo k8s get ingress
```

Sample response:

enabled: true

default-tls-secret: ""

enable-proxy-protocol: false

### 1.8. Enable Volumes

The applications in the Kubernetes deployment need volumes to store application data and other important

information. For this, the deployment uses Longhorn. It sets up volumes in a distributed way in order to avoid losing

volumes in case of machine failure / downtime.

On the Kubernetes Host and on each Control Plane Node that is part of the Kubernetes cluster, run the following

commands:

1. Install multipath-tools:

```text
sudo apt install multipath-tools
```

2. Install Loghorn pre-requisites:

```text
curl -L https://github.com/longhorn/cli/releases/download/v1.10.1/longhornctl-linux-amd64 -o longhornctl
chmod +x longhornctl
export KUBECONFIG=/etc/kubernetes/admin.conf
sudo k8s kubectl create namespace longhorn-system
sudo -E ./longhornctl check preflight
sudo -E ./longhornctl install preflight
sudo -E ./longhornctl check preflight
```

### 3. Deploy Loghorn

```text
sudo k8s helm repo add longhorn https://charts.longhorn.io
sudo k8s helm repo update
sudo k8s helm upgrade --install longhorn longhorn/longhorn -n longhorn-system --create-namespace
sudo k8s kubectl apply -f config/longhorn-storageclass.yaml
```

Wait about a minute for pods to be deployed and running

3. Check that the pods are all running:

```text
sudo k8s kubectl -n longhorn-system get pods
```

Sample output:

```text
NAME                                READY STATUS RESTARTS             AGE
csi-attacher-5d68b48d9-ks6tl               1/1      Running 0          26s
csi-attacher-5d68b48d9-mfgbv                 1/1      Running 0          26s
csi-attacher-5d68b48d9-r8gk8                 1/1     Running 0           26s
csi-provisioner-6fcc6478db-5tgtt            1/1     Running 0           26s
csi-provisioner-6fcc6478db-swfdl            1/1     Running 0           26s
csi-provisioner-6fcc6478db-zdhfs            1/1      Running 0          26s
csi-resizer-6c558c9fbc-7g9sb               1/1     Running 0           26s
csi-resizer-6c558c9fbc-l7kb8              1/1      Running 0          26s
csi-resizer-6c558c9fbc-lxngx              1/1      Running 0          26s
csi-snapshotter-874b9f887-42wpm                1/1      Running 0          26s
csi-snapshotter-874b9f887-bxmp4                1/1      Running 0          26s
csi-snapshotter-874b9f887-s5hrg               1/1     Running 0           26s
engine-image-ei-db6c2b6f-w4bzw                 1/1      Running 0          61s
engine-image-ei-db6c2b6f-x5xxd                1/1      Running 0          61s
engine-image-ei-db6c2b6f-zbxhk                1/1     Running 0           61s
instance-manager-7d1356e1bbb88ecbab52458680778e6e 1/1            Running 0           27s
instance-manager-ee2bc6d5edfde3abde32a835adc247d2 1/1           Running 0           31s
instance-manager-fe1e44949f93985cef7421640d3d632b 1/1           Running 0           21s
longhorn-csi-plugin-gm6w7                  3/3      Running 0          26s
longhorn-csi-plugin-qh2vg                 3/3     Running 0           26s
longhorn-csi-plugin-vssqb                3/3      Running 0          26s
longhorn-driver-deployer-558944b5fd-dzlm4          1/1    Running 0           90s
longhorn-manager-b68lp                     2/2     Running 0           90s
longhorn-manager-fddcd                    2/2      Running 0          90s
longhorn-manager-qtqdx                     2/2     Running 1 (72s ago) 90s
longhorn-ui-74f8bdddf-p6sdg                 1/1     Running 0           90s
longhorn-ui-74f8bdddf-ttj6b               1/1      Running 0          90s
```

### 2. Deploy Cambria Cluster, FTC, and Monitoring

### 2.1. Configure the Kubernetes Cluster

1. SSH into the Kubernetes host using one of the following methods (depending on the OS being used as the SSH
client):

Option 1: Windows

1. Open PuTTY or similar tool. Enable X11 Forwarding in the configuration. On PuTTY, this can be found in
Connection > SSH > X11 > X11 forwarding

2. SSH into the instance with the created user. Usually, the user is root

Option 2: Unix (Linux, MacOS)

1. Open a terminal window and ssh into the Linode instance using -Y option and one of the created users. This
is usually root.

Example:

```text
ssh -Y -i "mysshkey" root@123.123.123.123
```

2. Run the terraform editor UI:

```text
./bin/TerraformVariableEditor
```

3. Click on Open Terraform File and choose the CambriaClusterValues_SENSITIVE_VALUES.tf file from the
values directory.

4. Using the UI, edit the fields accordingly. Reference the following table for values that should be changed:

Terraform UI Editor                             Explanation

pg_cluster_password                             The password for the PostgreSQL database that Cambria Cluster

uses. General password rules apply

cambria_cluster_api_token                       A token needed for making calls to the Cambria FTC web server.

General token rules apply (Eg. 1234-5678-90abcdefg)

cambria_cluster_webui_user                      This is the login credentials for all of the Cambria WebUIs for the

kubernetes cluster. Each user is listed in the form:

role,username,password

Allowed roles:

1. admin - can view/create/edit/delete anything on the WebUI. Can
also create/manage WebUI users.

2. superuser - can view/create/edit/delete anything on the WebUI.
3. user - can only view anything on the WebUI.

For multiple users, separate each by a comma. Example:

admin,admin,changethispassword1234,user,guest,password123

argo_event_webhook_source_bearer_token          A token needed for making specific argo events calls. General token

rules apply (Eg. 1234-5678-90abcdefg)

ftc_license_key                                 This is the Cambria FTC license key that Capella should have

provided. The license key should start with a '2' in this case. Only

one license key is needed here (Eg.

2AB122-11123A-ABC890-DEF345-ABC321-543A21)

grafana_admin_password                          The password for Grafana Dashboard. General password rules apply

loki_s3_access_key                              The recommended log storage solution is AWS S3 or compatible S3

storage. If using this solution, this is the ACCESS_KEY or

AWS_ACCESS_KEY_ID

loki_s3_secret_key                              The recommended log storage solution is AWS S3 or compatible S3

storage. If using this solution, this is the SECRET_KEY or

AWS_SECRET_ACCESS_KEY

5. Once done, click on Save Changes and wait for the message Changes were saved to appear.

6. Click on Open Terraform File and choose the CambriaClusterValues_IMPORTANT_VALUES.tf file.

7. Using the UI, edit the fields accordingly. Reference the following table for values that should be changed:

Terraform UI Editor                          Explanation

max_ftc_instances                            The maximum number of encoders that the kubernetes cluster can

have up and running

cambria_cluster_replicas                     The maximum number of Cambria management + replica machines to

have up and running.

host_name                                    One way to expose the main Cambria applications is to use an ingress.

This information is needed to connect a real domain and TLS certificate

acme_registration_email                      to the ingress. The default values are only usable under a test

environment.

acme_server

loki_storage_type                            This is for deciding what type of storage to use for Loki logs. It is

recommended to use an S3 compatible storage like AWS S3. For testing

purposes only, there is a filesystem version of the Loki log storage

deployment. For this, change this to local

loki_local_storage_size_gi                   This option is only used for the local loki_storage_type. This is how

many GB the Loki log volume should be. Volumes can fill up quickly so

testing different volume sizes may be required.

loki_s3_bucket_name                          This option should be changed if using the s3_embedcred

loki_storage_type. This is the name of the S3 compatible bucket to

write logs to

loki_s3_region                               This option should be changed if using the s3_embedcred

loki_storage_type. This is the region where the S3 bucket is located

loki_log_retention_period                    This is the number of days to retain Loki logs in the storage device. By

default, this is set to 7 days.

8. Once done, click on Save Changes and wait for the message Changes were saved to appear.
9. (Optional) Skip this section if no optional values are needed. Click on Open Terraform File and choose the
CambriaClusterValues_OPTIONAL_VALUES.tf file. Using the UI, edit the fields accordingly. Reference the

following table for values that should be changed:

Terraform UI Editor                       Explanation

workersUseGPU                             [ BETA ] This must be set to true if planning to use NVENC capabilities

on the encoding machines. This is set to false by default.

nbGPUs                                    The max number of GPUs to use from the encoding machines if GPU

functionality is enabled. This value should not exceed the amount of

GPUs available

ftc_enable_scriptable_workflow            This is used to enable / disable the FTC scriptable workflow feature. By

default, this is disabled.

enable_manager_webui                      If enabled, this allows users to use Cambria Clusterr's Web UI.

Otherwise, only the REST API server can be used to interact with Cambria

Cluster.

ftc_encoding_slots                        When a Cambria FTC worker node is connected to Cambria Cluster, this is

the max number of encoding jobs it can run concurrently by default.

expose_capella_service_externally         This option tells the deployment to create load balancers to publicly

expose the Capella application

ftc_license_mode                          The license mode for Cambria Cluster and FTC instances. Do not change

this value unless instructed by Capella.

enable_eventing                           This enables / disables the argo-events event-based system. By default,

this is enabled (true).

install_monitoring                        This controls whether monitoring features (prometheus, grafana) should

be installed. Do not change this value unless instructed by Capella.

install_loki                              This controls whether the Loki logs feature should be installed. Do not

change this value unless instructed by Capella.

expose_grafana                            This option tells the deployment to make the Grafana dashboard

accessible publicly via a load balancer

loki_replicas                             This option should only be changed if using the s3_embedcred

loki_storage_type. This is the number of Loki pod replicas to use for

handling log requests. At least 2 replicas need to be active for Loki to

work properly. Also, there should be at least the same amount of nodes

running to cover the number of replicas specified here.

loki_max_unavailable                      This option should only be changed if using the s3_embedcred

loki_storage_type. This is how many Loki pods can be taken down when

performing upgrades. For simplicity, this value should be loki_replicas + 1

### 10. Once done, click on Save Changes and close the UI

### 11. Close the TerraformVariableEditor window

### 2.2. Deploy Applications

1. Save the configured values to a .tfvars file:

```text
terraform-docs tfvars hcl . --description --sort=false --output-file=cambriaftc.auto.tfvars --output-mode=replace
--output-template="{{ .Content }}"
```

2. Run the following commands to create a terraform plan. Follow the prompts on the terminal window:

```text
sudo terraform init && sudo terraform plan
```

3. Run the following command to create the kubernetes cluster:

```text
sudo terraform apply -auto-approve
```

Also, as a result of an issue with the ingress deployment, this command will need to run after the deployment

completes so that the ingress installs properly:

```text
sudo terraform apply -auto-approve -replace=null_resoure.config_ingress[0]
```

4. If deployment completes successfully, Store the following files in a private location:

```text
-​   terraform.tfstate
-​   cambriaftc.auto.tfvars
```

These files are needed in order to make any changes to the created kubernetes cluster.

# Installation Verification

1. Verify Cambria Cluster Deployment
Important: The components below are only a subset of the whole installation. These are the components

considered as key to a proper deployment.

1. Run the following command:

```text
sudo k8s kubectl get all -n capella-manager
```

2. Verify the following information:

Resources            Content

Deployments          - 1 cambriaclusterapp deployment with all items active

- 1 cambriaclusterwebui deployment with all items active

Pods                 - X pods with cambriaclusterapp in the name (X = # of replicas specified in config file)

with all items active / Running

- 1 pod with cambriaclusterwebui in the name

Services             - 1 service named cambriaclusterservice. If exposeStreamServiceExternally is true,

this should have an EXTERNAL-IP

- 1 service named cambriaclusterwebuiservice. If exposeStreamServiceExternally is

true, this should have an EXTERNAL-IP

3. If any of the above are not in an expected state, wait a few more minutes in case some resources take longer than
expected to complete. If after a few minutes there are still resources in an unexpected state, contact the Capella

support team.

4. Run the following command for the pgcluster configuration:

```text
sudo k8s kubectl get all -n capella-database
```

5. Verify the following information:

Resources            Content

Pods                 - X pods with pgcluster in the name (X = # of replicas specified in config file) with all items

active / Running

Services             - 3 services with pgcluster in the name with a CLUSTER-IP assigned

2. Verify Cambria FTC Deployment
Important: The components below are only a subset of the whole installation. These are the components

considered as key to a proper deployment.

1. Run the following command:

```text
sudo k8s kubectl get all -n capella-worker
```

2. Verify the following information:

Resources                Content

Pods                     - X pods with cambriaftcapp in the name (X = Max # of FTCs specified in the

config file)

Note:

Y of the pods should be in an active / running state and all containers running (Y =

```text
# of Cambria FTC nodes active)
```

Deployments              - 1 cambriaftcapp deployment.

3. If any of the above are not in an expected state, wait a few more minutes in case some resources take longer than
expected to complete. If after a few minutes there are still resources in an unexpected state, contact the Capella

support team.

3. Verify Applications are Accessible
### 3.1. Cambria Cluster WebUI

Skip this step if the WebUI was set to disabled in the Helm values configuration yaml file or the ingress

will be used instead. For any issues, contact the Capella support team.

1. Get the WebUI address. A web browser is required to access the WebUI:

Option 1: External Url if External Access is Enabled

Run the following command:

```text
sudo k8s kubectl get svc/cambriaclusterwebuiservice -n capella-manager
-o=jsonpath="{'https://'}{.status.loadBalancer.ingress[0].ip}{':8161'}{'\n'}"
```

The response should look something like this:

https://192.122.45.33:8161

Option 2: Non-External Url Access

Run the following command to temporarily expose the WebUI via port-forwarding:

```text
sudo k8s kubectl port-forward -n capella-manager svc/cambriaclusterwebuiservice 8161:8161
--address=0.0.0.0
```

The url depends on the location of the web browser. If the web browser and the port-forward are on the

same machine, use localhost. Otherwise, use the ip address of the machine with the port-forward:

https://`<server>`:8161

2. In a web browser, enter the above url. This should trigger an "Unsafe" page similar to the one below:
3. Click on Advanced and Proceed to [ EXTERNAL IP ] (unsafe). This will show the login page.

4. Log in using the credentials created in the Installation section

### 3.2. Cambria Cluster REST API

Skip this step if the ingress will be used instead of external access or any other type of access. For any

issues, contact the Capella support team.

### 1. Get the REST API address:

Option 1: External Url if External Access is Enabled

Run the following command:

```text
sudo k8s kubectl get svc/cambriaclusterservice -n capella-manager
-o=jsonpath="{'https://'}{.status.loadBalancer.ingress[0].ip}{':8650'}{'\n'}"
```

The response should look something like this:

https://192.122.45.33:8650

Option 2: Non-External Url Access

Run the following command to temporarily expose the REST API via port-forwarding:

```text
sudo k8s kubectl port-forward -n capella-manager svc/cambriaclusterservice 8650:8650
--address=0.0.0.0
```

The url depends on the location of the port-forward. If the web browser and the port-forward are on the

same machine, use localhost. Otherwise, use the ip address of the machine with the port-forward:

https://`<server>`:8650

2. Run the following API query to check if the REST API is active:

```text
curl -k -X GET https://<server>:8650/CambriaFC/v1/SystemInfo
```

### 3.3. Cambria License

The Cambria license needs to be active in all entities where the Cambria application is deployed. Run the following

steps to check the cambria license. Access to a web browser is required:

### 1. Get the url for the License Manager WebUI:

Option 1: External Url if External Access is Enabled

Run the following command:

```text
sudo k8s kubectl get svc/cambriaclusterwebuiservice -n capella-manager
-o=jsonpath="{'https://'}{.status.loadBalancer.ingress[0].ip}{':8481'}{'\n'}"
```

The response should look something like this:

https://192.122.45.33:8481

Option 2: Non-External Url Access

Run the following command to temporarily expose the License WebUI via port-forwarding:

```text
sudo k8s kubectl port-forward -n capella-manager svc/cambriaclusterwebuiservice 8481:8481
--address=0.0.0.0
```

The url depends on the location of the port-forward. If the web browser and the port-forward are on the same

machine, use localhost. Otherwise, use the ip address of the machine with the port-forward:

https://`<server>`:8481

2. In a web browser, enter the above url. This should trigger an "Unsafe" page similar to the one below:
3. Click on Advanced and Proceed to [ EXTERNAL IP ] (unsafe). This will show the login page.

4. Log in using the same credentials as the Cambria Cluster Web UI. These credentials can also be found by running
the following command:

```text
./bin/getFtcInfo.sh
```

5. Verify that the License Status is valid for at least either the Primary or Backup. Preferably, both Primary and
Backup should be valid. If there are issues with the license, wait a few minutes as sometimes it takes a few minutes

to properly update. If still facing issues, contact the Capella support team.

### 3.4. Cambria Monitoring: Grafana Web UI

Skip this step if the ingress will be used instead of external access or any other type of access. For any

issues, contact the Capella support team.

### 1. Get the Grafana Web UI address:

Option 1: External Url if External Access is Enabled

Run the following command:

```text
sudo k8s kubectl get svc/grafanalbservice -n monitoring
-o=jsonpath="{'http://'}{.status.loadBalancer.ingress[0].ip}{':3000'}{'\n'}"
```

The response should look something like this:

http://192.122.45.33:3000

Option 2: Non-External Url Access

Run the following command to temporarily expose the Grafana Web UI via port-forwarding:

```text
sudo k8s kubectl port-forward -n monitoring svc/grafanalbservice 3000:3000 --address=0.0.0.0
```

The url depends on the location of the port-forward. If the web browser and the port-forward are on the same

machine, use localhost. Otherwise, use the ip address of the machine with the port-forward:

http://`<server>`:3000

2. In a web browser, enter the above url. This should trigger an "Unsafe" page similar to the one below:

3. Click on Advanced and Proceed to [ EXTERNAL IP ] (unsafe). This will show the login page.

4. Log in using the credentials specified in your values file. You can also get the credentials by running this command:

```text
./bin/getFtcInfo.sh
```

### 3.5. Cambria Ingress

Skip this step if not planning to test with Cambria's ingress. For any issues, contact the Capella support

team.

3.5.1. Get the Ingress Endpoints

There are two ways to use the ingress:

Option 1: Using Default Testing Ingress

Only use this option for testing purposes. Skip to option 2 for production. In order to use the

ingress in the testing state, the hostname needs to be DNS resolvable on the machines that will need

access to the Cambria applications.

### 1. Get the ingress HOSTS and ADDRESS:

```text
sudo k8s kubectl get ingress -A
```

The response should look similar to the following:

NAMESPACE           NAME                     CLASS HOSTS                      ADDRESS     PORTS

AGE

default         cambriaclusterciliumingress   cilium api.myhost.com,webui.myhost.com

55.99.103.99 80, 443 5d17h

kubernetes-dashboard kubernetesciliumingress        cilium dashboard.myhost.com

55.99.103.99 80, 443 5d17h

monitoring        cambriamonitoringciliumingress cilium monitoring.myhost.com         55.99.103.99

80, 443 15h

2. In your local server(s) or any other server(s) that need to access the ingress, edit the hosts file (in
Linux, usually /etc/hosts) and add the following lines (Example):

```text
55.99.103.99         api.myhost.com
55.99.103.99         webui.myhost.com
55.99.103.99         monitoring.myhost.com
55.99.103.99        dashboard.myhost.com
```

Option 2: Using Publicly Registered Domain (Production)

Contact Capella if unable to set up a purchased domain with the ingress. If the domain is set up,

the endpoints needed are the following:

Example with mydomain.com as the domain:

```text
REST API:                https://api.myhost.com
WebUI:                   https://webui.myhost.com
Grafana Dashboard:       https://monitoring.myhost.com
```

Kubernetes Dashboard: https://dashboard.myhost.com

3.5.2. Test Ingress Endpoints

If using the test ingress, these steps can only be verified in the machine(s) where the hosts file was

modified. This is because the test ingress is not publicly DNS resolvable and so only those whose

hosts file (or DNS) have been configured to resolve the test ingress will be able to access the

Capella applications in this way.

1. Test Cambria Cluster WebUI with the ingress that starts with webui. Run steps 2-4 of Cambria Cluster
WebUI.

Example:

https://webui.myhost.com

2. Test Cambria REST API with the ingress that starts with api. Run step 2 of Cambrai Cluster REST API.

Example:

https://api.myhost.com/CambriaFC/v1/SystemInfo

3. Test Grafana Dashboard with the ingress that starts with monitoring. Run steps 2-4 of Cambria Monitoring:
Grafana Web UI.

Example:

https://monitoring.myhost.com

### 4. Test the Kubernetes Dashboard with the ingress that starts with dashboard.

Example:

https://dashboard.myhost.com

You can get the bearer token that is needed to login by running the following command:

```text
sudo k8s kubectl -n kubernetes-dashboard create token admin-user
```

# Testing Cambria FTC / Cluster

The following guide provides information on how to get started testing the Cambria FTC / Cluster software:

https://www.dropbox.com/scl/fi/4c03qwdg7xeb7hvfy24k1/Cambria_Cluster_and_FTC_5_8_0_Kubernetes_User_Guide.pdf?rlkey=jhwtqvbf409lquxg7k2awkq9h&st=vefbg1rj&dl=0

# Upgrading / Updating

Upgrade Kubernetes Cluster

This option is only used for upgrading the Kubernetes cluster to a new version. Skip this step if you only need to

upgrade Cambria FTC / Cluster.

Important: Node Upgrade

The steps in this section need to be run on every node that is part of the Kubernetes Cluster. Just upgrading the

Kubernetes Host will not automatically upgrade the other worker nodes.

1. If not already known, get the name of the Canonical Kubernetes version to upgrade to:

```text
sudo snap info k8s
```

2. Using the name of the Canonical Kubernetes version, run this command to perform the upgrade:

```text
sudo snap refresh --channel=1.35-classic/stable k8s
```

3. Verify the upgrade went through and the Kubernetes Cluster is ready:

```text
sudo snap info k8s && sudo k8s status --wait-ready
```

You should see the new Kubernetes version (example):

name:     k8s

...

```text
snap-id:    ADBD1SffBBNas2dFNbaxdb6osBvA5Hm
tracking:   1.35-classic/stable
```

refresh-date: 5 days ago, at 10:37 PDT

...

Upgrade Cambria FTC / Cluster and Dependencies

This is the default way to perform an upgrade for anything from updating license keys, Cambria version, etc.

Important

in cases where the Cambria installation / upgrade isn't working and is in an unrecoverable state, run this command

in the Kubernetes Host before running the steps in this section:

```text
sudo k8s helm uninstall capella-cluster --wait
```

WARNING: THIS COMMAND WiLL DELETE THE CAMBRIA DATABASE. PLEASE SAVE ANY PROJECT FILES, CONFIG

FILES, CREDENTIALS, ETC BEFORE RUNNING IT

1. Verify that you have access to the Kubernetes Host server and also to the Cambria Cluster Package. See
sections Download Cambria FTC Package and Create Cluster Base for more information

2. Download / Paste your cambriaftc.auto.tfvars and terraform.tfstate files that were used for the Kubernetes
cluster deployment to the Kubernetes Host (if not already there)

3. In the Kubernetes Host, run the following command to update the Cambria Cluster config variables with the
values from the .tfvars file:

```text
./bin/updateTfValuesFromTfvars.sh cambriaftc.auto.tfvars
```

4. Follow the steps in section Deploy Cambria Cluster, FTC, and Monitoring to edit the configuration files and re-deploy
the applications with the new changes

5. Skip this step if you ran the steps in the Important section. Restart the Cambria Cluster and FTC
deployments:

```text
sudo k8s kubectl rollout restart deployment cambriaclusterwebui cambriaclusterapp -n capella-manager
sudo k8s kubectl rollout restart deployment cambriaftcapp -n capella-worker
```

6. Re-verify Cambria FTC / Cluster are properly upgraded / updated (See section Installation Verification)
# Resource Cleanup / Deletion

Many resources are created in a Kubernetes environment. It is important that each step is followed carefully

1. Delete Cambria Deployment
1. Verify that you have access to the Kubernetes Host server and also to the Cambria Cluster Package. See
sections Download Cambria FTC Package and Create Cluster Base for more information

2. Download / Paste your cambriaftc.auto.tfvars and terraform.tfstate files that were used for the Kubernetes
cluster deployment to the Kubernetes Host (if not already there)

3. In the Kubernetes Host, run the following command to update the Cambria Cluster config variables with the
values from the .tfvars file:

```text
./bin/updateTfValuesFromTfvars.sh cambriaftc.auto.tfvars
```

4. Run the following command to destroy the kubernetes cluster:

```text
sudo terraform init && sudo terraform apply -destroy -auto-approve
```

### 2. Remove Kubernetes Nodes

1. In the Kubernetes Host, get a list of all of the nodes in the cluster:

```text
sudo k8s kubectl get nodes
```

2. Choose the name of the node to remove and run this command:

```text
sudo k8s remove-node <node-name>
```

3. In the node that was removed, run this command to remove k8s:

```text
sudo snap remove k8s --purge
```

### 4. Remove any saved credentials from k8s:

```text
sudo rm -rf /etc/k8sd/* && sudo rm -rf /var/lib/k8sd/*
```

### 5. Reboot the machine to refresh it:

```text
sudo reboot
```

6. Repeat steps 1-5 for all of the nodes to remove
3. Delete Kubernetes Cluster
To remove the kubernetes cluster completely, do the following:

1. It is recommended to remove all kubernetes nodes from the cluster first

2. Run this command to remove k8s from the Kubernetes Host:

```text
sudo snap remove k8s --purge
```

### 3. Remove any saved credentials from k8s:

```text
sudo rm -rf /etc/k8sd/* && sudo rm -rf /var/lib/k8sd/*
```

### 4. Reboot the machine to refresh the system:

```text
sudo reboot
```

Quick Reference: Helpful Commands/Info for After

# Installation

This section provides helpful commands and other information that may be useful after the installation process

such as how to get the WebUI address, what ports are available to use for incoming sources, etc.

Get Longhorn UI URL

In the Kubernetes Host, expose the longhorn-frontend

```text
sudo k8s kubectl -n longhorn-system port-forward service/longhorn-frontend 8080:80 --address=0.0.0.0
```

In a web browser, go to the following url:

http://`<kubernetes-host>`:8080

The UI should look like this:

Get Kubernetes Dashboard URL

This is only available through the ingress. See Enable Cambria Ingress for how to set this up

1. Go to the kubernetes dashboard using the ingress (Eg. https://dashboard.myhost.com)

2. In the Kubernetes Host, run this command to get a Bearer Token:

```text
sudo k8s kubectl -n kubernetes-dashboard create token admin-user
```

Get Cambria Cluster WebUI URL (via kubectl)

1. Run the following command to get the webui address:

```text
sudo k8s kubectl get service/cambriaclusterwebuiservice -n capella-manager
-o=jsonpath="{'https://'}{.status.loadBalancer.ingress[0].ip}{':8161'}"
```

2. To log in to the WebUI, the credentials are located in the my-values.tfvars file that was created during
installation. The variable is cambria_cluster_web_ui_user. See Configure the Kubernetes Cluster for more

information

Get Cambria Cluster WebUI URL (via Kubernetes Dashboard)

1. In the Kubernetes Dashboard for the cluster, go to Services and look for the cambriaclusterwebuiservice
service. Copy the IP address of one of the External Endpoints

2. The WebUI address should be https://[ EXTERNAL IP ]:8161. To log in to the WebUI, the credentials can be
retrieved by running the following:

```text
./bin/getFtcInfo.sh
```

Get Cambria Cluster REST API URL (via kubectl)

1. Run the following command to get the base REST API Web Address:

```text
sudo k8s kubectl get service/cambriaclusterservice -n capella-manager
-o=jsonpath="{'https://'}{.status.loadBalancer.ingress[0].hostname}{':8650'}"
```

The REST API url should look similar to this:

https://23-45-226-151.ip.linodeusercontent.com:8650/CambriaFC/v1/Jobs?usertoken=12345678-1234-43f8-b4fc-53afd3893d5f

Get Cambria Cluster REST API URL (via Kubernetes Dashboard)

1. In the Kubernetes Dashboard for the cluster, go to Services and look for the cambriaclusterservice
service. Copy the IP address of one of the External Endpoints

The REST API should look similar to this:

https://23-45-226-151.ip.linodeusercontent.com:8650/CambriaFC/v1/Jobs?usertoken=12345678-1234-43f8-b4fc-53afd3893d5f

Get Cambria FTC Instance External IP

1. In the Cambria Cluster WebUI, go to the Machines tab and copy the name of the machine (pod)

2. Run the following commands with the name of the machine (aka. `<pod-name>`):

```text
# Replace <pod-name> with your pod name
sudo k8s kubectl get pod/<pod-name> -n capella-worker -o=jsonpath={.spec.nodeName}
```

```text
# Replace <node-name> with the result from the above command
sudo k8s kubectl get node/<node-name> -n capella-worker -o=jsonpath={.status.addresses[1].address}
```

Add Label to Specific Node

```text
sudo k8s kubectl label node/<node-name> "<label-name>=<label-value>"
```

Example:

```text
sudo k8s kubectl label node/my-node "capella-worker=true"
```

Remove Label for Specific Node

```text
sudo k8s kubectl label node/<node-name> "<label-name>-"
```

Example:

```text
sudo k8s kubectl label node/my-node "capella-worker-"
```

Get Leader Cambria Cluster Pod Name

Run the following command to get the name of the Cambria Cluster leader pod:

```text
sudo k8 kubectl get lease -n capella-manager -o=jsonpath="{.items[0].spec.holderIdentity}"
```

Remote Access a Kubernetes Pod

The general command for remote accessing a pod is:

```text
sudo k8s kubectl exec -it <pod-name> -n <namespace> -- /bin/bash
```

Example with Cambria FTC:

```text
sudo k8s kubectl exec -it cambriaftcapp-5c79586784-wbfvf -n capella-worker -- /bin/bash
```

Extract Cambria Cluster | Cambria FTC | Cambria License Logs

In a machine that has kubectl and the kubeconfig file for your Kubernetes cluster, open a terminal window and

make sure to set the KUBECONFIG environment variable to the path of your kubeconfig file. Then run one or

more of the following commands depending on what types of logs you need (or that Capella needs). You will get

a folder full of logs. Compress these logs into one zip file and send it to Capella:

`<pod-name>`: the name of the pod to grab logs from (Eg. cambriaftcapp-5c79586784-wbfvf)

Cambria FTC:

```text
sudo k8s kubectl cp <pod-name>:/opt/capella/Cambria/Logs ./CambriaFTCLogs -n capella-worker
```

Cambria Cluster:

```text
sudo k8s kubectl cp <pod-name>:/opt/capella/CambriaCluster/Logs ./CambriaClusterLogs -n
capella-manager
```

Cambria License Manager (Cambria FTC):

```text
sudo k8s kubectl cp <pod-name>:/opt/capella/CambriaLicenseManager/Logs ./CambriaFTCLicLogs -n
capella-worker
```

Cambria License Manager (Cambria Cluster):

```text
sudo k8s kubectl cp <pod-name>:/opt/capella/CambriaLicenseManager/Logs ./CambriaClusterLicLogs -n
capella-manager
```

Copy File(s) to Cambria FTC / Cluster Pod

In some cases, you might need to copy files to a Cambria FTC / Cluster pod. For example, you have an MP4 file

you want to use as a source directly from the encoding machine’s file system. In this case, to copy the file over

to the Cambria FTC / Cluster pod, do the following:

```text
sudo k8s kubectl cp <host-file-path> <pod-name>:<path-inside-container> -n <namespace>
```

Example:

```text
# Copy file to Cambria FTC pod
sudo k8s kubectl cp /mnt/n/MySource.mp4 cambriaftcapp-7c55887db9-t42v7:/var/media/MySource.mp4
-n capella-worker
```

```text
# Copy file to Cambria Cluster pod
sudo k8s kubectl cp C:\MyKeys\MyKeyFile.key
cambriaclusterapp-695dcc848f-vjpc7:/var/keys/MyKeyFile.key -n default
```

```text
# Copy directory to Cambria FTC container
sudo k8s kubectl cp /mnt/n/MyMediaFiles cambriaftcapp-7c55887db9-t42v7:/var/temp/mediafiles -n
capella-worker
```

Restart / Re-create Pods

Kubectl does not currently have a way to restart pods. Instead, a pod will need to be “restarted” by deleting the pod

which causes a new pod to be created / existing pod to take over the containers.

```text
sudo k8s kubectl delete pod <pod-name> -n <namespace>
```

Example:

```text
# Delete Cambria FTC Container
sudo k8s kubectl delete pod cambriaftcapp-7c55887db9-t42v7 -n capella-worker
```

```text
# Delete Cambria Cluster Container
sudo k8 kubectl delete pod cambriaclusterapp-695dcc848f-vjpc7 -n default
```

# Troubleshooting

Canonical Installation Bootstrap Problem

When trying to run this command:

```text
sudo k8s bootstrap
```

And you get this error:

bootstrap config verification failed: pre-init checks failed for node: The path '/run/containerd' required for the

containerd socket already exists. This may mean that another service is already using that path, and it conflicts

with the k8s snap. Please make sure that there is no other service installed that uses the same path, and remove

the existing directory.(dev-only): You can change the default k8s containerd base path with the containerd-base-dir

option in the bootstrap / join-cluster config file.

In this case, it means another container-based service is installed in the machine. For this on-premise installation to

work, no other services like Docker should be installed / running.

Failed to Join Cluster (Join Token Name)

If when trying to connect a node to the Kubernetes Cluster and you get this error:

Error: Failed to join the cluster using the provided token.

The error was: failed after potential retry: wait check failed: failed to POST /k8sd/cluster/join: failed to join k8sd

cluster as control plane: 1 join attempts were unsuccessful. Last error: Joining server certificate SAN does not

contain join token name

This can mean one of the following:

   a. The token provided is incorrect, old, or expired

   b. The hostname provided to the Kubernetes host is incorrect

Both of these conditions need to be false in order for the node to join the Kubernetes cluster successfully

Failed to Join Cluster (Cluster Certificate Token Does Not Match)

If when trying to connect a node to the Kubernetes Cluster and you get this error:

Error: Failed to join the cluster using the provided token.

The error was: failed after potential retry: wait check failed: failed to POST /k8sd/cluster/join: failed to join k8sd

cluster as control plane: Cluster certificate token does not match that of cluster member. Expected:

"xxxxxxxxxxxxxx", actual: "yyyyyyyyyyyyyyyyyyyy"

In this case, most likely there are old credentials still in the system that need to be cleaned up. Run these two

commands:

```text
sudo rm -rf /etc/k8sd/* && sudo rm -rf /var/lib/k8sd/*
```

Failed to Deploy Load Balancer

If when trying to enable the load balancer, you keep getting this error after more than two minutes:

Failed to deploy MetalLB, the error was: failed to enable LoadBalancer: failed to apply MetalLB LoadBalancer

configuration: failed to upgrade metallb-loadbalancer: failed to create resource: Internal error occurred: failed

calling webhook "l2advertisementvalidationwebhook.metallb.io": failed to call webhook: Post

"https://metallb-webhook-service.metallb-system.svc:443/validate-metallb-io-v1beta1-l2advertisement?timeout=1

0s": dial tcp 10.152.183.245:443: connect: operation not permitted

This could be an issue with IPv6. Make sure that IPv6 is enabled on the machine. This is required for the load balancer

setting to work. See Enable IPv6 on Host Machines for enabling IPv6.

Once this is done, if the load-balancer is 'enabled', disable it with this command:

```text
sudo k8s disable load-balancer
```

And then repeat the steps in Enable Load Balancers to re-enable it.

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
