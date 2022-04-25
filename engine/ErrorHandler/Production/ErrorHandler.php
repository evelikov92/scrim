<?php

namespace Engine\ErrorHandler\Production;

use Engine\Http\StatusCodes;
use Engine\Profiler\Log;

use Exception;

/**
 * Error handler which is responsible only for production.
 * It will save the Exception on the log file.
 * Always will return 500 - INTERNAL_SERVER_ERROR to the browser/client.
 */
class ErrorHandler
{
    /**
     * Set global error handler to catch any exception which is make on the server
     */
    public function setErrorHandler() : void
    {
        set_error_handler([ $this, 'exception_handler' ]);
    }

    /**
     * Save the exception on the log file and show the non-understandable message to the client
     * @param int $statusCode Response code number
     * @param string $message The message which will write on log file for later developer can see it
     */
    public static function showException(int $statusCode, string $message) : void
    {
        http_response_code($statusCode);
        $exception = new Exception($message, $statusCode);
        Log::write($exception);

        // Show to user non-understandable message
        Response::getInstance()
            ->statusCode(StatusCodes::INTERNAL_SERVER_ERROR)
            ->json([ 'message' => Language::getLanguageResource()['internal_server_error'] ])
            ->send();
    }

    /**
     * Handle the Exception on Application
     * @param int $number Number of the mistake (non-understandable from normal user/developer)
     * @param string $message The message which will write on log file for later developer can see it
     * @param string $file Which file is throw the exception
     * @param int $line Which line on file was throw the exception
     */
    public function exception_handler(int $number, string $message, string $file, int $line) : void
    {
        self::showException(StatusCodes::INTERNAL_SERVER_ERROR, $number . ' ' . $message . ' ' . $file . ' ' . $line);
    }
}
