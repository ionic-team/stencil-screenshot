# Stencil Screenshot Comparison App

Source code to generate the webapp that compares screenshot images.

## Testing in Ionic

1. Run `npm i`
1. Run `npm build`
1. Copy the `www/` folder to Ionic:
   ```
   $ cp -r ./www ../ionic/core/node_modules/\@stencil/core/screenshot/compare/
   ```
1. Run `npm run test.screenshot` in `ionic/core` (or if desired pass a folder using `npm run test.screenshot --f action-sheet`)

## Updating in Ionic

1. Have `stencil` as a sibling repository
1. After running build here the files are copied over to Stencil
1. Commit and push those build files
1. Release a new version of Stencil for Ionic