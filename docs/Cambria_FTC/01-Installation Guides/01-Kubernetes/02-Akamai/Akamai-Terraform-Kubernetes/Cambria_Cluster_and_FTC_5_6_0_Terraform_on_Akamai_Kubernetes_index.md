---
id: Cambria_Cluster_Terraform_Akamai_Kubernetes
title: Cambria Cluster and FTC 5.6.0 – Terraform on Akamai Kubernetes
sidebar_position: 1
---


# Cambria Cluster / FTC 5.6.0 — Akamai Cloud Kubernetes Help Documentation

## Terraform Installation

### Document History

| Version | Date       | Description                                 |
|--------:|------------|---------------------------------------------|
| 5.5.0   | 04/11/2025 | Updated for release 5.5.0.23529 (Linux)     |
| 5.6.0   | 10/31/2025 | Updated for release 5.6.0.26533 (Linux)     |

*Download the online version of this document for the latest information and latest files. Always download the latest files.*

Do not move forward with the installation process if you do not agree with the End User License Agreement (EULA) for our products. You can download and read the EULA for Cambria FTC, Cambria Cluster, and Cambria License Manager from the links below:

- Cambria License Manager: https://www.dropbox.com/s/1wg7ee7a59kzi8h/EULA_Cambria_License_Manager.pdf?dl=0  
- Cambria Cluster: https://www.dropbox.com/s/oemlax63aatjjiw/EULA_Cluster.pdf?dl=0  
- Cambria FTC: https://www.dropbox.com/s/ualv9usxsowh6m2/EULA_FTC.pdf?dl=0

### Limitations and Security Information

Cambria FTC, Cluster, and License Manager are installed on Linux Docker containers. Limitations and security checks done for this version are included in our general Linux Documents below.

> **Note:** these documents are for informational use only. The setup for Kubernetes starts in section **2. Create Kubernetes Cluster**.

- Cambria FTC / Cluster:  
  https://www.dropbox.com/scl/fi/ljzuqv0azo3o7gpyi7y7x/Linux_Cambria_Cluster_and_FTC_5_6_0_Guide.pdf?rlkey=nldkuz4hoirupwvgm3yq1tgcu&st=wfnaz6lz&dl=0

### Important: Before You Begin

PDF documents have a copy/paste issue. For best results, download this document and any referenced PDF documents in this guide and open them in a PDF viewer such as Adobe Acrobat.

For commands that are in more than one line, copy each line one by one and check that the copied command matches the one in the document.

### Information

This document references **Kubernetes version 1.34** only.

---

## ⚠ Critical Information: Read Before Proceeding with Installation

Before starting the installation, carefully review the following considerations. Skipping this section may result in errors, failed deployments, or misconfigurations.

1. **Review the main Akamai Kubernetes Document:**
   - Read the *Critical Information: Read Before Proceeding with Installation* section of the document:  
     https://www.dropbox.com/scl/fi/jmndc09hsb308uzfv5yzd/Cambria_Cluster_and_FTC_5_6_0_on_Akamai_Kubernetes.pdf?rlkey=0yx9di8w6k8r79g28mu8quza7&st=rr0ocfdz&dl=0
   - Read the *Critical Information: Read Before Proceeding with Installation* section of the document:  
     https://www.dropbox.com/scl/fi/cb75lsh6ipvbf0x1y4ysp/Prometheus_Grafana_Setup_for_Cambria_Cluster_5_6_0_on_Akamai_Kubernetes.pdf?rlkey=kcxit4i6ntj5ynv2e26zydhiy&st=1bpaoqrx&dl=0

2. **GUI-Based Operating System Required**
   - The Terraform deployment uses a desktop UI tool for editing configuration files.  
   - Either the Linux deployment server or an SSH client for the Linux deployment server needs to have a UI.

---

## 1. Prerequisites

### 1.1. X11 Forwarding for User Interface

If using SSH to access the Linux deployment server and the SSH client machine is either Windows or Mac, there are some special tools that need to be installed in order to be able to use the user interface from Capella's Terraform installer. If using Linux, the machine must have a graphical user interface (GUI).

