#!/usr/bin/env bash
#
# Setup new dev environment for the belmgr
#
# run via 'bash <(curl -s https://raw.githubusercontent.com/OpenBEL/belmgr/master/bin/initial-setup.sh)''
#

hash npm 2>/dev/null || { echo >&2 "I require nodejs. Please install.  Aborting."; exit 1; }
hash jspm 2>/dev/null || { echo >&2 "I require jspm.   Please install.  Aborting."; exit 1; }
hash gulp 2>/dev/null || { echo >&2 "I require gulp.   Please install.  Aborting."; exit 1; }

git clone git@github.com:OpenBEL/belmgr.git

cd belmgr
HOME=$(pwd)
echo $HOME

cd $HOME/plugin
npm install
jspm install
sleep 5
jspm install
gulp build

# npm link for local development
npm link

cd $HOME/webeditor
npm install

jspm install
sleep 10  # jspm isn't installing completely the first time for some reason
jspm install

# use local npm linked belmgr-plugin for webeditor development
npm link belmgr-plugin

gulp build

cp
echo 'Change directory to belmgr/webeditor and run "gulp watch"'
