<?php

namespace Engine\ErrorHandler;

use Engine\Environment;

/**
 * That Class will manage the Exceptions on the Application
 * Is have 2 options:
 * - Developer: Directly throw the exception
 * - Production: Show to user non-understandable message with 500 response code and will save the exception stack on log file
 */
class ErrorHandler
{
    /**
     * Throw/Show the Exception and stop the running of the application
     * @param int $statusCode Status code of the exception
     * @param string $message Error message for the user
     */
    public function __construct(int $statusCode, string $message)
    {
        if (Environment::get('APP_ENVIRONMENT') === 'production') {
            Production\ErrorHandler::showException($statusCode, $message);
        } else {
            new Development\ErrorHandler($statusCode, $message);
        }
    }
}
