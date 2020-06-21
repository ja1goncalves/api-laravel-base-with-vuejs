<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        $this->app->bind(\App\Repositories\UserRepository::class, \App\Repositories\UserRepositoryEloquent::class);
        $this->app->bind(\App\Repositories\CategoriesRepository::class, \App\Repositories\CategoriesRepositoryEloquent::class);
        $this->app->bind(\App\Repositories\ModulesRepository::class, \App\Repositories\ModulesRepositoryEloquent::class);
        $this->app->bind(\App\Repositories\UsersModulesRepository::class, \App\Repositories\UsersModulesRepositoryEloquent::class);
        $this->app->bind(\App\Repositories\UsersModulesActionsRepository::class, \App\Repositories\UsersModulesActionsRepositoryEloquent::class);
        //:end-bindings:
    }
}
