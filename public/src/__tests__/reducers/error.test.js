import { ADD_ERROR, REMOVE_ERROR } from "../../../../public/src/actions/types";
import error from '../../../../public/src/reducers/error';

describe('Test Error state', () => {
    const err = { status: 406, statusText: 'NOT_ACCEPTABLE', data: { message: 'Some stupid message' } };
    const addError = { type: ADD_ERROR, error: err };
    const removeError = { type: REMOVE_ERROR };

    it('Has mistake and is return some state', () => {
        expect(error(undefined, addError)).toEqual(err);
    });

    // TODO the test is not correct
    it('Is not have any mistake already', () => {
        expect(error(undefined, removeError)).toEqual({});
    });
});
