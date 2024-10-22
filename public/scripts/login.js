
const submit = document.getElementById('submit');

// Function to submit the score and update the display
submit.addEventListener('click', () => {

    // Get the button display elements
    
    const username = document.getElementById('inputUsername').textContent;
    const password = document.getElementById('inputPassword').textContent;

    const dataToSend = {
        username: username,
        password: password
    };
    alert(username);

    // Send data to the back end using fetch (POST request)
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend) // Convert JavaScript object to JSON
    })
        .then(response => response.json()) // Parse the JSON response
        .then(data => console.log('Response from server:', data))
        .catch(error => console.error('Error:', error));
});
