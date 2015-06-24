/**
 * Created by askuznetsov on 5/22/2015.
 */
angular
    .module('core')
    .provider('localizationService', ['$injector', function($injector) {
        return {
            $get: ['$rootScope', function($rootScope) {
                var data = {
                    'app.done'  : 'ГОТОВО',
                    'app.noConnection'            : 'Нет соединения',
                    'login.loginButton'           : 'ВОЙТИ',
                    'login.login'                 : 'Логин',
                    'login.password'              : 'Пароль',
                    'login.signUp'                : 'Зарегистрироваться',
                    'login.forgotPwd'             : 'Забыли пароль?',
                    'login.restorePwd'            : 'Восстановление пароля',
                    'login.restore.description'    : 'Новый пароль будет выслан на ваш имейл',
                    'login.restore.send'           : 'ОТПРАВИТЬ',
                    'login.restore.cancel'         : 'ОТМЕНА',
                    'profile.lang'                  : 'Язык',
                    'profile.city'                  : 'Мой город',
                    'profile.userData'              : 'Личные даные',
                    'profile.letterToDev'           : 'Написать разработчикам',
                    'profile.licenseAgreement'      : 'Лицензионное соглашение',
                    'profile.licenseAccept'         : 'Я принимаю лицензионное соглашение',
                    'profile.about'                 : 'О программе',
                    'profile.myCity'                : 'Мой город',
                    'user.phone'                    : 'Телефон',
                    'user.email'                    : '-имейл-',
                    'user.login'                    : 'Логин',
                    'user.password'                 : 'Пароль',
                    'user.password2'                : '-Пароль 2-',
                    'user.firstname'                : 'Имя',
                    'user.lastname'                 : 'Фамилия',
                    'user.birthDate'                : '-Дата-',
                    'user.address'                  : 'Аддресс',
                    'user.register'                 : 'Регистрация',
                    'user.profile'                  : 'Личные данные',
                    'queue.organization'            : 'Организация',
                    'queue.service'                 : 'Услуга',
                    'queue.date'                    : 'Дата',
                    'queue.time'                    : 'Время',
                    'queue.registeringCost'         : 'стоимость регистрации',
                    'queue.free'                    : 'Бесплатно',
                    'queue.canselBtn'               : 'ОТМЕНА',
                    'queue.signupBtn'               : 'РЕГИСТРАЦИЯ'
                };

                var translate = function(key) {
                    if (data[key]) {
                        return data[key]
                    } else {
                        return key
                    }
                };

                $rootScope.L = translate;

                return {
                    getMessage : function(key) {
                        return data[key];
                    }
                }
            }]
        }
    }]);
