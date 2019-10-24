<?php

use Illuminate\Http\Request;

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

Route::post('register', 'JWTAuthController@register')
    ->name('api.jwt.register');

Route::post('login', 'JWTAuthController@login')
    ->name('api.jwt.login');

Route::group(['middleware' => 'auth:api'], function () {
    Route::get('user', 'JWTAuthController@user')
    ->name('api.jwt.user');
    
    Route::post('logout', 'JWTAuthController@logout')
    ->name('api.jwt.logout');
});