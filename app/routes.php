<?php

$app->get('/', function() {
    return 'Welcome.';
});

// GET METHODS

// POST METHODS
$app->post('/send', 'API::sendMessage');