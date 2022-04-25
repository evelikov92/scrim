<?php

namespace Engine\User\Auth;

use Engine\Database\MySqlQuery;

/**
 * That class is responsible for hashing and verify the user password
 */
abstract class Auth
{
    /**
     * Generate hash string for specific password
     * @param string $password Password of the user
     * @return bool|string Hashed string for current password
     */
    protected static function _generateHashString(string $password) : bool|string
    {
        return password_hash($password, PASSWORD_BCRYPT, [ 'cost' => 14 ]);
    }

    /**
     * Generate hash token for can store on database
     * @param string $token Random token for forgot password authorization
     * @return string Hashed token which will save on database
     */
    protected static function _generateTokenHashString(string $token) : string
    {
        return hash('sha256', $token);
    }

    /**
     * Verify the user password
     * @param string $password User password
     * @param string $hash Hashed string on database
     * @return bool Do the password is correct
     */
    protected static function _passwordVerify(string $password, string $hash) : bool
    {
        if (password_verify($password, $hash)) {
            if (password_needs_rehash($hash, PASSWORD_BCRYPT)) {
                // Update the hashing string with new algorithm
                MySqlQuery::getInstance()
                    ->table('users')->update([ 'password' ])->where('password')
                    ->prepare()->setParams([ self::_generateHashString($password), $hash ])->execute();
            }

            return true;
        }

        return false;
    }
}
