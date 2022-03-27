<?php

namespace Engine\Http\Middleware;

use Engine\Http\Request;
use Engine\Http\Response;
use Engine\Http\StatusCodes;

/**
 * Middleware which check do the Request is API
 * @package Engine\Http\Middleware
 */
class Api implements IMiddleware
{
    /**
     * Check do request is come from AJAX request. Route request is make with AJAX request
     * @param Request $req Request class which is manage the requests to server
     * @param Response $res Response class which is manage the response to client
     * @param \Closure $next The functionality which need to execute if middleware is correct
     */
    public static function check(Request $req, Response $res, \Closure $next)
    {
        if ($req->server('HTTP_X_REQUESTED_WITH') === 'XMLHttpRequest') {
            $next();
        } else {
            $res->statusCode(StatusCodes::$_BAD_REQUEST)
                ->json([ 'message' => 'API not correct' ])
                ->send();
        }
    }
}
