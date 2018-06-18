import React, { Component } from 'react'

import './CSConfigurationPanel.css'
import './CSRadioButton.scss'


class CSConfigurationPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      conf: {
        txPower: '4',
        frequency: '2400'
      },

    }
  }



  onDropdownChange = event => {
    this.setState({ conf: { ...this.state.conf, txPower: event.target.value } }, () => {
      this.props.configurationChangedHandler(this.state.conf)
    })

  }



  onRadioChanged = event => {
    this.setState({ conf: { ...this.state.conf, frequency: event.target.value } }, () => {
      this.props.configurationChangedHandler(this.state.conf)
    })
  }



  render() {

    return (
      <div className='cp-container'>
        <div className='cp-label'>TX Power</div>

        <label className="dropdown">
          <select value={this.state.txPowerValue} onChange={this.onDropdownChange}>
            <option value='4'>High(4dBm)</option>
            <option value='-6'>Medium(-6dBm)</option>
            <option value='-16'>Low(-16dBm)</option>
          </select>
        </label>
        <div className='cp-label' style={{ margin: '5px 0px 5px 0px' }}>Radio</div>


        <input
          type="radio"
          id="q_yes"
          name="q"
          value="2400"
          checked={this.state.conf.frequency === '2400'}
          onChange={this.onRadioChanged}

        />

        <label htmlFor="q_yes">
          <svg shapeRendering="optimizeQuality" preserveAspectRatio="xMidYMid meet" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
            <circle className="outer" fill="#BDBDBD" cx="32" cy="32" r="32"></circle>
            <circle className="inner" fill="#FFFFFF" cx="32" cy="32" r="28"></circle>
          </svg>
          <span className='cp-radio-label'> 2.4 GHz</span>
        </label>


        <br />
        <div style={{ marginTop: '3px' }}></div>

        <input
          type="radio"
          id="q_no"
          name="q"
          value="5000"
          checked={this.state.conf.frequency === '5000'}
          onChange={this.onRadioChanged} />
        <label htmlFor="q_no">
          <svg shapeRendering="optimizeQuality" preserveAspectRatio="xMidYMid meet" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
            <circle className="outer" fill="#BDBDBD" cx="32" cy="32" r="32"></circle>
            <circle className="inner" fill="#FFFFFF" cx="32" cy="32" r="28"></circle>
          </svg>
          <span className='cp-radio-label'> 5 GHz</span>
        </label >







      </div >
    )
  }
}

export default CSConfigurationPanel