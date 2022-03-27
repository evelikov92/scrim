<?php

namespace Engine\Routes;

use Engine\Common;
use Engine\ErrorHandler\ErrorHandler;
use Engine\ErrorHandler\Production\UserException;
use Engine\Http\Middleware\Middleware;
use Engine\Http\StatusCodes;

/**
 * That Class is manage the all routes and urls of the application.
 * He decide what functionality need to execute
 * @package Engine\Routes
 */
class Route
{
    /**
     * Instance of the Route class
     * @var \Engine\Routes\Route
     */
    private static $_instance = null;

    /**
     * All Parameters which exist on route|url
     * @var array
     */
    private $_params = [];

    /**
     * Request method on lower case
     * @var string
     */
    public $requestMethod = null;

    /**
     * Request url for execution
     * @var string
     */
    public $url = null;

    /**
     * TODO is not implemented
     * Set default middleware for any route
     * @var array
     */
    public $middleware = [];

    /**
     * Set prefix for routes folder, how every url will start
     * @var string
     */
    public $prefix = '';

    private function __construct() { }

    /**
     * Run the Routing on application
     * Get the url and execute the correct action
     */
    public final function run()
    {
        $this->requestMethod = self::getRequestMethod();
        $this->url = self::getUrl();
        if ($this->requestMethod === 'options') {
            exit();
        }

        /**
         * 1) Include the route files
         * 2) Execute any route on the files while is not found the correct route
         * 3) When is found it will execute the developer code:
         * 4) It will execute Middleware (if has someone)
         * 5) It will execute Action. Doesn't matter do is \Closure or is Controller@Action string
         * 4) After that it will exit(1) for to not execute another routes
         */

        // Get the routes static files
        $files = glob(Common::$_MAIN_FOLDER . 'app/routes/*.php');
        foreach ($files as $file) {
            if (file_exists($file) && is_readable($file)) {
                include_once $file;
            } else {
                new ErrorHandler(
                    StatusCodes::$_INTERNAL_SERVER_ERROR,
                    'The Route file is not readable'
                );
            }
        }

        // If is not found the correct route.
        UserException::addExceptions(StatusCodes::$_NOT_FOUND, 'Page not found', 'page');
    }

    /**
     * Group few routes on one with same prefix
     * @param string $prefix Start the url
     * @param array $routes All routes which include on that group
     * @param array $middleware Middleware of the group
     */
    public final function group($prefix, $routes, $middleware = [])
    {
        if (!empty($routes) || !is_array($routes)) {
            new ErrorHandler(
                StatusCodes::$_INTERNAL_SERVER_ERROR,
                'The Routes is required array!'
            );
        }

        $i = count($routes);
        while ($i--) {
            if (!$routes[$i]['method'] || !$routes[$i]['url'] || !$routes[$i]['action']) {
                new ErrorHandler(
                    StatusCodes::$_INTERNAL_SERVER_ERROR,
                    'The Route parameters is not matched. Need to have method/url/action attributes.'
                );
            }

            // Add individual middleware before group middleware
            $url = $prefix . $routes[$i]['url'];
            if (is_array($routes[$i]['middleware']) && !empty($routes[$i]['middleware'])) {
                // Execute the route method get/post/put immediately
                $this->{strtolower($routes[$i]['method'])}($url, $routes[$i]['action'], array_merge($routes[$i]['middleware'], $middleware));
            } else {
                // Execute the route method get/post/put immediately
                $this->{strtolower($routes[$i]['method'])}($url, $routes[$i]['action'], $middleware);
            }
        }
    }

