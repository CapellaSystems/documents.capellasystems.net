
# Cambria Cluster / FTC 5.8.0

## Akamai Cloud Kubernetes Help Documentation

### Terraform Installation


## Document History

|**Version**|**Date**|**Description**|
|---|---|---|
|5.6.0|10/31/2025|Updated for release 5.6.0.26533 (Linux)|
|5.8.0|07/01/2026|Updated for release 5.8.0.31580 (Linux)|



*** Download the online version of this document for the latest information and latest files. Always download the latest files** 

**Do not move forward with the installation process if you do not agree with the End User License Agreement (EULA) for our products. You can download and read the EULA for Cambria FTC, Cambria Cluster, and Cambria License Manager from the links below:** 

**Cambria Cluster | Cambria FTC | Cambria License Manager** 

https://www.dropbox.com/s/1wg7ee7a59kzi8h/EULA_Cambria_License_Manager.pdf?dl=0

https://www.dropbox.com/s/oemlax63aatjjiw/EULA_Cluster.pdf?dl=0

https://www.dropbox.com/s/ualv9usxsowh6m2/EULA_FTC.pdf?dl=0

### **Important: Limitations and Security Information** 

Cambria FTC, Cluster, and License Manager are installed on Linux in containers. Limitations and security information can be found in the document below: 

https://www.dropbox.com/scl/fi/zwojjdyy4kd6ul0s843kx/Cambria_FTC_5_8_0_Limitations_and_Security_Information.pdf?rlkey=ei1tnflrwm8nduiewfd6g6ghu&st=wi4rgxvh&dl=0

##### **Important: Before You Begin** 

PDF documents have a copy/paste issue. For best results, download this document and any referenced PDF documents in this guide and open them in a PDF viewer such as Adobe Acrobat. 

For commands that are in more than one line, copy each line one by one and check that the copied command matches the one in the document. 

The sections below provide instructions on creating a **NEW** basic Kubernetes cluster with Cambria FTC / Cluster with default settings and more open security settings. For more granular control and non-default settings, consult Akamai Cloud documentation. 

##### **Information** 

This document references Kubernetes version **1.35** only 


# ⚠ **Critical Information: Read Before Proceeding** 

**Before starting the installation, carefully review the following considerations. Skipping this section may result in errors, failed deployments, or misconfigurations.** 

#### 1. **A New Kubernetes Cluster Will Be Deployed** 

- The installation process **creates a brand-new Kubernetes cluster** to keep the Cambria ecosystem isolated from other applications. 

#### **2. Default Installation is Non-Secure** 

- The guide covers installation with **default settings in an open environment** (not secure). 

- If you require a **secure or customized setup** , you will need **Akamai Cloud expertise** , which is **not covered in this guide** . 

- Firewall information is provided in section Firewall Information 

#### **3. Understand Your Transcoding Requirements** 

- Know your **expected transcoding volume** , **input/output specs** , and whether a **GPU is needed** . 

- Refer to section Akamai Cloud Machine Information and Benchmark for guidelines on machine requirements. 

#### **4. Administrative Rights Required** 

- Many of the steps in this guide require administrative rights to Akamai Cloud for adding permissions and performing other administrative functions of that sort. 

#### **5. Check Akamai Cloud Account Quota** 

   - Ensure the **Akamai Cloud account has sufficient quota** to deploy Kubernetes resources. 

   - See section Resource Usage for estimated resource requirements. 

**6. A Separate Linux Machine is Required** 

   - A **dedicated Linux machine** (preferably Ubuntu on an Akamai Cloud Linode machine) is needed to deploy Kubernetes. 

   - Keeping Kubernetes tools and configuration files **on a dedicated system** is strongly recommended. 

#### **7. Verify Region-Specific Resource Availability** 

- Not all **Akamai Cloud regions** support the same resources (e.g., **GPU availability varies by region** ). 

- Consult Akamai Cloud documentation to confirm **available resources in your desired region** . 

#### **8. Tools Being Deployed: Prometheus, Grafana, Loki, and Alloy** 

- Prometheus as the monitoring tool, Grafana as the visualization tool, Loki as the logging manager, and Alloy as the logging scraper. 

#### **9. Cloud Storage for Logs is Recommended** 

- It is highly recommended to use the S3 Loki configuration for log storage for production 

- This is also recommended for testing but this guide does provide a Filesystem configuration that writes logs to volumes only 

- The filesystem version of Loki will only retain 1 days worth of logs max and it is not as reliable as other method 

#### **10. S3 Loki Configuration Requires At Least 2 Nodes** 

- For S3 Loki configuration, it is required to at least have 2 nodes running on the kubernetes cluster at any given time. 

- The S3 bucket that the logs are written to will need to have a **lifecycle policy** configured to manage log deletion 

##### **11. GUI-Based Operating System Required** 

- The terraform deployment uses a desktop UI tool for editing configuration files. 

- Either the Linux deployment server or an SSH client for the Linux deployment server needs to have a UI 

# **Document Overview** 

The purpose of this document is to provide a walkthrough of the installation and initial testing process of the Cambria Cluster and Cambria FTC applications in the Kubernetes environment. The basic view of the document is the following: 

1. Overview of the Cambria Cluster / FTC Environment in a Kubernetes Environment 

2. Preparation for the installation (Pre-requisites) 

3. Installation (LKE Cluster, 3rd-Party Tools, Cambria FTC / Cluster) 

4. Verify the Installation 

5. Testing Cambria FTC / Cluster 

6. Upgrading (Kubernetes Cluster, Cambria FTC / Cluster, Dependencies) 

7. Resource Cleanup / Deletion 

# **Overview of Cambria Cluster / FTC on Kubernetes** 

## Deployment Information: Cambria Cluster and Cambria FTC 

There are two major applications involved in this Kubernetes installation: Cambria Cluster and Cambria FTC. 

### Cambria Cluster 

Recommended deployment is at least 3 nodes with 3 replicas and an external LoadBalancer service. Each node runs one Cambria Cluster pod. One pod acts as the leader, while the others serve as replicas that can replace the leader if needed. 

Each Cambria Cluster pod includes: 

- Cambria Cluster application 

- **Leader Elector tool** , which selects the active leader pod 

- **Cambria FTC Autoscaler tool** , which automatically deploys FTC worker nodes for encoding when autoscaling is enabled, based on the number of queued encoding jobs 


![](./images/Cambria_Cluster_and_FTC_5_8_0_Terraform_on_Akamai_Kubernetes.pdf-0005-18.png)


Each active Cambria Cluster pod also has a corresponding PostgreSQL database pod. Data is replicated across the database pods to help preserve Cluster data if a pod or database issue occurs. 

### Cambria FTC 

Cambria FTC deployments consist of one or more encoding-focused nodes, typically using different instance types than the Cambria Cluster nodes. Each Cambria FTC pod runs on its own node and is dedicated to encoding tasks. 

Each Cambria FTC pod includes: 

- Cambria FTC application 

- **Auto-Connect FTC tool** , which finds the Cambria Cluster pod and connects the FTC pod to it. If no Cambria Cluster is found within about 20 minutes, it deletes its node pool or recycles its node. 

- **Pgcluster database** , which stores the encoder’s job data and related runtime information while the pod is running 

Each Kubernetes node runs either a Cambria Cluster deployment or a Cambria FTC deployment. 

## Resource Usage 


**The resources used and their quantities will vary depending on requirements and different environments** . Below is general information about some of the major resource usage (other resources may be used. Consult Akamai Cloud documentation for other resources created, usage limits, etc): 

#### **Akamai Cloud Documentation:** 

<u>https://techdocs.akamai.com/cloud-computing/docs/getting-started-with-lke-linode-kubernetes-engine</u> 

|**NodeBalancers**|0-3 NodeBalancers (Manager WebUI, Manager Web Server, Grafana)<br />0-1 NodeBalancer (Ingress)|
|---|---|
|**Nodes**|X Cambria Manager Instances (Default is 3)<br />Y Cambria FTC Instances (Depends on max FTC instance configuration; Default is 20)|
|**Networking**|No VPCs are created|
|**Security**|By default, no firewalls are created. However, Firewalls can be applied to the LKE cluster<br />nodes for stricter security|

## Akamai Cloud Machine Information and Benchmark

The following is a benchmark of two Akamai Cloud machines. The information below is as of October 2025. Note that the benchmark involves read from / write to Akamai ObjectStorage which influences the real-time speed of transcoding jobs.

| |**Container**|**Codec**|**Frame Rate**|**Resolution**|
|---|---|---|---|---|
|Source|TS|H.264|30|1920 x 1080 @ 8 Mbps|
|Output|HLS/TS|H.264|29.97|1920 x 1080 @ 4Mbps \| 1280 x 720 @ 2.4Mbps<br />640 x 480 @ 0.8Mbps \| 320 x 240 @ 0.3Mbps|



#### a. **g6-dedicated-16 [ AMD EPYC 7713 ]** 

|**Machine Info**|||||||
|---|---|---|---|---|---|---|
|**Name**|**RAM**|**CPUs**|**Storage**|**Transfer**|**Network In/Out**|**Cost per Hour**|
|Dedicated 32 GB|32 GB|16|640 GB|7 TB|40 Gbps / 7 Gbps|$0.432 (As of<br />10/15/2025)|



|**Benchmark Results**|||
|---|---|---|
|**# of Concurrent Jobs**|**Real Time Speed**|**CPU Usage**|
|2|**For Each job:**0.65x RT (slower than real-time)<br />**Throughput:**1.30x RT (it takes around 47 seconds to transcode<br />1 minute of source)|100%|



#### b. **g6-dedicated-56 [ AMD EPYC 7713 ]** 

|**Machine Info**|||||||
|---|---|---|---|---|---|---|
|**Name**|**RAM**|**CPUs**|**Storage**|**Transfer**|**Network In/Out**|**Cost per Hour**|
|Dedicated 256 GB|256 GB|56|5000 GB|11 TB|40 Gbps / 11 Gbps|$3.456 (As of<br />05/28/2024)|



|**Benchmark Results**|||
|---|---|---|
|**# of Concurrent Jobs**|**Real Time Speed**|**CPU Usage**|
|2|**For Each Job:**1.56x RT (faster than real-time)<br />**Throughput:**3.12x RT (it takes around 20 seconds to transcode<br />1 minute of source)|~90%|



