# gh cp

A GitHub CLI extension to copy a file from a GitHub repository locally without cloning the repository.

## Instalation

```
gh extension install  ULL-MII-SYTWS-2122/gh-cp 
```

##  Usage

```
Usage: gh cp <repo> <route> <dest>

Options:
    -v --version        output the version number
    -h --help           display help for command
```
* All arguments are required


## Example

```sh
$ gh cp ULL-MII-SYTWS-2122/gh-cp test/test_file.txt .

$ cat test_file.txt
This is just a text file
```