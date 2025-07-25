# Slot

## XML Element
Event

## Child XML Element
Kumo

## Child XML Element
Slot

## Description
The `Slot` element specifies the configuration for SDI ports used with the Kumo router.

## Values

| Value              | Description                                                                                                   |
|--------------------|---------------------------------------------------------------------------------------------------------------|
| `Port`             | Acceptable values: `1-4`, indicating SDI Port 1 to 4.                                                        |
| `Direction`        | Indicates whether the SDI port is retrieving or sending data to the Kumo router and its corresponding port. Examples: `FromKumo1`, `FromKumo16`, `ToKumo1`, `ToKumo16`. |
| `FrameRateFamily`  | Indicates the SDI port’s frame rate family. Acceptable values: `24/30/60`, `25/50`, `23.976/29.97/59.94`. Choose the string that includes the frame rate for the SDI port signal. |
