# Odyssey Frontend

## Getting Started

1. Install nodenv by following the instructions [here](https://github.com/nodenv/nodenv#installation).
   Then, install Node `16.9.1` via:
   ```sh
   $ nodenv install 16.9.1
   ```
1. Install Yarn for dependency management.
   ```sh
   $ npm install --global yarn
   ```
1. Install the project dependencies.
   ```sh
   $ yarn
   ```
1. Set up the necessary environment variables by editing `public/env.js` and `.env.development` with the relevant values.
   **Make sure not to commit any credentials added here.**
1. Start the React application.
   ```sh
   $ yarn start
   ```

## Linting

To run the linter:
```sh
$ yarn lint
```

Some lint errors can be auto-corrected:
```sh
$ yarn lint --fix
```

## Versioning and cache busting

To specify a new version before each deployment, run the following command in the branch that will be deployed:

```bash
$ yarn version
```

A prompt will appear asking for the new version number. Refer to https://semver.org for versioning conventions.
Once you input a new version, Yarn will auto-commit the changes to `package.json`.

Upon deployment, `generate-build-version.js` will be executed and write the latest version to `public/meta.json`.
Should there be a mismatch in the version of `package.json` and `public/meta.json` on the users' end, the app will clear all caches and reload to fetch the latest version.
