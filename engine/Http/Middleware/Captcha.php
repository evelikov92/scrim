<?php

namespace Engine\Http\Middleware;

use Engine\Globalization\Language;
use Engine\Http\Request;
use Engine\Http\Response;
use Engine\Http\StatusCodes;

/***
 * Middleware which check the Captcha send from browser is correct
 * @package Engine\Http\Middleware
 */
class Captcha implements IMiddleware
{
    /**
     * Middleware which check the Captcha send from browser is correct
     * @param Request $req Request class which is manage the requests to server
     * @param Response $res Response class which is manage the response to client
     * @param \Closure $next The functionality which need to execute if middleware is correct
     */
    public static function check(Request $req, Response $res, \Closure $next)
    {
        $user = $req->user();

        // Check do user is login. If is login Captcha is not required.
        if (!empty($user) && isset($user['group']) &&
            ($user['group'] == 2 || $user['group'] == 1 || $user['group'] == 3 || $user['group'] == 4)) {
            $next();
        } else {
            $captcha = $req->inputParam('recaptcha', 'text|required|xss');
            if (\Engine\Security\Captcha::check($captcha, $req->ip())) {
                $next();
            } else {
                $res->statusCode(StatusCodes::$_NOT_ACCEPTABLE)
                    ->json([ 'message' => Language::getLanguageResource()['captcha_not_correct'] ])
                    ->send();
            }
        }
    }
}
