<?php

namespace Engine\Http\Middleware;

use Engine\Http\Request;
use Engine\Http\Response;
use Engine\Http\StatusCodes;

/**
 *
 * @package Engine\Http\Middleware
 */
class Cron
{
    /**
     * @param Request $req Request class which is manage the requests to server
     * @param Response $res Response class which is manage the response to client
     * @param \Closure $next The functionality which need to execute if middleware is correct
     */
    public static function check(Request $req, Response $res, \Closure $next)
    {
        $next();
    }
}