#!/usr/bin/env bash
mydir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
topdir=$(dirname "${BASH_SOURCE[0]}")/../
cd "$topdir"

echo "Running 'npm install'... "
npm install || exit 1
export PATH=$(pwd)/node_modules/.bin:$PATH

echo "Running 'jspm install -y'... "
jspm install -y || exit 1

echo "Running 'gulp build'... "
gulp build || exit 1

current_branch=$(git rev-parse --abbrev-ref HEAD)
if [ "$current_branch" != "master" ]; then
    echo "expected to be on the master branch, we're on $current_branch!" >&2 
    exit 1
fi

git checkout build || exit 1
git merge master || exit 1
git add dist || exit 1
git commit --all -m "OpenBEL Build server updated build" || exit 0
git push origin build || exit 1
