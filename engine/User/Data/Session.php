<?php

namespace Engine\User\Data;

/**
 * That Class is responsible for the sessions on the application
 */
class Session
{
    /**
     * Instance of the Session class
     * @var Session|null
     */
    private static ?Session $_instance = null;

    /**
     * Default session name of the application
     * @var string
     */
    private string $_defaultSessionName = 'PHP_SESSION_ID';

    private function __construct() { }

    /**
     * Start the session
     * @param string $name The name of session Id (Default is PHP_SESSION_ID)
     * @param int $lifetime lifetime of session
     * @param string $path path of session
     * @param string $domain domain name of session
     */
    public function start(string $name = '', int $lifetime = 0, string $path = '/', string $domain = '') : void
    {
        if (empty($name)) {
            $name = $this->_defaultSessionName;
        }

        session_name($name);
        session_set_cookie_params($lifetime, $path, $domain, true, true);
        session_start();
    }

    /**
     * Get variable value from session array
     * @param string $key key of element on session
     * @return mixed value of variable save it on session
     */
    public function get(string $key) : mixed
    {
        if (isset($_SESSION[$key])) {
            return $_SESSION[filter_var($key)];
        }

        return '';
    }

    /**
     * Set new variable on session array
     * @param string $key key of element save it on session
     * @param mixed $value value of element save it on session
     */
    public function set(string $key, mixed $value) : void
    {
        $_SESSION[$key] = $value;
    }

    /**
     * Destroy the session
     */
    public function destroy() : void
    {
        session_destroy();
    }

    /**
     * Save the session
     */
    public function saveSession() : void
    {
        session_write_close();
    }

    /**
     * Get Instance of the Session class
     * @return Session Session object
     */
    public final static function getInstance() : Session
    {
        if (self::$_instance === null) {
            self::$_instance = new Session();
        }

        return self::$_instance;
    }
}
