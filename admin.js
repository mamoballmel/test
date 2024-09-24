        document.getElementById('createPageForm').addEventListener('submit', function (event) {
            event.preventDefault(); // предотвращаем стандартное поведение формы
            
            const formData = new FormData(this); // собираем данные формы
            
            fetch(this.action, {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка отправки формы');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                alert('Форма успешно отправлена!');
            })
            .catch(error => {
                console.error('Ошибка:', error);
                alert('Произошла ошибка при отправке формы.');
            });
        });
