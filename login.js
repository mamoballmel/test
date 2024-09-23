import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';
import { getDatabase, ref, get, child } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js';

// Конфигурация Firebase (используем ту же конфигурацию)
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

// Обработчик формы входа
const loginForm = document.getElementById('loginForm');
const loginErrorMessage = document.getElementById('loginErrorMessage');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    // Проверяем наличие # в username и удаляем его вместе с символами после
    const cleanedUsername = username.includes('#') ? username.split('#')[0] : username;

    // Получаем данные пользователя из базы данных
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${cleanedUsername}`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                const userData = snapshot.val();

                // Проверяем совпадение пароля
                if (userData.password === password) {
                    loginErrorMessage.style.color = 'green';
                    loginErrorMessage.textContent = 'Вход успешен!';
                    setTimeout(() => {
                        window.location.href = '/betting';  // Перенаправление на главную страницу
                    }, 2000); // Пауза 2 секунды перед редиректом
                } else {
                    loginErrorMessage.textContent = 'Неправильный пароль. Попробуйте снова.';
                }
            } else {
                loginErrorMessage.textContent = 'Пользователь не найден. Проверьте введенный логин.';
            }
        })
        .catch((error) => {
            loginErrorMessage.textContent = 'Ошибка входа: ' + error.message;
        });
});
