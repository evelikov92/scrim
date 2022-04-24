<?php

namespace Engine;

use Engine\Database\Adapter;
use Engine\Database\MySqlQuery;
use Engine\Routes\Route;
use Engine\User\Data\Session;
use PDO;

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

        // Configuration of the session
        $sessionSettings = $config->get('app', 'session');
        Session::getInstance()->start(
            $sessionSettings['name'],
            $sessionSettings['lifetime'],
            $sessionSettings['path'],
            $sessionSettings['domain']
        );

        // Configuration of the database
        $dbSettings = $config->getConfigArray('db');
        MySqlQuery::getInstance()->setAdapter(
            new Adapter(new PDO(
                    $dbSettings['connection_uri'],
                    $dbSettings['username'],
                    $dbSettings['password'],
                    $dbSettings['pdo_options']
                )
            )
        );
    }

    /**
     * Run the Web application
     */
    public final function run() : void
    {
        Route::getInstance()->run();
    }
}
