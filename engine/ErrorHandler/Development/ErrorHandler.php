<?php

namespace Engine\ErrorHandler\Development;

use Exception;

/**
 * That class is throw the exceptions directly on browser page, for can developer see what's happened
 */
class ErrorHandler
{
    /**
     * Throw the Exception and stop the running of the application
     * @param int $statusCode Response code number
     * @param string $message The message which will show to developer
     * @throws Exception
     */
    public function __construct(int $statusCode, string $message)
    {
        http_response_code($statusCode);
        throw new Exception($message, $statusCode);
    }
}
