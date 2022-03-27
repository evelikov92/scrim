<?php

namespace Engine\Validation;

use Engine\ErrorHandler\Production\UserException;
use Engine\Globalization\Language;
use Engine\Http\StatusCodes;

/**
 * Static class for validate the Boolean variables
 * @package Engine\Validation
 */
class Flag
{
    /**
     * Validate the variable to be boolean value
     * @param bool $flag The value of the variable
     * @param string $name The name of the variable
     * @return bool The validated variable or the boolean => false is not correct
     */
    public final static function flag($flag, $name)
    {
        if ($flag === true || $flag === 1 || $flag === 'true' || $flag === '1') {
            return true;
        } else if ($flag === false || $flag === 0 || $flag === 'false' || $flag === '0' || $flag === '') {
            return false;
        }

        return UserException::addExceptions(
            StatusCodes::$_BAD_REQUEST,
            Language::textLanguageConverter("the_variable+<$name>+is_required"),
            $name
        );
    }
}
