<?php

namespace OldEngine;

use OldEngine\Database\Adapter;
use OldEngine\Database\MySqlQuery;
use OldEngine\Routes\Route;
use OldEngine\User\Data\Session;
use OldEngine\ErrorHandler\Production\ErrorHandler;

/**
 * That class is for run the Application
 * @package OldEngine
 */
class Application
{
    /**
     *
     */
    public final function run()
    {
        // Set Error handle option for application
        $err = new ErrorHandler();
        $err->setErrorHandler();

        if (strpos($_SERVER['REQUEST_URI'], '/build/') !== false) {
            exit();
        }

//        // Set Display Error depending of the environment
//        if (Environment::get('APP_ENVIRONMENT') === 'production') {
//            ini_set('display_errors', 'Off');
//            ini_set('display_startup_errors', 'Off');
//            ini_set('error_reporting', 'E_ALL');
//            ini_set('log_errors', 'On');
//        } else {
//            ini_set('display_errors', 'On');
//            ini_set('display_startup_errors', 'On');
//            ini_set('error_reporting', -1);
//            ini_set('log_errors', 'On');
//        }


//        $config = Config::getInstance();
//
//        // Configuration of the session
//        $sessionSettings = $config->get('app', 'session');
//        Session::getInstance()->start(
//            $sessionSettings['name'],
//            $sessionSettings['lifetime'],
//            $sessionSettings['path'],
//            $sessionSettings['domain']
//        );
//
//        // Configuration of the database
//        $dbSettings = $config->get('db');
//        MySqlQuery::getInstance()->setAdapter(
//            new Adapter(new \PDO(
//                    $dbSettings['connection_uri'],
//                    $dbSettings['username'],
//                    $dbSettings['password'],
//                    $dbSettings['pdo_options']
//                )
//            )
//        );
//
//        // Run the application
//        Route::getInstance()->run();
    }
}
