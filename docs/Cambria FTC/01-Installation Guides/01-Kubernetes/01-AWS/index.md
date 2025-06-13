Cambria Cluster / FTC 5.5.0 

Akamai Cloud Kubernetes Help Documentation 

Terraform Installation 

 
 
 
 
 
 
 
Document History 

Version 

Date 

Description 

5.4.0 

5.5.0 

10/03/2024 Updated for release 5.4.0.21627 (Linux) 

04/11/2025 Updated for release 5.5.0.23529 (Linux) 

* Download the online version of this document for the latest information and latest files. Always 
download the latest files 

Do not move forward with the installation process if you do not agree with the End User License 
Agreement (EULA) for our products. You can download and read the EULA for Cambria FTC, Cambria 
Cluster, and Cambria License Manager from the links below: 

Cambria Cluster | Cambria FTC | Cambria License Manager 
https://www.dropbox.com/s/1wg7ee7a59kzi8h/EULA\_Cambria\_License\_Manager.pdf?dl=0 
https://www.dropbox.com/s/oemlax63aatjjiw/EULA\_Cluster.pdf?dl=0 
https://www.dropbox.com/s/ualv9usxsowh6m2/EULA\_FTC.pdf?dl=0 

Limitations and Security Information 
Cambria FTC, Cluster, and License Manager are installed on Linux Docker containers. Limitations and security checks 
done for this version are included in our general Linux Documents below.  

Note: these documents are for informational use only. The setup for Kubernetes starts in section 2. Create 
Kubernetes Cluster. 

Cambria FTC / Cluster: 
https://www.dropbox.com/scl/fi/0rvskhpqtla6dffhbfli5/Linux\_Cambria\_Cluster\_and\_FTC\_5\_5\_0\_Guide.pdf?rlkey=ngry
jzox121ow5fgbc4y8n2yd 

Note: this document references Kubernetes version 1.32 only 

!Important! Before You Begin 

PDF documents have a copy/paste issue. For best results, download this document and any referenced PDF 
documents in this guide and open them in a PDF viewer such as Adobe Acrobat. 

For commands that are in more than one line, copy each line one by one and check that the copied command 
matches the one in the document. 

⚠ Critical Information: Read Before Proceeding with Installation 
Before starting the installation, carefully review the following considerations. Skipping this section may 
result in errors, failed deployments, or misconfigurations. 

Read only the Critical Information: Read Before Proceeding with Installation sections of the following documents: 

Cambria Cluster Installation: 
https://www.dropbox.com/scl/fi/irkmp89qh17bo9w4459qw/Cambria\_Cluster\_and\_FTC\_5\_5\_0\_on\_Akamai\_Kubernete
s.pdf?rlkey=vmq8fcqdbv3dul5cqq9em4r91&st=5gecxrgs&dl=0 

Monitoring and Logging with Prometheus and Loki: 
https://www.dropbox.com/scl/fi/rxshb6038wd9yg81kxagd/Prometheus\_Grafana\_Setup\_for\_Cambria\_Cluster\_5\_5\_0\_
on\_Akamai\_Kubernetes.pdf?rlkey=5l561e8x251y46gywx57k5svm&st=prp5ca3q&dl=0 

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
1. Prerequisites 

1.1. X11 Forwarding for User Interface 
For Windows and Mac only, there are some special tools that need to be installed in order to be able to use the user 
interface from Capella's terraform installer. If using Linux, the machine must have a graphical user interface. 

1.1.1. Option 1: Microsoft Windows Tools 

1. Download and install the X11 Forwarding Tool Xming: 
https://github.com/marchaesen/vcxsrv/releases/download/21.1.13/vcxsrv-64.21.1.13.0.installer.exe 

2. Also, download and install PuTTY or similar tool that allows X11 Forwarding SSH: 
https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html 

3. Open XLaunch and do the following: 

a. Window 1: Choose Multiple windows and set Display number to 0 
b. Window 2: Choose to Start no client 
c. Window 3: Enable all checkboxes: Clipboard, Primary Selection, Native opengl, and Disable access 

control 

d. Window 4: Click on Save configuration and save this somewhere to reuse in the future 

