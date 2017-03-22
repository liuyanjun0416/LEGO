var webpack = require('webpack');
var config = require('../config/webpack.config.publish');
var chalk = require('chalk');

function publish(){
    webpack(config).run((err,stats) => {
        if(err){
            console.log('Fail To Publish',err);
            process.exit(1);
        }

        console.log(chalk.green('Publish successfully.'));
    });
}

module.exports = publish;

