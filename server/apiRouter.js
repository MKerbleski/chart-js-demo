const express = require('express');
const csv = require('csv-parser')
const fs = require('fs');
const router = express.Router();
const results = [];

fs.createReadStream('./data/data_0119.csv')
.pipe(csv())
.on('data', (data) => {
	results.push(data)
	})
.on('end', () => {
	fs.createReadStream('./data/data_0219.csv')
	.pipe(csv())
	.on('data', (data) => {
		results.push(data)
		})
	.on('end', () => {
		fs.createReadStream('./data/data_0319.csv')
		.pipe(csv())
		.on('data', (data) => {
			results.push(data)
			})
		.on('end', () => {
			
		});
	});
});

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
	
	results.forEach((purchase, i)=> {
		keys.forEach(key => {
			if(!unique[key].includes(purchase[key])){
				unique[key].push(purchase[key])
			} else {
				// do nothing
			}
			
			if(!frequency[key][purchase[key]]){
				frequency[key][purchase[key]] = {count: 1, strain: [], state: [], condition: [], month: [], supercategory: [], category: []}
			} else {
				keys.forEach(keyAgain => {
					if(!frequency[key][purchase[key]][keyAgain].includes(purchase[keyAgain])){
						frequency[key][purchase[key]][keyAgain].push(purchase[keyAgain])
					}
				})
				// if(!frequency[key][purchase[key]].strain.includes(purchase.strain)){
				// 	frequency[key][purchase[key]].strain.push(purchase.strain)
				// }
				// if(!frequency[key][purchase[key]].state.includes(purchase.state)){
				// 	frequency[key][purchase[key]].state.push(purchase.state)
				// }
				// if(!frequency[key][purchase[key]].condition.includes(purchase.condition)){
				// 	frequency[key][purchase[key]].condition.push(purchase.condition)
				// }
				frequency[key][purchase[key]].count++
			}
		})
	})
	res.status(200).json({results, unique, frequency})
})

router.get('/radar', (req, res, next) => {

	const unique = {
		strain: [],
		state: [],
		supercategory: [],
		category: [],
		condition: [],
		month: [],
	}

	const answer = {
		states: {},
	}
	const keys = Object.keys(unique)
	
	results.forEach((purchase, i)=> {
			// const stateObj = answer.states[purchase.state]
		if(!answer.states[purchase.state]){
			answer.states[purchase.state] = { 
				labels: [], 
				dataSets: [
					{label: "0119", data:[]},
					{label: "0219", data:[]},
					{label: "0319", data:[]}
				]
			}
		} 

		const conditionIndex = answer.states[purchase.state].labels.length
		if(purchase.category){

			if(!answer.states[purchase.state].labels.includes(purchase.category)){
				answer.states[purchase.state].labels.push(purchase.category)
				answer.states[purchase.state].dataSets.forEach(dataset => dataset.data.push(1))
			} else {
				// the category is already on the label but we still need to add the month data
				const existingConditionIndex = answer.states[purchase.state].labels.indexOf(purchase.category)

				const monthMap = {
					'0119': 0,
					'0219': 1,
					'0319': 2,
				}
				monthMap[purchase.month]
				const monthIndex = monthMap[purchase.month]
				answer.states[purchase.state].dataSets[monthIndex].data[existingConditionIndex]++
			}
		} else {
			console.log('hi', purchase)
		}

	})
	res.status(200).json({answer})
})


module.exports = router;
