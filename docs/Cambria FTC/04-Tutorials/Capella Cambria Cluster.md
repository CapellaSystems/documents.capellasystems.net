---
id: cluster-redundancy
title: Capella Cambria Cluster Redundancy Feature
---

# Capella Cambria Cluster Redundancy Feature

**Version:** V2 #8426  

## Document History

| Version  | Description                          | Date          |
|----------|--------------------------------------|--------------|
| Draft 0.1 | First draft of the documentation   | Jan 21, 2015 |
| Draft 0.2 | Second draft of the documentation  | Feb 18, 2015 |

---

## Introduction

Cambria Cluster Manager is very powerful and can manage multiple Cambria FC
machines for distribution of jobs redundantly. If any machine becomes unavailable, such as
due to crashes, network disconnection, unexpected reboots, etc, Cambria Cluster can detect
so and reassign jobs to other available machines automatically.

However, there is no mechanism to add redundancy for the Cambria Cluster Manager
itself previously. To resolve this, Cambria Cluster Redundancy is introduced. It allows users to
configure 2 machines as Cambria Cluster Manager, while only one of them is active, and the
other one serves as backup. When the main machine becomes unavailable, the backup
machine will takeover, and resume Cluster Manager’s role.

Such redundancy added by Cluster Redundancy is implemented via PostgreSQL
database replication, such that, all data in the database are mirrored in real time, reliably. This
document provides instructions in setting up, testing, verifying, and troubleshooting the Cluster
Redundancy.


---

## Naming Conventions

| Term | Description |
|------|-------------|
| **Redundancy Role** | Can be **Primary**, **Backup**, or **No Backup** |
| **Redundancy Primary** | Machine running **Cambria Cluster** as the active **Primary Manager** |
| **Redundancy Backup** | Machine running **Cambria Cluster** as the **Backup Manager** |
| **Cluster Machine** | Any **non-redundant** machine in the cluster |
| **Client Machine** | Machine running **Cambria FTC** |
| **Redundancy Triggering** | Process where the **Backup** takes over as **Primary** when failure occurs |

---

## Redundancy Trigger Criteria

For redundancy to activate, the following **conditions must be met**:

1. “Redundancy Primary” is offline (in the perspective of “Redundancy Backup”). That is,
“Redundancy Backup” does not receive broadcast from “Redundancy Primary”.

2. “Redundancy Backup” is online. That is, it receives broadcast from any of the “Client
machine”.

3. The timestamp of (2) is 30s greater than (1). Basically, “Redundancy Primary” was
offline for more than 30s during “Redundancy Backup” is online.

Note that this covers the case of both machines are offline. As long as “Redundancy Backup”
is back online within 30s of when “Redundancy Primary” is back online, redundancy won’t
trigger.

---

## What is Backed Up?

The **PostgreSQL database** is mirrored, which includes:

- **Job List**

- **Watch Folder Settings**

- **Client Machine List**

- **Options & Preferences**

---

## Expected Behavior & Important Notes

-Redundancy should triggers according to “Redundancy trigger criteria”.

- When the machine is configured to be “Redundancy Backup”, its existing database will
be wiped and will mirror/replicate specified “Redundancy Primary” database. Hence,
please be careful when changing “Redundancy Role”

- Redundancy Feature is Dongle protected. When the dongle expires, Cluster service will
no longer work (and hence affecting Redundancy). Hence, it is a must that customer
dongles are not programmed to expire within days for each dongles. It also implies that
dongles should not be removed at the same time.

---

## Limitations

1. **User must configure “Redundancy Primary” before “Redundancy Backup”

2. **Database passwords are stored locally** – users should secure machines.

3. **Database replication is not encrypted.**

4. **Backup Cluster Manager is read-only** – no encoding jobs can be run on it.

5. **For “Redundancy Backup”, no encoding can be made locally.**.

6. **Fast internet connections and disk I/O is required for “Redundancy Primary” and
“Redundancy Backup”.**

7. **For “Redundancy Primary”, we expect that PostgreSQL database requires additional
1GB of disk space to store temporarily file (vs “No Backup”)**.

8. **Because of the replication nature, we expect that the “Redundancy Backup” is identical
to “Redundancy Primary” in terms of machine spec, configurations, as well as internet
connections. This minimizes possibilities of behavioral difference after “Redundancy
Triggers”.

9. **Due to demanding internet connections requirement, Ethernet connections are expected.**

10. **Due to technical limitation of PostgreSQL database replication, it cannot handle IP
changes. So, both “Redundancy Primary” and “Redundancy Backup” should be assigned
with static IP. Please consult network administrators for such settings.**

