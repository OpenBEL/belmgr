#!/usr/bin/env bash
set -e  # exit on any errors
mydir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
topdir=$(dirname "${BASH_SOURCE[0]}")/../
cd "$topdir"

echo "Running 'npm install'... "
npm install
export PATH=$(pwd)/node_modules/.bin:$PATH

echo "Running 'jspm install -y'... "
jspm install -y

echo "Running 'gulp build'... "
gulp build

