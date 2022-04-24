<?php

namespace Engine\Security;

use Engine\Common;
use Engine\User\Data\Session;

/**
 * Cross Site Request Forgery protection
 */
class Csrf
{
    /**
     * Max Time Lease before token is gone
     * @var int
     */
    private static int $_TIME_LEASE = 300; // 5 minutes token expire

    /**
     * Get CSRF token for client side
     * @return array the CSRF token id and value
     */
    public final static function getToken() : array
    {
        return [
            'token_id' => self::_getTokenId(),
            'token_val' => self::_getTokenValue()
        ];
    }

    /**
     * Verify to send tokens with tokens saved on session
     * @param string $id The CSRF id send from client
     * @param string $val The CSRF value send from client
     * @return bool Result of verification of the csrf tokens
     */
    public final static function verify(string $id, string $val) : bool
    {
        $session = Session::getInstance();
        if (hash('sha256', $session->get('old_csrf_token_id')) === $id &&
            hash('sha256', $session->get('old_csrf_token_val')) === $val) {
            return true;
        }
        if (hash('sha256', $session->get('csrf_token_id')) === $id &&
            hash('sha256', $session->get('csrf_token_val')) === $val &&
            $session->get('csrf_token_time') + self::$_TIME_LEASE > time()) {
            return true;
        }

        return false;
    }

    /**
     * Get CSRF token Id
     * @return string CSRF token id
     */
    private static function _getTokenId() : string
    {
        $id = Common::genRandString(15);

        $session = Session::getInstance();
        $session->set('old_csrf_token_id', $session->get('csrf_token_id'));
        $session->set('csrf_token_id', $id);

        return hash('sha256', $id);
    }

    /**
     * Get CSRF token value
     * @return string CSRF token value
     */
    private static function _getTokenValue() : string
    {
        $val = Common::genRandString(18);

        $session = Session::getInstance();
        $session->set('old_csrf_token_val', $session->get('csrf_token_val'));
        $session->set('csrf_token_time', time());
        $session->set('csrf_token_val', $val);

        return hash('sha256', $val);
    }
}
