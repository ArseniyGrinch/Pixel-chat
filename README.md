# Pixel Chat

<img src="https://raw.githubusercontent.com/ArseniyGrinch/chat/main/screenshots/screenshot1.jpg" />

# Описание

Цель проекта - создание pet-проекта

Что реализовано: 
- Окно входа - регистрация через email и пароль, вход через Google   
- Окно чата - возможность писать сообщения, список участников чата, выход из аккаунта

# Технологии 

- React
- Firebase
- [NES css](https://nostalgic-css.github.io/NES.css/) / scss

# Запуск

1. npm install
2. Переименовываем example.env в .env, открываем файл
3. Создаем проект в Firebase, переносим firebaseConfig в .env
4. Разрешаем следующие настройки для входа: 

<img src="https://raw.githubusercontent.com/ArseniyGrinch/chat/main/screenshots/screenshot2.jpg" />

5. Создаем Firestore Database с настройками "in test mode"
6. npm start