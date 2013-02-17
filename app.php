<?php

error_reporting(E_ALL);
ini_set('display_errors', 'On');

require_once __DIR__ . '/vendor/autoload.php';

// Application paths
$paths = [];
$paths['base'] = __DIR__;
$paths['app'] = __DIR__ . '/app';

// Load the configuration
$config = include $paths['app'] . '/config.php';

// Create the application
$app = new \Silex\Application();

// Load the database handler
$db = include $paths['app'] . '/database.php';
DB::__setFacadeObject($db);

// Load our routes
require_once $paths['app'] . '/routes.php';

// Run the application
$app->run();