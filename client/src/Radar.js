import React , { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Line } from 'react-chartjs-2';

const radarData = {
    labels: ['Running', 'Swimming', 'Eating', 'Cycling', 'a', 'b', 'b', 'r'],
    datasets: [  
        {
            label: 'test1',
            fill: true,
            backgroundColor: 'rgba(255, 0, 0, .5)',
            data: [20, 10, 4, 2, 4, 76, 8, 4, 6],
        },
        {
            label: 'test2',
            fill: true,
            backgroundColor: 'rgba(0, 255, 0, .5)',
            data: [24, 17, 34, 62, 74, 76, 98, 5, 7],
        },
        {
            label: 'test3',
            fill: true,
            backgroundColor: 'rgba(0, 0, 255, .5)',
            data: [65, 3, 23, 43, 54, 45, 65, 75, 77],
        },
    ]
}
export default class Comp extends Component {
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
                      labelString: 'Purchases'
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
            <CompDiv> 
                <h1>How states consume, by month.</h1>
                <h2>state: {options.title.text}</h2>
                {stateIndex>0 ? <button onClick={() => this.changeLocation( stateIndex-1)}>Prev State</button> : null}
                {stateIndex<stateKeys.length-1?<button onClick={() => this.changeLocation(stateIndex+1)}>Next State</button>: null}
                <Line className='radar' data={data} options={options} />
            </CompDiv>
        )
    }
}

const CompDiv = styled.div`
    border: 1px solid red;
    width: 100%;
    height: 100%;
    color: black;
    .radar{
        width: 100%;
    }
`