1.1.2. Option 2: Apple MacOS Tools 

1. Download and install the X11 Forwarding Tool XQuartz: 
https://github.com/XQuartz/XQuartz/releases/download/XQuartz-2.8.5/XQuartz-2.8.5.pkg 

2. Prepare Deployment Server 

1. On the Akamai Dashboard, create a new Ubuntu Linode used for the terraform deployment. For best performance, 
choose an 8GB RAM or higher machine as X11 Forwarding uses a lot of memory on the Linode instance 

2. SSH into the new Linode and install general tools: 

sudo apt update; sudo apt upgrade; sudo apt install curl unzip libice6 libsm6 dbus libgtk-3-0 

3. Download the terraform package: 

curl -o terraform\_LKE\_CambriaCluster\_1\_0.zip -L 
"https://www.dropbox.com/scl/fi/t8pgwr6otlg4lesgf3xbq/terraform\_LKE\_CambriaCluster\_1\_0.zip?rlkey=82rjt9l3at2
gfcztt7sy0zsz1&st=pwzmzhpb&dl=1" 

4. Unzip the package and make the shell scripts executable: 

unzip terraform\_LKE\_CambriaCluster\_1\_0.zip; chmod +x *.sh; chmod +x ./TerraformVariableEditor 

5. Install the tools needed for deployment: 

./setupTools.sh; ./installLogcli.sh 

6. Verify the tools are installed: 

kubectl version --client; helm version; terraform -v; logcli --version 

7. Exit from the SSH session 

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
3. Installation 

1. SSH into the instance created in section 2. Prepare Deployment Server using one of the following methods 
(depending on the OS being used as the SSH client): 

Option 1: Windows 

1. Open PuTTY or similar tool. Enable X11 Forwarding in the configuration. On PuTTY, this can be found in 
Connection > SSH > X11 > X11 forwarding 

2. SSH into the instance with the created user. Usually, the user is root 

Option 2: Unix (Linux, MacOS) 

1. Open a terminal window and ssh into the Linode instance using -Y option and one of the created users. This 
is usually root. 

Example: 

ssh -Y -i "mysshkey" root@123.123.123.123 

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
2. Run the following script to set secrets as environment variables. These are important details such as credentials, 
license keys, etc. Reference the following table: 

source ./setEnvVariablesCambriaCluster.sh 

Environment Variable 

Explanation 

Linode API Token 

API token from Akamai Cloud's Dashboard. See 
https://www.linode.com/docs/products/tools/api/guides/manage-api-tokens/ 

PostgreSQL Password 

The password for the PostgreSQL database that Cambria Cluster uses. General 
password rules apply 

Cambria API Token 

Web UI Users 

A token needed for making calls to the Cambria FTC web server. General token 
rules apply (Eg. 1234-5678-90abcdefg) 

This is the login credentials for all of the Cambria WebUIs for the kubernetes 
cluster. Each user is listed in the form: 

role,username,password 

Allowed roles: 
1. admin - can view/create/edit/delete anything on the WebUI. Can also 
create/manage WebUI users. 
2. superuser - can view/create/edit/delete anything on the WebUI. 
3. user - can only view anything on the WebUI. 

For multiple users, separate each by a comma. Example: 

admin,admin,changethispassword1234,user,guest,password123 

Argo Events Webhook Token 

A token needed for making specific argo events calls. General token rules apply 
(Eg. 1234-5678-90abcdefg) 

Cambria FTC License Key 

This is the Cambria FTC license key that Capella should have provided. The 
license key should start with a '2' in this case. Only one license key is needed 
here (Eg. 2AB122-11123A-ABC890-DEF345-ABC321-543A21) 

Grafana Password 

The password for Grafana Dashboard. General password rules apply 

Access Key 

Secret Key 

The recommended log storage solution is AWS S3 or compatible S3 storage. If 
using this solution, this is the ACCESS\_KEY or AWS\_ACCESS\_KEY\_ID 

The recommended log storage solution is AWS S3 or compatible S3 storage. If 
using this solution, this is the SECRET\_KEY or AWS\_SECRET\_ACCESS\_KEY 

