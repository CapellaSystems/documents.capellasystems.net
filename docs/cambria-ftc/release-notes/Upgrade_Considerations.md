---
id: upgrade-considerations
title: Upgrade Considerations
---

### Things to Consider Before Upgrading

Before upgrading FTC or Cluster, review the following requirements and dependencies:

* **System Compatibility:** Confirm that all FTC and Cluster machines meet the operating system, processor, memory, and hardware requirements for the newer version.
* **Floating License Server Compatibility:** Existing licenses will continue to work. If you also upgrade the Floating License Server, confirm that its host operating system is supported by the new server version.
* **API and Security Changes:** Update all integrations to use HTTPS and verify that the required ports are open. Non-HTTPS API access is not supported in FTC 5.4 and later.
* **Database Migration:** Customers upgrading from FTC 4.8 or earlier must follow the PostgreSQL migration procedure. Create and preserve a database backup before beginning the upgrade.
* **Configuration Backups and Workflow Dependencies:** Back up all Target Presets and Watch Folder configurations before upgrading. Review workflows that depend on discontinued or modified components, including CloudExtend Storage, the EZTitles plug-in, and legacy scripts or executables.
