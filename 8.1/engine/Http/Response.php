<?php

namespace Engine\Http;

/**
 * That Class is responsible for to send information to the client
 */
class Response
{
    /**
     * Instance of the Response class
     * @var Response|null
     */
    private static ?Response $_instance = null;

    private function __construct() { }

    /**
     * Set the status code for the response
     * @param int $code Http response code
     * @return $this Continue with the next method
     */
    public final function statusCode(int $code) : Response
    {
        $this->header('Expect-CT', 'enforce, max-age=30');
        $this->header('Referrer-Policy', 'same-origin');
        $this->header('Strict-Transport-Security', 'max-age=31536000');
        $this->header('X-Content-Type-Option', 'Content-Type=nosniff');
        $this->header('X-OldEngine-Options', 'DENY');
        $this->header('X-XSS-Protection', '1; mode=block');

        header_remove('X-Powered-By');
        header_remove('Server');
        http_response_code($code);

        return $this;
    }

    /**
     * Send HTML content to the client
     * @param string $html Content of the HTML page
     * @return $this Continue with the next method
     */
    public final function html(string $html) : Response
    {
        echo $html;
        return $this;
    }

    /**
     * Send the content of the file to the client
     * @param string $file File path
     * @return $this Continue with the next method
     */
    public final function page(string $file) : Response
    {
        echo file_get_contents($file);
        return $this;
    }

    /**
     * Send 0/1 to the client for success or failed operation without return data will good to used
     * @param bool|int $flag 0/1 flag to show to the client how the operation is finish
     * @return $this Continue with the next method
     */
    public final function flag(bool|int $flag) : Response
    {
        echo (int)$flag;
        return $this;
    }

    /**
     * Send the json object to the client
     * @param array $arr The data which is send to the client on json format
     * @return $this Continue with the next method
     */
    public final function json(array $arr) : Response
    {
        echo json_encode($arr);
        return $this;
    }

    /**
     * Set header to the response
     * @param string $key The key of the header
     * @param string $value The value of the header
     * @return $this Continue with the next method
     */
    public final function header(string $key, string $value) : Response
    {
        header($key . ':' . $value);
        return $this;
    }

    /**
     * Send information to the client. And stop execution of any other code.
     * @param string|null $message Message to show to the client
     */
    public final function send(string $message = null) : void
    {
        exit($message);
    }

    /**
     * Get Instance of the Response class
     * @return Response Response class
     */
    public final static function getInstance() : Response
    {
        if (self::$_instance === null) {
            self::$_instance = new Response();
        }
        return self::$_instance;
    }
}