#### 1.1.1. Option 1: Microsoft Windows Tools

1. Download and install the X11 Forwarding Tool **Xming**:  
   https://github.com/marchaesen/vcxsrv/releases/download/21.1.16.1/vcxsrv-64.21.1.16.1.installer.noadmin.exe
2. Also, download and install **PuTTY** or similar tool that allows X11 Forwarding SSH:  
   https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html
3. Open **XLaunch** and do the following:  
   a. Window 1: Choose **Multiple windows** and set **Display number** to **0**  
   b. Window 2: Choose to **Start no client**  
   c. Window 3: Enable all checkboxes: **Clipboard**, **Primary Selection**, **Native opengl**, and **Disable access control**  
   d. Window 4: Click on **Save configuration** and save this somewhere to reuse in the future

#### 1.1.2. Option 2: Apple macOS Tools

1. Download and install the X11 Forwarding Tool **XQuartz**:  
   https://github.com/XQuartz/XQuartz/releases/download/XQuartz-2.8.5/XQuartz-2.8.5.pkg

### 1.2. Prepare Deployment Server

1. On the Akamai Dashboard, create a new Ubuntu Linode used for the Terraform deployment. For best performance, choose an **8GB RAM** or higher machine as X11 Forwarding uses a lot of memory on the Linode instance.
2. SSH into the new Linode and install general tools:

```bash
sudo apt update && sudo DEBIAN_FRONTEND=noninteractive apt -o Dpkg::Options::="--force-confold" -y upgrade && sudo DEBIAN_FRONTEND=noninteractive apt -o Dpkg::Options::="--force-confold" -y install curl unzip libice6 libsm6 dbus libgtk-3-0
```

> **Important:** If during this step, a *Configuring openssh-server* menu shows up, choose **keep the local version currently installed**.

---

## 2. Cambria FTC Package

1. SSH into the Linux deployment server, if not already done so.
2. Download the Terraform package:

```bash
curl -o terraform_CambriaClusterLKE_5.6.0.zip -L "https://www.dropbox.com/scl/fi/yubw0u4qm5fu43gvljfsf/terraform_CambriaClusterLKE_5.6.0.zip?rlkey=pwmndosi686btc5fwzh2f8uvm&st=pn69pmm7&dl=0"
```

3. Unzip the package and make the shell scripts executable:

```bash
unzip -o terraform_CambriaClusterLKE_5.6.0.zip && chmod +x ./bin/*.sh ./bin/TerraformVariableEditor
```

4. Install the tools needed for deployment:

```bash
./bin/setupTools.sh && ./bin/installKubeToolsAkamai.sh && ./bin/installLogcli.sh && ./bin/installTerraformDocs.sh
```

5. Restart the SSH terminal window for the changes to take effect.
6. Verify the tools are installed:

```bash
kubectl version --client && helm version && terraform --version && terraform-docs --version && linode-cli --version
```

---

## 3. Installation

### 3.1. Configure the Kubernetes Cluster

1. SSH into the instance created in section **1.2. Prepare Deployment Server** using one of the following methods (depending on the OS being used as the SSH client):

**Option 1: Windows**  
1) Open PuTTY or similar tool. Enable **X11 Forwarding** in the configuration. On PuTTY, this can be found in **Connection > SSH > X11 > X11 forwarding**.  
2) SSH into the instance with the created user. Usually, the user is **root**.

**Option 2: Unix (Linux, macOS)**  
1) Open a terminal window and `ssh` into the Linode instance using `-Y` option and one of the created users. This is usually **root**.

Example:

```bash
ssh -Y -i "mysshkey" root@123.123.123.123
```

2. Run the Terraform editor UI:

```bash
./bin/TerraformVariableEditor
```

3. Click on **Open Terraform File** and choose the `CambriaClusterValues_SENSITIVE_VALUES.tf` file from the **values** directory.
4. Using the UI, edit the fields accordingly. Reference the following table for values that should be changed:

