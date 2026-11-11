# Capella Cambria Stream Solo 5.9.0

## Linux Help Documentation

## Document History

| Version | Date | Description |
|---|---|---|
| 5.8.0 | 05/05/2026 | Updated for release version 5.8.0.29952 (Linux) |
| 5.9.0 | 11/05/2026 | Updated for release version 5.9.0.35197 (Linux) |

\* Download the online version of this document for the latest information and latest files. Always download the latest files

Do not move forward with the installation process if you do not agree with the End User License Agreement (EULA) for our products. You can download and read the EULA for Cambria Stream, Cambria Stream Manager, and Cambria License Manager from the links below:

Cambria Stream Manager | Cambria Stream | Cambria License Manager

https://www.dropbox.com/s/1wg7ee7a59kzi8h/EULA_Cambria_License_Manager.pdf?dl=0

https://www.dropbox.com/s/cdttx4flzb7nxp1/EULA_Cambria_Stream_Manager.pdf?dl=0

https://www.dropbox.com/s/fla62h4o9kuqn7k/EULA_Cambria_Stream.pdf?dl=0

### Important: Limitations and Security Information

Cambria Stream, Stream Manager, and License Manager are installed on Linux in containers. Limitations and security information can be found in the document below:

https://www.dropbox.com/scl/fi/bq6qhry0jg44ljoee78sg/Cambria_Stream_5_9_0_Limitations_and_Security_Information.pdf?rlkey=5dbtikprwve22dl704x7jm5kv&st=y2l20csy&dl=0

### Important: Before You Begin

PDF documents have a copy/paste issue. For best results, download this document and any referenced PDF documents in this guide and open them in a PDF viewer such as Adobe Acrobat.

For commands that are in more than one line, copy each line one by one and check that the copied command matches the one in the document.

### Important: System Requirement

- Ubuntu 24.04
- At least 80 GB of free space required in the system (If cloud machine, set machine volume to at least 100 GB)
- Recommended to install on a clean system (no Docker or other tools using container runtime)

### Important: Running Into Installation Issues

If you run into any installation issues, run the steps in section Uninstall and then section Install

# Installation

## 1. Prerequisites

1. Install curl, zip, and unzip

```bash
sudo apt update && \
sudo DEBIAN_FRONTEND=noninteractive apt -o Dpkg::Options::="--force-confold" -y upgrade && \
sudo DEBIAN_FRONTEND=noninteractive apt -o Dpkg::Options::="--force-confold" -y install curl unzip zip
```

2. Install kubectl and helm

```bash
sudo snap install kubectl --classic && sudo snap install helm --classic
```

3. Install argo-rollouts:

```bash
curl -o kubectl-argo-rollouts -sL https://github.com/argoproj/argo-rollouts/releases/download/v1.8.3/kubectl-argo-rollouts-linux-amd64
chmod +x ./kubectl-argo-rollouts
sudo mv ./kubectl-argo-rollouts /usr/local/bin/
```

4. Download, unpack, and modify Cambria Stream Solo package

```bash
curl -o CambriaStreamSolo.zip -L "https://www.dropbox.com/scl/fi/mit54bc119ocuj5qhrljp/CambriaStreamSolo_5_9_0.zip?rlkey=kdl2h2lazpaq8yyndtwqq4fu0&st=isahw6u9&dl=1"
```

```bash
unzip -o CambriaStreamSolo.zip && chmod +x *.sh ./bin/*.sh CpLogGrab
```

5. (Optional) For AJA, run the following (Make sure to reboot after running the command):

```bash
./bin/installAjaDriver.sh
```

6. (Optional) For NVENC, run the following (Make sure to reboot after running the command):

```bash
./bin/installNvidiaDriver.sh
```

## 2. Deploy Third-Party Tools and Cambria Stream Application

### Important: Upgrading Cambria Stream Solo

If trying to upgrade from a previous Cambria Stream Solo, follow the steps in Upgrades

### Important: Solo Install Information

