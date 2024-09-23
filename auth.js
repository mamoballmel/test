import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js';

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

// Экспортируем функции для использования в auth2.js
export const registerUser = (username, password) => {
    const id = username.substring(username.indexOf('#'));
    const cleanUsername = username.split('#')[0];

    return set(ref(database, 'users/' + cleanUsername), {
        username: cleanUsername,
        id: id,
        password: password,
        adm: "no",
        balance: 0,
        ban: "no"
    });
};
