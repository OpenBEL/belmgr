#!/usr/bin/env bash
#
# Setup new dev environment for the belmgr
#
# run via 'bash <(curl -s https://raw.githubusercontent.com/OpenBEL/belmgr/master/bin/initial-setup.sh)''
#

hash npm 2>/dev/null || { echo >&2 "I require npm. Please install, e.g. 'sudo apt-get install npm' Aborting."; exit 1; }
hash jspm 2>/dev/null || { echo >&2 "I require jspm.   Please install 'npm install jspm -g'.  Aborting."; exit 1; }
hash gulp 2>/dev/null || { echo >&2 "I require gulp.   Please install 'npm install gulp -g'.  Aborting."; exit 1; }

ssh_status=$(ssh -o BatchMode=yes -o ConnectTimeout=5 git@github.com 2>&1)

if [[ $ssh_status == *"successfully authenticated"* ]] ; then
  clone_cmd="git clone git@github.com:OpenBEL/belmgr.git";
else
  clone_cmd="git clone https://github.com/OpenBEL/belmgr.git";
fi

if [ ! -d "belmgr" ]; then
    $clone_cmd
else
    cd belmgr;
    git pull;
    cd ..;
fi

cd belmgr
HOME=$(pwd)
echo $HOME

###### Setup Plugin
cd $HOME/plugin
npm install
jspm install
sleep 5
jspm install
gulp build

#####  Setup webeditor
cd $HOME/webeditor
npm install

jspm install
sleep 10  # jspm isn't installing completely the first time for some reason
jspm install

gulp build

cp $HOME/webeditor/src/config/config.json.example $HOME/webeditor/src/config/config.json

#
echo 'Change directory to belmgr/webeditor and run "gulp watch"'
