Here is the cleaned and properly formatted Docusaurus Markdown file, using your requested structure (single block, no dropdowns, no broken sections):

```markdown
---
id: cambria-cluster-aws
title: Cambria Cluster & FTC 5.5.0 – Terraform on AWS Kubernetes
---

# Cambria Cluster & FTC 5.5.0 – Terraform on AWS Kubernetes

## Table of Contents

1. [Version and Overview](#version-and-overview)  
2. [Critical Notes](#critical-notes)  
3. [Prerequisites](#prerequisites)  
4. [Preparing the AWS EC2 Instance](#preparing-the-aws-ec2-instance)  
5. [Terraform Installation Process](#terraform-installation-process)  
6. [Post-Install Verification](#post-install-verification)  
7. [Upgrading](#upgrading)  
8. [Uninstallation](#uninstallation)

## Version and Overview

**Version:** Cambria Cluster & FTC 5.5.0  
**Deployment Target:** AWS Kubernetes (EKS)  
**Method:** Terraform-based deployment  

This guide outlines how to install Cambria Cluster and Cambria FTC version 5.5.0 using Terraform on Amazon EKS.

## Critical Notes

Before installing, review license agreements and documentation:  
- [License Manager EULA](https://www.dropbox.com/s/1wg7ee7a59kzi8h/EULA_Cambria_License_Manager.pdf?dl=0)  
- [FTC EULA](https://www.dropbox.com/s/ualv9usxsowh6m2/EULA_FTC.pdf?dl=0)  
- [Cluster EULA](https://www.dropbox.com/s/oemlax63aatjjiw/EULA_Cluster.pdf?dl=0)  
- [AWS Deployment Guide](https://www.dropbox.com/scl/fi/lbkhk9k6vwomxom3j6ad1/Cambria_Cluster_and_FTC_5_5_0_on_AWS_Kubernetes.pdf)  
- [Monitoring & Logging Guide](https://www.dropbox.com/scl/fi/bq3kk6l6qjzbm8i8h6pqe/Prometheus_Grafana_Setup_for_Cambria_Cluster_5_5_0_on_AWS_Kubernetes.pdf)

## Prerequisites

Provision an AWS EC2 instance:

- OS: Ubuntu 22.04  
- CPU: 4+ vCPUs  
- RAM: 16+ GB  
- Disk: 100 GB EBS  
- Security Group: allow TCP 22, 80, 443, 3000, 8080, 9443  
- IAM Role: permissions for EC2, S3, EKS, ACM  

Install required tools:

```
sudo apt update && sudo apt upgrade -y
sudo apt install curl unzip awscli libice6 libsm6 dbus libgtk-3-0
```

## Preparing the AWS EC2 Instance

Download and set up Terraform tools:

```
curl -o terraform_AWS_CambriaCluster_1_0.zip -L "https://www.dropbox.com/scl/fi/ck7ahg05yo0bglxz3itd1/terraform_AWS_CambriaCluster_1_0.zip?dl=1"
unzip terraform_AWS_CambriaCluster_1_0.zip
chmod +x *.sh TerraformVariableEditor
./setupTools.sh
./installLogcli.sh
```

Validate installs:

```
terraform -v
kubectl version --client
helm version
logcli --version
```

## Terraform Installation Process

Set AWS credentials:

```bash
export AWS_ACCESS_KEY_ID=<your-access-key>
export AWS_SECRET_ACCESS_KEY=<your-secret-key>
export AWS_REGION=<your-region>
```

Set Cambria environment variables:

```
source ./setEnvVariablesCambriaCluster.sh
```

Configure your deployment:

```
./TerraformVariableEditor
```

Edit `CambriaCluster_AWS.tf`:

```
eks_cluster_name = "CambriaCluster"
region = "us-west-2"
host_name = "cambria.example.com"
acme_registration_email = "admin@example.com"
ftc_instance_type = "m6a.2xlarge"
max_ftc_instances = 5
cambria_cluster_replicas = 3
loki_storage_type = "s3_embedcred"
loki_s3_bucket_name = "cambria-loki-bucket"
loki_log_retention_period = 7
expose_grafana = true
```

Apply the Terraform plan:

```
terraform init
terraform plan -out plan.tfplan
terraform apply -auto-approve plan.tfplan
```

Configure Kubernetes access:

```
export KUBECONFIG=kubeconfig.yaml
```

## Post-Install Verification

Check pods and services:

```
kubectl get pods -A
kubectl get svc -A
kubectl get ingress -A
```

Access UIs:

- FTC: https://<host_name>  
- Cluster UI: https://<host_name>:9443  
- Grafana: https://<host_name>:3000  

Verify successful encodes and log visibility via Grafana and Loki.

## Upgrading

### Option 1: Terraform Apply

Use for config updates like:

- Replica count  
- Secrets and license keys  
- Hostnames and S3 log options

Run:

```
terraform plan -out plan.tfplan
terraform apply -auto-approve plan.tfplan
```

### Option 2: Helm-Based Upgrade

If Helm is enabled:

```
helm uninstall capella-cluster --wait
helm upgrade --install capella-cluster capella-cluster.tgz --values cambriaClusterConfig.yaml
```

## Uninstallation

Remove Cambria components and infrastructure:

```
helm uninstall capella-cluster -n default --wait
kubectl get pv -o name | awk -F'/' '{print $2}' | xargs -I{} kubectl patch pv {} -p='{"spec":{"persistentVolumeReclaimPolicy":"Delete"}}'
kubectl delete namespace monitoring
kubectl delete namespace ingress-nginx
terraform destroy -auto-approve
```

Manually delete unused EKS clusters, volumes, load balancers, and S3 buckets if needed.
```
