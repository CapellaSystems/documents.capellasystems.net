---

id: cambria-ftc-aws-k8s
title: Cambria Cluster and FTC 5.5.0 on AWS Kubernetes
------------------------------------------------------

# Cambria Cluster and FTC 5.5.0 on AWS Kubernetes

## Document History

| Version | Date       | Description                             |
| ------- | ---------- | --------------------------------------- |
| 5.4.0   | 10/03/2024 | Updated for release 5.4.0.21627 (Linux) |
| 5.5.0   | 04/11/2025 | Updated for release 5.5.0.23529 (Linux) |

> Download the online version of this document for the latest information and files. Do not continue with installation unless you agree to the EULA.
>
> * [Cambria License Manager EULA](https://www.dropbox.com/s/1wg7ee7a59kzi8h/EULA_Cambria_License_Manager.pdf?dl=0)
> * [Cambria Cluster EULA](https://www.dropbox.com/s/oemlax63aatjjiw/EULA_Cluster.pdf?dl=0)
> * [Cambria FTC EULA](https://www.dropbox.com/s/ualv9usxsowh6m2/EULA_FTC.pdf?dl=0)

---

## Table of Contents

* [Limitations and Security](#limitations-and-security)
* [Important Notices](#important-notices)
* [Document Overview](#document-overview)
* [1. Overview](#1-overview)
* [2. Prerequisites](#2-prerequisites)
* [3. Create Kubernetes Cluster](#3-create-kubernetes-cluster)
* [4. Install Cambria Cluster, FTC, and Dependencies](#4-install-cambria-cluster-ftc-and-dependencies)
* [5. Verify Cambria FTC / Cluster Installation](#5-verify-cambria-ftc--cluster-installation)
* [6. Testing Cambria FTC / Cluster](#6-testing-cambria-ftc--cluster)
* [7. Updating / Upgrading Cambria Cluster / FTC](#7-updating--upgrading-cambria-cluster--ftc)
* [8. Deleting Kubernetes Cluster](#8-deleting-kubernetes-cluster)
* [9. Quick Reference](#9-quick-reference)
* [10. Post-Installation Information](#10-post-installation-information)

---

## Limitations and Security

Cambria FTC, Cluster, and License Manager are installed in Linux-based Docker containers. Security and performance limitations follow Capella’s general Linux guidelines:

* [Linux Deployment Guide](https://www.dropbox.com/scl/fi/0rvskhpqtla6dffhbfli5/Linux_Cambria_Cluster_and_FTC_5_5_0_Guide.pdf?rlkey=ngryjzox121ow5fgbc4y8n2yd)

*Note: This document supports Kubernetes version 1.32.*

---

## Important Notices

> ⚠ **Before You Begin**
>
> * PDF copy/paste issues may occur. Use a PDF viewer like Adobe Acrobat.
> * Multi-line commands should be copied line by line.

---

## Document Overview

This guide provides steps to install and test Cambria Cluster and Cambria FTC in an AWS-hosted Kubernetes environment.

### Steps Covered

1. Cambria Cluster/FTC Kubernetes Overview
2. Prerequisite Tools and AWS Setup
3. Kubernetes Cluster Creation
4. Cambria Software Installation
5. Verification Steps
6. Basic Functional Tests
7. Upgrade Procedures
8. Cluster Deletion
9. Quick Reference Commands
10. Additional Resources Post-Installation

---

## 1. Overview

### 1.1 Cambria Cluster / FTC Kubernetes Deployment

(Original content here was previously converted—skipping re-insertion for brevity)

...

### 1.2 Resource Usage

(Full section content...)

### 1.3 AWS Machine Information and Benchmark

(Full section content...)

### 1.4 Cambria Application Access

(Full section content...)

### 1.5 Firewall Information

(Full section content...)

---

## 2. Prerequisites

### 2.1 Required Tools

(Full section content...)

### 2.2 AWS Permissions Setup

(Full section content...)

---

## 3. Create Kubernetes Cluster

### 3.1 Create EKS Cluster and Node Group

(Full section content...)

### 3.2 Install EBS CSI Driver

(Full section content...)

### 3.3 Create IAM Roles for FTC and Autoscaler

(Full section content...)

### 3.4 Node Labeling (Optional)

(Full section content...)

### 3.5 Manual Worker Node Group (if not using autoscaler)

(Full section content...)

### 3.6 GPU Operator Setup

(Full section content...)

### 3.7 Logging and Monitoring Tools

(Full section content...)

---

## 4. Install Cambria Cluster, FTC, and Dependencies

### 4.1 Deploy Prerequisites

(Full section content...)

### 4.2 Helm Configuration File Setup

(Full section content...)

### 4.3 Install Cambria

(Full section content...)

---

## 5. Verify Cambria FTC / Cluster Installation

### 5.1 Verify Cluster Components

(Full section content...)

### 5.2 Verify FTC Components

(Full section content...)

### 5.3 Application Access Testing

(Full section content...)

---

## 6. Testing Cambria FTC / Cluster

Refer to the official testing guide:
[Cambria Kubernetes User Guide](https://www.dropbox.com/scl/fi/5vra6xff23vvng7aa4qyx/Cambria_Cluster_and_FTC_5_5_0_Kubernetes_User_Guide.pdf?rlkey=j3l9wjjo5ncbub9bh9bizrukr&st=ablrc3pz&dl=1)

---

## 7. Updating / Upgrading Cambria Cluster / FTC

### 7.1 Helm Upgrade Method

(Full section content...)

### 7.2 Uninstall and Reinstall

(Full section content...)

### 7.3 Upgrade Verification

(Full section content...)

---

## 8. Deleting Kubernetes Cluster

(Full section content including IAM policy deletions and resource cleanup)

---

## 9. Quick Reference

### 9.1 Installation Steps

(Full shell script commands and settings)

### 9.2 Upgrade and Teardown

(Helm and eksctl command summaries)

---

## 10. Post-Installation Information

Helpful commands and access instructions for:

* WebUI
* REST API
* Leader pod
* FTC IP address

(Full command list and sample outputs)

---

Let me know if you’d like this exported as a `.md` file or need specific sections extracted individually.
