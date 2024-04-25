---
layout: ../layouts/InfoLayout.astro
title: Contributing
description: How to contribute to this site
---

# Contributing to this site

For applications and games, there is a defined *schema* to ensure consistency of data across the submissions.

Each entry is stored in a file with a `.md` file extension. Application entries are stored under `src/content/applications` and game entries are stored under `src/content/games`.

If you are contributing your own report on an existing entry, it should be stored under `src/content/user_reports_applications` or `src/content/user_reports_games` as appropriate.

Each file consists of:

- 3 dashes `---`
- Project-specific information as detailed below
- 3 dashes `---`
- Any additional notes in GitHub Markdown format

## Applications schema

Information stored in an application entry must follow this schema:

| Field | Type | Notes |
|-|-|-|
| `name` | string | The application's name. |
| `icon` | string | Optional. The path to the icon file to use, relative to `public/icons`. 512x512 maximum. Use SVG if possible. |
| `categories` | list | A list of one or more categories that the application belongs to. A list of categories can be found in `src/content/applications_categories`. Categories are referenced by their file name in this folder. |
| `compatibility` | enum <ul><li>`native`<li>`emulation`<li>`no`<li>`unknown`</ul> | Windows on Arm compatibility:<br>Native: WoA native support available<br>Emulation: Works with x86/x64 emulation<br>No: Not yet ported<br>Unknown: Status not known |
| `version_from` | string | The version that the software is available to use from.<br><br>For software that can be compiled from one version, but is only publicly available from the other (i.e., Python was able to be compiled way earlier than they started making WoA releases), the publicly available version is to be entered here, as that is typically what most end users would want.<br><br>The compilable from version (and any caveats associated with it) can be added freehand in the notes section. |
| `link` | URL | A link to where the software can be downloaded, or the application's main website. |

## Applications User Report schema

Users can add their own findings regarding an application that has been added to this site. The file can have any **unique** filename (with a `.md` extension) and the contents must follow this schema:

| Field | Type | Notes |
|-|-|-|
| `reporter` | string | Optional. Your name. |
| `application` | string | The name of the application from its own filename, i.e. **without** the `.md` extension |
| `device_configuration` | string | Optional. Any information about your configuration that may have an influence on the report. |
| `date_tested` | date | Optional. Format is `YYYY-MM-DD` |
| `compatibility_details` | string | Your report of how the application ran for you. |

## Games schema

| Field | Type | Notes |
|-|-|-|
| `name` | string | The name of the game. |
| `icon` | string | Optional. The path to the icon file to use, relative to `public/icons`. 512x512 maximum. Use SVG if possible. |
| `categories` | list | A list of one or more categories that the game belongs to. A list of categories can be found in `src/content/gamess_categories`. Categories are referenced by their file name in this folder. |
| `publisher` | string | Optional. The name of the game's publisher. |
| `frame_rate` | string | Optional. Supported frame rates. |
| `device_configuration` | string | Optional. Supported configurations. |
| `os_version` | string | Optional. Supported OS versions. |
| `driver_id` | string | Optional. |
| `date_tested` | date | Optional. Format is `YYYY-MM-DD` |
| `compatibility` | enum <ul><li>`perfect`<li>`playable`<li>`runs`<li>`unplayable`</ul> | How well the game plays. |
| `compatibility_details` | string | Optional. Any additional information about the compatibility. |
| `auto_super_resolution` | block | Optional. See example below for syntax. |
| - `compatibility` | enum <ul><li>`yes`<li>`no`<li>`N/A`</ul> | Indicate compatibility with auto super resolution feature. |
| - `enablement` | enum <ul><li>`out of box`<li>`opt-in`<li>`N/A`</ul> | Indicate how it is enabled in the game. |
| - `fps_boost` | string | Optional. |
| `link` | URL | A link to where the software can be downloaded, or the application's main website. |

The `auto_super_resolution` block is optional but, if present, the attributes `compatibility` and `enablement` **must** be present. The block is formatted like this:

```
   auto_super_resolution:
      compatibility: yes
      enablement: out of box
```

## Games User Report schema

Users can add their own findings regarding a game that has been added to this site. The file can have any **unique** filename (with a `.md` extension) and the contents must follow this schema:

| Field | Type | Notes |
|-|-|-|
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

Note that for user game reports, auto super resolution enablement can only be `opt-in` or `N/A`.

## Categories

For the application or game category list, this is constructed with an open square bracket `[`, one or more categories separated by commas, and a close square bracket `]`.

Categories must match the file name of an `.md` file in the appropriate categories folder as specified earlier.
