import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// Firebase configuration
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

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Handle form submission for registration
const registerForm = document.getElementById('registerForm');
if (registerForm) {
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

        // Проверяем совпадение паролей
        if (password !== confirmPassword) {
            errorMessage.textContent = 'Пароли не совпадают.';
            return;
        }

        // Используем username в качестве email для регистрации в Firebase (имитация)
        const fakeEmail = username.replace('#', '@fake.com');

        // Firebase регистрация
        auth.createUserWithEmailAndPassword(fakeEmail, password)
            .then((userCredential) => {
                // Успешная регистрация
                errorMessage.textContent = 'Регистрация успешна!';
            })
            .catch((error) => {
                // Ошибка регистрации
                errorMessage.textContent = error.message;
            });
    });
}

// Handle form submission for login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    const errorMessage = document.getElementById('errorMessage');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Проверяем наличие # в username
        if (!username.includes('#')) {
            errorMessage.textContent = 'Добавьте # в ваше имя пользователя.';
            return;
        }

        // Используем username как email (заменяем # на @fake.com)
        const fakeEmail = username.replace('#', '@fake.com');

        // Firebase вход
        auth.signInWithEmailAndPassword(fakeEmail, password)
            .then((userCredential) => {
                // Успешный вход
                errorMessage.textContent = 'Вход успешен!';
            })
            .catch((error) => {
                // Ошибка входа
                errorMessage.textContent = error.message;
            });
    });
}
