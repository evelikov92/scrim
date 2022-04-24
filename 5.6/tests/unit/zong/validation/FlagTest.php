<?php

use OldEngine\Validation\Flag;

/**
 *
 */
class FlagTest extends PHPUnit\Framework\TestCase
{
    /**
     *
     */
    public function testFlagValidation()
    {
        $this->assertTrue(
            Flag::flag('true', 'flag'),
            'True string need to return TRUE'
        );

        $this->assertTrue(
            Flag::flag(1, 'flag'),
            '1 number need to return TRUE'
        );

        $this->assertTrue(
            Flag::flag(true, 'flag'),
            'True is true'
        );

        $this->assertFalse(
            Flag::flag(false, 'flag'),
            'False is false'
        );

        $this->assertFalse(
            Flag::flag(0, 'flag'),
            '0 number need to return FALSE'
        );

        $this->assertFalse(
            Flag::flag('false', 'flag'),
            'False string need to return FALSE'
        );

        $this->assertInternalType(
            'bool', Flag::flag(true, 'flag'),
            'Expect to return bool'
        );

        $this->assertFalse(
            Flag::flag('sss', 'flag'),
            'Expect to return false and save it on User Exception'
        );
    }
}
