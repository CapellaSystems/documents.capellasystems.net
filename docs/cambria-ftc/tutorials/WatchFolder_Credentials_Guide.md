# WatchFolder Credentials Guide

This note explains how Cambria WatchFolder access is expected to work when reading and writing network storage.

## Short Answer

WatchFolder jobs run under the Windows service identity of the Cambria service that is doing the work.

- The service account must be able to access the source and destination paths.
- Stored credentials can help for specific file operations, but they are not a universal replacement for service-level access.
- If the service account cannot reach the share, the watchfolder job will still fail even if the credentials exist in Credential Manager.

## Practical Rule

For watchfolders and cluster-managed jobs, assume:

1. The service account is the primary identity.
2. Credential Manager is only used where the product explicitly supports stored credentials for that path or operation.
3. Both may be involved, depending on the workflow.

## What To Do When Engineers Cannot Be Added

If the target storage does not allow the engineer account:

- Grant the Cambria Windows service account access to the share, or
- Use a dedicated domain account for the Cambria service that does have share access, or
- Configure explicit credentials only if that specific watchfolder workflow supports them.

## Recommended Operating Model

For stable deployments, use a dedicated service account for Cambria services and give that account the required share permissions.

That avoids depending on an interactive user account and keeps WatchFolder behavior consistent across restarts and service changes.

## Summary

- WatchFolder is not credential-manager-only.
- WatchFolder is not service-account-only in every workflow.
- The service account is the baseline requirement, and stored credentials are only an additional mechanism when explicitly supported.
