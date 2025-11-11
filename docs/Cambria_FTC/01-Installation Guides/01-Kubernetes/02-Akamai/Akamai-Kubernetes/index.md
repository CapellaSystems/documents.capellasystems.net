---
id: cambria-cluster-ftc-5-6-akamai-kubernetes
title: Cambria Cluster / FTC 5.6.0 — Akamai Cloud Kubernetes Help Documentation
sidebar_position: 1
---
ahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
# Cambria Cluster / FTC 5.6.0 — Akamai Cloud Kubernetes Help Documentation

## Document History

| Version | Date       | Description                                   |
|--------:|------------|-----------------------------------------------|
| 5.5.0   | 04/11/2025 | Updated for release 5.5.0.23529 (Linux)       |
| 5.6.0   | 10/31/2025 | Updated for release 5.6.0.26533 (Linux)       |

> *Download the online version of this document for the latest information and latest files. Always download the latest files.*

Do not move forward with the installation process if you do not agree with the End User License Agreement (EULA) for our products. You can download and read the EULA for Cambria FTC, Cambria Cluster, and Cambria License Manager from the links below:

- **Cambria Cluster** — <https://www.dropbox.com/s/oemlax63aatjjiw/EULA_Cluster.pdf?dl=0>  
- **Cambria FTC** — <https://www.dropbox.com/s/ualv9usxsowh6m2/EULA_FTC.pdf?dl=0>  
- **Cambria License Manager** — <https://www.dropbox.com/s/1wg7ee7a59kzi8h/EULA_Cambria_License_Manager.pdf?dl=0>

### Limitations and Security Information

Cambria FTC, Cluster, and License Manager are installed on Linux Docker containers. Limitations and security checks for this version are included in the Linux document below (**informational only**; Kubernetes setup starts in **3. Create Kubernetes Cluster**).

- **Cambria FTC / Cluster (sections 8 and 9):**  
  <https://www.dropbox.com/scl/fi/rvf02h8tajsxrfbhpgmzy/Linux_Cambria_FTC_5_6_0_Guide.pdf?rlkey=gtqeowx2b9gartth8s6dwo95j&st=4wpy1dfi&dl=0>

> **Information:** This document references **Kubernetes 1.34** only.

---

## ⚠️ Critical Information: Read Before Proceeding with Installation

1. **A New Kubernetes Cluster Will Be Deployed** — creates a brand‑new cluster to isolate the Cambria ecosystem.  
2. **Default Installation is Non‑Secure** — the guide covers an open environment by default. Secure/custom setups require Akamai Cloud expertise; see **1.5 Firewall Information**.  
3. **Understand Your Transcoding Requirements** — expected volume, I/O specs, GPU need; see **1.3 Akamai Cloud Machine Information and Benchmark**.  
4. **Administrative Rights Required** — steps require admin rights in Akamai Cloud.  
5. **Check Akamai Cloud Account Quota** — ensure quotas cover k8s resources; see **1.2 Resource Usage**.  
6. **A Separate Linux Machine is Required** — dedicated deployment box is strongly recommended.  
7. **Verify Region‑Specific Resource Availability** — some regions lack certain resources (e.g., GPUs).

---

## Document Overview

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

### 1.1. Cambria Cluster / FTC Kubernetes Deployment

There are two major applications involved in this installation: **Cambria Cluster** and **Cambria FTC**.

**Cambria Cluster** (recommended **replicas = 3**, one leader + two replicas). Each Cambria Cluster pod includes three containers:

1. **Cambria Cluster** (application)  
2. **Leader Elector** — chooses which pod is the leader  
3. **Cambria FTC Autoscaler** — when enabled, automatically deploys worker nodes based on queued jobs, using the (rounded down) calculation:  
   \
   **Number of Nodes to Deploy = (Number of Queued Jobs + 2) / 3**

A **PostgreSQL** database runs on a separate pod for each active Cambria Cluster pod. Data is replicated for resiliency.

**Cambria FTC** (worker nodes): Each FTC pod includes three containers:

1. **Cambria FTC** (application)  
2. **Auto‑Connect FTC** (.NET tool) — lists pods, finds Cambria Cluster, and connects the FTC to the Cluster. If no Cluster is found within ~20 minutes, the node pool is deleted or recycled.  
3. **pgcluster** — stores the encoder job’s contents for as long as the pod is running.

