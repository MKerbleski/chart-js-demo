import React , { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Radar } from 'react-chartjs-2';
 

export default class Comp extends Component {
    constructor(props){
        super(props)
        this.state = {
            radarData: {
                labels: ['Running', 'Swimming', 'Eating', 'Cycling'],
                datasets: [{
                    data: [20, 10, 4, 2]
                }]
              },
              optionsData: {},
        }
    }

    componentDidMount(){
        axios.get('/api/radar').then(res => {
            this.setState({
                data : res.data
            })
            console.log('res', res)
            }).catch(err => {
            this.setState({
                data: null
            })
            console.log('err', err)
            })
    }


    render(){
        const { radarData, optionsData } = this.state
        return(
            <CompDiv> 
          <Radar data={radarData} options={optionsData} />
            </CompDiv>
        )
    }
}

const CompDiv = styled.div`
    border: 1px solid red;
`