# Dependencies

* nodejs

# Установка\запуск

* Качаем с git-а
* След. комманды по очереди:

```
    npm i
```

```
    bower i
```

```
    grunt serve
```

* Открываем localhost:9000
* profit

# Дополнительно

Для работы с API запросами без проблем с кросс-домен политикой:

* Скачиваем Chromium (https://www.chromium.org/getting-involved/download-chromium);
* Добавляем " --disable-web-security" в свойства ярлыка;
* Запускаем -> localhost:9000

# Стр-ра приложения

* config.xml - конфиги мобильного приложения (версия, название...)
* app/index.html - основной исполняемый файл;
* app/less - стили
* app/less - модули
    - core,
    - login - логин\регисрация,
    - profile - профиль\настройки,
    - queue - услуги: добавление, список, редактирование.
* app/img - статика.