1. If using a cloud machine and using the public IP / DNS, for WebRTC IP address, set it to SERVER_REFLEXIVE or skip that step

1. Run the following and follow all prompts:

```bash
./setupTools.sh && ./setupSolo.sh
```

2. (Optional) [BETA] Using NDI in Cambria Stream via Discovery Server

For using NDI in Cambria Stream via Discovery Server, run the steps in this guide:

https://www.dropbox.com/scl/fi/t7zr0r7jkbh8akgtpx13j/Cambria-Stream-Solo-NDI-Discovery-Server-Client-Setup.pdf?rlkey=70pky7vuqh5zq4c2i2rktet0p&st=sp5pwjuv&dl=0

# Post-Install Information

## Getting Started

1. Get the Cambria Stream Web UI and Credential information for your cluster:

**Option 1: If using private / in-network IP addresses**

```bash
./bin/getStreamInfo.sh --webui
```

**Option 2: If using public IP address**

```bash
./bin/getStreamInfo.sh --webui --public
```

2. Access Cambria Stream Manager Web UI.

Example:

```text
https://172.31.53.154:8171
```

3. Log in with your Cambria Stream Manager Web UI credentials. These were set originally when installing Cambria Stream Solo

4. Use this guide for information on how to navigate the Cambria Stream Manager UI and what kind of workflows are possible:

https://www.dropbox.com/scl/fi/ne3t3efc490cnresayawl/Cambria_Stream_Manager_and_Cambria_Stream_5_9_0_User_Guide.pdf?rlkey=vvifcxd1rlgkdlcw21nbwjpec&st=1u0vnt7h&dl=0

## Important Links

Note: if your web browser is not on your local machine, replace localhost with the ip address / hostname of the machine where Cambria Stream Solo was installed

Cambria Stream WebUI:

```text
https://localhost:8171
```

Cambria Stream Webserver (Rest API):

```text
https://localhost:8758
```

Monitoring / Logging - Grafana:

```text
http://localhost:3000
```

Ad Break Controller (Requires Ad Break Control Enabled License):

```text
https://localhost:8191
```

# Access Cambria Stream Links and Other Information

Run the following command to get important information for Cambria Stream Solo:

**Option 1: If using private / in-network IP addresses**

```bash
./bin/getStreamInfo.sh
```

**Option 2: If using public IP address**

```bash
./bin/getStreamInfo.sh --public
```

# About Reboots

For machines / servers installed with Cambria Stream Solo, it is important to note that it may take several minutes for the applications to be active.

# Upgrades

### Important: Upgrade Information / Pre-Requisites

The only reliable way to upgrade is to uninstall and re-install the Cambria Stream application. However, this does mean that the database will be destroyed.

Save all projects / programs that you would like to preserve before continuing.

1. Uninstall Cambria Stream Solo:

```bash
./uninstallSoloAndTools.sh
```

2. Follow the Installation steps of the new document

# Uninstall

### Important: Database Will Be Destroyed

For Cambria Stream Solo, an uninstall means that the entire Cambria Stream deployment is destroyed, which includes the database. This means all information stored in the database, which includes Cambria Stream programs, credentials, settings, etc. will be deleted.

Save all projects / programs that you would like to preserve before continuing.

Run the following:

```bash
./uninstallSoloAndTools.sh
```

# Troubleshooting

In most cases, troubleshooting will involve obtaining logs for the Cambria Stream system.

## Getting Cambria Stream Logs

1. In a command prompt / terminal window in the Cambria Stream Solo node / machine, run the following tool from the Cambria Stream Solo package:

```bash
./capellaLogExtract.sh
```

2. The above command should create a folder 'CpLogGrab-output'. Zip this folder for sending to the Capella team:

Replace the highlighted values

```bash
zip -r cambria_stream_solo_logs_<company>_<issue>.zip ./CpLogGrab-output
```

3. Cleanup the created folder

```bash
rm -rf ./CpLogGrab-output
```

4. Send the logs to the Capella Support team
