import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';
import { getDatabase, ref, get, child, set } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js';

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

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Получаем введённые данные
    let username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Проверяем наличие # в username
    if (!username.includes('#')) {
        errorMessage.textContent = 'Добавьте # в ваше имя пользователя.';
        errorMessage.style.color = 'red';
        return;
    }

    // Проверяем, совпадают ли пароли
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

    // Извлекаем ID из username
    const id = username.substring(username.indexOf('#'));

    // Очищаем username от символа '#' и всех символов после него
    const cleanUsername = username.split('#')[0];

    // Проверка существования пользователя
    const dbRef = ref(database);
    get(child(dbRef, `users/${cleanUsername}`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                errorMessage.style.color = 'red';
                errorMessage.textContent = 'Пользователь с таким именем уже существует.';
            } else {
                // Сохраняем данные в Firebase
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

                    setTimeout(() => {
                        window.location.href = '/betting.html';
                    }, 2000);
                })
                .catch((error) => {
                    errorMessage.style.color = 'red';
                    errorMessage.textContent = 'Ошибка сохранения данных: ' + error.message;
                });
            }
        })
        .catch((error) => {
            errorMessage.style.color = 'red';
            errorMessage.textContent = 'Ошибка базы данных: ' + error.message;
        });
});
