require('dotenv').config({path: './config/.env'})
require('./config/db');
const express = require('express'),
    chalk = require('chalk'),
    app = express();

app.listen(process.env.PORT, () => {
   console.log(chalk.magenta("[SERVER] Server started at : http://localhost:" + process.env.PORT))
});