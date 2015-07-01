/**
 * Created by askuznetsov on 5/22/2015.
 */
angular
    .module('core')
    .provider('localizationService', ['$injector', function($injector) {
        return {
            $get: ['$rootScope', function($rootScope) {
                var data = {
                    ru : {
                        'app.done'  : 'ГОТОВО',
                        'app.noConnection'            : 'Нет соединения',
                        'login.loginButton'           : 'ВОЙТИ',
                        'login.login'                 : 'Логин',
                        'login.loginHolder'           : 'Телефон',
                        'login.password'              : 'Пароль',
                        'login.passwordHolder'        : 'Пароль',
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
                        'user.email'                    : 'Электронная почта',
                        'user.login'                    : 'Логин',
                        'user.password'                 : 'Пароль',
                        'user.password2'                : 'Подтверждение пароля',
                        'user.firstname'                : 'Имя',
                        'user.lastname'                 : 'Фамилия',
                        'user.birthDate'                : '-Дата-',
                        'user.address'                  : 'Аддресс',
                        'user.register'                 : 'Регистрация',
                        'user.profile'                  : 'Личные данные',
                        'user.card'                     : 'Карточка',
                        'user.card.add'                 : 'Добавить',
                        'user.card.number'              : 'Номер карточка',
                        'user.card.exp'                 : 'Срок действия',
                        'user.card.cvv'                 : 'CVV2/CVC2',
                        'queue.organization'            : 'Организация',
                        'queue.service'                 : 'Услуга',
                        'queue.date'                    : 'Дата',
                        'queue.time'                    : 'Время',
                        'queue.registeringCost'         : 'стоимость регистрации',
                        'queue.free'                    : 'Бесплатно',
                        'queue.timeLeft'                : 'Осталось',
                        'queue.rateHeader'              : 'Оценить качество',
                        'queue.delete'                  : 'Удалить услугу?',
                        'queue.canselBtn'               : 'ОТМЕНА',
                        'queue.signupBtn'               : 'РЕГИСТРАЦИЯ'
                    },
                    ua : {
                        'app.done'  : 'ГОТОВО',
                        'app.noConnection'            : 'Нет соединения',
                        'login.loginButton'           : 'ВОЙТИ',
                        'login.login'                 : 'Логин',
                        'login.loginHolder'           : 'Телефон',
                        'login.password'              : 'Пароль',
                        'login.passwordHolder'        : 'Пароль',
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
                        'user.email'                    : 'Электронная почта',
                        'user.login'                    : 'Логин',
                        'user.password'                 : 'Пароль',
                        'user.password2'                : 'Подтверждение пароля',
                        'user.firstname'                : 'Имя',
                        'user.lastname'                 : 'Фамилия',
                        'user.birthDate'                : '-Дата-',
                        'user.address'                  : 'Аддресс',
                        'user.register'                 : 'Регистрация',
                        'user.profile'                  : 'Личные данные',
                        'user.card'                     : 'Карточка',
                        'user.card.add'                 : 'Добавить',
                        'user.card.number'              : 'Номер карточка',
                        'user.card.exp'                 : 'Срок действия',
                        'user.card.cvv'                 : 'CVV2/CVC2',
                        'queue.organization'            : 'Организация',
                        'queue.service'                 : 'Услуга',
                        'queue.date'                    : 'Дата',
                        'queue.time'                    : 'Время',
                        'queue.registeringCost'         : 'стоимость регистрации',
                        'queue.free'                    : 'Бесплатно',
                        'queue.timeLeft'                : 'Осталось',
                        'queue.rateHeader'              : 'Оценить качество',
                        'queue.delete'                  : 'Удалить услугу?',
                        'queue.canselBtn'               : 'ОТМЕНА',
                        'queue.signupBtn'               : 'РЕГИСТРАЦИЯ'
                    },
                    en : {
                        'app.done'  : 'ГОТОВО',
                        'app.noConnection'            : 'Нет соединения',
                        'login.loginButton'           : 'ВОЙТИ',
                        'login.login'                 : 'Логин',
                        'login.loginHolder'           : 'Телефон',
                        'login.password'              : 'Пароль',
                        'login.passwordHolder'        : 'Пароль',
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
                        'profile.about'                 : 'About program',
                        'profile.myCity'                : 'My City',
                        'user.phone'                    : 'Телефон',
                        'user.email'                    : 'Электронная почта',
                        'user.login'                    : 'Логин',
                        'user.password'                 : 'Пароль',
                        'user.password2'                : 'Подтверждение пароля',
                        'user.firstname'                : 'Имя',
                        'user.lastname'                 : 'Фамилия',
                        'user.birthDate'                : '-Дата-',
                        'user.address'                  : 'Аддресс',
                        'user.register'                 : 'Регистрация',
                        'user.profile'                  : 'Личные данные',
                        'user.card'                     : 'Карточка',
                        'user.card.add'                 : 'Добавить',
                        'user.card.number'              : 'Номер карточка',
                        'user.card.exp'                 : 'Срок действия',
                        'user.card.cvv'                 : 'CVV2/CVC2',
                        'queue.organization'            : 'Organization',
                        'queue.service'                 : 'Service',
                        'queue.date'                    : 'Date',
                        'queue.time'                    : 'Time',
                        'queue.registeringCost'         : 'Cost',
                        'queue.free'                    : 'Free',
                        'queue.timeLeft'                : 'Left',
                        'queue.rateHeader'              : 'Rate',
                        'queue.delete'                  : 'Delete?',
                        'queue.canselBtn'               : 'Cancel',
                        'queue.signupBtn'               : 'GO'
                    }
                };

                var currentLang = 'ru';
                var translate = function(key) {
                    if (data[currentLang][key]) {
                        return data[currentLang][key];
                    } else {
                        return key;
                    }
                };

                $rootScope.L = translate;

                return {
                    getMessage : function(key) {
                        return data[key];
                    },
                    setLanguage: function(langId) {
                        var languages = {
                            1 : 'ru',
                            2 : 'ua',
                            3 : 'en'
                        };
                        currentLang = languages[langId]||'ru';
                    }
                }
            }]
        }
    }]);
