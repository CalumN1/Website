console.log("Front end working");

//clicker

// Initialize the score
let score = 0;

// Get the button and score display elements
const scoreDisplay = document.getElementById('score');
//const clickButton = document.getElementById('clicker');
const clickerSubmit = document.getElementById('clickerSubmit');

const submit = document.getElementById('submit');

// Function to increase the score and update the display
clicker.addEventListener('click', () => {
    score += 1;  // Increase score by 1 for each click
    scoreDisplay.textContent = `Clicker Score: ${score}`;
});

// Function to submit the score and update the display
clickerSubmit.addEventListener('click', () => {
    const playerName = prompt('Enter your name:');  // Get player name
    if (playerName) {
        fetch('/test/save-score', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: playerName, score: score })

        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Score saved successfully!');
                } else {
                    alert('Error saving score');
                }
            })
            .catch(error => console.error('Error:', error));
    }



    score = 0;  // reset score
    scoreDisplay.textContent = `Clicker Score: ${score}`;

    while (scoreList.hasChildNodes()) {
        scoreList.removeChild(list.firstChild);
    }

    // Fetch highscores again to update them
    fetch('http://localhost:3000/test/data')
        .then(response => response.json()) // Parse JSON from the response
        .then(data => {
            const scoreList = document.getElementById('scoreList');



            console.log("receiving...")
            //console.log(data)

            // Loop through the data and display each item in a list
            data.forEach(item => {
                const listItem = document.createElement('li');
                listItem.textContent = `Name: ${item.name}, Score: ${item.score}`; // Customize according to your data structure
                scoreList.appendChild(listItem);
                console.log(item.name)
            });
        })
        .catch(error => console.error('Hello, Error fetching data:', error));
});



// Fetch highscores from the backend when the page loads
fetch('http://localhost:3000/test/data')
    .then(response => response.json()) // Parse JSON from the response
    .then(data => {
        const scoreList = document.getElementById('scoreList');
        console.log("receiving...")
        console.log(data)

        // Loop through the data and display each item in a list
        data.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `Name: ${item.name}, Score: ${item.score}`; // Customize according to your data structure
            scoreList.appendChild(listItem);
            console.log(item.name)
        });
    })
    .catch(error => console.error('Hello, Error fetching data:', error));

document.getElementById('sendDataBtn').addEventListener('click', () => {
    const dataToSend = {
        name: 'John Doe',
        age: 25
    };

    // Send data to the back end using fetch (POST request)
    fetch('http://localhost:3000/api/data', {
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


fetch('https://swapi.dev/api/people/')
    .then(response => response.json()) // Convert the response to JSON
    .then(data => {
        console.log(data); // Do something with the data
        //alert(data.results[1].name);
    })
    .catch(error => {
        console.error('Error:', error); // Handle any errors
    });