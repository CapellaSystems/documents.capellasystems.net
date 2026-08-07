---
id: upgrade-considerations
title: Upgrade Considerations
---

## Things to Consider Before Upgrading

Before upgrading Cambria FTC, Cambria Stream, or Cambria Live, review the following requirements and dependencies:

### System Compatibility: Confirm that all systems running Cambria software meet the operating system, processor, memory, storage, and hardware requirements for the newer version.

### Floating License Server Compatibility:** Existing licenses will continue to work. If you also upgrade the Floating License Server, confirm that its host operating system is supported by the new server version.

### API and Security Changes: Review integrations and verify that they meet the API and security requirements of the newer version. Update integrations to use HTTPS where required and confirm that all necessary ports are open. Non-HTTPS API access is not supported in FTC 5.4 and later.

### Database Migration: Review any database migration requirements that apply to the product and version being upgraded. Customers upgrading FTC from version 4.8 or earlier must follow the PostgreSQL migration procedure. Create and preserve a database backup before beginning any required migration.

### Configuration Backups and Workflow Dependencies: Back up all projects, presets, configurations, and other workflow-related settings before upgrading. Backup requirements vary between Cambria FTC, Cambria Stream, and Cambria Live and are detailed in the product-specific sections below. Also review workflows that depend on discontinued or modified components, third-party integrations, legacy scripts, executables, or other external dependencies.
