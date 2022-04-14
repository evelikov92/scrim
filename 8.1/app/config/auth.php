<?php

return [
    /**
     * Do application allow User to auto login after registration
     */
    'user_auto_login' => false,

    /**
     * Log in input fields which user put and their validation
     */
    'login_fields' => [
        'username' => 'text|required|xss',
        'password' => 'text|required|xss',
        'remember_me' => 'flag|flag'
    ],

    /**
     * Registration fields input fields which user put and their validation
     */
    'registration_fields' => [
        'username' => 'text|required|xss|min:6|max:50',
        'email' => 'text|required|xss|email',
        'password' => 'text|required|xss|min:6',
        'confirm_password' => 'text|required|xss|min:6'
    ],

    /**
     * Change password input fields which user put and their validation
     */
    'change_password_fields' => [
        'password' => 'text|required|xss|min:6',
        'confirm_password' => 'text|required|xss|min:6',
        'verifier' => 'text|required|xss|length:24'
    ],

    /**
     * User public columns from database
     */
    'user_public_columns' => [ 'users.id as id', 'username', 'email', '`group`' ]
];
