<?php

use OldEngine\Http\StatusCodes;
use OldEngine\Validation\Text;

/**
 *
 */
class TextTest extends PHPUnit\Framework\TestCase
{
    /**
     * @var string
     */
    private $test = 'test-example';

    /**
     *
     */
    public function testRequiredValidation()
    {
        $this->assertEquals(
            Text::required($this->test, 'test'), $this->test,
            'Expect return variable to be the same because the variable is available'
        );

        $this->assertInternalType(
            'string', Text::required($this->test, 'test'),
            'Expect return string'
        );

        $this->assertInternalType(
            'bool', Text::required('', 'test'),
            'Expect return bool'
        );

        $this->assertFalse(
            Text::required('', 'test'),
            'Expect if is empty to return User Exception and false'
        );

        $this->expectExceptionMessage('The $text param is not a string');
        $this->expectException(\Exception::class);
        $this->expectExceptionCode(StatusCodes::$_INTERNAL_SERVER_ERROR);
        Text::required(null, 'test');
    }

    /**
     *
     */
    public function testMinValidation()
    {
        $this->assertEquals(
            Text::min($this->test, strlen($this->test), 'test'), $this->test,
            'Expect return variable to be same because the min length is more of 6'
        );

        $this->assertInternalType(
            'string', Text::min($this->test, 6, 'test'),
            'Expect return string'
        );

        $this->assertInternalType(
            'bool', Text::min($this->test, 20, 'test'),
            'Expect return bool'
        );

        $this->assertFalse(
            Text::min($this->test, 20, 'test'),
            'Expect return User Exception and false'
        );

        $this->expectExceptionMessage('The $len is not a number');
        $this->expectException(\Exception::class);
        $this->expectExceptionCode(StatusCodes::$_INTERNAL_SERVER_ERROR);
        Text::min($this->test, 'test', 'test');
    }

    /**
     *
     */
    public function testMaxValidation()
    {
        $this->assertEquals(
            Text::max($this->test, strlen($this->test), 'test'), $this->test,
            'Expect return variable to be same because the max length is more'
        );

        $this->assertInternalType(
            'string', Text::max($this->test, 20, 'test'),
            'Expect return string'
        );

        $this->assertInternalType(
            'bool', Text::max($this->test, 6, 'test'),
            'Expect return bool'
        );

        $this->assertFalse(
            Text::max($this->test, 6, 'test'),
            'Expect return User Exception and false'
        );

        $this->expectExceptionMessage('The $len is not a number');
        $this->expectException(\Exception::class);
        $this->expectExceptionCode(StatusCodes::$_INTERNAL_SERVER_ERROR);
        Text::max($this->test, 'test', 'test');
    }

    /**
     *
     */
    public function testLengthValidation()
    {
        $this->assertEquals(
            Text::length($this->test, strlen($this->test), 'test'), $this->test,
            'Expect return variable to be same because the length is same'
        );

        $this->assertInternalType(
            'string', Text::length($this->test, strlen($this->test), 'test'),
            'Expect return string'
        );

        $this->assertInternalType(
            'bool', Text::length($this->test, 6, 'test'),
            'Expect return bool'
        );

        $this->assertFalse(
            Text::length($this->test, 6, 'test'),
            'Expect return User Exception and false'
        );

        $this->expectExceptionMessage('The $len is not a number');
        $this->expectException(\Exception::class);
        $this->expectExceptionCode(StatusCodes::$_INTERNAL_SERVER_ERROR);
        Text::length($this->test, 'test', 'test');
    }

    /**
     *
     */
    public function testStartWithValidation()
    {
        $this->assertEquals(
            Text::startWith($this->test, 'test-e', 'test'), $this->test,
            'Expect return variable to be the same because is start with test-e'
        );

        $this->assertFalse(
            Text::startWith($this->test, 'test--', 'test'),
            'Expect return User Exception and false'
        );

        $this->assertInternalType(
            'bool', Text::startWith($this->test, 'test--', 'test'),
            'Expect return bool'
        );

        $this->assertInternalType(
            'string', Text::startWith($this->test, 'test-e', 'test'),
            'Expect return string'
        );

        $this->expectExceptionMessage('The $text|$start param is not a string');
        $this->expectException(\Exception::class);
        $this->expectExceptionCode(StatusCodes::$_INTERNAL_SERVER_ERROR);
        Text::startWith($this->test, 5, 'test');
    }

    /**
     *
     */
    public function testEndWithValidation()
    {
        $this->assertEquals(
            Text::endWith($this->test, 'ple', 'test'), $this->test,
            'Expect return variable to be the same because is finish with ple'
        );

        $this->assertFalse(
            Text::endWith($this->test, 'test--', 'test'),
            'Expect return User Exception and false'
        );

        $this->assertInternalType(
            'bool', Text::endWith($this->test, 'test--', 'test'),
            'Expect return User Exception and false'
        );

        $this->assertInternalType(
            'string', Text::endWith($this->test, 'le', 'test'),
            'Expect return string'
        );

        $this->expectExceptionMessage('The $text|$end param is not a string');
        $this->expectException(\Exception::class);
        $this->expectExceptionCode(StatusCodes::$_INTERNAL_SERVER_ERROR);
        Text::endWith($this->test, 5, 'test');
    }

    /**
     *
     */
    public function testXssValidation()
    {
        $this->assertEquals(
            Text::xss($this->test), $this->test,
            'Expect return same variable'
        );

        $this->assertInternalType(
            'string', Text::xss($this->test),
            'Expect return string'
        );

        $this->expectExceptionMessage('The $text param is not a string');
        $this->expectException(\Exception::class);
        $this->expectExceptionCode(StatusCodes::$_INTERNAL_SERVER_ERROR);
        Text::xss(null);
    }

    public function testEmailValidation()
    {
        $email = 'gmail@gmail.com';

        $this->assertEquals(
            Text::email($email, 'email'), $email,
            'Expect return same variable'
        );

        $this->assertFalse(
            Text::email($this->test, 'email'),
            'Expect return User Exception and false'
        );

        $this->assertInternalType(
            'bool', Text::email($this->test, 'email'),
            'Expect return bool'
        );

        $this->assertInternalType(
            'string', Text::email($email, 'email'),
            'Expect return string'
        );

        $this->expectExceptionMessage('The $text param is not a string');
        $this->expectException(\Exception::class);
        $this->expectExceptionCode(StatusCodes::$_INTERNAL_SERVER_ERROR);
        Text::email(null, 'email');
    }
}
