- [Teste](#teste)

# About
A simple multifolder git cli, call git-s or gits

# Commands

### Default
Run every git command on all subfolders with .git 

Options:
-m or --multi: If the folder has multirepo
-d or --deep: Maximum depth of folders

try:
```Bash
git-s pull
git-s pull -m
git-s pull -d 3
```

### Reset-to Command: 
Run git reset --hard, git checkout branch, and git pull commands on all subfolders with .git

Options:
-m or --multi: If the folder has multirepo
-d or --deep: Maximum depth of folders

try:
```Bash
git-s reset-to develop
git-s reset-to develop -m
git-s reset-to develop -d 3
```