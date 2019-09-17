import React , { Component } from 'react'
import styled from 'styled-components'

import { Doughnut } from 'react-chartjs-2';
import { getSomeRGBAColors } from '../../utils'

export default class DoughnutChart extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentDidMount(){

        const labels = Object.keys(this.props.data.frequency.state)
        const values = labels.map(condition => {
            return {
                stateName: condition,
                count: this.props.data.frequency.state[condition].count
            }
        })

        const sortedData = values.sort((a,b) => (a.count > b.count) ? -1 : 1)
        const sortedLabels = sortedData.map(state => state.stateName)
        const sortedValues = sortedData.map(state => state.count)
        const opacity = 80

        const data = {
            labels: sortedLabels, 
            datasets: [{
                label: '# of items',
                data: sortedValues,
                backgroundColor: getSomeRGBAColors(sortedValues.length, opacity)
            }]
        }

        const options = {
            title: {
                display: false,
                text: 'Items availble per state',
            },
            legend: {
                display: false
            }
        }
        this.setState({ data, options })
    }

    render(){
        const { data, options } = this.state
        return(
            <CompDiv>
                <h6>Items availble per state</h6>
                <Doughnut data={data} options={options} />
            </CompDiv>
        )
    }
}

const CompDiv = styled.div`
    border: 1px solid black;
    box-sizing: border-box;
    margin: 5px;
    padding: 10px;
    width: 49%;
`