<?php

use OldEngine\Config;

/**
 *
 */
class ConfigTest extends \PHPUnit\Framework\TestCase
{
    /**
     *
     */
    public function testGetValuesFromConfigurationFile()
    {
        $config = Config::getInstance();

        $this->assertInternalType(
            'array', $config->get('app'),
            'Without key config return whole array from the file'
        );

        $this->assertNotEmpty(
            $config->get('app', 'session'),
            'Is session a array on app config file'
        );

        $this->assertArrayHasKey(
            'session', $config->get('app'),
            'App config file has session parameter'
        );
    }

    /**
     *
     */
    public function testDoSessionParametersExistOnConfigurationFile()
    {
        $config = Config::getInstance();
        $session = $config->get('app', 'session');

        $this->assertArrayHasKey(
            'name', $session,
            'app config file the session has name parameter'
        );

        $this->assertArrayHasKey(
            'lifetime', $session,
            'app config file the session has lifetime parameter'
        );

        $this->assertArrayHasKey(
            'path', $session,
            'app config file the session has path parameter'
        );

        $this->assertArrayHasKey(
            'domain', $session,
            'app config file the session has domain parameter'
        );

        $this->assertInternalType(
            'int', $session['lifetime'],
            'session lifetime parameter is int'
        );

        $this->assertInternalType(
            'string', $session['name'],
            'session name parameter is string'
        );

        $this->assertInternalType(
            'string', $session['path'],
            'session path parameter is string'
        );

        $this->assertInternalType(
            'string', $session['domain'],
            'session domain parameter is string'
        );
    }

    /**
     *
     */
    public function testDoEmailParametersExistOnConfigurationFile()
    {
        $config = Config::getInstance();

        $this->assertArrayHasKey(
            'driver', $config->get('email'),
            'Email config file has driver parameter'
        );

        $this->assertArrayHasKey(
            'encryption', $config->get('email'),
            'Email config file has encryption parameter'
        );

        $this->assertArrayHasKey(
            'port', $config->get('email'),
            'Email config file has port parameter'
        );

        $this->assertInternalType(
            'string', $config->get('email', 'driver'),
            'Is driver a string on email config file'
        );

        $this->assertInternalType(
            'string', $config->get('email', 'encryption'),
            'Is encryption a string on email config file'
        );

        $this->assertInternalType(
            'int', $config->get('email', 'port'),
            'Is port a integer on email config file'
        );
    }

    /**
     *
     */
    public function testDoAppParametersExistOnConfigurationFile()
    {
        $config = Config::getInstance();

        $this->assertArrayHasKey(
            'session', $config->get('app'),
            'App config file has session parameter'
        );

        $this->assertArrayHasKey(
            'logs_dir', $config->get('app'),
            'App config file has logfile_path parameter'
        );

        $this->assertArrayHasKey(
            'default_lang', $config->get('app'),
            'App config file has default_lang parameter'
        );

        $this->assertInternalType(
            'array', $config->get('app', 'session'),
            'Is session a array on app config file'
        );

        $this->assertInternalType(
            'string', $config->get('app', 'logs_dir'),
            'Is logfile_path a string on app config file'
        );

        $this->assertInternalType(
            'string', $config->get('app', 'default_lang'),
            'Is default_lang exist and is string'
        );

        $this->assertEquals(
            strlen($config->get('app', 'default_lang')), 2,
            'App config file the default_lang is exact two chars'
        );
    }
}
