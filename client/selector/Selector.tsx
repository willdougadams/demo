import React from 'react'
import { useTheme } from '@mui/material/styles';
import { Box, List, Typography, ListItem } from '@mui/material';

const SIZE = 10
type CellMouseEvent = React.MouseEvent<HTMLDivElement, MouseEvent>

interface Coords {
  x: number
  y: number
}

interface CellProps {
  selected: boolean
  click: (location: Coords, event: CellMouseEvent) => void
  unclick: (location: Coords, event: CellMouseEvent) => void
  cellLocation: Coords
}

const Cell: React.FC<CellProps> = ({
  selected,
  click,
  unclick,
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
      onMouseDown={(e) => click(cellLocation, e)}
      onMouseUp={(e) => unclick(cellLocation, e)}
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

  const unclick = (cellLocation: Coords) => {
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
        const selected = row >= startRow && row <= endRow && col >= startCol && col <= endCol && !clicked
        const newCell = <Cell
          key={`${row}${col}`} 
          selected={selected}
          click={click}
          unclick={unclick}
          cellLocation={{x: col, y: row}}
          />
        newRow.push(newCell)
      }
      rows.push(<div key={row} style={{display: 'flex', flex: 'horizontal'}}>{newRow}</div>)
    }

    return rows
  }

  return (
    <Box>
      <Typography>
        The result of a fun exercise I found on dev.to
      </Typography>
      <Typography>
        Goal is to create a grid of cells that could be selected by clicking
        and dragging in under one hour.
      </Typography>
      <div onMouseMove={(e)=> setMousePosition({x: e.pageX, y: e.pageY})}>
        <SelectionBox clicked={clicked} start={startPixel} end={mousePosition} />
        {generateCells()}
      </div>
      <List>
        Overall, I'm happy with the result.  Things I'd improve on with more time:

        <ListItem>
          1 - I'd separate the grid logic from the Cell components.  There's currently
          a bug that prevents mouseDown and mouseUp events from registering correctly
          if either occurs between cells or outside the grid.
        </ListItem>
        <ListItem>
          2 - Restyle to make it more of a grid; currently it looks more like a field of blank buttons
        </ListItem>
        <ListItem>
          3 - Add a button to clear the selection
        </ListItem>
        <ListItem>
          4 - Doesn't work with the hotdog stand theme, which uses the same color for selected and unselected cells
        </ListItem>
      </List>
    </Box>
  )
}