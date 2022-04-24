<?php

// Autoload files using the Composer autoloader.
require_once __DIR__ . '/../vendor/autoload.php';

use OldEngine\Scrum\Application;

$app = new Application();

// Run The Web Application
$app->run();
