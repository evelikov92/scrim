<?php

namespace Engine;

use Exception;

/**
 * Few helper static functions which will help develop the Application
 */
class Common
{
    /**
     * Get current date time on specific format
     * @param string $format The date time format
     * @return string Will return current date time on specific format
     */
    public final static function convertToDate(string $format = 'Y-m-d h:i:s') : string
    {
        return date($format, time());
    }

    /**
     * Show on readable way the array
     * @param array $arr Array which will show
     */
    public final static function showArray(array $arr) : void
    {
        echo "<pre>" . print_r($arr, true) . "</pre>";
    }

    /**
     * Generate random string
     * @param int $len Length of string
     * @return string Random string
     */
    public final static function genRandString(int $len) : string
    {
        return bin2hex(random_bytes($len));
    }

    /**
     * Explode the string with multiple delimiters
     * @param array $delimiters List of all delimiters
     * @param string $string Text which need to split
     * @return array Result of explode the string
     */
    public final static function multiExplode(array $delimiters, string $string) : array
    {
        // Replace all characters which is on $delimiters with only first character
        $ready = str_replace($delimiters, $delimiters[0], $string);

        // Split the string with only first character
        return explode($delimiters[0], $ready);
    }
}