> Each Kubernetes node runs **either** the Cluster deployment **or** the FTC deployment.

### 1.2. Resource Usage

General resource usage (varies by environment):

- **NodeBalancers:** 0–3 (Manager WebUI, Manager Web Server, Grafana) and 0–1 (Ingress)  
- **Nodes:** X Cambria Manager instances (default 3), Y Cambria FTC instances (default max 20)  
- **Networking:** No VPCs created by default  
- **Security:** No firewalls by default (Akamai LKE node firewalls can be applied)

Akamai LKE documentation: <https://techdocs.akamai.com/cloud-computing/docs/getting-started-with-lke-linode-kubernetes-engine>

### 1.3. Akamai Cloud Machine Information and Benchmark (as of Oct 2025)

**Benchmark job**: Source TS H.264 1080p30 → HLS/TS H.264 (1080p/4 Mbps, 720p/2.4 Mbps, 480p/0.8 Mbps, 320x240/0.3 Mbps). I/O to Akamai ObjectStorage impacts real‑time speed.

#### a) g6-dedicated-16 (AMD EPYC 7713)

- **Machine:** Dedicated 32GB RAM, 16 vCPU, 640GB storage, 7TB transfer, 40Gbps/7Gbps, **$0.432/hr (10/15/2025)**  
- **Benchmark:** 2 concurrent jobs → ~0.65× RT per job (throughput ~1.30× RT); CPU ~100%

#### b) g6-dedicated-56 (AMD EPYC 7713)

- **Machine:** Dedicated 256GB RAM, 56 vCPU, 5000GB storage, 11TB transfer, 40Gbps/11Gbps, **$3.456/hr (05/28/2024)**  
- **Benchmark:** 2 concurrent jobs → ~1.56× RT per job (throughput ~3.12× RT); CPU ~90%

**Finding:** g6‑dedicated‑56 has higher throughput; g6‑dedicated‑16 is more cost‑efficient per hour.

### 1.4. Cambria Application Access

#### 1.4.1. External Access via TCP Load Balancer

Default installation exposes: **(1)** Manager WebUI + License Manager, **(2)** Web/REST API Server.

Examples:

- **Cambria Manager WebUI:** `https://44.33.212.155:8161`  
- **Cambria REST API:** `https://121.121.121.121:8650/CambriaFC/v1/SystemInfo`

External access can be toggled in Helm values; see **4.2 Creating and Editing Helm Configuration File**.

#### 1.4.2. HTTP Ingress via Reverse Proxy

Expose a single public IP/domain using subdomains:

- **WebUI:** `https://webui.mydomain.com`  
- **REST API:** `https://api.mydomain.com`  
- **Grafana:** `https://monitoring.mydomain.com`

> Capella provides a default testing hostname (not for production). For production, configure your own hostname, certificate, etc.

### 1.5. Firewall Information

| Port(s) | Protocol | Direction | Description |
|--------:|:--------:|:---------:|-------------|
| 8650 | TCP | Inbound | Cambria Cluster REST API |
| 8161 | TCP | Inbound | Cambria Cluster WebUI |
| 8678 | TCP | Inbound | Cambria License Manager Web Server |
| 8481 | TCP | Inbound | Cambria License Manager WebUI |
| 9100 | TCP | Inbound | Prometheus System Exporter (Cluster) |
| 8648 | TCP | Inbound | Cambria FTC REST API |
| 3100 | TCP | Inbound | Loki |
| 3000 | TCP | Inbound | Grafana |
| 443  | TCP | Inbound | Capella Ingress |
| ALL  | TCP/UDP | Outbound | Allow all outbound traffic |

**Licensing domains** (expose inbound & outbound):  
- `api.cryptlex.com:443` — License Server  
- `cryptlexapi.capellasystems.net:8485` — License Cache  
- `cpfs.capellasystems.net:8483` — License Backup

### 1.6. Specifications for Linux Deployment Server

Minimum recommended (Capella tests with **Dedicated 4GB / g6-dedicated-2**):

| Item | Spec |
|---|---|
| OS | Ubuntu 24.04 |
| CPU(s) | 2 |
| RAM | 2 GB |
| Storage | 10 GB |

> Commands assume **root**.

---

## 2. Prerequisites

### 2.1. Linux Tools

Install `curl`, `unzip`, and `jq` (Ubuntu 24.04 example):

