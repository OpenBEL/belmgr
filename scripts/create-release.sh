#!/bin/bash
set -x
# Normal script execution starts here.
dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$dir" || exit 1
source "env.sh" || exit 1

assert-env-or-die BELMGR_VERSION || exit 1

vrun-or-die "$(pwd)/build.sh"
cd .. || exit 1
output_dir="belmgr-$BELMGR_VERSION"
if [ -n "${bamboo.buildNumber}" ]; then
    output_dir+="${bamboo.buildNumber}"
fi
echo "BEL Manager version: $output_dir"
output_archive="$output_dir.tar.bz2"
cp -a webeditor "$output_dir"
tar c "$output_dir" | bzip2 --best > "$output_archive"

