// Import the Express module
const express = require('express');

const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

const path = require('path');

// Load environment variables from the .env file
require('dotenv').config();

// Create an instance of Express
const app = express();
// Define a port number , 3000 is default anyway
const port = 3000;

//for testing, print the .env connection string
//console.log(process.env.MONGO_URI);
const mongoUri = process.env.MONGO_URI;  // Use the connection string from .env

app.use(express.json())

// Serve static files (like images) from the "public" folder
app.use(express.static('public'));

// Import the showMessage function
const nodePagesController = require('./controllers/nodePagesController');

// API route to receive data
app.post('/api/data', (req, res) => {
  const receivedData = req.body; // This is the data sent from the front end
  console.log('Data received:', receivedData);

  // You can process the data here (e.g., save it to a database)
  const processedData = receivedData.age - 5

  // Send a response back to the front end
  res.json({ message: 'Data received successfully', data: processedData });
});

// API route to receive data
app.post('/login', (req, res) => {
  const receivedData = req.body; // This is the data sent from the front end
  console.log('Data received:', receivedData);

  // process the data here (e.g. save it to a database)

  console.log(receivedData.username, receivedData.password)

  // Send a response back to the front end
  res.json({ message: 'Data received successfully', data: receivedData });
});



//const fooHandler = (req,res) => res.send("From Foo")

app.all('/', (req, res) => {

  console.log(req.body)

  res.send(req.body)

});

function homeHandler(req, res) {
  //res.send("Hello world")
  res.sendFile(path.join(__dirname, 'index.html'));

}

function loginHandler(req, res) {
  //res.send("Hello world")
  res.sendFile(path.join(__dirname, 'login.html'));

}

function displayHandler(req, res) {
  //res.send("Hello world")
  res.sendFile(path.join(__dirname, 'display.html'));

}

function testpagehandler(req, res) {
  //res.send("Hello world")
  res.sendFile(path.join(__dirname, 'testpage.html'));

}


// Connect to MongoDB
let db;
MongoClient.connect(mongoUri, {})
  .then(client => {
    console.log('Connected to MongoDB');
    db = client.db('Website');  // database name

    // Store the database connection in app.locals
    app.locals.db = db;

    // Define routes after successful connection

    // Example route to save data to the database
    /* app.post('/data', (req, res) => {
      const data = req.body;  // Get data from the client (front end)
      db.collection('myCollection').insertOne(data)  // Insert data into collection
        .then(result => res.send('Data saved successfully'))
        .catch(error => res.status(500).send('Error saving data'));
    }); */

    // API route to get data from MongoDB
    app.get('/test/data', async (req, res) => {

      try {
        const data = await db.collection('HighScores').find().sort({ score: -1 }).toArray();
        res.json(data);  // Send the data as a JSON response
        console.log("High Score data sent")
      } catch (err) {
        res.status(500).send('Error fetching data');
        console.log("error caught 84")
      }

    });

    // API route to get data from MongoDB
    app.get('/display/data', async (req, res) => {

      try {
        const data = await db.collection('Nodes').find().toArray();
        res.json(data);  // Send the data as a JSON response
        console.log("Node data sent")
      } catch (err) {
        res.status(500).send('Error fetching data');
        console.log("error caught 84")
      }

    });

    // Dynamic route for /display/:text
    // Define the route using the imported function as the handler
    app.get('/display/:text', nodePagesController.showMessage);

    // API route to save score
    app.post('/test/save-score', async (req, res) => {
      const { name, score } = req.body;
      const currentDate = new Date();

      // Document to insert into MongoDB
      const newEntry = {
        name: name,
        score: score,
        date: currentDate  // MongoDB will automatically store this as ISODate
      };

      try {
        const result = await db.collection('HighScores').insertOne(newEntry);
        res.json({ success: true, message: 'Score saved!' });
        console.log("High Score Saved")
      } catch (error) {
        res.status(500).json({ success: false, message: 'Error saving score' });
        console.log("Error saving score", currentDate)
      }
    });

    app.get('/home', homeHandler)

    app.get('/login', loginHandler)

    app.get('/display', displayHandler)

    app.get('/testpage', testpagehandler)


    // Start the server after the database connection
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch(error => console.error('Error connecting to MongoDB:', error));


//app.listen(3000, () => console.log('App running on port 3000'));

