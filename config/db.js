const mongoose = require('mongoose'),
    chalk = require('chalk');

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.CLUSTER_URI}/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log(`${chalk.magenta("[Mongoose] ")} Database Connected.`)).catch((e) => {
    console.log(chalk.red("[Database]") + " Error while connecting..");
    console.log(chalk.grey(e.message));
});