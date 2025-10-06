---
id: scte-35_insertion
title: SCTE-35 Insertion
---

# SCTE-35 Insertion in Cambria FTC

Cambria FTC supports the use of **SCTE-35 marker insertion**. This guide explains how to enable and configure SCTE-35 in an FTC project.

---

## Step-by-Step Instructions

1. **Open** FTC or FTC (Cluster)

2. **Select** the source file(s) for the project

3. Configure any required settings:
   - Segments  
   - Filters  
   - Mapped audio  

4. Go to the **Encoding** tab and click **Add…** to create a new preset

---

### Preset Editor Configuration

In the **Preset Editor** window:

- Select the **Encode** tab  
- Set the **Container** to `MPEG-2 Transport Stream`  
- Set the **Video** to `H.264 (x264)`  
- Scroll to **Video Settings** and enable:  
  - ✅ `Use fixed length GOP`  
- Scroll to **Container Format Settings** and enable:  
  - ✅ `Write SCTE35`  
- Set **SCTE35 marker lead time (ms)** to the desired value (typically 4-8 seconds)


---

### Add Markers Filter

1. Go to the **Filter** tab  
2. Click the down arrow next to **Add**, then choose **Markers**  
3. In **Markers Filter Settings**, set:
   - **Usage**: `SCTE35 Slice Insert`  
   - **Timecode Mode**: Select between **user-defined timecode** or **source-based timecode**  

4. Click **Add** and enter the **Timecode(s)** where you want to place the markers
5. Click **OK** to add the filter and return to the Preset Editor  
6. Click **OK** again to save and exit to Cambria FTC

---

SCTE-35 insertion is now properly configured in your output file.

---

For any questions or technical support, contact Capella Systems at:

📧 **support@capellasystems.net**
