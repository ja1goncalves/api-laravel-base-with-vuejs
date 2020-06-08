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
});
Route::middleware('auth:api')->delete('/user/logout', function (Request $request) {
    return $request->user()->token()->revoke();
});

Route::group(['prefix' => 'users', 'middleware' => ['auth:api']], function () {
    Route::resource('/', 'UsersController', ['only' => ['store', 'index']]);
    Route::put('/{id}', 'UsersController@update')->name('update');
    Route::get('/{id}', 'UsersController@show')->name('show');
    Route::delete('/{id}', 'UsersController@delete')->name('delete');
});

Route::group(['prefix' => 'categories', 'middleware' => ['auth:api']], function () {
    Route::resource('/', 'CategoriesController', ['only' => ['store', 'index']]);
    Route::put('/{id}', 'CategoriesController@update')->name('update');
    Route::get('/{id}', 'CategoriesController@show')->name('show');
    Route::delete('/{id}', 'CategoriesController@delete')->name('delete');
});
