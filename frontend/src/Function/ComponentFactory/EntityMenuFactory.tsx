import {
  IconButton, Menu, MenuButton, MenuItem, MenuList,
} from '@chakra-ui/react';
import { curry } from 'ramda';
import React from 'react';
import ThreeDotsIcon from '../../Features/Component/Icons/ThreeDotsIcon';

const baseEntityMenuFactory = (menuItems: React.ReactNode, userId: number, commenteeId: number) => {
  if (commenteeId === userId) {
    return (
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Comment options"
          icon={<ThreeDotsIcon />}
          variant="outline"
          onClick={(e) => e.stopPropagation()}
        />
        <MenuList>
          {menuItems}
        </MenuList>
      </Menu>
    );
  }
  return <div />;
};

/**
 * entityMenuFactory :: React.ReactNode -> (userId -> (commenteeId -> React.ReactNode))
 */
export const entityMenuFactory = curry(baseEntityMenuFactory);

/**
 * createEntityMenu :: (React.MouseEventHandler, React.ReactNode) ->
 * (userId -> (commenteeId -> React.ReactNode))
 */
export const createEntityMenu = (
  onEditClick: React.MouseEventHandler,
  onDeleteClick: React.MouseEventHandler,
) => {
  const menuItems = (
    <>
      <MenuItem onClick={onEditClick}>Edit</MenuItem>
      <MenuItem onClick={onDeleteClick}>Delete</MenuItem>
    </>
  );

  return entityMenuFactory(menuItems);
};
