<?php

namespace Engine;

use Engine\ErrorHandler\ErrorHandler;
use Engine\Http\StatusCodes;

/**
 * Manage the Private Application Variables
 */
class Environment
{
    private static array $_variables = [];

    /**
     * Initialize environment variables into memory
     * @return void
     */
    public final static function init() : void
    {
        $lines = Environment::_readEnvFile();

        // Split the variable in key value
        for ($i = 0, $len = count($lines); $i < $len; $i++)
        {
            $keyValuePair = explode('=', $lines[$i]);
            Environment::$_variables[$keyValuePair[0]] = $keyValuePair[1];
        }
    }

    /**
     * Get the value
     * @param string $key Variable key
     * @return string|null Variable value
     */
    public final static function get(string $key) : ?string
    {
        return Environment::$_variables[$key];
    }

    /**
     * Read environment file
     * @return array
     */
    private static function _readEnvFile() : array
    {
        $file = Application::getApplicationMainFolder() . '.env';
        if (!file_exists($file)) {
            new ErrorHandler(
                StatusCodes::INTERNAL_SERVER_ERROR,
                'The .env file is not exists'
            );
        }

        $data = file_get_contents($file);
        // Remove all empty lines from file
        $lines = array_filter(explode(PHP_EOL, $data));

        return array_values($lines);
    }
}
