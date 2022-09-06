#!/bin/sh
mongoimport --db consumer-finance-explore --collection complaints --type csv --headerline --drop --file Consumer_Complaints.csv