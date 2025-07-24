---
id: cambria-cluster-ftc-terraform
title: Cambria Cluster / FTC 5.5.0 - Terraform on Akamai Kubernetes
---

# Cambria Cluster / FTC 5.5.0

## Akamai Cloud Kubernetes Help Documentation

### Terraform Installation

---

## Document History

| Version | Date       | Description                                   |
|---------|------------|-----------------------------------------------|
| 5.4.0   | 10/03/2024 | Updated for release 5.4.0.21627 (Linux)       |
| 5.5.0   | 04/11/2025 | Updated for release 5.5.0.23529 (Linux)       |

> **Download the online version of this document for the latest information and latest files. Always download the latest files.**

Do not move forward with the installation process if you do not agree with the End User License Agreement (EULA) for our products.  
You can download and read the EULA for Cambria FTC, Cambria Cluster, and Cambria License Manager from the links below:

- [Cambria License Manager EULA](https://www.dropbox.com/s/1wg7ee7a59kzi8h/EULA_Cambria_License_Manager.pdf?dl=0)  
- [Cambria Cluster EULA](https://www.dropbox.com/s/oemlax63aatjjiw/EULA_Cluster.pdf?dl=0)  
- [Cambria FTC EULA](https://www.dropbox.com/s/ualv9usxsowh6m2/EULA_FTC.pdf?dl=0)

### Limitations and Security Information

Cambria FTC, Cluster, and License Manager are installed on Linux Docker containers. Limitations and security checks done for this version are included in our general Linux documents below:

- [Linux Cambria Cluster and FTC 5.5.0 Guide](https://www.dropbox.com/scl/fi/0rvskhpqtla6dffhbfli5/Linux_Cambria_Cluster_and_FTC_5_5_0_Guide.pdf?rlkey=ngryjzox121ow5fgbc4y8n2yd)

> **Note:** These documents are for informational use only. The setup for Kubernetes starts in section 2. Create Kubernetes Cluster.

> **Note:** This document references Kubernetes version 1.32 only.

---

## ⚠️ Important: Before You Begin

PDF documents have a copy/paste issue. For best results, download this document and any referenced PDF documents in this guide and open them in a PDF viewer such as Adobe Acrobat.

For commands that are in more than one line, copy each line one by one and check that the copied command matches the one in the document.

---

## ⚠️ Critical Information: Read Before Proceeding with Installation

Before starting the installation, carefully review the following considerations. Skipping this section may result in errors, failed deployments, or misconfigurations.

Read only the **Critical Information: Read Before Proceeding with Installation** sections of the following documents:

- [Cambria Cluster Installation](https://www.dropbox.com/scl/fi/irkmp89qh17bo9w4459qw/Cambria_Cluster_and_FTC_5_5_0_on_Akamai_Kubernetes.pdf?rlkey=vmq8fcqdbv3dul5cqq9em4r91&st=5gecxrgs&dl=0)
- [Monitoring and Logging with Prometheus and Loki](https://www.dropbox.com/scl/fi/rxshb6038wd9yg81kxagd/Prometheus_Grafana_Setup_for_Cambria_Cluster_5_5_0_on_Akamai_Kubernetes.pdf?rlkey=5l561e8x251y46gywx57k5svm&st=prp5ca3q&dl=0)

---

## 1. Prerequisites

### 1.1. X11 Forwarding for User Interface

For **Windows and Mac only**, there are some special tools that need to be installed in order to be able to use the user interface from Capella's terraform installer.  
If using Linux, the machine must have a graphical user interface.

#### 1.1.1. Option 1: Microsoft Windows Tools

1. Download and install the X11 Forwarding Tool Xming:  
   [Download vcxsrv](https://github.com/marchaesen/vcxsrv/releases/download/21.1.13/vcxsrv-64.21.1.13.0.installer.exe)

2. Also, download and install PuTTY or similar tool that allows X11 Forwarding SSH:  
   [Download PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html)

3. Open XLaunch and do the following:

   - **Window 1:** Choose *Multiple windows* and set Display number to `0`
   - **Window 2:** Choose *Start no client*
   - **Window 3:** Enable all checkboxes: Clipboard, Primary Selection, Native OpenGL, and Disable access control
   - **Window 4:** Click on *Save configuration* and save this somewhere to reuse in the future

#### 1.1.2. Option 2: Apple macOS Tools

1. Download and install the X11 Forwarding Tool XQuartz:  
   [Download XQuartz](https://github.com/XQuartz/XQuartz/releases/download/XQuartz-2.8.5/XQuartz-2.8.5.pkg)

---

---

## 2. Prepare Deployment Server

1. On the Akamai Dashboard, create a new **Ubuntu Linode** used for the Terraform deployment.  
   For best performance, choose an **8GB RAM or higher** machine as X11 Forwarding uses a lot of memory on the Linode instance.

2. SSH into the new Linode and install general tools:

   ```bash
   sudo apt update
   sudo apt upgrade
   sudo apt install curl unzip libice6 libsm6 dbus libgtk-3-0
   ```

3. Download the Terraform package:

   ```bash
   curl -o terraform_LKE_CambriaCluster_1_0.zip -L "https://www.dropbox.com/scl/fi/t8pgwr6otlg4lesgf3xbq/terraform_LKE_CambriaCluster_1_0.zip?rlkey=82rjt9l3at2gfcztt7sy0zsz1&st=pwzmzhpb&dl=1"
   ```

4. Unzip the package and make the shell scripts executable:

   ```bash
   unzip terraform_LKE_CambriaCluster_1_0.zip
   chmod +x *.sh
   chmod +x ./TerraformVariableEditor
   ```

5. Install the tools needed for deployment:

   ```bash
   ./setupTools.sh
   ./installLogcli.sh
   ```

6. Verify the tools are installed:

   ```bash
   kubectl version --client
   helm version
   terraform -v
   logcli --version
   ```

7. Exit from the SSH session.


## 3. Installation

1. SSH into the instance created in section 2. **Prepare Deployment Server** using one of the following methods (depending on the OS being used as the SSH client):

### Option 1: Windows
1. Open **PuTTY** or similar tool. Enable **X11 Forwarding** in the configuration. On PuTTY, this can be found under:
   - `Connection > SSH > X11 > X11 forwarding`
2. SSH into the instance with the created user. Usually, the user is `root`.

### Option 2: Unix (Linux, macOS)
1. Open a terminal window and SSH into the Linode instance using the `-Y` option and one of the created users. This is usually `root`.  
   **Example:**  
   ```bash
   ssh -Y -i "mysshkey" root@123.123.123.123
   ```
2. Run the following script to set secrets as environment variables. These are important details such as credentials,
license keys, etc. Reference the following table:

```bash
source ./setEnvVariablesCambriaCluster.sh
```

### Environment Variable Explanation

| Variable | Explanation |
|----------|-------------|
| **Linode API Token** | API token from Akamai Cloud's Dashboard. [See guide](https://www.linode.com/docs/products/tools/api/guides/manage-api-tokens/) |
| **PostgreSQL Password** | The password for the PostgreSQL database that Cambria Cluster uses. General password rules apply. |
| **Cambria API Token** | A token needed for making calls to the Cambria FTC web server. General token rules apply (e.g., `1234-5678-90abcdefg`). |
| **Web UI Users** | Login credentials for the Cambria WebUIs for the Kubernetes cluster. Format: `role,username,password`.<br />Allowed roles:<br />1. **admin** – Full access and user management<br />2. **superuser** – Full access<br />3. **user** – View-only<br />Example: `admin,admin,changethispassword1234,user,guest,password123` |
| **Argo Events Webhook Token** | Token for specific Argo Events calls. General token rules apply (e.g., `1234-5678-90abcdefg`). |
| **Cambria FTC License Key** | Provided by Capella. Starts with a '2' (e.g., `2AB122-11123A-ABC890-DEF345-ABC321-543A21`). |
| **Grafana Password** | Password for the Grafana Dashboard. |
| **Access Key** | S3-compatible log storage access key (e.g., `AWS_ACCESS_KEY_ID`). |
| **Secret Key** | S3-compatible log storage secret key (e.g., `AWS_SECRET_ACCESS_KEY`). |

3. Run the terraform editor UI:

```bash
./TerraformVariableEditor
```

4. Click on **Open Terraform File** and choose the `CambriaCluster_LKE.tf` file.

## 5. Terraform UI Editor Configuration

Using the UI, edit the fields accordingly. Reference the following table for values that should be changed:

- **Blue**: values in blue do not need to change unless the specific feature is needed / not needed  
- **Red**: values in red are proprietary values that need to be changed based on your specific environment

| Variable | Explanation |
|----------|-------------|
| `lke_cluster_name = CambriaFTCCluster` | The name of the Kubernetes cluster |
| `lk_region = us-mia` | The region code where the Kubernetes cluster should be deployed |
| `lke_manager_pool_node_count = 3` | The number of Cambria Cluster nodes to create |
| `workers_can_use_manager_nodes = false` | Whether the Cambria Cluster nodes should also handle encoding tasks |
| `workersUseGPU = false` | Set to `true` to enable NVENC capabilities |
| `nbGPUs = 1` | Max number of GPUs to use from encoding machines |
| `manager_instance_type = g6-dedicated-4` | Instance type of the Cambria Cluster nodes |
| `ftc_enable_auto_scaler = true` | Enable Cambria FTC's autoscaler |
| `ftc_instance_type = g6-dedicated-8` | Instance type for autoscaled encoders |
| `max_ftc_instances = 5` | Max number of encoder instances |
| `cambria_cluster_replicas = 3` | Max number of management and replica nodes |
| `expose_capella_service_externally = true` | Create load balancers to expose Capella |
| `enable_ingress = true` | Create ingress for Capella applications |
| `host_name = myhost.com` | Public domain name |
| `acme_registration_email = test@example.com` | Email for Let's Encrypt registration |
| `acme_server = https://acme-staging-v02.api.letsencrypt.org/directory` | ACME server URL |
| `enable_eventing = true` | Enable Argo eventing features |
| `expose_grafana = true` | Publicly expose Grafana dashboard |
| `loki_storage_type = s3_embedcred` | Storage type for Loki logs |
| `loki_local_storage_size_gi = 100` | Size of local storage in Gi for Loki |
| `loki_s3_bucket_name = ""` | S3 bucket name for Loki |
| `loki_s3_region = ""` | S3 bucket region for Loki |
| `loki_replicas = 2` | Number of Loki replicas |
| `loki_max_unavailable = 3` | Max unavailable Loki pods during upgrades |
| `loki_log_retention_period = 7` | Days to retain logs |


6. Once done click on **Save Changes** and close the UI.
7. Run the following commands to create a Terraform plan:

```bash
terraform init && terraform plan -out lke-plan.tfplan
```

8. Apply the Terraform plan to create the Kubernetes cluster:

```bash
terraform apply -auto-approve lke-plan.tfplan
```

9. Set the `KUBECONFIG` environment variable:

```bash
export KUBECONFIG=kubeconfig.yaml
```

10. Save the following files securely for future changes or redeployment:
   - `.tfstate` file
   - `lke-plan.tfplan`
   - `CambriaCluster_LKE.tf`
   
   ## 4. Verification and Testing

Follow the steps in section 5. **Verify Cambria FTC / Cluster Installation** of the main Cambria Cluster Kubernetes Installation Guide for verification and section 6. **Testing Cambria FTC / Cluster** for testing with Cambria FTC jobs:

[Cambria Cluster and FTC 5.5.0 on Akamai Kubernetes (PDF)](https://www.dropbox.com/scl/fi/irkmp89qh17bo9w4459qw/Cambria_Cluster_and_FTC_5_5_0_on_Akamai_Kubernetes.pdf?rlkey=vmq8fcqdbv3dul5cqq9em4r91&st=5gecxrgs&dl=1)

---

## 5. Upgrading

### 5.1. Option 1: Normal Upgrade via Terraform Apply

This upgrade method is best for when changing version numbers, secrets such as the license key, WebUI users, etc., and Cambria FTC / Cluster-specific settings such as max number of pods, replicas, etc.

> ⚠️ **Warning – Known Issues:**  
> - `pgClusterPassword` cannot currently be updated via this method.  
> - Changing the PostgreSQL version is not supported via this method.  
> - The region of the cluster cannot be changed.

**Steps:**
1. Follow the steps in section 3: _Installation_.
2. Follow the verification steps in section 4: _Verification and Testing_ to ensure the updates were applied.

### 5.2. Option 2: Upgrade via Cambria Cluster Reinstallation

This is the most reliable upgrade option. It uninstalls all Cambria FTC and Cluster components and reinstalls them using a new Helm chart and values file. This will delete the database and remove all jobs from the Cambria Cluster UI.

**Steps:**
1. Follow section 4.2: _Creating and Editing Helm Configuration File_ to prepare your new `capellaClusterConfig.yaml`.
2. Uninstall the current deployment:

    ```bash
    helm uninstall capella-cluster --wait
    ```

3. Reinstall using the updated values file:

    ```bash
    helm upgrade --install capella-cluster capella-cluster.tgz --values cambriaClusterConfig.yaml
    ```

4. Wait a few minutes for the Kubernetes pods to install.
5. Verify the installation using section 4: _Verification and Testing_.

---

## 6. Cleanup

To clean up the environment, ensure the following steps are followed in order. If using FTC's autoscaler, verify that no leftover Cambria FTC nodes remain running.

**Steps:**
1. Remove Helm deployments:

    ```bash
    helm uninstall capella-cluster -n default --wait
    ```

2. If persistent volumes remain, patch them for deletion:

    ```bash
    kubectl get pv -o name | awk -F'/' '{print $2}' | xargs -I{} kubectl patch pv {} -p='{"spec": {"persistentVolumeReclaimPolicy": "Delete"}}'
    ```

3. Delete all contents from the monitoring namespace (Prometheus, Grafana, Loki, etc):

    ```bash
    kubectl delete namespace monitoring
    ```

4. If `ingress-nginx` was deployed:

    ```bash
    kubectl delete namespace ingress-nginx
    ```

5. Destroy the Kubernetes cluster:

    ```bash
    terraform destroy -auto-approve
    ```

6. In the **NodeBalancers** section of the cloud dashboard, delete any leftover balancers created by the Kubernetes cluster.
7. In the **Volumes** section, delete any remaining volumes created by the Kubernetes cluster.