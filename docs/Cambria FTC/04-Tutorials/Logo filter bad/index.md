---
id: snmp-guide
title: Cambria FTC – SNMP Integration
sidebar_label: SNMP Guide
---

## Setting Up WinSNMP for FTC and Cluster

To enable SNMP functionality for FTC and Cluster on Windows:

1. Search for **Add or Remove programs** in the Windows search bar.  
2. Under **Apps & Features**, click **Optional Features**.  
3. Click **Add a Feature**, search for **SNMP**, select it from the list, and click **Install**.  

![Screenshot](01_snmp_install.png)

4. Open **services.msc** to access the Service Manager.  
5. Locate **SNMP Service**, double-click it, and go to the **Security** tab.  
   > If the Security tab doesn’t appear, close and reopen Service Manager.

6. Under **Accepted community names**, click **Add**:
   - Add `"public"` as **READ ONLY**
   - Add `"private"` as **READ WRITE**

7. Choose **Accept SNMP packets from any host**, or specify a host.

![Screenshot](02_snmp_service_config.png)

8. In the **Traps** tab:
   - Set **Community Name** as `public`
   - Set **Trap Destination** as the IP address of your SNMP manager machine.

9. Click **Apply** to save settings.

10. Confirm that `snmp.exe` is running via Task Manager.

---

## Testing SNMP with FTC/Cluster using `snmpwalk` and `snmptrapd`

> You will need the [Net-SNMP](https://sourceforge.net/projects/net-snmp/files/latest/download) toolkit installed. Use default settings during installation.

### Supported OIDs for FTC Job Status:

- `1.3.6.1.4.1.47181.0.0.1`: Total Jobs  
- `1.3.6.1.4.1.47181.0.0.2`: Running Jobs  
- `1.3.6.1.4.1.47181.0.0.3`: Failed Jobs  
- `1.3.6.1.4.1.47181.0.0.4`: Queued Jobs  
- `1.3.6.1.4.1.47181.0.0.5`: Completed Jobs  
- `1.3.6.1.4.1.47181.0.0.6`: Cancelled Jobs  
- `1.3.6.1.4.1.47181.0.0.7`: Paused Jobs  

### Running `snmpwalk`:

To query all FTC-related OIDs:

```bash
C:\usr\bin\snmpwalk.exe -v 2c -c public localhost .1.3.6.1.4.1.47181