#### <u>Benchmark Findings:</u> 

The results show the **g6-dedicated-56** has higher overall throughput. This is expected as the instance has more processing power than the **g6-dedicated-16** . However, if you take into account the cost per hour for each machine, the more cost efficient option is to go with the **g6-dedicated-16** . 

## Cambria Application Access 

The Cambria applications are accessible via the following methods: 

### Option 1: External Access via TCP Load Balancer 

The default Cambria installation configures the Cambria applications to be exposed through load balancers. There is one for the Cambria Manager WebUI + License Manager, and one for the web / REST API server. The load balancers are publicly available and can be accessed either through its public ip address or domain name, and the application's TCP port. 

Example: 

Cambria Manager WebUI: 

#### https://44.33.212.155:8161 

Cambria REST API: 

#### https://121.121.121.121:8650/CambriaFC/v1/SystemInfo 

External access in this way can be turned on / off via a configuration variable. If this feature is disabled, another method of access will need to be configured. 

### Option 2: Application Access via Domain Name: Traefik 

In cases where the external access via TCP load balancer is not acceptable or for using a purchased domain name from servicers such as GoDaddy, the Cambria installation provides the option to expose an ingress route. Similar to the external access load balancers, the Cambria Manager WebUI and web / REST API server are exposed. However, only one ip address / domain name is needed in this case. 

How it works is that the Cambria WebUI is exposed through the subdomain **webui** , the Cambria web server through the subdomain **api** , and Grafana dashboard through the subdomain monitoring. The following is an example with the domain **mydomain.com** 

Cambria Manager WebUI: 

#### https://webui.mydomain.com 

Cambria REST API: 

#### https://api.mydomain.com 

Grafana Dashboard: 

#### https://monitoring.mydomain.com 

Capella provides a default ingress hostname for testing purposes only. In production, the default hostname, ssl certificate, and other such information needs to be configured. More information about ingress configuration is explained later in this guide. 

## Firewall Information 

#### **By default, this guide creates a kubernetes cluster with default settings which do not include a** 

**Firewall** . For custom / non-default configurations, or to explore with a more restrictive network based on the default virtual network created, the following is a list of known ports that the Cambria applications use: 

|**Port(s)**|**Protocol**|**Traffic**|**Description**|
|---|---|---|---|
|8650|TCP|Inbound|Cambria Cluster REST API|
|8161|TCP|Inbound|Cambria Cluster WebUI|
|8678|TCP|Inbound|Cambria License Manager Web Server|
|8481|TCP|Inbound|Cambria License Manager WebUI|
|9100|TCP|Inbound|Prometheus System Exporter for Cambria Cluster|
|8648|TCP|Inbound|Cambria FTC REST API|
|3100|TCP|Inbound|Loki Logging Service|
|3000|TCP|Inbound|Grafana Dashboard|
|443|TCP|Inbound|Capella Ingress|
|ALL|TCP/UDP|Outbound|Expose all Outbound Traffic|



Also, for Cambria licensing, any Cambria Cluster and Cambria FTC machine requires that at least the following domains be exposed in your firewall (both inbound and outbound traffic): 

|**Domain**|**Port(s)**|**Protocol**|**Traffic**|**Description**|
|---|---|---|---|---|
|api.cryptlex.com|443|TCP|In/Out|License Server|
|cryptlexapi.capellasystems.net|8485|TCP|In/Out|License Cache Server|
|cpfs.capellasystems.net|8483|TCP|In/Out|License Backup Server|



## Specifications for Linux Deployment Server 

In order to deploy Cambria FTC, a Linux Deployment Server is required because this is where all of the tools, dependencies, and packages for the Cambria FTC Kubernetes deployment will be installed and/or stored. If you already have a deployment server, you can skip this section. 

#### **Important: Linux Deployment Server Machine Information** 

The instructions in this document perform functions using a root user. To keep things consistent, Capella strongly recommends using Akamai Linode instances for the deployment process. 

Capella tests deployment with the **Dedicated 4GB (g6-dedicated-2)** instance type 

#### **Minimum Requirements:** 

|**Operating System (OS)**|Ubuntu 24.04|
|---|---|
|**CPU(s)**|2|
|**RAM**|2 GB|
|**Storage**|10 GB|

# **Pre-requisites** 

## 1. X11 Forwarding for User Interface 

**If using SSH to access the Linux deployment server and the SSH client machine is either Windows or MAC** , there are some special tools that need to be installed in order to be able to use the user interface from Capella's terraform installer. **If using Linux, the machine must have a graphical user interface (GUI).** 

### Option 1: Microsoft Windows Tools 

1. Download and install the X11 Forwarding Tool Xming: 

https://github.com/marchaesen/vcxsrv/releases/download/21.1.16.1/vcxsrv-64.21.1.16.1.installer.noadmin.exe

2. Also, download and install PuTTY or similar tool that allows X11 Forwarding SSH: https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html 

3. Open XLaunch and do the following: 

- a. Window 1: Choose **Multiple windows** and set **Display number** to **0** 

