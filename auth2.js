        const modal = document.getElementById("myModal");
        const registerButton = document.getElementById("registerButton");
        const continueButton = document.getElementById("continueButton");
        const agreementCheckbox = document.getElementById("agreementCheckbox");

        registerButton.onclick = function() {
            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirmPassword").value;

            // Проверка на наличие ID в username
            if (!username.includes('#')) {
                document.getElementById("errorMessage").textContent = "Имя пользователя должно содержать ID через #.";
                return;
            }

            // Проверка совпадения паролей
            if (password !== confirmPassword) {
                document.getElementById("errorMessage").textContent = "Пароли не совпадают.";
                return;
            }

            // Проверка сложности пароля
            const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;
            if (!passwordRegex.test(password)) {
                document.getElementById("errorMessage").textContent = "Пароль должен содержать как минимум 8 символов, одну заглавную букву, одну цифру и один специальный символ.";
                return;
            }

            // Если все проверки пройдены, показываем модальное окно
            modal.style.display = "block";
        }

        continueButton.onclick = function() {
            if (agreementCheckbox.checked) {
                modal.style.display = "none";
                document.getElementById("registerForm").submit(); // Отправляем форму
            } else {
                document.getElementById("errorMessage").textContent = "Пожалуйста, подтвердите ознакомление с Пользовательским соглашением.";
            }
        }

        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        }
