import React, { Component } from 'react'

import './CSConfigurationPanel.css'


class CSConfigurationPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      txPowerValue: '4',
    }
  }



  handleChange = event => {
    this.setState({ txPowerValue: event.target.value }, () => {
      this.props.configurationChangedHandler({ txPower: this.state.txPowerValue })
    })

  }



  render() {

    return (
      <div className='cp-container'>
        <div className='cp-label'>TX Power</div>

        <label className="dropdown">
          <select value={this.state.txPowerValue} onChange={this.handleChange}>
            <option value='4'>High(4dBm)</option>
            <option value='-6'>Medium(-6dBm)</option>
            <option value='-16'>Low(-16dBm)</option>
          </select>
        </label>
        <div className='cp-label' style={{ marginTop: '5px' }}>Radio</div>

        <tbody>
          <tr>
            <td><input type="radio" name="site_name"
              value={result.SITE_NAME}
              checked={this.state.site === result.SITE_NAME}
              onChange={this.onSiteChanged} />{result.SITE_NAME}</td>
            <td><input type="radio" name="address"
              value={result.ADDRESS}
              checked={this.state.address === result.ADDRESS}
              onChange={this.onAddressChanged} />{result.ADDRESS}</td>
          </tr>
        </tbody>
      </div >
    )
  }
}

export default CSConfigurationPanel