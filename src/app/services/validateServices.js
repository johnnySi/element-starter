import userSerices from './userServices'

class ValidateServices {
    userLoginNameValidate(rule, value, callback) {
        if (value === '') {
            callback(new Error('请输入用户名'));
        } else {
            callback();
        }
    }

    userPasswordValidate(rule, value, callback) {
        if (value === '') {
            callback(new Error('请输入密码'));
        } else {
            callback();
        }
    }

    userLoginName4UserListValidate(rule, value, callback) {
        userSerices.getUserByLoginName(value)
            .then(resp => {
                if (resp.datas.length !== 0) {
                    callback(new Error('登录名已经存在'));
                } else {
                    callback();
                }
            })
    }
}

export default new ValidateServices();