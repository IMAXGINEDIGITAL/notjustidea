import request from './request';
import {
    validateEmail,
    validatePassword,
    validateConfirmPassword,
    validateCaptcha
} from './validate';

const api = '/accounts/signup';
const v = '1.0';
const method = 'POST';

export function signup(email, password, confirmPassword, captchaId, captcha) {
    const emailError = validateEmail(email);
    const pswError = validatePassword(password);
    const confirmPswError = validateConfirmPassword(password, confirmPassword);
    const captchaError = validateCaptcha(captcha);

    const errs = {
        emailError,
        pswError,
        confirmPswError,
        captchaError
    };

    const data = new Map([
        ['email', email],
        ['password', password],
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