import fetchapi from '../common/fetchapi';
import {
    validateEmail,
    validatePassword,
    validateConfirmPassword,
    validateCaptcha
} from './accountValidate';

const {Promise, Map} = window;

const api = '/accounts/signup';
const v = '1.0';
const method = 'POST';

const ErrorCode = new Map([
    ['FORMAT_ILLEGAL', '参数格式错误'],
    ['CAPTCHA_ILLEGAL', '校验码错误'],
    ['CAPTCHA_EXPIRE', '校验码已过期'],
    ['EMAIL_REPEAT', '邮箱已被注册'],
    ['EMAIL_SEND_FAIL', '无法发送激活邮件至注册邮箱']
]);

function requestSignup(email, password, captchaId, captcha) {
    return fetchapi(api, v, method, null, new Map([
        ['email', email],
        ['password', password],
        ['captchaId', captchaId],
        ['captcha', captcha]
    ])).catch(reason => {
        return Promise.reject({
            globalError: reason.map(name => ErrorCode.get(name)).join('\n')
        });
    });
}

export function signup(email, password, confirmPassword, captchaId, captcha) {
    return new Promise((resolve, reject) => {
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

        if (emailError && pswError && confirmPswError && captchaError) {
            reject(errs);
        } else {
            requestSignup(email, password, captchaId, captcha)
                .then(resolve)
                .catch(_errs => {
                    for (const key in _errs) {
                        errs[key] = _errs[key];
                    }
                    reject(errs);
                });
        }
    });
}