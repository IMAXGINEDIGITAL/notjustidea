const {Promise} = window;

function requestSignin(email, password, isKeepSignin) {
    return Promise.resolve();
}

export function signin(email = '', password = '', isKeepSignin = false) {
    return new Promise((resolve, reject) => {
        const errs = {};

        if (email === '') {
            errs.emailError = '邮箱地址不能为空';
        } else if (!email.match(/^[^@]+\@[^@]+$/)) {
            errs.emailError = '邮箱格式不正确';
        }

        if (password === '') {
            errs.pswError = '密码不能为空';
        }

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