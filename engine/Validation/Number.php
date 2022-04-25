<?php

namespace Engine\Validation;

use Engine\ErrorHandler\Production\UserException;
use Engine\Globalization\Language;
use Engine\Http\StatusCodes;

/**
 * Static class for validate the Number variables
 */
class Number
{
    /**
     * Check do variable is number and convert it to integer
     * @param string $number The value of the variable
     * @param string $name The name of the variable
     * @return int|bool The validated variable or the boolean => false is not correct
     */
    public final static function int(string $number, string $name) : int|bool
    {
        // Check do number is integer
        if (is_numeric($number) && !str_contains($number, '.')) {
            return (int)$number;
        }

        return UserException::addExceptions(
            StatusCodes::BAD_REQUEST,
            Language::textLanguageConverter("the_value_of+<$name>+is_not_integer"),
            $name
        );
    }

    /**
     * Check do variable is number and convert it to floating point
     * @param string $number The value of the variable
     * @param string $name The name of the variable
     * @return float|bool The validated variable or the boolean => false is not correct
     */
    public final static function float(string $number, string $name) : float|bool
    {
        if (is_numeric($number)) {
            return (float)$number;
        }

        return UserException::addExceptions(
            StatusCodes::BAD_REQUEST,
            Language::textLanguageConverter("the_value_of+<$name>+is_not_float"),
            $name
        );
    }

    /**
     * Check do variable is less than second variable $max
     * @param float $number The value of the variable
     * @param float $max The maximum possible value
     * @param string $name The name of the variable
     * @return float|bool The validated variable or the boolean => false is not correct
     */
    public final static function less(float $number, float $max, string $name) : float|bool
    {
        if ($max > $number) {
            return $number;
        }

        return UserException::addExceptions(
            StatusCodes::BAD_REQUEST,
            Language::textLanguageConverter("the_value_of+<$name>+is_bigger+<$max>"),
            $name
        );
    }

    /**
     * Check do variable is greater than second variable ($min)
     * @param float $number The value of the variable
     * @param float $min The minimum possible value
     * @param string $name The name of the variable
     * @return float|bool The validated variable or the boolean => false is not correct
     */
    public final static function greater(float $number, float $min, string $name) : float|bool
    {
        if ($min < $number) {
            return $number;
        }

        return UserException::addExceptions(
            StatusCodes::BAD_REQUEST,
            Language::textLanguageConverter("the_value_of+<$name>+is_less+<$min>"),
            $name
        );
    }

    /**
     * Check do variable is had exact length of characters
     * @param string $digits The value of the variable
     * @param int $len The length of digits on string
     * @param string $name The name of the variable
     * @return float|bool The validated variable or the boolean => false is not correct
     */
    public final static function length(string $digits, int $len, string $name) : float|bool
    {
        if (strlen($digits) != $len) {
            return UserException::addExceptions(
                StatusCodes::BAD_REQUEST,
                $name . Language::getLanguageResource()['short_long'],
                $name
            );
        }

        return (float)$digits;
    }

    /**
     * Check do variable has equal or less of the $len characters
     * @param string $digits The value of the variable
     * @param int $len The length of digits on string
     * @param string $name The name of the variable
     * @return int|bool The validated variable or the boolean => false is not correct
     */
    public final static function max(string $digits, int $len, string $name) : int|bool
    {
        if (is_numeric($digits) && strlen($digits) <= $len) {
            return (int)$digits;
        }

        return UserException::addExceptions(
            StatusCodes::BAD_REQUEST,
            Language::textLanguageConverter("the_value_of+<$name>+much_digits"),
            $name
        );
    }

    /**
     * Check do variable has equal or more of the $len characters
     * @param string $digits The value of the variable
     * @param int $len The length of digits on string
     * @param string $name The name of the variable
     * @return int|bool The validated variable or the boolean => false is not correct
     */
    public final static function min(string $digits, int $len, string $name) : int|bool
    {
        if (is_numeric($digits) && strlen($digits) >= $len) {
            return (int)$digits;
        }

        return UserException::addExceptions(
            StatusCodes::BAD_REQUEST,
            Language::textLanguageConverter("the_value_of+<$name>+short_digits"),
            $name
        );
    }
}
