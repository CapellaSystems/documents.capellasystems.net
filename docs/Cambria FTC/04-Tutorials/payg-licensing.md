---
title: "Pay As You Go Licensing Guide"
description: "Understanding how credits are deducted from your PAYG balance and where to view your current balance."
slug: "/payg-licensing"
---

# Pay As You Go Licensing

## Viewing Your PAYG Balance
Once you have a **Pay As You Go (PAYG)** license, you can view your current balance in the following locations:

- **Cluster CloudExtend Tab** under **Pay As You Go licensing**.
- In the **Selected Machine AWS Info summary** of any AWS machine in your **machine list in Cluster**.

## How Are Credits Deducted?
Credits are deducted based on the following conditions:

- The amount of credits deducted depends on the **source duration (in seconds)**.
- If **stitching** or applying **source filters** that alter the source’s duration, the number of credits deducted will change.
- Credits are **doubled** if encoding to **multiple targets** or **multiple layers**.
- Credits are **only deducted after a job has finished**.
- The **Cluster UI** takes **2-3 minutes** to update and reflect the new balance.

## Queue Jobs with a Zero Balance
If your balance is **0**, you will encounter the following error:

```plaintext
No balance: License Error: Balance is empty for pay-as-you-go license
```

Ensure you have sufficient credits before queuing jobs to avoid this issue.
