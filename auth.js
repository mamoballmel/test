// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
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
