# BEL Manager

Website for managing BEL Evidences - based on Aurelia.  Requires the [OpenBEL API][OpenBEL API] for the backend API/storage.

[OpenBEL API Docs][OpenBEL API Docs]

[Demo OpenBEL API][Demo OpenBEL API]

## Technical requirements

The BEL Manager is built using NodeJS and hosted by a web server.

*System Requirements*

- NodeJS

## Getting up and Running

### Installing Requirements

- Install NodeJS from https://nodejs.org/en/.
- Install NodeJS dependencies.

#### Example Installation

With ``node`` and ``npm`` installed and in your ``PATH``, install NodeJS
dependencies.

```bash
# Change directory to the base of the BEL Manager
cd belmgr

# install NodeJS dependencies
npm install

# add node_modules binaries to your PATH
PATH=$(pwd)/node_modules/.bin:$PATH

# install jspm packages
jspm install -y

# If you see 'github rate limit reached' - follow these instructions: 
 #  http://stackoverflow.com/questions/30995040/jspm-saying-github-rate-limit-reached-how-to-fix
```

### Configuring

- Edit ``src/AppConfig.js`` to set the ``baseUrl``.
- Optionally set the ``logLevel``.

#### Example Configuration

Configuration using an internally hosted OpenBEL API.

```javascript
var appconfig = {
  'baseUrl': 'http://internal-openbel-api.domain.com/api',
  'logLevel': LogManager.logLevel.debug
}
```

### Building

With NodeJS dependencies in your ``PATH``, build the BEL Manager with
``gulp build``.

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
