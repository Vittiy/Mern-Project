require('dotenv').config({path: './config/.env'})
require('./config/db');
const express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    {checkUser, requireAuth} = require('./middleware/auth.middleware'),
    chalk = require('chalk'),
    app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
}))
app.use(cookieParser());

app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
   res.status(200).send(res.locals.user._id);
});

const userRoutes = require('./routes/user.routes');



// routes
app.use('/api/user', userRoutes);
app.use('/api/user/g', userRoutes);
app.use('/api/user/s', userRoutes);

// server
app.listen(process.env.PORT, () => {
   console.log(chalk.magenta("[SERVER] Server started at : http://localhost:" + process.env.PORT))
});
