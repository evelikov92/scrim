<?php

namespace App\Controllers;

use Engine\Http\BaseController;
use Engine\Http\StatusCodes;
use Engine\User\Auth\Authentication;
use Engine\User\Auth\Authorization;
use Engine\User\Auth\TokenBasedRememberMeService;
use Engine\Validation\Validator;

/**
 * Manage the account do is successfully authenticated/authorized/logout on the application.
 * @package App\Controllers
 */
class AccountController extends BaseController
{
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Check do username is already used from another account
     */
    public function checkUsername()
    {
        $username = $this->request->inputParam('username', 'text|required|xss');
        $this->checkErrors();

        $user = $this->_db->table('users')->select('id')
            ->where('username', $username)->whereNull('is_deleted')
            ->prepare()->get()->fetchRowAssoc();

        if (!empty($user)) {
            $this->response
                ->statusCode(StatusCodes::$_NOT_ACCEPTABLE)
                ->json([ 'errors' => [ 'username' => $this->resources('username_is_used') ] ])
                ->send();
        }

        // Send back flag which is tell that username is not used from anyone account on the system
        $this->response
            ->statusCode(StatusCodes::$_OK)
            ->flag(1)
            ->send();
    }

    /**
     * Check do email is already used from another account
     */
    public function checkEmail()
    {
        $email = $this->request->inputParam('Email', 'text|required|xss|email');
        $this->checkErrors();

        $user = $this->_db->table('users')->select('id')
            ->where('email', $email)->whereNull('is_deleted')
            ->prepare()->get()->fetchRowAssoc();

        if (!empty($user)) {
            $this->response
                ->statusCode(StatusCodes::$_NOT_ACCEPTABLE)
                ->json([ 'errors' => [ 'Email' => $this->resources('email_is_used') ] ])
                ->send();
        }

        // Send back flag which is tell that email is not used from anyone account on the system
        $this->response
            ->statusCode(StatusCodes::$_OK)
            ->flag(1)
            ->send();
    }

    /**
     * Register new user into the system
     */
    public function registration()
    {
        $params = $this->request->inputParams($this->config('auth', 'registration_fields'));
        $this->checkErrors();

        $params['created_at'] = $this->_date_time;
        $user = Authorization::registration($params, $this->config('auth', 'user_auto_login'));

        $this->response
            ->statusCode(StatusCodes::$_OK)
            ->json($user)
            ->send();
    }

    /**
     * User login into the system
     */
    public function login()
    {
        $params = $this->request->inputParams($this->config('auth', 'login_fields'));
        $this->checkErrors();

        $user = Authentication::logIn($params['username'], $params['password']);

        // Check do user is authenticated correctly
        if (empty($user)) {
            $this->response
                ->statusCode(StatusCodes::$_NOT_ACCEPTABLE)
                ->json([ 'message' => $this->resources('authentication_failed') ])
                ->send();
        }

        if ($params['remember_me']) {
            // Save the cookie for current user, for can later user login automatically
            TokenBasedRememberMeService::remember($user['id']);
        }

        // Remove the id of the user before send to the client.
        // Client doesn't need to know the id of the user.
        unset($user['id']);

        // Send back the user which is successfully authenticated
        $this->response
            ->statusCode(StatusCodes::$_OK)
            ->json($user)
            ->send();
    }

    /**
     * Send authenticated user to the (browser) (if is have one)
     */
    public function isLogin()
    {
        $this->response
            ->statusCode(StatusCodes::$_OK)
            ->json(Authentication::getLoggedUser($this->config('auth', 'user_public_columns')))
            ->send();
    }

    /**
     * Logout the user from the system
     */
    public function logout()
    {
        Authentication::logOut();

        // Send flag is logout successfully
        $this->response
            ->statusCode(StatusCodes::$_OK)
            ->flag(1)
            ->send();
    }

    /**
     * Activate account for the system
     * @param string $token Authorization token for new created account, which is used to authorized account on system while is not active
     */
    public function activateAccount(string $token)
    {
        $token = Validator::validate('token', $token, 'text|required|xss|length:34');
        $this->checkErrors();

        Authorization::activateUser($token);

        // Send flag is activate successfully
        $this->response
            ->statusCode(StatusCodes::$_OK)
            ->flag(1)
            ->send();
    }

    /**
     * User is forgot the password.
     * He will give to us their email and the system will send email for can change the password
     * If email is found on database and the user is not deleted (disabled).
     */
    public function forgotPassword()
    {
        $email = $this->request->inputParam('email', 'text|xss|email');
        $this->checkErrors();

        Authentication::forgotPassword($email);

        // Send flag is send email for change password successfully
        $this->response
            ->statusCode(StatusCodes::$_OK)
            ->flag(1)
            ->send();
    }

    /**
     * User set new password on the own account
     * The requirements for set new password is:
     * - selector: Included on url which user is click for set new password
     * - verifier: Random string which user is see and need to copy/paste from Email
     * - password: New password of the user (minimum 6 symbols)
     * - confirm_password: To be same password as password field
     * @param string $selector User Authorization token for change the password. The selector is on the end of the url
     */
    public function setPassword(string $selector)
    {
        $selector = Validator::validate('token', $selector, 'text|required|length:36');
        $params = $this->request->inputParams($this->config('auth', 'change_password_fields'));
        $this->checkErrors();

        if ($params['confirm_password'] !== $params['password']) {
            $this->response
                ->statusCode(StatusCodes::$_BAD_REQUEST)
                ->json([ 'message' => $this->resources('password_not_matched') ])
                ->send();
        }

        Authentication::changePassword($selector, $params['verifier'], $params['password']);

        // Send flag is password update successfully
        $this->response
            ->statusCode(StatusCodes::$_OK)
            ->flag(1)
            ->send();
    }
}
