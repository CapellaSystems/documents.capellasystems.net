---
id: cambria-snmp-setup
title: SNMP Setup and Monitoring with Cambria FTC
---

# SNMP Setup and Monitoring with Cambria FTC

This guide explains how to configure SNMP on Windows using **WinSNMP**, and how to test SNMP integration with **Cambria FTC** or **Cluster** using `snmpwalk` and `snmptrapd`.

---

## Section 1: Setup WinSNMP on Windows

1. Open **Add or Remove Programs** from the Windows search bar  
2. Under **Apps & features**, click **Optional features**  
3. Click **Add a feature**  
4. Search for **SNMP**, select it, and click **Install**

---

### Configure SNMP Service

1. Open **services.msc** (Service Manager)  
2. Locate and double-click **SNMP Service**  
3. Go to the **Security** tab  
   > If the tab doesn't appear, close and reopen Service Manager

4. Under **Accepted community names**:
   - Add `"public"` as **READ ONLY**
   - Add `"private"` as **READ WRITE**

5. Under **Accept SNMP packets from**:
   - Choose **Any host** (or manually specify the SNMP Manager host)

---

### Configure SNMP Traps

1. Go to the **Traps** tab  
2. Set **Community name** to `"public"`  
3. Set **Trap destination** to the **IP address** of your local machine  
4. Click **Apply** to save

✅ Ensure `snmp.exe` is running (check Task Manager)

---

## Section 2: Test SNMP with Net-SNMP Tools

> 📦 You must install the Net-SNMP toolkit:  
> [https://sourceforge.net/projects/net-snmp/files/latest/download](https://sourceforge.net/projects/net-snmp/files/latest/download)

Use default settings during installation.

### Supported FTC OID List

- `1.3.6.1.4.1.47181.0.0.1`: Total Jobs  
- `1.3.6.1.4.1.47181.0.0.2`: Running Job  
- `1.3.6.1.4.1.47181.0.0.3`: Failed Jobs  
- `1.3.6.1.4.1.47181.0.0.4`: Queued Jobs  
- `1.3.6.1.4.1.47181.0.0.5`: Completed Jobs  
- `1.3.6.1.4.1.47181.0.0.6`: Cancelled Jobs  
- `1.3.6.1.4.1.47181.0.0.7`: Paused Jobs

> 📝 These OIDs are accessible through any SNMP tool, not just Net-SNMP.

---

### Using `snmpwalk`

1. Open Command Prompt  
2. Run the following command to query all FTC OIDs:

```
C:\usr\bin\snmpwalk.exe -v 2c -c public localhost .1.3.6.1.4.1.47181
```

This returns all FTC-related job metrics.

To get a specific value (e.g., Total Jobs):

```
C:\usr\bin\snmpwalk.exe -v 2c -c public localhost .1.3.6.1.4.1.47181.0.0.1
```

📂 You can find additional SNMP command references in:
