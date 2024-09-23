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

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Получаем введённое имя пользователя
    let username = document.getElementById('username').value.trim(); // убираем пробелы по бокам

    // Проверяем наличие # в username
    if (!username.includes('#')) {
        errorMessage.textContent = 'Добавьте # в ваше имя пользователя.';
        errorMessage.style.color = 'red';
        return;
    }

    // Извлекаем ID из username
    const id = username.substring(username.indexOf('#')); // Включая #

    // Сохраняем данные в Firebase
    set(ref(database, 'users/' + username), {
        username: username,
        id: id
    })
    .then(() => {
        // Меняем цвет сообщения на зеленый
        errorMessage.style.color = 'green';
        errorMessage.textContent = 'Регистрация успешна!';

        // Перенаправление на главную страницу через 2 секунды
        setTimeout(() => {
            window.location.href = '/betting';
        }, 2000);
    })
    .catch((error) => {
        errorMessage.style.color = 'red';
        errorMessage.textContent = 'Ошибка сохранения данных: ' + error.message;
    });
});
