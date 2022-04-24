<?php

namespace OldEngine\Cache;

/**
 * Class Memory
 * @package OldEngine\Cache
 */
class Memory
{
    /**
     * @return float|int
     */
    public static function getFreeMemory()
    {
        return self::_getAvailableMemory() - self::_getUsedMemory();
    }

    /**
     * @return float|int
     */
    private static function _getUsedMemory()
    {
        return memory_get_peak_usage(true);
    }

    /**
     * @return float|int
     */
    private static function _getAvailableMemory()
    {
        $memoryAvailable = filter_var(ini_get('memory_limit'), FILTER_SANITIZE_NUMBER_INT);
        return $memoryAvailable * 1024 * 1024;
    }
}
