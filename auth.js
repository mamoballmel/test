import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js';
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
const auth = getAuth(app);
const database = getDatabase(app);

// Обработчик формы регистрации
const registerForm = document.getElementById('registerForm');
const errorMessage = document.getElementById('errorMessage');

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Проверяем наличие # в username
    if (!username.includes('#')) {
        errorMessage.textContent = 'Добавьте # в ваше имя пользователя.';
        return;
    }

    // Извлекаем ID из username
    const id = username.substring(username.indexOf('#')); // Включая #

    // Проверяем совпадение паролей
    if (password !== confirmPassword) {
        errorMessage.textContent = 'Пароли не совпадают.';
        return;
    }

    // Проверка пароля на сложность
    const passwordValid = validatePassword(password);
    if (!passwordValid) {
        errorMessage.textContent = 'Пароль должен содержать как минимум 8 символов, включая заглавные буквы, цифры и специальные символы.';
        return;
    }

    // Используем username в качестве email для регистрации в Firebase (имитация)
    const fakeEmail = username.replace('#', '@fake.com');

    // Firebase регистрация
    createUserWithEmailAndPassword(auth, fakeEmail, password)
        .then((userCredential) => {
            // Успешная регистрация
            const userId = userCredential.user.uid;

            // Сохраняем данные в реальной базе данных
            set(ref(database, 'users/' + userId), {
                username: username,
                id: id
            })
            .then(() => {
                errorMessage.textContent = 'Регистрация успешна!';
            })
            .catch((error) => {
                errorMessage.textContent = 'Ошибка сохранения данных: ' + error.message;
            });
        })
        .catch((error) => {
            errorMessage.textContent = error.message;
        });
});

// Функция проверки пароля
function validatePassword(password) {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
}
