---
title: Cambria FTC and Cluster Trusted Executables and Scripts
---

# Cambria FTC and Cluster: Trusted Executables and Scripts

## Objective

This document serves as a guide on how to use **trusted executables and scripts** on **Cambria FTC and Cluster**. Starting in the **5.2 release**, any executables (**post-tasks, notifications**) or **Perl scripts** (**scriptable workflow**) used as part of a **Job** must be **trusted** by the machine executing the job.

Organizations should consult their **IT department** to determine the necessity of this feature and assist with its implementation.

## Description

The reason why executables and scripts need to be trusted is to ensure that only authorized programs are executed on a machine. When a script or an executable is registered as trusted, it means that the user or the system administrator has explicitly allowed it to run on the machine. Without this trust, any script or executable could potentially run on a machine, including those that are malicious or harmful.

By registering trusted executables and scripts, organizations can ensure that only authorized programs are executed on their machines, thereby reducing the risk of malware infections, data theft, and other security breaches. Additionally, the trusted list can help prevent unauthorized modifications to scripts or executables, as any change to the program will change its SHA256 hash, requiring the trusted list to be updated.

Overall, the registration of trusted executables and scripts is an important security measure that helps to mitigate the risk of security incidents caused by malicious programs, and organizations should take this process seriously to ensure the safety of their systems and data.


## Instructions

### Registering Trusted Executables

To register a **trusted executable**, follow these steps:

1. **Generate the SHA256 hash** for the executable file using the **SHA256 hash calculator** in the **FTC/Cluster Post Task tab** in **Preset Editor**.
2. Open the **Registry Editor** by typing `regedit` in the **search bar** or **Run dialog (Win+R)**.
3. Navigate to the registry key:
   ```
   HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\CAPELLA\CAMBRIA
   ```
4. **Create a new string value** called **TrustedAppSHA256**.
5. **Set the value** of `TrustedAppSHA256` to the **SHA256** of the executable.
   - If there are **multiple executables**, separate them with **commas**.
6. **Repeat** these steps for **each machine** where the executable should be trusted.

Alternatively, create a `.reg` file containing the **SHA256 hashes** and **run it as administrator** on each machine.

### Registering Trusted Perl Scripts

To register a **trusted Perl script**, follow the same steps as **trusted executables**, but use the registry key **TrustedScriptSHA256** instead of **TrustedAppSHA256**. 


> **Note:** Any changes to a Perl script will **modify** its SHA256 hash, requiring the trusted list to be **updated**.

### Using Python Scripts

Python scripts **execute in a sandbox**, meaning they **do not** need to be registered as trusted.

- However, **Python scripts do not have network access**, which may be required for some workflows.

## Security Considerations

- **Trusted executables** can be called with **different arguments**, so ensure they **do not allow unintended actions**.
- **If an executable accepts file names**, verify that the files are of the **expected type** and do **not** contain **malicious content**.
- **Perl scripts** that accept **user input** should **validate input** to prevent **injection attacks**.
- If **network access is unnecessary**, prefer using **Python scripts** instead of Perl to **reduce security risks**.

Organizations should **work with their IT department** to properly **identify risky executables and scripts**.


