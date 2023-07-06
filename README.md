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

Each project is represented by its own file, which is stored under `src/content/projects`. A project's file is named after the project and has a `.yaml` file extension.

Each project file contains the following information:

* `name`: string : The project's name
* `icon`: path: A path to the project's icon, relative to `/public/icons`
* `category`: list: A list of one or more categories that the project belongs to. A list of categories can be found in `/src/content/categories`
* `support`: enum: `native`, `emulation`, `no`, `unknown`
* `link`: URL: A link to the project's main website
* `notes`: string: Any other general notes for the project

## Questions?

If you have any questions about updating or building this website, please contact Linaro IT Support at [it-support@linaro.org](mailto:it-support@linaro.org).
