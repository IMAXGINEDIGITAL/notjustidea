import {
    validatePassword,
    validateConfirmPassword
} from './accountValidate';

const {Promise} = window;

function requestResetpsw(password) {
    return Promise.resolve();
}

export function resetpsw(password = '', confirmPassword = '') {
    return new Promise((resolve, reject) => {
        const errs = {
            pswError: validatePassword(password),
            confirmPswError: validateConfirmPassword(password, confirmPassword)
        };

        if (Object.keys(errs).length > 0) {
            reject(errs);
        } else {
            requestResetpsw(password)
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