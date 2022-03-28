<?php

namespace Engine\Validation;

use Engine\ErrorHandler\ErrorHandler;
use Engine\ErrorHandler\Production\UserException;
use Engine\Globalization\Language;
use Engine\Http\StatusCodes;

/**
 * Static class for validate the Number variables
 * @package Engine\Validation
 */
class Number
{
    /**
     * Check do variable is number and convert it to integer
     * @param string|int $number The value of the variable
     * @param string $name The name of the variable
     * @return bool|int The validated variable or the boolean => false is not correct
     */
    public final static function int($number, $name)
    {
        // Check do number is integer
        if (is_numeric($number) && strpos($number, '.') === FALSE) {
            return $number;
        }

        return UserException::addExceptions(
            StatusCodes::$_BAD_REQUEST,
            Language::textLanguageConverter("the_value_of+<$name>+is_not_integer"),
            $name
        );
    }

    /**
     * Check do variable is number and convert it to floating point
     * @param string|float $number The value of the variable
     * @param string $name The name of the variable
     * @return bool|float The validated variable or the boolean => false is not correct
     */
    public final static function float($number, $name)
    {
        if (is_numeric($number)) {
            return $number;
        }

        return UserException::addExceptions(
            StatusCodes::$_BAD_REQUEST,
            Language::textLanguageConverter("the_value_of+<$name>+is_not_float"),
            $name
        );
    }

    /**
     * Check do variable is less than second variable $max
     * @param string|int|float $number The value of the variable
     * @param string|int|float $max The maximum possible value
     * @param string $name The name of the variable
     * @return bool|mixed The validated variable or the boolean => false is not correct
     */
    public final static function less($number, $max, $name)
    {
        // Check do developer set here correct value
        if (!is_numeric($max)) {
            new ErrorHandler(
                StatusCodes::$_INTERNAL_SERVER_ERROR,
                'The Variable $max is required to be number!'
            );
        }

        if (!is_numeric($number)) {
            return UserException::addExceptions(
                StatusCodes::$_BAD_REQUEST,
                Language::textLanguageConverter("the_value_of+<$name>+is_not_number"),
                $name
            );
        }

        if ((float)$max > (float)$number) {
            return $number;
        }

        return UserException::addExceptions(
            StatusCodes::$_BAD_REQUEST,
            Language::textLanguageConverter("the_value_of+<$name>+is_bigger+<$max>"),
            $name
        );
    }

    /**
     * Check do variable is greater than second variable ($min)
     * @param string|int|float $number The value of the variable
     * @param string|int|float $min The minimum possible value
     * @param string $name The name of the variable
     * @return bool|mixed The validated variable or the boolean => false is not correct
     */
    public final static function greater($number, $min, $name)
    {
        // Check do developer set here correct value
        if (!is_numeric($min)) {
            new ErrorHandler(
                StatusCodes::$_INTERNAL_SERVER_ERROR,
                'The Variable $min is required to be number!'
            );
        }

        if (!is_numeric($number)) {
            return UserException::addExceptions(
                StatusCodes::$_BAD_REQUEST,
                Language::textLanguageConverter("the_value_of+<$name>+is_not_number"),
                $name
            );
        }

        if ((float)$min < (float)$number) {
            return $number;
        }

        return UserException::addExceptions(
            StatusCodes::$_BAD_REQUEST,
            Language::textLanguageConverter("the_value_of+<$name>+is_less+<$min>"),
            $name
        );
    }

    /**
     * Check do variable is have exact length of characters
     * @param string|int|float $digits The value of the variable
     * @param string|int $len The length of digits on string
     * @param string $name The name of the variable
     * @return bool|mixed The validated variable or the boolean => false is not correct
     */
    public final static function length($digits, $len, $name)
    {
        // Check do developer set here correct value
        if (!is_numeric($len)) {
            new ErrorHandler(
                StatusCodes::$_INTERNAL_SERVER_ERROR,
                'The Variable $len is required to be number!'
            );
        }

        if (strlen($digits) != $len) {
            return UserException::addExceptions(
                StatusCodes::$_BAD_REQUEST,
                $name . Language::getLanguageResource()['short_long'],
                $name
            );
        } else if (!is_numeric($digits)) {
            return UserException::addExceptions(
                StatusCodes::$_BAD_REQUEST,
                $name . Language::getLanguageResource()['not_correct'],
                $name
            );
        }

        return $digits;
    }

    /**
     * Check do variable has equal or less of the $len characters
     * @param string|int|float $digits The value of the variable
     * @param string|int $len The length of digits on string
     * @param string $name The name of the variable
     * @return bool|mixed The validated variable or the boolean => false is not correct
     */
    public final static function max($digits, $len, $name)
    {
        // Check do developer set here correct value
        if (!is_numeric($len)) {
            new ErrorHandler(
                StatusCodes::$_INTERNAL_SERVER_ERROR,
                'The Variable $len is required to be number!'
            );
        }

        if (is_numeric($digits) && strlen($digits) <= $len) {
            return $digits;
        }

        return UserException::addExceptions(
            StatusCodes::$_BAD_REQUEST,
            Language::textLanguageConverter("the_value_of+<$name>+much_digits"),
            $name
        );
    }

    /**
     * Check do variable has equal or more of the $len characters
     * @param string|int|float $digits The value of the variable
     * @param string|int $len The length of digits on string
     * @param string $name The name of the variable
     * @return bool|mixed The validated variable or the boolean => false is not correct
     */
    public final static function min($digits, $len, $name)
    {
        if (!is_numeric($len)) {
            new ErrorHandler(
                StatusCodes::$_INTERNAL_SERVER_ERROR,
                'The Variable $len is required to be number!'
            );
        }

        if (is_numeric($digits) && strlen($digits) >= $len) {
            return $digits;
        }

        return UserException::addExceptions(
            StatusCodes::$_BAD_REQUEST,
            Language::textLanguageConverter("the_value_of+<$name>+short_digits"),
            $name
        );
    }
}
