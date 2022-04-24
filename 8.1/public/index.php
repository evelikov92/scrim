<?php

// Autoload files using the Composer autoloader.
require_once __DIR__ . '/../vendor/autoload.php';

use Engine\Application;

$app = new Application();
$app->init();

//// Run The Web Application
$app->run();



class A
{
    public string $first;
    public string $second;

    public function create() : void
    {
        $arr = [ 'first' => 'first string', 'second' => 'second string' ];
        foreach ($arr as $key => $val) {
            $this->{$key} = $val;
        }
    }
}

$test = new A();
$test->create();
var_dump($test);
