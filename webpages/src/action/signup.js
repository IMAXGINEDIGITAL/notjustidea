const {Promise} = window;

function requestSignup(email, password) {
    return Promise.resolve();
}

export function signup(email, password, confirmPassword) {
    return new Promise((resolve, reject) => {
        const errs = {};

        if (email === '') {
            errs.emailError = '邮箱地址不能为空';
        } else if (!email.match(/^[^@]+\@[^@]+$/)) {
            errs.emailError = '邮箱格式不正确';
        }

        if (password === '') {
            errs.pswError = '密码不能为空';
        } else if(password.match(/^[a-z0-9]{0,7}$/) ||
                    password.match(/^[a-z]{8,}$/) ||
                    password.match(/^[0-9]{8,}$/)) {
            errs.pswError = '密码格式不正确'
        }

        if (password !== '' && confirmPassword === '') {
            errs.confirmPswError = '请再次输入密码';
        } else if (password !== '' &&
                    confirmPassword !== password) {
            errs.confirmPswError = '两次输入的密码不一致';
        }

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