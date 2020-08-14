import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import Switch from "@material-ui/core/Switch";

import { Container } from './styles';

interface Props {
  toggleTheme(): void;
}

const Header: React.FC<Props> = ({ toggleTheme }) => {
  const { title } = useContext(ThemeContext);

  return (
    <Container>
      <span>
      ConnectFour
      </span>

      <Switch
        checked={title === 'dark'}
        onChange={toggleTheme}
        color="primary"
        name="checkedB"
      />
    </Container>
  );
};

export default Header;