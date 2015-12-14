# BEL Manager

Website for managing BEL Evidences - based on Aurelia.  Requires the OpenBEL Platform for the backend API/storage.

[OpenBEL Platform API Docs](http://next.belframework.org/)

[Demo OpenBEL Platform API](http://next.belframework.org/api)

## Technical requirements

The BEL Manager is built using NodeJS and hosted by a web server.

*System Requirements*

- NodeJS

## Getting up and Running

### Installing Requirements

- Install NodeJS from https://nodejs.org/en/.
- Install NodeJS dependencies.
- Install gulp and jspm.

#### Example Installation

With ``node`` and ``npm`` installed and in your ``PATH``, install NodeJS
dependencies.

```bash
# Change directory to the base of the BEL Manager
cd belmgr

# install NodeJS dependencies
npm install

# install gulp and jspm
npm install gulp jspm

# add node_modules binaries to your PATH
PATH=$(pwd)/node_modules/.bin:$PATH

# install jspm packages
jspm install -y
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
