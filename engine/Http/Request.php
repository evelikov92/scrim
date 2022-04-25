<?php

namespace Engine\Http;

use Engine\Config;
use Engine\User\Auth\Authentication;
use Engine\User\Auth\TokenBasedRememberMeService;
use Engine\User\Data\Input;
use Engine\User\Data\Session;
use Engine\Validation\Validator;

/**
 * That Class manage the all requests to the server which client make
 * @package OldEngine\Http
 */
class Request
{
    /**
     * Instance of the Request class
     * @var Request|null
     */
    private static ?Request $_instance = null;

    /**
     * All UserException Input Params for current Request
     * @var array
     */
    private array $_inputParams = [];

    /**
     * All Headers Params for current Request
     * @var array
     */
    private array $_headers = [];

    /**
     * All Url Query String for current Request
     * @var array
     */
    private array $_query = [];

    /**
     * All Server Params for current Request
     * @var array
     */
    private array $_serverParams = [];

    private function __construct() { }

    /**
     * Get current logged user
     * @param string|null $key The property of the logged user data
     * @return mixed The logged user data
     */
    public final function user(string|null $key = null) : mixed
    {
        $user = Session::getInstance()->get('user');

        if (empty($user)) {
            // Try to get user from Remember Me Cookie
            $user = TokenBasedRememberMeService::getUser(Config::getInstance()->get('auth', 'user_public_columns'));
            Session::getInstance()->set('user', $user);
        }

        if (!empty($key)) {
            return $user[$key];
        } else {
            return $user;
        }
    }

    /**
     * Get the Ip of the user
     * @return string User Ip address
     */
    public final function ip() : string
    {
        if (getenv('HTTP_CLIENT_IP'))
            return getenv('HTTP_CLIENT_IP');
        else if(getenv('HTTP_X_FORWARDED_FOR'))
            return getenv('HTTP_X_FORWARDED_FOR');
        else if(getenv('HTTP_X_FORWARDED'))
            return getenv('HTTP_X_FORWARDED');
        else if(getenv('HTTP_FORWARDED_FOR'))
            return getenv('HTTP_FORWARDED_FOR');
        else if(getenv('HTTP_FORWARDED'))
            return getenv('HTTP_FORWARDED');
        else if(getenv('REMOTE_ADDR'))
            return getenv('REMOTE_ADDR');
        else
            return 'UNKNOWN';
    }

    /**
     * Get the Server variable from the request
     * @param string $key The key of the variable on the server params
     * @param string|null $validate Rules for validation of the variable
     * @return mixed The value of the wanted param from server params
     */
    public final function server(string $key, string|null $validate = null) : mixed
    {
        if (empty($this->_serverParams)) {
            $this->_serverParams = $_SERVER;
        }

        return $this->_returnParam($key, $this->_serverParams, $validate);
    }

    /**
     * Get the url query string variable from the request
     * @param string $key The key of the variable on the query string
     * @param string|null $validate Rules for validation of the variable
     * @return string|null The value of the wanted param from query string
     */
    public final function query(string $key, string|null $validate = null) : mixed
    {
        if (empty($this->_query)) {
            parse_str($_SERVER['QUERY_STRING'], $this->_query);
        }

        return $this->_returnParam($key, $this->_query, $validate);
    }

    /**
     * Get the headers variable from the request
     * @param string $key The key of the variable on the list
     * @param string|null $validate Rules for validation of the variable
     * @return mixed The value of the wanted param from header
     */
    public final function header(string $key, string|null $validate = null) : mixed
    {
        if (empty($this->_headers)) {
            $this->_headers = getallheaders();
        }

        return $this->_returnParam($key, $this->_headers, $validate);
    }

    /**
     * Get the user input param variable from the request
     * @param string $key The key of the variable on the list
     * @param string|null $validate Rules for validation of the variable
     * @return mixed The value of the wanted param from user input
     */
    public final function inputParam(string $key, string|null $validate = null) : mixed
    {
        if (!$key) {
            return null;
        }

        return Input::getRequestParam($key, $validate);
    }

    /**
     * Get the user inputs parameters which Dev need after validation
     * Example [ 'name' => 'text|required|xss', 'password' => 'text|required|xss' ]
     * @param array $vars The variables which need to validate with validation rules
     * @return array|null All parameters which developer need after validation. If is not validate correct it will return FALSE.
     */
    public final function inputParams(array $vars = []) : array|null
    {
        if (empty($vars)) {
            $this->_inputParams = Input::getRequestParam();
        } else {
            foreach ($vars as $key => $validate) {
                $result = Input::getRequestParam($key, $validate);

                $this->_inputParams[$key] = $result;
            }
        }

        return $this->_inputParams;
    }

    /**
     * Get Instance of the Request class
     * @return Request Request class
     */
    public final static function getInstance() : Request
    {
        if (self::$_instance === null) {
            self::$_instance = new Request();
        }

        return self::$_instance;
    }

    /**
     * Return one parameter from giving array, after filter/validation
     * @param string $key The key of the variable on the list
     * @param array $array List of variables which need to return the variable
     * @param string|null $validate Rules for validation of the variable
     * @return mixed The value of the wanted param from request
     */
    private function _returnParam(string $key, array $array = [], string|null $validate = null) : mixed
    {
        if (!$key || !isset($array[$key])) {
            return null;
        }

        if ($validate) {
            return Validator::validate($key, htmlspecialchars($array[$key]), $validate);
        }

        return $array[filter_var($key)];
    }
}