```bash
sudo apt update && \
sudo DEBIAN_FRONTEND=noninteractive apt -o Dpkg::Options::="--force-confold" -y upgrade && \
sudo DEBIAN_FRONTEND=noninteractive apt -o Dpkg::Options::="--force-confold" -y install curl unzip jq
```

### 2.2. Cambria FTC Package

Download & unzip:

```bash
curl -o CambriaClusterKubernetesAkamai_5_6_0.zip -L "https://www.dropbox.com/scl/fi/58x4oeiijhf3au3hnit38/CambriaClusterKubernetesAkamai_5_6_0.zip?rlkey=uppqqa29s9yresdk2xk7qh7lt&st=s2mus6im&dl=0"

unzip -o CambriaClusterKubernetesAkamai_5_6_0.zip && chmod +x *.sh ./bin/*.sh
```

> Scripts tested on Ubuntu.

#### 2.2.1. Kubernetes Tools: kubectl, helm, linode‑cli

**Option 1 (script, verified on Ubuntu):**
```bash
./bin/installKubeTools.sh && ./bin/installKubeToolsAkamai.sh
```
> After success, open a new terminal.

**Option 2 (manual):**  
- kubectl — <https://kubernetes.io/docs/tasks/tools/>  
- helm — <https://helm.sh/docs/intro/install/>  
- linode‑cli — <https://techdocs.akamai.com/cloud-computing/docs/install-and-configure-the-cli>

#### 2.2.2. Verification

```bash
kubectl version --client && helm version && linode-cli --version
```

---

## 3. Create Kubernetes Cluster (Akamai LKE)

### 3.1. Create LKE Cluster and Cambria Cluster Node Group

In Akamai Cloud Dashboard → **Kubernetes** → **Create Cluster**:

| Field | Value |
|---|---|
| Cluster Label | e.g., `cambria-cluster` |
| Cluster Tier | LKE (most cases) |
| Region | e.g., **US, Los Angeles (us‑lax)** |
| Kubernetes Version | **1.34** |
| Akamai App Platform | No |
| HA Control Plane | **No** (test) / **Yes** (prod; extra cost) |
| Control Plane ACL | Only if you know allowed CIDRs |

> Do **not** create the cluster yet; add nodegroups first.

#### 3.1.1. Cambria Cluster Nodegroup (Managers)

Recommendation: **Dedicated 8GB**, **Nodes = 3** (1 leader, 2 backups). After creation, label the pool:

- **Label:** `capella-manager=true`

#### 3.1.2. Create Cambria FTC Node Group(s) (Workers)

If not using autoscaler, create worker node pools. Start with one **g6-dedicated-16** instance; label the pool:

- **Label:** `capella-worker=true`

#### 3.1.3. Deploy the Kubernetes Cluster

1. Create the LKE cluster; wait until all nodes show **Running**.  
2. Add labels (see above).  
3. On the Linux Deployment Server, create a kubeconfig file and export it:

```bash
export CLUSTER_NAME=cambria-cluster && nano $CLUSTER_NAME-kubeconfig.yaml
# paste kubeconfig from Akamai dashboard
export KUBECONFIG=$CLUSTER_NAME-kubeconfig.yaml
kubectl get nodes
```

_Example:_

```
NAME                            STATUS   ROLES    AGE   VERSION
lke525068-759150-2bfe0e460000   Ready    <none>   20m   v1.34.0
...
```

4. (Optional) Log in to **Akamai Kubernetes Dashboard** with the copied token.

#### 3.1.4. Default Storage Class

```bash
kubectl patch storageclass linode-block-storage \
  -p '{"metadata": {"annotations": {"storageclass.kubernetes.io/is-default-class": "true"}}}'
```

### 3.2. \[BETA] GPU Operator for NVENC (optional)

> **BETA:** GPU support exists but may not function as expected. **Not compatible** with FTC autoscaler yet.

```bash
helm repo add nvidia https://helm.ngc.nvidia.com/nvidia; \
helm repo update; \
helm install nvidia-operator nvidia/gpu-operator \
  --create-namespace \
  --namespace gpu-operator
```

- Wait ~5 minutes.  
- Check pods: `kubectl get pods -n gpu-operator`  
- Troubleshoot: `kubectl describe pod <pod> -n gpu-operator`

