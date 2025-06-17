
---

## title: Cambria Cluster and FTC 5.5.0 on Akamai Kubernetes

# Cambria Cluster / FTC 5.5.0 — Akamai Cloud Kubernetes Help Documentation

## Document History

| Version | Date       | Description                             |
| ------- | ---------- | --------------------------------------- |
| 5.4.0   | 10/03/2024 | Updated for release 5.4.0.21627 (Linux) |
| 5.5.0   | 04/11/2025 | Updated for release 5.5.0.23529 (Linux) |

> Download the latest version of this document and referenced files for best results. Do not continue installation if you do not agree to the End User License Agreement (EULA).

* [Cambria License Manager EULA](https://www.dropbox.com/s/1wg7ee7a59kzi8h/EULA_Cambria_License_Manager.pdf?dl=0)
* [Cambria Cluster EULA](https://www.dropbox.com/s/oemlax63aatjjiw/EULA_Cluster.pdf?dl=0)
* [Cambria FTC EULA](https://www.dropbox.com/s/ualv9usxsowh6m2/EULA_FTC.pdf?dl=0)

---

## Limitations and Security Information

Cambria FTC, Cluster, and License Manager are deployed in Linux-based Docker containers. Security and compatibility details are available in the following reference:

[Linux Cambria FTC / Cluster Guide](https://www.dropbox.com/scl/fi/0rvskhpqtla6dffhbfli5/Linux_Cambria_Cluster_and_FTC_5_5_0_Guide.pdf?rlkey=ngryjzox121ow5fgbc4y8n2yd)

> **Note:** This document supports Kubernetes version 1.32 only.

---

## ⚠️ Critical Information: Read Before Proceeding with Installation

1. **New Kubernetes Cluster Will Be Deployed**

   * The installation provisions a new isolated Kubernetes cluster for Cambria.

2. **Default Installation is Non-Secure**

   * Default guide assumes open environment. Secure setups require Akamai Cloud expertise.

3. **Know Your Transcoding Requirements**

   * Refer to section 1.3 for specs and GPU requirements.

4. **Admin Rights Required**

   * Permissions to configure Akamai Cloud resources are needed.

5. **Check Akamai Cloud Account Quota**

   * Refer to section 1.2 for estimated usage.

6. **Separate Linux Machine is Required**

   * Preferably Ubuntu. Dedicated deployment machine recommended.

7. **Verify Region Resource Availability**

   * Confirm region supports required instance types (GPU, etc.).

---

## Document Overview

This document covers the installation, configuration, testing, and maintenance of Cambria Cluster and FTC in an Akamai Kubernetes environment.

### Major Sections

1. Overview of Kubernetes Deployment
2. Prerequisites
3. Creating the Kubernetes Cluster
4. Installing Cambria FTC / Cluster
5. Verifying Deployment
6. Functional Testing
7. Upgrades
8. Cluster Teardown
9. Quick References
10. Helpful Commands
11. Glossary

---

## 1. Overview

### 1.1. Cambria Cluster / FTC Kubernetes Deployment

**Cambria Cluster**

* Deployed across 3 nodes (replicas).
* Each pod runs:

  1. Cambria Cluster application
  2. Leader Elector tool
  3. FTC Autoscaler tool

     * Calculates nodes to deploy via: `(Queued Jobs + 2) / 3`
* Each Cluster pod has a dedicated PostgreSQL pod for redundancy.

**Cambria FTC**

* Each node runs encoding tasks.
* Each pod includes:

  1. Cambria FTC application
  2. Auto-connect tool (joins Cluster or recycles node after timeout)
  3. Local pgcluster DB (ephemeral)

---

### 1.2. Resource Usage

* **NodeBalancers**: 0–4 depending on features used
* **Instances**:

  * Cambria Manager default: 3
  * Cambria FTC default: 20
* **Networking**: No VPCs by default
* **Security**: No firewalls unless manually added

[Akamai Cloud Docs](https://techdocs.akamai.com/cloud-computing/docs/getting-started-with-lke-linode-kubernetes-engine)

---

### 1.3. Akamai Cloud Machine Benchmark

**Test Job Specs**

* Source: TS, H.264, 30fps, 1080p @ 8 Mbps
* Output: HLS/TS, H.264, 29.97fps in multiple resolutions

| Machine         | Specs         | Throughput | Cost       |
| --------------- | ------------- | ---------- | ---------- |
| g6-dedicated-16 | 32GB, 16vCPU  | 0.86x RT   | \$0.432/hr |
| g6-dedicated-64 | 512GB, 64vCPU | 2.90x RT   | \$6.912/hr |

**Conclusion**: g6-dedicated-64 is faster, but g6-dedicated-16 is more cost-effective.

---

### 1.4. Cambria Application Access

#### 1.4.1. TCP Load Balancer

* Manager WebUI: `https://<external-ip>:8161`
* REST API: `https://<external-ip>:8650/CambriaFC/v1/SystemInfo`

#### 1.4.2. HTTP Ingress via Reverse Proxy

* `https://webui.mydomain.com`
* `https://api.mydomain.com`
* `https://monitoring.mydomain.com`

---

### 1.5. Firewall Information

| Port | Description                |
| ---- | -------------------------- |
| 8650 | Cambria Cluster REST API   |
| 8161 | Cambria WebUI              |
| 8678 | License Manager Web Server |
| 8481 | License Manager WebUI      |
| 9100 | Prometheus Exporter        |
| 8648 | Cambria FTC REST API       |
| 3100 | Loki                       |
| 3000 | Grafana                    |
| 443  | Ingress                    |

Required external domains:

* `api.cryptlex.com`
* `cryptlexapi.capellasystems.net`
* `cpfs.capellasystems.net`

---

## 2. Prerequisites

Before proceeding with deployment, ensure the following tools and steps are in place.

### 2.1. Required Tools

The deployment requires the following tools to be available on a dedicated Linux server (preferably Ubuntu):

* `kubectl`
* `helm`
* `curl`
* `unzip`

Install `curl` and `unzip` using:

```bash
sudo apt update && sudo apt upgrade && sudo apt install curl unzip
```

Download and extract the Cambria Kubernetes deployment bundle:

```bash
curl -o CambriaClusterKubernetesAkamai_5_5_0.zip -L "https://www.dropbox.com/scl/fi/djskqq0ve21vlgjk6bmiq/CambriaClusterKubernetesAkamai_5_5_0.zip?rlkey=dlw857nygf22e901tcakpbxm2&st=fibyo4zd&dl=1"
unzip CambriaClusterKubernetesAkamai_5_5_0.zip
chmod +x *.sh
```

> **Note:** Scripts are tested on Ubuntu. They may work on other Linux distributions but are not verified.

---

### 2.1.1. Installing Kubernetes Tools

You have two options to install `kubectl` and `helm`.

**Option 1: Use Capella’s Install Script (Ubuntu only)**

```bash
./installKubeTools.sh
```

**Option 2: Manual Installation**

* [Install kubectl](https://kubernetes.io/docs/tasks/tools/)
* [Install helm](https://helm.sh/docs/intro/install/)

---

### 2.1.2. Verifying Tool Installation

Verify that both tools are correctly installed:

```bash
kubectl version --client
helm version
```

If either command fails, revisit the installation instructions and retry.

---

## 3. Create Kubernetes Cluster

### 3.1. Create LKE Cluster and Cambria Cluster Node Group

1. In the Akamai Cloud dashboard, navigate to the Kubernetes section and create a new cluster.

   * Choose a label and region.
   * Set the Kubernetes version to **1.32**.
   * (Optional for Production) Enable **HA Control Plane** for high availability.

2. In "Add Node Pools," configure the node pool for Cambria Cluster:

   * Recommended instance type: **Dedicated 8GB**
   * Set count to **3 nodes** (1 active, 2 for backup and redundancy).

3. Create the cluster and wait for all nodes to show `Running`.

4. Copy the kubeconfig:

   * Click **View**, copy the contents.
   * Save in deployment server:

     ```bash
     export CLUSTER_NAME=cambria-cluster
     nano $CLUSTER_NAME-kubeconfig.yaml
     ```
   * Paste contents and save (Ctrl+X → Y → Enter).

5. Export the `KUBECONFIG` variable:

   ```bash
   export KUBECONFIG=$CLUSTER_NAME-kubeconfig.yaml
   ```

6. Verify connection:

   ```bash
   kubectl get nodes
   ```

7. Copy the **token** from the Akamai dashboard and use it to log in to the Kubernetes Dashboard.

---

### 3.2. (Optional) Restrict FTC Nodes with Exclusion Label

Use when FTC should not run on certain nodes.

1. Identify nodes:

   ```bash
   kubectl get nodes
   ```

2. Label them:

   ```bash
   kubectl label node <node-name> no-capella-worker=true
   ```

3. To label a full node pool:

   * In Akamai dashboard, go to the cluster → node pool → **Labels and Taints** → add label `no-capella-worker: true`

4. In Helm values, set:

   ```yaml
   workersCanUseManagerNodes: true
   ```

---

### 3.3. Create Cambria FTC Node Group(s)

> Skip if using the autoscaler.

1. In the Akamai dashboard → LKE cluster → Add Node Pool
2. Choose instance type (recommend: `g6-dedicated-16`) and number of nodes.

> Instance type must differ from the Cluster nodes unless using the exclusion label.

---

### 3.4. GPU Operator for NVENC (Optional)

> Required if using GPU.

Install NVIDIA GPU operator:

```bash
helm repo add nvidia https://helm.ngc.nvidia.com/nvidia
helm repo update
helm install nvidia-operator nvidia/gpu-operator --create-namespace --namespace gpu-operator
```

Verify installation:

```bash
kubectl get pods -n gpu-operator
```

Troubleshoot with:

```bash
kubectl describe pod <pod-name> -n gpu-operator
```



### 3.5. Performance Metrics and Logging

Install Prometheus, Grafana, Loki, Promtail:
[Monitoring Setup PDF](https://www.dropbox.com/scl/fi/rxshb6038wd9yg81kxagd/Prometheus_Grafana_Setup_for_Cambria_Cluster_5_5_0_on_Akamai_Kubernetes.pdf?rlkey=5l561e8x251y46gywx57k5svm&st=m58td12z&dl=1)

---

## 4. Install Cambria Cluster, FTC, and Dependencies

### 4.1. Deploy External Tools

Run:

```bash
./deployCambriaKubeDependencies.sh
```

Verify:

```bash
kubectl get all -n cnpg-system
kubectl get all -n argo-events
kubectl get all -n cert-manager
```

---

### 4.1.2. (Optional) Ingress-Nginx

Install ingress controller:

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.12.1/deploy/static/provider/cloud/deploy.yaml
```

Check resources:

```bash
kubectl get all -n ingress-nginx
```

> ⚠ You must manually delete this LoadBalancer during teardown.

For production domains, follow this guide:
[Domain DNS Guide](https://www.dropbox.com/scl/fi/3vlap75xs8r5zo1d47gr0/Cambria_Kubernetes_Domain_DNS_Guide.pdf?rlkey=ei34633z8elzu7jvmv8w6ezou)

---

### 4.2. Create and Edit Helm Config

Generate default values:

```bash
helm show values capella-cluster.tgz > cambriaClusterConfig.yaml
```

Edit values as per your environment. See section 4.2 in original PDF for full parameter reference.

---

### 4.3. Install Cluster/FTC

Install using Helm:

```bash
helm upgrade --install capella-cluster capella-cluster.tgz --values cambriaClusterConfig.yaml
```

Wait several minutes for deployment.

---

## 5. Verify Cambria FTC / Cluster Installation

### 5.1. Cambria Cluster

```bash
kubectl get all -n default
```

* Ensure all Cluster pods, services, and PostgreSQL are running.

---

### 5.2. Cambria FTC

```bash
kubectl get all -n capella-worker
```

* If using autoscaler, pods will be pending until needed.
* If manual, verify FTC pods are running.

---

### 5.3. Application Access

#### 5.3.1. WebUI

```bash
kubectl get svc/cambriaclusterwebuiservice -n default -o=jsonpath="{'https://'}{.status.loadBalancer.ingress[0].hostname}{':8161'}{'
'}"
```

Or use port-forward:

```bash
kubectl port-forward -n default svc/cambriaclusterwebuiservice 8161:8161 --address=0.0.0.0
```

#### 5.3.2. REST API

```bash
kubectl get svc/cambriaclusterservice -n default -o=jsonpath="{'https://'}{.status.loadBalancer.ingress[0].hostname}{':8650'}{'
'}"
```

Or use port-forward:

```bash
kubectl port-forward -n default svc/cambriaclusterservice 8650:8650 --address=0.0.0.0
```

#### 5.3.3. Ingress Testing

Get ingress endpoints:

```bash
kubectl get ingress -A
```

Add entries to `/etc/hosts` if using test ingress:

```text
55.99.103.99 api.myhost.com
55.99.103.99 webui.myhost.com
55.99.103.99 monitoring.myhost.com
```

---

### 5.3.4. License Manager

```bash
kubectl get svc/cambriaclusterwebuiservice -n default -o=jsonpath="{'https://'}{.status.loadBalancer.ingress[0].hostname}{':8481'}{'
'}"
```

Or port-forward:

```bash
kubectl port-forward -n default svc/cambriaclusterwebuiservice 8481:8481 --address=0.0.0.0
```

---

## 6. Testing Cambria FTC / Cluster

[User Guide](https://www.dropbox.com/scl/fi/5vra6xff23vvng7aa4qyx/Cambria_Cluster_and_FTC_5_5_0_Kubernetes_User_Guide.pdf?rlkey=j3l9wjjo5ncbub9bh9bizrukr&st=tmmzm91q&dl=1)

---

## 7. Updating / Upgrading Cambria

### 7.1. Normal Upgrade

```bash
helm upgrade capella-cluster capella-cluster.tgz --values cambriaClusterConfig.yaml
kubectl rollout restart deployment cambriaclusterapp cambriaclusterwebui -n default
kubectl rollout restart deployment cambriaftcapp -n capella-worker
```

> ⚠ `pgClusterPassword` and `postgres` version cannot be updated via this method.

### 7.2. Reinstall Method

```bash
helm uninstall capella-cluster --wait
helm upgrade --install capella-cluster capella-cluster.tgz --values cambriaClusterConfig.yaml
```

---

## 8. Deleting Kubernetes Cluster

```bash
helm uninstall capella-cluster -n default --wait
kubectl get pv -o name | awk -F'/' '{print $2}' | xargs -I{} kubectl patch pv {} -p='{"spec":{"persistentVolumeReclaimPolicy":"Delete"}}'
kubectl delete namespace ingress-nginx
```

Also delete the cluster, NodeBalancers, and Volumes from Akamai Cloud dashboard.

---

## 9. Quick Reference

### 9.1. Terraform Install Guide

[Terraform Guide PDF](https://www.dropbox.com/scl/fi/y4noltg67q489f39ewx4k/Cambria_Cluster_and_FTC_5_5_0_Terraform_on_Akamai_Kubernetes.pdf?rlkey=m2it3z2q7p4sebfulilgd8vn4&st=vbn29kcl&dl=1)

### 9.2. Upgrade and Teardown

```bash
./quickUpgradeCambriaCluster.sh
helm uninstall capella-cluster --wait
```

---

## 10. Helpful Commands

```bash
kubectl get service/cambriaclusterwebuiservice -n default -o=jsonpath="{'https://'}{.status.loadBalancer.ingress[0].hostname}{':8161'}"
kubectl get service/cambriaclusterservice -n default -o=jsonpath="{'https://'}{.status.loadBalancer.ingress[0].hostname}{':8650'}"
kubectl exec -it <pod-name> -n <namespace> -- /bin/bash
kubectl cp <host-file> <pod-name>:<dest> -n <namespace>
kubectl delete pod <pod-name> -n <namespace>
```

### Extracting Logs

```bash
kubectl cp <pod-name>:/opt/capella/Cambria/Logs ./CambriaFTCLogs -n capella-worker
kubectl cp <pod-name>:/opt/capella/CambriaCluster/Logs ./CambriaClusterLogs -n default
```

---

## 11. Glossary

See [Kubernetes Glossary](https://kubernetes.io/docs/reference/glossary/?fundamental=true)

**Argo** — Workflow engine for Kubernetes
**Cert-Manager** — Manages TLS certificates
**Helm** — Kubernetes package manager
**Ingress-Nginx** — Ingress controller
**Cambria Components**:

* `cambriaclusterapp`, `cambriaftcapp`, `cambriaftautoscale`, `cambriaftcconnect`, `cambrialeaderelector`, `pgcluster-capella`

---


```
