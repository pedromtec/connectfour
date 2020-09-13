import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  FormLabel,
  FormControl,
  Button,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@material-ui/core'
import { FieldContainer } from './styled'

const levels = [
  { depth: 5, label: 'Easy' },
  { depth: 6, label: 'Medium' },
  { depth: 7, label: 'Hard' }
]

interface Props {
  startGame: (initialPlayer: number, level: number) => void
}

const Menu: React.FC<Props> = ({ startGame }) => {
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(true)
  const [initialPlayer, setInitialPlayer] = useState<number>(1)
  const [level, setLevel] = useState<number>(5)

  const handleClick = () => {
    setDialogIsOpen(false)
    startGame(initialPlayer, level)
  }

  return (
    <Dialog aria-labelledby="dialog-title" open={dialogIsOpen}>
      <DialogTitle>A new game will start!</DialogTitle>
      <FormControl>
        <FieldContainer>
          <FormLabel component="legend">Who starts?</FormLabel>
          <RadioGroup
            row
            aria-label="position"
            name="position"
            defaultValue={initialPlayer}
            value={initialPlayer}
            onChange={(e) => setInitialPlayer(Number(e.target.value))}
          >
            <FormControlLabel
              value={1}
              control={<Radio color="primary" />}
              label="You"
            />
            <FormControlLabel
              value={2}
              control={<Radio color="primary" />}
              label="Machine"
            />
          </RadioGroup>
        </FieldContainer>
        <FieldContainer>
          <FormLabel component="legend">Level</FormLabel>
          <Select
            labelId="select-label"
            id="select"
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
          >
            {levels.map((level) => (
              <MenuItem value={level.depth} key={level.depth}>
                {level.label}
              </MenuItem>
            ))}
          </Select>
        </FieldContainer>
        <FieldContainer>
          <Button
            fullWidth={true}
            variant="contained"
            color="primary"
            onClick={handleClick}
          >
            Start
          </Button>
        </FieldContainer>
      </FormControl>
    </Dialog>
  )
}

export default Menu
