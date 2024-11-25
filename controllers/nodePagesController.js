// controllers/displayController.js

// Define the function that handles the display route
exports.showMessage = async (req, res) => {
    const db = req.app.locals.db;
    const path = require('path');
    const text = req.params.text;
    let xyz;

    try {
        xyz = await db.collection('Nodes').findOne({ name: text });
        //if (!xyz) {
        // No document was found, so send a response to the client
        //return res.status(404).send(`<h1>No node found with name "${text}"</h1><a href="/display">Go back</a>`);
        //}
        //console.log(xyz.name); // This will print the document, as `await` has paused until `findOne` resolves.
    } catch (error) {
        console.error('Error fetching node:', error); // Handles any errors that occur.
    }

    //console.log(xyz)

    if (!xyz) {
        // Send a custom message as an HTML response   images?
        //res.sendFile(path.join(__dirname, '../newPage.html'));
         res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Display Message</title>
                <link rel="stylesheet" href="/css/styles.css" rel="preload">
            </head>
            <body>
                <h1 contenteditable="true" >Title Here</h1>
                <p contenteditable="true" >Domain Here</p>
                <a href="/display">Go back</a>
                <p contenteditable="true" >Description Here</p>
            </body>
            </html>
        `); 

    }
    else {

        // Send a custom message as an HTML response   images?
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Display Message</title>
                <link rel="stylesheet" href="/css/styles.css" rel="preload">
            </head>
            <body>
                <img src=${xyz.Image} alt="${text} image"> 
                <h1>${text}</h1>
                <p>${xyz.Domain}</p>
                <a href="/display">Go back</a>
                <p>${xyz.Description}</p>
            </body>
            <script src="scripts/newPage.js"></script>
            </html>
        `);

    }




};