<?php

use OldEngine\Validation\Validator;

/**
 *
 */
class ValidatorTest extends PHPUnit\Framework\TestCase
{
    /**
     *
     */
    public function testDoValidatorReturnValueWithoutAnyValidationRoles()
    {
        $this->assertInternalType(
            'int', Validator::validate('digit', 33),
            'Expect return integer without to validate'
        );
    }

    /**
     *
     */
    public function testDoValidatorValidateValuesWithMoreOfOneRole()
    {
        $this->assertFalse(
            Validator::validate('digit', 33, 'number|greater:34'),
            'Expect to return User Exception false because is value is less of 34'
        );

        $this->assertEquals(
            Validator::validate('text', 'str', 'text|required|length:3|xss'), 'str',
            'Expect return same string because is agree all validation methods'
        );
    }
}
