# BELMgr Plugins enhancement of a web page

You can review the index.html file to see how to set this up.  A BEL nanopub is
included in the index.html to pre-load the BEL plugin form elements with data.

## Run example

After cloning belmgr code repository - go to belmgr top directory (has webeditor
as a subdirectory).

# Setup the plugin and Web Editor by following the steps in the read me:
- (BEL Manager directory)\webeditor\README.md
- (BEL Manager directory)\plugin\README.md


# Setup plugin plain web page example
cd (BEL Manager directory)/sample-plainhtml

## Mac and Linux Symlinks
ln -s (BEL Manager directory)/webeditor/jspm_packages aurelia-cdn
ln -s (BEL Manager directory)/plugin/dist/amd plugin-cdn

## Windows Symlinks
mklink /D "aurelia-cdn" "C:\Development\BELmanager\webeditor\jspm_packages"
mklink /D "plugin-cdn" "C:\Development\BELmanager\plugin\dist\amd"


cd (BEL Manager directory)/sample-plainhtml
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
