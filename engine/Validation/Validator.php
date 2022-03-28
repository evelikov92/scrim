<?php

namespace Engine\Validation;

use Engine\ErrorHandler\ErrorHandler;
use Engine\Http\StatusCodes;

/**
 * That Class is manage the all validations on the variables.
 * Example developer want validate $_POST['title'] => request([ 'title' => 'text|required|min:5|max:20' ]);
 * @package Engine\Validation
 */
class Validator
{
    /**
     * Validate the variable of the user
     * Example (text|min:10|max:40|between:10:40
     * @param string $key Name of the variable
     * @param string $value Value of the variable
     * @param string|null $conditions Condition for validated
     * @return mixed The value which client send to server or false
     */
    public final static function validate($key, $value, $conditions = null)
    {
        if (!$conditions || !is_string($conditions)) {
            return $value;
        }

        // $parts => text|min:10|max:40|required
        $parts = explode('|', $conditions);
        $className = '\Engine\Validation\\' . ucfirst($parts[0]);

        for ($i = 1, $len = count($parts); $i < $len; ++$i) {
            $vars = explode(':', $parts[$i]);
            $method = $vars[0];
            unset($vars[0]); // remove method

            if (!$method || !method_exists($className, $method)) {
                new ErrorHandler(
                    StatusCodes::$_INTERNAL_SERVER_ERROR,
                    'The Validation method is not exist!'
                );
            }

            // Put the user value first
            array_unshift($vars, trim($value));
            // Put the name of the value last
            array_push($vars, trim($key));

            if (!call_user_func_array([$className, $method], $vars)) {
                return false;
            }
        }

        return trim($value);
    }
}
