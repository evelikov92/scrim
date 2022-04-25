import { GET_LOGGED_USER, LOG_IN, LOG_OUT, REGISTRATION, EDIT_ACCOUNT } from "../../../../public/src/actions/types";
import account from '../../../../public/src/reducers/account';
import reducer from '../../../../public/src/reducers';

describe('Test Account reducers', () => {
    const user = {
        id: 1,
        username: 'administrator',
        group: 1
    };

    it('User login automatically', () => {
        expect(account(undefined, { type: GET_LOGGED_USER, payload: user })).toEqual(user);
    });
    it('User make registration', () => {
        expect(account(undefined, { type: LOG_IN, payload: user })).toEqual(user);
    });
    it('User login on the system', () => {
        expect(account(undefined, { type: REGISTRATION, payload: user })).toEqual(user);
    });
    it('User chagne the account', () => {
        expect(account(user, { type: EDIT_ACCOUNT, payload: { username: 'admin' } }))
            .toEqual({ id: 1, group: 1, username: 'admin' });
    });

    it('User logout from system', () => {
        expect(reducer(undefined, { type: LOG_OUT })).toEqual({
            account: {},
            error: {},
            form: {},
            language: {}
        });
    });
});
