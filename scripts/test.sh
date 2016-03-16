#!/usr/bin/env bash
set -e  # exit on any errors
mydir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
topdir="$mydir/../"
cd "$topdir"

export PATH=$(pwd)/node_modules/.bin:$PATH
karma start --single-run

