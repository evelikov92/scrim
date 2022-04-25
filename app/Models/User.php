<?php

namespace App\Models;

use Engine\Model\Model;

class User extends Model
{
    public function __construct()
    {
        parent::__construct('users');
    }

    /**
     *
     * @param string $email
     * @return bool
     */
    public function checkEmail(string $email) : bool
    {
        return $this->_search('email', $email);
    }

    /**
     *
     * @param string $username
     * @return bool
     */
    public function checkUsername(string $username) : bool
    {
        return $this->_search('username', $username);
    }

    /**
     *
     * @param string $column
     * @param string $value
     * @return bool
     */
    private function _search(string $column, string $value) : bool
    {
        $user = $this->_db->table($this->_table)->select('id')
            ->where($column, $value)->whereNull('is_deleted')
            ->prepare()->get()->fetchRowAssoc();

        return !empty($user);
    }
}
