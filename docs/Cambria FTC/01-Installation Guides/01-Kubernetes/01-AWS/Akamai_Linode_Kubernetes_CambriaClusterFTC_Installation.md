---
title: (Example) Cambria Cluster / FTC 5.4.0
sidebar_position: 1
description: Help documentation for Akamai Cloud Kubernetes with Cambria Cluster and FTC 5.4.0.
---

# Akamai Cloud Kubernetes Help Documentation

## Document History

| Version | Date       | Description                                                                 |
|---------|------------|-----------------------------------------------------------------------------|
| 5.3.0   | 06/07/2024 | Updated for release 5.3.0.20102 (Linux), 5.3.0.20015 (Windows)              |
| 5.4.0   | 10/03/2024 | Updated for release 5.4.0.21627 (Linux)                                    |

:::note
Download the online version of this document for the latest information and files. Always ensure you download the latest files.
:::

:::caution
Do not proceed with the installation process unless you agree to the End User License Agreement (EULA) for our products. You can download and read the EULA for the following:

- [Cambria Cluster](https://www.dropbox.com/s/oemlax63aatjjiw/EULA_Cluster.pdf?dl=0)
- [Cambria FTC](https://www.dropbox.com/s/ualv9usxsowh6m2/EULA_FTC.pdf?dl=0)
- [Cambria License Manager](https://www.dropbox.com/s/1wg7ee7a59kzi8h/EULA_Cambria_License_Manager.pdf?dl=0)
:::

## Limitations and Security Information

Cambria FTC, Cluster, and License Manager are installed on Linux Docker containers. Limitations and security checks for this version are detailed in our [general Linux Documents](https://www.dropbox.com/scl/fi/scur4u2gquntj08p50bqf/Linux_Cambria_Cluster_and_FTC_5_4_0_Guide.pdf?rlkey=swowq9u34pz640uo227dtqbnp).

:::note
These documents are for informational purposes only. The Kubernetes setup begins in **Section 2: Create Kubernetes Cluster**.

This document references Kubernetes version 1.31 only.
:::

:::important
PDF documents may have copy/paste issues. For best results, download this document and any referenced PDFs, and open them in a PDF viewer such as Adobe Acrobat.

For multi-line commands, copy each line individually and ensure the copied command matches the document.
:::

## Document Overview

This document provides a walkthrough for the installation and initial testing of Cambria Cluster and Cambria FTC in a Kubernetes environment. The key topics covered include:

1. Overview of the Cambria Cluster / FTC environment in Kubernetes.
2. Creating and configuring the Kubernetes Cluster.
3. Installing Cambria Cluster and Cambria FTC on the Kubernetes Cluster.
4. Verifying the installation.
5. Testing Cambria Cluster / FTC applications.
6. Viewing performance metrics using Prometheus / Grafana.
7. Updating Cambria Cluster / FTC applications on Kubernetes.
8. Deleting a Kubernetes Cluster.
9. Quick reference for Kubernetes installation.
10. Quick reference for important Kubernetes components (URLs, template projects, test players, etc).
11. Glossary of important terms.

## 1. Overview

Capella’s Cambria Cluster deployment is recommended to run on at least 3 nodes (replica = 3) with a service (Load Balancer) exposing the application externally. Each pod contains the following containers:

- **Cambria Cluster (application):** Core application.
- **Auto-Scale FTC dotnet tool:** Spawns Cambria FTC machines based on the number of queued transcoding jobs. The formula is: `(number of jobs + 2) / 3`.
- **Leader Elector tool:** Selects the main Cambria Cluster pod, with others as backups in case of failure.

Additionally, a PostgreSQL database runs in a separate pod for each Cambria Cluster node, with data replication across pods to preserve data integrity.

Cambria FTC deployments run on separate pods, each containing:

- **Cambria FTC (application):** Core application.
- **Auto-Connect FTC dotnet tool:** Lists pods, finds Cambria Cluster, and connects the FTC application to it. If no cluster is found within ~20 minutes, the node pool is recycled.
- **PostgreSQL:** Database for Cambria FTC application.

Each Kubernetes node runs either the Cluster deployment or the FTC deployment.

## 2. Create Kubernetes Cluster

To create a Kubernetes Cluster on Akamai Cloud, follow these steps:

1. Create a directory to store all setup files. This will be referred to as your `kubernetes` directory.

### Windows:
```bash
mkdir -p C:/Users/<your-username>/kubernetes/Akamai
```

### Linux:
```bash
mkdir -p /home/<your-username>/kubernetes/Akamai

