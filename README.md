# BEL Manager

Website for managing BEL Evidences - based on Aurelia.  Requires the [OpenBEL API][OpenBEL API] for the backend API/storage.

[OpenBEL API Docs][OpenBEL API Docs]

[Demo OpenBEL API][Demo OpenBEL API]

## Technical requirements

The BEL Manager is built using NodeJS and hosted by a web server.

*System Requirements*

- NodeJS
- Gulp


## Getting up and Running

### Installing Requirements

<<<<<<< 44ebac98afed4528077e1f3c5a5041d08fd739bc
- Install NodeJS from https://nodejs.org/en/.
- Install NodeJS dependencies.
=======
- Install NodeJS from https://nodejs.org/en/
- Install Gulp -- 'npm install gulp -g'
>>>>>>> Updated gulp build system and main README.md

#### Example Installation

With ``node`` and ``npm`` installed and in your ``PATH``, install NodeJS
dependencies.

```bash
# Change directory to the base of the BEL Manager
cd belmgr

# add node_modules binaries to your PATH - to add local gulp and jspm commands
PATH=$(pwd)/node_modules/.bin:$PATH

<<<<<<< 44ebac98afed4528077e1f3c5a5041d08fd739bc
# add node_modules binaries to your PATH
PATH=$(pwd)/node_modules/.bin:$PATH
=======
# install NodeJS and JSPM dependencies for BELMgr Application
cd belmgr/client

npm install
jspm install -y
>>>>>>> Updated gulp build system and main README.md

# install NodeJS and JSPM dependencies for BELMgr Plugins if you are doing Plugin development
#    not needed for BELMgr application deployment
cd ../belmgr/plugins
npm install
jspm install -y

```
#### If you see 'github rate limit reached' - follow these instructions:
    Note: jspm queries GitHub to install semver packages, but GitHub has a rate limit on anonymous API requests. It is advised that you configure jspm with your GitHub credentials in order to avoid problems. You can do this by executing jspm registry config github and following the prompts. If you choose to authorize jspm by an access token instead of giving your password (see GitHub Settings > Personal Access Tokens), public_repo access for the token is required.

### Configuring

- Copy ``belmgr/plugins/src/AppConfig.example.js`` to ``belmgr/plugins/src/AppConfig.js``
- Edit ``belmgr/plugins/src/AppConfig.example.js`` to set the ``openBELApiUrl`` parameter.
- If using authentication - set the loginUrl
- Optionally set the ``logLevel``.

#### Example Configuration

Configuration using a hosted OpenBEL API.

```javascript
var Config = {
  'OpenBELApiUrl' : 'http://next.belframework.org/api',
  'pubmedBaseUrl' : 'http://www.ebi.ac.uk/europepmc/webservices/rest/search',
  'logLevel' : LogManager.logLevel.debug,
  'loginUrl' : 'https://openbel.auth0.com/login?client=K4oAPUaROjbWWTCoAhf0nKYfTGsZWbHE&protocol=oauth2&response_type=token&scope=openid%20profile',

  'tokenStorageName' : 'BELMgrToken',
  'tokenHeaderName' : 'Authorization',
}
```

### Building

With NodeJS dependencies in your ``PATH``, build the BEL Manager with
- ``cd belmgr/client``
- ``gulp build``.

### Deploying

- Host the BEL Manager static content from a web server.

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

[OpenBEL API]:      https://github.com/OpenBEL/openbel-api
[OpenBEL API Docs]: http://next.belframework.org/
[Demo OpenBEL API]: http://next.belframework.org/api
