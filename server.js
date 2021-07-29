const express = require('express'),
    chalk = require('chalk'),
    app = express();

app.listen(5000, () => {
   console.log(chalk.magenta("[SERVER] Server started at : http://localhost:5000"))
});