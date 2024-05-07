---
reporter: test
game: american_truck_simulator
device_configuration: CRD
date_tested: 2024-04-01
compatibility_details: it runs well
compatibility: perfect

---
| `reporter` | string | Optional. Your name. |
| `game` | string | The name of the game from its own filename, i.e. **without** the `.md` extension |
| `device_configuration` | string | Optional. Any information about your configuration that may have an influence on the report. |
| `date_tested` | date | Optional. Format is `YYYY-MM-DD` |
| `compatibility_details` | string | Your report of how the application ran for you. |
| `os_version` | string | Optional. The OS version on your system. |
| `driver_id` | string | Optional. |
| `compatibility` | enum <ul><li>`perfect`<li>`playable`<li>`runs`<li>`unplayable`</ul> | How well the game plays. |
| `auto_super_resolution` | block | Optional. |
| - `compatibility` | enum <ul><li>`yes`<li>`no`<li>`N/A`</ul> | Indicate compatibility with auto super resolution feature. |
| - `enablement` | enum <ul><li>`opt-in`<li>`N/A`</ul> | Indicate how it is enabled in the game. |
| - `fps_boost` | string | Optional. |
