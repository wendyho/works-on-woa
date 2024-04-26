---
layout: ../layouts/InfoLayout.astro
title: "Homepage"
description: Help page for using the Windows on Arm ready application website.
---

Compatibility information for apps that work for Windows for Arm

This site contains compatibility information for many apps and games on Windows devices that run on Arm architecture and will be updated over time. If you have tested apps or games and want to contribute your own results, click here to submit a PR to the open source GitHub. 

The information is intended to serve as a guide, but does not absolutely guarantee that an app or game will run. The results have been tested, but may not work on your specific machine and configuration. If your results differ, please contribute to the open source GitHub with your findings.

For applications, the **Compatibility** field can be one of the following values:

| Value     | Meaning                               |
| --------- | ------------------------------------- |
| native    | Runs natively on Windows on Arm (WoA) |
| emulation | Works with x86/x64 emulation          |
| no        | not yet ported                        |
| unknown   | status not known                      |

For games, the **Compatibility** field can be one of the following values:

| Value     | Meaning                                                                                        |
| --------- | ---------------------------------------------------------------------------------------------- |
| perfect   | Runs at 60+ FPS at 1080p resolution with no glitches/ issues that affect gaming experience     |
| playable  | Runs at 30+ FPS at 1080p resolution with minimal gitches/issues that affect gaming experience  |
| runs      | Runs with bugs that may affect gaming experience                                               |
| unplayable| Does not run due to anti-cheat or other failures                                               |


<ul
  class="max-w-5xl mx-auto flex flex-col md:flex-row justify-center items-center text-xl font-bold gap-8 list-none no-underline mt-12"
>
  <li>
    <a
      class="border-white border-2 px-4 py-2 rounded-xl hover:bg-white hover:text-black no-underline"
      href="/applications/">View Applications</a
    >
  </li>
  <li>
    <a
      class="border-white border-2 px-4 py-2 rounded-xl hover:bg-white hover:text-black no-underline"
      href="/games/">View Games</a
    >
  </li>
</ul>
