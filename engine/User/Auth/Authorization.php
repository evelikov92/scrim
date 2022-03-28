<?php

namespace Engine\User\Auth;

use Engine\Database\MySqlQuery;
use Engine\Email\Email;
use Engine\Environment;
use Engine\ErrorHandler\ErrorHandler;
use Engine\Globalization\Language;
use Engine\Http\Response;
use Engine\Http\StatusCodes;
use Engine\Types\Text;
use Engine\User\Data\Session;

/**
 * That class make the registration of the user on the system
 * @package Engine\User\Auth
 */
class Authorization extends Auth
{
    /**
     * Activate the user account
     * @param string $token Verification token
     */
    public static function activateUser($token)
    {
        $db = MySqlQuery::getInstance();
        $user = $db->select('id')->table('users')->where('token', parent::_generateTokenHashString($token))
            ->prepare()->get()->fetchRowAssoc();

        if (empty($user)) {
            Response::getInstance()
                ->statusCode(StatusCodes::$_NOT_ACCEPTABLE)
                ->json([ 'message' => Language::getLanguageResource()['activation_account_failed'] ])
                ->send();
        }

        $db->table('users')->update([ 'is_deleted' ])->where('id')
            ->prepare()->setParams([ NULL, $user['id'] ])->execute();
    }

    /**
     * Register the new user on the system
     * @param array $user List of information about user
     * @param bool $autoLogin Do is auto login on the system
     * @return array Registered user on the system
     */
    public static function registration($user = [], $autoLogin = false)
    {
        if (empty($user) || empty($user['password'])) {
            new ErrorHandler(
                StatusCodes::$_INTERNAL_SERVER_ERROR,
                'Registration params is empty or password is not set it'
            );
        }

        if ($user['confirm_password'] !== $user['password']) {
            Response::getInstance()
                ->statusCode(StatusCodes::$_BAD_REQUEST)
                ->json([ 'message' => Language::getLanguageResource()['password_not_matched'] ])
                ->send();
        }

        unset($user['confirm_password']);
        $user['password'] = parent::_generateHashString($user['password']);

        if (!$autoLogin) {
            $token = Text::genRandString(17);
            $user['token'] = parent::_generateTokenHashString($token);
        }

        // Save user on database
        $user['id'] = MySqlQuery::getInstance()->table('users')->add(array_keys($user))
            ->prepare()->setParams(array_values($user))->get()->getLastInsertId();

        unset($user['password']);

        if ($autoLogin) { // Make auto login to the system
            TokenBasedRememberMeService::remember($user['id']);
            Session::getInstance()->set('user', $user);
            return $user;
        }

        // Send Email to the user
        //$user['token'] = $token;
        //Email::getInstance()->sendEmail($user['email'], 'activate_user_account', $user, 'User account activated');
        return [];
    }
}
