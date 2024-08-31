// Import the Express module
const express = require('express');

const path = require('path');

// Create an instance of Express
const app = express();
// Define a port number , 3000 is default anyway
const port = 3000;

app.use(express.json())

function handler(req,res) {
	//res.send("Hello world")
    res.sendFile(path.join(__dirname, 'public', 'front.html'));
}



const fooHandler = (req,res) => res.send("From Foo")

app.all('/', (req, res) => {

	console.log(req.body)

	res.send(req.body)

});

app.get('/test', handler)


app.listen(3000, () => console.log('App running on port 3000'));

