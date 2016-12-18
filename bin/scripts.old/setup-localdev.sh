#!/usr/bin/env bash

#  After running 'git clone git@github.com:OpenBEL/belmgr.git'
#  this script will setup the site for local development
#  by arranging plugin to be symlinked to the webeditor and sample sites

BELHOME=`pwd`
PATH=node_modules/.bin:$PATH

if [ ! -d 'webeditor' ]; then
  echo "Please run this script from belmgr root directory such that scripts, plugin and webeditor are subdirectories"
  exit
fi

# Setup plugin
cd ${BELHOME}/plugin;
npm install;
jspm install -y;
gulp build;


# Setup webeditor
cd ${BELHOME}/webeditor
npm install;
jspm install -y;
jspm install belmgr-plugin -o {jspmNodeConversion: false}
gulp build;

echo "!!! Remove the ${BELHOME}/webeditor/jspm_packages/npm/belmgr-plugin\@{Version}"
echo "directory and link it to ${BELHOME}/plugin/dist/system in order "
echo "to do local development of the webeditor and the belmgr-plugin"
echo "\ne.g. '\rm -r belmgr-plugin@<version>'  (do not remove the belmgr-plugin@<version>.js file)"
echo "'ln -s ../../../plugin/dist/system belmgr-plugin@<version>"

# Setup plugin plain web page example
cd ${BELHOME}/sample-plainhtml
ln -s ${BELHOME}/webeditor/jspm_packages aurelia-cdn
ln -s ${BELHOME}/plugin/dist/amd plugin-cdn
