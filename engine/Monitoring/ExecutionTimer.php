<?php

namespace Engine\Monitoring;

/**
 * That Class timing the code how fast will be executed
 * @package Engine\Monitoring
 */
class ExecutionTimer
{
    /**
     * The Execution start time
     * @var int
     */
    private static $_startTime = 0;

    /**
     * The Execution stop time
     * @var int
     */
    private static $_endTime = 0;

    /**
     * Start timer for check the performance on piece of code
     */
    public final static function start()
    {
        self::$_startTime = microtime(true);
    }

    /**
     * Stop timer for check the performance on piece of code
     */
    public final static function end()
    {
        self::$_endTime =  microtime(true);
    }

    /**
     * Show the time on execution of piece of code
     * @return int Time of operation running on milliseconds
     */
    public final static function diff()
    {
        return self::$_endTime - self::$_startTime;
    }
}