- b. Window 2: Choose to **Start no client** 

- c. Window 3: Enable all checkboxes: **Clipboard** , **Primary Selection** , **Native opengl** , and **Disable access control** 

- d. Window 4: Click on **Save configuration** and save this somewhere to reuse in the future 

### Option 2: Apple MacOS Tools 

1. Download and install the X11 Forwarding Tool XQuartz: 

https://github.com/XQuartz/XQuartz/releases/download/XQuartz-2.8.5/XQuartz-2.8.5.pkg 

## 2. Prepare Deployment Server 

1. On the Akamai Dashboard, create a new Ubuntu Linode used for the terraform deployment. For best performance, choose an 8GB RAM or higher machine as X11 Forwarding uses a lot of memory on the Linode instance 

2. SSH into the new Linode and install general tools: 

```bash
sudo apt update && \
sudo DEBIAN_FRONTEND=noninteractive apt -o Dpkg::Options::="--force-confold" -y upgrade && \
sudo DEBIAN_FRONTEND=noninteractive apt -o Dpkg::Options::="--force-confold" -y install curl unzip libice6 libsm6 dbus libgtk-3-0
```

##### **Important** 

If during this step, a **Configuring openssh-server** menu shows up, choose **keep the local version currently installed** 

## 3. Cambria FTC Package 

1. SSH into the Linux deployment server, if not already done so. 

2. Download the terraform package: 

```bash
curl -o terraform_CambriaClusterLKE_5.8.0.zip -L \
"https://www.dropbox.com/scl/fi/47xyp3b3ttmloywey30nq/terraform_CambriaClusterLKE_5.8.0.zip?rlkey=skbimh8jlmstw15jstjz8jqak&st=v9nu0t6h&dl=1"
```

3. Unzip the package and make the shell scripts executable: 

```bash
unzip -o terraform_CambriaClusterLKE_5.8.0.zip && chmod +x ./bin/*.sh ./bin/TerraformVariableEditor
```

4. Install the tools needed for deployment: 

```bash
./bin/setupTools.sh && ./bin/installKubeToolsAkamai.sh && ./bin/installLogcli.sh && ./bin/installTerraformDocs.sh
```

5. Restart the SSH terminal window for the changes to take effect 

6. Verify the tools are installed: 

```bash
kubectl version --client && helm version && terraform --version && terraform-docs --version && linode-cli --version
```

# **Installation** 

## 1. Configure the Kubernetes Cluster 

1. SSH into the instance created in section Prepare Deployment Server using one of the following methods (depending on the OS being used as the SSH client): 

##### **<u>Option 1: Windows</u>** 

1. Open PuTTY or similar tool. Enable X11 Forwarding in the configuration. On PuTTY, this can be found in **Connection** > **SSH** > **X11** > **X11 forwarding** 

2. SSH into the instance with the created user. Usually, the user is **root** 

##### **<u>Option 2: Unix (Linux, MacOS)</u>** 

1. Open a terminal window and ssh into the Linode instance using -Y option and one of the created users. This is usually **root** . 

Example: 

```bash
ssh -Y -i "mysshkey" root@123.123.123.123
```

2. Run the terraform editor UI: 

```bash
./bin/TerraformVariableEditor
```

##### 3. Click on **Open Terraform File** and choose the **CambriaClusterValues_SENSITIVE_VALUES.tf** file from the **values** directory. 

4. Using the UI, edit the fields accordingly. Reference the following table for values that should be changed: 

|**Terraform UI Editor**|**Explanation**|
|---|---|
|pg_cluster_password|The password for the PostgreSQL database that Cambria Cluster<br />uses. General password rules apply|
|cambria_cluster_api_token|A token needed for making calls to the Cambria FTC web server.<br />General token rules apply (Eg. 1234-5678-90abcdefg)|
|cambria_cluster_webui_user|This is the login credentials for all of the Cambria WebUIs for the<br />kubernetes cluster. Each user is listed in the form:<br />role,username,password<br />**Allowed roles:**<br />**1. admin**- can view/create/edit/delete anything on the WebUI. Can<br />also create/manage WebUI users.<br />**2. superuser**- can view/create/edit/delete anything on the WebUI.<br />**3. user**- can only view anything on the WebUI.<br />For multiple users, separate each by a comma. Example:<br />admin,admin,changethispassword1234,user,guest,password123|
|argo_event_webhook_source_bearer_token|A token needed for making specific argo events calls. General token<br />rules apply (Eg. 1234-5678-90abcdefg)|
|ftc_license_key|This is the Cambria FTC license key that Capella should have<br />provided. The license key should start with a '2' in this case. Only<br />one license key is needed here (Eg.<br />2AB122-11123A-ABC890-DEF345-ABC321-543A21)|
|grafana_admin_password|The password for Grafana Dashboard. General password rules apply|
|loki_s3_access_key|The recommended log storage solution is AWS S3 or compatible S3<br />storage. If using this solution, this is the ACCESS_KEY or<br />AWS_ACCESS_KEY_ID|
|loki_s3_secret_key|The recommended log storage solution is AWS S3 or compatible S3<br />storage. If using this solution, this is the SECRET_KEY or<br />AWS_SECRET_ACCESS_KEY|
|linode_token|See<br />https://www.linode.com/docs/products/tools/api/guides/manage-api<br />-tokens/|

