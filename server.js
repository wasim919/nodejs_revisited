const express = require('express');
const app = express();
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Couldn\'t append to console.log file.');
    }
  });
  next();
});

app.use((req, res, next) => {
  res.render('maintenance');
})
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});


hbs.registerHelper('screamIt', (textInput) => {
    return textInput.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home', {
    pageTitle: 'Home Page',
    currentYear: new Date().getFullYear(),
    welcomeMessage: 'Welcome to our website'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.get('/projects', (req, res) => {
    res.render('projects', {
      pageTitle: 'About Page',
      currentYear: new Date().getFullYear()
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
