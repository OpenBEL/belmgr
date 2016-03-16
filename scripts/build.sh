#!/usr/bin/env bash
set -e  # exit on any errors
<<<<<<< f565bc26ebbcbc83b73b74beb4bab6ddd43652bc

export PATH=$(pwd)/client/node_modules/.bin:$PATH

=======
>>>>>>> Fixed openBelApiUrl references
mydir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
topdir=$(dirname "${BASH_SOURCE[0]}")/../
cd "$topdir"

<<<<<<< f565bc26ebbcbc83b73b74beb4bab6ddd43652bc
cd "$topdir/client"

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

cd "../plugin"

echo "Running 'npm install' for plugin ... "
npm install

echo "Running 'jspm install -y' for plugin ... "
jspm install -y

echo "Running 'gulp build' for plugin ... "
gulp build
=======
echo "Running 'npm install'... "
npm install
export PATH=$(pwd)/node_modules/.bin:$PATH

echo "Running 'jspm install -y'... "
jspm install -y

echo "Running 'gulp build'... "
gulp build

>>>>>>> Fixed openBelApiUrl references
