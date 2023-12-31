require('dotenv').config();
const { create } = require('express-handlebars');
const express = require('express');
const app = express();
const port = process.env.PORT | 3003
const router = require('./routers/router');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');
const cors = require("cors");
console.log(port);
//process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/certs'));
app.use(express.static(__dirname + '/ulliti'));

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));
app.use(express.json());

const hbs = create({
    extname: '.hbs'
});
app.engine('hbs', hbs.engine);
app.set('views', './views');
app.set('view engine', 'hbs');

app.use(router);

// var fs = require("fs");

// fs.readFile('./server-auth/img/img1.jpg', function(err, data) {
  
//     fs.writeFile('image.jpg', data, (err) => {
//         console.log(err);
//     })
// });

const server = https.createServer({
    key: fs.readFileSync('./server-auth/certs/demo.key'),
    cert: fs.readFileSync('./server-auth/certs/demo.cert')
}, app);

server.listen(port, () => console.log(`Example app listening on port ${port}!`));