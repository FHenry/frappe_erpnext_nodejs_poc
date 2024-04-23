### POC To use frappe-js-dsk
This is just a proof of concept for local dev hosting 

use node JS and dependencies from https://github.com/scopen-coop/frappe-docker-files/blob/main/frappe15/docker-compose-node.yml

use modified node module frappe-js-sdk from https://github.com/The-Commit-Company/frappe-js-sdk on MIT LICENSE
changes are done in 
    - node_modules/frappe-js-sdk/lib/frappe_app/index.js
    - node_modules/frappe-js-sdk/lib/utils/axios.js

to send Host as HTTP Header parameters, because when Frappe in on local dev docker on multitenant, node container needs 
to explicitly inform what is the designated ERPNext instance 

### Usage
make sure your in index.jsn in FrappeApp constructor the token and host parameters match you current local ERPNext setup

Run the https://github.com/scopen-coop/frappe-docker-files/blob/main/frappe15/docker-compose-node.yml compose file
connect to frappe15-nodejs container and exec 
```
node index.js
```
then in browser http://0.0.0.0:8888/

### License

GNU/General Public License (see [license.txt](license.txt))

This project is licensed as GNU General Public License (v3).

By contributing to this project, you agree that your contributions will be licensed under its GNU General Public License (v3).
