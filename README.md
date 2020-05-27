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

### Server is already
<pre>
php artisan serve
</pre>


---

####Passo a passo para criação de um novo módulo.

- Para criar uma nova rota [Clique aqui](resources/js/src/router.js)
- Se desejar criar um menu [Clique aqui](resources/js/src/layouts/components/vertical-nav-menu/navMenuItems.js)
