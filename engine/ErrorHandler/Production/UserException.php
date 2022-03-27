<?php

namespace Engine\ErrorHandler\Production;

use Engine\ErrorHandler\ErrorHandler;
use Engine\Http\StatusCodes;

/**
 * That Class is to manage all mistakes which the user is made it.
 * @package Engine\ErrorHandler\Production
 */
class UserException
{
    /**
     * All mistakes which user make
     * @var array
     */
    private static $_errors = [];

    /**
     * Add User Mistake on store for can later get and show the mistakes to the user
     * @param int $statusCode Status code of the exception
     * @param string $message Error message for the user
     * @param string $var Name of the variable
     * @return bool False is have problem with the user behavior
     */
    public static function addExceptions($statusCode, $message, $var)
    {
        if (empty($message) || !is_string($message)) {
            new ErrorHandler(
                StatusCodes::$_INTERNAL_SERVER_ERROR,
                'The $message is not string'
            );
        } else if (empty($statusCode) || !is_int($statusCode)) {
            new ErrorHandler(
                StatusCodes::$_INTERNAL_SERVER_ERROR,
                'The $statusCode is not a number'
            );
        }

        http_response_code($statusCode);
        self::$_errors[$var] = $message;
        return false;
    }

    /**
     * Get all Exceptions with the user behavior
     * @return array List of all Exceptions with the user behavior
     */
    public static function getExceptions()
    {
        return self::$_errors;
    }
}
