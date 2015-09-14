#!/usr/bin/env bash
set -e  # exit on any errors
mydir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
topdir="$mydir/../"
cd "$topdir"

if [ $# -ne 1 ]; then
    echo "Usage: $0 [HOST]"
    echo "E.g.: '$0 belmgr.belframework.org'"
    exit 1
fi

echo -en "Host: "
host=$1
echo $host

echo -en "Current version: "
cur_ver=$(git rev-parse HEAD)
echo $cur_ver

echo "Cloning if needed." >&2
ssh "$host" "if [ ! -d "\$HOME/belmgr" ]; then cd \$HOME && git clone https://github.com/OpenBEL/belmgr.git; fi"
echo "Getting changes." >&2
ssh "$host" "cd \$HOME/belmgr && git reset --hard && git checkout master && git pull --ff-only origin master"
echo "Checking out version." >&2
ssh "$host" "cd \$HOME/belmgr && git checkout $cur_ver"
echo "Building." >&2
ssh "$host" "cd \$HOME/belmgr && ./scripts/build.sh"
echo "Done." >&2

