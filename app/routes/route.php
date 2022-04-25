<?php

use Engine\Routes\Route;

$route = Route::getInstance();

$route->all([ 'prefix' => '/*', 'except' => [ '/api/*', '/cron/*' ] ], 'HomeController@index');

$route->prefix = '/api';

$route->get('/get-language', 'HomeController@getUserLanguage', [ 'api' ]);
$route->post('/set-language', 'HomeController@setUserLanguage', [ 'api' ]);
$route->get('/get-resources', 'HomeController@getLanguageResources', [ 'api' ]);

/**
 * ROUTES ABOUT ACCOUNT ***************************
 */
$route->post('/account/check-username-exist', 'AccountController@checkUsername', [ 'api' ]);
$route->post('/account/check-email-exist', 'AccountController@checkEmail', [ 'api' ]);
$route->get('/account/get-logged-user', 'AccountController@isLogin', [ 'api' ]);
$route->post('/account/login', 'AccountController@login', [ 'api' ]);
$route->post('/account/logout', 'AccountController@logout', [ 'api' ]);
$route->post('/account/registration', 'AccountController@registration', [ 'api' ]);
$route->post('/account/set-password/[token]', 'AccountController@setPassword', [ 'api' ]);
$route->post('/account/forgot-password', 'AccountController@forgotPassword', [ 'api' ]);
$route->get('/account/activate/[token]', 'AccountController@activateAccount', [ 'api' ]);
