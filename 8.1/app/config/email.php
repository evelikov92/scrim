<?php

use Engine\Environment;

return [
    /**
     * The Email Provider Library used SMTP driver
     */
    'driver' => 'smtp',

    /**
     * Here you may provide the host address of the SMTP server used by your application.
     */
    'host' => Environment::get('EMAIL_HOST'),

    /**
     * This is the SMTP port used by your application to deliver e-mails to users of the application.
     * Like the host we have set this value to stay compatible with the Mailgun e-mail application by default.
     */
    'port' => 465,

    /**
     * Here you may specify the encryption protocol that should be used when the application send e-mail messages.
     * A sensible default using the transport layer security protocol should provide great security.
     */
    'encryption' => 'ssl',

    /**
     *
     */
    'authentication' => true,

    /**
     * You may wish for all e-mails sent by your application to be sent from the same address.
     * Here, you may specify a name and address that is used globally for all e-mails that are sent by your application.
     */
    'name' => Environment::get('EMAIL_NAME'),

    /**
     * You may wish for all e-mails sent by your application to be sent from the same address.
     * Here, you may specify a name and address that is used globally for all e-mails that are sent by your application.
     */
    'from' => Environment::get('EMAIL_FROM'),

    /**
     * If your SMTP server requires a username for authentication, you should set it here.
     * This will get used to authenticate with your server on connection.
     * You may also set the "password" value below this one.
     */
    'username' => Environment::get('EMAIL_USERNAME'),

    /**
     * Here you may set the password required by your SMTP server to send out messages from your application.
     * This will be given to the server on connection so that the application will be able to send messages.
     */
    'password' => Environment::get('EMAIL_PASSWORD')
];
