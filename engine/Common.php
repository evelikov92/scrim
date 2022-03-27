<?php

namespace Engine;

/**
 * That class has few helper methods which will help develop the Application
 * @package Engine
 */
class Common
{
    /**
     * Main directory of the application
     * @var string
     */
    public static $_MAIN_FOLDER = __DIR__ . '/../';

    /**
     * Get current date time on specific format
     * @param string $format The date time format
     * @return false|string Will return current date time on specific format
     */
    public final static function convertToDate(string $format = 'Y-m-d h:i:s')
    {
        return date($format, time());
    }

    /**
     * Show on readable way the array
     * @param array $arr Array which will show
     */
    public final static function showArray(array $arr)
    {
        echo "<pre>" . print_r($arr, true) . "</pre>";
    }
}