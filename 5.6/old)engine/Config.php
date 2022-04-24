<?php

namespace OldEngine;

use OldEngine\ErrorHandler\ErrorHandler;
use OldEngine\Http\StatusCodes;

/**
 * Singleton class which is manage the configuration files of the application
 * @package OldEngine
 */
class Config
{
    /**
     * Instance of the Config class
     * @var Config
     */
    private static $_instance = null;

    /**
     * The path to the configuration files
     * @var string
     */
    private $_configFolder = null;

    private function __construct()
    {
        $this->_configFolder = Common::$_MAIN_FOLDER . 'app/config/';
    }

    /**
     * List of all configuration file paths
     * @var array
     */
    private $_configArray = [];

    /**
     * Get the configuration value from the config file
     * @param string $file Configuration file
     * @param string|null $key Key of the variable on configuration file
     * @return mixed The value of the configuration variable
     */
    public final function get($file, $key = null)
    {
        if (!isset($this->_configArray[$file])) {
            $this->_registerConfigFile($file);
        }

        if (!empty($key)) {
            if (!isset($this->_configArray[$file][$key])) {
                new ErrorHandler(
                    StatusCodes::$_INTERNAL_SERVER_ERROR,
                    "In Config file is not found $key resources"
                );
            }

            return $this->_configArray[$file][$key];
        }

        return $this->_configArray[$file];
    }

    /**
     * Get Instance of the Config class
     * @return Config Config object
     */
    public final static function getInstance()
    {
        if (self::$_instance === null) {
            self::$_instance = new Config();
        }
        return self::$_instance;
    }

    /**
     * Cache the config file path in array for can later use it their path
     * @param string $file The path to the config file
     */
    private function _registerConfigFile($file)
    {
//        // Check do name of file exist on configuration folder
//        $f = realpath($this->_configFolder . $file . '.php');
//        if (empty($f) || !is_file($f) || !is_readable($f)) {
//            new ErrorHandler(
//                StatusCodes::$_INTERNAL_SERVER_ERROR,
//                'The Config file is not found'
//            );
//        }
//
//        // Save the Configuration array from file on memory
//        $this->_configArray[$file] = include_once $f;
//
//        if (empty($this->_configArray[$file]) || !is_array($this->_configArray[$file])) {
//            new ErrorHandler(
//                StatusCodes::$_INTERNAL_SERVER_ERROR,
//                'In Config file is not found any resources'
//            );
//        }
    }
}
