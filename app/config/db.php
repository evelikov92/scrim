<?php

$name = \Engine\Environment::get('DATABASE_NAME');

return [
    'connection_uri' => "mysql:host=localhost;dbname=$name",
    'username' => \Engine\Environment::get('DATABASE_USER'),
    'password' => \Engine\Environment::get('DATABASE_PASSWORD'),
    'pdo_options' => [
        PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES "UTF8"',
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_PERSISTENT => true,
        PDO::NULL_EMPTY_STRING => true
    ]
];
