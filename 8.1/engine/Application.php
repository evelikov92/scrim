<?php

namespace Engine;

/**
 * Main class which run the application
 */
class Application
{
    /**
     * Main directory of the application
     * @var string
     */
    private static string $_MAIN_FOLDER = __DIR__ . '/../';

    /**
     * Get application main folder
     * @return string
     */
    public static function getApplicationMainFolder() : string
    {
        return Application::$_MAIN_FOLDER;
    }

    /**
     * Initialize settings for web application
     * @return void
     */
    public final function init() : void
    {
        if (str_contains($_SERVER['REQUEST_URI'], '/build/')) {
            exit();
        }

        // Set environment of the application
        Environment::init();
        ini_set('log_errors', 'On');

        // Set Display Error depending of the environment
        if (Environment::get('APP_ENVIRONMENT') === 'production') {
            ini_set('display_errors', 'Off');
            ini_set('display_startup_errors', 'Off');
            ini_set('error_reporting', 'E_ALL');
        } else {
            ini_set('display_errors', 'On');
            ini_set('display_startup_errors', 'On');
            ini_set('error_reporting', -1);
        }

        $config = Config::getInstance();
    }

    /**
     * Run the Web application
     * @return void
     */
    public final function run() : void
    {
        echo 'Application Running';
    }
}
