import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// Ваши настройки Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBtmSsdaisVj5FOn9QPW49kf8RPxpRDhno",
  authDomain: "melbets-57e1c.firebaseapp.com",
  projectId: "melbets-57e1c",
  storageBucket: "melbets-57e1c.appspot.com",
  messagingSenderId: "396885652404",
  appId: "1:396885652404:web:e6f316d285fb112ff7f8e1",
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Обработчик формы регистрации
const registerForm = document.getElementById('registerForm');
const errorMessage = document.getElementById('errorMessage');

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value; // email от пользователя
    const password = document.getElementById('password').value; // пароль от пользователя

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Успех, меняем цвет сообщения на зеленый
            errorMessage.style.color = 'green';
            errorMessage.textContent = 'Регистрация успешна!';

            // Перенаправление на главную страницу через 2 секунды
            setTimeout(() => {
                window.location.href = '/betting';
            }, 2000);
        })
        .catch((error) => {
            errorMessage.style.color = 'red';
            errorMessage.textContent = 'Ошибка: ' + error.message;
        });
});
