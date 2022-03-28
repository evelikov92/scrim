<?php

namespace Engine\User\Data;

/**
 * That Class is responsible for the sessions on the application
 * @package Engine\User\Data
 */
class Session
{
    /**
     * Instance of the Session class
     * @var Session
     */
    private static $_instance = null;

    /**
     * Default session name of the application
     * @var string
     */
    private $_defaultSessionName = 'PHP_SESSION_ID';

    private function __construct() { }

    /**
     * Start the session
     * @param string $name The name of session Id (Default is PHP_SESSION_ID)
     * @param int $lifetime life time of session
     * @param string $path path of session
     * @param string $domain domain name of session
     */
    public function start($name = '', $lifetime = 0, $path = '/', $domain = '')
    {
        if (empty($name)) {
            $name = $this->_defaultSessionName;
        }

        session_name($name);
        session_set_cookie_params($lifetime, $path . '; samesite=strict', $domain, true, true);
        session_start();
    }

    /**
     * Get variable value from session array
     * @param string $key key of element on session
     * @return null|string value of variable save it on session
     */
    public function get($key)
    {
        if (isset($_SESSION[$key])) {
            return $_SESSION[filter_var($key)];
        }
        return null;
    }

    /**
     * Set new variable on session array
     * @param string $key key of element save it on session
     * @param mixed $value value of element save it on session
     */
    public function set($key, $value)
    {
        $_SESSION[$key] = $value;
    }

    /**
     * Destroy the session
     */
    public function destroy()
    {
        session_destroy();
    }

    /**
     * Save the session
     */
    public function saveSession() {
        session_write_close();
    }

    /**
     * Get Instance of the Session class
     * @return Session Session object
     */
    public final static function getInstance()
    {
        if (self::$_instance === null) {
            self::$_instance = new Session();
        }
        return self::$_instance;
    }
}
