<?php

namespace Engine\User\Data;

use Engine\ErrorHandler\Production\UserException;
use Engine\Globalization\Language;
use Engine\Http\StatusCodes;
use Engine\Routes\Route;
use Engine\Validation\Validator;

/**
 * That Class is responsible for get correct user input value.
 * With some kind validation
 * @package Frame\User\Data
 */
class Input
{
    /**
     * Get the user input parameters send it to server
     * @param string|null $key The name of the Input key
     * @param string|null $validate List of rules which the client need to be correct
     * @return array|mixed The value of the User Inputs (possible only one, possible all, possible many elements)
     */
    public static function getRequestParam(string $key = null, string $validate = null)
    {
        $params = [];

        $contentType = explode(';', $_SERVER['CONTENT_TYPE']);
        if (in_array('application/json', $contentType)) { // Is JSON
            return self::getJsonParams($key, $validate);
        }

        // Normal version
        $method = Route::getRequestMethod();
        if ($method === 'get') {
            if ((!isset($_GET[$key]) || empty($_GET[$key])) &&
                !empty($validate) && strpos($validate, '|required') === false) { // Input value with that key is not found and is not required
                return null;
            } else if (!empty($key)) {
                if (isset($_GET[$key])) { // Is required and is exist
                    return Validator::validate(filter_var($key), htmlspecialchars(filter_input(INPUT_GET, $key)), $validate);
                } else { // Is required and is not exist
                    return UserException::addExceptions(
                        StatusCodes::$_BAD_REQUEST,
                        Language::textLanguageConverter("the_value_of+<$key>+is_required"),
                        $key
                    );
//                    return Validator::validate(filter_var($key), '', $validate);
                }
            } else {
                return $_GET;
            }
        } else if ($method === 'post') {
            if ((!isset($_POST[$key]) || empty($_POST[$key])) &&
                !empty($validate) && strpos($validate, '|required') === false) { // Input value with that key is not found and is not required
                return null;
            } else if (!empty($key)) {
                if (isset($_POST[$key])) { // Is required and is exist
                    return Validator::validate(filter_var($key), htmlspecialchars(filter_input(INPUT_POST, $key)), $validate);
                } else { // Is required and is not exist
                    return UserException::addExceptions(
                        StatusCodes::$_BAD_REQUEST,
                        Language::textLanguageConverter("the_value_of+<$key>+is_required"),
                        $key
                    );
//                    return Validator::validate(filter_var($key), '', $validate);
                }
            } else {
                return $_POST;
            }
        } else { // Get PUT, DELETE, PATCH properties from request
            parse_str(file_get_contents('php://input'), $params);
        }

        if ((!isset($params[$key]) || empty($params[$key])) &&
            !empty($validate) && strpos($validate, '|required') === false) { // Input value with that key is not found and is not required
            return null;
        } else if (!empty($key)) {
            if (isset($params[$key])) { // Is required and is exist
                return Validator::validate(filter_var($key), htmlspecialchars($params[filter_var($key)]), $validate);
            } else { // Is required and is not exist
                return UserException::addExceptions(
                    StatusCodes::$_BAD_REQUEST,
                    Language::textLanguageConverter("the_value_of+<$key>+is_required"),
                    $key
                );
//                return Validator::validate(filter_var($key), '', $validate);
            }
        } else {
            return $params;
        }
    }

    /**
     * Get user variables send from browser by json type
     * @param string $key The name of the Input key
     * @param string $validate List of rules which the client need to be correct
     * @return array|mixed The value of the User Inputs (possible only one, possible all, possible many elements)
     */
    private static function getJsonParams(string $key, string $validate = null)
    {
        $rawBody = file_get_contents('php://input'); // Read body
        $params = get_object_vars(json_decode($rawBody)); // Initialize default data array

        if ((!isset($params[$key]) || empty($params[$key])) &&
            !empty($validate) && strpos($validate, '|required') === false) { // Input value with that key is not found and is not required
            return null;
        } else if (!empty($key)) {
            if (isset($params[$key])) { // Is required and is exist
                return Validator::validate(filter_var($key), htmlspecialchars($params[filter_var($key)]), $validate);
            } else { // Is required and is not exist
                return UserException::addExceptions(
                    StatusCodes::$_BAD_REQUEST,
                    Language::textLanguageConverter("the_value_of+<$key>+is_required"),
                    $key
                );
//                return Validator::validate(filter_var($key), '', $validate);
            }
        } else {
            return $params;
        }
    }
}
