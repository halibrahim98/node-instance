let express = require('express');
let morgan = require('morgan');

let app = express();

app.use(morgan('combined'));

app.get('/welcome/:msgId', (req, res, next) => { 
    res.statusCode = 200; 
    res.setHeader('Content-Type', 'application/json'); 
    let msg = {
        "1": "Hello",
        "2": "Bye" 
    }
    res.json({ message: msg[ req.params.msgId ] || "Unknown"});
    res.end(); 
});



// app.listen(8080, '0.0.0.0');
module.exports = app;