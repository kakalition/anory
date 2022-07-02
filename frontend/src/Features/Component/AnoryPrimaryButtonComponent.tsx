import { Button } from '@chakra-ui/react';
import React from 'react';

export default function AnoryPrimaryButtonComponent({
  text, onClick, paddingX = '1rem',
}: { text: string, onClick: React.MouseEventHandler, paddingX?: string }) {
  return (
    <Button
      paddingX={paddingX}
      height="3rem"
      bg="#FF9899"
      textColor="#FFFFFF"
      _hover={{ bg: '#FF8182' }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}
