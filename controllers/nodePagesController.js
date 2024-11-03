// controllers/displayController.js

// Define the function that handles the display route
exports.showMessage = async (req, res) => {
    const db = req.app.locals.db;
    const text = req.params.text;

    //const result = await db.collection('Nodes').findOne({ name: text });
    const xyz = await db.collection('Nodes').findOne({ name: text });
    console.log(xyz)

    // Send a custom message as an HTML response
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Display Message</title>
        </head>
        <body>
            <h1>${text}</h1>
            <p>${xyz.Domain}</p>
            <a href="/display">Go back</a>
            <p>${xyz.Description}</p>
        </body>
        </html>
    `);
};