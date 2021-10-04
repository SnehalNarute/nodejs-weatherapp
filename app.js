const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// middleware
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

// import the route
const weatherRoute = require('./routes/weather');

// use View Engine
app.set('view engine', 'ejs');

// middleware route
app.use('/', weatherRoute);

app.listen(PORT, () => {
	console.log(`server listening at port ${PORT}`);
});
