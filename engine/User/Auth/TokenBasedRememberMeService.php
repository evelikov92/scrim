<?php

namespace Engine\User\Auth;

use Engine\Config;
use Engine\Common;
use Engine\Database\MySqlQuery;
use Engine\User\Data\Cookie;
use Engine\Validation\Text;

/**
 * Service which is work for remember the user on the system
 * For more information You can check the https://www.site-exampe-token-based-remember-me-service.com
 */
class TokenBasedRememberMeService extends Auth
{
    /**
     * Remember me token name key
     * @var string
     */
    private static string $_REMEMBER_ME_KEY = 'remember_me';

    /**
     * Remember me token expired time on seconds
     * @var int
     */
    private static int $_REMEMBER_TOKEN_TIME_REMAINS = 1209600; // 2 weeks

    /**
     * Get Logged user from Remember Me Token
     * @param string|array $columns which columns of user is public to show
     * @return array Logged user
     */
    public final static function getUser(string|array $columns = '*') : array
    {
        $userId = self::_verify();
        if (empty($userId)) {
            return [];
        }

        // Find user with on database and return it
        $user = MySqlQuery::getInstance()->table('users')->select($columns)
            ->where('id', $userId)->whereNull('is_deleted')
            ->prepare()->get()->fetchRowAssoc();

        if (!empty($user)) {
            $user['name'] = $user['username'];
        }

        return $user;
    }

    /**
     * Remember the user on browser
     * @param int $userId The user id
     * @return int The auth_tokens id
     */
    public final static function remember(int $userId) : int
    {
        $selector = Common::genRandString(20);
        $verifier = Common::genRandString(16);

        $token = $selector . ':' . $verifier;
        Cookie::set(self::$_REMEMBER_ME_KEY, $token, time() + self::$_REMEMBER_TOKEN_TIME_REMAINS);

        return MySqlQuery::getInstance()->table('auth_tokens')->add([ 'user_id', 'selector', 'verifier' ])
            ->prepare()->setParams([ $userId, $selector, parent::_generateTokenHashString($verifier) ])->get()->getLastInsertId();
    }

    /**
     * Remove remember me token from browser
     */
    public final static function remove()
    {
        if (Cookie::checkCookieExist(self::$_REMEMBER_ME_KEY)) {
            $token = explode(':', Cookie::get(self::$_REMEMBER_ME_KEY));

            if (count($token) === 2) {
                MySqlQuery::getInstance()->table('auth_tokens')->update([ 'is_deleted' ])
                    ->where('selector')->where('verifier', 'and')->prepare()
                    ->setParams([ 1, $token[0], parent::_generateTokenHashString($token[1]) ])->execute();
            }

            Cookie::remove(self::$_REMEMBER_ME_KEY);
        }
    }

    /**
     * Verify to remember me token is valid and
     * Found user which is used that token
     * @return null|int User id who is used that remember me token
     */
    private static function _verify() : null|int
    {
        if (!Cookie::checkCookieExist(self::$_REMEMBER_ME_KEY)) {
            return null;
        }

        $token = explode(':', Cookie::get(self::$_REMEMBER_ME_KEY));
        if (count($token) === 2) {
            $auth = MySqlQuery::getInstance()->table('auth_tokens')->select('*')
                ->where('selector', $token[0])
                ->whereNull('is_deleted')
                ->prepare()->get()->fetchRowAssoc();

            if (parent::_generateTokenHashString($token[1]) === $auth['verifier']) {
                return $auth['user_id'];
            }
        }

        return null;
    }
}
