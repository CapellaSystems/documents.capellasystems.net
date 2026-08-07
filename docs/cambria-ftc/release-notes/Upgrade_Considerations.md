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

#### Configuration Backups and Workflow Dependencies:
Back up all Target Presets and Watch Folder configurations before upgrading. Review workflows that depend on discontinued or modified components, including CloudExtend Storage, the EZTitles plug-in, and legacy scripts or executables.

**Backup procedures differ by product. Review the appropriate product section below before upgrading.**

  * **Cambria FTC:** Back up Target Presets, Watch Folder configurations, database information, and any scripts or external files used by FTC workflows.
  * **Cambria Stream:** Back up Stream projects, channel configurations, output and encoding settings, source configurations, and any external files or services required by the projects.
  * **Cambria Live:** Back up Live projects, presets, channel or source configurations, output settings, and any external files or services required by the projects.

  **Workflow dependency review.** Review workflows and projects for dependencies on components that were discontinued, replaced, or modified in newer versions. Examples may include CloudExtend Storage, the EZTitles plug-in, legacy scripts or executables, third-party integrations, and older hardware or encoding components.

  **Important:** Follow the detailed backup and migration procedures for each installed Cambria product before upgrading.
