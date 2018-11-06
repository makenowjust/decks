# maidfile

## dev

Start development server.

```bash
set -ex
gatsby develop --open "$@"
```

## build

Build with using [Gatsby](https://gatsbyjs.org).

```bash
set -ex
gatsby build "$@"
```

## lint

Run linter for source codes.

When `--fix` option is given, linters try to fix errors automatically.

```bash
if [[ $1 == --fix ]]; then
  prettier_opt=--write
else
  prettier_opt=--list-different
fi
set -ex
prettier-package-json 'package.json' 'plugins/*/package.json' $prettier_opt
prettier --ignore-path .gitignore '**/*.{js,json,md,yml}' $prettier_opt
```
