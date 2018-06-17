import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './CSSimulationArea.css'
import Draggable from './Draggable'
import routerImg from '../router.png'


class CSSimulationArea extends Component {
  constructor(props) {
    super(props)
    this.state = {
      coverageDiameterInPx: 0,
      receivers: []
    }
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.onWindowResize)

    for (var i = 0; i < 10; i++) {
      this.state.receivers.push({
        x: Math.random(),
        y: Math.random(),
        insideRange: false
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.coverageRadius !== prevProps.coverageRadius) {

      let elementRect = ReactDOM.findDOMNode(this).getBoundingClientRect()
      this.setState({
        coverageDiameterInPx: this.translateMetersToPx(elementRect.width, this.props.coverageRadius)
      })
    }
  }

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.onWindowResize);
  }

  onWindowResize = () => {
    let elementRect = ReactDOM.findDOMNode(this).getBoundingClientRect()
    this.setState({
      coverageDiameterInPx: this.translateMetersToPx(elementRect.width, this.props.coverageRadius)
    })
  }

  translateMetersToPx = (areaWidth, dist) => {
    return (areaWidth * 0.00175) * dist * 2
  }

  onRouterPositionChanged = center => {
    let viewRect = ReactDOM.findDOMNode(this).getBoundingClientRect()
    let receivers = this.state.receivers.slice()
    receivers = receivers.map(receiver => {
      let a = (receiver.x * viewRect.width + 5) - center.x;
      let b = (receiver.y * viewRect.height + 5) - center.y;

      let d = Math.sqrt(a * a + b * b);

      return {
        ...receiver,
        insideRange: d < this.state.coverageDiameterInPx / 2 ? true : false
      }
    })

    this.setState({
      receivers: receivers
    })
  }

  render() {

    let router = <div
      className='coverage-area'
      style={{
        width: this.state.coverageDiameterInPx,
        height: this.state.coverageDiameterInPx,
        borderRadius: this.state.coverageDiameterInPx / 2
      }}>
      <div className='router'>
        <img src={routerImg} width='80' height='80' alt='router' />
      </div>

    </div>



    return (
      <div className='sa-container'>
        {this.state.receivers.map((receiver, index) => {
          return <div className='receiver'
            style={{
              left: receiver.x * 100 + '%',
              top: receiver.y * 100 + '%',
              backgroundColor: receiver.insideRange ? '#2FB67E' : '#f93726'
            }}
            key={index}
          ></div>
        })}
        <Draggable
          parent={this}
          children={router}
          posChangedHandler={this.onRouterPositionChanged}
          size={{ width: this.state.coverageDiameterInPx, height: this.state.coverageDiameterInPx }}
        ></Draggable>
        <div className='scale-reference'>100 m</div>
      </div>
    )
  }
}

export default CSSimulationArea