11. **Only 1:1 backup is supported. That is, multiple “Redundancy Backups” are not supported
for one “Redundancy Primary”.**

12. **“Redundancy Primary” and “Redundancy Backup” must be in same subnet.**

13. **. Only single “Redundancy Primary” can exist in same subnet.**

---

## How to Configure Redundancy

1. **Prepare two machines** for Cambria Cluster – Machine **A** (Primary) and Machine **B** (Backup).  
   Also prepare a **Client Machine C**.

2. **Ensure both A & B have dongles** with the Redundancy Feature enabled.

3. In Redundancy tab of A and B, Role should be "No Backup". Clicking "Redundancy log"
will show:

- [No Backup] [Information] All Cluster executables are started, operating…
- [No Backup] [Information] Starting all Cluster executables…  

4. For A, in “Cluster Machine Info” tab, Machine C should appear as “Standby”. Set it to
“Online” by setting it to be “Connect machine to Cluster”. When jobs are generated in A
through Watch Folder or Cluster FileConvert application, they should be automatically
assigned to C.


5. For A, in “Redundancy” tab, click “Configure” and change Redundancy Role to “Primary”.
Note that you must put in machine B's IP as "Backup IP", eg, 10.0.0.45 (Machine B’s IP
can be obtained from the Redundancy tab in B). Click Apply. Note that “UAC” popup will
be shown and administrative privilege is required (for configuring PostgreSQL database)

6. **Wait 30 seconds** for settings to apply.

7. Now, we work on Machine B. Similar to step 5, configure B to be “Backup”. Note that you
must put in machine A's IP as "Primary IP". Click Apply similarly.

8. It can take 30s to a few minutes to apply the changes. The time taken varies greatly with
existing database size in Machine A.

9. Machine A will show these in “Redundancy Log”:

- [Primary] [Information] All Cluster executables are started, operating...
- [Primary] [Information] Database is now in redundancy mode. Starting all Cluster executables

10. Machine B will show these in “Redundancy Log”:
- This machine is a backup machine and is backing up database. Redundancy log is not available
   
11. To identify that the redundancy actually works, following indicators can be observed:
For Machine A:
- “Last Error” shows “No error”
- “Backup machine IP address” shows configured “Redundancy Backup” IP address
- “Backup machine state” shows “Connected/Working”
- “Primary Health” should be green,
For Machine B:
- “Last Error” shows “No error”
- “Backup Health” should be green.

---

## How to Test Redundancy Manually

1. On **Machine A**, go to **Redundancy Tab** → Set Role to **Stopped**.
2. On **Machine B**, wait **30 seconds** → It will automatically switch to **Primary**.
3. **Machine B becomes the new Primary Cluster Manager.**
4. Machine B’s status will show **"Primary (Redundancy Triggered)."**

---

## Handling a Redundancy Trigger Event

1. Let’s say, Machine A was a “Redundancy Primary”, Machine B was a “Redundancy
Backup”, and now, Redundancy triggered and Machine A is “Stopped” and Machine B’s
Redundancy Role is “Primary (Redundancy triggered)”.

2. To remove the warnings for Machine B (due to Redundancy triggered), change its role to
“Primary”

3. Note that by following steps below, Machine A’s database will be wiped. It is important
that user should verify the database in Machine B and the Cluster is operating fine
before proceeding.


4. After Machine A is fixed (eg, due to network outage, rebooted, etc), configure its
Redundancy Role to be “Redundancy Backup” and put Machine B’s IP as “Primary IP” in
Machine A. Apply.

5. Machine A will become “Redundancy Backup” and replicating/backing up from Machine
B. These 5 steps are required and have to be initiated from user, otherwise, no further
Redundancy can be triggered.

6. User can use above section (“How to trigger Redundancy manually”) to cause Machine
A to become “Redundancy Primary” again. However, Redundancy feature is designed
such that machines are anonymous in nature. When users use same spec machines for
A and B and configured them similarly, both machines should be comfortable to be
“Redundancy Primary”. Hence, such additional redundancy processing should be not
necessary

---

## Handling Database Corruption or Redundancy Errors

- Redundancy feature requires corresponding license. Without such dongle/software
license, such feature is not available.

- Database can be corrupted or become unable to handle any request, when database
configuration or initial backup phase is interrupted.

-Database can be in “read-only” state as configured by Cluster Redundancy

-With Redundancy feature, user can set the machine back to “No Backup” and then to
desired Role. This will resolve most unexpected issues

- Without Redundancy feature, user can use “PostgreSQL Database Fixer” to rebuild the
database. Such tool can be found in “C:\Program Files
(x86)\Capella\CambriaCluster\CpPostgresDbFixer.exe”

