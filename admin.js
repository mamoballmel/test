  document.getElementById('createPageForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    
    const response = await fetch('/create-page', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();
    alert(result.message);
  });
