<?php

use Engine\Config;
use Engine\Routes\Route;
use Engine\Http\Response;
use Engine\Http\StatusCodes;
use Engine\Globalization\Language;
use Engine\Environment;

$route = Route::getInstance();

$route->all([ 'prefix' => '/*', 'except' => [ '/api/*', '/cron/*' ] ], function () {
    Response::getInstance()
        ->statusCode(StatusCodes::$_OK)
        ->page(Config::getInstance()->get('app', 'public_folder') . 'index.html')
        ->send();
});

$route->prefix = '/api';

/**
 * ROUTES ABOUT DEFAULT PAGES ***************************
 */
$route->get('/get-language', function () {
    Response::getInstance()
        ->statusCode(StatusCodes::$_OK)
        ->json([ 'lang' => Language::getLanguage() ])
        ->send();
}, [ 'api' ]);
$route->get('/get-resources', 'LanguageController@getResources', [ 'api' ]);
$route->post('/set-language', 'LanguageController@setUserLanguage', [ 'api' ]);


/**
 * ROUTES ABOUT ACCOUNT ***************************
 */
$route->post('/account/check-username-exist', 'AccountController@checkUsername', [ 'api' ]);
$route->post('/account/check-email-exist', 'AccountController@checkEmail', [ 'api' ]);
$route->get('/account/get-logged-user', 'AccountController@isLogin', [ 'api' ]);
$route->post('/account/login', 'AccountController@login', [ 'api' ]);
$route->post('/account/logout', 'AccountController@logout', [ 'api' ]);
$route->post('/account/registration', 'AccountController@registration', [ 'api', 'role:isAdmin' ]);
$route->post('/account/set-password/[token]', 'AccountController@setPassword', [ 'api' ]);
$route->post('/account/forgot-password', 'AccountController@forgotPassword', [ 'api', 'captcha' ]);
$route->get('/account/activate/[token]', 'AccountController@activateAccount', [ 'api' ]);