| Terraform UI Editor Field | Explanation |
|---|---|
| `linode_token` | See https://www.linode.com/docs/products/tools/api/guides/manage-api-tokens/ |
| `pg_cluster_password` | The password for the PostgreSQL database that Cambria Cluster uses. General password rules apply. |
| `cambria_cluster_api_token` | A token needed for making calls to the Cambria FTC web server. General token rules apply (Eg. `1234-5678-90abcdefg`). |
| `cambria_cluster_webui_user` | This is the login credentials for all of the Cambria WebUIs for the Kubernetes cluster. Each user is listed in the form: `role,username,password`.<br/><br/>**Allowed roles:**<br/>1. **admin** — can view/create/edit/delete anything on the WebUI. Can also create/manage WebUI users.<br/>2. **superuser** — can view/create/edit/delete anything on the WebUI.<br/>3. **user** — can only view anything on the WebUI.<br/><br/>For multiple users, separate each by a comma. Example: `admin,admin,changethispassword1234,user,guest,password123` |
| `argo_event_webhook_source_bearer_token` | A token needed for making specific argo events calls. General token rules apply (Eg. `1234-5678-90abcdefg`). |
| `ftc_license_key` | This is the Cambria FTC license key that Capella should have provided. The license key should start with a '2'. Only one license key is needed here (Eg. `2AB122-11123A-ABC890-DEF345-ABC321-543A21`). |
| `grafana_admin_password` | The password for Grafana Dashboard. General password rules apply. |
| `loki_s3_access_key` | The recommended log storage solution is AWS S3 or compatible S3 storage. If using this solution, this is the `ACCESS_KEY` or `AWS_ACCESS_KEY_ID`. |
| `loki_s3_secret_key` | The recommended log storage solution is AWS S3 or compatible S3 storage. If using this solution, this is the `SECRET_KEY` or `AWS_SECRET_ACCESS_KEY`. |

5. Once done, click on **Save Changes** and wait for the message **Changes were saved** to appear.
6. Click on **Open Terraform File** and choose the `CambriaClusterValues_IMPORTANT_VALUES.tf` file.
7. Using the UI, edit the fields accordingly. Reference the following table for values that should be changed:

| Terraform UI Editor Field | Explanation |
|---|---|
| `lke_cluster_name` | The name of the Kubernetes cluster. |
| `lk_region` | The region code where the Kubernetes cluster should be deployed. |
| `lke_manager_pool_node_count` | The number of Cambria Cluster nodes to create. |
| `lke_worker_pool_node_count` | The number of Cambria Stream nodes to create. |
| `manager_instance_type` | The instance type of the Cambria Cluster nodes. See Akamai documentation for information on how to get the instance type name. |
| `ftc_instance_type` | The instance type of the Cambria FTC nodes. See Akamai documentation for information on how to get the instance type name. |
| `max_ftc_instances` | The maximum number of encoders that the Kubernetes cluster can have up and running. |
| `cambria_cluster_replicas` | The maximum number of Cambria management + replica machines to have up and running. This should match the `lke_manager_pool_node_count` or be greater if more manager replicas will be needed after installation. |
| `host_name`, `acme_registration_email`, `acme_server` | One way to expose the main Cambria applications is to use an ingress. This information is needed to connect a real domain and TLS certificate to the ingress. The default values are only usable under a test environment. |
| `loki_storage_type` | Decide what type of storage to use for Loki logs. Recommended to use an S3 compatible storage like AWS S3. For testing purposes only, there is a filesystem version (set this to `local`). |
| `loki_local_storage_size_gi` | Used only for the local `loki_storage_type`. This is how many GB the Loki log volume should be.  Volumes can fill up quickly so testing different sizes may be required. |
| `loki_s3_bucket_name` | Used when `loki_storage_type = s3_embedcred`. This option should be changed if using the s3_embedcred loki_storage_type. This is the name of the S3 compatible bucket to write logs to |
| `loki_s3_region` | This option should be changed if using the s3_embedcred loki_storage_type. This is the region where the S3 bucket is located |
| `loki_log_retention_period` | Number of days to retain Loki logs in the storage device. Default is 7 days. |