### 3.3. Application Ingress: ingress‑nginx

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.13.0/deploy/static/provider/cloud/deploy.yaml
kubectl get all -n ingress-nginx
```

For production DNS/TLS, see:  
<https://www.dropbox.com/scl/fi/kxt7tnv9q18fqjmjjuwrc/Cambria_Kubernetes_Domain_DNS_Guide.pdf?rlkey=mvm4jnplyji95snq4109noiwj&st=6a7nial5&dl=0>

### 3.4. Performance Metrics and Logging

Install **Prometheus, Grafana, Loki, Promtail**:  
<https://www.dropbox.com/scl/fi/cb75lsh6ipvbf0x1y4ysp/Prometheus_Grafana_Setup_for_Cambria_Cluster_5_6_0_on_Akamai_Kubernetes.pdf?rlkey=kcxit4i6ntj5ynv2e26zydhiy&st=douvkvi9&dl=0>

---

## 4. Install Cambria Cluster, FTC, and Dependencies

### 4.1. Prerequisite: Deploy External Kubernetes Tools

```bash
./bin/deployCambriaKubeDependencies.sh

kubectl get all -n cnpg-system
kubectl get all -n argo-events
kubectl get all -n cert-manager
```

### 4.2. Creating and Editing Helm Configuration File

Create values file and edit:

```bash
helm show values ./config/capella-cluster-0.5.4.tgz > cambriaClusterConfig.yaml
nano cambriaClusterConfig.yaml
```

**Key fields:**

```yaml
workersUseGPU: false         # true if using NVENC/GPU; also set nbGPUs accordingly
nbGPUs: 1
enableManagerWebUI: true
ftcEnableAutoScaler: true
ftcEnableScriptableWorkflow: true
ftcInstanceType: "g6-dedicated-16"
maxFTCInstances: 20

pgInstances: 3
cambriaClusterReplicas: 3

externalAccess:
  exposeStreamServiceExternally: true
  enableIngress: true
  hostName: myhost.com
  acmeRegistrationEmail: test@example.com
  acmeServer: https://acme-staging-v02.api.letsencrypt.org/directory

secrets:
  pgClusterPassword: "CHANGE_ME"
  ftcLicenseKey: "2XXXXX-XXXXXX-XXXXXX-XXXXXX-XXXXXX-XXXXXX"
  cambriaClusterAPIToken: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
  cambriaClusterWebUIUser: "admin,admin,changeme"
  akamaiCloudAPIToken: "AKAMAI_API_TOKEN"
  argoEventWebhookSourceBearerToken: "changeme"

optionalInstall:
  enableEventing: true
