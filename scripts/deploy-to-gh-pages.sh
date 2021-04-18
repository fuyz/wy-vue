# deploy-to-gh-pages.sh
#! /bin/bash

rm -rf dist
npm run build

cd dist
git init
git add .
git commit -m 'Travis build'
git push --force --quiet "https://${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}@github.com/fuyz/wy-vue.git" master:gh-pages

