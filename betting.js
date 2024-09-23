import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';
import { getDatabase, ref, get } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js';

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

// Получаем данные пользователя
const username = localStorage.getItem('username'); // Предполагается, что вы сохраняете имя пользователя в localStorage

if (username) {
    const userRef = ref(database, 'users/' + username.replace(/#.*$/, '')); // Удаляем все после #
    get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
            const userData = snapshot.val();
            document.getElementById('username').textContent = userData.username;
            document.getElementById('userId').textContent = userData.id;
            document.getElementById('balance').textContent = userData.balance || 0; // Если баланс не установлен, отображаем 0
            document.getElementById('admin').textContent = userData.adm || 'Нет';
        } else {
            console.log('Пользователь не найден');
        }
    }).catch((error) => {
        console.error('Ошибка получения данных: ', error);
    });
} else {
    // Перенаправляем на страницу входа, если пользователь не авторизован
    window.location.href = 'index.html';
}

// Обработчик кнопки выхода
document.getElementById('logoutButton').addEventListener('click', () => {
    localStorage.removeItem('username'); // Удаляем имя пользователя из localStorage
    window.location.href = 'index.html'; // Перенаправляем на страницу входа
});