5. Once done, click on **Save Changes** and wait for the message **Changes were saved** to appear. 

6. Click on **Open Terraform File** and choose the **CambriaClusterValues_IMPORTANT_VALUES.tf** file. 

7. Using the UI, edit the fields accordingly. Reference the following table for values that should be changed: 

|**Terraform UI Editor**|**Explanation**|
|---|---|
|lke_cluster_name|The name of the kubernetes cluster|
|lk_region|The region code where the kubernetes cluster should be deployed|
|lke_control_plane_ha|If true, this option enables Akamai LKE's High Availability setting for the<br />cluster. This does incur an extra charge. See the Akamai Cloud website<br />for more information. By default, this is set to false.|
|lke_manager_pool_node_count|The number of Cambria Cluster nodes to create|
|lke_worker_pool_node_count|The number of Cambria Stream nodes to create|
|manager_instance_type|The instance type of the Cambria Cluster nodes. See Akamai<br />documentation for information on how to get the instance type name|
|ftc_instance_type|The instance type of the Cambria FTC nodes. See Akamai<br />documentation for information on how to get the instance type name|
|max_ftc_instances|The maximum number of encoders that the kubernetes cluster can<br />have up and running|
|cambria_cluster_replicas|The maximum number of Cambria management + replica machines to<br />have up and running. This should match the<br />**lke_manager_pool_node_count**or be greater if more manager<br />replicas will be needed after installation|
|host_name|One way to access the Cambria applications is through an Application<br />ingress. This is the domain name for the ingress (Eg. mydomain.com)|
|acme_registration_email<br />acme_server|This information is needed to connect a real TLS certificate to the<br />ingress. The default values are only usable under a test environment.|
|ingressUseSelfSigned|If true, use self-signed certificates for the Cambria application servers.<br />If false, the user needs to configure their own valid certificate for the<br />Cambria applications.|
|loki_storage_type|This is for deciding what type of storage to use for Loki logs. It is<br />recommended to use an S3 compatible storage like AWS S3. For testing<br />purposes only, there is a filesystem version of the Loki log storage<br />deployment. For this, change this to**local**|
|loki_local_storage_size_gi|This option is only used for the**local**loki_storage_type. This is how<br />many GB the Loki log volume should be. Volumes can fill up quickly so<br />testing different volume sizes may be required.|
|loki_s3_bucket_name|This option should be changed if using the**s3_embedcred**<br />loki_storage_type. This is the name of the S3 compatible bucket to<br />write logs to|
|loki_s3_region|This option should be changed if using the**s3_embedcred**<br />loki_storage_type. This is the region where the S3 bucket is located|
|loki_log_retention_period|This is the number of days to retain Loki logs in the storage device. By<br />default, this is set to 7 days.|



8. Once done, click on **Save Changes** and wait for the message **Changes were saved** to appear. 

9. (Optional) Skip this section if no optional values are needed. Click on **Open Terraform File** and choose the **CambriaClusterValues_OPTIONAL_VALUES.tf** file. Using the UI, edit the fields accordingly. Reference the following table for values that should be changed: 

|**Terraform UI Editor**|**Explanation**|
|---|---|
|workers_can_use_manager_nodes|If true, allow encoding capabilities on the management nodes. This will<br />allow deployment of Cambria worker pods on the management nodes.<br />Default is false|
|workersUseGPU|**[ BETA ]**This must be set to true if planning to use NVENC capabilities<br />on the encoding machines. This is set to false by default.|
|nbGPUs|The max number of GPUs to use from the encoding machines if GPU<br />functionality is enabled. This value should not exceed the amount of<br />GPUs available|
|workersUseVPU|[ BETA ]This must be set to true if planning to use netint VPU capabilities<br />on the encoding machines. This is set to false by default.|
|nbVPUs|The max number of VPUs to use from the encoding machines if VPU<br />functionality is enabled. This value should not exceed the amount of VPUs<br />available|
|ftc_enable_auto_scaler|This is used to enable / disable the FTC autoscaler which controls auto<br />deployment of Cambria FTC encoders to handle encoding tasks<br />dynamically. By default this is enabled (true).|
|ftc_enable_scriptable_workflow|This is used to enable / disable the FTC scriptable workflow feature. By<br />default, this is disabled.|
|enable_manager_webui|If enabled, this allows users to use Cambria Clusterr's Web UI.<br />Otherwise, only the REST API server can be used to interact with Cambria<br />Cluster.|
|enable_cluster_as_ftc|Set this to true if planning to run any management type of jobs (Eg. split<br />and stitch jobs). The default is false.|
|storage_class_name|The name of the storage class to use for volumes in the Kubernetes<br />cluster.|
|ftc_encoding_slots|When a Cambria FTC worker node is connected to Cambria Cluster, this is<br />the max number of encoding jobs it can run concurrently by default.|
|expose_capella_service_externally|This option tells the deployment to create load balancers to publicly<br />expose the Capella application|
|enable_ingress|This option tells the deployment to create an ingress for the Capella<br />applications that should be exposed.|
|ftc_license_mode|The license mode for Cambria Cluster and FTC instances.**Do not change**<br />**this value unless instructed by Capella.**|
|enable_eventing|This enables / disables the argo-events event-based system. By default,<br />this is enabled (true).|



