import {
    validateEmail,
    validatePassword
} from './accountValidate';

const {Promise} = window;

function requestFindpsw(email) {
    return Promise.resolve();
}

export function findpsw(email = '') {
    return new Promise((resolve, reject) => {
        const errs = {
            emailError: validateEmail(email)
        };

        if (Object.keys(errs).length > 0) {
            reject(errs);
        } else {
            requestFindpsw(email)
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