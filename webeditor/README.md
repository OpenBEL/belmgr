# BEL Manager

Website for managing BEL Evidences - based on Aurelia.  Requires the OpenBEL API for the backend API/storage.

OpenBEL API Docs

Demo OpenBEL API

## Technical requirements

The BEL Manager is built using NodeJS and hosted by a web server.

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

Install Http-Server globally:
Run CMD as administrator
npm install -g http-server


#### Example Installation

With NodeJS and npm installed and in your System PATH variable, install NodeJS package module dependencies.

From the Bash
# Change directory to Web Editor
cd (BEL Manager directory)\webeditor

# With NodeJS installed globally, run the command
npm install

# With JSPM installed globally run the command
jspm install -y

# If you see 'github rate limit reached' - follow these instructions:
# http://stackoverflow.com/questions/30995040/jspm-saying-github-rate-limit-reached-how-to-fix


### Configuring

- Rename config.json.example in path to BEL manager repo\webeditor\src\config\ to config.json (remove .example)
- Update API URL in config.json to: http://pmi-openbel.sbvimprover.com:9292/api

#### Example Configuration

Configuration using an internally hosted OpenBEL API.

```javascript
{
    "pubmedBaseUrl": "http://www.ebi.ac.uk/europepmc/webservices/rest/search",
    "loginUrl": "https://openbel.auth0.com/login?client=K4oAPUaROjbWWTCoAhf0nKYfTGsZWbHE&protocol=oauth2&response_type=token&scope=openid%20profile",
    "openbelApiUrls": [
      {"api": "http://internal-openbel-api.domain.com/api", "name": "Open BEL Internal API"}
    ]
}
```


### Building

With Gulp installed globally, run the command
gulp build

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
