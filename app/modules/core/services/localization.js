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
                        'app.error.LOGIN_FAILED'      : 'Неверный телефон или пароль',
                        'app.done'  : 'ГОТОВО',
                        'app.noConnection'            : 'Нет соединения',
                        'app.genericError'            : 'Произошла ошибка',
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
                        'queue.free'                    : 'Тестовый режим',
                        'queue.timeLeft'                : 'Осталось',
                        'queue.rateHeader'              : 'Оценить качество',
                        'queue.delete'                  : 'Удалить услугу?',
                        'queue.canselBtn'               : 'ОТМЕНА',
                        'queue.signupBtn'               : 'РЕГИСТРАЦИЯ',
                        'queue.serviceCenter'           : 'Центр обслуживания'
                    },
                    ua : {
                        'app.done'  : 'ГОТОВО',
                        'app.noConnection'            : 'Выдсутнє з\'єднання',
                        'app.genericError'            : 'Виникла помилка',
                        'login.loginButton'           : 'УВІЙТИ',
                        'login.login'                 : 'Логін',
                        'login.loginHolder'           : 'Телефон',
                        'login.password'              : 'Пароль',
                        'login.passwordHolder'        : 'Пароль',
                        'login.signUp'                : 'ЗЗареєструватися',
                        'login.forgotPwd'             : 'Забули пароль?',
                        'login.restorePwd'            : 'Відновлення пароля',
                        'login.restore.description'    : 'Новий пароль буде высланій на ваш емейл',
                        'login.restore.send'           : 'ВІДПРАВИТИ',
                        'login.restore.cancel'         : 'ВІДМІНА',
                        'profile.lang'                  : 'Мова',
                        'profile.city'                  : 'Моє місто',
                        'profile.userData'              : 'Особисті дані',
                        'profile.letterToDev'           : 'Написати розробникам',
                        'profile.licenseAgreement'      : 'Ліцензійна угода',
                        'profile.licenseAccept'         : 'Я приймаю ліцензійну угоду',
                        'profile.about'                 : 'Про програму',
                        'profile.myCity'                : 'Моє місто',
                        'user.phone'                    : 'Телефон',
                        'user.email'                    : 'Електронна пошта',
                        'user.login'                    : 'Логін',
                        'user.password'                 : 'Пароль',
                        'user.password2'                : 'Підтвердження пароля',
                        'user.firstname'                : 'Им"я',
                        'user.lastname'                 : 'Прізвище',
                        'user.birthDate'                : '-Дата-',
                        'user.address'                  : 'Адреса',
                        'user.register'                 : 'Реєстрація',
                        'user.profile'                  : 'Особисті дані',
                        'user.card'                     : 'Картка',
                        'user.card.add'                 : 'Додати',
                        'user.card.number'              : 'Номер картки',
                        'user.card.exp'                 : 'Строк дії',
                        'user.card.cvv'                 : 'CVV2/CVC2',
                        'queue.organization'            : 'Організація',
                        'queue.service'                 : 'Послуга',
                        'queue.date'                    : 'Дата',
                        'queue.time'                    : 'Час',
                        'queue.registeringCost'         : 'вартість реєстрації',
                        'queue.free'                    : 'Тестовий режим',
                        'queue.timeLeft'                : 'Залишилось',
                        'queue.rateHeader'              : 'Оцінити якість',
                        'queue.delete'                  : 'Видалити послугу?',
                        'queue.canselBtn'               : 'СКАСУВАТИ',
                        'queue.signupBtn'               : 'РЕЄСТРАЦІЯ',
                        'queue.serviceCenter'           : 'Центр обслуговування'
                    },
                    en : {
                        'app.done'  : 'DONE',
                        'app.noConnection'            : 'No connection',
                        'login.loginButton'           : 'LOGIN',
                        'app.genericError'            : 'An error has occurred',
                        'login.login'                 : 'Login',
                        'login.loginHolder'           : 'Phone',
                        'login.password'              : 'Password',
                        'login.passwordHolder'        : 'Password',
                        'login.signUp'                : 'Sign up',
                        'login.forgotPwd'             : 'Forgot your password?',
                        'login.restorePwd'            : 'Password recovery',
                        'login.restore.description'    : 'A new password will be sent to your email',
                        'login.restore.send'           : 'Send',
                        'login.restore.cancel'         : 'CANCEL',
                        'profile.lang'                  : 'Language',
                        'profile.city'                  : 'My city',
                        'profile.userData'              : 'Personal data',
                        'profile.letterToDev'           : 'Write to developers',
                        'profile.licenseAgreement'      : 'License agreement',
                        'profile.licenseAccept'         : 'I accept the license agreement',
                        'profile.about'                 : 'About',
                        'profile.myCity'                : 'My city',
                        'user.phone'                    : 'Phone',
                        'user.email'                    : 'Email',
                        'user.login'                    : 'Login',
                        'user.password'                 : 'Password',
                        'user.password2'                : 'Password confirmation',
                        'user.firstname'                : 'Name',
                        'user.lastname'                 : 'Surname',
                        'user.birthDate'                : '-Date-',
                        'user.address'                  : 'Address',
                        'user.register'                 : 'Registration',
                        'user.profile'                  : 'Personal data',
                        'user.card'                     : 'Card',
                        'user.card.add'                 : 'Add',
                        'user.card.number'              : 'Card number',
                        'user.card.exp'                 : 'Validity',
                        'user.card.cvv'                 : 'CVV2/CVC2',
                        'queue.organization'            : 'Organization',
                        'queue.service'                 : 'Service',
                        'queue.date'                    : 'Date',
                        'queue.time'                    : 'Time',
                        'queue.registeringCost'         : 'the cost of registering',
                        'queue.free'                    : 'Testing',
                        'queue.timeLeft'                : 'Left',
                        'queue.rateHeader'              : 'Rate the quality',
                        'queue.delete'                  : 'Remove service?',
                        'queue.canselBtn'               : 'CANCEL',
                        'queue.signupBtn'               : 'SIGN UP',
                        'queue.serviceCenter'           : 'Service center'
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
