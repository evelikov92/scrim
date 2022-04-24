<?php

namespace OldEngine;

use OldEngine\ErrorHandler\ErrorHandler;
use OldEngine\Http\StatusCodes;

/**
 * That Class Manage the Private Application Variables
 * @package OldEngine
 */
class Environment
{
    /**
     * Keep all variables which is store on .env file
     * @var array List of variables with their values on the .env file
     */
    public static $_variables = [];

    /**
     * Get the value from the .env file by specific key.
     * Is not possible to get whole data. Need to have a key.
     * @param string $key Name of the variable on the .env file
     * @return ErrorHandler|string The value of the variable on the .env file
     */
    public final static function get($key)
    {
        if (empty(self::$_variables)) {
            $file = Common::$_MAIN_FOLDER . '.env';

            if (!file_exists($file)) {
                return new ErrorHandler(
                    StatusCodes::$_INTERNAL_SERVER_ERROR,
                    'The .env file is not exists'
                );
            }

            // Keep the variables on memory for next time to have access not to read again the file
            self::$_variables = array_values(array_filter(explode(PHP_EOL, file_get_contents($file))));
        }

        $i = count(self::$_variables);
        while ($i--) {
            if (substr(self::$_variables[$i], 0, strlen($key)) === $key) {
                // separate the variable=value and return the value
                return trim(explode('=', self::$_variables[$i])[1]);
            }
        }

        return new ErrorHandler(
            StatusCodes::$_INTERNAL_SERVER_ERROR,
            "The Variable $key on .env file is not found"
        );
    }
}
