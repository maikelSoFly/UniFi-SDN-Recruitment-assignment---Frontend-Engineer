import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './Draggable.css'

class Draggable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pos: null,
      dragging: false,
      rel: null, // pos relative to the cursor
    }
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {

    if (nextProps.initialPos) {
      return { pos: nextProps.initialPos }
    }

    return null
  }


  componentDidMount = () => {

    if (!this.props.initialPos) {
      this.setState({
        pos: this.getCenter()
      })
    }
  }




  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (!prevState.dragging && this.state.dragging) {
      document.addEventListener('mousemove', this.onMouseMove)
      document.addEventListener('mouseup', this.onMouseUp)
    } else if (prevState.dragging && !this.state.dragging) {
      document.removeEventListener('mousemove', this.onMouseMove)
      document.removeEventListener('mouseup', this.onMouseUp)
    } else if (prevProps.size.width !== this.props.size.width &&
      prevProps.size.height !== this.props.size.height) {
      let parentRect = ReactDOM.findDOMNode(this.props.parent).getBoundingClientRect()
      this.setState({
        pos: this.getCenter()
      }, () => this.props.posChangedHandler({
        x: parentRect.width / 2,
        y: parentRect.height / 2
      }))
    }
  }


  getCenter = () => {
    let elementRect = ReactDOM.findDOMNode(this).getBoundingClientRect()
    let parentRect = ReactDOM.findDOMNode(this.props.parent).getBoundingClientRect()
    let centerPos = {
      x: parentRect.width / 2 - elementRect.width / 2,
      y: parentRect.height / 2 - elementRect.height / 2,
    }
    return centerPos
  }


  onMouseDown = e => {
    if (e.button !== 0) return

    var pos = ReactDOM.findDOMNode(this).getBoundingClientRect()

    this.setState({
      dragging: true,
      rel: {
        x: e.pageX - pos.left,
        y: e.pageY - pos.top
      }
    })

    e.stopPropagation()
    e.preventDefault()
  }

  onMouseUp = e => {
    this.setState({ dragging: false })

    e.stopPropagation()
    e.preventDefault()
  }

  onMouseMove = e => {
    if (!this.state.dragging) return
    let elementRect = ReactDOM.findDOMNode(this).getBoundingClientRect()
    let parentRect = ReactDOM.findDOMNode(this.props.parent).getBoundingClientRect()

    // prevent from getting out of bounds
    let pos
    if (e.pageX > 0 && e.pageX < parentRect.width && e.pageY > 0 && e.pageY < parentRect.height) {
      pos = { x: e.pageX - this.state.rel.x, y: e.pageY - this.state.rel.y }
      this.setState({
        pos: pos
      }, () => {
        this.props.posChangedHandler({
          x: pos.x + elementRect.width / 2,
          y: pos.y + elementRect.height / 2
        })
      })
    }




    e.stopPropagation()
    e.preventDefault()
  }





  render() {
    return (
      <div
        className='draggable'
        onMouseDown={this.onMouseDown}
        style={{
          left: this.state.pos && this.state.pos.x + 'px',
          top: this.state.pos && this.state.pos.y + 'px'
        }}
      >{this.props.children}</div>
    )
  }
}



export default Draggable