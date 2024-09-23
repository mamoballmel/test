// auth.js

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js';

// Конфигурация Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBtmSsdaisVj5FOn9QPW49kf8RPxpRDhno",
    authDomain: "melbets-57e1c.firebaseapp.com",
    databaseURL: "https://melbets-57e1c-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "melbets-57e1c",
    storageBucket: "melbets-57e1c.appspot.com",
    messagingSenderId: "396885652404",
    appId: "1:396885652404:web:e6f316d285fb112ff7f8e1",
    measurementId: "G-MCF3S6J2LN"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Обработчик формы регистрации
const registerForm = document.getElementById('registerForm');
const errorMessage = document.getElementById('errorMessage');
const continueButton = document.getElementById('continueButton');

continueButton.addEventListener('click', () => {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Проверка наличия # в username
    if (!username.includes('#')) {
        errorMessage.textContent = 'Добавьте # в ваше имя пользователя.';
        errorMessage.style.color = 'red';
        return;
    }

    // Проверка совпадения паролей
    if (password !== confirmPassword) {
        errorMessage.textContent = 'Пароли не совпадают.';
        errorMessage.style.color = 'red';
        return;
    }

    // Проверка сложности пароля
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
        errorMessage.textContent = 'Пароль должен содержать как минимум 8 символов, одну заглавную букву, одну цифру и один специальный символ.';
        errorMessage.style.color = 'red';
        return;
    }

    // Извлечение ID из username
    const id = username.substring(username.indexOf('#')); // Включая #
    const cleanUsername = username.split('#')[0]; // Получаем username до #

    // Сохранение данных в Firebase
    set(ref(database, 'users/' + cleanUsername), {
        username: cleanUsername,
        id: id,
        password: password,
        adm: "no",
        balance: 0,
        ban: "no"
    })
    .then(() => {
        errorMessage.style.color = 'green';
        errorMessage.textContent = 'Регистрация успешна!';
        
        // Перенаправление на главную страницу через 2 секунды
        setTimeout(() => {
            window.location.href = '/betting.html';
        }, 2000);
    })
    .catch((error) => {
        errorMessage.style.color = 'red';
        errorMessage.textContent = 'Ошибка сохранения данных: ' + error.message;
    });
});
