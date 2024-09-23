import { registerUser } from './auth.js';

const modal = document.getElementById("myModal");
const registerButton = document.getElementById("registerButton");
const continueButton = document.getElementById("continueButton");
const agreementCheckbox = document.getElementById("agreementCheckbox");
const errorMessage = document.getElementById("errorMessage");

registerButton.onclick = function() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!username.includes('#')) {
        errorMessage.textContent = "Имя пользователя должно содержать ID через #.";
        return;
    }

    if (password !== confirmPassword) {
        errorMessage.textContent = "Пароли не совпадают.";
        return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
        errorMessage.textContent = "Пароль должен содержать как минимум 8 символов, одну заглавную букву, одну цифру и один специальный символ.";
        return;
    }

    modal.style.display = "block";
};

continueButton.onclick = function() {
    if (agreementCheckbox.checked) {
        modal.style.display = "none";
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;

        registerUser(username, password)
            .then(() => {
                errorMessage.style.color = 'green';
                errorMessage.textContent = 'Регистрация успешна!';
                setTimeout(() => {
                    window.location.href = '/betting.html';
                }, 2000);
            })
            .catch((error) => {
                errorMessage.style.color = 'red';
                errorMessage.textContent = 'Ошибка сохранения данных: ' + error.message;
            });
    } else {
        errorMessage.textContent = "Пожалуйста, подтвердите ознакомление с Пользовательским соглашением.";
    }
};

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};
