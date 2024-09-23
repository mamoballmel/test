import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';
import { getDatabase, ref, get, child } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js';

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

// Обработчик формы входа
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const cleanedUsername = username.split('#')[0];

    const dbRef = ref(database);

    get(child(dbRef, `users/${cleanedUsername}`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                const userData = snapshot.val();

                if (userData.password === password) {
                    errorMessage.style.color = 'green';
                    errorMessage.textContent = 'Вход успешен!';
                    
                    // Сохраняем имя пользователя в localStorage
                    localStorage.setItem('username', userData.username);
                    
                    // Перенаправление на страницу betting
                    setTimeout(() => {
                        window.location.href = "test/betting.html"; // Убедитесь, что это правильный путь
                    }, 1000);
                } else {
                    errorMessage.style.color = 'red';
                    errorMessage.textContent = 'Неправильный пароль!';
                }
            } else {
                errorMessage.style.color = 'red';
                errorMessage.textContent = 'Пользователь не найден!';
            }
        })
        .catch((error) => {
            errorMessage.style.color = 'red';
            errorMessage.textContent = 'Ошибка базы данных: ' + error.message;
        });
});
