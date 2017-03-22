const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const app = express();

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use(bodyParser.json({limit: '10000 kB'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// Always return the main index.html, so react-router render the route in the client

app.use('/',(req,res,next) => {
  res.set({
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "POST,GET",
			"Access-Control-Allow-Credentials": "true"
		});
    next();
})
app.use('/api/component', require('./api/component'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;