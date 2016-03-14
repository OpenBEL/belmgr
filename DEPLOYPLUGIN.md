# Deploying plugin to NPM for use by JSPM

Instructions are found here: https://gist.github.com/coolaj86/1318304

Prepare to publish:
* Set you NPM author info and add your user to npmjs.com
* Make sure you are added as a collaborator to belmgr-plugins by contacting one of the collaborators (e.g. `npm owner add`)

* CD to plugin directory
* `npm version 1.1.1`  (insert correct version number - this will )
* `npm publish ./`

`npm version` will open up your package.json file, change the version to 1.2.3, git add it, git commit it, and git tag v1.2.3 it.

## Adding to JSPM registry

Already done, but this was accomplished by doing a Pull Request on https://github.com/jspm/registry/blob/master/registry.json and adding `"belmgr-plugins": "npm:belmgr-plugins",`

## Adding to Aurelia registry

Not yet done!

To do this, do a Pull Request on https://github.com/aurelia/registry/blob/master/plugin-registry.json

