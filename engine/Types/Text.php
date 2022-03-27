<?php

namespace Engine\Types;

use Engine\ErrorHandler\ErrorHandler;
use Engine\Http\StatusCodes;

/**
 * Helper Class for manipulation with Text
 * @package Engine\Types
 */
class Text
{
    /**
     * Generate random string
     * @param int $len Length of string
     * @return string Random string
     */
    public final static function genRandString($len)
    {
        if (!is_numeric($len)) {
            new ErrorHandler(
                StatusCodes::$_INTERNAL_SERVER_ERROR,
                '$len is not a number!'
            );
        }

        return bin2hex(random_bytes((int)$len));
    }

    /**
     * Explode the string with multiple delimiters
     * @param array $delimiters List of all delimiters
     * @param string $string Text which need to split
     * @return array Result of explode the string
     */
    public final static function multiExplode($delimiters, $string)
    {
        if (empty($delimiters) || !is_array($delimiters)) {
            new ErrorHandler(
                StatusCodes::$_INTERNAL_SERVER_ERROR,
                '$delimiters is not array!'
            );
        }
        if (empty($string) || !is_string($string)) {
            new ErrorHandler(
                StatusCodes::$_INTERNAL_SERVER_ERROR,
                '$string is not a string!'
            );
        }

        // Replace all characters which is on $delimiters with only first character
        $ready = str_replace($delimiters, $delimiters[0], $string);

        // Split the string with only first character
        return explode($delimiters[0], $ready);
    }
}
