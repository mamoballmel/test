import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';
import { getDatabase, ref, get, child } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js';

// Конфигурация Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Обработчик формы входа
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    // Очищаем от символов после #, если есть
    const cleanedUsername = username.split('#')[0];

    // Проверяем наличие пользователя в базе данных
    const dbRef = ref(database);

    get(child(dbRef, `users/${cleanedUsername}`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                const userData = snapshot.val();

                // Проверяем пароль
                if (userData.password === password) {
                    errorMessage.style.color = 'green'; // Успех
                    errorMessage.textContent = 'Вход успешен!';
                    // Перенаправление на другую страницу
                    setTimeout(() => {
                        window.location.href = "/betting";
                    }, 1000);
                } else {
                    errorMessage.style.color = 'red'; // Ошибка
                    errorMessage.textContent = 'Неправильный пароль!';
                }
            } else {
                errorMessage.style.color = 'red'; // Ошибка
                errorMessage.textContent = 'Пользователь не найден!';
            }
        })
        .catch((error) => {
            errorMessage.style.color = 'red'; // Ошибка
            errorMessage.textContent = 'Ошибка базы данных: ' + error.message;
        });
});
