<?php

class Facade
{
    private static $object = null;

    public static function __setFacadeObject(&$object)
    {
        self::$object = $object;
    }

    public static function __callStatic($name, $arguments)
    {
        call_user_func_array([self::$object, $name], $arguments);
    }
}