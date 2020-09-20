import React, { useState, useEffect } from 'react'
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
import { BotLevels } from '../../utils/board'

interface Props {
  selectedBot: number
  startGame: (initialPlayer: number, selectedBot: number, level: number) => void
}

const Menu: React.FC<Props> = ({ startGame, selectedBot }) => {
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(true)
  const [initialPlayer, setInitialPlayer] = useState<number>(1)

  const levels = BotLevels[selectedBot]

  const [selectedLevel, setSelectedLevel] = useState<number | undefined>(
    undefined
  )

  useEffect(() => {
    setSelectedLevel(levels[0].depth)
  }, [levels])

  const handleClick = () => {
    if (selectedLevel) {
      setDialogIsOpen(false)
      startGame(initialPlayer, selectedLevel, selectedBot)
    }
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
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(Number(e.target.value))}
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
