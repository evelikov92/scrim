<?php

use Engine\Common;
use Engine\Environment;

return [
    /**
     * Where is store all public files of application
     */
    'public_folder' => Common::$_MAIN_FOLDER . 'public/build/',

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
    'path_to_lang_files' => Common::$_MAIN_FOLDER . 'app/resources/languages/',

    /**
     * Configuration of the storage (logs, cache)
     */
    'logs_dir' => Common::$_MAIN_FOLDER . 'storage/logs/',
    'cache_dir' => Common::$_MAIN_FOLDER . 'storage/cache/',
];
