require('dotenv').config({path: './config/.env'})
require('./config/db');
const express = require('express'),
    bodyParser = require('body-parser'),
    chalk = require('chalk'),
    app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
}))

const userRoutes = require('./routes/user.routes');



// routes
app.use('/api/user', userRoutes);



// server
app.listen(process.env.PORT, () => {
   console.log(chalk.magenta("[SERVER] Server started at : http://localhost:" + process.env.PORT))
});