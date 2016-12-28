The BELMgr Docker image is hosted on Dockerhub:  [openbel/belmgr](https://hub.docker.com/r/openbel/belmgr/)

### Initial setup

Run the following command to do the initial setup and make sure requirements are met:

    bash <(curl -s https://raw.githubusercontent.com/OpenBEL/belmgr/master/bin/initial-setup.sh)

### Building production image

    # Create deploy directory, copy files into it
    bin/build-webeditor-image.sh

### Running BELMgr
You can override the `keycloak.json` file and the configuration file defining the default OpenBEL API endpoints by using the following:

    docker run -d \
      -v ~/keycloak.json:/usr/share/nginx/html/keycloak.json \
      -v ~/config.json:/usr/share/nginx/html/dist/config/config.json \
      openbel/belmgr
