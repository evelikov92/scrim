<?php

class RouteTest extends \PHPUnit\Framework\TestCase
{
    public $url = '/get/something/2/blah/5/gdjg';
    public $method = 'GET';

    public function testRequestUrl()
    {
        $_SERVER['REQUEST_URI'] = $this->url;
        $this->assertTrue(
            \OldEngine\Routes\Route::getUrl() === $this->url,
            'The Url is ' . $this->url
        );
    }

    public function testRequestMethod()
    {
        $_SERVER['REQUEST_METHOD'] = $this->method;
        $this->assertTrue(
            OldEngine\Routes\Route::getRequestMethod() === strtolower($this->method),
            'The Request Method is GET'
        );
    }
}
