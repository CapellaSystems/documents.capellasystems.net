---
id: external-postgresql
title: Using External PostgreSQL with Cambria FTC and Cluster
sidebar_position: 1
---

# Cambria FTC/Cluster Guide to Using External PostgreSQL

## Introduction

By default, **Cambria FTC/Cluster** installs **PostgreSQL** locally on the system disk.  
In some environments, this may not be allowed — for example when installation into **Program Files** is required due to system policies, security restrictions, or disk-management rules.

In these cases, you can configure FTC / Cluster to use an **externally installed PostgreSQL instance** instead of the bundled one.

> **Disclaimer:**  
> FTC and Cluster do not officially support externally installed PostgreSQL instances.  
> Certain features will not function as expected:
>
> - **Cluster redundancy** will not work (you will receive an error if you try to enable it).  
> - **Automatic PostgreSQL upgrades** will not occur — you must perform upgrades manually.  
>   Capella will provide advance notice for any required database version changes.  
> - **Administrative knowledge** is required to complete setup, including familiarity with:
>   - Windows UAC  
>   - Windows Registry  
>   - PostgreSQL command-line tools  
> - The **PostgreSQL bin** folder must be **readable and executable** by the *Cambria FTC/Cluster service*.  
> - The **PostgreSQL data** folder must be **fully controllable** by the *Cambria Cluster service*.  
> - A **compatible PostgreSQL version** must be properly installed and configured.  
>   Registry keys must be updated according to the instructions below.  
> - The **PostgreSQL password** will be visible in the Windows Registry.

---

## Steps for Using an External PostgreSQL with FTC/Cluster

### 1. Install PostgreSQL
Install a compatible version of PostgreSQL either:
- Externally, or  
- Inside the `FTC/Cluster Bin` folder.

### 2. Install FTC

Proceed with the normal FTC installation.

### 3. Update the Windows Registry

Modify the following registry entries under:

Computer\HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\CAPELLA\CAMBRIA


#### **Required Values**

| Key | Type | Example Value | Description |
|-----|------|----------------|--------------|
| `cpPostgresRootDir` | String | `C:\Program Files\PostgreSQL\14` | Root directory of the PostgreSQL installation |
| `cpPostgresPort` | DWORD (Decimal) | `5434` | Port used by PostgreSQL (must match your installation) |
| `cpPostgresPassword` | String | `1234` | Password for the PostgreSQL user |

#### **Optional Keys**

| Key | Type | Example Value | Description |
|-----|------|----------------|--------------|
| `cpPostgresDataDir` | String | `C:\Program Files\PostgreSQL\14\data` | Path to the PostgreSQL data directory |
| `cpPostgresServiceName` | String | `postgresql x64 14` | PostgreSQL service name |
| `cpPostgresUser` | String | `postgres` | PostgreSQL username |
| `cpPostgresDbname` | String | `postgres` | PostgreSQL database name |

---

## Troubleshooting

If you see this error message:

> **A required component (PostgreSQL database) is not running. You may need to reboot the machine.**

Check the following:

- ✅ The PostgreSQL service is running  
- ✅ The configured **port** and **service name** match your PostgreSQL setup  
- ✅ FTC / Cluster services have the necessary permissions for both the PostgreSQL **bin** and **data** folders  
- ✅ You have **rebooted** the machine after changing registry entries  

If you don’t remember the port used, you can find it in:

C:\Program Files\PostgreSQL\14\data\postgresql.conf

