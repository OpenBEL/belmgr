#!/usr/bin/env bash

#  After running 'git clone git@github.com:OpenBEL/belmgr.git'
#  this script will setup the site for local development
#  by arranging plugin to be symlinked to the webeditor and sample sites

set -e  # exit on any errors

PLUGIN_VERSION=0.1.7
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
if [ ! -d ${BELHOME}/webeditor/jspm_packages/npm/belmgr-plugins\@$PLUGIN_VERSION ]; then
  echo "Cannot find belmgr-plugin package - please check the Plugin Version number"
  exit
fi
rm -r ${BELHOME}/webeditor/jspm_packages/npm/belmgr-plugins\@$PLUGIN_VERSION
ln -s ${BELHOME}/plugin/dist/system jspm_packages/npm/belmgr-plugins\@$PLUGIN_VERSION
gulp build;


# Setup plugin plain web page example
cd ${BELHOME}/sample-plainhtml
ln -s ${BELHOME}/webeditor/jspm_packages aurelia-cdn
ln -s ${BELHOME}/plugin/dist/amd plugin-cdn
