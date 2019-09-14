import React , { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Line } from 'react-chartjs-2';

export default class LineGraph extends Component {
    constructor(props){
        super(props)
        this.state = {
            stateKeys: [],
            stateIndex: 0,
            options: { title: {
                display: true,
                text: 'loading'
            }},
            labels: [],
            dataSets: [
                {
                    fill: true,
                    backgroundColor: 'rgba(0, 255, 0, .5)',
                },
                {
                    fill: true,
                    backgroundColor: 'rgba(255, 0, 0, .5)',
                },
                {
                    fill: true,
                    backgroundColor: 'rgba(0, , 255, .5)',
                },
            ],
        }
    }

    componentDidMount(){
        axios.get('/api/radar').then(res => {
            const stateKeys = Object.keys(res.data.answer.states)
            this.setState({
                stateKeys, 
                dataFromServer: res.data.answer.states,
            })
            this.changeLocation(this.state.stateIndex)
        }).catch(err => {
            this.setState({
                data: null
            })
            console.log('err', err)
        })
    }

    changeLocation = (stateIndex) => {
        const { dataFromServer, stateKeys } = this.state

        const   monthSettings = [
                {
                    fill: true,
                    backgroundColor: 'rgba(0, 255, 0, .2)',
                },
                {
                    fill: true,
                    backgroundColor: 'rgba(255, 0, 0, .2)',
                },
                {
                    fill: true,
                    backgroundColor: 'rgba(0, 0, 255, .2)',
                },
            ]
        
        // console.log(dataFromServer[stateKeys[0]].labels)
        const labels = dataFromServer[stateKeys[stateIndex]].labels
        const options = {
            title: {
                display: false,
                text: stateKeys[stateIndex]
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                      display: true,
                      labelString: 'Category'
                    }
                  }],
                  yAxes: [{
                    display: true,
                    scaleLabel: {
                      display: true,
                      labelString: 'Items Availible'
                    }
                  }]
            },
        }

        const datasets = monthSettings.map((dataSet, i) => {
           return { 
                data: dataFromServer[stateKeys[stateIndex]].dataSets[i].data,
                label: dataFromServer[stateKeys[stateIndex]].dataSets[i].label,
                fill: true,
                backgroundColor: monthSettings[i].backgroundColor
            }
        })

        this.setState({
            labels, datasets, options, stateIndex
        })
    }

    render(){
        const { stateKeys, labels, datasets, options, stateIndex} = this.state
        const data = {labels, datasets}

        return(
            <RadarDiv> 
                <h1>Number of items availble per state, in each month, by category.</h1>
                <h6>State: {options.title.text}</h6>
                {stateIndex > 0 ? <button onClick={() => this.changeLocation( stateIndex-1)}>Prev State</button> : null}
                {stateIndex < stateKeys.length-1 ? <button onClick={() => this.changeLocation(stateIndex+1)}>Next State</button>: null}
                <Line className='radar' data={data} options={options} />
            </RadarDiv>
        )
    }
}

const RadarDiv = styled.div`
    border: 1px solid red;
    width: 100%;
    height: 70%;
    color: black;
    .radar{
        width: 100%;
    }
`