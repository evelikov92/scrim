<?php

// Autoload files using the Composer autoloader.
require_once __DIR__ . '/../vendor/autoload.php';

use Engine\Application;

$app = new Application();

// Run The Web Application
$app->run();