    /**
     * Execute Route which include all urls and is have option to except some routes
     * @param array $conditions Prefix and Except on url
     * @param string|\Closure $action Action of the all routes
     * @param array|null $middleware Middleware of the routes
     */
    public final function all($conditions, $action, $middleware = [])
    {
        if (!isset($conditions['prefix']) || !isset($conditions['except'])) {
            new ErrorHandler(
                StatusCodes::$_INTERNAL_SERVER_ERROR,
                'The $condition need to have prefix, except keys'
            );
        }

        $prefix = $conditions['prefix'];
        $excepts = $conditions['except'];

        if (!$prefix || !is_string($prefix) || $prefix[strlen($prefix) - 1] !== '*') {
            new ErrorHandler(
                StatusCodes::$_INTERNAL_SERVER_ERROR,
                'The correct way is to finish prefix for all is with *'
            );
        }

        $prefix = $this->prefix . rtrim($prefix, '*');

        if (is_array($excepts)) {
            $i = count($excepts);
            while ($i--) {
                if ($this->_checkExceptRoute($excepts[$i])) {
                    return;
                }
            }
        } else if (is_string($excepts) && $this->_checkExceptRoute($excepts)) {
            return;
        }

        // url - /warranty/active
        // prefix - /warranty
        // Check do the route prefix is almost the same as the REQUEST_URL
        if ($prefix !== '/' && substr($this->url, 0, strlen($prefix)) !== $prefix) {
            return;
        }

        $this->runRouteLogic($action, $middleware);
    }

    /**
     * GET Route Url
     * @param string $url The url prefix on the route
     * @param string|\Closure $action Action for execution of the route
     * @param array|null $middleware Middleware of the route
     */
    public final function get($url, $action, $middleware = [])
	{
	    if ($this->requestMethod === 'get') {
            $this->_executeRoute($this->prefix . $url, $action, $middleware);
        }
	}

    /**
     * POST Route Url
     * @param string $url The url prefix on the route
     * @param string|\Closure $action Action for execution of the route
     * @param array|null $middleware Middleware of the route
     */
	public final function post($url, $action, $middleware = [])
	{
	    if ($this->requestMethod === 'post') {
	        $this->_executeRoute($this->prefix . $url, $action, $middleware);
        }
	}

    /**
     * PUT Route Url
     * @param string $url The url prefix on the route
     * @param string|\Closure $action Action for execution of the route
     * @param array|null $middleware Middleware of the route
     */
	public final function put($url, $action, $middleware = [])
	{
	    if ($this->requestMethod === 'put') {
            $this->_executeRoute($this->prefix . $url, $action, $middleware);
        }
	}

    /**
     * DELETE Route Url
     * @param string $url The url prefix on the route
     * @param string|\Closure $action Action for execution of the route
     * @param array|null $middleware Middleware of the route
     */
	public final function delete($url, $action, $middleware = [])
	{
	    if ($this->requestMethod === 'delete') {
            $this->_executeRoute($this->prefix . $url, $action, $middleware);
        }
	}

    /**
     * PATCH Route Url
     * @param string $url The url prefix on the route
     * @param string|\Closure $action Action for execution of the route
     * @param array|null $middleware Middleware of the route
     */
	public final function patch($url, $action, $middleware = [])
    {
        if ($this->requestMethod === 'patch') {
            $this->_executeRoute($this->prefix . $url, $action, $middleware);
        }
    }

    /**
     * HEAD Route Url
     * @param string $url The url prefix on the route
     * @param string|\Closure $action Action for execution of the route
     * @param array|null $middleware Middleware of the route
     */
	public final function head($url, $action, $middleware = [])
	{
	    if ($this->requestMethod === 'head') {
            $this->_executeRoute($this->prefix . $url, $action, $middleware);
        }
	}

    /**
     * Get the request method of url
     * @return string Request method of url
     */
    public final static function getRequestMethod()
    {
        return strtolower(filter_var($_SERVER['REQUEST_METHOD']));
    }

    /**
     * Get the url of request
     * @return string Url of request
     */
    public final static function getUrl()
    {
        return parse_url(filter_var($_SERVER['REQUEST_URI']))['path'];
    }

    /**
     * Get Instance of the Route class
     * @return \Engine\Routes\Route Route class
     */
    public final static function getInstance()
    {
        if (self::$_instance === null) {
            self::$_instance = new Route();
        }
        return self::$_instance;
    }

