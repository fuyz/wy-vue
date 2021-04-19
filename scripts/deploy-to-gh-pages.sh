# deploy-to-gh-pages.sh
#! /bin/bash

rm -rf dist
npm run build

cd dist
git init
git config --global user.email "953958160@qq.com"
git config --global user.name "fuyz"
git add .
git commit -m 'Travis build'
git push --force --quiet "https://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@github.com/fuyz/wy-vue.git" master:gh-pages

