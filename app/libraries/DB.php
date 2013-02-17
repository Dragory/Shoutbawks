<?php

class DB extends \PDO
{
    private static $db = null;

    public static function set(\PDO &$db)
    {
        self::$db = $db;
    }

    public static function __callStatic($name, $arguments)
    {
        call_user_func_array([self::$db, $name], $arguments);
    }
}