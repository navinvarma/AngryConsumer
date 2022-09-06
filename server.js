var http = require('http'),
    express = require('express'),
	path = require('path'),
	api = require('./api'),
	config = require('./config');
 
var app = express();

app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.get('/visualization', function (req, res) {
   res.sendFile(path.join(__dirname + '/views/visualization.html'));
});

app.get('/about', function (req, res) {
   res.sendFile(path.join(__dirname + '/views/about.html'));
});

app.get('/controller.js', function (req, res) {
   res.sendFile(path.join(__dirname + '/controller.js'));
});

app.get('/api.js', function (req, res) {
   res.sendFile(path.join(__dirname + '/api.js'));
});

app.get('/assets/custom.min.css', function (req, res) {
   res.sendFile(path.join(__dirname + '/assets/custom.min.css'));
});

app.get('/complaint/:id', api.findComplaintById);
app.get('/complaints', api.findComplaints);
app.get('/complaints/count', api.countComplaints);
app.get('/complaints/companies/list', api.companies);
app.get('/complaints/mostComplainedAboutCompany', api.mostComplainedAboutCompany);
app.get('/complaints/mostComplainedAboutProduct', api.mostComplainedAboutProduct);
app.get('/complaints/mostComplainedAboutSubProduct', api.mostComplainedAboutSubProduct);
app.get('/complaints/mostComplainedAboutIssue', api.mostComplainedAboutIssue);
app.get('/complaints/mostComplainedAboutSubIssue', api.mostComplainedAboutSubIssue);
app.get('/complaints/mostFrequentCompanyResponse', api.mostFrequentCompanyResponse);
 
app.listen(config.node_port, function() {
    console.log('Express server listening on port ' + config.node_port + ', DB is MongoDB');
});