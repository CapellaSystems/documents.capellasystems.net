# AWS Windows Transit Gateway Multicast Setup Guide

This guide explains how to enable multicast for EC2 instances using AWS Transit Gateway. EC2 instances must be launched in a subnet associated with the multicast domain.

## 1. Create a Subnet

Go to:

**VPC → Subnets → Create subnet**

- Select the VPC that will contain the EC2 instances.
- Enter a subnet name.
- Select an Availability Zone.
- Enter an unused IPv4 CIDR block within the VPC range.
- Select **Create subnet**.

## 2. Create a Transit Gateway

Go to:

**VPC → Transit Gateways → Create Transit Gateway**

- Enable **Multicast support**.
- Create the Transit Gateway and wait for its status to become **Available**.

## 3. Create a VPC Attachment

Go to:

**VPC → Transit Gateway Attachments → Create attachment**

- Set **Attachment type** to **VPC**.
- Select the Transit Gateway.
- Select the VPC.
- Select the subnet created above.
- Create the attachment and wait for its status to become **Available**.

## 4. Create a Multicast Domain

Go to:

**VPC → Transit Gateway Multicast → Create multicast domain**

- Select the Transit Gateway.
- Set **IGMPv2 support** to **Enabled**.
- Set **Static sources support** to **Disabled**.
- Create the multicast domain.

## 5. Associate the Subnet

Open the multicast domain and go to:

**Actions → Create association**

- Select the VPC attachment.
- Select the subnet containing the EC2 instances.
- Create the association.

:::note
Multicast domain membership is configured at the subnet level.
:::

## 6. Launch the EC2 Instance

Go to:

**EC2 → Launch instance**

Under **Network settings → Edit**:

- Select the same VPC.
- Under **Subnet**, select the subnet associated with the multicast domain.
- Select the required Security Group.
- Launch the instance.

## 7. Configure IGMPv2

On each Windows EC2 instance, open **PowerShell as Administrator** and run:

```powershell
Set-NetIPv4Protocol -IGMPVersion Version2