    /**
     * Try to execute the logic of the developer for current route
     * @param string|\Closure $action The Function which need the program to execute
     */
    private function _executeAction($action)
    {
        if (empty($action)) {
            new ErrorHandler(
                StatusCodes::$_INTERNAL_SERVER_ERROR,
                'The Action is not exist'
            );
        } else if ($action instanceof \Closure) { // Check if user set as action anonymous function
            call_user_func_array($action, $this->_params);
        } else if (is_string($action)) {
            // Check if user set controller with function
            $parts = explode('@', $action);
            if (count($parts) !== 2) {
                new ErrorHandler(
                    StatusCodes::$_INTERNAL_SERVER_ERROR,
                    'The Action is not correct Controller@Action'
                );
            }

            $this->_executeControllerAction($parts);
        }
    }

    /**
     *
     * @param array $parts Example [ 0 => 'AccountController', 1 => 'registration' ]
     */
    private function _executeControllerAction($parts)
    {
        $controller = "\\App\\Controllers\\$parts[0]";
        if (class_exists($controller)) {
            $newController = new $controller();
            if (method_exists($newController, $parts[1])) {
                call_user_func_array([ $newController, $parts[1] ], $this->_params);
            } else {
                new ErrorHandler(
                    StatusCodes::$_INTERNAL_SERVER_ERROR,
                    'Invalid action name on the route!'
                );
            }
        } else {
            new ErrorHandler(
                StatusCodes::$_INTERNAL_SERVER_ERROR,
                'Invalid controller name on the route!'
            );
        }
    }

    /**
     * Check do url is on the same way like except route
     * @param string $except The route rules which is not include on all route
     * @return bool Do is the url on the route except uri
     */
    private function _checkExceptRoute($except)
    {
        if ($except[strlen($except) - 1] === '*') {
            $except = rtrim($except, '*');

            // Return do is similar url like route
            return substr($this->url, 0, strlen($except)) === $except;
        }

        // Return do is same url like route and is only / which means is for any route
        return trim($this->url, '/') === trim($except, '/');
    }

    /**
     * Try to execute current route
     * @param string $prefix The url prefix on the route
     * @param string|\Closure $action Action for execution of the route
     * @param array|null $middleware Middleware of the route
     */
    private function _executeRoute($prefix, $action, $middleware = [])
    {
        $url_parts = array_values(array_filter(explode('/', $this->url)));
        $route_parts = array_values(array_filter(explode('/', $prefix)));
        $routeLength = count($route_parts);

        if (count($url_parts) > $routeLength) {
            return;
        }

        for ($i = 0; $i < $routeLength; ++$i) {
            // Is possible to be wildcard param
            if (!isset($url_parts[$i]) || $url_parts[$i] !== $route_parts[$i]) {
                $part = $route_parts[$i];

                // Check do is wildcard param with our specific design
                if ($part[0] === '[' && $part[strlen($part) - 1] === ']') {
                    if (isset($url_parts[$i]) && isset($route_parts[$i])) {
                        // Remove the ? if is have it
                        $k = rtrim(substr($route_parts[$i], 1, -1), '?');
                        $this->_params[$k] = $url_parts[$i];
                    }
                } else {
                    // The router is not matched with url.
                    // Go to the next route
                    $this->_params = [];
                    return;
                }
            }
        }

        // The route is found need to execute the logic behind that route
        $this->runRouteLogic($action, $middleware);
    }

    /**
     * Execute middleware and the action for the founded route
     * @param string|\Closure $action Action for execution of the route
     * @param array $middleware Middleware of the route
     */
    private function runRouteLogic($action, $middleware = [])
    {
        if (empty($middleware)) {
            $this->_executeAction($action);
        } else {
            Middleware::execute($middleware, function () use ($action) {
                $this->_executeAction($action);
            });
        }

        exit(1);
    }
}
