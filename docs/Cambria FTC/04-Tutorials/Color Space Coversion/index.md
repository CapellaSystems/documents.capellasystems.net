---
id: color-space-conversion
title: Cambria FTC Color Space Conversion
---

# Cambria FTC Color Space Conversion

## Table of Contents

1. [Preface](#preface)
2. [HDR Standards](#hdr-standards)
3. [Handling Wide Color Gamut](#handling-wide-color-gamut)
4. [FTC Handling of Color Related Metadata](#handling-color-related-metadata)
5. [Case Study 1: SD/HD conversions (BT.601/BT.709)](#case-study-1-sdhd-conversions-bt601bt709)
6. [Case Study 2: HDR conversions (HLG/PQ)](#case-study-2-hdr-conversions-hlgpq)
7. [Case Study 3: SDR to HDR conversions (BT.709 to HLG/PQ)](#case-study-3-sdr-to-hdr-conversions-bt709-to-hlgpq)
8. [Case Study 4: HDR to SDR conversions (PQ/HLG to BT.709)](#case-study-4-hdr-to-sdr-conversions-pqhlg-to-bt709)
9. [Special Handling of MP4 Muxer](#special-handling-of-mp4-muxer)
10. [Special Handling of X265 Encoder](#special-handling-of-x265-encoder)

## Preface

Color Space conversion is always an important part of any transcoding process. Legacy workflows of SD/HD conversions, include **BT.601** and **BT.709**, which are often converted back and forth. In modern **SDR/HDR** workflows, we often need to convert between **BT.709** and various **HDR color spaces**, namely **PQ, HLG**, etc.

Cambria File Convert supports these conversions during the transcoding process, using various available **source/target filters**.

## HDR Standards

Before converting color spaces between HDR formats, it is important to understand the different HDR standards. HDR implies a larger range of **minimum and maximum luminance** (brightness) and **wide color gamut**. Cambria FTC supports conversion between the following HDR standards:

- **PQ:** SMPTE BT.2084/BT.2100, also known as **HDR10/HDR10+**
- **HLG:** ARIB STD-B67, or SMPTE BT.2100
- **Dolby Vision** (via Dolby Vision license, see separate document)

## Handling Wide Color Gamut

There is no special conversion needed. If your target is **HLG/PQ** via the **Color Space Conversion** filter, **BT.2020** color space will be used implicitly.

You may want to use a format that retains color precision:
- **10/12-bit bit depth**
- **4:2:2 / 4:4:4 Color Format** (4:4:4 can be via **MOV ProRes**)

If converting **SD/HD BT.709 to UHD/4K BT.2020**, you can follow **Case Study 2** below and select **BT.709 to BT.2020**.

## Handling Color Related Metadata

Converting between **SDR and HDR** involves multiple steps:

1. Apply **Color Space Conversion Filter** (or related filter).
2. Set proper **Color Primaries, Transfer Characteristics, and Matrix Coefficients** in **Video Settings** (except for X265, which requires command-line options).
3. Enable **"Write Color Info"** in **Container Format Settings** (MP4 only).

> **Note:** Static/dynamic metadata (HDR10, HDR10+) is not injected automatically. For **X265 encoding**, static metadata can be added via **command-line options**.

[X265 CLI Documentation](https://x265.readthedocs.io/en/default/cli.html#vui-video-usability-information-options)

## Case Study 1: SD/HD Conversions (BT.601/BT.709)

1. In **Preset Editor**, add the **601/709 Correction** video filter.

   
   
   ![Screenshot](01_screenshot.png)
   
   

2. The filter can be applied as a **source or target filter**, but applying it as a **source filter** is more efficient.
3. In **Video Settings** (Encoding Tab), select **Color Primaries, Transfer Coefficients, and Matrix Coefficients**.

> **Note:** This conversion **has loss** and is **not perfectly reversible**.

## Case Study 2: HDR Conversions (HLG/PQ)

1. In **Preset Editor**, add the **Color Space Conversion** filter.

   
   
   ![Screenshot](02_screenshot.png)
   
   

2. The filter can be applied as a **source or target filter**, but applying it as a **source filter** is more efficient.
3. In **Video Settings** (Encoding Tab), select **Color Primaries, Transfer Coefficients, and Matrix Coefficients**.

## Case Study 3: SDR to HDR Conversions (BT.709 to HLG/PQ)

1. Similar to **Case Study 2**, select **"BT.709 to HLG"** in **Conversion Mode**.
2. For **BT.709 to PQ**, add an **additional Color Space Conversion filter** to convert **HLG to PQ**.
3. In **Video Settings** (Encoding Tab), select **Color Primaries, Transfer Coefficients, and Matrix Coefficients**.

## Case Study 4: HDR to SDR Conversions (PQ/HLG to BT.709)

1. Similar setup to **Case Study 2 and 3**, but involves **tone mapping**.
2. **HDR to SDR conversion results in data loss** due to the **difference in color space size**.
3. **FTC uses a modified version of the Hable algorithm** for tone mapping.

> **Note:** Future versions may allow users to fine-tune **Reinhard or other tone mapping algorithms**.

## Special Handling of MP4 Muxer

By default, color information set in **Video Settings** is applied to the container. However, MP4 outputs **do not** write color information metadata by default.

> **Solution:** Enable **"Write Color Info"** in **Container Format Settings** (if your players support it).

   
   
   ![Screenshot](03_screenshot.png)
   
   

## Special Handling of X265 Encoder

The **X265 encoder** has numerous settings configured via **Extra Options**, including **color information**.

Example settings for **PQ encoding**:

   
   
   ![Screenshot](04_screenshot.png)
   
   

For **HDR10 encoding**, configure **MaxCLL and MaxFALL** via:

```
--max-cll <value>
```

> **Note:** FTC does **not** measure or relay these values from the source. Users must manually input them.

---

This concludes the guide for **Cambria FTC Color Space Conversion**.
