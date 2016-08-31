import request from './request';
import {
    validateEmail,
    validatePassword,
    validateCaptcha
} from './validate';

const api = '/accounts/signin';
const v = '1.0';
const method = 'POST';

export function signin(email, password, captcha, captchaId, remember) {
    const emailError = validateEmail(email);
    const pswError = validatePassword(password);
    const captchaError = validateCaptcha(captcha);

    const errs = {
        emailError,
        pswError,
        captchaError
    };

    const data = new Map([
        ['email', email],
        ['password', password],
        ['remember', remember],
        ['captchaId', captchaId],
        ['captcha', captcha]
    ]);

    return request({
        api,
        v,
        method,
        errs,
        data
    });
}