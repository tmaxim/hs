# HS

### Install gulp and Bower

Install latest version of npm: `npm install -g npm@latest`

1. `npm install -g gulp bower`
Error: EACCES, mkdir
  1. `sudo chown -R 'whoami' ~/.npm`
  2. `sudo chown -R 'whoami' /usr/lib/node_modules`
Error: EACCES, symlink
  1. `sudo npm install -g --verbose gulp bower` (--verbose?)
2. `npm install`
3. `bower install`

### Gulp commands

* `gulp watch`
* `gulp build`

