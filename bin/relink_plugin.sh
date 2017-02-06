#!/usr/bin/env bash

HOME=$(pwd)
VERSION=$(cat VERSION)
PLUGIN_DIR="$HOME/webeditor/jspm_packages/npm/belmgr-plugin@${VERSION}"
PLUGIN_JS="$HOME/webeditor/jspm_packages/npm/belmgr-plugin@${VERSION}.js"

echo $VERSION

files=$(ls -d $HOME/webeditor/jspm_packages/npm/belmgr-plugin*)

for i in $files; do
    echo $i
    if [ $i == $PLUGIN_DIR ]; then
        echo "plugin dir"
        rm -r $PLUGIN_DIR
        ln -s $HOME/plugin/dist/amd $PLUGIN_DIR
    elif [ $i == $PLUGIN_JS ]; then
        echo "plugin js"
    else
        echo "$i files to be removed"
        rm -r $i
    fi

done

# cd $HOME/webeditor/jspm_packages/npm && rm -r belmgr*${LAST_VERSION}*
# cd $HOME/webeditor/jspm_packages/npm && rm -r belmgr*${NEW_VERSION}
# cd $HOME/webeditor/jspm_packages/npm && ln -s ../../../plugin/dist/amd belmgr-plugin@${NEW_VERSION}
