function validateEmail(email) {
    let error;
    if (email === '') {
        error = '邮箱地址不能为空';
    } else if (!email.match(/^[^@]+\@[^@]+$/)) {
        error = '邮箱格式不正确';
    }
    return error;
}

function validatePassword(password) {
    let error;
    if (password === '') {
        error = '密码不能为空';
    } else if(password.match(/^[a-z0-9]{0,7}$/) ||
                password.match(/^[a-z]{8,}$/) ||
                password.match(/^[0-9]{8,}$/)) {
        error = '密码格式不正确'
    }
    return error;
}

function validateConfirmPassword(password, confirmPassoword) {
    let error;
    if (password !== '' && confirmPassword === '') {
        error = '请再次输入密码';
    } else if (password !== '' &&
                confirmPassword !== password) {
        error = '两次输入的密码不一致';
    }
    return error;
}

export {
    validateEmail,
    validatePassword,
    validateConfirmPassword
};