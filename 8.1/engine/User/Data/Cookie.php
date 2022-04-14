<?php

namespace Engine\User\Data;

/**
 * That Class manage all cookies on the system
 * @package OldEngine\User\Data
 */
class Cookie
{
    /**
     * Set cookie value
     * @param string $key The name of key of the cookie attribute
     * @param string $value The value on cookie attribute
     * @param int $time How many times will save the cookie
     * @param string $path Which path of app will used that cookie
     * @param string $domain Domain name for the cookie
     */
    public static function set(string $key, string $value, int $time, string $path = '/', string $domain = '')
    {
        setcookie($key, $value, $time, $path, $domain, isset($_SERVER['HTTPS']), true);
    }

    /**
     * Remove the cookie
     * @param string $key The name of key of the cookie attribute
     */
    public static function remove(string $key)
    {
        if (self::checkCookieExist($key)) {
            self::set($key, '', time() - 3600);
        }
    }

    /**
     * Get cookie value by key
     * @param string $key The name of key of the cookie attribute
     * @return mixed The value on cookie attribute
     */
    public static function get(string $key) : mixed
    {
        return filter_input(INPUT_COOKIE, filter_var($key));
    }

    /**
     * Check do exist the cookie with specific key
     * @param string $key The name of key of the cookie attribute
     * @return bool Do is exist cookie attribute with that $key
     */
    public static function checkCookieExist(string $key) : bool
    {
        return isset($_COOKIE[filter_var($key)]);
    }
}