8. Once done, click on **Save Changes** and wait for the message **Changes were saved** to appear.  
9. Close the Terraform UI Editor window.

### 3.2. (Optional) Cambria FTC Optional Values

Skip this step if the optional values don't need to be modified. Review the list of values in the chart below to help determine if any of the features need to be modified, such as **NVENC (GPU)**, **Ingress**, etc.

1. Run the Terraform editor UI:

```bash
./bin/TerraformVariableEditor
```

2. Click on **Open Terraform File** and choose the `CambriaClusterValues_OPTIONAL_VALUES.tf` file. Using the UI, edit the fields accordingly. Reference the following table for values that should be changed:

| Terraform UI Editor Field | Explanation |
|---|---|
| `workersUseGPU` [ BETA ] | This must be set to true if planning to use NVENC capabilities on the encoding machines. This is set to false by default. |
| `nbGPUs` | The max number of GPUs to use from the encoding machines if GPU functionality is enabled. This value should not exceed the amount of GPUs available. |
| `workersUseVPU` [ BETA ] | This must be set to true if planning to use netint VPU capabilities on the encoding machines. This is set to false by default. |
| `nbVPUs` | The max number of VPUs to use from the encoding machines if VPU functionality is enabled. This value should not exceed the amount of VPUs available. |
| `ftc_enable_auto_scaler` | This is used to enable / disable the FTC autoscaler which controls auto deployment of Cambria FTC encoders to handle encoding tasks dynamically. By default this is enabled (true). |
| `ftc_enable_scriptable_workflow` | This is used to enable / disable the FTC scriptable workflow feature. By default, this is disabled. |
| `enable_manager_webui` | If enabled, this allows users to use Cambria Clusterr's Web UI. Otherwise, only the REST API server can be used to interact with Cambria Cluster. |
| `storage_class_name` | The name of the storage class to use for volumes in the Kubernetes cluster. |
| `ftc_encoding_slots` | When a Cambria FTC worker node is connected to Cambria Cluster, this is the max number of encoding jobs it can run concurrently by default. |
| `expose_capella_service_externally` | This option tells the deployment to create load balancers to publicly expose the Capella application. |
| `enable_ingress` | This option tells the deployment to create an ingress for the Capella applications that should be exposed. |
| `ftc_license_mode` | The license mode for Cambria Cluster and FTC instances. Do not change this value unless instructed by Capella. |
| `enable_eventing` | This enables / disables the argo-events event-based system. By default, this is enabled (true). |
| `kubernetes_version` | The Kubernetes version number to use. Do not change this value unless instructed by Capella. |
| `install_monitoring` | This controls whether monitoring features (prometheus, grafana) should be installed. Do not change this value unless instructed by Capella. |

3. Once done, click on **Save Changes** and close the UI.

### 3.3. Deploy Kubernetes Cluster

1. Save the configured values to a `.tfvars` file (change **my-values** to desired name):

```bash
terraform-docs tfvars hcl . --description --sort=false --output-file=./my-values.tfvars --output-mode=replace --output-template="{{ .Content }}"
```

2. Create a Terraform plan. Follow the prompts on the terminal window:

```bash
terraform init && terraform plan -var-file=./my-values.tfvars
```

3. Create the Kubernetes cluster:

```bash
terraform apply -auto-approve -var-file=./my-values.tfvars
```

4. Set the `KUBECONFIG` environment variable:

```bash
export KUBECONFIG=kubeconfig.yaml
```

5. If deployment completes successfully, **store** the following files in a private location:

- `terraform.tfstate`  
- `my-values.tfvars`

These files are needed to make any changes to the created Kubernetes cluster.

---

## 4. Verification and Testing

Follow the steps in **section 5. Verify Cambria FTC / Cluster Installation** of the main *Cambria Cluster Kubernetes Installation Guide* for verification and **section 6. Testing Cambria FTC / Cluster** for testing with Cambria FTC jobs:

https://www.dropbox.com/scl/fi/jmndc09hsb308uzfv5yzd/Cambria_Cluster_and_FTC_5_6_0_on_Akamai_Kubernetes.pdf?rlkey=0yx9di8w6k8r79g28mu8quza7&st=azkbabl8&dl=0

### 4.1. Cambria Cluster / FTC Info

Run the following script to get important information such as **Cambria Cluster WebUI URL**, **REST API URL**, etc.

```bash
./bin/getFtcInfo.sh
```

---

## 5. Upgrading

This is the default way to perform an upgrade for anything from updating license keys, Cambria version, etc.

> **Important**  
> In cases where the Cambria installation / upgrade isn't working and is in an unrecoverable state, run steps **1–7** of this section and then run this command:  
> 
> ```bash
> helm uninstall capella-cluster --wait
> ```
> 
> **WARNING:** THIS COMMAND WILL DELETE THE CAMBRIA DATABASE. PLEASE SAVE ANY PROJECT FILES, CONFIG FILES, CREDENTIALS, ETC BEFORE RUNNING IT.

1. Review **section 1. Prerequisites** to verify they have been met.  
2. Verify that you have a **Linux deployment server**. To create a new Linux deployment server or verify that the deployment server tools are installed, run the steps in **1.2. Prepare Deployment Server**.  
3. Download / Paste your `.tfvars` and `.tfstate` files that were used for the Kubernetes cluster deployment into the Linux deployment server.  
4. Follow the steps in **section 2. Cambria FTC Package** to download the new Cambria FTC package.  
5. Update the Cambria FTC package with the values from the `.tfvars` file (replace `my-values.tfvars` with your file):
   ```bash
   ./bin/updateTfValuesFromTfvars.sh my-values.tfvars
   ```
6. Follow the steps in **3.1. Configure the Kubernetes Cluster** and **3.2. (Optional) Cambria FTC Optional Values** to configure new values / update previous values.  
7. Set the kubeconfig environment variable for the Kubernetes API and Terraform:
   ```bash
   export KUBECONFIG=kubeconfig.yaml && export KUBE_CONFIG_PATH=kubeconfig.yaml
   ```
8. Make sure all `cambriacluster` and `pgcluster` pods are attached to a node. Check that all pods are in a running state:
   ```bash
   kubectl get pods -n default && kubectl get pods -n capella-database
   ```
   If any pod in this list is in a **pending** state, see **section 3.1** and make sure the number of manager nodes created equals the amount of `cambriastreammanager-xyz` pods you see in this list.
9. Run the Terraform install instructions from **section 3.3. Deploy Kubernetes Cluster**.  
10. *(Skip if you ran the “Important” steps above.)* Run this command to restart the manager deployments:
    ```bash
    kubectl rollout restart deployment cambriaclusterwebui cambriaclusterapp -n default
    ```
11. *(Skip if you ran the “Important” steps above.)* Restart the worker deployment:
    ```bash
    kubectl rollout restart deployment cambriaftcapp -n capella-worker
    ```

---

## 6. Cleanup / Delete

Many resources are created in a Kubernetes environment. It is important that each step is followed carefully.

1. Verify that you have a **Linux deployment server**. To create a new Linux deployment server or verify that the deployment server tools are installed, run the steps in **1.2. Prepare Deployment Server** and also in **2. Cambria Stream Package**.  
2. Download / Paste your `.tfvars` and `.tfstate` files that were used for the Kubernetes cluster deployment into the Linux deployment server.  
3. Download / Paste the `kubeconfig.yaml` file of your Kubernetes cluster into the Linux deployment server.  
4. Linux deployment server, run the following command to update the Cambria Stream package with the values from the `.tfvars` file (replace `my-values.tfvars` with your file):
   ```bash
   ./bin/updateTfValuesFromTfvars.sh my-values.tfvars
   ```
5. Run the following command to destroy the Kubernetes cluster:
   ```bash
   terraform init && terraform apply -destroy -auto-approve -var-file=./my-values.tfvars
   ```

---

*End of document.*
