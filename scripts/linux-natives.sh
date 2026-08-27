#!/bin/sh
# Install the Linux native binaries that rollup, esbuild and sharp need.
#
# node_modules in this repo was installed on Windows, so it only carries the
# win32 builds and a Linux container dies with "Cannot find module
# @rollup/rollup-linux-x64-musl". `npm install` cannot be used here: the metadata
# resolution alone is hundreds of round trips and this connection drops it every
# time (ETIMEDOUT after roughly 80 seconds). Fetching each tarball directly is
# one GET per package, which does survive.
#
# The win32 packages stay where they are. npm picks the binary that matches
# whatever platform is running, so Windows and the container both keep working.
set -e

pkg_version() {
    node -p "try{require('./node_modules/$1/package.json').version}catch(e){''}"
}

fetch() {
    name="$1"     # e.g. @rollup/rollup-linux-x64-musl
    version="$2"
    dest="node_modules/$name"
    base=$(basename "$name")

    if [ -z "$version" ]; then
        echo "  skip $name (parent not installed)"
        return 0
    fi
    if [ -d "$dest" ]; then
        echo "  have $name@$version"
        return 0
    fi

    url="https://registry.npmjs.org/$name/-/$base-$version.tgz"
    echo "  GET $url"
    if ! wget -q -T 180 -O /tmp/pkg.tgz "$url"; then
        echo "  FAILED to download $name@$version"
        return 1
    fi
    mkdir -p "$dest"
    tar xzf /tmp/pkg.tgz -C "$dest" --strip-components=1
    echo "  installed $name@$version"
}

ROLLUP=$(pkg_version rollup)
ESBUILD=$(pkg_version esbuild)
SHARP=$(pkg_version sharp)

echo "rollup=$ROLLUP esbuild=$ESBUILD sharp=$SHARP"

fetch "@rollup/rollup-linux-x64-musl" "$ROLLUP"
fetch "@esbuild/linux-x64" "$ESBUILD"

# sharp is optional: Astro only needs it for image transforms, and a build that
# does not transform images runs without it.
fetch "@img/sharp-linux-x64" "$SHARP" || echo "  sharp binary unavailable, continuing"

echo "native binaries ready"
