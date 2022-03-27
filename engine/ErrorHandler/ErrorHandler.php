<?php

namespace Engine\ErrorHandler;

use Engine\Environment;

/**
 * That Class will manage the Exceptions on the Application
 * Is have 2 options:
 * - Developer: Directly throw the exception
 * - Production: Show to user non-understandable message with 500 response code and will save the exception stack on log file
 * @package Engine\ErrorHandler
 */
class ErrorHandler
{
    /**
     * Throw/Show the Exception and stop the running of the application
     * @param int $statusCode Status code of the exception
     * @param string $message Error message for the user
     */
    public function __construct($statusCode, $message)
    {
        $env = Environment::get('APP_ENVIRONMENT');
        if ($env === 'production') {
            \Engine\ErrorHandler\Production\ErrorHandler::showException($statusCode, $message);
        } else {
            new \Engine\ErrorHandler\Development\ErrorHandler($statusCode, $message);
        }
    }
}
