# Versioning and cache busting

To specify a new version before each deployment, run the following command in the branch that will be deployed:

```bash
yarn version
```

A prompt will appear asking for the new version number. Refer to `https://semver.org` for versioning conventions. Once you input a new version, `yarn` will auto-commit the changes to `package.json`.

Upon deployment, `generate-build-version.js` will be executed and write the latest version to `public/meta.json`. Should there be a mismatch in the version of `package.json` and `public/meta.json` on the users' end, the app will clear all caches and reload to fetch the latest version.
