var mongo = require('mongodb'),
	util = require('util'),
	config = require('./config');

// Connection URI
const uri =
	"mongodb://" + config.mongo_host + ":" + config.mongo_port + "/?ssl=false";
console.log("mongodb uri: " + uri);

// Create a new MongoClient
const client = new mongo.MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// Connect the client to the server
client.connect();
const db = client.db(config.db_name);
console.log("Connected to '" + config.db_name + "' database");

exports.findComplaintById = function (req, res) {
	var id = req.params.id;
	console.log('Retrieving complaint: ' + id);
	db.collection('complaints', function (err, collection) {
		collection.findOne({ 'ComplaintID': new BSON.ObjectID(id) }, function (err, item) {
			res.send(item);
		});
	});

};

exports.findComplaints = function (req, res) {
	var filter = {};
	var companyName = req.query.companyName;
	if (companyName != undefined && companyName.length > 0) { filter['company'] = companyName; };
	var timelyResponse = req.query.timelyResponse;
	if (timelyResponse != undefined && timelyResponse.length > 0) { filter['is_timely_response'] = timelyResponse; };
	var consumerDisputed = req.query.consumerDisputed;
	if (consumerDisputed != undefined && consumerDisputed.length > 0) { filter['has_consumer_disputed'] = consumerDisputed; };
	var page = req.query.page;
	if (page == undefined) { page = 1 };
	var pageSize = req.query.pageSize;
	if (pageSize == undefined) { pageSize = 10 };
	var limit = parseInt(pageSize);
	var offset = 0;
	if (page > 1) {
		offset = parseInt((page - 1) * limit);
	}

	db.collection('complaints', function (err, collection) {
		if (err) {
			throw err;
		} else {
			//console.log('countComplaints query: '+util.inspect(req.query));
			//console.log('countComplaints filter: '+util.inspect(filter)); 
			collection.find(filter).skip(offset).limit(limit).toArray(function (err, items) {
				if (err) {
					throw err;
				} else {
					res.send(items);
				}
			});
		}
	});
};

exports.countComplaints = function (req, res) {
	var filter = {};
	var companyName = req.query.companyName;
	if (companyName != undefined && companyName.length > 0) { filter['company'] = companyName; };
	var timelyResponse = req.query.timelyResponse;
	if (timelyResponse != undefined && timelyResponse.length > 0) { filter['is_timely_response'] = timelyResponse; };
	var consumerDisputed = req.query.consumerDisputed;
	if (consumerDisputed != undefined && consumerDisputed.length > 0) { filter['has_consumer_disputed'] = consumerDisputed; };

	db.collection('complaints', function (err, collection) {
		if (err) {
			throw err;
		} else {
			//console.log('countComplaints query: '+util.inspect(req.query));
			//console.log('countComplaints filter: '+util.inspect(filter));
			// Count the number of records
			collection.find(filter).count(function (err, collectionCount) {
				if (err) {
					throw err;
				} else {
					res.send({ count: collectionCount });
				}
			});
		}
	});
};

exports.companies = function (req, res) {

	db.collection('complaints', function (err, collection) {
		// List of companies with complaints
		collection.distinct('company', function (err, companyList) {
			if (err) {
				throw err;
			} else {
				res.send(companyList);
			}
		});
	});
};

exports.mostComplainedAboutCompany = function (req, res) {

	var minComplaints = req.query.minComplaints;
	if (minComplaints == undefined || minComplaints.length == 0) { minComplaints = 50 } else { minComplaints = parseInt(minComplaints); };
	db.collection('complaints', function (err, collection) {
		// List of companies with complaints
		collection.aggregate(
			[
				{
					'$group': {
						'_id': '$company',
						'count': { '$sum': 1 }
					}
				},
				{ '$sort': { 'total': -1 } },
				{ '$match': { count: { $gt: minComplaints } } }
			]).toArray(function (err, companyList) {
				if (err) {
					throw err;
				} else {
					res.send(companyList);
				}
		});
	});
};

exports.mostComplainedAboutProduct = function (req, res) {

	var minComplaints = req.query.minComplaints;
	if (minComplaints == undefined || minComplaints.length == 0) { minComplaints = 50 } else { minComplaints = parseInt(minComplaints); };
	db.collection('complaints', function (err, collection) {
		// List of companies with complaints
		collection.aggregate(
			[
				{
					'$group': {
						'_id': '$product',
						'count': { '$sum': 1 }
					}
				},
				{ '$sort': { 'total': -1 } },
				{ '$match': { count: { $gt: minComplaints } } }
			]).toArray(function (err, companyList) {
				if (err) {
					throw err;
				} else {
					res.send(companyList);
				}
		});
	});
};

exports.mostComplainedAboutSubProduct = function (req, res) {

	var minComplaints = req.query.minComplaints;
	if (minComplaints == undefined || minComplaints.length == 0) { minComplaints = 50 } else { minComplaints = parseInt(minComplaints); };
	db.collection('complaints', function (err, collection) {
		// List of companies with complaints
		collection.aggregate(
			[
				{
					'$group': {
						'_id': '$sub_product',
						'count': { '$sum': 1 }
					}
				},
				{ '$sort': { 'total': -1 } },
				{ '$match': { count: { $gt: minComplaints } } }
			]).toArray(function (err, companyList) {
				if (err) {
					throw err;
				} else {
					res.send(companyList);
				}
		});
	});
};

exports.mostComplainedAboutIssue = function (req, res) {

	var minComplaints = req.query.minComplaints;
	if (minComplaints == undefined || minComplaints.length == 0) { minComplaints = 50 } else { minComplaints = parseInt(minComplaints); };
	db.collection('complaints', function (err, collection) {
		// List of companies with complaints
		collection.aggregate(
			[
				{
					'$group': {
						'_id': '$issue',
						'count': { '$sum': 1 }
					}
				},
				{ '$sort': { 'total': -1 } },
				{ '$match': { count: { $gt: minComplaints } } }
			]).toArray(function (err, companyList) {
				if (err) {
					throw err;
				} else {
					res.send(companyList);
				}
		});
	});
};

exports.mostComplainedAboutSubIssue = function (req, res) {
	var minComplaints = req.query.minComplaints;
	if (minComplaints == undefined || minComplaints.length == 0) { minComplaints = 50 } else { minComplaints = parseInt(minComplaints); };
	db.collection('complaints', function (err, collection) {
		// List of companies with complaints
		collection.aggregate(
			[
				{
					'$group': {
						'_id': '$sub_issue',
						'count': { '$sum': 1 }
					}
				},
				{ '$sort': { 'total': -1 } },
				{ '$match': { count: { $gt: minComplaints } } }
			]).toArray(function (err, companyList) {
				if (err) {
					throw err;
				} else {
					res.send(companyList);
				}
		});
	});
};

exports.mostFrequentCompanyResponse = function (req, res) {

	var minComplaints = req.query.minComplaints;
	if (minComplaints == undefined || minComplaints.length == 0) { minComplaints = 50 } else { minComplaints = parseInt(minComplaints); };
	db.collection('complaints', function (err, collection) {
		// List of companies with complaints
		collection.aggregate(
			[
				{
					'$group': {
						'_id': '$company_response',
						'count': { '$sum': 1 }
					}
				},
				{ '$sort': { 'total': -1 } },
				{ '$match': { count: { $gt: minComplaints } } }
			]).toArray(function (err, companyList) {
				if (err) {
					throw err;
				} else {
					res.send(companyList);
				}
		});
	});
};