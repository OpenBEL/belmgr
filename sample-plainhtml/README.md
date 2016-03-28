# BELMgr Plugins enhancement of a web page

You can review the index.html file to see how to set this up.  A BEL nanopub is
included in the index.html to pre-load the BEL plugin form elements with data.

## Run example

After cloning belmgr code repository - go to belmgr top directory (has webeditor
as a subdirectory). Then run the following commands:

    # Build plugin
    cd ${BELHOME}/plugin
    npm install
    jspm install -y
    gulp build

    # Build webeditor
    cd ${BELHOME}/webeditor
    npm install;
    jspm install -y;
    gulp build

    # Setup plugin plain web page example
    cd ${BELHOME}/sample-plainhtml
    ln -s ${BELHOME}/webeditor/jspm_packages aurelia-cdn
    ln -s ${BELHOME}/plugin/dist/amd plugin-cdn

    cd sample-plainhtml
    # Use one of the following commands
    # python -m http.server 4001   # python option
    # http-server -o -p 4001   # node option

Go to http://localhost:4001


### Example jQuery statements to extract data from BEL Plugin form elements

    $( "#bel-target-div input").val();
    $( "#belrelation").val();
    $( "#citation_pubdate").val();
    $( "#citation_ref").val();
    $( "#citation_type").val();


### Notes

BEL nanopub is the new term for a BEL Evidence which is the BEL Statement, Citation, Experimental Context and Metadata, but we are still updating code and documentation from the old terminology to the new terminology.
