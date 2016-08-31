import request from './request';
import {
    validateEmail,
    validateCaptcha
} from './validate';

const api = '/accounts/retrieve';
const v = '1.0';
const method = 'GET';

export function findpsw(email, captcha, captchaId) {
    const emailError = validateEmail(email);
    const captchaError = validateCaptcha(captcha);

    const errs = {
        emailError,
        captchaError
    };

   const qs = new Map([
        ['email', email],
        ['captchaId', captchaId],
        ['captcha', captcha]
    ]);

    return request({
        api,
        v,
        method,
        errs,
        qs
    });
}