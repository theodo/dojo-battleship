#!/bin/bash
set -e
# Inspired from https://dev.to/the_one/deploy-to-github-pages-like-a-pro-with-github-actions-4hdg
# Save current branch
current_branch=$(git branch --show-current)
# Checkout to Github Pages branch
git checkout --orphan gh-pages
# Build the app
yarn build --base /dojo-battleship/

# Commit build files and push to gh-pages branch
git --work-tree dist add --all
git --work-tree dist commit -m 'Deploy'
git push origin HEAD:gh-pages --force

# Clean up
rm -r dist
git checkout -f $current_branch
git branch -D gh-pages