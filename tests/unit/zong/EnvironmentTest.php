<?php

use Engine\Environment;
use Engine\Http\StatusCodes;

/**
 *
 */
class EnvironmentTest extends PHPUnit\Framework\TestCase
{
    /**
     *
     */
    public function testImportantVariablesDoExistsOnEnvironmentFile()
    {
        $this->assertNotEmpty(
            Environment::get('APP_ENVIRONMENT'),
            'APP_ENVIRONMENT var exists'
        );

        $this->assertNotEmpty(
            Environment::get('APP_NAME'),
            'APP_NAME var exists'
        );

        $this->assertNotEmpty(
            Environment::get('APP_DOMAIN'),
            'APP_DOMAIN var exists'
        );
    }

    /**
     *
     */
    public function testGetVariablesFromEnvironmentFile()
    {
        $env = Environment::get('APP_ENVIRONMENT');
        $this->assertTrue(
            $env === 'development' || $env === 'production',
            'APP_ENVIRONMENT is development'
        );

        $this->expectExceptionMessage('The Variable on .env file is not found');
        $this->expectException(\Exception::class);
        $this->expectExceptionCode(StatusCodes::$_INTERNAL_SERVER_ERROR);
        Environment::get('VAR_NOT_FOUND');
    }
}
