
### Initial setup

Run the following command to do the initial setup and make sure requirements are met:

    bash <(curl -s https://raw.githubusercontent.com/OpenBEL/belmgr/master/bin/initial-setup.sh)

### Building production image

    # Run gulp build to create distribution files in webeditor/dist directory
    cd webeditor; gulp build

    # Create deploy directory, copy files into it
    bin/build-webeditor-image.sh

