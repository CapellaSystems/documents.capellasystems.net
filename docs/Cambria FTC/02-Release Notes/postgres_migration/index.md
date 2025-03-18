# Cambria FTC and Cluster 5.0: Database Migration

**Note:** If you have not downloaded any Cambria FTC/Cluster software before version 5.0, then this document does not apply to you. This document only applies for users who want to migrate their database information from Postgres 9.3 over to Postgres 14.3.

## Objective

Cambria FTC/Cluster versions 4.8 and lower used Postgres Database version 9.3 to store information such as settings, watch folders, job settings, etc. With the update to FTC/Cluster 5.0, the Postgres Database will now be upgraded to version 14.3. Due to the change, old settings and information that were stored in the previous database may need to be transferred into the new one. This document will show the required steps to migrate all of the data from the old Postgres Database to the new one so that all of the previous settings and information will be restored.

## Quick Details

- Database migration between Postgres 9.3 and 14.3 is **not automatic**  
- Installing Cluster/FTC ver. 5.0 will come with a **clean** Database (postgres 14.3)  
- Postgres 9.3 will still be installed on the system, which will be used to migrate all of the information to Postgres 14.3  
- Only migration from Postgres 9.3 (FTC/Cluster versions 4.8 or lower) to Postgres 14.3 (FTC/Cluster 5.0 and above) is supported  


## Database Migration Steps For Users with Standalone FTC and Cluster

1. Uninstall FTC/Cluster if the version is from 4.8 or lower.
2. Install FTC/Cluster 5.0 or above. Postgres 14.3 will automatically be installed.
3. From the start menu type "Cambria PostgreSQL Database Migration Tool" and run the program. If the tool can not be found, run **PostgreSQLUpdater.exe** generally located in these locations.

   - For FTC:  
     `C:\Program Files (x86)\Capella\Cambria\cpx64\PostgreSQLUpdater.exe`

   - For Cluster:  
     `C:\Program Files (x86)\Capella\CambriaCluster\cpx64\PostgreSQLUpdater.exe`

4. Follow the instructions on the screen.
5. Check the database by seeing if old jobs and watch folders have been migrated over via Cambria Manager (or Cluster Manager).

### Optional Step:

**WARNING:** We recommend **NOT** to remove Postgres 9.3, but it is an option because it is no longer needed. Removing it will no longer allow downgrading from FTC 5.0 because Postgres 9.3 does **NOT** accept database files from Postgres 14.3, and there is no workaround. Please double check that everything has migrated correctly before removing Postgres 9.3 if you choose to do so.


## Database Migration Steps For Users with Cluster Redundancy Primary/Backup Workflow:

1. In the Backup Cluster, set the redundancy role to be **Stopped**.
2. In the Primary Cluster, set the redundancy role to be **No Backup**.
3. Upgrade the build on the Primary to ver 5.0 or above.
4. Run **PostgreSQLUpdater.exe** on the Primary (only) with the new build

   `C:\Program Files (x86)\Capella\CambriaCluster\cpx64\PostgreSQLUpdater.exe`

5. Upgrade the build on Backup machine while redundancy is set to **Stopped**. In the new build, redundancy role will be started with **No Backup** and an empty database.
6. Establish redundancy connection between Primary and Backup.

---

For any questions or technical support, contact Capella Systems at:

📧 **support@capellasystems.net**


