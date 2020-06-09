---
title:  "Git with Open-Source"
date:   2019-02-24 18:00:00
categories: [Tech]
tags: [Open-Source]
---
Here in this blog, I will be giving an overview of using the **git version control system** while contributing to *open-source projects*.

### Forking and Cloning a repo into your local system

Initially, choose an open-source project on the domain of your interest for which you would like to contribute. Let the project repository be “*project-repo*“.

Go to the project-repo site in GitHub. Click the <ins>**Fork**</ins> button which is located in the top right corner. This action forks the project to your GitHub account. Let’s call it the “*account-repo*“.

Now direct to a folder in your machine where you want to clone the repo. Open the terminal in that folder. Now before going to next step make sure there is git installed in your machine. If not you can download it from [this][git-download] link.

`$ git clone https://github.com/<username>/<project-name>.git`

Use this command to clone the project in your local machine. Here *username* is your GitHub handle and project-name is the project you are going to contribute.

Let this repo be “*local-repo*“.

`$ cd <project-name>`

Now you have a link between *local-repo* and *account-repo* as “**origin**“. You also need to add the *project-repo*. You can do by the following command.

`$ git remote add upstream https://github.com/<company-name>/<project-name>.git`

Here *company-name* is the handle of the *project-repo* and *project-name* is the name of the project.

This you have a link between local-repo and project-repo as “<ins>upstream</ins>“.

You can check the remote repo’s of your *local-repo* by

`$ git remote -v`

Now you can pull the updated project of the *project-repo* into your *local-repo*.

`$ git pull upstream <branch> --rebase`

Here *branch* is the branch name you want to pull. It will be “development” for most of the Open-Source projects. And now you can push the changes from local-repo to account-repo.

`$ git push origin <branch>`

This can be done every time you start working for the day. And make sure you are in the proper branch while you do this. You can check your branch by

`$ git branch`

Now you have all set for working on the project without any issues.

### Working on the project

You find some issue and want to work on it. So, the first thing you do is create a new branch for working on the issue. You can create a new branch by

`$ git branch <new-branch-name>`

Here *new-branch-name* can be anything you give name related to the issue.

After creating a new branch you should check out to that branch to work on the issue. It can be done by

`$ git checkout <branch-name>`

Here *branch-name* is the name of the branch which you want to work on.

While you are working you can save your changes so if it is disturbed by any mistake then you can get it back. You can save like

`$ git add -A`

or

`$ git add <file-name>`

Here you are staging the files you change. The changes can be looked at by

`$ git status`

Now you can directly commit if you feel this is what to be saved by using

`$ git commit -m "<commit-message>"`

Here *commit-message* can be related to what you’ve worked on.

After this process when you want to push the changes to *account-repo* then

`$ git push -u origin <branch-name>`

if the branch is <ins>not present</ins> in your *account-repo*

or

`$ git push origin <branch-name>`

if the branch is <ins>present</ins> in your *account-repo*

Now you can check your updated *account-repo* and send a PR for the issue you worked on.

### Playing with git

You can check your commits in a particular branch by

`$ git log`

You can add “*–oneline*” to the command if you want the commits in one line.

You can add “*–all*” to the command if you want to see all the commits.

You can add “*–graph*” to the command to see the commits in a graph style.

`$ git log --oneling --all --graph`

<br/><br/> 
If you have some changes and want to add to the previous commit or change the commit message of the previous commit. Then you have to stage the changes then

`$ git commit --amend`

<br/><br/>
You can check all your recent activities by using

`$ git reflog`

<br/><br/>
You can revert your work to a specific commit and work again by using

`$ git revert <some-commit>`

Here *some-commit* is the name of the commit you want to go back or if you want to use the position you can use “<ins>HEAD~&lt;position&gt;</ins>” replace the <position>  with the point where you want to go back.

<br/><br/>
You can even delete your commit or any activity by referring to the history of what you did.

`$ git reset <type> <some-commit>`

Here type can be “*–hard*” or “*–soft*” based on you want to completely change the working tree or want to keep it as it is.

<br/><br/>
You can show the same changes of your local-repo into your account-repo even if it is completely different by force pushing

`$ git push -f origin <branch-name>`

<br/><br/>
If you want to squash some commits into one then one of the ways which you can use is

`$ git rebase -i <some-commit>`

Then you can choose which commit to <ins>squash</ins> and which to <ins>pick</ins> and finally can edit the commit message.

<br/><br/>
There are even many more things you can learn about “**git**“. You can go through [this][git-link] link.

[git-download]: https://git-scm.com/downloads
[git-link]:     https://git-scm.com/docs/