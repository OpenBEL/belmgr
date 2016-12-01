# BELMgr plugins

This plugin provides BEL Mgr BEL Editing functionality (http://openbel.org).
You can deploy the entire BEL Nanopub edit form or subcomponents of the edit
form via this plugin.


## Installing the plugins

jspm install belmgr-plugin


## Using the plugins

There are examples of how to use this plugin in this repo in the sample* directories


## Updating the NPM package

Select the semantic portion to update using the `npm version` command

    npm version {patch minor major}
    npm publish


## Technical requirements

*System Requirements*

- NodeJS
- Git
- Gulp

NOTE: Older versions of NodeJS, Git and Gulp might require an upgrade.


## Getting up and Running
### Installation Requirements

Install the latest version of NodeJS:
https://nodejs.org/en/download/

Install the latest version of Git including Git Bash:
https://git-scm.com/downloads

Install Gulp globally:
Run CMD as administrator
npm install -g gulp

Install JSPM globally:
Run CMD as administrator
npm install -g jspm


#### Example Installation

With NodeJS and npm installed and in your System PATH variable, install NodeJS package module dependencies.

From the Bash
# Change directory to plugin
cd (BEL Manager directory)\plugin

# With NodeJS installed globally, run the command
npm install

# With JSPM installed globally run the command
jspm install -y


### Building

With Gulp installed globally, run the command
gulp build
