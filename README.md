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

- Install NodeJS from https://nodejs.org/en/
- Install Gulp -- 'npm install gulp -g'

#### Example Installation

With ``node`` and ``npm`` installed and in your ``PATH``, install application dependencies
dependencies.

```bash
# Change directory to the base of the BEL Manager
git clone https://github.com/OpenBEL/belmgr
cd belmgr

# Run one of the scripts below - first one to build the BELMgr, the second one to do local
#     development -- see note about github rate limit reached below
# ./scripts/build.sh
# ./scripts/setup-localdev.sh

# For rebuilding and serving the BELMgr after making changes to the plugin during development
cd webeditor
../scripts/rebuild-belmgr-localdev.sh  # builds plugin, then webeditor, then serves it
```

#### If you see 'github rate limit reached' - follow these instructions:
    Note: jspm queries GitHub to install semver packages, but GitHub has a rate limit on anonymous API requests. It is advised that you configure jspm with your GitHub credentials in order to avoid problems. You can do this by executing jspm registry config github and following the prompts. If you choose to authorize jspm by an access token instead of giving your password (see GitHub Settings > Personal Access Tokens), public_repo access for the token is required.


### Configuring

- Create ``config/config.json`` file as indicated below
- Edit ``config.json`` to set the ``openBELApiUrl`` parameter.
- If using authentication - set the ``loginUrl`` in ``config.json``
- Optionally set the ``LogManager.setLevel(LogManager.logLevel.debug);`` in the main.js file - change debug to error, info or warning

#### Example Configuration file

Configuration - this goes into src/config/config.json when building or /config/config.json when serving the application.

```javascript
{
    "openBELApiUrl": "https://thor.selventa.com/api",
    "pubmedBaseUrl": "http://www.ebi.ac.uk/europepmc/webservices/rest/search",
    "loginUrl": "https://openbel.auth0.com/login?client=K4oAPUaROjbWWTCoAhf0nKYfTGsZWbHE&protocol=oauth2&response_type=token&scope=openid%20profile"
}

```

### Building

With NodeJS dependencies in your ``PATH``, build the BEL Manager with
- ``cd belmgr/webeditor``
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
