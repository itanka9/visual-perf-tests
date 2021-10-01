#!/bin/bash -e
npm run build
git commit -m "dist"
git subtree push --prefix dist origin gh-pages

