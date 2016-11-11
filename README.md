# atlas_webapp
atlas' web interface

Here is a list of things to be careful about when deploying flask apps to apache server

* The mod wsgi needs to be properly installed on the server. Check mods-enabled folder.
* Deployment tutorial https://www.digitalocean.com/community/tutorials/how-to-deploy-a-flask-application-on-an-ubuntu-vps
* Server setup tutorial https://www.digitalocean.com/community/tutorials/how-to-install-linux-apache-mysql-php-lamp-stack-on-ubuntu-16-04
* a2ensite creates symlink in site-enabled folder
* Disable default page using a2dissite 000-default (I think this step is important)
* Add hosts names into /etc/hosts. For example, if I want to access my app on http://flaskapp.dev/, then flaskapp.dev needs to be listed in /etc/hosts
