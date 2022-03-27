<?php

namespace Engine\Http;

use Engine\Common;
use Engine\Config;
use Engine\Database\MySqlQuery;
use Engine\ErrorHandler\Production\UserException;
use Engine\Globalization\Language;
use Engine\User\Data\Session;

/**
 * That Class is add some basic functionality which is possible to have the all Controllers on the system.
 * @package Engine\Http
 */
abstract class BaseController
{
    /**
     * String resources for user language
     * @var array
     */
    private $_strings = [];

    /**
     * Database Query String Creator
     * @var \Engine\Database\IQuery
     */
    protected $_db = null;

    /**
     * Object which is manage all requests comes to the server
     * @var \Engine\Http\Request
     */
    protected $request = null;

    /**
     * Object which is responsible for to send information to the client
     * @var \Engine\Http\Response
     */
    protected $response = null;

    /**
     * Time now on human readable way
     * For save created_at, updated_at on database for records
     * @var string
     */
    protected $_date_time = null;

    /**
     * Public folder where is all static files which user can see it, and open it
     * @var string
     */
    protected $_public_folder = null;

    public function __construct()
    {
        $this->_public_folder = $this->config('app', 'public_folder');
        $this->_date_time = Common::convertToDate();

        // Set the user language resource
        Language::setAutoLanguage();

        $this->_db = MySqlQuery::getInstance();
        $this->request = Request::getInstance();
        $this->response = Response::getInstance();
    }

    /**
     * Check do have errors
     * If is have send to the client and stop execution of the code
     */
    protected final function checkErrors()
    {
        $errors = UserException::getExceptions();
        if (!empty($errors)) {
            $this->response
                ->statusCode(StatusCodes::$_BAD_REQUEST)
                ->json([ 'message' => $this->resources('bad_params'), 'errors' => $errors ])
                ->send();
        }
    }

    /**
     * Get the configuration of the application
     * @param string $file Config file on app
     * @param string $key Key on config file
     * @return mixed Return the value of the configuration
     */
    protected final function config($file, $key = null)
    {
        return Config::getInstance()->get($file, $key);
    }

    /**
     * Manage the session of the application
     * @param string $key The name of variable on SESSION array
     * @param null|string $value If is set then set new value for that variable on SESSION
     * @return string|null The value of asked variable on SESSION or nothing
     */
    protected final function session($key, $value = null)
    {
        if ($value) {
            Session::getInstance()->set($key, $value);
        } else {
            return Session::getInstance()->get($key);
        }

        return null;
    }

    /**
     * Get the text resources
     * @param string $key Specific text resource variable
     * @return array|string|null The text resource(s)
     */
    protected final function resources($key = null)
    {
        if (empty($this->_strings)) {
            $this->_strings = Language::getLanguageResource();
        }

        if ($key && !isset($this->_strings[$key])) {
            return null;
        } else if ($key) {
            return $this->_strings[filter_var($key)];
        }

        return $this->_strings;
    }

    /**
     * Save new language on the system for that user
     * @param string $lang User language
     */
    protected final function setLanguage($lang)
    {
        Language::setLanguage($lang);
    }

    /**
     * Get the user language
     * @return string User language
     */
    protected final function getLanguage()
    {
        return Language::getLanguage();
    }

    /**
     * Send post request to  third party site
     * @param $url
     * @param array $data
     * @return false|string
     */
    protected function send_post_request($url, $data = [])
    {
        $options = [ 'http' => [
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => http_build_query($data)
        ] ];

        $context  = stream_context_create($options);
        return file_get_contents($url, false, $context);
    }
}
