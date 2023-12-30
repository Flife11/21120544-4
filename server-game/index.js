require('dotenv').config();
const { create } = require('express-handlebars');
const express = require('express');
const app = express();
const port = process.env.PORT | 3000
const router = require('./routers/router');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const session = require('express-session')
const CustomError = require('./models/customErr');
const cors = require('cors');


process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser("secret"))
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

require('./ulliti/passport')(app);

// app.use(express.json());

const hbs = create({
    extname: '.hbs'
});
app.engine('hbs', hbs.engine);
app.set('views', './views');
app.set('view engine', 'hbs');

// app.use(express.static(__dirname + '/views'))
app.use(router);

app.use((err, req, res, next) => {   
    let sc = 500;
    //console.log(sc);
    if (err instanceof CustomError) {
        sc = err.statusCode;
    }
    
    res.status(sc).render('error', {  
        pcss: () => 'css/errCSS',
        statuscode: sc,
        msg: err.message,
        description: err.stack,        
    })
})
console.log(port, 1);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));