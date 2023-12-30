require('dotenv').config();
const { create } = require('express-handlebars');
const express = require('express');
const app = express();
const port = process.env.PORT | 3000
const router = require('./routers/router');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))

app.use(express.json());

app.use(router);

const server = https.createServer({
    key: fs.readFileSync('./certs/demo.key'),
    cert: fs.readFileSync('./certs/demo.cert')
}, app);

server.listen(port, () => console.log(`Example app listening on port ${port}!`));