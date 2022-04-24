<?php

namespace OldEngine\Cache;
use OldEngine\Config;

/**
 *
 * @package OldEngine\Cache
 */
class File
{
    private static $_CACHE_MAX_TIME = 3600; // 1 hour

    /**
     *
     * @param string $file
     * @return string
     */
    public final static function read($file)
    {
        $file = realpath(self::_getCacheDirectory() . $file);
        $lastModified = filemtime($file);

        if ($lastModified + self::$_CACHE_MAX_TIME < time()) {
            return '';
        }

        if (file_exists($file) && is_file($file) && is_readable($file)) {
            return file_get_contents($file);
        }

        return '';
	}

    /**
     *
     * @param mixed $data
     * @param string $file
     */
    public final static function write($data, $file)
    {
        $dir = self::_getCacheDirectory();
        if (is_dir($dir)) {
            file_put_contents($dir . $file, $data);
        }
    }

    /**
     *
     * @return string
     */
    private static function _getCacheDirectory()
    {
        return Config::getInstance()->get('app', 'cache_dir');
    }
}
