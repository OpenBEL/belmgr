# BEL Manager

Website for managing BEL Nanopubs - based on Aurelia.  Requires the [OpenBEL API][OpenBEL API] for the backend API/storage.


## Table of contents

* [Getting Started](#getting_started)
* [Webeditor](#webeditor)
* [BELMgr Plugin](#belmgr-plugin)

## <a name="getting_started">Getting started</a>

### Installation of Webeditor and Plugin

System Requirements
- NodeJS
- JSPM
- Gulp

1. Install NodeJS from https://nodejs.org/en/
1. Install Gulp -- 'npm install -g gulp'
1. Install jspm -- 'npm install -g jspm'
1. Run `bash <(curl -s https://raw.githubusercontent.com/OpenBEL/belmgr/master/bin/initial-setup.sh)` to clone and run setup commands (you can also read the script to see what is going to be done or to modify the instructions)
1. Start webeditor `cd belmgr/webeditor`, `gulp watch`
1. Go to http://localhost:9000 in your browser (check the gulp watch results for a different port number if that doesn't work)

#### If you see 'github rate limit reached' - follow these instructions:
    Note: jspm queries GitHub to install semver packages, but GitHub has a rate limit on anonymous API requests. It is advised that you configure jspm with your GitHub credentials in order to avoid problems. You can do this by executing jspm registry config github and following the prompts. If you choose to authorize jspm by an access token instead of giving your password (see GitHub Settings > Personal Access Tokens), public_repo access for the token is required.

### Configuring

- Update ``config/config.json`` file as indicated below
- Edit ``config.json`` to set the ``openBELApiUrls`` parameter.
- Optionally set the ``LogManager.setLevel(LogManager.logLevel.debug);`` in the main.js file - change debug to error, info or warning

#### Example Configuration file

Configuration - this goes into src/config/config.json when building or /config/config.json when serving the application.

```javascript
{
    "pubmedBaseUrl": "http://www.ebi.ac.uk/europepmc/webservices/rest/search",
    "openbelApiUrls": [
      {"api": "http://bel2.demo.openbel.org/api", "name": "Demo BEL 2.0 API"},
      {"api": "http://bel1.demo.openbel.org/api", "name": "Demo BEL 1.0 API"},
      {"api": "http://localhost:9000", "name": "Local Dev OpenBEL API"}
    ]
}
```

## <a name="webeditor">Webeditor</a>

### Local development notes
We use npm link to allow for easier local development of the belmgr-plugin with the webeditor. You can see the npm link commands used in the `https://raw.githubusercontent.com/OpenBEL/belmgr/master/bin/initial-setup.sh` file.

Run webeditor locally using from the webeditor directory:

    gulp watch


### Building Production docker image
From the root directory of the belmgr code repository (with webeditor and plugin as child directories):

    bin/build-webeditor-image.sh

### Deploying manually

- Host the BEL Manager static content from a web server.  Copy the files copied in the `uild-webeditor-image.sh` script to the `deploy-webeditor` directory to your website directory for your webserver.

#### Nginx Example Deployment Configuration

```
    server {
        listen          0.0.0.0:80;
        server_name     internal-belmgr.domain.com;
        access_log      /var/log/nginx/belmgr-access.log main;
        error_log       /var/log/nginx/belmgr-error.log info;

        location / {
            alias                       /opt/belmgr/;
            index                       index.html;
            add_header  Cache-Control   no-cache;
        }
    }
```

## <a name="belmgr-plugin">BELMgr plugin</a>

This plugin provides BEL Mgr BEL Editing functionality (http://openbel.org).
You can deploy the entire BEL Nanopub edit form or subcomponents of the edit
form via this plugin.

## Technical requirements

*System Requirements*

- NodeJS
- Git
- Gulp

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
NOTE: Older versions of NodeJS, Git and Gulp might require an upgrade.


### Installing the plugin

jspm install belmgr-plugin


### Using the plugin

There are examples of how to use this plugin in this repo in the sample* directories

### Updating the NPM package

Select the semantic portion to update using the `npm version` command

    npm version {patch minor major}
    npm publish




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


[OpenBEL API]:      https://github.com/OpenBEL/openbel-api
[OpenBEL API Docs]: http://next.belframework.org/
[Demo OpenBEL API]: http://next.belframework.org/api

