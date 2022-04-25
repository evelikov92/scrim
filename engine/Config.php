<?php

namespace Engine;

use Engine\ErrorHandler\ErrorHandler;
use Engine\Http\StatusCodes;

/**
 * Singleton class which is manage the configuration files of the application
 */
class Config
{
    /**
     * Instance of the Config class
     * @var Config|null
     */
    private static ?Config $_instance = null;

    /**
     * List of all configuration file paths
     * @var array
     */
    private array $_configArray = [];

    /**
     * The path to the configuration files
     * @var string
     */
    private string $_configFolder;

    private function __construct()
    {
        $this->_configFolder = Application::getApplicationMainFolder() . 'app/config/';
    }

    /**
     * Get Instance of the Config class
     * @return Config Config object
     */
    public final static function getInstance() : Config
    {
        if (self::$_instance === null) {
            self::$_instance = new Config();
        }

        return self::$_instance;
    }

    /**
     * Get the configuration values from the config file
     * @param string $file Name of the config file
     * @return array All configuration data
     */
    public final function getConfigArray(string $file) : array
    {
        if (!isset($this->_configArray[$file])) {
            $this->_registerConfigFile($file);
        }

        return $this->_configArray[$file];
    }

    /**
     * Get the configuration value from the config file
     * @param string $file Name of the config file
     * @param string $key Key of the array inside config file
     * @return mixed Value for variable
     */
    public final function get(string $file, string $key) : mixed
    {
        if (!isset($this->_configArray[$file])) {
            $this->_registerConfigFile($file);
        }

        if (!isset($this->_configArray[$file][$key])) {
            new ErrorHandler(
                StatusCodes::INTERNAL_SERVER_ERROR,
                "In Config file $file is not found $key resources"
            );
        }

        return $this->_configArray[$file][$key];
    }

    /**
     * Save configuration variables from the config file
     * @param string $file The path to the config file
     */
    private function _registerConfigFile(string $file) : void
    {
        // Check do name of file exist on configuration folder
        $f = realpath($this->_configFolder . $file . '.php');
        if (empty($f) || !is_file($f) || !is_readable($f)) {
            new ErrorHandler(
                StatusCodes::INTERNAL_SERVER_ERROR,
                "The Config file $file is not found"
            );
        }

        // Save the Configuration array from file on memory
        $this->_configArray[$file] = include_once $f;

        if (empty($this->_configArray[$file]) || !is_array($this->_configArray[$file])) {
            unset($this->_configArray[$file]);
            new ErrorHandler(
                StatusCodes::INTERNAL_SERVER_ERROR,
                "In Config file $file is not found any resources"
            );
        }
    }
}
