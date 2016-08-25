import {
    validateEmail,
    validatePassword
} from './accountValidate';

const {Promise} = window;

function requestSignin(email, password, isKeepSignin) {
    return Promise.resolve();
}

export function signin(email = '', password = '', isKeepSignin = false) {
    return new Promise((resolve, reject) => {
        const errs = {
            emailError: validateEmail(email),
            pswError: validatePassword(password)
        };

        if (Object.keys(errs).length > 0) {
            reject(errs);
        } else {
            requestSignin(email, password, isKeepSignin)
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