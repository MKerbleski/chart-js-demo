const express = require('express');
const csv = require('csv-parser')
const fs = require('fs');

const router = express.Router();
const results = [];

// When the server starts it parses the csv data into an array of objects and saves it to the server. 
fs.createReadStream('./data/data_0119.csv')
	.pipe(csv())
	.on('data', (data) => {
		results.push(data)
		})
	.on('end', () => {
		console.log(`completed parse of data_0119.csv`)
		fs.createReadStream('./data/data_0219.csv')
		.pipe(csv())
		.on('data', (data) => {
			results.push(data)
			})
		.on('end', () => {
			console.log(`completed parse of data_0219.csv`)
			fs.createReadStream('./data/data_0319.csv')
			.pipe(csv())
			.on('data', (data) => {
				results.push(data)
				})
			.on('end', () => {
				console.log(`completed parse of data_0319.csv`)
			});
		});
	});

// Note this can be reduced to return needed information more efficiently but is how I established unique relationships so I left it
router.get('/csv', (req, res, next) => {
	const unique = {
		strain: [],
		state: [],
		supercategory: [],
		category: [],
		condition: [],
		month: [],
	}

	const frequency = {
		strain: {},
		state: {},
		supercategory: {},
		category: {},
		condition: {},
		month: {},
	}

	const keys = Object.keys(unique)

	// loop though every item availble 
	results.forEach((item, i)=> {
		// keys are the fields on each item i.e. strain, state, condition...
		keys.forEach(key => {
			// if the value does not exist in the unique array, it is added
			if(!unique[key].includes(item[key])){
				unique[key].push(item[key])
			} else {
				// do nothing 
			}
			// this will establish many relationships between the categories by mapping the uniqe values onto themselves. 
			// i.e. what conditions are treated with seeds vs edibles
			// i.e. what state has the most strains 
			// this function gives far more information than is necessary but leaves the door open to explore data
			if(!frequency[key][item[key]]){
				// Establish object to count field frequency
				frequency[key][item[key]] = {count: 1, strain: [], state: [], condition: [], month: [], supercategory: [], category: []}
			} else {
				// add unique condition to above object if not already added 
				// this should be an object for efficiency 
				keys.forEach(keyAgain => {
					if(!frequency[key][item[key]][keyAgain].includes(item[keyAgain])){
						frequency[key][item[key]][keyAgain].push(item[keyAgain])
					}
				})
				// adds to the frequency count of the field
				frequency[key][item[key]].count++
			}
		})
	})
	// returns All data in an array , frequency of values as an object and unique values as an object
	res.status(200).json({ results, unique, frequency })
})

// This endpoint was established to sort the data specifically for the sate v month v category chart
router.get('/line', (req, res, next) => {

	const result = {}
	
	// loops through every item 
	results.forEach((item, i)=> {
		// if the state doesnt exist on the result object a blank template is added
		if(!result[item.state]){
			result[item.state] = { 
				labels: [], 
				dataSets: [
					{label: "0119", data:[]},
					{label: "0219", data:[]},
					{label: "0319", data:[]}
				]
			}
		} 

		// this section will go item by item and add unique values to the state while counting the frequency for that particular state
		// if the category doesn't exist on the state add it 
		// this is named labels for easy integration on the front end but it is categories
		if(!result[item.state].labels.includes(item.category)){
			result[item.state].labels.push(item.category)
			// initiates the count of the category in the state
			result[item.state].dataSets.forEach(dataset => dataset.data.push(1))
		} else {
			// the category is already established and the count needs to be updated
			const existingConditionIndex = result[item.state].labels.indexOf(item.category)

			const monthMap = {
				'0119': 0,
				'0219': 1,
				'0319': 2,
			}

			const monthIndex = monthMap[item.month]
			result[item.state].dataSets[monthIndex].data[existingConditionIndex]++
		}
	})
	res.status(200).json(result)
})

module.exports = router;