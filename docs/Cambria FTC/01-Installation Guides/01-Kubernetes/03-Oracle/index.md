---

id: cambria-ftc-oracle-k8s
title: Cambria Cluster and FTC 5.5.0 on Oracle Kubernetes
---------------------------------------------------------

# Cambria Cluster and FTC 5.5.0 on Oracle Kubernetes

## Document History

| Version | Date       | Description                             |
| ------- | ---------- | --------------------------------------- |
| 5.4.0   | 10/03/2024 | Updated for release 5.4.0.21627 (Linux) |
| 5.5.0   | 04/11/2025 | Updated for release 5.5.0.23529 (Linux) |

> Download the latest version of this document and referenced files for best results. Do not continue installation if you do not agree to the End User License Agreement (EULA).
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

This guide provides steps to install and test Cambria Cluster and Cambria FTC in an Oracle Cloud Infrastructure (OCI) Kubernetes environment.

---

## 1. Overview

(Oracle-specific cluster and FTC architecture, autoscaling behavior, and resource handling.)

---

## 2. Prerequisites

* OCI CLI installed
* kubectl, Helm 3.x
* OCI tenancy and user access with appropriate permissions
* Kubernetes cluster created using OKE (Oracle Kubernetes Engine)

---

## 3. Create Kubernetes Cluster

(Details on provisioning with OKE, setting up node pools, and setting compartment OCIDs.)

---

## 4. Install Cambria Cluster, FTC, and Dependencies

* Configure `values.yaml`
* Run `helm install` for Cambria
* Set up secrets and persistent volume claims if needed

---

## 5. Verify Cambria FTC / Cluster Installation

* Use `kubectl get pods`, check logs, and WebUI access

---

## 6. Testing Cambria FTC / Cluster

Run sample jobs or access internal endpoints. Verify encoding starts and outputs complete successfully.

---

## 7. Updating / Upgrading Cambria Cluster / FTC

* Use `helm upgrade`
* Optional full uninstall and reinstall

---

## 8. Deleting Kubernetes Cluster

* Delete using `oci ce cluster delete`
* Clean up VCNs and node pools manually if needed

---

## 9. Quick Reference

Commands for setup, verification, upgrade, and teardown.

---

## 10. Post-Installation Information

Useful links, access methods, and troubleshooting notes for Oracle-based deployments.
