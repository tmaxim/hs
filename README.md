# HS

### Install gulp and Bower

Install latest version of npm: `npm install -g npm@latest`

1. `npm install -g gulp bower`
Error: EACCES, mkdir
  1. `sudo chown -R 'whoami' ~/.npm`
  2. `sudo chown -R 'whoami' /usr/lib/node_modules`
Error: EACCES, symlink
  1. `sudo npm install -g gulp bower`
2. `npm install`
3. `bower install`
`sudo bower install --allow-root`

Virtual filesystem running in Vagrant on top of the Windows filesystem doesn't support symbolic links. `npm install package-name --no-bin-links`

### Gulp commands

* `gulp watch`
* `gulp build`

## Forms

http://www.jotform.com/ - Paid
http://www.123contactform.com/ - Paid
https://www.formstack.com/ - Paid

http://formspree.io/ - Free

https://formkeep.com/ - Paid

http://pooleapp.com/ - Free

https://getsimpleform.com/ - Free

## Forms + Emails
https://github.com/ousenko/simple-contact-form - Mandrill + Heroku
https://coderwall.com/p/8lq1ba/how-to-create-a-contact-form-for-a-github-pages-served-jekyll-website

## Emails
http://mailgun.com


## Digital Ocean
shipitfast
droplet10
