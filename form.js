document.getElementById('myForm').addEventListener('submit', function (e) {
    e.preventDefault();
    let validationMessage = '';
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    
    if (!username) {
        validationMessage += 'Пожалуйста, введите ваше имя пользователя.<br>';
    }
    
    if (!password) {
        validationMessage += 'Пожалуйста, введите пароль.<br>';
    }
    
    if (validationMessage) {
        document.getElementById('validationMessage').innerHTML = validationMessage;
    } else {
        document.getElementById('validationMessage').innerHTML = 'Форма успешно отправлена!';
        // Здесь можно сделать отправку данных
    }
});
