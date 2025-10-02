---
title: "Speech-To-Text Filter"
description: "Steps to use Cambria FTC/Cluster Speech-To-Text Filter and troubleshooting tips."
slug: "/cambria-ftc-stt"
---

# Speech-To-Text Filter

## 1. Download the Needed Models
Download the required models from either the package provided by Capella or from GitHub:

- **Capella Package:**  
  [Download Here](https://www.dropbox.com/scl/fi/c8ga87o0gc22b3kyz5igs/Whisper_Models_Release_5.3.0.20015.zip?rlkey=fqpx3vnb649922itnft6do1wb&st=aoh34enj&dl=0)

- **GitHub Link:**  
  [Whisper Models on GitHub](https://github.com/ggerganov/whisper.cpp/blob/master/models/README.md)

## 2. Choose a Model
- If you downloaded the Capella provided "whisper-models" package, there will be 5 models available.
- These models are multilingual and should work with different languages.

## 3. Configure FTC
- Open FTC and go to the filters list.
- Select **"Audio Speech Extraction"**.

## 4. Set Output File
- Click **"Browse..."** under **"Output Filename"** and select a destination for the output file.
- Name and set the extension of the output file to anything you want.

## 5. Select a Model
- Under **"Speech Extraction Model"**, choose a model to use. You can select any of the 5 packaged models.
  - **Note:** Smaller models are much faster but less accurate in extraction.
  - **Note:** Extraction quality also depends on the language.

## 6. Start Extraction
- Click **"OK"** to start the process.
- The extracted output file should now be created in the selected location.

---

# Troubleshooting & FAQs

### Q: Why am I receiving this error? "Error: Configuration error: Internal Format ID: 20000"
**A:** This error means your CPU is too old to use this feature. The CPU must support at least **AVX2** to run this function.

### Q: Are there any String Replacement variables that can be used?
**A:** Yes, you can use a string replacement variable to make the output file name the same as the source name.

For example, when using the **"Audio Speech Extraction"** filter in **WatchFolder**, you can set the output path as:

```plaintext
C:\Users\Public\Documents\CapellaOutput\%sourceName%.mp4
```

This will automatically replace `%sourceName%` with the original file name.
