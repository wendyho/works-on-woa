# "Works on Windows on Arm" website git repository

This repository is used to build `staging.worksonwoa.com` and, from there, `www.worksonwoa.com`.

The websites are built automatically when the staging and main branches are updated, as appropriate.

The staging branch is updated by:

* Forking this repository
* Making the changes you want to make
* Raising a pull request against the staging branch
* Waiting for a repository maintainer to review and approve your changes

Once the pull request is approved, your changes will be merged to the staging branch and published to staging.worksonwoa.com.

A repository maintainer can then merge all changes from staging to main in order to cause the main website to be updated and rebuilt.

## Contributing

Each project is represented by its own file, which is stored under `src/content/projects`. A project's file is named after the project and has a `.md` file extension.

Each file consists of:

* 3 dashes `---`
* Project-specific information as detailed below
* 3 dashes `---`
* Any additional notes in GitHub Markdown format

Project-specific information is included in the `.md` file as follows:

| Field | Type | Notes |
|-------|------|-------|
| `name` | string | The project's name |
| `icon` | path | A path to the project's icon file, relative to `/public/icons`. 512x512 maximum. Use vector (SVG) if possible |
| `category` | list | A list of one or more categories that the project belongs to. A list of categories can be found in `/src/content/categories`. Categories are referenced by their file name in this folder. |
| `compatibility` | enum <ul><li>`native`<li>`native (unreleased)` <li>`emulation`<li>`no`<li>`unknown`</ul>| Windows on Arm compatibility:<br>Native: WoA native support available<br>Native (unreleased): WoA native support available from unreleased version<br>Emulation: Works with x86/x64 emulation<br>No: Not yet ported<br>Unknown: Status not known |
| `versionFrom` | string | The version that the software is available to use from.<br><br>For software that can be compiled from one version, but is only publicly available from the other (ie, Python was able to be compiled way earlier than they started making WoA releases), the publicly available version is to be entered here, as that is typically what most end users would want.<br><br>The compilable from version (and any caveats associated with it) can be added freehand in the notes section. |
| `link` | URL | A link to the project's main website |

All fields are required. If there are any missing fields, the website will (deliberately) not build.

For the category list, this is constructed with an open square bracket `[`, one or more categories separated by commas and a close square bracket `]`. Categories must match the file name of an `.md` file in the `/src/content/categories` folder.

## Questions?

If you have any questions about updating or building this website, please contact Linaro IT Support at [it-support@linaro.org](mailto:it-support@linaro.org).

## Developer Info

Running the site locally will require `Node.js` and the `yarn` package manager. 

First, install dependencies with `yarn install`.

The following commands can then be used to build and run the site locally:

| Command         | Description |
|-----------------|-------------|
| `yarn build` | Builds the site in the `dist` folder of the root directory. The built pages are then indexed to provide static search results. This step can also be carried out separately with `yarn postbuild`. |
| `yarn dev` | Runs the site in a development server, with hot module replacement to reflect updates to the code as soon as they are saved. Note that the search feature of the site will be based on the last time the site was formally built, and won't reflect any live updates. |
| `yarn preview` | Runs the most recent build files in a development server. Unlike `yarn dev` this won't have live updates, but will be a closer representation of the site as it would be in deployment. |
