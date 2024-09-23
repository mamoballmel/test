
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';
import { getDatabase, ref, onValue } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js';

// Firebase Configuration
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
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Получаем данные пользователя из localStorage
const username = localStorage.getItem('username');

if (username) {
    const cleanedUsername = username.replace(/#.*$/, ''); // Удаляем все после #
    const userRef = ref(database, 'users/' + cleanedUsername);
    
    // Слушаем изменения в реальном времени
    onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
            const userData = snapshot.val();
            document.getElementById('balance').textContent = userData.balance || 0; // Если баланс не установлен, отображаем 0
        } else {
            console.log('Пользователь не найден');
        }
    }, (error) => {
        console.error('Ошибка получения данных: ', error);
    });
} else {
    window.location.href = 'login.html'; // Перенаправляем на страницу входа, если username не найден
}
