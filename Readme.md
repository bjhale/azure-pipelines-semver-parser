# Azure Pipelines Semver Parser (ado-semver)

This is a simple node script to convert version strings into usable pipeline variables. This is useful for converting 
git tags into usable pipeline variables.

This utility follows the Semantic Versioning 2.0.0 specification at https://semver.org/ with the addition of a leading 
"v" character and an additional 'tag' class.

"v" \<version core\> "-" \<pre-release\> "+" \<build metadata\> "@" \<tag\>

## Usage:

```
ado-semver <versionstring>

parses a version string writing its components to console using ADO logging
commands.

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]

```

## Example:

```
$ ado-semver 1.0.5                                     
###vso[task.setvariable variable=semver_major]1
###vso[task.setvariable variable=semver_minor]0
###vso[task.setvariable variable=semver_patch]5
###vso[task.setvariable variable=semver_prerelease]false
###vso[task.setvariable variable=semver_buildmetadata]false
###vso[task.setvariable variable=semver_tag]false
###vso[task.setvariable variable=semver_core]1.0.5

$ ado-semver v1.2.2-alpha3.2-3+build20201023@dev-master
###vso[task.setvariable variable=semver_major]1
###vso[task.setvariable variable=semver_minor]2
###vso[task.setvariable variable=semver_patch]2
###vso[task.setvariable variable=semver_prerelease]alpha3.2-3
###vso[task.setvariable variable=semver_buildmetadata]build20201023
###vso[task.setvariable variable=semver_tag]dev-master
###vso[task.setvariable variable=semver_core]1.2.2
```