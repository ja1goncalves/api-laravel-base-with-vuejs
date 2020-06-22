<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
})->name('auth.show');
Route::middleware('auth:api')->delete('/user/logout', function (Request $request) {
    return $request->user()->token()->revoke();
})->name('auth.delete');

Route::group(['prefix' => 'users', 'middleware' => ['auth:api', 'acl']], function () {
    Route::resource('/', 'UsersController', ['only' => ['store', 'index']])->names('users');
    Route::put('/{id}', 'UsersController@update')->name('users.update');
    Route::get('/{id}', 'UsersController@show')->name('users.show');
    Route::delete('/{id}', 'UsersController@delete')->name('users.delete');
    Route::get('/update-user-module/{id}', 'UsersController@updateUserModule')->name('users_modules.update');
    Route::get('/update-user-module-action/{id}', 'UsersController@updateUserModuleAction')->name('users_modules_actions.update');
});

Route::group(['prefix' => 'categories', 'middleware' => ['auth:api', 'acl']], function () {
    Route::resource('/', 'CategoriesController', ['only' => ['store', 'index']])->names('categories');
    Route::put('/{id}', 'CategoriesController@update')->name('categories.update');
    Route::get('/{id}', 'CategoriesController@show')->name('categories.show');
    Route::delete('/{id}', 'CategoriesController@delete')->name('categories.delete');
});

Route::group(['prefix' => 'modules', 'middleware' => ['auth:api', 'acl']], function () {
    Route::resource('/', 'ModulesController', ['only' => ['store', 'index']])->names('modules');
    Route::put('/{id}', 'ModulesController@update')->name('modules.update');
    Route::get('/{id}', 'ModulesController@show')->name('modules.show');
    Route::delete('/{id}', 'ModulesController@delete')->name('modules.delete');
});
