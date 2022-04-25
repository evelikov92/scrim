<?php

namespace Engine\Validation;

/**
 * Static class for validate the Boolean variables
 */
class Flag
{
    /**
     * Validate the variable to be boolean value
     * @param bool $flag The value of the variable
     * @param string $name The name of the variable
     * @return bool The validated variable or the boolean => false is not correct
     */
    public final static function flag(bool $flag, string $name) : bool
    {
        return $flag;
    }
}
