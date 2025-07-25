# Event Description

## Basic Event Description
Events consist of one or more child Event elements. An Event element describes all information related to an “event” in Cambria Live Broadcast/Stream Manager.

Note: The following table lists all attributes that `GetEventInfo` returns. However, only part of them is accepted by `SetEventInfo`. Acceptable changes are marked with “[M]”, indicating “modifiable.”

---

## YouTube Live Broadcasting Behaviors
YouTube Events have unique “Start Broadcasting” and “Stop Broadcasting” states. These are independent of the BCM Program state.

- A YouTube Event will “Start Broadcasting” when the program starts streaming for the first time. Then it will remain “Broadcasting.”
- Once the scheduled end time is reached, the YouTube Event will “Stop Broadcasting.” These actions can also be triggered manually.

**Note:** Once the YouTube Event “Stops Broadcasting,” it is permanent.

---

## Description Markers
To simplify the attribute descriptions, the following markers are used:

- `[M]`: Modifiable. These attributes can be changed using `SetEventInfo` or `AddEvent`.
- `[C]`: Required upon creation. These attributes must be provided when using `AddEvent`.
- `[Y]`: YouTube-specific. These attributes are available only for "YouTubeLive" events.

Additional markers for stricter YouTube Live Program conditions:
- `[YM1]`: Accepted only at creation (AddEvent). Optional unless marked `[C]`.
- `[YM2]`: Allowed when not streaming and never “Start Broadcasting.”
- `[YM3]`: Allowed during streaming after “Start Broadcasting,” but before “Stop Broadcasting.”
- `[YM4]`: Allowed after manually stopping the stream before the scheduled end time.
- `[YM5]`: Allowed only after “Stopped Broadcasting” occurs.

---

## Security
While project files can be encrypted, a password must be sent to the Cambria Live Broadcast/Stream Manager web server to decrypt the project. For secure transmission:
1. Configure the web server with the proper private key.
2. Use HTTPS for secure communication.

**Important:** The project is stored on the Cambria Live Broadcast/Stream Manager (BCM/CSM) machine, regardless of encryption or web server security configurations. Ensure that only authorized personnel have access to the machine.
