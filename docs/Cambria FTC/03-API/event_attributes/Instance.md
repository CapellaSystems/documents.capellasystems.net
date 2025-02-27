# Instance

## XML Element
Event

## Child XML Element
Instance

## Description
The `Instance` element provides detailed information about a specific instance of an event.

## Elements

| Element                   | Description                                                                                                 |
|---------------------------|-------------------------------------------------------------------------------------------------------------|
| `AdBreakControlUrl`       | Ad Break Control (ABC) Web UI URL                                                                          |
| `CurrentStatus`           | Current status of the event                                                                                |
| `DBValue`                 | Current audio meter value, range is `-90` to `0dB`.                                                        |
| `EncodingSpeedLevel`      | Encoding speed level, range is `1` to `5`. This corresponds to the number of bars of “Processing Speed” in Output Preview. |
| `NetworkSpeedLevel`       | Network speed level, range is `1` to `5`. This corresponds to the number of bars of “Delivering Speed” in Output Preview. |
| `Identifier`              | The Instance Identifier of this event.                                                                     |
| `LatestError`             | The last (most recent) error of the instance. It can be empty.                                             |
| `LiveState`               | The current status of the instance. It can be `Good`, `Warning`, or `Error`.                               |
| `MachineID`               | The assigned machine’s identifier.                                                                         |
| `MachineIP`               | The assigned machine’s IP address.                                                                         |
| `MachineName`             | The assigned machine’s name.                                                                               |
| `Status`                  | The instance state. It can be `NotStreaming`, `Streaming`, `Error`, `Assigned`, or `Preparing`.            |
| `StartStreamingDateTime`  | The actual start streaming time, in format of `YYYY/MM/DD HH:MM:SS`, e.g., `2020/10/23 17:59:30`.           |
| `StopStreamingDateTime`   | The configured stop streaming time (in future), in format of `YYYY/MM/DD HH:MM:SS`, e.g., `2020/10/24 07:59:30`. |
