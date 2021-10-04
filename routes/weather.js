const express = require('express');
const router = express.Router();
require('dotenv').config();
let API_KEY = process.env.API_KEY;

const fetch = require('cross-fetch');

router.get('/', (req, res) => {
	res.render('index', {
		city: null,
		des: null,
		icon: null,
		temp: null,
		country: null,
	});
});

router.post('/', async (req, res) => {
	const city = req.body.city;
	const url_api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

	try {
		await fetch(url_api)
			.then((res) => res.json())
			.then((data) => {
				if (data.message === 'city not found') {
					res.render('index', {
						city: data.message,
						des: null,
						icon: null,
						temp: null,
						country: null,
					});
				} else {
					const city = data.name;
					const des = data.weather[0].description;
					const icon = data.weather[0].icon;
					const country = data.sys.country;
					var temp = data.main.temp;
					res.render('index', {
						city,
						des,
						icon,
						temp,
						country,
					});
				}
			});
	} catch (err) {
		res.render('index', {
			city: 'something wrong',
			des: null,
			icon: null,
			temp: null,
			country: null,
		});
	}
});

module.exports = router;
