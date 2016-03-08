#!/usr/bin/env bash
mydir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
topdir=$(dirname "${BASH_SOURCE[0]}")/../
cd "$topdir"

echo "Running 'npm install'... "
npm install || exit 1
export PATH=$(pwd)/node_modules/.bin:$PATH

echo "Running 'jspm install -y'... "
jspm install -y || exit 1

rm -fr dist || exit 1

current_rev=$(git rev-parse HEAD)
git fetch origin || exit 1
git checkout build || exit 1
git pull origin build || exit 1
git merge $current_rev || exit 1

echo "Running 'gulp build'... "
gulp build || exit 1

git add dist || exit 1
git commit --all -m "OpenBEL Build server updated build" || exit 0
git push origin build || exit 1
