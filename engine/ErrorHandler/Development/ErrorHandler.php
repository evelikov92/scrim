<?php

namespace Engine\ErrorHandler\Development;

/**
 * That class is throw the exceptions directly on browser page, for can developer see what's happend
 * @package Engine\ErrorHandler\Development
 */
class ErrorHandler
{
    /**
     * Throw the Exception and stop the running of the application
     * @param int $statusCode Response code number
     * @param string $message The message which will show to developer
     */
    public function __construct($statusCode, $message)
    {
        http_response_code($statusCode);
        throw new \Exception($message, $statusCode);
    }
}
