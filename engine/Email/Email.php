<?php

namespace Engine\Email;

use Engine\Common;
use Engine\Config;
use Engine\ErrorHandler\ErrorHandler;
use Engine\Http\StatusCodes;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

/**
 * That Class is help to send Email to the users.
 * @package Engine\Email
 */
class Email
{
    /**
     * Creator of Email Provider class
     * @var \Engine\Email\Email
     */
    private static $_instance = null;

    /**
     * Library which send Emails
     * @var null|PHPMailer
     */
    private $_mail = null;

    private function __construct()
    {
        $this->_mail = new PHPMailer(true);
        $this->_setEmailSettings();
    }

    /**
     * Send Email to the User
     * @param string $to Email address of the user
     * @param string $template HTML Template file which will used
     * @param array $data The Data which will send to the Template
     * @param string $subject What's about that email
     * @param array $files Files which is attached to the email
     */
    public function sendEmail($to, $template, $data, $subject, $files = [])
    {
        $this->_mail->clearAddresses();
        $this->_mail->addAddress($to);

        if (!empty($files)) {
            $i = count($files);
            while ($i--) {
                try { // Try to attach the file for can send with Email
                    $this->_mail->addAttachment($files[$i]);
                } catch (Exception $e) {
                    new ErrorHandler(
                        StatusCodes::$_INTERNAL_SERVER_ERROR,
                        $e->getMessage()
                    );
                }
            }
        }

        $this->_mail->Subject = $subject;

        try {
            $file = Common::$_MAIN_FOLDER . 'app/resources/templates/email/' . $template . '.tpl';
            $smarty = new \Smarty();
            $smarty->assign('data', $data);
            $this->_mail->Body = $smarty->fetch($file);
        } catch (\SmartyException $e) {
            new ErrorHandler(
                StatusCodes::$_INTERNAL_SERVER_ERROR,
                $e->getMessage()
            );
        } catch (\Exception $e) {
            new ErrorHandler(
                StatusCodes::$_INTERNAL_SERVER_ERROR,
                $e->getMessage()
            );
        }

        try {
            $this->_mail->send();
        }  catch (Exception $e) {
            new ErrorHandler(
                StatusCodes::$_INTERNAL_SERVER_ERROR,
                $e->errorMessage() //Pretty error messages from PHPMailer
            );
        }
    }

    /**
     * Set Settings for Email Provider
     */
    private function _setEmailSettings()
    {
        $settings = Config::getInstance()->get('email');

        $this->_mail->isSMTP();
        $this->_mail->Mailer = $settings['driver'];
        $this->_mail->Host = $settings['host'];
        $this->_mail->SMTPAuth = $settings['authentication'];
        $this->_mail->Port = $settings['port'];
        $this->_mail->Username = $settings['username'];
        $this->_mail->Password = $settings['password'];
        $this->_mail->SMTPSecure = $settings['encryption'];
        $this->_mail->From = $settings['from'];
        $this->_mail->FromName = $settings['name'];
        $this->_mail->isHTML(true);
    }

    /**
     * Get or Create new Email object
     * @return \Engine\Email\Email Email Provider
     */
    public static function getInstance()
    {
        if (self::$_instance === null) {
            self::$_instance = new Email();
        }
        return self::$_instance;
    }
}