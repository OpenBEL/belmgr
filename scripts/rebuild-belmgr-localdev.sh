#!/usr/bin/env bash
set -e  # exit on any errors

cd ../plugin
gulp build

cd ../webeditor
gulp watch
