<?php

namespace Engine\ErrorHandler\Production;

/**
 * That Class is to manage all mistakes which the user is made it.
 * @package OldEngine\ErrorHandler\Production
 */
class UserException
{
    /**
     * All mistakes which user make
     * @var array
     */
    private static array $_errors = [];

    /**
     * Add User Mistake on store for can later get and show the mistakes to the user
     * @param int $statusCode Status code of the exception
     * @param string $message Error message for the user
     * @param string $var Name of the variable
     * @return bool False is have problem with the user behavior
     */
    public static function addExceptions(int $statusCode, string $message, string $var) : bool
    {
        http_response_code($statusCode);
        self::$_errors[$var] = $message;
        return false;
    }

    /**
     * Get all Exceptions with the user behavior
     * @return array List of all Exceptions with the user behavior
     */
    public static function getExceptions() : array
    {
        return self::$_errors;
    }
}
