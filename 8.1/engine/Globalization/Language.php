<?php

namespace Engine\Globalization;

use Engine\Common;
use Engine\Config;
use Engine\Http\Request;
use Engine\User\Data\Cookie;

/**
 * That class manage the language resources of the logged user
 * He decides which language the user will be used.
 */
class Language
{
    /**
     * All resources which will send to user, only on one language
     * @var array
     */
    private static array $_resources = [];

    /**
     * Time of the language cookie
     * @var int
     */
    private const LANGUAGE_COOKIE_TIME = 60 * 60 * 24 * 3650; // 10 Years

    /**
     * Convert few text strings keys into one with correct translation using specific template
     * EXAMPLE: new_sensors_event_message.< Humidity >with_address_event_message
     * @param string $str The keys and variables of the string
     * @return string Converted string on correct language
     */
    public static function textLanguageConverter(string $str) : string
    {
        $strings = explode('+', $str);
        self::getLanguageResource();

        $newStrings = [];
        foreach ($strings as $string) {
            if ($string[0] === '<' && $string[strlen($string) - 1] === '>') { // Is Start/Finish Variable
                $newStrings[] = trim($string, ' >< '); // Put the value to the user string
            } else { // String Language Key
                $newStrings[] = self::$_resources[$string]; // Put the language value to the user string
            }
        }

        // Join the new strings and separate it with ' '
        return implode(' ', $newStrings);
    }

    /**
     * Set the User language on the system
     * @param string $lang User language
     */
    public static function setLanguage(string $lang) : void
    {
        if (!in_array($lang, self::getAllSupportedLanguages())) {
            $lang = self::_getDefaultLanguage();
        }

        Cookie::set('lang', $lang, time() + self::LANGUAGE_COOKIE_TIME);
    }

    /**
     * Set on cookie if is not set and return the correct and supported user language
     * @return string User language
     */
    public static function setAutoLanguage() : string
    {
        $lang = Cookie::get('lang');
        $allSupportedLanguages = self::getAllSupportedLanguages();

        if (!$lang) {
            // EXAMPLE of HTTP_ACCEPT_LANGUAGE en;q=0.8, es;q=0.6, fr;q=0.4
            $accept_languages = explode(',', Request::getInstance()->server('HTTP_ACCEPT_LANGUAGE'));
            if (empty($accept_languages[0])) {
                $lang = self::_getDefaultLanguage();
                self::setLanguage($lang);
                return $lang;
            }

            for ($i = 0, $len = count($accept_languages); $i < $len; ++$i) {
                // en;q=0.8
                $lang = Common::multiExplode(['-', ';'], $accept_languages[$i])[0]; // get user [$index] language option

                // Check the language code do is support on our languages
                if (in_array($lang, $allSupportedLanguages)) {
                    Cookie::set('lang', $lang, time() + self::LANGUAGE_COOKIE_TIME); // Set User language for 10 Years
                    break;
                }
            }
        }

        if (!$lang || !in_array($lang, $allSupportedLanguages)) {
            $lang = self::_getDefaultLanguage();
            self::setLanguage($lang);
        }

        return $lang;
    }

    /**
     * Get all resource strings of the user language
     * @return array All strings for current user language
     */
    public static function getLanguageResource() : array
    {
        if (empty(self::$_resources)) {
            self::$_resources = Config::getInstance()->getConfigArray('languages', self::getLanguage());
        }

        return self::$_resources;
    }

    /**
     * Get the current user language
     * @return string User language
     */
    public static function getLanguage() : string
    {
        $lang = Cookie::get('lang');
        if (!in_array($lang, self::getAllSupportedLanguages())) {
            $lang = self::_getDefaultLanguage();
        }

        return $lang;
    }

    /**
     * Get list of all supported languages of the application
     * @return array All application languages
     */
    public static function getAllSupportedLanguages() : array
    {
        $langDir = Config::getInstance()->get('app', 'path_to_lang_files');
        $langFiles = scandir($langDir, 1);

        $languages = array_map(function ($lang) {
            $lang = str_replace('.php', '', $lang);

            if ($lang === '.' || $lang === '..') {
                return null;
            }

            return $lang;
        }, $langFiles);

        return array_values(array_filter($languages));
    }

    /**
     * Get default language of the application or return English language if is not set default.
     * @return string Default language of the application
     */
    private static function _getDefaultLanguage() : string
    {
        $lang = Config::getInstance()->get('app', 'default_lang');
        if (empty($lang)) {
            $lang = 'en';
        }

        Cookie::set('lang', $lang, time() + self::LANGUAGE_COOKIE_TIME);
        return $lang;
    }
}