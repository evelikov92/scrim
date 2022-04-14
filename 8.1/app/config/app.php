<?php

use Engine\Application;
use Engine\Environment;

return [
    /**
     * Where is store all public files of application
     */
    'public_folder' => Application::getApplicationMainFolder() . 'public/build/',

    /**
     * Configuration of the session
     */
    'session' => [
        'name' => Environment::get('APP_SESSION_NAME'),
        'lifetime' => 3600,
        'path' => '/',
        'domain' => ''
    ],

    /**
     * Configuration of the language
     */
    'default_lang' => 'en',
    'path_to_lang_files' => Application::getApplicationMainFolder() . 'app/resources/languages/',

    /**
     * Configuration of the storage (logs, cache)
     */
    'logs_dir' => Application::getApplicationMainFolder() . 'storage/logs/',
    'cache_dir' => Application::getApplicationMainFolder() . 'storage/cache/',
];
