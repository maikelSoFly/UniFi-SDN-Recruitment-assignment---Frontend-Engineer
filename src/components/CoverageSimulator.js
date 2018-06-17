import React, { Component } from 'react'
import './CoverageSimulator.css'
import CSConfigurationPanel from './CSConfigurationPanel'
import CSSimulationArea from './CSSimulationArea'

class CoverageSimulator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      coverageRadius: null,
      conf: { txPower: 4 }
    }

  }

  onConfigurationChanged = (conf) => {
    this.setState({
      conf: conf,
      coverageRadius: this.calculateRange(conf.txPower, -80, 1, 0, 0, 2.4)
    })
  }

  componentDidMount = () => {
    this.setState({
      coverageRadius: this.calculateRange(this.state.conf.txPower, -80, 1, 0, 0, 2.4)
    })
  }

  calculateRange = (txPower, rSens, gains, losses, fade, freq) => {
    let maxPathLoss = txPower - rSens + gains - losses - fade
    console.log(maxPathLoss)
    let range = Math.pow(10, (maxPathLoss - 32.44 - 20 * Math.log10(freq)) / 20)
    console.log(range)
    return range
  }

  render() {
    return (
      <div className='container'>
        <CSConfigurationPanel configurationChangedHandler={this.onConfigurationChanged}></CSConfigurationPanel>
        <CSSimulationArea coverageRadius={this.state.coverageRadius}></CSSimulationArea>

      </div>
    )
  }
}

export default CoverageSimulator