import {
    validateEmail,
    validatePassword,
    validateConfirmPassword
} from './accountValidate';

const {Promise} = window;

function requestSignup(email, password) {
    return Promise.resolve();
}

export function signup(email, password, confirmPassword) {
    return new Promise((resolve, reject) => {
        const errs = {
            emailError: validateEmail(email),
            pswError: validatePassword(password),
            confirmPswError: validateConfirmPassword(password, confirmPassword)
        };

        if (Object.keys(errs).length > 0) {
            reject(errs);
        } else {
            requestSignup(email, password, confirmPassword)
                .then(resolve)
                .catch(_errs => {
                    for (const key in _errs) {
                        errs.add(key, _errs(key));
                    }
                    reject(errs);
                });
        }
    });
}