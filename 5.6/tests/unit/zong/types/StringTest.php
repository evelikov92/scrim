<?php

use OldEngine\Types\Text;
use OldEngine\Http\StatusCodes;

/**
 *
 */
class StringTest extends PHPUnit\Framework\TestCase
{
    /**
     *
     */
    public function testExplodeStringWithMultipleCharacters()
    {
        $string = 'en:us fr:Fr';
        $arr = Text::multiExplode([ ':', ' ' ], $string);

        $this->assertCount(
            4, $arr,
            'Expect to have 4 elements on Multi Explode'
        );

        $this->assertInternalType(
            'array', $arr,
            'Multi Explode expect to return array'
        );

        $this->expectExceptionMessage('$delimiters is not array!');
        $this->expectException(\Exception::class);
        $this->expectExceptionCode(StatusCodes::$_INTERNAL_SERVER_ERROR);
        Text::multiExplode([], $string);

        $this->expectExceptionMessage('String is not a string!');
        $this->expectException(\Exception::class);
        $this->expectExceptionCode(StatusCodes::$_INTERNAL_SERVER_ERROR);
        Text::multiExplode($arr, '');
    }

    /**
     *
     */
    public function testGenerateRandomSymbolsWithSpecificLength()
    {
        $str = Text::genRandString(25);

        $this->assertInternalType(
            'string', $str,
            'Get Rand Symbol expect to be string'
        );

        $this->assertEquals(
            strlen($str), 50,
            'Get Rand Symbol length of string'
        );

        $this->assertEquals(
            strlen(Text::genRandString('23')), 46,
            'Get Rand Symbol expect to not care about date type of len'
        );

        $this->expectExceptionMessage('$len is not a number!');
        $this->expectException(\Exception::class);
        $this->expectExceptionCode(StatusCodes::$_INTERNAL_SERVER_ERROR);
        Text::genRandString('test');
    }
}
