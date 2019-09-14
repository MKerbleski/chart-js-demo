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
        console.log(this.props.data.frequency.condition)
        // const { stateKeys, datasets, options, stateIndex} = this.state
        const labels = Object.keys(this.props.data.frequency.state)
        console.log('labels', labels)
        const values = labels.map(condition => {
            return {
                stateName: condition,
                count: this.props.data.frequency.state[condition].count}
        })
        console.log('values', values)
        // console.log('values', values.sort((a,b) => (a.count < b.count) ? 1 : -1))
        // console.log('values', values)
        const sortedData = values.sort((a,b) => (a.count > b.count) ? -1 : 1)
        console.log('sortedData', sortedData)
        const sortedLabels = sortedData.map(state => state.stateName)
        const sortedValues = sortedData.map(state => state.count)
        // console.log('values', values)
        const transparency = 0.8
        const data = {labels: sortedLabels, datasets: [{
            label: '# of items',
            data: sortedValues,
            backgroundColor: getSomeRGBAColors(sortedValues.length, 80)
        }]}
        const options = {
            title: {
                display: false,
                text: 'Items availble per state',
            },
        }
        this.setState({ data, options })
    }

    render(){
        const { data, options } = this.state
        console.log(this.state)
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
    margin: 5px;
    box-sizing: border-box;
    padding: 10px;
    width: 49%;
`