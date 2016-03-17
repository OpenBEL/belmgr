#!/usr/bin/env bash
set -e  # exit on any errors

mydir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
topdir=$(dirname "${BASH_SOURCE[0]}")/../
cd "$topdir"

cd "$topdir/client"

export PATH=$(pwd)/client/node_modules/.bin:$PATH

ln -s ./node_modules/.bin/gulp .
ln -s ./node_modules/.bin/jspm .

echo "Running 'npm install' for BELMgr application ... "
npm install

echo "Running 'jspm install -y' for BELMgr application ... "
jspm install -y

echo "Running 'gulp build' for BELMgr application ... "
gulp build

echo "Enter client directory and run 'gulp serve' to test application"
echo " or 'gulp watch' for local development"
echo " or 'gulp export' for a distributable version of the application"
