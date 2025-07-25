# Event Attributes

## XML Element: Event

| Attribute                                   | Description                                                                                                     |
|--------------------------------------------|-----------------------------------------------------------------------------------------------------------------|
| AllowDelayedProjectLoading [M] [C]         | Allows creating or editing an event without a project. Default: `0`. Set to `1` for true.                      |
| AssignToSpecificMachineIdentifierBackup [M] | Assigns the backup stream to a specific machine. Empty for automatic assignment.                                |
| AssignToSpecificMachineIdentifierPrimary [M] | Assigns the primary stream to a specific machine. Empty for automatic assignment.                              |
| BackupIdentifier                            | Shows the identifier of the backup event if configured.                                                        |
| EventWeekdays [M] [C]                      | Specifies weekdays for recurring events using bit values. Example: `97` represents Sunday, Friday, and Saturday. |
| Frequency [M]                              | Specifies the event frequency. Values: `OneTime`, `Daily`, `Weekly`. Default: `OneTime`.                       |
| HasPreroll                                 | Indicates if the project contains a preroll. `1` for true, `0` otherwise.                                      |
| Identifier                                 | The unique identifier of the event.                                                                            |
| IsEnabled [M]                              | Indicates if the event is enabled. `1` for true, `0` otherwise.                                                |
| LaunchMode [M]                             | Specifies the launch mode. Values: `Normal`, `NoUI`, `Core`. Default: `Normal`.                                |
| Name [M] [C]                               | The name of the event. Required upon creation.                                                                 |
| PrerollDurationSecs [M]                    | The preroll duration in seconds. Default: `120`. Applicable for projects with preroll.                         |
| ProjectFileName [M]                        | The name of the project file.                                                                                  |
| StartStreamingDate [M] [C]                 | The start date for streaming in `YYYY/MM/DD` format.                                                           |
| StartStreamingTime [M] [C]                 | The start time for streaming in `HH:MM:SS` format.                                                             |
| StopStreamingDate [M] [C]                  | The stop date for streaming in `YYYY/MM/DD` format.                                                            |
| StopStreamingTime [M] [C]                  | The stop time for streaming in `HH:MM:SS` format.                                                              |
| StreamingDuration                          | Streaming duration in `HH:MM:SS` format.                                                                       |
| TargetType                                 | Specifies the event type: `General`, `YouTubeLive`. Default: `General`. Only set during event creation.         |
| UnlimitedDuration [M]                      | Indicates if the event has unlimited duration. Default: `0`. Set to `1` for true.                              |
| UseBackupMachine [M]                       | Specifies if the event uses a backup machine. Default: `0`. Set to `1` for true.                               |
| YouTubeCategory [Y][YM1]                   | Specifies the YouTube category. Acceptable values include `Music`, `Gaming`, `Sports`, etc.                    |
| YouTubeChannelID [Y]                       | The YouTube Channel ID associated with the event.                                                              |
| YouTubeEventID [Y]                         | The YouTube Event ID.                                                                                          |
| YouTubeIsEnableEmbed [Y][YM1][YM2]         | Specifies if embedding is enabled. `1` for true, `0` otherwise.                                                |
| YouTubePrivacy [Y][YM1][YM2]               | Specifies YouTube privacy settings: `public`, `private`, `unlisted`.                                           |
| YouTubeStreamFormat [Y][YM1][YM2]          | Specifies the YouTube stream format. Acceptable values are `720p`, `1080p`, etc.                               |

**Note:** Refer to Chapter 4 of the documentation for detailed attribute descriptions and additional configurations.
