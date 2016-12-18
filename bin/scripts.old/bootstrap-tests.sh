#!/usr/bin/env bash
set -e  # exit on any errors
mydir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
topdir="$mydir/../"
cd "$topdir"

"$mydir"/build.sh
export PATH=$(pwd)/node_modules/.bin:$PATH
npm install karma-cli
jspm install aurelia-framework
jspm install aurelia-http-client
jspm install aurelia-router

