# AngryConsumer
A web app that provides filtering and visualizations for compliants received by the Consumer Finance Protection Bureau (CFPB).

# Technologies
This web application runs on a MEAN stack and was originally developed in 2016 using the package versions available at that time. See "Additional Notes"
* [MongoDB Community Server](https://www.mongodb.com/try/download/community) collection to store data from CPFB public dataset.
* [Express](https://expressjs.com/) middleware to connect API routes to Node.js server.
* [AngularJS](https://angularjs.org/) for conroller to interact with API routes.
* [Node.js](https://nodejs.org/en/) for app server and queries to MongoDB.
* [Bootstrap](https://getbootstrap.com/) for UI theme & custom CSS.
* [Google Charts API](https://developers.google.com/chart) for visualizations.

# Data
Consumer Complaints Database is a public [dataset](https://www.consumerfinance.gov/data-research/consumer-complaints/#download-the-data) available via consumerfinance.gov.

# How To
## Install
Clone the repo and at the root folder run
```
npm install
```

Install MongoDB for your development machine. I use Robomongo aka [Studio3T](https://robomongo.org/) for a GUI client.

## Import Dataset
* Download the CSV file from CPFB link [here](https://www.consumerfinance.gov/data-research/consumer-complaints/#download-the-data)
* Save as file in [/data/ConsumerComplaints.csv](/data/ConsumerComplaints.csv)
* Modify [/data/dataset_header.txt](/data/dataset_header.txt) for the columns you are interested in.
* *Windows* - run [/data/Import_Dataset.bat](/data/Import_Dataset.bat) to import the collection into MongoDB
* *Mac/Linux* - run [/data/Import_Dataset.sh](/data/Import_Dataset.sh) to run the script that imports the collection into MongoDB

## Configure MongoDB
Using the [/config.js](/config.js) file, update to your `mongo_port` and `node_port` for the ports on which you wish to run MongoDB and Node.js respectively.

## Run App
Once collection has been imported to database and app configured, run `npm start` and you will see the console messages shown below
```
$ npm start

> angry-consumer@1.0.0 start C:\Users\navin\Documents\Projects\Github\AngryConsumer
> node server.js

mongodb uri: mongodb://localhost:27017/?ssl=false
Connected to 'consumer-finance-explore' database
Express server listening on port 3000, DB is MongoDB

```

In your browser, open http://localhost:3000/ to see the app

# Demo
## Live
This app has been hosted at https://angry-consumer.nvarma.com/ with data from 2020.

## Preview
### Server side paginated, filterable dynamic table
![Screenshot from the app](/assets/AngryConsumer_Preview.png)

### Visualization using Google Charts API
![Visualization from the app](/assets/AngryConsumer_Viz.png)
![Visualization 2 from the app](/assets/AngryConsumer_Viz2.png)

# Additonal Notes
This web application runs on a MEAN stack and was originally developed in 2016 using the package versions available at that time. The data has been updated over the years and the last update was in 2020. This was a project to learn developing in the MEAN stack when it was up and coming library, coding practices were mostly to follow clear separation of API routes, Node server logic and DB queries to present them in cool looking UI views. Most of the code is self-explanatory with little comments strewn around.