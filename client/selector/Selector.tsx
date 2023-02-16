import React from 'react'
import { useTheme } from '@mui/material/styles';

const SIZE = 10
type CellMouseEvent = React.MouseEvent<HTMLDivElement, MouseEvent>

interface Coords {
  x: number
  y: number
}

interface CellProps {
  selected: boolean
  setMouseDownLocation: (location: Coords, event: CellMouseEvent) => void
  setMouseUpLocation: (location: Coords, event: CellMouseEvent) => void
  cellLocation: Coords
}

const Cell: React.FC<CellProps> = ({
  selected,
  setMouseDownLocation,
  setMouseUpLocation,
  cellLocation
}) => {
  const theme = useTheme()
  return (
    <div
    style={
        {
          height: '50px',
          width: '50px',
          border: `1px ${theme.palette.divider} solid`,
          borderRadius: '2px',
          margin: '2px',
          backgroundColor: `${selected ? theme.palette.primary.main : theme.palette.primary.dark}`
        }
      }
      onMouseDown={(e) => setMouseDownLocation(cellLocation, e)}
      onMouseUp={(e) => setMouseUpLocation(cellLocation, e)}
    ></div>
  )
}

interface SelectionBoxProps {
  clicked: boolean
  start: Coords
  end: Coords
}

const SelectionBox: React.FC<SelectionBoxProps> = (props) => {
  if (!props.clicked) return null
  const theme = useTheme()
  const startX = Math.min(props.start.x, props.end.x)
  const endX = Math.max(props.start.x, props.end.x)
  const startY = Math.min(props.start.y, props.end.y)
  const endY = Math.max(props.start.y, props.end.y)
  return <div style={
    {
      border: `3px solid ${theme.palette.warning.main}`,
      position: 'absolute',
      left:`${startX}px`,
      top: `${startY}px`,
      width: `${endX - startX}px`,
      height: `${endY - startY}px`,
      pointerEvents: 'none'
    }
  }></div>
}

export const Selector: React.FC = () => {
  const offGridLocation = {x: -1, y:-1}
  const [startLocation, setStartLocation] = React.useState<Coords>(offGridLocation)
  const [endLocation, setEndLocation] = React.useState<Coords>(offGridLocation)

  const [startPixel, setStartPixel] = React.useState<Coords>(offGridLocation)
  const [mousePosition, setMousePosition] = React.useState<Coords>(offGridLocation)

  const [clicked, setClicked] = React.useState<boolean>(false)

  const click = (cellLocation: Coords, event: CellMouseEvent) => {
    setClicked(true)
    setStartLocation(cellLocation)
    setStartPixel({x: event.pageX, y: event.pageY})
  }

  const unclick = (cellLocation: Coords, event: CellMouseEvent) => {
    setClicked(false)
    setEndLocation(cellLocation)
  }

  const generateCells = (): JSX.Element[] => {
    const rows: JSX.Element[] = []
    const startRow = Math.min(startLocation.y, endLocation.y)
    const endRow = Math.max(startLocation.y, endLocation.y)

    const startCol = Math.min(startLocation.x, endLocation.x)
    const endCol = Math.max(startLocation.x, endLocation.x)

    for (let row=0; row < SIZE; row++) {
      const newRow: JSX.Element[] = []
      for (let col=0; col < SIZE; col++) {
        let selected = row >= startRow && row <= endRow && col >= startCol && col <= endCol && !clicked
        const newCell = <Cell
          key={`${row}${col}`} 
          selected={selected}
          setMouseDownLocation={click}
          setMouseUpLocation={unclick}
          cellLocation={{x: col, y: row}}
          />
        newRow.push(newCell)
      }
      rows.push(<div key={row} style={{display: 'flex', flex: 'horizontal'}}>{newRow}</div>)
    }

    return rows
  }

  return (
    <div onMouseMove={(e)=> setMousePosition({x: e.pageX, y: e.pageY})}>
      <SelectionBox clicked={clicked} start={startPixel} end={mousePosition} />
      {generateCells()}
    </div>
  )
}