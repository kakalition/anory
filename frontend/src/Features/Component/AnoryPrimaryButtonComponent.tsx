import { Button } from '@chakra-ui/react';
import React from 'react';

export default function AnoryPrimaryButtonComponent({
  text, onClick,
}: { text: string, onClick: React.MouseEventHandler }) {
  return (
    <Button
      height="3rem"
      bg="#FF9899"
      textColor="#FFFFFF"
      _hover={{ bg: '#FF8182' }}
      className="w-full"
      onClick={onClick}
    >
      {text}
    </Button>
  );
}
