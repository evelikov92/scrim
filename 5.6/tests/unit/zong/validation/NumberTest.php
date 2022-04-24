<?php

use OldEngine\Http\StatusCodes;
use OldEngine\Validation\Number;

/**
 *
 */
class NumberTest extends PHPUnit\Framework\TestCase
{
    /**
     *
     */
    public function testInitReturn()
    {
        $this->assertInternalType(
            'string', Number::int('55', 'digit'),
            'Expect return integer type'
        );

        $this->assertFalse(
            Number::int('55.5', 'digit'),
            'Expect return false because that is floating point'
        );

        $this->assertEquals(
            Number::int('55', 'digit'), '55',
            'Expect return true because 55.5 int is 55'
        );

        $this->assertFalse(
            Number::int('sss2', 'digit'),
            'Expect return User Exception and false'
        );

        $this->assertFalse(
            Number::int('213s', 'digit'),
            'Expect return User Exception and false'
        );
    }

    /**
     *
     */
    public function testFloatReturn()
    {
        $this->assertInternalType(
            'string', Number::float('55', 'digit'),
            'Expect return floating point type'
        );

        $this->assertInternalType(
            'string', Number::float('55.5', 'digit'),
            'Expect return again floating point type'
        );

        $this->assertEquals(
            Number::float('55.5', 'digit'), '55.5',
            'Expect return true because 55.5 float is 55.5'
        );

        $this->assertEquals(
            Number::float('55', 'digit'), '55',
            'Expect return true because 55 float is 55.0'
        );

        $this->assertFalse(
            Number::int('213,2a', 'digit'),
            'Expect return User Exception and false'
        );
    }

    /**
     *
     */
    public function testLessThan()
    {
        $this->assertFalse(
            Number::less('23.2a', 55, 'digit'),
            'Expect return User Exception and false'
        );

        $this->assertFalse(
            Number::less(23, 20, 'digit'),
            'Expect return User Exception and false because number is bigger not less'
        );

        $this->assertEquals(
            Number::less(20, 23, 'digit'), 20,
            'Expect to return same variable what I give'
        );

        $this->expectExceptionMessage('The Variable $max is required to be number!');
        $this->expectException(\Exception::class);
        $this->expectExceptionCode(StatusCodes::$_INTERNAL_SERVER_ERROR);
        Number::less(23, 'blah', 'digit');
    }

    /**
     *
     */
    public function testGreaterThan()
    {
        $this->assertFalse(
            Number::greater('23.2a', 20, 'digit'),
            'Expect return User Exception and false'
        );

        $this->assertFalse(
            Number::greater(23, 28, 'digit'),
            'Expect return User Exception and false because number is less not bigger'
        );

        $this->assertEquals(
            Number::greater(28, 23, 'digit'), 28,
            'Expect to return same variable what I give'
        );

        $this->expectExceptionMessage('The Variable $min is required to be number!');
        $this->expectException(\Exception::class);
        $this->expectExceptionCode(StatusCodes::$_INTERNAL_SERVER_ERROR);
        Number::greater(23, 'blah', 'digit');
    }

    public function testLength()
    {
        $this->assertEquals(
            Number::length(232, 3, 'digit'), 232,
            'Expect return true because 232 is exact 3 characters'
        );

        $this->assertFalse(
            Number::length(232, 4, 'digit'),
            'Expect return User Exception and false because 232 is not 4 characters'
        );

        $this->expectExceptionMessage('The Variable $len is required to be number!');
        $this->expectException(\Exception::class);
        $this->expectExceptionCode(StatusCodes::$_INTERNAL_SERVER_ERROR);
        Number::length(23, 'blah', 'digit');
    }

    public function testMax()
    {
        $this->assertEquals(
            Number::max(232, 4, 'digit'), 232,
            'Expect return true because 232 is exact less or equal to 3 characters'
        );

        $this->assertFalse(
            Number::max(24232, 4, 'digit'),
            'Expect return User Exception and false because 24232 is not more of 4 characters'
        );

        $this->expectExceptionMessage('The Variable $len is required to be number!');
        $this->expectException(\Exception::class);
        $this->expectExceptionCode(StatusCodes::$_INTERNAL_SERVER_ERROR);
        Number::length(23, 'blah', 'digit');
    }

    public function testMin()
    {
        $this->assertEquals(
            Number::min(232, 2, 'digit'), 232,
            'Expect return true because 232 is exact more or equal to 3 characters'
        );

        $this->assertFalse(
            Number::min(24232, 8, 'digit'),
            'Expect return User Exception and false because 24232 is less of 8 characters'
        );

        $this->expectExceptionMessage('The Variable $len is required to be number!');
        $this->expectException(\Exception::class);
        $this->expectExceptionCode(StatusCodes::$_INTERNAL_SERVER_ERROR);
        Number::length(23, 'blah', 'digit');
    }
}