---
id: ftc-harmonic-vos-upload-guide
title: Harmonic VOS Upload Guide
---

# FTC Harmonic VOS Upload Guide

> **NOTE:** This will require a local web server that needs to be open to the public.

## Steps to Upload to Harmonic VOS

### 1. Launch FTC

### 2. Add any source to the **Source Tab**.  

### 3. Once the source is added, go to the **Encoding Tab**.

### 4. In the Encoding Tab, **add a new preset**.

### 5. In the **Preset Editor**, set the **Output Folder** based on the type of VOS upload:

- **For VOS 360:** Set to an **Apache web server location** (e.g., using XAMPP internally).  
  Example:  
  ```
  C:\xampp\htdocs\Output
  ```
- **For VOS CNS:** Set to a **shared folder** as seen from FTC.  
  Example:  
  ```
  \\server\location
  ```  
  The VOS CNS side will show something like:  
  ```
  /mnt/shared/location
  ```

> **NOTE:** This will vary depending on your setup. Ensure to specify the correct server location.

### 6. Select the **MPEG-2 TS** container in encoding settings.

### 7. In **Video Settings**, make sure to:
- Specify the **Frame Size** for the Layer.
- Set the **Bitrate**.
- **Enable** the **"Use fixed length GOP"** checkbox.

   
   
   ![Screenshot](02_screenshot.png)
   
   

### 8. Configure **Post Task**:
- In the **Preset Editor**, go to the **Post Task** tab.
- **Enable** the **"Use Upload"** checkbox.
- Click the **"Add Harmonic VOS"** button.

   
   

### 9. Specify your **Harmonic VOS credentials**.

> **NOTE:** You must have a **Cambria FTC License with Harmonic VOS Upload Enabled**.

   

> **String Replacement:** You can specify values like **%sourceName%**, **%sourcePath#%** as shown in the tooltip.

### 10. After adding the **Harmonic VOS Upload Task**, click **OK** to exit the Preset Editor.

### 11. **Duplicate the first preset** to create multiple layers as necessary.
- Adjust the **Frame Size and Bitrate** for each layer.
- **Remove the upload task** from duplicated presets.

> **IMPORTANT:**  
> The upload task should only be applied to the **first target**.  
> If you **don't remove the upload task** for additional layers, **multiple individual files** will be uploaded instead of an ABR encode.

### 12. **Enable "Encode Targets as a Single Job"**  
This ensures that files are uploaded as a **pair**.  
Once all target layers are created, click **Convert/Queue**.

   
   

### 13. **Verify the VOS Upload**  
Use the following **CMD commands** to generate an **access token** and check the **VOS Decision Queue JSON Response**:

#### Generate a Base64 String:
```sh
echo -n "YourClientAPIKey:YourClientSecretKey" | base64
```
(This generates **YourBase64String**)

#### Request an Access Token:
```sh
curl -s -X POST -H "Authorization: Basic YourBase64String" "https://vos360-apac-01.vos360.video/oauth/token?grant_type=client_credentials"
```
(This generates **YourAccessToken**)

#### Check the Decision Queue:
```sh
curl -X GET "https://vos360-apac-01.vos360.video/vos-api/asset-acquisition/v1/assets/need_decision" -H "accept: */*" -H "Authorization: Bearer YourGeneratedAccessToken"
```

> **Example API Endpoint:**  
> [Harmonic VOS API](https://vos360-apac-01.vos360.video/oauth/token?grant_type=client_credentials)

---

This concludes the **FTC Harmonic VOS Upload Guide**.
