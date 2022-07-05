import { Button } from '@chakra-ui/react';
import React from 'react';

type Params = {
  stateKey: String,
  text: String,
  currentState: String,
  onClick: React.MouseEventHandler
};

export default function AnorySideNavButtonComponent({
  stateKey, text, currentState, onClick,
}: Params) {
  const variant = {
    active: 'solid',
    inactive: 'ghost',
  };

  const bg = {
    active: '#FFE2E3',
    inactive: 'transparent',
  };

  const hoverBg = {
    active: '',
    inactive: '#FFF0F0',
  };

  return (
    <Button
      onClick={onClick}
      variant={stateKey === currentState ? variant.active : variant.inactive}
      justifyContent="start"
      bg={stateKey === currentState ? bg.active : bg.inactive}
      _hover={{ bg: stateKey === currentState ? hoverBg.active : hoverBg.inactive }}
    >
      {text}
    </Button>
  );
}
