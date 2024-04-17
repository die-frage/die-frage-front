# Проект "Die Frage"

## 1. Архитектура проекта
Angular - это популярный фреймворк для разработки веб-приложений, основанный на TypeScript. Он предоставляет инструменты для создания масштабируемых и поддерживаемых приложений с помощью модульной архитектуры.  
Проект использует SPA (Single Page Application) архитектуру, что позволяет создать более быстродействующее и отзывчивое приложение для пользователей.

## 2. Структура проекта

### Папка entities
Здесь собраны все Data Transfer Objects (DTO) для запросов к бэкенду.

### Папка routing
Содержит authGuard, который запрещает переход по маршрутам без авторизации пользователя.

### Папка services
В этой папке находятся сервисы, взаимодействующие с бэкендом. Проект использует сервисы для работы с API проекта "Die Frage" (ссылка на проект: [die-frage-api](https://github.com/die-frage/die-frage-api-v2.git)).

### Модуль для авторизации auth
Здесь реализованы сервисы для сохранения jwt токена во временное хранилище браузера и механизм, добавляющий к каждому запросу jwt токена.

### Папка components
Содержит следующие компоненты:

1. **add-survey-page**: Страница добавления нового опроса.  
   <img src="images/add-survey-page.jpeg" alt="Add Survey Page" width="650"/>
2. **analyse-survey-page**: Страница для просмотра результатов опроса.  
   <img src="images/analyse-survey-page.jpeg" alt="Analyse Survey Page" width="650"/>
3. **auth-page**: Страница авторизации.  
   <img src="images/auth-page.jpeg" alt="Auth Page" width="650"/>
4. **edit-survey-page**: Страница для редактирования созданного опроса.
5. **header**: Шапка сайта. Реализованы две версии: одна для авторизированного пользователя, другая для не авторизированного.  
   <img src="images/header.jpeg" alt="Header" width="650"/>
6. **home-page**: Страница, содержащая поисковик созданных опросов и список всех опросов пользователя.  
   <img src="images/home-page.jpeg" alt="Home Page" width="650"/>
7. **register-page**: Страница регистрации пользователя.  
   <img src="images/register-page.jpeg" alt="Register Page" width="650"/>
8. **survey-page**: Страница опроса, показывающая параметры опроса, ссылку, QR-код, а также возможность скачать результаты опроса.  
   <img src="images/survey-page.jpeg" alt="Survey Page" width="650"/>
9. **user-page**: Страница редактирования личных данных пользователя: имя, фамилия, пароль, почта.  
   <img src="images/user-page.jpeg" alt="User Page" width="650"/>

## Запуск проекта

Проект запускается с помощью команды из корневой директории проекта:

```bash
ng serve
```

После запуска проект доступ к приложению осуществляется через браузер по ссылке:

[http://localhost:4200/](http://localhost:4200/)

## Используемые технологии

Проект "Die Frage" разработан с использованием следующих технологий:  
<img src="https://github.com/tomchen/stack-icons/blob/master/logos/angular.svg" alt="Angular" width="120"/>  
<img src="https://github.com/tomchen/stack-icons/blob/master/logos/typescript.svg" alt="TypeScript" width="120"/>  
<img src="https://github.com/tomchen/stack-icons/blob/master/logos/html-5.svg" alt="HTML" width="40"/>
<img src="https://github.com/tomchen/stack-icons/blob/master/logos/css-3.svg" alt="CSS" width="40"/>  

