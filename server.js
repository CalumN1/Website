// Import the Express module
const express = require('express');

const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

const path = require('path');

// Load environment variables from the .env file
dotenv.config();

// Create an instance of Express
const app = express();
// Define a port number , 3000 is default anyway
const port = 3000;

const mongoUri = process.env.MONGO_URI;  // Use the connection string from .env

app.use(express.json())

function handler(req,res) {
	//res.send("Hello world")
    res.sendFile(path.join(__dirname, 'public', 'front.html'));
}

// API route to receive data
app.post('/api/data', (req, res) => {
    const receivedData = req.body; // This is the data sent from the front end
    console.log('Data received:', receivedData);

    // You can process the data here (e.g., save it to a database)
    const processedData = receivedData.age - 5

    // Send a response back to the front end
    res.json({ message: 'Data received successfully', data: processedData });
});


//cluster database: user: calumnewton01   pw: U6ukCOS5cVmxKPu1


const fooHandler = (req,res) => res.send("From Foo")

app.all('/', (req, res) => {

	console.log(req.body)

	res.send(req.body)

});

app.get('/test', handler)


app.listen(3000, () => console.log('App running on port 3000'));

