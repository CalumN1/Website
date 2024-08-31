const express = require('express');
const app = express();
app.use(express.json())

function handler(req,res) {
	res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minimal HTML</title>
</head>

<body>
    <h1>Hello World Calum</h1>
    

</body>
<script>
    alert('Hello, World!');
</script>
</html>`)
}

const fooHandler = (req,res) => res.send("From Foo")


app.all('/', (req, res) => {

	console.log(req.body)

	res.send(req.body)

});

app.get('/test', handler)



app.listen(3000, () => console.log('App running on port 3000'));

