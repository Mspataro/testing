const express = require("express");
const fs 	  = require('fs');	
const ejs	  = require('ejs');



const port = process.env.PORT || 3000;

var app = express();

app.locals.date = ()=>{
	return new Date().toString();	
};

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public')) //app.use() is how you declare middleware

app.use((req, res, next)=>{
	let date = app.locals.date()
	var log = `${req.url} accesed on ${date}`
	fs.appendFile('server.log', log + '\n', (err) =>{
		if(err){
			console.log('Unable to append server to file')
		}
	});
	next()
});


app.locals.addSum = (a,b) => {
	return a + b
};

app.locals.screamIt = (word) => {
	return word.toUpperCase();
};



app.get('/', (req, res) => {
	res.render('home', {
		headTitle: "Home",
		pageTitle: "In The Know",
		welcome1: "Welcome to the best website, for never missing a moment from your favorite people!",
		currentDate: app.locals.date()
	});

});


	

app.get('/about', (req, res) => {
	res.render('about', {
		pageTitle: "About Page"
		
	});
});




app.listen(port, () => {
	console.log(`Server running on port: ${port}`)
});

//app that helps people find entertainers, games, shows, movies, blog posts, forum posts, apps, etc.. based on a swiping esque mechanism, where people can post 
//snapshots of their content to attract new viewers through video, pictures or written format. Reddit style voting system on creators and comments on the pages.
//