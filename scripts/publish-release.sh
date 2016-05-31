#!/bin/bash
# Normal script execution starts here.
dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$dir" || exit 1
source ".gosh.sh" || exit 1

assert-env-or-die GITHUB_TOKEN || exit 1
assert-env-or-die BELMGR_VERSION || exit 1
assert-env-or-die BELMGR_NAME || exit 1

release_archive="../belmgr-$BELMGR_VERSION.tar.bz2"
if [ ! -r "$release_archive" ]; then
    echo "$release_archive: No such file"
    exit 1
fi

cur_branch="$(git rev-parse --abbrev-ref HEAD)"
temp_remote_repo=$(basename "$0")

# Custom exit handler
# E.g.,
#    _exit 1
function _exit {
    echo -en "Removing temporary remote repository... "
    git remote rm "$temp_remote_repo" >/dev/null 2>&1
    echo "okay."
    exit "$1"
}

# Use a temporary remote repository
git remote rm "$temp_remote_repo" >/dev/null 2>&1
git remote add "$temp_remote_repo" git@github.com:OpenBEL/belmgr.git || exit 1

echo "Fetching tags."
git fetch "$temp_remote_repo" --tags || _exit 1
echo

for tag in "${BELMGR_VERSION}" latest; do
    if git rev-parse "$tag" >/dev/null 2>&1; then
        echo "Deleting tag '$tag'."
        git tag -d "$tag" || _exit 1
        git push "$temp_remote_repo" :refs/tags/$tag || _exit 1
    fi

    echo "Tagging '$tag'."
    git tag -af "${tag}" -m "Tagged ${tag}" || _exit 1
    echo
done
git push "$temp_remote_repo" "$cur_branch" --tags || _exit 1

desc="BEL Manager version $BELMGR_VERSION"
github-release release \
    --user OpenBEL \
    --repo belmgr \
    --tag $BELMGR_VERSION \
    --name "$BELMGR_NAME" \
    --description "$desc" || _exit 1

github-release upload \
    --user OpenBEL \
    --repo belmgr \
    --tag $BELMGR_VERSION \
    --name "$BELMGR_NAME" \
    --file "$release_archive" || _exit 1

_exit 0
