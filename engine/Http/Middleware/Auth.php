<?php

namespace Engine\Http\Middleware;

use Engine\Globalization\Language;
use Engine\Http\Request;
use Engine\Http\Response;
use Engine\Http\StatusCodes;

/**
 * Middleware which check do the request is send from authenticated user or not
 * @package Engine\Middleware
 */
class Auth
{
    /**
     * Middleware which check do user is not authenticated on the system
     * @param Request $req Request class which is manage the requests to server
     * @param Response $res Response class which is manage the response to client
     * @param \Closure $next The functionality which need to execute if middleware is correct
     */
    public static function guest(Request $req, Response $res, $next)
    {
        if (!empty($req->user())) {
            $res->statusCode(StatusCodes::$_SERVICE_UNAVAILABLE)
                ->json([ 'message' => Language::getLanguageResource()['data_for_guests'] ])
                ->send();
        }

        $next();
    }

    /**
     * Middleware which check do user is authenticated on the system
     * @param Request $req Request class which is manage the requests to server
     * @param Response $res Response class which is manage the response to client
     * @param \Closure $next The functionality which need to execute if middleware is correct
     */
    public static function login(Request $req, Response $res, $next)
    {
        if (empty($req->user())) {
            $res->statusCode(StatusCodes::$_UNAUTHORIZED)
                ->json([ 'message' => Language::getLanguageResource()['data_for_users'] ])
                ->send();
        }

        $next();
    }
}
