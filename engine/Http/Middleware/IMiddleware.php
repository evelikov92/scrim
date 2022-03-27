<?php

namespace Engine\Http\Middleware;

use Engine\Http\Response;
use Engine\Http\Request;

/**
 * That Interface is to help to create some middleware with default method
 * @package Engine\Http\Middleware
 */
interface IMiddleware
{
    /**
     * Default method for any middleware.
     * Will check do is correct the requirements and will continue or will stop.
     * @param Request $req Request class which is manage the requests to server
     * @param Response $res Response class which is manage the response to client
     * @param \Closure $next The functionality which need to execute if middleware is correct
     */
    public static function check(Request $req, Response $res, \Closure $next);
}
