/**
 * Created by askuznetsov on 5/22/2015.
 */
angular
    .module('core')
    .provider('localizationService', ['$injector', function($injector) {
        return {
            $get: ['$rootScope', function($rootScope) {
                var data = {
                    'login.loginButton'           : 'ВОЙТИ',
                    'login.login'                 : 'Логин',
                    'login.password'              : 'Пароль',
                    'login.signUp'                : 'Зарегистрироваться',
                    'login.forgotPwd'             : 'Забыли пароль?',
                    'profile.lang'                  : 'Язык',
                    'profile.city'                  : 'Мой город',
                    'profile.userData'              : 'Личные даные',
                    'profile.letterToDev'           : 'Написать разработчикам',
                    'profile.licenseAgreement'      : 'Лицензионное соглашение',
                    'profile.about'                 : 'О программе',
                    'queue.organization'            : 'Организация',
                    'queue.service'                 : 'Услуга',
                    'queue.date'                    : 'Дата',
                    'queue.time'                    : 'Время',
                    'queue.registeringCost'         : 'стоимость регистрации',
                    'queue.canselBtn'               : 'ОТМЕНА',
                    'queue.signupBtn'               : 'РЕГИСТРАЦИЯ'
                };

                var translate = function(key) {
                    console.log(key);
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