```

> Blue items are provided by Capella (release values). Red items are environment‑specific.

### 4.3. Installing Cambria FTC / Cluster

```bash
helm upgrade --install capella-cluster ./config/capella-cluster-0.5.4.tgz --values cambriaClusterConfig.yaml
```

After a few minutes, get deployment info:

```bash
./bin/getFtcInfo.sh
```

---

## 5. Verify Cambria FTC / Cluster Installation

### 5.1. Verify Cambria Cluster Deployment

```bash
kubectl get all -n default
```

**Expect:**

- **Deployments:** `cambriaclusterapp` (active), `cambriaclusterwebui` (active)  
- **Pods:** `cambriaclusterapp-*` (count = replicas), `cambriaclusterwebui-*` (active)  
- **Services:** `cambriaclusterservice` and `cambriaclusterwebuiservice` (EXTERNAL‑IP if external access enabled)

Check database resources:

```bash
kubectl get all -n capella-database
```

**Expect:**

- **Pods:** `pgcluster-*` replicas = config; all Running  
- **Services:** 3 services with `pgcluster` in name (ClusterIP)

### 5.2. Verify Cambria FTC Deployment

```bash
kubectl get all -n capella-worker
```

**Expect:**

- **Pods:** `cambriaftcapp-*`  
  - With autoscaler: most in **Pending** until autoscaler creates nodes  
  - Without autoscaler: Y Running (equals number of active FTC nodes)
- **Deployments:** one `cambriaftcapp`

### 5.3. Verify Applications are Accessible

#### 5.3.1. Cambria Cluster WebUI

**External URL (if enabled):**

```bash
kubectl get svc/cambriaclusterwebuiservice -n default -o=jsonpath="{'https://'}{.status.loadBalancer.ingress[0].hostname}{':8161'}{'\n'}"
```

**Port‑forward (temporary):**

```bash
kubectl port-forward -n default svc/cambriaclusterwebuiservice 8161:8161 --address=0.0.0.0
# URL: https://<server>:8161
```

Proceed past the browser’s unsafe warning and log in using `cambriaClusterWebUIUser` credentials from values.

#### 5.3.2. Cambria Cluster REST API

**External URL (if enabled):**

```bash
kubectl get svc/cambriaclusterservice -n default -o=jsonpath="{'https://'}{.status.loadBalancer.ingress[0].hostname}{':8650'}{'\n'}"
```

**Port‑forward (temporary) & test:**

```bash
kubectl port-forward -n default svc/cambriaclusterservice 8650:8650 --address=0.0.0.0
curl -k -X GET https://<server>:8650/CambriaFC/v1/SystemInfo
```

#### 5.3.3. Cambria License WebUI

**External URL (if enabled):**

```bash
kubectl get svc/cambriaclusterwebuiservice -n default -o=jsonpath="{'https://'}{.status.loadBalancer.ingress[0].hostname}{':8481'}{'\n'}"
```

**Port‑forward (temporary):**

```bash
kubectl port-forward -n default svc/cambriaclusterwebuiservice 8481:8481 --address=0.0.0.0
# URL: https://<server>:8481
```

Proceed past the unsafe warning; sign in with `cambriaClusterWebUIUser`. Ensure License Status is valid (Primary and/or Backup).

#### 5.3.4. Cambria Ingress

##### 5.3.4.1. Get the Ingress Endpoints

```bash
kubectl get ingress -A
```

_Example output:_

```
NAMESPACE    NAME                       CLASS   HOSTS                              ADDRESS      PORTS  AGE
default      cambriaclusteringress      nginx   api.mydomain.com,webui.mydomain.com 55.99.103.99 80,443 23m
monitoring   cambriamonitoringingress   nginx   monitoring.mydomain.com             55.99.103.99 80,443 58m
```

**Option 1 (test only):** Add to `/etc/hosts` on client machines:

```
55.99.103.99  api.mydomain.com
55.99.103.99  webui.mydomain.com
55.99.103.99  monitoring.mydomain.com
```

**Option 2 (production):** Use a publicly registered domain and proper DNS/TLS (see DNS guide above).

##### 5.3.4.2. Test Ingress Endpoints

- WebUI: `https://webui.mydomain.com`  
- REST: `https://api.mydomain.com/CambriaFC/v1/SystemInfo`  
- Grafana: `https://monitoring.mydomain.com`

---

## 6. Testing Cambria FTC / Cluster

See:  
<https://www.dropbox.com/scl/fi/ymu5fln1n811a1i92radv/Cambria_Cluster_and_FTC_5_6_0_Kubernetes_User_Guide.pdf?rlkey=cd0unkt9hcs3mhjp1fjbcvi9n&st=fb030h8o&dl=0>

---

## 7. Updating / Upgrading Cambria Cluster / FTC

### 7.1. Option 1 — Normal Upgrade (Helm Upgrade)

> **Known issues:** `pgClusterPassword` and PostgreSQL version cannot be changed via this method.

```bash
helm upgrade capella-cluster ./config/capella-cluster-0.5.4.tgz --values cambriaClusterConfig.yaml

kubectl rollout restart deployment cambriaclusterapp cambriaclusterwebui -n default
kubectl rollout restart deployment cambriaftcapp -n capella-worker
```

### 7.2. Option 2 — Reinstall (Deletes DB and Jobs)

```bash
helm uninstall capella-cluster --wait
helm upgrade --install capella-cluster ./config/capella-cluster-0.5.4.tgz --values cambriaClusterConfig.yaml
```

### 7.3. Upgrade Verification

Repeat the checks in **5. Verify Cambria FTC / Cluster Installation**.

---

## 8. Deleting Kubernetes Cluster

```bash
helm uninstall capella-cluster -n default --wait
```

If PVs remain:

```bash
kubectl get pv -o name | awk -F'/' '{print $2}' | xargs -I{} kubectl patch pv {} -p='{"spec": {"persistentVolumeReclaimPolicy": "Delete"}}'
```

Delete ingress controller:

```bash
kubectl delete namespace ingress-nginx
```

Uninstall monitoring:

```bash
./bin/quickDestroyMonitoring.sh <install_type>   # 's3_embedcred' or 'local'
```

Delete the LKE cluster in the Akamai console.

---

## 9. Quick Reference: Installation, Testing, and Teardown

