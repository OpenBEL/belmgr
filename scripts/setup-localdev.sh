#!/usr/bin/env bash

#  After running 'git clone git@github.com:OpenBEL/belmgr.git'
#  this script will setup the site for local development
#  by arranging plugin to be symlinked to the webeditor and sample sites

set -e  # exit on any errors

# DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"/../
# EDITOR_DIR="$DIR"/webeditor
PATH=node_modules/.bin:$PATH

if [ ! -d 'webeditor' ]; then
  echo "Please run this script from belmgr root directory such that scripts, plugin and webeditor are subdirectories"
  exit
fi

# Setup plugin
cd plugin;
npm install;
jspm install -y;
gulp build;

# Setup webeditor
cd ../webeditor;
npm install;
jspm install -y;
gulp build;

# Setup plugin aurelia example
cd ../sample-aureliaplugin;
npm install;
jspm install -y;
gulp build;

# Setup plugin plain web page example
cd ../sample-plainhtml
ln -s ../webeditor/jspm_packages aurelia-cdn
ln -s ../plugin/dist/amd plugin-cdn