|createCrashDumpOnManager|If true, anytime the Cambria management applications crash, a dump will<br />be created on the manager pod where the crash happened. As a result,<br />more storage might be needed to store the dumps on the nodes. By<br />default, this is set to false. Only recommended to be used for debugging<br />purposes|
|---|---|
|createCrashDumpOnWorker|If true, anytime the Cambria worker applications crash, a dump will be<br />created on the worker pod where the crash happened. As a result, more<br />storage might be needed to store the dumps on the nodes. By default,<br />this is set to false. Only recommended to be used for debugging purposes|
|webui_usertext|This is used for exposing important information to an operator of the<br />Cambria Web UI (Eg. API usertoken)|
|kubernetes_version|The Kubernetes version number to use.**Do not change this value**<br />**unless instructed by Capella.**|
|install_monitoring|This controls whether monitoring features (prometheus, grafana) should<br />be installed.**Do not change this value unless instructed by Capella.**|
|install_loki|This controls whether the Loki logs feature should be installed.**Do not**<br />**change this value unless instructed by Capella.**|
|expose_grafana|This option tells the deployment to make the Grafana dashboard<br />accessible publicly via a load balancer|
|loki_replicas|This option should only be changed if using the**s3_embedcred**<br />loki_storage_type. This is the number of Loki pod replicas to use for<br />handling log requests.At least 2 replicas need to be active for Loki to<br />work properly. Also, there should be at least the same amount of nodes<br />running to cover the number of replicas specified here.|
|loki_max_unavailable|This option should only be changed if using the**s3_embedcred**<br />loki_storage_type. This is how many Loki pods can be taken down when<br />performing upgrades. For simplicity, this value should be loki_replicas + 1|



10. Once done, click on **Save Changes** and close the UI 

11. Close the TerraformVariableEditor window 

## 2. Deploy the Kubernetes Cluster 

1. Save the configured values to a .tfvars file: 

```bash
terraform-docs tfvars hcl . --description --sort=false --output-file=cambriaftc.auto.tfvars --output-mode=replace \
--output-template="{{ .Content }}"
```

2. Run the following commands to create a terraform plan. Follow the prompts on the terminal window: 

```bash
terraform init && terraform plan
```

3. Run the following command to create the kubernetes cluster: 

```bash
terraform apply -auto-approve
```

4. Set the KUBECONFIG environment variable: 

```bash
export KUBECONFIG=kubeconfig.yaml
```

5. If deployment completes successfully, **Store the following files in a private location** : 

   - terraform.tfstate 

   - cambriaftc.auto.tfvars 

**These files are needed in order to make any changes to the created kubernetes cluster.** 

# **Installation Verification** 

## 1. Verify Cambria Cluster Deployment 

**Important:** The components below are only a subset of the whole installation. These are the components considered as key to a proper deployment. 

1. Run the following command: 

```bash
kubectl get all -n capella-manager
```

2. Verify the following information: 

