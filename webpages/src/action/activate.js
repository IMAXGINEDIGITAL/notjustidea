import request from './request';
import {
    validateEmail
} from './validate';

const api = '/accounts/activate';
const v = '1.0';
const method = 'GET';

export function activate(email, code) {
    const emailError = validateEmail(email);

    const errs = {
        emailError
    };

    const qs = new Map([
        ['email', email],
        ['code', code]
    ]);

    return request({
        api,
        v,
        method,
        qs,
        errs
    });
}