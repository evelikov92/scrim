<?php

namespace Engine\Http\Middleware;

use Engine\Http\Request;
use Engine\Http\Response;
use Engine\Http\StatusCodes;

/**
 * Middleware which is checked for CSRF Token is existed on header
 */
class Csrf implements IMiddleware
{
    /**
     * Middleware which is check do have csrf token on header
     * @param Request $req Request class which is manage the requests to server
     * @param Response $res Response class which is manage the response to client
     * @param \Closure $next The functionality which need to execute if middleware is correct
     */
    public static function check(Request $req, Response $res, \Closure $next)
    {
        if (\OldEngine\Security\Csrf::verify($req->header('x_csrf_token_id'), $req->header('x_csrf_token_val'))) {
            $next();
        } else {
            $res->statusCode(StatusCodes::BAD_REQUEST)
                ->json([ 'message' => 'CSRF Not correct' ])
                ->send();
        }
    }
}
