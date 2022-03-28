<?php

namespace Engine\Validation;

use Engine\ErrorHandler\ErrorHandler;
use Engine\ErrorHandler\Production\UserException;
use Engine\Globalization\Language;
use Engine\Http\StatusCodes;
use Engine\Security\XSS;

/**
 * Static class for validate the Text
 * @package Engine\Validation
 */
class Text
{
    /**
     * Check do the variable is exist and is not empty
     * @param string $text The value of the variable
     * @param string $name The name of the variable
     * @return string|bool The validated variable or the boolean => false is not correct
     */
    public final static function required($text, $name)
    {
        if (!empty($text)) {
            return $text;
        }

        return UserException::addExceptions(
            StatusCodes::$_BAD_REQUEST,
            Language::textLanguageConverter("the_value_of+<$name>+is_required"),
            $name
        );
    }

    public final static function regex($text, $regex, $name)
    {

    }

    /**
     * Check the minimum characters of the value
     * @param string $text The value of the variable
     * @param int int $len The minimum length of the value
     * @param string $name The name of the variable
     * @return string|bool The validated variable or the boolean => false is not correct
     */
    public final static function min($text, $len, $name)
    {
        if (strlen($text) >= (int)$len) {
            return $text;
        }

        return UserException::addExceptions(
            StatusCodes::$_BAD_REQUEST,
            Language::textLanguageConverter("the_value_of+<$name>+too_short"),
            $name
        );
    }

    /**
     * Check the maximum characters of the value
     * @param string $text The value of the variable
     * @param int $len The maximum length of the value
     * @param string $name The name of the variable
     * @return string|bool The validated variable or the boolean => false is not correct
     */
    public final static function max($text, $len, $name)
    {
        if (strlen($text) <= (int)$len) {
            return $text;
        }

        return UserException::addExceptions(
            StatusCodes::$_BAD_REQUEST,
            Language::textLanguageConverter("the_value_of+<$name>+too_long"),
            $name
        );
    }

    /**
     * Check the size of string is the same as length variable
     * @param string $text The value of the variable
     * @param int $length The exact length of string
     * @param string $name The name of the variable
     * @return string|bool The validated variable or the boolean => false is not correct
     */
    public final static function length($text, $length, $name)
    {
        if (strlen($text) == $length) {
            return $text;
        }

        return UserException::addExceptions(
            StatusCodes::$_BAD_REQUEST,
            Language::textLanguageConverter("the_value_of+<$name>+short_long"),
            $name
        );
    }

    /**
     * Check do text start with specific string
     * @param string $text The value of the variable
     * @param string $start The string which we looking for on the beginning
     * @param string $name The name of the variable
     * @return string|bool The validated variable or the boolean => false is not correct
     */
    public final static function startWith($text, $start, $name)
    {
        if (substr($text, 0, strlen($start)) === $start) {
            return $text;
        }

        return UserException::addExceptions(
            StatusCodes::$_BAD_REQUEST,
            Language::textLanguageConverter("the_value_of+<$name>+not_start+<$start>"),
            $name
        );
    }

    /**
     * Check do text finish with specific string
     * @param string $text The value of the variable
     * @param string $end The string which we looking on the end of text
     * @param string $name The name of the variable
     * @return string|bool The validated variable or the boolean => false is not correct
     */
    public final static function endWith($text, $end, $name)
    {
        $len = strlen($end);
        if (substr($text, strlen($text) - $len, $len) === $end) {
            return $text;
        }

        return UserException::addExceptions(
            StatusCodes::$_BAD_REQUEST,
            Language::textLanguageConverter("the_value_of+<$name>+not_end+<$end>"),
            $name
        );
    }

    /**
     * Validate the text for xss protection
     * @param string $text The value of the variable
     * @return string|bool The validated variable or the boolean => false is not correct
     */
    public final static function xss($text)
    {
        return htmlspecialchars(XSS::cleanInput($text));
    }

    /**
     * Check do the text is correct email
     * @param string $text The value of the variable
     * @param string $name The name of the variable
     * @return string|bool The validated variable or the boolean => false is not correct
     */
    public final static function email($text, $name)
    {
        if (empty($text) || filter_var($text, FILTER_VALIDATE_EMAIL) !== false) {
            return $text;
        }

        return UserException::addExceptions(
            StatusCodes::$_BAD_REQUEST,
            Language::textLanguageConverter("the_value_of+<$name>+not_email"),
            $name
        );
    }
}
