#!/bin/bash
# FOR PROJECT MAINTAINERS ONLY

set -e
# Update branches
git checkout start-branch 
git pull
git checkout solutions
# Rebase on solutions on start-branch
git rebase start-branch

# Check number of commits
tags=("step2" "step3" "step4" "helpers" "step5" "step6" "step7" "step8" "step9" "step10" "step11" "_solution_")
number_of_commits=$(git log --oneline solutions ^start-branch | wc -l)
if [ "$commit_diff" -ne ${#tags[@]} ]; then
    echo "The number of commits between start-branch and solutions is not correct, please update the branches or the script"
    exit 2
fi

# Check tests pass
CI=true yarn test || exit 3

# Rebase interactively to re-apply tags 
GIT_SEQUENCE_EDITOR="sed -i 's/^pick/edit/g'" git rebase -i start-branch

# Apply tags to commits
for tag in "${tags[@]}"
do
    echo "Tagging $tag"
    git tag -f $tag
    git rebase --continue
done

echo ""
echo "======================================================"
echo "Rebase done, please push changes:                     "
echo "git push --force-with-lease && git push --force --tags"
echo "You may allow force push on the repo settings         "
echo "======================================================"
