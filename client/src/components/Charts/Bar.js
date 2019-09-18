import React , { Component } from 'react'
import styled from 'styled-components'
import { Bar } from 'react-chartjs-2';
import { getSomeRGBAColors } from '../../utils'

export default class MyBar extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentDidMount(){
        const labels = Object.keys(this.props.data.frequency.category)

        const values = labels.map(condition => {
            return this.props.data.frequency.category[condition].count
        })

        const opacity = .7

        const data = {labels, datasets: [{
            label: '# of items',
            data: values,
            backgroundColor: getSomeRGBAColors(40, opacity)
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
        return(
            <CompDiv>
                <h6>Items availble per condition</h6>
                <Bar data={data} options={options} />
            </CompDiv>
        )
    }
}

const CompDiv = styled.div`
    border: 1px solid black;
    box-sizing: border-box;
    margin: 5px;
    width: 49%;
    padding: 10px;
`