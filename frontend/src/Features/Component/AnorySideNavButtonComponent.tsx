import { Button } from '@chakra-ui/react';

type Params = {
  stateKey: String,
  text: String,
  currentState: String,
};

export default function AnorySideNavButtonComponent({ stateKey, text, currentState }: Params) {
  const variant = {
    active: 'solid',
    inactive: 'ghost',
  };

  const bg = {
    active: '#FFE2E3',
    inactive: 'transparent',
  };

  const hoverBg = {
    active: 'transparent',
    inactive: '#FFF0F0',
  };

  return (
    <Button
      variant={stateKey === currentState ? variant.active : variant.inactive}
      justifyContent="start"
      bg={stateKey === currentState ? bg.active : bg.inactive}
      _hover={{ bg: stateKey === currentState ? hoverBg.active : hoverBg.inactive }}
    >
      {text}
    </Button>
  );
}
