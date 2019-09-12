import React , { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Radar } from 'react-chartjs-2';

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

            optionsData: {},
        }
    }

    componentDidMount(){
        axios.get('/api/radar').then(res => {
            console.log('res', res)
            // const newRadarData = JSON.parse(JSON.stringify(radarData))
            // {
            //     label: 'test3',
            //     fill: true,
            //     backgroundColor: 'rgba(0, 0, 255, .5)',
            //     data: [65, 3, 23, 43, 54, 45, 65, 75, 77],
            // },
            const stateKeys = Object.keys(res.data.answer.states)
            console.log('stateKeys', stateKeys)
            // const monthKeys = Object.keys(res.data.answer.states[stateKeys[0]])
            // console.log('monthKeys', monthKeys)
            const stateData = {
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
            console.log(res.data.answer.states[stateKeys[0]].labels)
            stateData.labels = res.data.answer.states[stateKeys[0]].labels
            stateData.dataSets.forEach((dataSet, i) => {
                dataSet.data = res.data.answer.states[stateKeys[0]].dataSets[i].data
                dataSet.label = res.data.answer.states[stateKeys[0]].dataSets[i].label
            })

            console.log('stateData', stateData)

            this.setState({
                ...stateData

            })
        }).catch(err => {
            this.setState({
                data: null
            })
            console.log('err', err)
        })
    }


    render(){
        const { labels, dataSets, optionsData } = this.state
        console.log('this.state', this.state)
        const data = {labels, datasets: dataSets}
        console.log('data', data)
        console.log('radarData', radarData)
        return(
            <CompDiv> 
                <Radar className='radar' data={data} options={optionsData} />
            </CompDiv>
        )
    }
}

const CompDiv = styled.div`
    border: 1px solid red;
    width: 100%;
    height: 100%;
    .radar{
        width: 100%;
    }
`