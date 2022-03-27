<?php

namespace Engine\User\Auth;

use Engine\Database\MySqlQuery;
use Engine\Email\Email;
use Engine\Environment;
use Engine\Globalization\Language;
use Engine\Http\Request;
use Engine\Http\Response;
use Engine\Http\StatusCodes;
use Engine\Types\Text;
use Engine\User\Data\Session;

/**
 * That Class will care about the user authentication on the system
 * @package Engine\User\Auth
 */
class Authentication extends Auth
{
    /**
     * Password token expired time on seconds
     * @var int
     */
    private static $_PASSWORD_TOKEN_TIME_REMAINS = 3600; // 1 hour

    /**
     * Get logged user on the system
     * @param string|array $columns What information will get from database
     * @return array Logged user
     */
    public final static function getLoggedUser($columns)
    {
        // Check on session
        $user = Request::getInstance()->user();
        if (!empty($user)) {
            return $user;
        }

        // Check on cookie
        $user = TokenBasedRememberMeService::getUser($columns);
        if (!empty($user)) {
            Session::getInstance()->set('user', $user);
        }

        return $user;
    }

    /**
     * Try to login user on the system by username and password
     * @param string $username Username of the user
     * @param string $password Password of the user
     * @param string $columns Which columns of database want to get
     * @return array Logged user
     */
    public final static function logIn($username, $password, $columns = '*')
    {
        $user = MySqlQuery::getInstance()->table('users')->select($columns)
            ->where('username', $username)->whereNull('is_deleted')
            ->prepare()->get()->fetchRowAssoc();

        // Check do user is find and is with same username because mysql don't do that exactly
        if (empty($user) || $user['username'] !== $username) {
            sleep(10);
            return [];
        }

        if (parent::_passwordVerify($password, $user['password'])) {
            unset($user['password'], $user['is_deleted']);
            $user['name'] = $user['username'];

            // Set user on session and return the user
            Session::getInstance()->set('user', $user);
            return $user;
        }

        // Put sleep for 5 seconds if password is not verified
        sleep(5);
        return [];
    }

    /**
     * Log out the user from the system
     */
    public final static function logOut()
    {
        TokenBasedRememberMeService::remove();
        Session::getInstance()->set('user', []);
    }

    /**
     * Send Email to user for can change the password with new one
     * @param string $email User email
     */
    public final static function forgotPassword($email)
    {
        $db = MySqlQuery::getInstance();

        // Find user with that email
        $user = $db->select('id, username')->table('users')
            ->where('email', $email)->whereNull('is_deleted')
            ->prepare()->get()->fetchRowAssoc();

        if (empty($user)) {
            Response::getInstance()
                ->statusCode(StatusCodes::$_NOT_FOUND)
                ->json([ 'message' => Language::getLanguageResource()['user_not_found'] ])
                ->send();
        }

        // Create recovery password tokens
        $selector = Text::genRandString(18);
        $verifier = Text::genRandString(12);
        $db->table('password_tokens')->add([ 'user_id', 'selector', 'verifier' ])
            ->prepare()->setParams([ $user['id'], parent::_generateTokenHashString($selector), parent::_generateTokenHashString($verifier) ])->execute();

        // Send email to user for can change the password
        $text = Language::getLanguageResource();
        Email::getInstance()->sendEmail(
            $email,
            'forgot_password',
            [
                'selector' => $selector,
                'verifier' => $verifier,
				'username' => $user['username'],
                'link' => Environment::get('APP_DOMAIN') . 'account/set-password'
            ],
            'Forgotten password'
        );
    }

    /**
     * Update the user password on database
     * @param string $selector Forgot password user selector key
     * @param string $verifier Forgot password user verifier key
     * @param string $password New user password
     */
    public final static function changePassword($selector, $verifier,  $password)
    {
        $db = MySqlQuery::getInstance();

        $info = $db->table('password_tokens')->select('*')
            ->where('selector', parent::_generateTokenHashString($selector))
            ->whereNull('is_deleted')
            ->prepare()->get()->fetchRowAssoc();

        if (empty($info)) { // Token is not correct
            Response::getInstance()
                ->statusCode(StatusCodes::$_NOT_ACCEPTABLE)
                ->json([ 'message' => Language::getLanguageResource()['recovery_token_not_found'] ])
                ->send();
        } else if (strtotime($info['created_at']) + self::$_PASSWORD_TOKEN_TIME_REMAINS < time()) { // Token is out of date
            Response::getInstance()
                ->statusCode(StatusCodes::$_NOT_ACCEPTABLE)
                ->json([ 'message' => Language::getLanguageResource()['password_token_time_remains_over'] ])
                ->send();
        } else if (!empty($info['is_deleted'])) { // Token is used before
            Response::getInstance()
                ->statusCode(StatusCodes::$_NOT_ACCEPTABLE)
                ->json([ 'message' => Language::getLanguageResource()['password_token_is_used_before'] ])
                ->send();
        } else if ($info['verifier'] !== parent::_generateTokenHashString($verifier)) { // Verifier token is not the same
            // Remove the token to not used it twice
            $db->table('password_tokens')->update([ 'is_deleted' ])->where('id')
                ->prepare()->setParams([ 1, $info['id'] ])->execute();

            Response::getInstance()
                ->statusCode(StatusCodes::$_NOT_ACCEPTABLE)
                ->json([ 'message' => Language::getLanguageResource()['password_token_not_verified'] ])
                ->send();
        }

        // Change the password if user is not removed
        $db->table('users')->update([ 'password' ])->where('id')->whereNull('is_deleted')
            ->prepare()->setParams([ parent::_generateHashString($password), $info['user_id'] ])->execute();

        // Remove the token to not used it twice
        $db->table('password_tokens')->update([ 'is_deleted' ])->where('id')
            ->prepare()->setParams([ 1, $info['id'] ])->execute();
    }
}