|**Resources**|**Content**|
|---|---|
|Deployments|- 1**cambriaclusterapp**deployment with all items active<br />- 1**cambriaclusterwebui**deployment with all items active|
|Pods|- X pods with**cambriaclusterapp**in the name (X = # of replicas specified in config file)<br />with all items active / Running<br />- 1 pod with**cambriaclusterwebui**in the name|
|Services|- 1 service named**cambriaclusterservice**. If**exposeStreamServiceExternally**is true,<br />this should have an EXTERNAL-IP<br />- 1 service named**cambriaclusterwebuiservice**. If**exposeStreamServiceExternally**is<br />true, this should have an EXTERNAL-IP|



3. If any of the above are not in an expected state, wait a few more minutes in case some resources take longer than expected to complete. If after a few minutes there are still resources in an unexpected state, contact the Capella support team. 

4. Run the following command for the pgcluster configuration: 

```bash
kubectl get all -n capella-database
```

5. Verify the following information: 

|**Resources**|**Content**|
|---|---|
|Pods|- X pods with**pgcluster**in the name (X = # of replicas specified in config file) with all<br />items active / Running|
|Services|- 3 services with**pgcluster**in the name with a CLUSTER-IP assigned|



## 2. Verify Cambria FTC Deployment 

**Important:** The components below are only a subset of the whole installation.These are the components considered as key to a proper deployment. 

1. Run the following command: 

```bash
kubectl get all -n capella-worker
```

2. Verify the following information: 

|**Resources**|**Content**|
|---|---|
|Pods|- X pods with**cambriaftcapp**in the name (X = Max # of FTCs specified in the<br />config file)|
||**Notes:**<br />1. If using Cambria FTC autoscaler, all of these pods should be in a pending state.<br />Every time the autoscaler deploys a Cambria FTC node, one pod will be assigned to<br />it|
||2. If not using Cambria fTC autoscaler, Y of the pods should be in an active /<br />running state and all containers running (Y = # of Cambria FTC nodes active)|
|Deployments|- 1**cambriaftcapp**deployment.|



3. If any of the above are not in an expected state, wait a few more minutes in case some resources take longer than expected to complete. If after a few minutes there are still resources in an unexpected state, contact the Capella support team. 

## 3. Verify Applications are Accessible 

### 3.1. Cambria Cluster WebUI 

**Skip this step if the WebUI was set to disabled in the Helm values configuration yaml file or the ingress will be used instead.** For any issues, contact the Capella support team 

1. Get the WebUI address. **A web browser is required to access the WebUI** : 

**<u>Option 1:</u>** External Url if External Access is Enabled 

Run the following command: 

```bash
kubectl get svc/cambriaclusterwebuiservice -n capella-manager \
-o=jsonpath="{'https://'}{.status.loadBalancer.ingress[0].hostname}{':8161'}{'\n'}"
```

The response should look something like this: 

```text
https://192.122.45.33:8161
```

**<u>Option 2:</u>** Non-External Url Access 

Run the following command to temporarily expose the WebUI via port-forwarding: 

```bash
kubectl port-forward -n capella-manager svc/cambriaclusterwebuiservice 8161:8161 \
--address=0.0.0.0
```

The url depends on the location of the web browser. If the web browser and the port-forward are on the same machine, use **localhost** . Otherwise, use the **ip address** of the machine with the port-forward: 

```text
https://<server>:8161
```

2. In a web browser, enter the above url. This should trigger an "Unsafe" page similar to the one below: 


![](./images/Cambria_Cluster_and_FTC_5_8_0_Terraform_on_Akamai_Kubernetes.pdf-0021-15.png)



3. Click on **Advanced** and **Proceed to [ EXTERNAL IP ] (unsafe)** . This will show the login page. 


![](./images/Cambria_Cluster_and_FTC_5_8_0_Terraform_on_Akamai_Kubernetes.pdf-0022-01.png)



4. Log in using the credentials created in the Installation section 

### 3.2. Cambria Cluster REST API 

**Skip this step if the ingress will be used instead of external access or any other type of access.** For any issues, contact the Capella support team. 

1. Get the REST API address: 

**<u>Option 1:</u>** External Url if External Access is Enabled 

Run the following command: 

```bash
kubectl get svc/cambriaclusterservice -n capella-manager \
-o=jsonpath="{'https://'}{.status.loadBalancer.ingress[0].hostname}{':8650'}{'\n'}"
```

The response should look something like this: 

```text
https://192.122.45.33:8650
```

**<u>Option 2:</u>** Non-External Url Access 

Run the following command to temporarily expose the REST API via port-forwarding: 

```bash
kubectl port-forward -n capella-manager svc/cambriaclusterservice 8650:8650 --address=0.0.0.0
```

The url depends on the location of the port-forward. If the web browser and the port-forward are on the same machine, use **localhost** . Otherwise, use the **ip address** of the machine with the port-forward: 

```text
https://<server>:8650
```

2. Run the following API query to check if the REST API is active: 

```bash
curl -k -X GET https://<server>:8650/CambriaFC/v1/SystemInfo
```

### 3.3. Cambria License 

**Skip this step if the ingress will be used instead of external access or any other type of access.** The Cambria license needs to be active in all entities where the Cambria application is deployed. Run the following steps to check the cambria license. **Access to a web browser is required** : 

1. Get the url for the License Manager WebUI: 

**<u>Option 1:</u>** External Url if External Access is Enabled 

Run the following command: 

```bash
kubectl get svc/cambriaclusterwebuiservice -n capella-manager \
-o=jsonpath="{'https://'}{.status.loadBalancer.ingress[0].hostname}{':8481'}{'\n'}"
```

The response should look something like this: 

https://192.122.45.33:8481 

**<u>Option 2:</u>** Non-External Url Access 

Run the following command to temporarily expose the License WebUI via port-forwarding: 

```bash
kubectl port-forward -n capella-manager svc/cambriaclusterwebuiservice 8481:8481 \
--address=0.0.0.0
```

The url depends on the location of the port-forward. If the web browser and the port-forward are on the same machine, use **localhost** . Otherwise, use the **ip address** of the machine with the port-forward: 

```text
https://<server>:8481
```

2. In a web browser, enter the above url. This should trigger an "Unsafe" page similar to the one below: 


![](./images/Cambria_Cluster_and_FTC_5_8_0_Terraform_on_Akamai_Kubernetes.pdf-0023-14.png)



3. Click on **Advanced** and **Proceed to [ EXTERNAL IP ] (unsafe)** . This will show the login page. 


![](./images/Cambria_Cluster_and_FTC_5_8_0_Terraform_on_Akamai_Kubernetes.pdf-0024-01.png)



4. Log in using the credentials created in the Installation section 

5. Verify that the License Status is **valid** for at least either the Primary or Backup. Preferably, both Primary and Backup should be **valid** . If there are issues with the license, wait a few minutes as sometimes it takes a few minutes to properly update. If still facing issues, contact the Capella support team. 

### 3.4. Cambria Domain-Based Application Access 

**Skip this step if not planning to test with Cambria's domain-based access** . For any issues, contact the Capella support team. 

#### <u>3.4.1. Get the Ingress Endpoints</u> 

There are two ways to use the ingress: 

#### **<u>Option 1: Using Default Testing Ingress</u>** 

**Only use this option for testing purposes. Skip to option 2 for production** . In order to use the testing domain, the hostname needs to be DNS resolvable on the machines that will need access to the Cambria applications. 

1. Get the traefik service external address: 

```bash
kubectl get svc/traefik -n traefik -o=jsonpath="{.status.loadBalancer.ingress[0].hostname}{'\n'}"
```

The response should look similar to the following: 

#### 55.99.103.99 

2. In your local server(s) or any other server(s) that need to access the ingress, edit the hosts file (in Linux, usually /etc/hosts) and add the following lines **(Example)** : 

```text
55.99.103.99          api.myhost.com
55.99.103.99          webui.myhost.com
55.99.103.99          monitoring.myhost.com
```

#### **<u>Option 2: Using Publicly Registered Domain (Production)</u>** 

**Contact Capella if unable to set up a purchased domain with the ingress** . If the domain is set up, the endpoints needed are the following: 

#### **Example with mydomain.com as the domain:** 

```text
REST API:          https://api.mydomain.com
WebUI:             https://webui.mydomain.com
Grafana Dashboard: https://monitoring.mydomain.com
```

<u>3.4.2. Test Ingress Endpoints</u> 

**If using the test ingress, these steps can only be verified in the machine(s) where the hosts file was modified. This is because the test ingress is not publicly DNS resolvable and so only those whose hosts file (or DNS) have been configured to resolve the test ingress will be able to access the Capella applications in this way.** 

1. Test Cambria Cluster WebUI with the ingress that starts with **webui** . Run steps 2-3 of Cambria Cluster WebUI. Example: 

https://webui.myhost.com 

2. Test Cambria REST API with the ingress that starts with **api** . Run step 2 of Cambrai Cluster REST API. Example: 

https://api.myhost.com/CambriaFC/v1/SystemInfo 

3. Test Grafana Dashboard with the ingress that starts with **monitoring** 

https://monitoring.myhost.com 

# **Testing Cambria FTC / Cluster** 

The following guide provides information on how to get started testing the Cambria FTC / Cluster software: 

https://www.dropbox.com/scl/fi/4c03qwdg7xeb7hvfy24k1/Cambria_Cluster_and_FTC_5_8_0_Kubernetes_User_Guide.pdf?rlkey=jhwtqvbf409lquxg7k2awkq9h&st=bp46ftb9&dl=0

# **Upgrading / Updating** 

## Updating Kubernetes Cluster to New Version

Since upgrading Kubernetes versions is an irreversible process, Capella highly recommends creating a new Kubernetes cluster with the desired version. 

#### **Warning: Using a Different Kubernetes Version Than the Document** 

The Cambria Cluster / FTC Kubernetes documents are each tested on a specific Kubernetes version. For upgrading, it is recommended to download the latest Cambria Cluster / FTC Kubernetes document and use the latest Kubernetes version that was tested in that document. 

If you would like to use a different kubernetes version than the one tested, be aware that the steps in the document may not work as intended. 

1. Download the latest Cambria FTC / Cluster Kubernetes Installation guide 

2. Follow the steps in that document 

## Updating Cambria FTC / Cluster and Dependencies

This is the default way to perform an upgrade for anything from updating license keys, Cambria version, etc. 

#### **Important** 

in cases where the Cambria installation / upgrade isn't working and is in an unrecoverable state, run steps 1-7 of this section and then run this command 

```bash
helm uninstall capella-cluster --wait
```

**WARNING:** THIS COMMAND WiLL DELETE THE CAMBRIA DATABASE. PLEASE SAVE ANY PROJECT FILES, CONFIG FILES, CREDENTIALS, ETC BEFORE RUNNING IT 

1. Go through the steps in Pre-requisites to make sure all of those requirements are met 

2. If not already done, download / Paste your **cambriaftc.auto.tfvars** and **terraform.tfstate** files that were used for the Kubernetes cluster deployment into the Linux deployment server 

3. Follow the steps in the Installation section to configure the new values and re-deploy terraform 

4. **Skip this step if you ran the steps in the Important section** . Restart the Cambria Cluster and Cambria FTC deployments: 

```bash
kubectl rollout restart deployment cambriaclusterwebui cambriaclusterapp -n capella-manager
kubectl rollout restart deployment cambriaftcapp -n capella-worker
```

# **Resource Cleanup / Deletion** 

Many resources are created in a Kubernetes environment. **It is important that each step is followed carefully** 

1. Make sure you have a **Linux Deployment server** . See sections Prepare Deployment Server and Cambria FTC Package 

2. If not already done, download / Paste your **cambriaftc.auto.tfvars** and **terraform.tfstate** files that were used for the Kubernetes cluster deployment into the Linux deployment server 

3. Get the kubeconfig file for the Kubernetes cluster: 

```bash
kubectl config view --raw > kubeconfig.yaml
```

4. Run the following command to destroy the kubernetes cluster: 

```bash
export KUBECONFIG=kubeconfig.yaml && terraform init && terraform apply -destroy -auto-approve
```
