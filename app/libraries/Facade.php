<?php

class Facade
{
    private static $object = null;

    public static function __setFacadeObject(&$object)
    {
        self::$object = $object;
    }

    public static function __getFacadeObject()
    {
        return self::$object;
    }

    public static function __callStatic($name, $arguments)
    {
        return call_user_func_array([self::$object, $name], $arguments);
    }
}