3. Run the terraform editor UI: 

./TerraformVariableEditor 

4. Click on Open Terraform File and choose the CambriaCluster\_LKE.tf file. 

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
5. Using the UI, edit the fields accordingly. Reference the following table for values that should be changed: 

Blue: values in blue do not need to change unless the specific feature is needed / not needed 
Red: values in red are proprietary values that need to be changed based on your specific environment 

Terraform UI Editor 

Explanation 

lke\_cluster\_name = CambriaFTCCluster 

The name of the kubernetes cluster 

lk\_region = us-mia 

The region code where the kubernetes cluster should be 
deployed 

lke\_manager\_pool\_node\_count = 3 

The number of Cambria Cluster nodes to create 

workers\_can\_use\_manager\_nodes = false 

Whether the Cambria Cluster nodes should also be able 
to handle encoding tasks 

workersUseGPU = false 

nbGPUs = 1 

manager\_instance\_type = g6-dedicated-4 

ftc\_enable\_auto\_scaler = true 

ftc\_instance\_type = g6-dedicated-8 

max\_ftc\_instances = 5 

cambria\_cluster\_replicas = 3 

expose\_capella\_service\_externally = true 

enable\_ingress = true 

host\_name = myhost.com 

acme\_registration\_email = test@example.com 

acme\_server = https://acme-staging-v02.api.letsencrypt.org/directory 

enable\_eventing = true 

expose\_grafana = true 

This must be set to true if planning to use NVENC 
capabilities on the encoding machines 

The max number of GPUs to use from the encoding 
machines if GPU functionality is enabled. This value 
should not exceed the amount of GPUs available 

The instance type of the Cambria Cluster nodes. See 
Akamai documentation for information on how to get 
the instance type name 

This option enables the use of Cambria FTC's autoscaler 
feature. Set to false to disable it. If this is disabled, the 
encoder nodes will have to be manually created through 
the Akamai dashboard (or API). 

If using Cambria FTC's autoscaler feature, change this 
to the instance type that the autoscaled encoders 
should be 

The maximum number of encoders that the kubernetes 
cluster can have up and running 

The maximum number of Cambria Cluster management 
+ replica machines to have up and running. This should 
match the lke\_manager\_pool\_node\_count or be 
greater if more manager replicas will be needed after 
installation 

This option tells the deployment to create load 
balancers to publicly expose the Capella application 

This option tells the deployment to create an ingress for 
the Capella applications that should be exposed. 

If enable\_ingress is true, this is information needed to 
use a publicly registered domain name and TLS 
certificate for the Capella applications 

This option is for argo events where different 
event-based functionality can be used 

This option tells the deployment to make the Grafana 
dashboard accessible publicly via a load balancer 

 
 
 
 
 
 
 
 
loki\_storage\_type = s3\_embedcred 

loki\_local\_storage\_size\_gi = 100 

loki\_s3\_bucket\_name = "" 

loki\_s3\_region = "" 

loki\_replicas = 2 

loki\_max\_unavailable = 3 

loki\_log\_retention\_period = 7 

This is for deciding what type of storage to use for Loki 
logs. It is recommended to use an S3 compatible 
storage like AWS S3. For testing purposes only, there is 
a filesystem version of the Loki log storage deployment. 
For this, change this to local 

This option is only used for the local loki\_storage\_type. 
This is how many GB the Loki log volume should be. 
Volumes can fill up quickly so testing different volume 
sizes may be required. 

This option should be changed if using the 
s3\_embedcred loki\_storage\_type. This is the name of 
the S3 compatible bucket to write logs to 

This option should be changed if using the 
s3\_embedcred loki\_storage\_type. This is the region 
where the S3 bucket is located 

This option should be changed if using the 
s3\_embedcred loki\_storage\_type. This is the number 
of Loki pod replicas to use for handling log requests. At 
least 2 replicas need to be active for Loki to work 
properly. Also, there should be at least the same 
amount of nodes running to cover the number of 
replicas specified here. 

This option should be changed if using the 
s3\_embedcred loki\_storage\_type. This is how many 
Loki pods can be taken down when performing 
upgrades. For simplicity, this value should be 
loki\_replicas + 1 

