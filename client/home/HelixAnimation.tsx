import React from 'react'
import { AnimateKeyframes }  from 'react-simple-animate';

interface AxisProps {
  x: number
  y: number
  horizontal: boolean
  length: number
  delay: number
}

interface Coords {
  x1: number
  y1: number
  x2?: number
  y2?: number
}

class Axis extends React.Component {
  props: AxisProps
  constructor(props: AxisProps) {
    super(props)
    this.props = props
  }

  prepareCords() {
    let coords: Coords = {
      x1: this.props.x as number,
      y1: this.props.y as number
    }

    if(this.props.horizontal) {
      coords.x2 = (coords.x1 || 0) + this.props.length;
      coords.y2 = coords.y1;
    } else {
      coords.x2 = coords.x1;
      coords.y2 = (coords.y1 || 0) + this.props.length;
    }

    return coords;
  }

  render() {
    let coords = this.prepareCords();
    return (
      <div style={{width: this.props.length, height: '15px'}}>
        <AnimateKeyframes 
          play={true}
          delay={this.props.delay}
          duration={5}
          iterationCount={'infinite'}
          direction="alternate-reverse"
          keyframes={[
            'transform: rotateY(0deg)',
            'transform: rotateY(360deg)',
          ]} 
        >
          <svg>
            <line {...coords} stroke='green' strokeWidth={3} />
          </svg>
        </AnimateKeyframes>
      </div>
    )
  }
}

export const HelixAnimation: React.FC = () => {
  const length = 250
  return (
    <>
      <Axis
        x={10}
        y={10}
        length={length}
        horizontal={true}
        delay={0}
      />
      <Axis
        x={10}
        y={20}
        length={length}
        horizontal={true}
        delay={0.25}
      />
      <Axis
        x={10}
        y={30}
        length={length}
        horizontal={true}
        delay={0.5}
      />
      <Axis
        x={10}
        y={30}
        length={length}
        horizontal={true}
        delay={0.75}
      />
      <Axis
        x={10}
        y={30}
        length={length}
        horizontal={true}
        delay={1}
      />
      <Axis
        x={10}
        y={30}
        length={length}
        horizontal={true}
        delay={1.25}
      />
      <Axis
        x={10}
        y={30}
        length={length}
        horizontal={true}
        delay={1.5}
      />
      <Axis
        x={10}
        y={30}
        length={length}
        horizontal={true}
        delay={1.75}
      />
      <Axis
        x={10}
        y={30}
        length={length}
        horizontal={true}
        delay={2}
      />
    </>
  )
}