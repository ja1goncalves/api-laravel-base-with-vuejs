<p align="center"><img src="https://res.cloudinary.com/dtfbvvkyp/image/upload/v1566331377/laravel-logolockup-cmyk-red.svg" width="400"></p>

<p align="center">
<a href="https://travis-ci.org/laravel/framework"><img src="https://travis-ci.org/laravel/framework.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/d/total.svg" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/v/stable.svg" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/license.svg" alt="License"></a>
</p>

## Dev Settings / Installation

- [Composer](https://getcomposer.org/)
- [NPM](https://docs.npmjs.com/cli/install)
- PHP 7.2.5 +
- Node 8.0 +

## After install dependencies
    Composer install
    npm i or npm install

## Setup your database
You must create a <code>.env</code> file in your root directory to set up an important environment variables

Some like that:
<pre>
# /path/clone-repository/.env.example
</pre>

##### Artisan Generate Key
<pre>
php artisan key:generate
</pre>

### Setup [Passport](https://laravel.com/docs/7.x/passport#introduction) Auth
    php artisan migrate
    php artisan passport:install
    
### Server is already
To build server is necessary run npm first and you that choice the way (for more information access: [Vuexy](https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/documentation/development/laravelIntegration.html#installation)) :

#### Watching for changes
Running `npm run dev` every time you make changes to file is inefficient. Hopefully there's command so your changes can be watched and get reflected accordingly.  
<pre>
npm run watch
</pre>
#### Building for Production
If you want to run the project and make the build in the production mode then run the following command in the root directory, otherwise the project will continue to run in the development mode.
<pre>
npm run prod
</pre>
Then, you run:
<pre>
php artisan serve
</pre>

#### Required Permissions
If you are facing any issues regarding the permissions, then you need to run the following command in your project directory:
<pre>
sudo chmod -R o+rw bootstrap/cache
sudo chmod -R o+rw storage
</pre>


---

####Passo a passo para criação de um novo módulo.
- Arquitetura l5-repositoy: [Clique aqui](https://github.com/andersao/l5-repository)
- Para criar uma nova rota [Clique aqui](resources/js/src/router.js)
- Se desejar criar um menu [Clique aqui](resources/js/src/layouts/components/vertical-nav-menu/navMenuItems.js)
