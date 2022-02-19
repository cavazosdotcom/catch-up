const registerFormHandler = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
    const name = document.querySelector("#username").value.trim();
  
    if (email && password && name) {
      const response = await fetch('/api/users/', {
        method: 'POST',
        body: JSON.stringify({ email, password, name }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to register.');
      }
    }
  };
  
  document
    .querySelector('.registration-form')
    .addEventListener('submit', registerFormHandler);