### 9.1. Installation (Terraform quick path)

<https://www.dropbox.com/scl/fi/0vhx8634n6s12qjwxw25f/Cambria_Cluster_and_FTC_5_6_0_Terraform_on_Akamai_Kubernetes.pdf?rlkey=xamh1hkjbli55mwfm6gs67tti&st=yp5057bh&dl=0>

### 9.2. Upgrades and Teardown

- **Upgrade helper:**
  ```bash
  ./quickUpgradeCambriaCluster.sh
  ```
- **Uninstall apps only:**
  ```bash
  helm uninstall capella-cluster --wait
  ```
- **Full teardown:** see **8. Deleting Kubernetes Cluster**.

---

## 10. Quick Reference: Helpful Commands / Info (Post‑Install)

**General Cambria FTC Deployment Info**
```bash
./bin/getFtcInfo.sh
```

**Add worker label**
```bash
kubectl label node <node-name> capella-worker=true
```

**Add manager label**
```bash
kubectl label node <node-name> capella-manager=true
```

**Kubeconfig** — copy from Akamai console (Clusters → Kubeconfig).

**Akamai Kubernetes Dashboard**
1. Copy **Token** in your cluster.  
2. Open **Kubernetes Dashboard** and log in with the token.

**WebUI address (kubectl)**
```bash
kubectl get service/cambriaclusterwebuiservice -n default -o=jsonpath="{'https://'}{.status.loadBalancer.ingress[0].hostname}{':8161'}"
```

**WebUI address (Dashboard)**
- Services → `cambriaclusterwebuiservice` → External Endpoint → `https://<EXTERNAL-IP>:8161`

**REST base URL (kubectl)**
```bash
kubectl get service/cambriaclusterservice -n default -o=jsonpath="{'https://'}{.status.loadBalancer.ingress[0].hostname}{':8650'}"
```

**REST base URL (Dashboard)**
`https://<EXTERNAL-IP>:8650/CambriaFC/v1/Jobs?usertoken=<token>`

**FTC pod external IP**
```bash
# get node of the pod
kubectl get pod/<pod-name> -n capella-worker -o=jsonpath={.spec.nodeName}
# get external IP of node
kubectl get node/<node-name> -o=jsonpath={.status.addresses[1].address}
```

**Leader pod**
```bash
kubectl get lease -o=jsonpath="{.items[0].spec.holderIdentity}"
```

**Remote shell**
```bash
kubectl exec -it <pod-name> -n <namespace> -- /bin/bash
```

**Collect logs**
```bash
kubectl cp <pod>:/opt/capella/Cambria/Logs ./CambriaFTCLogs -n capella-worker
kubectl cp <pod>:/opt/capella/CambriaCluster/Logs ./CambriaClusterLogs -n default
kubectl cp <pod>:/opt/capella/CambriaLicenseManager/Logs ./CambriaFTCLicLogs -n capella-worker
kubectl cp <pod>:/opt/capella/CambriaLicenseManager/Logs ./CambriaClusterLicLogs -n default
```

**Copy files into pods**
```bash
kubectl cp /path/to/file <pod>:/path/in/container -n <namespace>
```

**Restart pods (delete to recreate)**
```bash
kubectl delete pod <pod-name> -n <namespace>
```

---

## 11. Glossary (selected)

### 11.1. Kubernetes

For Kubernetes terms, see the official glossary: <https://kubernetes.io/docs/reference/glossary/?fundamental=true>

### 11.2. Third‑Party Tools

- **Argo** — Orchestrates parallel jobs in Kubernetes.  
- **Argo‑Events** — Triggers Kubernetes functions from events (webhook, S3, etc.).  
- **cert‑manager** — Automates TLS certificate issuance/renewal.  
- **Helm** — Package manager for Kubernetes.  
- **ingress‑nginx** — Nginx‑based reverse proxy and load balancer for Ingress.

### 11.3. Capella Applications

- **cambriaclusterapp** — Cambria Cluster application container.  
- **cambriaftautoscale** — Spawns FTC nodes based on queue depth.  
- **cambriaftcapp** — Cambria FTC application container.  
- **cambriaftcconnect** — Auto‑connects FTC instances to Cambria Cluster.  
- **cambrialeaderelector** — Handles Cambria Cluster leader election.  
- **pgcluster-capella** — PostgreSQL pod used by Cambria Cluster.

---

*End of document.*
