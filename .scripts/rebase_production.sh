#!/bin/bash
# FOR PROJECT MAINTAINERS ONLY

set -e
# Update branches
git fetch origin
git checkout solutions
git pull

# Check solutions branch is up to date
tags=("step2", "step3", "step4", "helpers", "step5", "step6", "step7", "step8", "step9", "step10", "step11", "_solutions_")
number_of_commits=$(git log --oneline solutions ^origin/start-branch | wc -l)
if [ "$commit_diff" -ne ${#tags[@]} ]; then
    echo "The number of commits between start-branch and solutions is not correct, please update the branches or the script"
    exit 2
fi

git checkout production
# Rebase on solutions on start-branch
git rebase solutions

# Check tests pass
CI=true yarn test

echo ""
echo "================================================================="
echo "Rebase of production branch done, please push changes:           "
echo "git push --force-with-lease                                      "
echo "You may allow force push on the repo settings                    "
echo "================================================================="
