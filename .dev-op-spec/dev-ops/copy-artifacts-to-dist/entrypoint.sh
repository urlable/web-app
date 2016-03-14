#!/bin/sh

# clean
rm -rf dist

# copy images
mkdir -p dist/images
cp -rf images/* dist/images

# copy systemjs*
mkdir -p dist/jspm_packages
cp jspm_packages/* dist/jspm_packages

cp ./common.css ./index.html ./jspm-config.js dist/
