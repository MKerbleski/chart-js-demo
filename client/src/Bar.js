import React , { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Bar } from 'react-chartjs-2';

export default class MyBar extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentDidMount(){
console.log(this.props.data.frequency.condition)

        // const { stateKeys, datasets, options, stateIndex} = this.state
        const labels = Object.keys(this.props.data.frequency.condition)
        console.log('labels', labels)
        const values = labels.map(condition => {
            return this.props.data.frequency.condition[condition].count
        })
        const transparency = 0.8
        const data = {labels, datasets: [{
            label: '# of items',
            data: values,
            backgroundColor: [
                `rgb(255,224,230, ${transparency})`,
                `rgb(255,236,217, ${transparency})`,
                `rgb(255, 245, 221, ${transparency})`,
                `rgb(219,242, 242, ${transparency})`,
                `rgb(215,236,251, ${transparency})`,
                `rgb(235,224,255, ${transparency})`,
            ]
        }]}
        const options = {
            title: {
                display: false,
                text: 'Items availble per condition',
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                      display: true,
                      labelString: 'Condition'
                    }
                  }],
                  yAxes: [{
                    display: true,
                    scaleLabel: {
                      display: false,
                      labelString: 'Items'
                    }
                  }]
            },
        }
        this.setState({ data, options })
    }



    render(){
        const { data, options } = this.state
        console.log(this.state)
        return(
            <CompDiv>
                <h6>Items availble per condition</h6>
                <Bar className='bar' data={data} options={options} />
            </CompDiv>
        )
    }
}

const CompDiv = styled.div`
    border: 1px solid red;
    width: 50%;
    height: 50vh;
    .bar{
        width: 100%;
    }
`