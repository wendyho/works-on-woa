# "Works on Windows on Arm" website git repository

This repository is used to build `staging.worksonwoa.com` and, from there, `www.worksonwoa.com`.

The websites are built automatically when the staging and main branches are updated, as appropriate.

The staging branch is updated by:

- Forking this repository
- Making the changes you want to make
- Raising a pull request against the staging branch
- Waiting for a repository maintainer to review and approve your changes

Once the pull request is approved, your changes will be merged to the staging branch and published to staging.worksonwoa.com.

A repository maintainer can then merge all changes from staging to main in order to cause the main website to be updated and rebuilt.

## Contributing

Details of the schemas used in the application, game and user report files can be found by reading https://www.worksonwoa.com/contributing

## Questions?

If you have any questions about updating or building this website, please contact Linaro IT Support at [it-support@linaro.org](mailto:it-support@linaro.org).

## Developer Info

Running the site locally will require `Node.js` and the `yarn` package manager.

First, install dependencies with `yarn install`.

The following commands can then be used to build and run the site locally:

| Command        | Description                                                                                                                                                                                                                                                           |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `yarn build`   | Builds the site in the `dist` folder of the root directory. The built pages are then indexed to provide static search results. This step can also be carried out separately with `yarn postbuild`.                                                                    |
| `yarn dev`     | Runs the site in a development server, with hot module replacement to reflect updates to the code as soon as they are saved. Note that the search feature of the site will be based on the last time the site was formally built, and won't reflect any live updates. |
| `yarn preview` | Runs the most recent build files in a development server. Unlike `yarn dev` this won't have live updates, but will be a closer representation of the site as it would be in deployment.                                                                               |