This is the number of days to retain Loki logs in the 
storage device. By default, this is set to 7 days. 

6. Once done, click on Save Changes and close the UI 

7. Run the following commands to create a terraform plan. Follow the prompts on the terminal window: 

terraform init && terraform plan -out lke-plan.tfplan 

8. Run the following command to create the kubernetes cluster: 

terraform apply -auto-approve lke-plan.tfplan 

9. Set the KUBECONFIG environment variable: 

<pre> \`\`\`bash export KUBECONFIG=kubeconfig.yaml \`\`\` </pre>

10. If everything goes well, save the terraform state file (.tfstate) that is created, the terraform plan 
(lke-plan.tfplan), and also the CambriaCluster\_LKE.tf somewhere safe. This is needed for future deployments 
and to make changes to the created kubernetes cluster 

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
4. Verification and Testing 

Follow the steps in section 5. Verify Cambria FTC / Cluster Installation of the main Cambria Cluster Kubernetes 
Installation Guide for verification and section 6. Testing Cambria FTC / Cluster for testing with Cambria FTC jobs: 

https://www.dropbox.com/scl/fi/irkmp89qh17bo9w4459qw/Cambria\_Cluster\_and\_FTC\_5\_5\_0\_on\_Akamai\_Kubernete
s.pdf?rlkey=vmq8fcqdbv3dul5cqq9em4r91&st=5gecxrgs&dl=1 

5. Upgrading 

5.1. Option 1: Normal Upgrade via Terraform Apply 
This upgrade method is best for when changing version numbers, secrets such as the license key, WebUI users, 
etc, and Cambria FTC | Cambria Cluster specific settings such as max number of pods, replicas, etc. 

!Warning! Known Issues 

● pgClusterPassword cannot currently be updated via this method 
● Changing postgres version also cannot be updated via this method 
● Cannot change the region of the cluster 

1. Follow the steps in section 3. Installation 

2. Follow the verification steps in section 4. Verification and Testing to verify updates were applied 

5.2. Option 2: Upgrade via Cambria Cluster Reinstallation 
For any upgrade cases for the Cambria Cluster | Cambria FTC environment, this is the most reliable option. This 
upgrade option basically uninstalls all of the Cambria FTC and Cluster components and then reinstall with the 
new Helm chart and values (.yaml) file. As a result, this will delete the database and delete all of your 
jobs in the Cambria Cluster UI. 

1. Follow section 4.2. Creating and Editing Helm Configuration File to download and edit your new 
capellaClusterConfig.yaml file. 

2. In a command line / terminal window in your local server, run the following command: 

helm uninstall capella-cluster --wait 

3. Deploy the Helm configuration file with the following command 

helm upgrade --install capella-cluster capella-cluster.tgz --values cambriaClusterConfig.yaml 

4. Wait a few minutes for the kubernetes pods to install properly 

5. Follow the verification steps in section 4. Verification and Testing to verify updates were applied 

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
6. Cleanup 
Many resources are created in a Kubernetes environment. It is important that each step is followed 
carefully: If using FTC's autoscaler, make sure no leftover Cambria FTC nodes are running. 

1. Run the following commands to remove the Helm deployments: 

helm uninstall capella-cluster -n default --wait 

2. If any volumes are remaining, run the following command: 

```bash
kubectl get pv -o name | awk -F'/' '{print $2}' | xargs -I{} kubectl patch pv {} -p='{"spec": {"persistentVolumeReclaimPolicy": "Delete"}}'
```
<pre> ``` {"persistentVolumeReclaimPolicy": "Delete"} ``` </pre>

3. Delete all of the contents from the monitoring namespace (Prometheus, Grafana, Loki, etc): 

kubectl delete namespace monitoring 

4. Only if the ingress-nginx tool was deployed, do the following: 

kubectl delete namespace ingress-nginx 

5. Run the following command to destroy the kubernetes cluster: 

terraform destroy -auto-approve 

6. In the NodeBalancers section, delete any leftover node balancers that were created by the Kubernetes 
cluster 

7. In the Volumes section, delete any leftover volumes that were created by the Kubernetes Cluster 
