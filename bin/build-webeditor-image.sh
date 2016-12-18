#!/usr/bin/env bash
#
# Copy belmgr webeditor files to deploy-webeditor dir
# Build Dockerfile image
#

if [ ! -d "webeditor" ]; then
    echo "Please run this from the belmgr root directory which has the child directories: webeditor and plugin";
    exit;
fi

mkdir -p deploy-webeditor

cp -r webeditor/index.html webeditor/styles webeditor/media webeditor/config.js webeditor/favicon.ico deploy-webeditor
cp -r webeditor/dist webeditor/jspm_packages deploy-webeditor

docker build -t whayes/belmgr .

