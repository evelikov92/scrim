<?php

namespace Engine\Http\Middleware;

use Closure;
use Engine\Http\Request;
use Engine\Http\Response;

/**
 * That Class middleware which is set for the route.
 * Before go to the Controller/Closure on the route first is come here (if need) to check do user has right to go to continue
 * @package OldEngine\Http\Middleware
 */
class Middleware
{
    /**
     * Execute all middleware which is set for specific route
     * @param array $list List of middleware which will check before execute the functionality
     * @param Closure $next The functionality which need to execute if middleware is correct
     */
    public static function execute(array $list, Closure $next)
    {
        $i = count($list);
        while ($i--) {
            $actions = explode(':', $list[$i]);
            $class = ucfirst($actions[0]);

            if (file_exists(__DIR__ . DIRECTORY_SEPARATOR)) {
                $middleware = '\Engine\Http\Middleware\\' . $class;
            } else {
                $middleware = '\App\Middleware\\' . $class;
            }

            // Set the function arguments on the middleware
            $vars = [ Request::getInstance(), Response::getInstance(), function () { } ];

            if (count($actions) === 1) {
                // Is need to execute check function
                call_user_func_array($middleware . '::check', $vars);
            } else {
                // Is need to execute whatever function is
                call_user_func_array($middleware . '::' . $actions[1], $vars);
            }
        }

        $next();
    }
}
